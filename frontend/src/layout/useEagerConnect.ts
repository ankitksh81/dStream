import { useState, useEffect } from 'react';

import { useWeb3React } from '@web3-react/core';

import { injected } from '@/utils/index';

export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        setTimeout(
          () =>
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            }),
          100
        );
      } else {
        setTried(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum && ethereum.on && !active && !tried) {
      const handleConnect = () => {
        activate(injected);
      };
      const handleChainChanged = () => {
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          localStorage.removeItem('token');
          activate(injected);
        }
      };
      const handleNetworkChanged = () => {
        activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }

    return () => {};
  }, [active, tried, activate]);
};
