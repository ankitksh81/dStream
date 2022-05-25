import clsx from 'clsx';

import { Spinner } from '@/components/Spinner/Spinner';
import { useStreamEvent } from '@/containers/StreamEvent/useStreamEvent';

import 'videojs-contrib-hls';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';
import 'videojs-errors';

export const StreamEvent = () => {
  const {
    isError,
    isLoggedIn,
    isLoading,
    error,
    eventData,
    videoRef,
    isStreamActive,
    handleConnect,
  } = useStreamEvent();

  if (isLoading) {
    return (
      <div className="grid w-screen h-screen place-items-center">
        <Spinner />
      </div>
    );
  }

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

  if (
    isError &&
    (error?.response?.status === 401 || error?.response?.status === 403)
  ) {
    return (
      <div className="grid w-screen h-screen place-items-center">
        <div className="text-center">
          <h4 className="text-lg font-semibold">
            You do not have permission to view this event
          </h4>
          <p>{error?.response?.data?.message}</p>
        </div>
      </div>
    );
  }

  if (isError && error?.response?.status !== 401) {
    return (
      <div className="grid w-screen h-screen place-items-center">
        <div className="text-center">
          <h4 className="text-lg font-semibold">Oops! something went wrong</h4>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-4xl px-2 mx-auto mt-12">
      <header className="flex items-center justify-between w-full my-12">
        <div className="w-full">
          <h4 className="w-full text-4xl font-bold text-gray-700/80">
            {eventData?.data?.name}
          </h4>

          <p className=" text-black/40">{eventData?.data?.description}</p>
        </div>

        <div>
          <p>{}</p>
        </div>
      </header>

      <div className="relative w-full overflow-hidden bg-black max-auto h-[500px]">
        <div data-vjs-player>
          <video
            id="video"
            ref={videoRef}
            className="w-full h-full video-js vjs-theme-city"
            controls
            playsInline
          />
        </div>

        <div className="absolute flex items-center justify-center p-1 text-xs bg-white rounded-xl right-2 top-2">
          <div
            className={`animate-pulse ${
              isStreamActive ? 'bg-green-700' : 'bg-yellow-600'
            } py-1 w-2 mr-2 rounded-full`}
          ></div>
          {isStreamActive ? 'Live' : 'Waiting for Video'}
        </div>
      </div>

      <p className="mt-4">
        *You are able to see this live broadcast because you have{' '}
        <span className="font-semibold">{eventData?.data?.nft?.name} </span>
        in your wallet
      </p>
    </div>
  );
};
