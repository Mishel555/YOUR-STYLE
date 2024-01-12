import client from '../client';

const endpoints = {
  getAll: (query?: {}) => client.get(`/orders${query ? `?${new URLSearchParams(query).toString()}` : ''}`),
  createOrder: (data: unknown) => client.post('/orders', data),
};

export default endpoints;
