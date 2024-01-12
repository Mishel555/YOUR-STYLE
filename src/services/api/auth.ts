import client from '../client';

const endpoints = {
  getMe: () => client.get('/users/me'),
  login: (data: unknown) => client.post('/auth/login', data),
  register: (data: unknown) => client.post('/auth/register', data),
  updateMe: (data: unknown) => client.put('/users/me', data),
};

export default endpoints;
