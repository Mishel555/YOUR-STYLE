import client from '../client';

const endpoints = {
  getAll: (query?: {}) => client.get(`/products${query ? `?${new URLSearchParams(query).toString()}` : ''}`),
  getSingle: (id: number) => client.get(`/products/${id}`),
};

export default endpoints;
