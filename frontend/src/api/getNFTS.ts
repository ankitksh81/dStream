import { AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { api } from './index';

export type GetNFTSResponse = AxiosResponse<{
  nft: Array<NFT>;
}>;

interface GetNFTSRequest {
  address?: string | null;
}

export const getNFTSAPI = async (
  request: GetNFTSRequest
): Promise<GetNFTSResponse | null> => {
  if (request.address) {
    return api.get(`/account/${request.address}/nfts`, {
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

export const useNFTS = ({
  address,
  ...options
}: GetNFTSRequest & UseQueryOptions<GetNFTSResponse | null>) => {
  return useQuery<GetNFTSResponse | null, unknown>(
    ['nfts', address],
    () => getNFTSAPI({ address }),
    options
  );
};
