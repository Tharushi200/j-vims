import api from './api';

export const paymentService = {
  submitPayment: async (data) => {
    const response = await api.post('/payments/submit', data);
    return response.data;
  },

  getMyPayments: async () => {
    const response = await api.get('/payments/my-payments');
    return response.data;
  },

  getAllPayments: async () => {
    const response = await api.get('/admin/payments');
    return response.data;
  },

  getOrderPayments: async (orderId) => {
    const response = await api.get(`/admin/orders/${orderId}/payments`);
    return response.data;
  },

  verifyPayment: async (id, approve) => {
    const response = await api.patch(`/admin/payments/${id}/verify`, null, { params: { approve } });
    return response.data;
  }
};
