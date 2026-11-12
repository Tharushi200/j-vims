import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, User, LogOut, Shield, FileText, ShoppingBag, DollarSign, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" onClick={closeMenu}>
        <Car className="w-8 h-8 text-red-500" style={{ color: 'var(--accent-red)' }} />
        <div>
          Bhagya Enterprises <span>.JP</span>
        </div>
      </Link>

      {/* Mobile Hamburger Toggle Button */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={`nav-links ${mobileMenuOpen ? 'nav-links-mobile-open' : ''}`}>
        <li>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="/vehicles" className="nav-link" onClick={closeMenu}>Vehicles</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
        </li>

        {user ? (
          <>
            {isAdmin() ? (
              <li>
                <Link to="/admin/dashboard" className="nav-link flex items-center gap-1" style={{ color: 'var(--accent-amber)' }} onClick={closeMenu}>
                  <Shield size={16} /> Admin Dashboard
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/customer/requests" className="nav-link flex items-center gap-1" onClick={closeMenu}>
                    <FileText size={16} /> My Requests
                  </Link>
                </li>
                <li>
                  <Link to="/customer/quotations" className="nav-link flex items-center gap-1" onClick={closeMenu}>
                    <DollarSign size={16} /> Quotations
                  </Link>
                </li>
                <li>
                  <Link to="/customer/orders" className="nav-link flex items-center gap-1" onClick={closeMenu}>
                    <ShoppingBag size={16} /> My Orders
                  </Link>
                </li>
              </>
            )}
            <li className="nav-user-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link 
                to={isAdmin() ? "/admin/dashboard" : "/customer/dashboard"} 
                className="badge badge-navy" 
                onClick={closeMenu}
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
          <li className="nav-auth-buttons" style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/login" className="btn btn-secondary" onClick={closeMenu}>Login</Link>
            <Link to="/register" className="btn btn-crimson" onClick={closeMenu}>Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
