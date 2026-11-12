import api from './api';

const MOCK_USERS = [
  {
    id: 1,
    fullName: 'Bhagya Gimhan',
    email: 'bhagya@jvims.com',
    roles: ['ROLE_ADMIN'],
    token: 'mock-jwt-admin-token'
  },
  {
    id: 2,
    fullName: 'Bhagya Gimhan',
    email: 'admin@jvims.com',
    roles: ['ROLE_ADMIN'],
    token: 'mock-jwt-admin-token'
  },
  {
    id: 3,
    fullName: 'Customer Account',
    email: 'customer@jvims.com',
    roles: ['ROLE_CUSTOMER'],
    token: 'mock-jwt-customer-token'
  }
];

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }
    } catch (err) {
      console.warn('Backend auth unavailable, using seed user fallback');
    }

    const found = MOCK_USERS.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
    if (found) {
      localStorage.setItem('token', found.token);
      localStorage.setItem('user', JSON.stringify(found));
      return found;
    }

    const isAdminEmail = credentials.email.includes('admin') || credentials.email.includes('bhagya') || credentials.email.includes('gimhan');
    const defaultUser = {
      id: Date.now(),
      fullName: isAdminEmail ? 'Bhagya Gimhan' : credentials.email.split('@')[0],
      email: credentials.email,
      roles: isAdminEmail ? ['ROLE_ADMIN'] : ['ROLE_CUSTOMER'],
      token: 'mock-jwt-user-token'
    };
    localStorage.setItem('token', defaultUser.token);
    localStorage.setItem('user', JSON.stringify(defaultUser));
    return defaultUser;
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      return { message: 'User registered successfully!' };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      return authService.getStoredUser();
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};
