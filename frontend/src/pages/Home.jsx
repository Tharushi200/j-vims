import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, ShieldCheck, Ship, FileCheck, ArrowRight, Sparkles, Award, 
  CheckCircle2, ChevronRight, Calculator, Search, 
  Star, Truck, Compass 
} from 'lucide-react';
import { vehicleService } from '../services/vehicleService';
import { reviewService } from '../services/reviewService';

const Home = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reviews, setReviews] = useState([]);
  
  // Interactive Calculator State
  const [jpyInput, setJpyInput] = useState(1200000); // 1.2M JPY
  const jpyRate = 2.15; // 1 JPY = 2.15 LKR

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getApprovedReviews();
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews', err);
    }
  };

  const fetchFeaturedVehicles = async () => {
    try {
      const data = await vehicleService.getAllVehicles();
      setFeaturedVehicles(data);
    } catch (err) {
      console.error('Failed to load featured vehicles', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await vehicleService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  };

  useEffect(() => {
    fetchFeaturedVehicles();
    fetchCategories();
    fetchReviews();
  }, []);

  const formatLkr = (amount) => {
    if (!amount) return 'LKR 0';
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);
  };

  // Calculator estimations
  const estimatedLkrBase = Math.round(jpyInput * jpyRate);
  const estimatedShipping = Math.round(estimatedLkrBase * 0.18); // ~18% shipping/freight
  const estimatedDuty = Math.round(estimatedLkrBase * 0.35); // ~35% tax/duty
  const estimatedTotal = estimatedLkrBase + estimatedShipping + estimatedDuty + 150000; // + service fee

  const filteredVehicles = selectedCategory 
    ? featuredVehicles.filter(v => v.category?.id === selectedCategory) 
    : featuredVehicles;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '0' }}>
      
      {/* Top Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        borderBottom: '1px solid rgba(220, 38, 38, 0.3)',
        padding: '0.6rem 1rem',
        fontSize: '0.85rem',
        textAlign: 'center',
        color: '#E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <span className="badge badge-red" style={{ padding: '0.2rem 0.6rem', fontSize: '0.7rem' }}>NEW SHIPMENT</span>
        <span>🚢 Next Vessel: Kobe Port <strong>28th Sept</strong> | 1 JPY = <strong>2.15 LKR</strong></span>
        <Link to="/customer/requests/new" style={{ color: 'var(--accent)', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
          Reserve Slot <ArrowRight size={14} />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="hero-section" style={{
        padding: '3rem 1.25rem 4rem 1.25rem',
        background: 'radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.16) 0%, rgba(15, 23, 42, 0) 60%), radial-gradient(circle at 10% 80%, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0) 70%)',
        position: 'relative',
        borderBottom: 'var(--border-color)',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          
          {/* Left Hero Content */}
          <div>
            <div className="badge badge-navy" style={{ marginBottom: '1.25rem', gap: '0.5rem', padding: '0.45rem 1rem', border: '1px solid rgba(220, 38, 38, 0.4)' }}>
              <Sparkles size={14} style={{ color: 'var(--accent)' }} /> #1 Specialist in Japanese Motorbicycle Imports
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.1rem, 6vw, 3.5rem)', 
              lineHeight: '1.15', 
              marginBottom: '1.25rem', 
              color: '#FFFFFF', 
              letterSpacing: '-0.03em',
              wordBreak: 'break-word'
            }}>
              DIRECT JAPANESE <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #FFFFFF 0%, #DC2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                MOTORBICYCLE IMPORTS
              </span>
            </h1>

            <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.7', maxWidth: '580px' }}>
              Direct Japanese imports featuring <strong>BMW C400GT</strong>, <strong>Kawasaki Ninja ZX-25RR</strong>, <strong>Honda ADV 160</strong>, and <strong>Honda PCX 125cc</strong>. Official USS auction reports, fast vessel shipping, and hassle-free Sri Lanka port clearance.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link to="/vehicles" className="btn btn-crimson" style={{ padding: '0.85rem 1.8rem', fontSize: '0.98rem', borderRadius: 'var(--radius-md)' }}>
                Explore Motorbikes <ArrowRight size={18} />
              </Link>
              <Link to="/customer/requests/new" className="btn btn-navy" style={{ padding: '0.85rem 1.6rem', fontSize: '0.98rem', borderRadius: 'var(--radius-md)' }}>
                Request Custom Motorbike
              </Link>
            </div>

            {/* Micro stats banner */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', paddingTop: '1.75rem', borderTop: 'var(--border-color)' }}>
              <div>
                <div style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: '800', color: '#FFFFFF' }}>100%</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)' }}>USS Certified</div>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: '800', color: 'var(--accent)' }}>04 Wks</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)' }}>Fast Vessel</div>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: '800', color: '#FFFFFF' }}>Legal</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)' }}>DMT Lawyer Reg</div>
              </div>
            </div>
          </div>

          {/* Right Dual Showcase Card */}
          <div className="glass-panel" style={{ padding: '1.25rem', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', height: '360px' }}>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80" 
                  alt="Kawasaki ZX-25RR & Honda PCX 125cc" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                  <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>ZX-25RR & PCX 125</span>
                </div>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80" 
                  alt="BMW C400GT & Honda ADV 160" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>BMW C400GT & ADV 160</span>
                </div>
              </div>
            </div>

            <div style={{ 
              marginTop: '1rem',
              background: 'rgba(15, 23, 42, 0.95)', 
              padding: '1.25rem', 
              borderRadius: 'var(--radius-md)', 
              border: 'var(--glass-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: '700', letterSpacing: '0.05em' }}>Featured Motorbike Fleet</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#FFF' }}>BMW C400GT, ZX-25RR, ADV 160 & PCX 125</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Direct Yokohama & Kobe Port Shipments to Colombo</div>
              </div>
              <Link to="/vehicles" className="btn btn-crimson" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                View All
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Category Selection Bar */}
      <section style={{ maxWidth: '1280px', margin: '-1.5rem auto 3rem auto', padding: '0 2rem', position: 'relative', zIndex: '10' }}>
        <div className="glass-panel" style={{ padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700', color: '#FFF', fontSize: '1rem' }}>
            <Compass size={20} style={{ color: 'var(--accent)' }} /> Filter Categories:
          </div>
          
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button 
              className={`btn ${selectedCategory === null ? 'btn-crimson' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory(null)}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', borderRadius: '9999px' }}
            >
              All Vehicles
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`btn ${selectedCategory === cat.id ? 'btn-crimson' : 'btn-secondary'}`}
                onClick={() => setSelectedCategory(cat.id)}
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', borderRadius: '9999px' }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Catalog Showcase Grid */}
      <section style={{ maxWidth: '1280px', margin: '3rem auto 5rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <span className="badge badge-red" style={{ marginBottom: '0.5rem' }}>AVAILABLE INVENTORY</span>
            <h2 style={{ fontSize: '2.2rem', color: '#FFF' }}>Direct Japanese Arrivals</h2>
          </div>
          <Link to="/vehicles" className="btn btn-outline" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
            Browse Full Marketplace <ChevronRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((v) => (
              <div key={v.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '210px' }}>
                  <img src={v.primaryImageUrl} alt={`${v.brand} ${v.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge badge-emerald" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    {v.availabilityStatus}
                  </span>
                  <span className="badge badge-navy" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    {v.category?.name}
                  </span>
                </div>
                
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '0.4rem' }}>
                    {v.brand} {v.model}
                  </h3>
                  
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                    <span>{v.modelYear}</span> • <span>{v.fuelType}</span> • <span>{v.transmission}</span>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: 'var(--border-color)' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Selling Price</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent)' }}>{formatLkr(v.sellingPriceLkr)}</div>
                    </div>
                    <Link to={`/vehicles/${v.id}`} className="btn btn-navy" style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              No vehicles found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Interactive Yen Cost Calculator Widget */}
      <section style={{ maxWidth: '1280px', margin: '5rem auto', padding: '0 2rem' }}>
        <div className="glass-panel" style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)', border: '1px solid rgba(220, 38, 38, 0.3)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            
            <div>
              <div className="badge badge-red" style={{ marginBottom: '1rem', gap: '0.4rem' }}>
                <Calculator size={14} /> TRANSPARENCY TOOL
              </div>
              <h2 style={{ fontSize: '2.2rem', color: '#FFF', marginBottom: '1rem' }}>Instant Japan Import Estimator</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
                Calculate the estimated Sri Lankan landed cost for any Japanese vehicle or motorcycle based on auction JPY price and active customs duty rates.
              </p>

              <div className="form-group">
                <label className="form-label" style={{ color: '#FFF', fontWeight: '700' }}>Enter Japan Price (JPY ¥):</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={jpyInput} 
                    onChange={(e) => setJpyInput(Number(e.target.value))}
                    style={{ fontSize: '1.2rem', fontWeight: '700', paddingLeft: '2.5rem', color: 'var(--accent)' }}
                  />
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: '800', color: 'var(--text-gray)' }}>¥</span>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>
                * Standard rate: 1 JPY = {jpyRate} LKR | Excludes local registration fees.
              </div>
            </div>

            {/* Calculated Breakdown Card */}
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: 'var(--glass-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1.5rem', borderBottom: 'var(--border-color)', paddingBottom: '0.75rem' }}>
                Estimated Landed Cost Breakdown
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Japan Vehicle Base Price (LKR)</span>
                  <span style={{ color: '#FFF', fontWeight: '600' }}>{formatLkr(estimatedLkrBase)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>RoRo Vessel Shipping Freight</span>
                  <span style={{ color: '#FFF', fontWeight: '600' }}>{formatLkr(estimatedShipping)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Sri Lanka Customs Duty & Taxes</span>
                  <span style={{ color: '#FFF', fontWeight: '600' }}>{formatLkr(estimatedDuty)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Port Clearing & Service Fee</span>
                  <span style={{ color: '#FFF', fontWeight: '600' }}>LKR 150,000</span>
                </div>

                <div style={{ borderTop: '1px solid rgba(220, 38, 38, 0.4)', paddingTop: '1.25rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: '700' }}>Total Estimated Cost</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent)' }}>{formatLkr(estimatedTotal)}</div>
                  </div>
                  <Link to="/customer/requests/new" className="btn btn-crimson" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
                    Request This Import
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* End-to-End Workflow Pipeline */}
      <section style={{ maxWidth: '1280px', margin: '5rem auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge badge-red" style={{ marginBottom: '0.5rem' }}>IMPORT PIPELINE</span>
          <h2 style={{ fontSize: '2.4rem', color: '#FFF', marginBottom: '0.5rem' }}>How J-VIMS Handles Your Order</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
            Complete end-to-end transparency from Japanese auction bidding to legal registration in Sri Lanka.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            { num: '01', title: 'Auction Sourcing', icon: <Search size={28} style={{ color: 'var(--accent)' }} />, desc: 'Vehicle selected from USS/TAA Japan auctions with 100% verified grading reports.' },
            { num: '02', title: 'Itemized Quotation', icon: <Award size={28} style={{ color: '#38bdf8' }} />, desc: 'Receive exact cost breakdown including FOB, freight, taxes, and service fees.' },
            { num: '03', title: 'Vessel Shipment', icon: <Ship size={28} style={{ color: '#4ade80' }} />, desc: 'Track your vehicle vessel position live as it sails from Yokohama to Sri Lanka.' },
            { num: '04', title: 'Lawyer DMT Reg', icon: <FileCheck size={28} style={{ color: '#fbbf24' }} />, desc: 'Dedicated legal lawyer assigned to complete DMT document processing and delivery.' },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: 'rgba(255, 255, 255, 0.05)', position: 'absolute', top: '1rem', right: '1.5rem' }}>
                {item.num}
              </div>
              <div style={{ marginBottom: '1.25rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Guarantee Badges */}
      <section style={{ background: '#090D16', borderTop: 'var(--border-color)', borderBottom: 'var(--border-color)', padding: '3.5rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ShieldCheck size={36} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.4rem' }}>USS Verified Auction</h4>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Direct Japanese auction access with official inspection certificates.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircle2 size={36} style={{ color: '#4ade80', marginBottom: '1rem' }} />
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.4rem' }}>Odometer Guarantee</h4>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>100% authentic mileage verification on all reconditioned vehicles.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Truck size={36} style={{ color: '#38bdf8', marginBottom: '1rem' }} />
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.4rem' }}>Port Clearance</h4>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Fast-track customs clearing at Hambantota & Colombo ports.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FileCheck size={36} style={{ color: '#fbbf24', marginBottom: '1rem' }} />
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.4rem' }}>Legal Registration</h4>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Complete lawyer documentation support for DMT registration.</p>
          </div>
        </div>
      </section>

      {/* Verified Customer Reviews Section */}
      <section style={{ maxWidth: '1280px', margin: '5rem auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.5rem', gap: '0.4rem' }}>
            <Award size={14} /> VERIFIED BUYER FEEDBACK
          </span>
          <h2 style={{ fontSize: '2.4rem', color: '#FFF', marginBottom: '0.5rem' }}>Customer Reviews & Experience</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
            100% verified feedback from clients who completed their direct Japanese vehicle and motorbicycle import orders.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.2rem' }}>
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={18} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                    ))}
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem', gap: '0.25rem' }}>
                    <CheckCircle2 size={12} /> Verified Buyer
                  </span>
                </div>

                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1, fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>

                <div style={{ borderTop: 'var(--border-color)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: '700', color: '#FFF', fontSize: '1rem' }}>{rev.customerName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent-red)', fontWeight: '600' }}>{rev.vehicleName}</div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                    {rev.orderNumber}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              No customer reviews yet.
            </div>
          )}
        </div>
      </section>

      {/* CTA Action Banner */}
      <section style={{ maxWidth: '1280px', margin: '5rem auto', padding: '0 2rem' }}>
        <div className="glass-panel" style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(220, 38, 38, 0.4)'
        }}>
          <h2 style={{ fontSize: '2.6rem', color: '#FFF', marginBottom: '1rem' }}>
            READY TO IMPORT YOUR BMW C400GT, ZX-25RR, ADV 160 OR PCX 125 FROM JAPAN?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 2.5rem auto', fontSize: '1.1rem' }}>
            Submit your exact specification today and receive a complete, itemized cost quotation within 24 hours.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/customer/requests/new" className="btn btn-crimson" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Create Custom Request Now <ArrowRight size={20} />
            </Link>
            <Link to="/vehicles" className="btn btn-navy" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              View Active Stock
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#090D16', borderTop: 'var(--border-color)', padding: '4rem 2rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.6rem', fontWeight: '800', color: '#FFF', marginBottom: '1rem' }}>
              <Car size={26} style={{ color: 'var(--accent)' }} /> J-VIMS <span>.JP</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Japan Vehicle Import & Sales Management System. Direct Japanese vehicle and motorbicycle imports to Sri Lanka.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ color: '#FFF', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/vehicles" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Vehicles</Link></li>
              <li><Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About Us</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{ color: '#FFF', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div>
                <strong style={{ color: '#FFF' }}>Phone:</strong>{' '}
                <a href="tel:+94771234567" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>+94 77 123 4567</a>
              </div>
              <div>
                <strong style={{ color: '#FFF' }}>Email:</strong>{' '}
                <a href="mailto:imports@jvims.com" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>imports@jvims.com</a>
              </div>
            </div>
          </div>

          {/* Legal Column */}
          <div>
            <h4 style={{ color: '#FFF', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <a 
                  href="#privacy" 
                  onClick={(e) => { e.preventDefault(); alert('Privacy Policy:\nJ-VIMS values your privacy. All customer custom import requests and documents are handled with strict confidentiality.'); }} 
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#terms" 
                  onClick={(e) => { e.preventDefault(); alert('Terms & Conditions:\nImport quotations are subject to active JPY exchange rates and Sri Lanka Customs duty tariffs at port arrival.'); }} 
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div style={{ borderTop: 'var(--border-color)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
          © 2026 J-VIMS. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
};

export default Home;


