import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import videojs from 'video.js';

import { useEventAPI } from '@/api/getEvent';
import { useAuth } from '@/layout/useAuth';

export const useStreamEvent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  const { isLoggedIn, handleConnect } = useAuth();

  const [isStreamActive, setIsStreamActive] = useState(false);

  const {
    data: eventData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useEventAPI({
    eventId: router.query.eventId as string,
    enabled: Boolean(router.query.eventId && isLoggedIn),
    retry: false,
  });

  useEffect(() => {
    if (!isSuccess) return;
    if (!videoRef.current) return;

    if (eventData?.data?.playbackUrl) {
      const player = videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: eventData?.data?.playbackUrl,
          },
        ],
      });

      player.hlsQualitySelector();

      player.on('canplay', () => {
        setIsStreamActive(true);
      });

      player.errors({
        errors: {
          1: {
            headline: '',
            message: 'The Live Stream is not available right now',
          },
          4: {
            headline: '',
            message: 'The Live Stream is not available right now',
          },
        },
      });
    }
  }, [
    eventData?.data?.playbackId,
    eventData?.data?.playbackUrl,
    isSuccess,
    videoRef,
  ]);

  return {
    eventData,
    isLoggedIn,
    isLoading,
    isError,
    error,
    videoRef,
    isStreamActive,
    handleConnect,
  };
};
