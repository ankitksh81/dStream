import { AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { publicApi } from './index';

type GetEventResponse = AxiosResponse<{
  _id: string;
  uuid: string;
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  playbackId: string;
  playbackUrl: string;
  permission: string;
  owner: string;
  nft: {
    name: string;
    contractAddress: string;
    contractType: string;
    image: string;
  };
  createdAt: number;
}>;

interface GetEventRequest {
  eventId?: string;
}

export const getEvent = async (
  request: GetEventRequest
): Promise<GetEventResponse | null> => {
  return publicApi.get(`/event/${request.eventId}`, {
    headers: {
      Authorization:
        typeof window !== 'undefined'
          ? `Bearer ${localStorage.getItem('token')}`
          : // `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg2YjhkZGJhOWMzODBlNjgyMDFmNzYwNzI1MjNjNGFjOWFjNDExM2FlIiwidXNlcklkIjoiNjFlMWNlYmM1Yzc2NjdlNjQ0MTk2ZTI5IiwiaWF0IjoxNjQyMjM3ODcyLCJleHAiOjE2NDIzMjQyNzJ9.vNvTE4zLYgCzpPGqhD_E3BXgYtMDcIcxP0D-x0CAMU8`
            '',
    },
  });
};

export const useEventAPI = ({
  eventId,
  ...options
}: GetEventRequest & UseQueryOptions<GetEventResponse | null>) => {
  return useQuery<GetEventResponse | null, any>(
    ['event', eventId],
    () => getEvent({ eventId }),
    options
  );
};
