import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileText, ShoppingBag, Truck, CheckCircle2, Clock, ArrowRight, Bell } from 'lucide-react';
import { orderService } from '../../services/orderService';
import { quotationService } from '../../services/quotationService';
import api from '../../services/api';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ requests: 0, pendingQuotations: 0, activeOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [requests, quotations, orders] = await Promise.allSettled([
          api.get('/custom-requests/my-requests'),
          api.get('/quotations/my-quotations'),
          api.get('/orders/my-orders'),
        ]);

        const reqCount = requests.status === 'fulfilled' ? (requests.value.data?.length || 0) : 0;
        const quotesPending = quotations.status === 'fulfilled'
          ? (quotations.value.data?.filter(q => q.status === 'PENDING').length || 0) : 0;
        const activeOrd = orders.status === 'fulfilled'
          ? (orders.value.data?.filter(o => !['COMPLETED','CANCELLED'].includes(o.orderStatus)).length || 0) : 0;

        setStats({ requests: reqCount, pendingQuotations: quotesPending, activeOrders: activeOrd });
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'My Import Requests', value: stats.requests, icon: <FileText size={28} />, color: '#60a5fa', link: '/customer/requests' },
    { label: 'Pending Quotations', value: stats.pendingQuotations, icon: <ShoppingBag size={28} />, color: '#fbbf24', link: '/customer/quotations' },
    { label: 'Active Orders', value: stats.activeOrders, icon: <Truck size={28} />, color: '#34d399', link: '/customer/orders' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }} className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome, {user?.fullName}! 👋</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Customer Portal Dashboard — Gimhan Enterprises .JP</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {statCards.map((card, i) => (
          <Link key={i} to={card.link} style={{ textDecoration: 'none' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'transform 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ padding: '0.8rem', borderRadius: '12px', background: `${card.color}22`, color: card.color }}>
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '800' }}>
                  {loading ? '—' : card.value}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{card.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)' }}>
            <FileText size={18} /> Submit a Custom Import Request
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            Can't find your vehicle in our catalog? Request a custom import from Japan with your specifications and budget.
          </p>
          <Link to="/customer/requests/new" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
            New Import Request <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)' }}>
            <ShoppingBag size={18} /> Review Your Quotations
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            Check pending quotations from our team. Accept to confirm your vehicle order or reject if needed.
          </p>
          <Link to="/customer/quotations" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            View Quotations <ArrowRight size={14} />
          </Link>
        </div>

        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)' }}>
            <Truck size={18} /> Track Your Orders
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            View real-time shipping, customs clearance, registration, and delivery status for your vehicle orders.
          </p>
          <Link to="/customer/orders" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            Track Orders <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
