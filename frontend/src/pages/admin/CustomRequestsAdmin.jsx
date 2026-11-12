import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestService } from '../../services/requestService';
import { quotationService } from '../../services/quotationService';
import { FileText, Calculator, CheckCircle2, AlertCircle, RefreshCw, X, DollarSign, Send, ArrowLeft } from 'lucide-react';

const CustomRequestsAdmin = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Quotation Modal State
  const [quoteForm, setQuoteForm] = useState({
    japanPriceJpy: 450000,
    exchangeRate: 2.15,
    shippingCostLkr: 85000,
    customsTaxLkr: 350000,
    localChargesLkr: 45000,
    serviceFeeLkr: 50000,
    profitMarginLkr: 100000,
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    adminNotes: ''
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await requestService.getAllRequests();
      setRequests(data);
    } catch (err) {
      setError('Failed to load import requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await requestService.updateRequestStatus(id, status);
      setSuccess(`Request status updated to ${status}`);
      fetchRequests();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const openQuoteModal = (req) => {
    setSelectedReq(req);
    
    // Adjust default values based on motorcycle/bicycle vs car
    const isBikeOrScooter = req.category?.code === 'MOTORCYCLE' || req.category?.code === 'BICYCLE' || (req.maxBudgetLkr && req.maxBudgetLkr < 3000000);
    
    if (isBikeOrScooter) {
      setQuoteForm({
        japanPriceJpy: req.maxBudgetLkr ? Math.round((req.maxBudgetLkr * 0.45) / 2.15) : 400000,
        exchangeRate: 2.15,
        shippingCostLkr: 75000,
        customsTaxLkr: req.maxBudgetLkr ? Math.round(req.maxBudgetLkr * 0.25) : 300000,
        localChargesLkr: 35000,
        serviceFeeLkr: 45000,
        profitMarginLkr: 85000,
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        adminNotes: `Quotation for ${req.brand} ${req.model} direct shipment from Yokohama Port.`
      });
    } else {
      setQuoteForm({
        japanPriceJpy: 1850000,
        exchangeRate: 2.15,
        shippingCostLkr: 650000,
        customsTaxLkr: 4500000,
        localChargesLkr: 150000,
        serviceFeeLkr: 250000,
        profitMarginLkr: 500000,
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        adminNotes: `Quotation for ${req.brand} ${req.model} direct Kobe Port shipment.`
      });
    }

    setShowQuoteModal(true);
  };

  const calculateTotalLkr = () => {
    const jpyLkr = (parseFloat(quoteForm.japanPriceJpy || 0) * parseFloat(quoteForm.exchangeRate || 1));
    const total = jpyLkr +
      parseFloat(quoteForm.shippingCostLkr || 0) +
      parseFloat(quoteForm.customsTaxLkr || 0) +
      parseFloat(quoteForm.localChargesLkr || 0) +
      parseFloat(quoteForm.serviceFeeLkr || 0) +
      parseFloat(quoteForm.profitMarginLkr || 0);
    return total;
  };

  const handleCreateQuotation = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const payload = {
        requestId: selectedReq.id,
        customerId: selectedReq.customer.id,
        japanPriceJpy: parseFloat(quoteForm.japanPriceJpy),
        exchangeRate: parseFloat(quoteForm.exchangeRate),
        shippingCostLkr: parseFloat(quoteForm.shippingCostLkr),
        customsTaxLkr: parseFloat(quoteForm.customsTaxLkr),
        localChargesLkr: parseFloat(quoteForm.localChargesLkr),
        serviceFeeLkr: parseFloat(quoteForm.serviceFeeLkr),
        profitMarginLkr: parseFloat(quoteForm.profitMarginLkr),
        validUntil: quoteForm.validUntil,
        adminNotes: quoteForm.adminNotes
      };

      await quotationService.createQuotation(payload);
      setSuccess(`Official Quotation created & issued for ${selectedReq.requestNumber}!`);
      setShowQuoteModal(false);
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create quotation');
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
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Import Requests & Quotation Engine</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review customer custom import requirements, calculate pricing, and generate formal quotes</p>
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
              <th style={{ padding: '1rem' }}>Request No</th>
              <th style={{ padding: '1rem' }}>Customer</th>
              <th style={{ padding: '1rem' }}>Requested Vehicle</th>
              <th style={{ padding: '1rem' }}>Max Budget</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: '3rem', textAlign: 'center' }}>Loading import requests...</td></tr>
            ) : requests.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '3rem', textAlign: 'center' }}>No import requests found.</td></tr>
            ) : (
              requests.map(req => (
                <tr key={req.id} style={{ borderBottom: 'var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--accent-red)' }}>
                    {req.requestNumber}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600' }}>{req.customer?.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.customer?.phone}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '700' }}>{req.brand} {req.model}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{req.minYear}-{req.maxYear} • {req.fuelType}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                    {formatLkr(req.maxBudgetLkr)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select
                      className="form-select"
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                    >
                      <option value="NEW_REQUEST">NEW REQUEST</option>
                      <option value="UNDER_REVIEW">UNDER REVIEW</option>
                      <option value="VEHICLE_FOUND">VEHICLE FOUND</option>
                      <option value="QUOTATION_CREATED">QUOTATION CREATED</option>
                      <option value="ACCEPTED">ACCEPTED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => openQuoteModal(req)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      <Calculator size={14} /> Issue Quote
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Quotation Calculator Modal */}
      {showQuoteModal && selectedReq && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw',
            height: '100vh',
            zIndex: 9999, 
            background: 'rgba(15, 23, 42, 0.92)', 
            backdropFilter: 'blur(12px)', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            boxSizing: 'border-box'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowQuoteModal(false);
          }}
        >
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '840px', 
              margin: 'auto',
              background: '#1E293B', 
              border: '1px solid rgba(220, 38, 38, 0.5)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '1.25rem 1.75rem', 
              boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
              position: 'relative'
            }}
          >
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>Generate Official Price Quotation</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Request: <strong style={{ color: 'var(--accent)' }}>{selectedReq.requestNumber}</strong> ({selectedReq.brand} {selectedReq.model}) | Customer: <strong>{selectedReq.customer?.fullName}</strong>
                </p>
              </div>
              <button type="button" onClick={() => setShowQuoteModal(false)} className="btn btn-secondary" style={{ padding: '0.35rem 0.55rem', borderRadius: '6px' }} title="Close Modal">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateQuotation}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', marginBottom: '0.85rem' }}>
                
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Japan Base Price (JPY ¥)</label>
                  <input type="number" className="form-input" style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }} value={quoteForm.japanPriceJpy} onChange={e => setQuoteForm({ ...quoteForm, japanPriceJpy: e.target.value })} required />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Exchange Rate (JPY to LKR)</label>
                  <input type="number" step="0.0001" className="form-input" style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }} value={quoteForm.exchangeRate} onChange={e => setQuoteForm({ ...quoteForm, exchangeRate: e.target.value })} required />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Shipping & Freight (LKR)</label>
                  <input type="number" className="form-input" style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }} value={quoteForm.shippingCostLkr} onChange={e => setQuoteForm({ ...quoteForm, shippingCostLkr: e.target.value })} required />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Customs Duties & Taxes (LKR)</label>
                  <input type="number" className="form-input" style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }} value={quoteForm.customsTaxLkr} onChange={e => setQuoteForm({ ...quoteForm, customsTaxLkr: e.target.value })} required />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Local Port & Clearance (LKR)</label>
                  <input type="number" className="form-input" style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }} value={quoteForm.localChargesLkr} onChange={e => setQuoteForm({ ...quoteForm, localChargesLkr: e.target.value })} />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Service Fee & Profit (LKR)</label>
                  <input type="number" className="form-input" style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }} value={quoteForm.profitMarginLkr} onChange={e => setQuoteForm({ ...quoteForm, profitMarginLkr: e.target.value })} />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Expiration Date</label>
                  <input type="date" className="form-input" style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }} value={quoteForm.validUntil} onChange={e => setQuoteForm({ ...quoteForm, validUntil: e.target.value })} required />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Admin Notes to Customer</label>
                  <input type="text" className="form-input" style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }} placeholder="Condition details, shipping duration..." value={quoteForm.adminNotes} onChange={e => setQuoteForm({ ...quoteForm, adminNotes: e.target.value })} />
                </div>

              </div>

              {/* Realtime Calculated Total Display & Actions */}
              <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.25rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700' }}>Calculated Total Customer Price</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#34d399' }}>
                    {formatLkr(calculateTotalLkr())}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button type="button" onClick={() => setShowQuoteModal(false)} className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>Cancel</button>
                  <button type="submit" className="btn btn-crimson" style={{ padding: '0.5rem 1.4rem', fontSize: '0.85rem' }}><Send size={15} /> Issue Official Quotation</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomRequestsAdmin;
