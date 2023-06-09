// @flow
import * as PAGES from 'constants/pages';
import * as SETTINGS from 'constants/settings';
import React from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router';
import UserEmailNew from 'component/userEmailNew';
import UserEmailVerify from 'component/userEmailVerify';
import UserChannelFollowIntro from 'component/userChannelFollowIntro';
import UserTagFollowIntro from 'component/userTagFollowIntro';
import REWARDS from 'rewards';
import Spinner from 'component/spinner';
import useFetched from 'effects/use-fetched';
import usePrevious from 'effects/use-previous';
import { SHOW_TAGS_INTRO } from 'config';

const REDIRECT_PARAM = 'redirect';
const REDIRECT_IMMEDIATELY_PARAM = 'immediate';
const STEP_PARAM = 'step';

type Props = {
  user: ?User,
  emailToVerify: ?string,
  channels: ?Array<string>,
  balance: ?number,
  fetchingChannels: boolean,
  claimingReward: boolean,
  claimConfirmEmailReward: () => void,
  claimNewUserReward: () => void,
  fetchUser: () => void,
  claimedRewards: Array<Reward>,
  youtubeChannels: Array<any>,
  syncEnabled: boolean,
  hasSynced: boolean,
  syncingWallet: boolean,
  creatingChannel: boolean,
  setClientSetting: (string, boolean, ?boolean) => void,
  followingAcknowledged: boolean,
  tagsAcknowledged: boolean,
  rewardsAcknowledged: boolean,
  interestedInYoutubeSync: boolean,
  doToggleInterestedInYoutubeSync: () => void,
  prefsReady: boolean,
};

