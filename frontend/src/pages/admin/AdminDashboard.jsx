import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Car, Users, FileText, Ship, FileCheck, Truck, DollarSign, Calculator, ArrowRight, Star, MessageSquare, RefreshCw } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCustomers: 0, totalVehicles: 0, totalRequests: 0,
    activeOrders: 0, registrationPending: 0, totalRevenueLkr: 0,
    pendingQuotations: 0, pendingRequests: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to load stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const formatCurrency = (v) => v ? `LKR ${Number(v).toLocaleString('en-LK', { maximumFractionDigits: 0 })}` : 'LKR 0';
  const val = (key) => loading ? '...' : (stats[key] ?? 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent-amber)' }}>
            Operations Admin Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user?.fullName} (Admin / Operations Manager)</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={fetchStats} className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem' }}>
            <RefreshCw size={15} /> Refresh Stats
          </button>
          <Link to="/admin/reviews" className="btn btn-secondary">
            <Star size={18} /> Reviews
          </Link>
          <Link to="/admin/orders" className="btn btn-crimson">
            <Truck size={18} /> Order & Tracking Operations
          </Link>
          <Link to="/admin/custom-requests" className="btn btn-primary">
            <Calculator size={18} /> Quotation Engine
          </Link>
          <Link to="/admin/vehicles" className="btn btn-secondary">
            <Car size={18} /> Inventory
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {[
          { title: 'Total Customers', count: val('totalCustomers'), icon: <Users size={24} />, color: '#60a5fa' },
          { title: 'Total Vehicles', count: val('totalVehicles'), icon: <Car size={24} />, color: '#34d399' },
          { title: 'Import Requests', count: val('totalRequests'), icon: <FileText size={24} />, color: '#fbbf24' },
          { title: 'Active Orders', count: val('activeOrders'), icon: <Ship size={24} />, color: '#a78bfa' },
          { title: 'Registration Pending', count: val('registrationPending'), icon: <FileCheck size={24} />, color: '#f87171' },
          { title: 'Total Revenue', count: loading ? '...' : formatCurrency(stats.totalRevenueLkr), icon: <DollarSign size={24} />, color: '#34d399' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.8rem', borderRadius: '12px', background: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stat.count}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {!loading && (stats.pendingRequests > 0 || stats.pendingQuotations > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {stats.pendingRequests > 0 && (
            <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <FileText size={16} style={{ color: '#fbbf24' }} />
                <span style={{ fontSize: '0.88rem', color: '#fbbf24', fontWeight: '600' }}>{stats.pendingRequests} pending import request{stats.pendingRequests > 1 ? 's' : ''} need review</span>
              </div>
              <Link to="/admin/custom-requests" style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: '700', textDecoration: 'none' }}>Review →</Link>
            </div>
          )}
          {stats.pendingQuotations > 0 && (
            <div style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.3)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Calculator size={16} style={{ color: '#60a5fa' }} />
                <span style={{ fontSize: '0.88rem', color: '#60a5fa', fontWeight: '600' }}>{stats.pendingQuotations} quotation{stats.pendingQuotations > 1 ? 's' : ''} awaiting customer response</span>
              </div>
              <Link to="/admin/orders" style={{ color: '#60a5fa', fontSize: '0.8rem', fontWeight: '700', textDecoration: 'none' }}>View →</Link>
            </div>
          )}
        </div>
      )}

      {/* Quick Access Modules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calculator size={20} style={{ color: 'var(--accent-amber)' }} /> Quotation & Custom Import Engine
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Review customer custom import specifications, search Japan auction prices, and issue itemized quotations.</p>
          <Link to="/admin/custom-requests" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Open Quotation Engine <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Car size={20} style={{ color: 'var(--accent-red)' }} /> Vehicle Inventory Management
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Add new Japanese imports, set prices (JPY/LKR), and update vehicle availability status.</p>
          <Link to="/admin/vehicles" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Go to Inventory <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={20} style={{ color: 'var(--accent-emerald)' }} /> Order & Import Tracking
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Manage active orders: update Japan purchase, shipping vessel details, port arrival, lawyer registration, and final delivery.</p>
          <Link to="/admin/orders" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Manage Orders <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={20} style={{ color: 'var(--accent-amber)' }} /> Customer Reviews
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Approve, hide, or delete customer feedback and vehicle reviews. Monitor customer satisfaction ratings.</p>
          <Link to="/admin/reviews" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Manage Reviews <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
