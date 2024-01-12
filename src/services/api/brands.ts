import client from '../client';

const endpoints = {
  getAll: (query?: {}) => client.get(`/brands${query ? `?${new URLSearchParams(query).toString()}` : ''}`),
  getSingle: (id: number) => client.get(`/brands/${id}`),
};

export default endpoints;
