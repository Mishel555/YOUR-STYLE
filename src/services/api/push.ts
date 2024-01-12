import client from '../client';

const endpoints = {
  subscribe: (data: unknown) => client.post('/push/subscribe', data),
  unsubscribe: (data: unknown) => client.post('/push/unsubscribe', data),
};

export default endpoints;
