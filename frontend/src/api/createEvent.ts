import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

import { isBrowser } from '@/constants/index';

import { publicApi } from './index';

interface CreateEventRequest {
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  nft: {
    contractAddress: string;
    contractType: string;
    name: string;
    image: string;
  };
  config?: AxiosRequestConfig;
}

type CreateEventRespone = AxiosResponse<{
  _id: string;
  uuid: string;
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  permission: string;
  owner: string;
  createdAt: number;
}>;

export const createEventsAPI = async (request: CreateEventRequest) => {
  return publicApi.post(
    `/event/create`,
    {
      name: request.name,
      description: request.description,
      startsAt: request.startsAt,
      endsAt: request.endsAt,
      nft: {
        contractAddress: request.nft.contractAddress,
        contractType: request.nft.contractType,
        name: request.nft.name,
        image: request.nft.image,
      },
    },
    isBrowser && localStorage.getItem('token')
      ? {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          ...request.config,
        }
      : request.config
  );
};

export const useCreateEvent = () => {
  return useMutation<CreateEventRespone, unknown, CreateEventRequest>(
    'create-event',
    createEventsAPI
  );
};
