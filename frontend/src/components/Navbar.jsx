import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, User, LogOut, Shield, FileText, ShoppingBag, DollarSign } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <Car className="w-8 h-8 text-red-500" style={{ color: 'var(--accent-red)' }} />
        <div>
          Bhagya Enterprises <span>.JP</span>
        </div>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/vehicles" className="nav-link">Vehicles</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">About Us</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>

        {user ? (
          <>
            {isAdmin() ? (
              <li>
                <Link to="/admin/dashboard" className="nav-link flex items-center gap-1" style={{ color: 'var(--accent-amber)' }}>
                  <Shield size={16} /> Admin Dashboard
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/customer/requests" className="nav-link flex items-center gap-1">
                    <FileText size={16} /> My Requests
                  </Link>
                </li>
                <li>
                  <Link to="/customer/quotations" className="nav-link flex items-center gap-1">
                    <DollarSign size={16} /> Quotations
                  </Link>
                </li>
                <li>
                  <Link to="/customer/orders" className="nav-link flex items-center gap-1">
                    <ShoppingBag size={16} /> My Orders
                  </Link>
                </li>
              </>
            )}
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1rem' }}>
              <Link 
                to={isAdmin() ? "/admin/dashboard" : "/customer/dashboard"} 
                className="badge badge-navy" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  padding: '0.4rem 0.85rem', 
                  textDecoration: 'none', 
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer'
                }}
                title="View Dashboard"
              >
                <User size={14} style={{ color: 'var(--accent)' }} />
                <span>{user.fullName}</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', gap: '0.3rem' }}>
                <LogOut size={14} /> Logout
              </button>
            </li>
          </>
        ) : (
          <li style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-crimson">Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
