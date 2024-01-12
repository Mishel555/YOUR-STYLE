import client from '../client';

const endpoints = {
  getAll: (query?: {}) => client.get(`/categories${query ? `?${new URLSearchParams(query).toString()}` : ''}`),
};

export default endpoints;
