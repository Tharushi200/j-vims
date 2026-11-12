import api from './api';

const MOCK_QUOTATIONS = [
  {
    id: 1,
    quotationNumber: 'QUO-2026-001',
    customRequest: { id: 1, requestNumber: 'REQ-2026-001', brand: 'Honda', model: 'ADV 160 ABS' },
    totalEstimatedPriceLkr: 1980000,
    japanPriceJpy: 490000,
    exchangeRate: 2.15,
    shippingCostLkr: 85000,
    customsTaxLkr: 350000,
    localChargesLkr: 45000,
    serviceFeeLkr: 50000,
    profitMarginLkr: 100000,
    validUntil: '2026-11-30',
    status: 'PENDING',
    adminNotes: 'Brand new 2024 spec. Pearl White and Mat Charcoal Gray available. Yokohama port direct shipment.',
    createdAt: '2026-09-17T09:00:00Z'
  },
  {
    id: 2,
    quotationNumber: 'QUO-2026-002',
    customRequest: { id: 3, requestNumber: 'REQ-2026-003', brand: 'Yamaha', model: 'NMAX 155' },
    totalEstimatedPriceLkr: 1480000,
    japanPriceJpy: 380000,
    exchangeRate: 2.15,
    shippingCostLkr: 75000,
    customsTaxLkr: 280000,
    localChargesLkr: 35000,
    serviceFeeLkr: 45000,
    profitMarginLkr: 85000,
    validUntil: '2026-11-25',
    status: 'ACCEPTED',
    adminNotes: 'Blue color. 2022 model. ABS full. Kobe port shipment.',
    createdAt: '2026-09-22T11:30:00Z'
  }
];

export const quotationService = {
  createQuotation: async (quotationData) => {
    const response = await api.post('/admin/quotations', quotationData);
    return response.data;
  },

  getMyQuotations: async () => {
    try {
      const response = await api.get('/quotations/my-quotations');
      return response.data;
    } catch (err) {
      console.warn('Backend offline — using mock quotation data');
      return MOCK_QUOTATIONS.filter(q => q.status !== 'REJECTED');
    }
  },

  getAllQuotations: async () => {
    try {
      const response = await api.get('/admin/quotations');
      return response.data;
    } catch (err) {
      console.warn('Backend offline — using mock quotation data');
      return MOCK_QUOTATIONS;
    }
  },

  respondToQuotation: async (id, accept) => {
    try {
      const response = await api.post(`/quotations/${id}/respond`, null, { params: { accept } });
      return response.data;
    } catch (err) {
      console.warn('Backend offline — updating mock data locally');
      const q = MOCK_QUOTATIONS.find(q => q.id === id);
      if (q) q.status = accept ? 'ACCEPTED' : 'REJECTED';
      return q;
    }
  }
};
