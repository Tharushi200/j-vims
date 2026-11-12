import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { ShoppingBag, Ship, Scale, Truck, CheckCircle2, AlertCircle, Edit, RefreshCw, X, ArrowLeft } from 'lucide-react';

const OrderManagementAdmin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Selected Order for Edit Tracking Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [importForm, setImportForm] = useState({
    vesselName: '',
    shipmentReferenceBl: '',
    departurePort: 'Yokohama, Japan',
    arrivalPort: 'Hambantota, Sri Lanka',
    importStatus: 'IN_TRANSIT_SHIPPING'
  });

  const [regForm, setRegForm] = useState({
    lawyerName: 'A. Jayawardene Attorney at Law',
    lawyerContact: '+94 77 333 4455',
    registrationStatus: 'LAWYER_PROCESSING'
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status);
      setSuccess(`Order status updated to ${status}`);
      fetchOrders();
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  const openTrackingModal = (order) => {
    setSelectedOrder(order);
    if (order.importTracking) {
      setImportForm({
        vesselName: order.importTracking.vesselName || '',
        shipmentReferenceBl: order.importTracking.shipmentReferenceBl || '',
        departurePort: order.importTracking.departurePort || 'Yokohama, Japan',
        arrivalPort: order.importTracking.arrivalPort || 'Hambantota, Sri Lanka',
        importStatus: order.importTracking.importStatus || 'IN_TRANSIT_SHIPPING'
      });
    }
    if (order.registrationTracking) {
      setRegForm({
        lawyerName: order.registrationTracking.lawyerName || 'A. Jayawardene Attorney at Law',
        lawyerContact: order.registrationTracking.lawyerContact || '+94 77 333 4455',
        registrationStatus: order.registrationTracking.registrationStatus || 'LAWYER_PROCESSING'
      });
    }
    setShowModal(true);
  };

  const handleSaveTracking = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await orderService.updateImportTracking(selectedOrder.id, importForm);
      await orderService.updateRegistrationTracking(selectedOrder.id, regForm);
      setSuccess(`Tracking details updated for ${selectedOrder.orderNumber}`);
      setShowModal(false);
      fetchOrders();
    } catch (err) {
      setError('Failed to save tracking updates');
    }
  };

  const formatLkr = (amount) => {
    if (!amount) return 'LKR 0';
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 2rem' }} className="animate-fade-in">
      <button 
        type="button" 
        onClick={() => navigate('/admin/dashboard')} 
        className="btn btn-secondary" 
        style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem' }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Bhagya Enterprises .JP — Order Operations</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage active vehicle orders, update import vessel status, and assign lawyer registration details</p>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {success && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {success}
        </div>
      )}

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: 'var(--border-color)', color: 'var(--text-secondary)', background: 'rgba(255, 255, 255, 0.02)' }}>
              <th style={{ padding: '1rem' }}>Order No</th>
              <th style={{ padding: '1rem' }}>Customer</th>
              <th style={{ padding: '1rem' }}>Total Amount</th>
              <th style={{ padding: '1rem' }}>Current Order Stage</th>
              <th style={{ padding: '1rem' }}>Vessel / Lawyer Info</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: '3rem', textAlign: 'center' }}>Loading orders...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '3rem', textAlign: 'center' }}>No orders found. Accept a quotation to create an order.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} style={{ borderBottom: 'var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--accent-red)' }}>
                    {order.orderNumber}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600' }}>{order.customer?.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.customer?.phone}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                    {formatLkr(order.totalAmountLkr)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select
                      className="form-select"
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                    >
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PURCHASED_IN_JAPAN">PURCHASED IN JAPAN</option>
                      <option value="SHIPPING">SHIPPING</option>
                      <option value="ARRIVED_IN_SRI_LANKA">ARRIVED IN SRI LANKA</option>
                      <option value="REGISTRATION_PROCESSING">LAWYER REGISTRATION</option>
                      <option value="READY_FOR_DELIVERY">READY FOR DELIVERY</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <div>Vessel: <strong>{order.importTracking?.vesselName || 'Not Set'}</strong></div>
                    <div>Lawyer: <strong>{order.registrationTracking?.lawyerName || 'Not Set'}</strong></div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => openTrackingModal(order)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      <Edit size={14} /> Update Tracking
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Tracking Modal */}
      {showModal && selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem' }}>Update Tracking & Logistics</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Order: {selectedOrder.orderNumber}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="btn btn-secondary" style={{ padding: '0.4rem' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTracking}>
              <h4 style={{ fontSize: '1rem', color: 'var(--accent-blue)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Ship size={16} /> Vessel & Shipping Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Vessel Name</label>
                  <input type="text" className="form-input" placeholder="e.g. Hoegh Starlight" value={importForm.vesselName} onChange={e => setImportForm({ ...importForm, vesselName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Bill of Lading (BL) Ref</label>
                  <input type="text" className="form-input" placeholder="e.g. BL-JP-889922" value={importForm.shipmentReferenceBl} onChange={e => setImportForm({ ...importForm, shipmentReferenceBl: e.target.value })} />
                </div>
              </div>

              <h4 style={{ fontSize: '1rem', color: 'var(--accent-purple)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Scale size={16} /> Lawyer Registration Assistance Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Lawyer / Agent Name</label>
                  <input type="text" className="form-input" value={regForm.lawyerName} onChange={e => setRegForm({ ...regForm, lawyerName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Lawyer Contact Phone</label>
                  <input type="text" className="form-input" value={regForm.lawyerContact} onChange={e => setRegForm({ ...regForm, lawyerContact: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-crimson"><CheckCircle2 size={16} /> Save Tracking Updates</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementAdmin;
