import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { reviewService } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Ship, FileCheck, Truck, CheckCircle2, Clock, MapPin, Scale, Printer, Star, MessageSquare, X, Send, Award, ArrowLeft } from 'lucide-react';

const MyOrders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewedOrders, setReviewedOrders] = useState({});
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: 'CONFIRMED', label: 'Order Confirmed' },
    { key: 'PURCHASED_IN_JAPAN', label: 'Purchased in Japan' },
    { key: 'SHIPPING', label: 'Vessel Shipping' },
    { key: 'ARRIVED_IN_SRI_LANKA', label: 'Arrived in Sri Lanka' },
    { key: 'REGISTRATION_PROCESSING', label: 'Lawyer Registration' },
    { key: 'READY_FOR_DELIVERY', label: 'Ready for Delivery' },
    { key: 'DELIVERED', label: 'Delivered' },
    { key: 'COMPLETED', label: 'Completed' }
  ];

  const getStepIndex = (status) => {
    const idx = steps.findIndex(s => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  const openReviewModal = (order) => {
    setSelectedOrder(order);
    setRating(5);
    setComment('');
    setShowReviewModal(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setReviewLoading(true);

    try {
      const vehicleName = selectedOrder.quotation?.request 
        ? `${selectedOrder.quotation.request.brand} ${selectedOrder.quotation.request.model}` 
        : 'Imported Vehicle';

      const payload = {
        orderId: selectedOrder.id,
        orderNumber: selectedOrder.orderNumber,
        customerName: user?.fullName || 'Verified Customer',
        vehicleName: vehicleName,
        rating: rating,
        comment: comment.trim()
      };

      await reviewService.createReview(payload);
      setReviewedOrders(prev => ({ ...prev, [selectedOrder.id]: payload }));
      setShowReviewModal(false);
    } catch (err) {
      console.error('Failed to submit review', err);
    } finally {
      setReviewLoading(false);
    }
  };

  const formatLkr = (amount) => {
    if (!amount) return 'LKR 0';
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }} className="animate-fade-in">
      <button 
        type="button" 
        onClick={() => navigate('/customer/dashboard')} 
        className="btn btn-secondary" 
        style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem' }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Bhagya Enterprises .JP — Order Tracker</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Live multi-stage import, shipment, lawyer registration, and delivery timeline tracking</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
          <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Active Orders Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Accept an issued quotation to place your vehicle import order.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {orders.map((order) => {
            const currentStepIdx = getStepIndex(order.orderStatus);
            const isCompleted = order.orderStatus === 'COMPLETED' || order.orderStatus === 'DELIVERED';
            const existingReview = reviewedOrders[order.id];

            return (
              <div key={order.id} className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent-red)' }}>{order.orderNumber}</span>
                    <h2 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>
                      {order.quotation?.request ? `${order.quotation.request.brand} ${order.quotation.request.model}` : 'Vehicle Import Order'}
                    </h2>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Total Order Amount: <strong style={{ color: 'var(--accent-emerald)' }}>{formatLkr(order.totalAmountLkr)}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button onClick={() => window.print()} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      <Printer size={14} /> Print Receipt
                    </button>
                    
                    {/* Verified Buyer Review Button */}
                    {isCompleted && (
                      existingReview ? (
                        <span className="badge badge-emerald" style={{ fontSize: '0.8rem', gap: '0.3rem' }}>
                          <CheckCircle2 size={14} /> Reviewed ({existingReview.rating}★)
                        </span>
                      ) : (
                        <button onClick={() => openReviewModal(order)} className="btn btn-crimson" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', gap: '0.4rem' }}>
                          <Star size={14} /> Leave a Review
                        </button>
                      )
                    )}

                    <span className="badge badge-navy" style={{ fontSize: '0.85rem' }}>
                      {order.orderStatus.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Stepper Timeline UI */}
                <div style={{ margin: '2rem 0', overflowX: 'auto', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', minWidth: '750px', justifyContent: 'space-between', position: 'relative' }}>
                    {steps.map((step, idx) => {
                      const isDone = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div key={step.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isCurrent ? 'var(--accent-red)' : isDone ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.08)',
                            color: '#fff',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            border: isCurrent ? '3px solid #ffffff' : 'none',
                            boxShadow: isCurrent ? '0 0 16px rgba(239, 68, 68, 0.6)' : 'none',
                            transition: 'all 0.3s ease'
                          }}>
                            {isDone ? <CheckCircle2 size={18} /> : idx + 1}
                          </div>
                          <div style={{ fontSize: '0.75rem', fontWeight: isCurrent ? '700' : '500', color: isCurrent ? 'var(--accent-red)' : isDone ? 'var(--text-primary)' : 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                            {step.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-Trackers Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: 'var(--border-color)' }}>
                  {/* Japan Shipping Details */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-blue)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Ship size={16} /> Shipping Tracker
                    </h4>
                    <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                      <div>Vessel: <strong>{order.importTracking?.vesselName || 'Pending Assignment'}</strong></div>
                      <div>BL Ref: <strong>{order.importTracking?.shipmentReferenceBl || 'Pending BL'}</strong></div>
                      <div>Departure: <strong>{order.importTracking?.departurePort || 'Yokohama, Japan'}</strong></div>
                      <div>Destination: <strong>{order.importTracking?.arrivalPort || 'Hambantota, Sri Lanka'}</strong></div>
                    </div>
                  </div>

                  {/* Registration Lawyer Tracking */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-purple)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Scale size={16} /> Lawyer Registration Assistance
                    </h4>
                    <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                      <div>Status: <strong>{order.registrationTracking?.registrationStatus || 'NOT_STARTED'}</strong></div>
                      <div>Assigned Lawyer: <strong>{order.registrationTracking?.lawyerName || 'Gimhan Legal Partner'}</strong></div>
                      <div>Contact: <strong>{order.registrationTracking?.lawyerContact || 'Available upon clearance'}</strong></div>
                    </div>
                  </div>

                  {/* Delivery Status */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Truck size={16} /> Delivery Tracker
                    </h4>
                    <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                      <div>Status: <strong>{order.deliveryTracking?.deliveryStatus || 'PENDING'}</strong></div>
                      <div>Receiver Contact: <strong>{order.customer?.phone}</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leave a Review Modal */}
      {showReviewModal && selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '520px', padding: '2rem', background: '#1E293B', border: '1px solid rgba(220, 38, 38, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} style={{ color: 'var(--accent-emerald)' }} />
                <h3 style={{ fontSize: '1.3rem', color: '#FFF' }}>Rate Your Experience</h3>
              </div>
              <button onClick={() => setShowReviewModal(false)} className="btn btn-secondary" style={{ padding: '0.35rem' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Order No: <strong style={{ color: 'var(--accent-red)' }}>{selectedOrder.orderNumber}</strong> • Verified Buyer
            </div>

            <form onSubmit={handleReviewSubmit}>
              {/* Star Rating Picker */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: '700' }}>
                  Select Star Rating
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', transition: 'transform 0.15s' }}
                    >
                      <Star
                        size={32}
                        style={{
                          color: star <= (hoverRating || rating) ? '#fbbf24' : 'rgba(255,255,255,0.2)',
                          fill: star <= (hoverRating || rating) ? '#fbbf24' : 'none'
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Comment & Feedback</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  placeholder="Write your experience with J-VIMS import process..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowReviewModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-crimson" disabled={reviewLoading || !comment.trim()}>
                  {reviewLoading ? 'Submitting...' : (
                    <>
                      <Send size={16} /> Submit Review
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
