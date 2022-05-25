import axios from 'axios';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();

export const api = axios.create({
  baseURL: '/api',
  headers: {
    Authorization:
      typeof window !== 'undefined'
        ? `Bearer ${localStorage.getItem('token')}`
        : '',
  },
});

export const publicApi = axios.create({
  baseURL: '/api',
});

export const baseAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
