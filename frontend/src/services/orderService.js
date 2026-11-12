import api from './api';

const MOCK_ORDERS = [
  {
    id: 1,
    orderNumber: 'ORD-2026-001',
    vehicle: { id: 1, brand: 'Yamaha', model: 'NMAX 155', year: 2022, primaryImageUrl: null },
    quotation: { id: 2, quotationNumber: 'QUO-2026-002', totalEstimatedPriceLkr: 1480000 },
    status: 'SHIPPING',
    totalAmountLkr: 1480000,
    paidAmountLkr: 740000,
    importTracking: {
      portOfOrigin: 'Kobe Port, Japan',
      vesselName: 'NYK Vesta',
      vesselVoyage: 'V-2026-18',
      estimatedArrival: '2026-10-20'
    },
    registrationTracking: null,
    deliveryTracking: null,
    createdAt: '2026-09-25T10:00:00Z'
  }
];

export const orderService = {
  getMyOrders: async () => {
    try {
      const response = await api.get('/orders/my-orders');
      return response.data;
    } catch (err) {
      console.warn('Backend offline — using mock order data');
      return MOCK_ORDERS;
    }
  },

  getAllOrders: async () => {
    try {
      const response = await api.get('/admin/orders');
      return response.data;
    } catch (err) {
      console.warn('Backend offline — using mock order data');
      return MOCK_ORDERS;
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (err) {
      console.warn('Backend offline — using mock order data');
      return MOCK_ORDERS.find(o => o.id === parseInt(id)) || null;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const response = await api.patch(`/admin/orders/${id}/status`, null, { params: { status } });
      return response.data;
    } catch (err) {
      console.warn('Backend offline — updating mock data locally');
      const order = MOCK_ORDERS.find(o => o.id === id);
      if (order) order.status = status;
      return order;
    }
  },

  updateImportTracking: async (id, importData) => {
    const response = await api.put(`/admin/orders/${id}/import-tracking`, importData);
    return response.data;
  },

  updateRegistrationTracking: async (id, regData) => {
    const response = await api.put(`/admin/orders/${id}/registration-tracking`, regData);
    return response.data;
  },

  updateDeliveryTracking: async (id, deliveryData) => {
    const response = await api.put(`/admin/orders/${id}/delivery-tracking`, deliveryData);
    return response.data;
  }
};
