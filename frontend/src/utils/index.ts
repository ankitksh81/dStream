import { InjectedConnector } from '@web3-react/injected-connector';
import jwtDecode from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

import { isBrowser } from '@/constants/index';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

interface JWT {
  address: string;
  exp: number;
}

export const validateToken = (
  token: string | null,
  address?: string | null
) => {
  if (!token || !address) return false;

  const jwt: JWT = jwtDecode(token);

  if (jwt.address?.toLowerCase() !== address?.toLowerCase()) {
    localStorage.removeItem('token');
    return false;
  }

  if (jwt.exp) {
    const isValid = new Date().valueOf() < jwt.exp * 1000;
    if (!isValid) {
      localStorage.removeItem('token');
    }

    return isValid;
  }

  localStorage.removeItem('token');
  return false;
};

export const geteventsFromLocalstorage = (FILES_KEY: string) => {
  if (!isBrowser) {
    return [];
  }

  const eventsData = localStorage.getItem(FILES_KEY);
  const eventsInLS = eventsData ? JSON.parse(eventsData) : [];

  if (Array.isArray(eventsInLS)) {
    return eventsInLS.map((event) => ({ ...event, isLocal: true }));
  }

  return [];
};

export const getUserFromLocalstorage = (): User => {
  const userId = uuidv4();
  const user: User = {
    __v: 1,
    _id: userId,
    address: userId,
    createdAt: Date.now(),
    email: '',
    name: '',
    username: '',
  };

  if (!isBrowser) {
    return user;
  }

  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  const localUser = localStorage.getItem('user') as string;
  return JSON.parse(localUser);
};
