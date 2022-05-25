/* eslint-disable no-underscore-dangle */

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useAccountEvents } from '@/api/getEvents';
import { EventCard } from '@/components/EventCard/EventCard';
import { Modal } from '@/components/Modal/Modal';
import { NFTImagePreview } from '@/components/NFTPreview/NFTImagePreview';
import { Spinner } from '@/components/Spinner/Spinner';
import { useAppHook } from '@/containers/App/useAppHook';
import { useAuth } from '@/layout/useAuth';

export const EventsApp = () => {
  const { isLoading, isLoggedIn, account, handleConnect } = useAuth();
  const {
    selectedEvent,
    isModalOpen,
    handleOpenEventDetails,
    closeModal,
    handleCopyFeedback,
  } = useAppHook();

  const { data: eventsData, isLoading: isEventsLoading } = useAccountEvents({
    address: account,
    enabled: isLoggedIn,
  });

  if (!isLoggedIn) {
    return (
      <div className="grid w-screen h-screen place-items-center">
        <button
          onClick={handleConnect}
          className={clsx(
            'border-red-400 border group w-[250px] whitespace-nowrap flex gap-2 items-center justify-center text-red-400  px-8 py-4 rounded-sm hover:text-white transition-colors hover:bg-red-400 text-xl font-bold'
          )}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <span className="overflow-hidden overflow-ellipsis">
              Connect Wallet
            </span>
          )}
        </button>
      </div>
    );
  }

  if (isEventsLoading) {
    return (
      <div className="grid w-screen h-screen place-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-4xl pb-24 mx-auto mt-12">
      <header className="flex items-center justify-between w-full my-12">
        <h4 className="text-2xl font-bold text-gray-700/80">Events</h4>

        <div>
          <Link href="/events/create" passHref>
            <button
              className={clsx(
                'bg-red-400 border-red-400 border ml-auto group w-[250px] whitespace-nowrap flex gap-2 items-center justify-center  px-8 py-2 rounded-sm hover:text-red-400 text-white transition-colors hover:bg-white text-xl font-bold'
              )}
            >
              Create Event
            </button>
          </Link>
        </div>
      </header>

      <div>
        {!eventsData?.data?.event.length ? (
          <p>
            Looks like there are no events to display, start by creating a new
            one
          </p>
        ) : (
          <div>
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
              <div className="flex justify-between gap-8">
                <div className="flex flex-col">
                  <header className="flex items-center justify-between">
                    <div>
                      <h4 className="text-2xl font-semibold">
                        {selectedEvent?.name}
                      </h4>
                    </div>
                  </header>

                  <header className="flex justify-between gap-4">
                    <div>
                      <p>{selectedEvent?.description}</p>
                    </div>
                  </header>

                  <div className="mt-auto">
                    <div className="mt-8">
                      <span className="mb-2 mr-2 font-semibold">Timings: </span>

                      {selectedEvent && (
                        <span className="text-sm">
                          {new Date(selectedEvent.startsAt).toDateString()} -{' '}
                          {new Date(selectedEvent.endsAt).toDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-8 mt-8">
                    <div className="flex-shrink-0">
                      <h5 className="text-lg font-semibold">Stream URL</h5>
                    </div>

                    <div className="flex items-center justify-between w-full gap-4 px-4 py-2 border border-gray-900">
                      <span>{`rtmp://rtmp.livepeer.com/live/`}</span>
                      <CopyToClipboard
                        text={`rtmp://rtmp.livepeer.com/live/`}
                        onCopy={handleCopyFeedback}
                      >
                        <button className="px-2 py-1 border border-gray-900 rounded-sm whitespace-nowrap">
                          Copy URL
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 mt-8">
                    <div className="flex-shrink-0">
                      <h5 className="text-lg font-semibold">Stream Key</h5>
                    </div>

                    <div className="flex items-center justify-between w-full gap-4 px-4 py-2 border border-gray-900">
                      <span>{selectedEvent?.livepeer?.streamKey}</span>
                      <CopyToClipboard
                        text={selectedEvent?.livepeer?.streamKey || ''}
                        onCopy={handleCopyFeedback}
                      >
                        <button className="px-2 py-1 border border-gray-900 rounded-sm whitespace-nowrap">
                          Copy Key
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm">
                      * You need to add the stream URL and Stream Key in your
                      live broadcasting software
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div>
                    <CopyToClipboard
                      text={`${process.env.NEXT_PUBLIC_BASE_URL}/events/${selectedEvent?.uuid}`}
                      onCopy={handleCopyFeedback}
                    >
                      <button className="px-3 py-1 border border-gray-900 rounded-sm whitespace-nowrap">
                        Copy Event Link
                      </button>
                    </CopyToClipboard>
                  </div>

                  <div className="min-w-full mt-auto text-center">
                    <h4 className="font-semibold">Token Gated</h4>

                    <div className="mt-4">
                      <div
                        className={clsx(
                          'flex relative gap-2 items-center justify-center min-w-[150px] h-40 text-xl font-semibold border  rounded-md'
                        )}
                      >
                        {selectedEvent && (
                          <NFTImagePreview nft={selectedEvent?.nft} />
                        )}
                      </div>

                      <p className="mt-2 text-sm">{selectedEvent?.nft?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            {eventsData?.data?.event?.map((streamEvent) => (
              <EventCard
                handleOpenEventDetails={handleOpenEventDetails}
                event={streamEvent}
                key={streamEvent._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
