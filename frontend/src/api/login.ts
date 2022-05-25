/* eslint-disable no-console */
import { useMutation } from 'react-query';
import Web3 from 'web3';

import { publicApi, queryClient } from '@/api/index';

interface LoginRequest {
  address: string;
  web3: Web3;
}

export const loginAPI = async (request: LoginRequest) => {
  const message = `Welcome to dStream!\n\nClick to sign in. This request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${
    request.address
  }\n\nTimestamp: ${new Date().toISOString()}`;

  // @ts-ignore
  const signature = await request.web3.eth.personal.sign(
    message,
    request.address
  );

  return publicApi.post(`/account/${request.address}/login`, {
    message,
    signature,
  });
};

export const useLogin = () => {
  return useMutation<any, unknown, LoginRequest>('login', loginAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
