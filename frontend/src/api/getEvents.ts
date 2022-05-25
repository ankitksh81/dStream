import { AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { api } from './index';

export type GetEventsResponse = AxiosResponse<{
  event: Array<StreamEvent>;
}>;

interface GetEventsRequest {
  address?: string | null;
}

export const getAccountEvents = async (
  request: GetEventsRequest
): Promise<GetEventsResponse | null> => {
  if (request.address) {
    return api.get(`/account/${request.address}/all`, {
      headers: {
        Authorization:
          typeof window !== 'undefined'
            ? `Bearer ${localStorage.getItem('token')}`
            : '',
      },
    });
  }

  return null;
};

export const useAccountEvents = ({
  address,
  ...options
}: GetEventsRequest & UseQueryOptions<GetEventsResponse | null>) => {
  return useQuery<GetEventsResponse | null, unknown>(
    ['events', address],
    () => getAccountEvents({ address }),
    options
  );
};
