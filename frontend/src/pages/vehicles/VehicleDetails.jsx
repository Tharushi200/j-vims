import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { vehicleService } from '../../services/vehicleService';
import { inquiryService } from '../../services/inquiryService';
import { useAuth } from '../../context/AuthContext';
import { 
  Car, Calendar, Fuel, Gauge, ShieldCheck, CheckCircle2, ArrowLeft, Send, 
  DollarSign, Info, HelpCircle, MessageSquare, X, Sparkles 
} from 'lucide-react';

const VehicleDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Inquiry Modal & List State
  const [inquiries, setInquiries] = useState([]);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [custName, setCustName] = useState(user?.fullName || '');
  const [custEmail, setCustEmail] = useState(user?.email || '');
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState('');

  useEffect(() => {
    fetchVehicle();
    fetchInquiries();
  }, [id]);

  const fetchVehicle = async () => {
    setLoading(true);
    try {
      const data = await vehicleService.getVehicleById(id);
      setVehicle(data);
    } catch (err) {
      setError('Vehicle details not found.');
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      const data = await inquiryService.getVehicleInquiries(id);
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries', err);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setInquiryLoading(true);
    setInquirySuccess('');

    try {
      const payload = {
        vehicleId: parseInt(id),
        vehicleName: `${vehicle.brand} ${vehicle.model}`,
        customerName: custName || 'Interested Buyer',
        customerEmail: custEmail || 'customer@example.com',
        question: questionText.trim()
      };

      await inquiryService.createInquiry(payload);
      setInquirySuccess('Question submitted! Admin will reply shortly.');
      setQuestionText('');
      setTimeout(() => {
        setShowInquiryModal(false);
        setInquirySuccess('');
        fetchInquiries();
      }, 1500);
    } catch (err) {
      console.error('Failed to submit question', err);
    } finally {
      setInquiryLoading(false);
    }
  };

  const formatLkr = (amount) => {
    if (!amount) return 'LKR 0';
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>Loading vehicle specs...</div>;
  }

  if (error || !vehicle) {
    return (
      <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>{error || 'Vehicle Not Found'}</h2>
        <Link to="/vehicles" className="btn btn-secondary">
          <ArrowLeft size={16} /> Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }} className="animate-fade-in">
      <Link to="/vehicles" className="btn btn-secondary" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        {/* Left Column - Image Gallery & Spec Grid */}
        <div>
          <div className="glass-panel" style={{ overflow: 'hidden', marginBottom: '1.5rem', height: '420px', backgroundColor: '#000' }}>
            <img src={vehicle.primaryImageUrl} alt={vehicle.model} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Full Vehicle Specifications</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', fontSize: '0.95rem' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Category:</span>
                <div style={{ fontWeight: '700', color: 'var(--accent-blue)' }}>{vehicle.category?.name}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Model Year:</span>
                <div style={{ fontWeight: '700' }}>{vehicle.modelYear}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Condition:</span>
                <div style={{ fontWeight: '700' }}>{vehicle.conditionType}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Mileage:</span>
                <div style={{ fontWeight: '700' }}>{vehicle.mileageKm?.toLocaleString()} km</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Fuel Type:</span>
                <div style={{ fontWeight: '700' }}>{vehicle.fuelType}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Transmission:</span>
                <div style={{ fontWeight: '700' }}>{vehicle.transmission}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Engine Capacity:</span>
                <div style={{ fontWeight: '700' }}>{vehicle.engineCapacityCc ? `${vehicle.engineCapacityCc} cc` : 'N/A'}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Color:</span>
                <div style={{ fontWeight: '700' }}>{vehicle.color || 'Standard'}</div>
              </div>
            </div>

            <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border-color)' }} />

            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Description & Features</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {vehicle.description}
            </p>
          </div>

          {/* Vehicle Q&A / Inquiry Section */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#FFF' }}>Vehicle Questions & Answers</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Ask specific questions about this vehicle's auction grade, shipping, or warranty.</p>
              </div>
              <button onClick={() => setShowInquiryModal(true)} className="btn btn-navy" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', gap: '0.4rem' }}>
                <HelpCircle size={16} /> Ask Question
              </button>
            </div>

            {inquiries.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {inquiries.map((inq) => (
                  <div key={inq.id} style={{ background: 'rgba(0,0,0,0.25)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#FFF', fontWeight: '600', fontSize: '0.92rem' }}>
                      <HelpCircle size={16} style={{ color: 'var(--accent-amber)' }} />
                      <span>Q: {inq.question}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.88rem', paddingLeft: '1.4rem' }}>
                      <MessageSquare size={14} style={{ color: '#4ade80', shrink: 0, marginTop: '2px' }} />
                      <span><strong>Ans:</strong> {inq.answer}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontStyle: 'italic' }}>
                No questions asked yet. Click "Ask Question" to submit an inquiry to our import specialists.
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Pricing Card & Action */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            {vehicle.availabilityStatus}
          </span>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}>
            {vehicle.brand} {vehicle.model}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{vehicle.modelYear} • Direct Japan Import</p>

          <div style={{ padding: '1.5rem', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>Estimated Selling Price</div>
            <div style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--accent-red)' }}>
              {formatLkr(vehicle.sellingPriceLkr)}
            </div>
            {vehicle.japanPriceJpy > 0 && (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Info size={14} /> Japan Base Price: ¥ {vehicle.japanPriceJpy?.toLocaleString()} JPY
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/customer/requests/new" className="btn btn-crimson" style={{ padding: '1rem', fontSize: '1rem', width: '100%' }}>
              <Send size={18} /> Request Import Quote for This Vehicle
            </Link>

            <button onClick={() => setShowInquiryModal(true)} className="btn btn-navy" style={{ padding: '0.85rem', fontSize: '0.95rem', width: '100%', gap: '0.5rem' }}>
              <HelpCircle size={18} /> Ask a Question / Vehicle Inquiry
            </button>
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: 'var(--border-color)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent-emerald)' }} />
              <span>Auction Certified Guarantee</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--accent-blue)' }} />
              <span>Full Shipping & Registration Tracking Included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ask Question Modal */}
      {showInquiryModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '520px', padding: '2rem', background: '#1E293B', border: '1px solid rgba(220, 38, 38, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={20} style={{ color: 'var(--accent-blue)' }} />
                <h3 style={{ fontSize: '1.3rem', color: '#FFF' }}>Vehicle Inquiry</h3>
              </div>
              <button onClick={() => setShowInquiryModal(false)} className="btn btn-secondary" style={{ padding: '0.35rem' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Target Vehicle: <strong style={{ color: '#FFF' }}>{vehicle.brand} {vehicle.model}</strong> ({vehicle.modelYear})
            </div>

            {inquirySuccess ? (
              <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', borderRadius: '8px', textAlign: 'center' }}>
                <CheckCircle2 size={24} style={{ margin: '0 auto 0.5rem auto' }} />
                {inquirySuccess}
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-input" value={custName} onChange={e => setCustName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Email</label>
                    <input type="email" className="form-input" value={custEmail} onChange={e => setCustEmail(e.target.value)} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Question / Requirement</label>
                  <textarea
                    className="form-textarea"
                    rows="4"
                    placeholder="e.g. Is this available for Kobe shipment? What is the warranty?"
                    value={questionText}
                    onChange={e => setQuestionText(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setShowInquiryModal(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-crimson" disabled={inquiryLoading}>
                    {inquiryLoading ? 'Submitting...' : 'Submit Question'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
