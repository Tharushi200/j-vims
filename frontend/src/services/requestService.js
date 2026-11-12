import api from './api';

const MOCK_REQUESTS = [
  {
    id: 1,
    requestNumber: 'REQ-2026-001',
    customer: { id: 3, fullName: 'Kamal Perera', email: 'customer@jvims.com', phone: '+94719876543' },
    category: { id: 2, name: 'Motorcycle', code: 'MOTORCYCLE' },
    brand: 'Honda',
    model: 'ADV 160 ABS',
    minYear: 2023,
    maxYear: 2024,
    minBudgetLkr: 1500000,
    maxBudgetLkr: 2200000,
    conditionType: 'BRAND_NEW',
    fuelType: 'PETROL',
    transmission: 'AUTOMATIC',
    additionalNotes: 'Preferred color: Mat Charcoal Gray or Pearl White',
    status: 'NEW_REQUEST',
    createdAt: '2026-09-15T08:30:00Z'
  },
  {
    id: 2,
    requestNumber: 'REQ-2026-002',
    customer: { id: 3, fullName: 'Kamal Perera', email: 'customer@jvims.com', phone: '+94719876543' },
    category: { id: 3, name: 'Car', code: 'CAR' },
    brand: 'Toyota',
    model: 'Prius Hybrid',
    minYear: 2020,
    maxYear: 2022,
    minBudgetLkr: 9000000,
    maxBudgetLkr: 12000000,
    conditionType: 'RECONDITIONED',
    fuelType: 'HYBRID',
    transmission: 'AUTOMATIC',
    additionalNotes: 'S-Safety Plus grade preferred. Pearl White or Silver.',
    status: 'UNDER_REVIEW',
    createdAt: '2026-09-16T10:15:00Z'
  },
  {
    id: 3,
    requestNumber: 'REQ-2026-003',
    customer: { id: 4, fullName: 'Nimal Silva', email: 'nimal@example.com', phone: '+94712345678' },
    category: { id: 2, name: 'Motorcycle', code: 'MOTORCYCLE' },
    brand: 'Yamaha',
    model: 'NMAX 155',
    minYear: 2022,
    maxYear: 2024,
    minBudgetLkr: 1200000,
    maxBudgetLkr: 1600000,
    conditionType: 'RECONDITIONED',
    fuelType: 'PETROL',
    transmission: 'AUTOMATIC',
    additionalNotes: 'Blue or Black color preferred. Full ABS required.',
    status: 'VEHICLE_FOUND',
    createdAt: '2026-09-20T14:00:00Z'
  }
];

export const requestService = {
  createRequest: async (requestData) => {
    const response = await api.post('/custom-requests', requestData);
    return response.data;
  },

  getMyRequests: async () => {
    try {
      const response = await api.get('/custom-requests/my-requests');
      return response.data;
    } catch (err) {
      console.warn('Backend offline — using mock request data');
      return MOCK_REQUESTS.filter(r => r.customer.email === 'customer@jvims.com');
    }
  },

  getAllRequests: async () => {
    try {
      const response = await api.get('/admin/custom-requests');
      return response.data;
    } catch (err) {
      console.warn('Backend offline — using mock request data');
      return MOCK_REQUESTS;
    }
  },

  updateRequestStatus: async (id, status) => {
    try {
      const response = await api.patch(`/admin/custom-requests/${id}/status`, null, { params: { status } });
      return response.data;
    } catch (err) {
      console.warn('Backend offline — updating mock data locally');
      const req = MOCK_REQUESTS.find(r => r.id === id);
      if (req) req.status = status;
      return req;
    }
  }
};
