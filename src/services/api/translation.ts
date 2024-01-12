import client from '../client';

const endpoints = {
  get: (query?: {}) => client.get(`/auth/translations${query ? `?${new URLSearchParams(query).toString()}` : ''}`),
};

export default endpoints;
