import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestService } from '../../services/requestService';
import { FileText, Plus, Clock, CheckCircle2, AlertCircle, Calendar, ArrowLeft } from 'lucide-react';

const MyRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await requestService.getMyRequests();
      setRequests(data);
    } catch (err) {
      console.error('Failed to load requests', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'NEW_REQUEST': return <span className="badge badge-blue">New Request</span>;
      case 'UNDER_REVIEW': return <span className="badge badge-amber">Under Admin Review</span>;
      case 'VEHICLE_FOUND': return <span className="badge badge-purple">Vehicle Found in Japan</span>;
      case 'QUOTATION_CREATED': return <span className="badge badge-emerald">Quotation Ready</span>;
      case 'ACCEPTED': return <span className="badge badge-emerald">Accepted</span>;
      case 'REJECTED': return <span className="badge badge-red">Rejected</span>;
      default: return <span className="badge badge-blue">{status}</span>;
    }
  };

  const formatLkr = (amount) => {
    if (!amount) return 'N/A';
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>My Import Requests</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track custom vehicle requests & review incoming admin quotations</p>
        </div>
        <Link to="/customer/requests/new" className="btn btn-crimson">
          <Plus size={18} /> New Request
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading your requests...</div>
      ) : requests.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
          <FileText size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Custom Requests Submitted</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>You haven't submitted any custom import requests yet.</p>
          <Link to="/customer/requests/new" className="btn btn-crimson">
            Create First Import Request
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {requests.map(req => (
            <div key={req.id} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-red)' }}>{req.requestNumber}</span>
                  {getStatusBadge(req.status)}
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>
                  {req.brand} {req.model} ({req.minYear} - {req.maxYear})
                </h3>

                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <span>Category: <strong>{req.category?.name}</strong></span>
                  <span>Fuel: <strong>{req.fuelType}</strong></span>
                  <span>Max Budget: <strong style={{ color: 'var(--accent-emerald)' }}>{formatLkr(req.maxBudgetLkr)}</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/customer/quotations" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem' }}>
                  View Quotations
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
