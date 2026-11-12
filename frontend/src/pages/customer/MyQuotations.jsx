import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quotationService } from '../../services/quotationService';
import { Award, Check, X, AlertCircle, Calendar, Info, ShieldCheck, Printer, ArrowLeft } from 'lucide-react';

const MyQuotations = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const data = await quotationService.getMyQuotations();
      setQuotations(data);
    } catch (err) {
      console.error('Failed to load quotations', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (id, accept) => {
    const confirmMsg = accept 
      ? 'Accepting this quotation will automatically confirm your vehicle order and proceed to Japan purchase. Continue?'
      : 'Are you sure you want to reject this quotation?';
    
    if (!window.confirm(confirmMsg)) return;

    setActionLoading(true);
    try {
      await quotationService.respondToQuotation(id, accept);
      setMessage(accept ? 'Quotation Accepted! Your vehicle Order has been confirmed.' : 'Quotation Rejected.');
      fetchQuotations();
    } catch (err) {
      alert('Failed to update quotation response.');
    } finally {
      setActionLoading(false);
    }
  };

  const formatLkr = (amount) => {
    if (!amount) return 'LKR 0';
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 2rem' }} className="animate-fade-in">
      <button 
        type="button" 
        onClick={() => navigate('/customer/dashboard')} 
        className="btn btn-secondary" 
        style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem' }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>My Quotations</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review official cost quotations issued by Admin for your vehicle imports</p>
      </div>

      {message && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', color: '#34d399', fontSize: '0.95rem' }}>
          {message}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading quotations...</div>
      ) : quotations.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
          <Award size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Quotations Available</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Admin will issue cost breakdown quotations once your request is reviewed.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {quotations.map((q) => (
            <div key={q.id} className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent-red)' }}>{q.quotationNumber}</span>
                  <h2 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>
                    {q.request ? `${q.request.brand} ${q.request.model}` : 'Vehicle Import Quotation'}
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Issued by: {q.admin?.fullName} • Valid until: <strong>{q.validUntil}</strong>
                  </span>
                </div>

                <div>
                  {q.status === 'PENDING' && <span className="badge badge-amber" style={{ fontSize: '0.85rem' }}>Action Required</span>}
                  {q.status === 'ACCEPTED' && <span className="badge badge-emerald" style={{ fontSize: '0.85rem' }}>ACCEPTED & ORDERED</span>}
                  {q.status === 'REJECTED' && <span className="badge badge-red" style={{ fontSize: '0.85rem' }}>REJECTED</span>}
                </div>
              </div>

              {/* Price Breakdown Grid */}
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Official Cost Breakdown (LKR)</h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Japan Base Price:</span>
                    <div style={{ fontWeight: '600' }}>¥ {q.japanPriceJpy?.toLocaleString()} JPY ({formatLkr(q.japanPriceLkr)})</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Shipping & Freight:</span>
                    <div style={{ fontWeight: '600' }}>{formatLkr(q.shippingCostLkr)}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Customs Duties & Tax:</span>
                    <div style={{ fontWeight: '600' }}>{formatLkr(q.customsTaxLkr)}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Local Port & Service:</span>
                    <div style={{ fontWeight: '600' }}>{formatLkr(q.localChargesLkr + q.serviceFeeLkr)}</div>
                  </div>
                </div>

                <hr style={{ margin: '1rem 0', borderColor: 'var(--border-color)' }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>Final Estimated Total Price:</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                    {formatLkr(q.totalEstimatedPriceLkr)}
                  </span>
                </div>
              </div>

              {q.adminNotes && (
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  <strong>Admin Note:</strong> "{q.adminNotes}"
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                <button
                  onClick={() => window.print()}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  <Printer size={16} /> Print Official Quotation
                </button>
                {q.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleResponse(q.id, false)}
                      className="btn btn-secondary"
                      style={{ color: '#f87171' }}
                      disabled={actionLoading}
                    >
                      <X size={16} /> Reject
                    </button>
                    <button
                      onClick={() => handleResponse(q.id, true)}
                      className="btn btn-primary"
                      disabled={actionLoading}
                    >
                      <Check size={16} /> Accept & Create Order
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyQuotations;