function UserSignUp(props: Props) {
  const {
    emailToVerify,
    user,
    claimingReward,
    claimedRewards,
    claimConfirmEmailReward,
    claimNewUserReward,
    balance,
    fetchUser,
    syncEnabled,
    syncingWallet,
    hasSynced,
    fetchingChannels,
    creatingChannel,
    followingAcknowledged,
    tagsAcknowledged,
    rewardsAcknowledged,
    setClientSetting,
    interestedInYoutubeSync,
    doToggleInterestedInYoutubeSync,
    prefsReady,
  } = props;
  const {
    location: { search, pathname },
    replace,
  } = useHistory();
  const urlParams = new URLSearchParams(search);
  const redirect = urlParams.get(REDIRECT_PARAM);
  const step = urlParams.get(STEP_PARAM);
  const shouldRedirectImmediately = urlParams.get(REDIRECT_IMMEDIATELY_PARAM);
  const [initialSignInStep, setInitialSignInStep] = React.useState();
  const hasVerifiedEmail = user && user.has_verified_email;
  const passwordSet = user && user.password_set;
  const hasFetchedReward = useFetched(claimingReward);
  const previousHasVerifiedEmail = usePrevious(hasVerifiedEmail);
  const hasClaimedEmailAward = claimedRewards.some((reward) => reward.reward_type === REWARDS.TYPE_CONFIRM_EMAIL);
  // Complexity warning
  // We can't just check if we are currently fetching something
  // We may want to keep a component rendered while something is being fetched, instead of replacing it with the large spinner
  // The verbose variable names are an attempt to alleviate _some_ of the confusion from handling all edge cases that come from
  // reward claiming, channel creation, account syncing, and youtube transfer
  // The possible screens for the sign in flow
  const showEmail = !hasVerifiedEmail;
  const showEmailVerification = (emailToVerify && !hasVerifiedEmail) || (!hasVerifiedEmail && passwordSet);
  const showFollowIntro = step === 'channels' || (hasVerifiedEmail && !followingAcknowledged);
  const showTagsIntro = SHOW_TAGS_INTRO && (step === 'tags' || (hasVerifiedEmail && !tagsAcknowledged));
  const canHijackSignInFlowWithSpinner = hasVerifiedEmail && !showFollowIntro && !showTagsIntro && !rewardsAcknowledged;
  const isCurrentlyFetchingSomething = fetchingChannels || claimingReward || syncingWallet || creatingChannel;
  const isWaitingForSomethingToFinish =
    // If the user has claimed the email award, we need to wait until the balance updates sometime in the future
    (!hasFetchedReward && !hasClaimedEmailAward) || (syncEnabled && !hasSynced);
  const showLoadingSpinner =
    canHijackSignInFlowWithSpinner && (isCurrentlyFetchingSomething || isWaitingForSomethingToFinish);

  function setSettingAndSync(setting, value) {
    setClientSetting(setting, value, true);
  }

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  React.useEffect(() => {
    if (previousHasVerifiedEmail === false && hasVerifiedEmail && prefsReady) {
      setSettingAndSync(SETTINGS.FIRST_RUN_STARTED, true);
    }
  }, [hasVerifiedEmail, previousHasVerifiedEmail, prefsReady]);

  React.useEffect(() => {
    // Don't claim the reward if sync is enabled until after a sync has been completed successfully
    // If we do it before, we could end up trying to sync a wallet with a non-zero balance which will fail to sync
    const delayForSync = syncEnabled && !hasSynced;

    if (hasVerifiedEmail && !hasClaimedEmailAward && !hasFetchedReward && !delayForSync) {
      claimConfirmEmailReward();
    }
  }, [
    hasVerifiedEmail,
    claimConfirmEmailReward,
    hasClaimedEmailAward,
    hasFetchedReward,
    syncEnabled,
    hasSynced,
    balance,
  ]);

  // Loop through this list from the end, until it finds a matching component
  // If it never finds one, assume the user has completed every step and redirect them
  const SIGN_IN_FLOW = [
    showEmail && (
      <UserEmailNew
        interestedInYoutubSync={interestedInYoutubeSync}
        doToggleInterestedInYoutubeSync={doToggleInterestedInYoutubeSync}
      />
    ),
    showEmailVerification && <UserEmailVerify />,
    showFollowIntro && (
      <UserChannelFollowIntro
        onContinue={() => {
          if (urlParams.get('reset_scroll')) {
            urlParams.delete('reset_scroll');
            urlParams.append('reset_scroll', '2');
          }

          urlParams.delete(STEP_PARAM);

          setSettingAndSync(SETTINGS.FOLLOWING_ACKNOWLEDGED, true);
          replace(`${pathname}?${urlParams.toString()}`);
        }}
        onBack={() => {
          if (urlParams.get('reset_scroll')) {
            urlParams.delete('reset_scroll');
            urlParams.append('reset_scroll', '3');
          }

          setSettingAndSync(SETTINGS.FOLLOWING_ACKNOWLEDGED, false);
          replace(`${pathname}?${urlParams.toString()}`);
        }}
      />
    ),
    showTagsIntro && (
      <UserTagFollowIntro
        onContinue={() => {
          let url = `/$/${PAGES.AUTH}?reset_scroll=1&${STEP_PARAM}=channels`;
          if (redirect) {
            url += `&${REDIRECT_PARAM}=${redirect}`;
          }
          if (shouldRedirectImmediately) {
            url += `&${REDIRECT_IMMEDIATELY_PARAM}=true`;
          }

          replace(url);
          setSettingAndSync(SETTINGS.TAGS_ACKNOWLEDGED, true);
        }}
      />
    ),
    showLoadingSpinner && (
      <div className="main--empty">
        <Spinner />
      </div>
    ),
  ];

  //   $FlowFixMe
  function getSignInStep() {
    for (var i = SIGN_IN_FLOW.length - 1; i > -1; i--) {
      const Component = SIGN_IN_FLOW[i];
      if (Component) {
        // If we want to redirect immediately,
        // remember the first step so we can redirect once a new step has been reached
        // Ignore the loading step
        if (redirect && shouldRedirectImmediately) {
          if (!initialSignInStep) {
            setInitialSignInStep(i);
          } else if (i !== initialSignInStep && i !== SIGN_IN_FLOW.length - 1) {
            replace(redirect);
          }
        }

        const scrollableSteps = [2, 4, 5];
        const isScrollable = scrollableSteps.includes(i);
        return [Component, isScrollable];
      }
    }

    return [undefined, false];
  }

  const [componentToRender, isScrollable] = getSignInStep();

  React.useEffect(() => {
    if (!componentToRender) {
      claimNewUserReward();
    }
  }, [componentToRender, claimNewUserReward]);

  if (!componentToRender) {
    replace(redirect || '/');
  }

  return (
    <section className={classnames('main--contained', { 'main--hoisted': isScrollable })}>{componentToRender}</section>
  );
}

export default UserSignUp;
