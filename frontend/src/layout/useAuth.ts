import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';

import { useLogin } from '@/api/login';
import { isBrowser } from '@/constants/index';
import { useAuthProvider } from '@/contexts/auth';
import { useEagerConnect } from '@/layout/useEagerConnect';
import { injected, validateToken } from '@/utils/index';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    active,
    account,
    library: web3,
    activate,
    deactivate,
  } = useWeb3React();
  const { mutateAsync: loginAPI, isLoading: isLoadingAPI } = useLogin();
  const { isAuthenticated, setIsAuthenticated } = useAuthProvider();

  useEagerConnect();

  useEffect(() => {
    if (isBrowser) {
      const token = localStorage.getItem('token');
      const isTokenValid = validateToken(token, account);

      if (isTokenValid && setIsAuthenticated) {
        setIsAuthenticated(true);
      }
    }
  }, [account, active, setIsAuthenticated]);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      await activate(injected);

      const token = localStorage.getItem('token');
      if (active && account && !validateToken(token, account)) {
        if (account && web3) {
          const result = await loginAPI({ address: account, web3 });
          const accessToken = result?.data?.token;

          localStorage.setItem('token', accessToken);
          if (setIsAuthenticated) {
            setIsAuthenticated(true);
          }
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleDisconnectWallet = async () => {
    deactivate();
    localStorage.removeItem('token');
  };

  const isLoggedIn = Boolean(active && account && isAuthenticated);

  return {
    isLoading: isLoading || isLoadingAPI,
    account,
    isLoggedIn,
    handleConnect,
    handleDisconnectWallet,
  };
};
