import React, { useState } from 'react';
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle2,
  Globe, MessageCircle, Sparkles, UserCheck
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Honda ADV 160 Direct Import Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 1000);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>

      {/* Header Banner */}
      <section style={{
        padding: '3.5rem 2rem 3.5rem 2rem',
        background: 'radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.18) 0%, rgba(15, 23, 42, 0) 60%), radial-gradient(circle at 10% 80%, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0) 70%)',
        borderBottom: 'var(--border-color)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="badge badge-navy" style={{ marginBottom: '1rem', display: 'inline-flex', gap: '0.5rem', padding: '0.4rem 1rem', border: '1px solid rgba(220, 38, 38, 0.4)' }}>
            <Sparkles size={14} style={{ color: 'var(--accent)' }} /> Contact Bhagya Enterprises
          </div>

          <h1 style={{ fontSize: '2.8rem', color: '#FFF', marginBottom: '1rem' }}>Get in Touch With Us</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Have questions about Japanese auction bidding, motorbicycle import (ADV 160, PCX, BMW, Kawasaki), or vessel shipping schedules? Contact Bhagya Gimhan & team directly.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div style={{ maxWidth: '1280px', margin: '3rem auto 0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* Left Column - Contact Information Cards */}
          <div>
            <h2 style={{ fontSize: '1.8rem', color: '#FFF', marginBottom: '1.5rem' }}>Official Contacts</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Direct Hotlines Card */}
              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(220, 38, 38, 0.15)', color: 'var(--accent-red)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Direct Hotlines & WhatsApp</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFF', marginTop: '0.2rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Sri Lanka: </span>
                      <a href="tel:+94760096432" style={{ color: 'var(--accent-emerald)', textDecoration: 'none' }}>+94 76 009 6432</a>
                    </div>
                    <div style={{ marginTop: '0.25rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Japan: </span>
                      <a href="tel:+817085586499" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>+81 70-8558-6499</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder / Facebook Card */}
              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
                  <Globe size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Official Facebook</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFF', marginTop: '0.2rem' }}>
                    <a href="https://www.facebook.com/search/top?q=Bhagya%20Gimhan" target="_blank" rel="noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>
                      Bhagya Gimhan
                    </a>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Founder & Operations Manager</div>
                </div>
              </div>

              {/* Email Card */}
              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Email Address</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFF', marginTop: '0.2rem' }}>
                    <a href="mailto:bhagya@jvims.com" style={{ color: '#FFF', textDecoration: 'none' }}>bhagya@jvims.com</a>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>imports@jvims.com</div>
                </div>
              </div>

              {/* Address Card */}
              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Headquarters & Operations</div>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: '#FFF', marginTop: '0.2rem' }}>
                    Bhagya Enterprises .JP
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Colombo, Sri Lanka & Yokohama/Kobe, Japan</div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', marginBottom: '1rem' }}>
                  Direct Message & Social Media
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="https://wa.me/817085586499" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ gap: '0.5rem', fontSize: '0.85rem', color: '#22c55e' }}>
                    <MessageCircle size={16} /> WhatsApp Japan (+81)
                  </a>
                  <a href="https://wa.me/94760096432" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ gap: '0.5rem', fontSize: '0.85rem', color: '#22c55e' }}>
                    <MessageCircle size={16} /> WhatsApp SL (+94)
                  </a>
                  <a href="https://www.facebook.com/search/top?q=Bhagya%20Gimhan" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ gap: '0.5rem', fontSize: '0.85rem', color: '#3b82f6' }}>
                    <Globe size={16} /> Facebook: Bhagya Gimhan
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Interactive Contact Form */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#FFF', marginBottom: '0.5rem' }}>Send Us a Message</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.92rem' }}>
              Fill out the form below and our vehicle import specialists will reply within 2 hours.
            </p>

            {submitted ? (
              <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: 'var(--radius-md)' }}>
                <CheckCircle2 size={48} style={{ color: '#22c55e', margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '0.5rem' }}>Thank You for Reaching Out!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Your message has been received. Our team will contact you shortly via email or phone.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-navy" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+94 7X XXX XXXX"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Subject</label>
                  <select
                    className="form-select"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="Honda ADV 160 Direct Import Inquiry">Honda ADV 160 Direct Import Inquiry (Rs. 1,980,000)</option>
                    <option value="Motorbicycle Import Quotation">Motorbicycle Import (BMW / Kawasaki / Honda PCX)</option>
                    <option value="Car / Van / SUV Import Quotation">Japanese Car / Van / SUV Import</option>
                    <option value="Vehicle Shipping & Port Clearance">Vehicle Shipping & Port Clearance</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message / Requirements</label>
                  <textarea
                    className="form-textarea"
                    rows="5"
                    placeholder="Tell us about the vehicle or motorbicycle model you want to import from Japan..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-crimson" style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '0.5rem' }} disabled={loading}>
                  {loading ? 'Sending Message...' : (
                    <>
                      <Send size={18} /> Send Message to Bhagya Enterprises
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
