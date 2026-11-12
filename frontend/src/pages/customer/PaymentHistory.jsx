import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { CreditCard, CheckCircle2, Clock, XCircle, RefreshCw, DollarSign, Banknote, ArrowLeft } from 'lucide-react';

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await api.get('/payments/my-payments');
      setPayments(res.data || []);
    } catch (err) {
      console.error('Failed to load payments', err);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  const statusConfig = {
    PENDING: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', icon: <Clock size={15} />, label: 'Pending Verification' },
    VERIFIED: { color: '#34d399', bg: 'rgba(16,185,129,0.1)', icon: <CheckCircle2 size={15} />, label: 'Verified' },
    REJECTED: { color: '#f87171', bg: 'rgba(239,68,68,0.1)', icon: <XCircle size={15} />, label: 'Rejected' },
  };
  const methodLabel = { BANK_TRANSFER: 'Bank Transfer', CASH: 'Cash', CHEQUE: 'Cheque', ONLINE_CARD: 'Card Payment' };

  const formatCurrency = (v) => v ? `LKR ${Number(v).toLocaleString('en-LK', { minimumFractionDigits: 2 })}` : 'LKR 0.00';
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-LK', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

  const totalVerified = payments.filter(p => p.status === 'VERIFIED').reduce((sum, p) => sum + Number(p.amountLkr || 0), 0);
  const totalPending = payments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + Number(p.amountLkr || 0), 0);

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '0.25rem', color: 'var(--accent-emerald)' }}>Payment History</h1>
          <p style={{ color: 'var(--text-secondary)' }}>All your payment transactions for vehicle orders</p>
        </div>
        <button onClick={fetchPayments} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Payments', value: payments.length, icon: <CreditCard size={20} />, color: '#60a5fa' },
          { label: 'Total Verified', value: formatCurrency(totalVerified), icon: <CheckCircle2 size={20} />, color: '#34d399' },
          { label: 'Pending', value: formatCurrency(totalPending), icon: <Clock size={20} />, color: '#fbbf24' },
        ].map((card, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.65rem', borderRadius: '10px', background: `${card.color}22`, color: card.color }}>{card.icon}</div>
            <div>
              <div style={{ fontSize: i === 0 ? '1.5rem' : '1.1rem', fontWeight: '800' }}>{card.value}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading payments...</div>
      ) : payments.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
          <CreditCard size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Payment Records</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>You have no payment transactions yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {payments.map(payment => {
            const st = statusConfig[payment.status] || statusConfig.PENDING;
            return (
              <div key={payment.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                    <Banknote size={16} style={{ color: 'var(--accent-emerald)' }} />
                    <span style={{ fontWeight: '700' }}>{payment.orderNumber}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', background: st.bg, color: st.color }}>
                      {st.icon} {st.label}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {methodLabel[payment.paymentMethod] || payment.paymentMethod}
                    {payment.referenceNo && ` · Ref: ${payment.referenceNo}`}
                    {' · '}{formatDate(payment.paymentDate)}
                  </div>
                  {payment.notes && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{payment.notes}</div>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                    {formatCurrency(payment.amountLkr)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payment #{payment.id}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
