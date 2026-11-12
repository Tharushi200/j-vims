import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicleService } from '../../services/vehicleService';
import { requestService } from '../../services/requestService';
import { Send, Car, Calendar, DollarSign, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

const CreateRequest = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: '',
    brand: '',
    model: '',
    minYear: 2018,
    maxYear: new Date().getFullYear(),
    minBudgetLkr: '',
    maxBudgetLkr: '',
    conditionType: 'RECONDITIONED',
    fuelType: 'ANY',
    transmission: 'ANY',
    preferredColor: '',
    additionalNotes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    vehicleService.getCategories().then(cats => {
      setCategories(cats);
      if (cats.length > 0) {
        // Default to Motorcycle category if available
        const motoCat = cats.find(c => c.code === 'MOTORCYCLE' || c.name.toLowerCase().includes('motorcycle'));
        setFormData(prev => ({ ...prev, categoryId: motoCat ? motoCat.id : cats[0].id }));
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        minYear: parseInt(formData.minYear),
        maxYear: parseInt(formData.maxYear),
        minBudgetLkr: formData.minBudgetLkr ? parseFloat(formData.minBudgetLkr) : null,
        maxBudgetLkr: formData.maxBudgetLkr ? parseFloat(formData.maxBudgetLkr) : null
      };

      await requestService.createRequest(payload);
      setSuccess('Custom import request submitted! Admin will search Japan auctions and issue a quotation.');
      setTimeout(() => {
        navigate('/customer/requests');
      }, 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit import request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 2rem' }} className="animate-fade-in">
      <button 
        type="button" 
        onClick={() => navigate('/customer/requests')} 
        className="btn btn-secondary" 
        style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem' }}
      >
        <ArrowLeft size={16} /> Back to Requests
      </button>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Custom Motorbike & Vehicle Import Request</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Looking for a specific motorbicycle model? Specify your exact requirements below.</p>
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

      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} required>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Brand</label>
              <input type="text" className="form-input" placeholder="BMW / Kawasaki / Honda / Yamaha" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} required />
            </div>

            <div className="form-group">
              <label className="form-label">Target Model</label>
              <input type="text" className="form-input" placeholder="BMW C400GT / ZX-25RR / ADV 160 / PCX 125" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} required />
            </div>

            <div className="form-group">
              <label className="form-label">Condition</label>
              <select className="form-select" value={formData.conditionType} onChange={e => setFormData({ ...formData, conditionType: e.target.value })}>
                <option value="RECONDITIONED">RECONDITIONED (Auction Grade 4+)</option>
                <option value="BRAND_NEW">BRAND NEW</option>
                <option value="USED">USED</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Min Model Year</label>
              <input type="number" className="form-input" value={formData.minYear} onChange={e => setFormData({ ...formData, minYear: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Max Model Year</label>
              <input type="number" className="form-input" value={formData.maxYear} onChange={e => setFormData({ ...formData, maxYear: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Max Budget (LKR)</label>
              <input type="number" className="form-input" placeholder="e.g. 12000000" value={formData.maxBudgetLkr} onChange={e => setFormData({ ...formData, maxBudgetLkr: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Fuel Type</label>
              <select className="form-select" value={formData.fuelType} onChange={e => setFormData({ ...formData, fuelType: e.target.value })}>
                <option value="ANY">ANY</option>
                <option value="HYBRID">HYBRID</option>
                <option value="PETROL">PETROL</option>
                <option value="DIESEL">DIESEL</option>
                <option value="ELECTRIC">ELECTRIC</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Requirements & Notes</label>
            <textarea className="form-textarea" rows="4" placeholder="Mention preferred grade (e.g. S-Safety), sunroof, leather seats, target color..." value={formData.additionalNotes} onChange={e => setFormData({ ...formData, additionalNotes: e.target.value })}></textarea>
          </div>

          <button type="submit" className="btn btn-crimson" style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Submitting Request...' : (
              <>
                <Send size={18} /> Submit Custom Import Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
