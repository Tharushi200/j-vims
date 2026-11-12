import api from './api';

const MOCK_INQUIRIES = [
  {
    id: 1,
    vehicleId: 1,
    vehicleName: 'BMW C400GT ABS',
    customerName: 'Roshan Bandara',
    customerEmail: 'roshan@example.com',
    question: 'Is this BMW C400GT available for immediate Kobe port shipping?',
    answer: 'Yes! Vessel shipping can be booked for the 28th September Kobe departure.',
    status: 'ANSWERED',
    createdAt: '2026-09-14T11:20:00Z'
  },
  {
    id: 2,
    vehicleId: 3,
    vehicleName: 'Honda ADV 160 ABS',
    customerName: 'Nipuna Silva',
    customerEmail: 'nipuna@example.com',
    question: 'Does the ADV 160 include Honda Smart Key and HSTC traction control?',
    answer: 'Yes, this 2024 Japanese spec ADV 160 ABS comes fully equipped with Smart Key and HSTC.',
    status: 'ANSWERED',
    createdAt: '2026-09-15T09:10:00Z'
  }
];

export const inquiryService = {
  getVehicleInquiries: async (vehicleId) => {
    try {
      const response = await api.get(`/vehicles/${vehicleId}/inquiries`);
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
      return MOCK_INQUIRIES.filter(i => i.vehicleId === parseInt(vehicleId));
    } catch (err) {
      return MOCK_INQUIRIES.filter(i => i.vehicleId === parseInt(vehicleId));
    }
  },

  createInquiry: async (inquiryData) => {
    try {
      const response = await api.post('/inquiries', inquiryData);
      return response.data;
    } catch (err) {
      const newInquiry = {
        id: Date.now(),
        vehicleId: inquiryData.vehicleId,
        vehicleName: inquiryData.vehicleName || 'Vehicle',
        customerName: inquiryData.customerName || 'Inquirer',
        customerEmail: inquiryData.customerEmail || 'customer@example.com',
        question: inquiryData.question,
        answer: 'Thank you for your question! Our import team will review and post an answer shortly.',
        status: 'ANSWERED',
        createdAt: new Date().toISOString()
      };
      MOCK_INQUIRIES.unshift(newInquiry);
      return newInquiry;
    }
  },

  getAllInquiries: async () => {
    try {
      const response = await api.get('/admin/inquiries');
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
      return MOCK_INQUIRIES;
    } catch (err) {
      return MOCK_INQUIRIES;
    }
  },

  replyInquiry: async (id, answer) => {
    try {
      const response = await api.post(`/admin/inquiries/${id}/reply`, { answer });
      return response.data;
    } catch (err) {
      const inq = MOCK_INQUIRIES.find(i => i.id === parseInt(id));
      if (inq) {
        inq.answer = answer;
        inq.status = 'ANSWERED';
      }
      return inq;
    }
  }
};
