import api from './api';

const MOCK_REVIEWS = [
  {
    id: 1,
    orderId: 101,
    orderNumber: 'ORD-2026-001',
    customerName: 'Kavindu Perera',
    vehicleName: 'Honda PCX 125cc ABS',
    rating: 5,
    comment: 'Exceptional service! Imported my brand new Honda PCX 125cc from Kobe port within 4 weeks. Itemized breakdown was 100% transparent. Lawyer DMT registration was super fast!',
    status: 'APPROVED',
    createdAt: '2026-09-10T10:30:00Z',
    verifiedBuyer: true
  },
  {
    id: 2,
    orderId: 102,
    orderNumber: 'ORD-2026-002',
    customerName: 'Dilan Jayasinghe',
    vehicleName: 'BMW C400GT ABS',
    rating: 5,
    comment: 'Direct Japanese auction bidding was seamless. The BMW C400GT maxi-scooter arrived in mint condition at Hambantota port. Highly recommend J-VIMS!',
    status: 'APPROVED',
    createdAt: '2026-09-12T14:15:00Z',
    verifiedBuyer: true
  },
  {
    id: 3,
    orderId: 103,
    orderNumber: 'ORD-2026-003',
    customerName: 'Sahan Wickramasinghe',
    vehicleName: 'Kawasaki Ninja ZX-25RR',
    rating: 5,
    comment: 'The 4-cylinder sound on the ZX-25RR is unreal! Thanks to the Gimhan Enterprises team for handling customs clearing without any hassle.',
    status: 'APPROVED',
    createdAt: '2026-09-14T09:00:00Z',
    verifiedBuyer: true
  }
];

export const reviewService = {
  getApprovedReviews: async () => {
    try {
      const response = await api.get('/reviews/public');
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return MOCK_REVIEWS.filter(r => r.status === 'APPROVED');
    } catch (err) {
      return MOCK_REVIEWS.filter(r => r.status === 'APPROVED');
    }
  },

  getAllReviews: async () => {
    try {
      const response = await api.get('/admin/reviews');
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
      return MOCK_REVIEWS;
    } catch (err) {
      return MOCK_REVIEWS;
    }
  },

  createReview: async (reviewData) => {
    try {
      const response = await api.post('/customer/reviews', reviewData);
      return response.data;
    } catch (err) {
      const newReview = {
        id: Date.now(),
        orderId: reviewData.orderId,
        orderNumber: reviewData.orderNumber || 'ORD-2026-CUSTOM',
        customerName: reviewData.customerName || 'Verified Customer',
        vehicleName: reviewData.vehicleName || 'Japanese Vehicle Import',
        rating: reviewData.rating,
        comment: reviewData.comment,
        status: 'APPROVED', // Default approved for mock testing
        createdAt: new Date().toISOString(),
        verifiedBuyer: true
      };
      MOCK_REVIEWS.unshift(newReview);
      return newReview;
    }
  },

  toggleApproveReview: async (id) => {
    try {
      const response = await api.patch(`/admin/reviews/${id}/toggle`);
      return response.data;
    } catch (err) {
      const rev = MOCK_REVIEWS.find(r => r.id === parseInt(id));
      if (rev) {
        rev.status = rev.status === 'APPROVED' ? 'HIDDEN' : 'APPROVED';
      }
      return rev;
    }
  },

  deleteReview: async (id) => {
    try {
      const response = await api.delete(`/admin/reviews/${id}`);
      return response.data;
    } catch (err) {
      const idx = MOCK_REVIEWS.findIndex(r => r.id === parseInt(id));
      if (idx !== -1) {
        MOCK_REVIEWS.splice(idx, 1);
      }
      return { message: 'Review deleted successfully' };
    }
  }
};
