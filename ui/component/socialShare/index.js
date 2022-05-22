import { connect } from 'react-redux';
import { makeSelectClaimForUri, selectTitleForUri } from 'redux/selectors/claims';
import SocialShare from './view';
import { selectUserInviteReferralCode, selectUser } from 'redux/selectors/user';
import { makeSelectContentPositionForUri } from 'redux/selectors/content';
import { makeSelectClientSetting } from 'redux/selectors/settings';
import * as SETTINGS from 'constants/settings';

const select = (state, props) => ({
  claim: makeSelectClaimForUri(props.uri)(state),
  referralCode: selectUserInviteReferralCode(state),
  user: selectUser(state),
  title: selectTitleForUri(props.uri)(state),
  position: makeSelectContentPositionForUri(props.uri)(state),
  customShareUrlEnabled: makeSelectClientSetting(SETTINGS.CUSTOM_SHARE_URL_ENABLED)(state),
  customShareUrl: makeSelectClientSetting(SETTINGS.CUSTOM_SHARE_URL)(state),
});

export default connect(select)(SocialShare);
