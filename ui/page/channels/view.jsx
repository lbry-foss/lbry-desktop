// @flow
import React, { useEffect } from 'react';
import ClaimList from 'component/claimList';
import Page from 'component/page';
import Button from 'component/button';
import YoutubeTransferStatus from 'component/youtubeTransferStatus';
import Spinner from 'component/spinner';
import * as MODALS from 'constants/modal_types';

type Props = {
  channels: Array<ChannelClaim>,
  fetchChannelListMine: () => void,
  fetchingChannels: boolean,
  youtubeChannels: ?Array<any>,
  openModal: string => void,
};

export default function ChannelsPage(props: Props) {
  const { channels, fetchChannelListMine, fetchingChannels, youtubeChannels, openModal } = props;
  const hasYoutubeChannels = youtubeChannels && Boolean(youtubeChannels.length);
  const hasPendingChannels = channels && channels.some(channel => channel.confirmations < 0);

  useEffect(() => {
    fetchChannelListMine();

    let interval;
    if (hasPendingChannels) {
      interval = setInterval(() => {
        fetchChannelListMine();
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [fetchChannelListMine, hasPendingChannels]);

  return (
    <Page>
      {hasYoutubeChannels && <YoutubeTransferStatus hideChannelLink />}

      {channels && Boolean(channels.length) && (
        <div className="card">
          <ClaimList
            header={__('Your Channels')}
            loading={fetchingChannels}
            uris={channels.map(channel => channel.permanent_url)}
            headerAltControls={
              <Button button="link" label={__('New Channel')} onClick={() => openModal(MODALS.CREATE_CHANNEL)} />
            }
          />
        </div>
      )}
      {!(channels && channels.length) && (
        <React.Fragment>
          {!fetchingChannels ? (
            <section className="main--empty">
              <div className=" section--small">
                <h2 className="section__title--large">{__('No Channels Created Yet')}</h2>

                <div className="section__actions">
                  <Button button="primary" label={__('New Channel')} onClick={() => openModal(MODALS.CREATE_CHANNEL)} />
                </div>
              </div>
            </section>
          ) : (
            <section className="main--empty">
              <div className=" section--small">
                <h2 className="section__title--small">
                  {__('Checking for channels')}
                  <Spinner type="small" />
                </h2>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </Page>
  );
}
