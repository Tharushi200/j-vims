import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Shield, Calendar, Edit3, Save, X, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import api from '../../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: user?.fullName || '', phone: user?.phone || '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwMode, setPwMode] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleLabels = { ROLE_ADMIN: 'Admin', ROLE_CUSTOMER: 'Customer' };
  const primaryRole = user?.roles?.[0];
  const roleBadgeColor = primaryRole === 'ROLE_ADMIN' ? '#fbbf24' : '#60a5fa';

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      await api.put('/auth/profile', form);
      setMessage('Profile updated successfully!');
      setEditing(false);
      if (refreshUser) refreshUser();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) { setError('Passwords do not match.'); return; }
    if (pwForm.newPassword.length < 8) { setError('New password must be at least 8 characters.'); return; }
    setLoading(true); setError(''); setMessage('');
    try {
      await api.put('/auth/change-password', { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      setMessage('Password changed successfully!');
      setPwMode(false);
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to change password. Check your current password.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-LK', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 2rem' }} className="animate-fade-in">
      <button 
        type="button" 
        onClick={() => navigate(-1)} 
        className="btn btn-secondary" 
        style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem' }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ padding: '0.65rem', borderRadius: '10px', background: `${roleBadgeColor}22`, color: roleBadgeColor }}>
          <User size={22} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.75rem' }}>My Profile</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Manage your account details and security</p>
        </div>
      </div>

      {message && (
        <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={16} /> {message}
          <button onClick={() => setMessage('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#34d399', cursor: 'pointer' }}><X size={14} /></button>
        </div>
      )}
      {error && (
        <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} /> {error}
          <button onClick={() => setError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}><X size={14} /></button>
        </div>
      )}

      {/* Profile Card */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.1rem' }}>Account Information</h2>
          {!editing && (
            <button onClick={() => setEditing(true)} className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
              <Edit3 size={14} /> Edit Profile
            </button>
          )}
        </div>

        {!editing ? (
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {[
              { icon: <User size={16} />, label: 'Full Name', value: user?.fullName },
              { icon: <Mail size={16} />, label: 'Email Address', value: user?.email },
              { icon: <Phone size={16} />, label: 'Phone Number', value: user?.phone },
              { icon: <Shield size={16} />, label: 'Role', value: roleLabels[primaryRole] || primaryRole },
              { icon: <Calendar size={16} />, label: 'Member Since', value: formatDate(user?.createdAt) },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: 'var(--border-color)' }}>
                <div style={{ color: 'var(--text-muted)', minWidth: '16px' }}>{icon}</div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{label}</div>
                  <div style={{ fontWeight: '600' }}>{value || '—'}</div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: `${roleBadgeColor}22`, color: roleBadgeColor, fontSize: '0.8rem', fontWeight: '700' }}>
                {roleLabels[primaryRole] || primaryRole}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Account Status: {user?.status || 'ACTIVE'}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} style={{ display: 'grid', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Full Name *</label>
              <input type="text" className="form-input" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} required />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Phone Number *</label>
              <input type="tel" className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Email address cannot be changed.</div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
                <Save size={15} /> {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => { setEditing(false); setForm({ fullName: user?.fullName || '', phone: user?.phone || '' }); }} className="btn btn-secondary">
                <X size={15} /> Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Change Password Card */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: pwMode ? '1.5rem' : 0 }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Security</h2>
            {!pwMode && <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Change your login password</p>}
          </div>
          {!pwMode && (
            <button onClick={() => setPwMode(true)} className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
              Change Password
            </button>
          )}
        </div>

        {pwMode && (
          <form onSubmit={handleChangePassword} style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: 'Current Password', key: 'currentPassword' },
              { label: 'New Password', key: 'newPassword' },
              { label: 'Confirm New Password', key: 'confirmPassword' },
            ].map(({ label, key }) => (
              <div key={key} className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{label} *</label>
                <input type="password" className="form-input" value={pwForm[key]} onChange={e => setPwForm({ ...pwForm, [key]: e.target.value })} required />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-crimson" disabled={loading} style={{ flex: 1 }}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
              <button type="button" onClick={() => { setPwMode(false); setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); }} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
