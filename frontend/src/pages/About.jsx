import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, ShieldCheck, Ship, FileCheck, ArrowRight, Award, 
  CheckCircle2, Search, Sparkles, Building2, Phone, Globe, MessageCircle
} from 'lucide-react';

const About = () => {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem 4rem 2rem',
        background: 'radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.18) 0%, rgba(15, 23, 42, 0) 60%), radial-gradient(circle at 10% 80%, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0) 70%)',
        borderBottom: 'var(--border-color)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="badge badge-navy" style={{ marginBottom: '1.25rem', display: 'inline-flex', gap: '0.5rem', padding: '0.45rem 1rem', border: '1px solid rgba(220, 38, 38, 0.4)' }}>
            <Sparkles size={14} style={{ color: 'var(--accent)' }} /> About Bhagya Enterprises .JP
          </div>
          
          <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '1.25rem', color: '#FFFFFF' }}>
            BHAGYA ENTERPRISES <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #FFFFFF 0%, #DC2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              DIRECT JAPANESE VEHICLE & MOTORBICYCLE IMPORTS
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '750px', margin: '0 auto 2rem auto' }}>
            Operated by <strong>Bhagya Gimhan</strong>, Bhagya Enterprises provides direct access to Japanese auction houses and major suppliers, delivering brand-new and reconditioned motorbicycles (ADV 160, PCX, BMW, Kawasaki), cars, and vans with 100% itemized pricing transparency.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div style={{ maxWidth: '1280px', margin: '3rem auto 0 auto', padding: '0 2rem' }}>
        
        {/* Featured Showcase: Official Poster & Promotion */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div>
            <div className="badge badge-red" style={{ marginBottom: '0.75rem' }}>FEATURED IMPORT DEAL</div>
            <h2 style={{ fontSize: '2.2rem', color: '#FFF', marginBottom: '0.75rem' }}>
              Honda ADV 160 ABS
            </h2>
            <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--accent-amber)', marginBottom: '1rem' }}>
              Rs. 1,980,000 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>(All-Inclusive Best Price)</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '0.98rem' }}>
              Direct Japanese import guaranteed. Brand new 2024 spec featuring 157cc eSP+ engine, full digital cockpit, HSTC traction control, and ABS braking system.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={18} style={{ color: 'var(--accent-emerald)' }} />
                <span style={{ fontSize: '0.95rem' }}><strong>Sri Lanka Contact:</strong> <a href="tel:+94760096432" style={{ color: '#FFF', textDecoration: 'none' }}>+94 76 009 6432</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={18} style={{ color: 'var(--accent-blue)' }} />
                <span style={{ fontSize: '0.95rem' }}><strong>Japan Contact / WhatsApp:</strong> <a href="tel:+817085586499" style={{ color: '#FFF', textDecoration: 'none' }}>+81 70-8558-6499</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Globe size={18} style={{ color: '#60a5fa' }} />
                <span style={{ fontSize: '0.95rem' }}><strong>Facebook:</strong> <a href="https://www.facebook.com/search/top?q=Bhagya%20Gimhan" target="_blank" rel="noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>Bhagya Gimhan</a></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/customer/requests/new" className="btn btn-crimson" style={{ padding: '0.75rem 1.5rem' }}>
                Order Now <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/817085586499" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', color: '#22c55e', gap: '0.4rem' }}>
                <MessageCircle size={16} /> WhatsApp Inquiry
              </a>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img 
              src="/images/bhagya-enterprises-poster.jpg" 
              alt="Bhagya Enterprises Honda ADV 160 Official Poster" 
              style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
            />
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Official Promotional Poster — Bhagya Enterprises</div>
          </div>
        </div>

        {/* Section 1: Who is Bhagya Enterprises & What Do We Do? */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <Building2 size={28} style={{ color: 'var(--accent)' }} />
              <h2 style={{ fontSize: '1.75rem', color: '#FFF' }}>Who is Bhagya Enterprises?</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.98rem', marginBottom: '1.25rem' }}>
              Founded by <strong>Bhagya Gimhan</strong>, Bhagya Enterprises is your premier direct Japanese vehicle and motorbicycle import partner connecting Sri Lankan buyers directly with authentic Japanese suppliers and USS auction houses.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.98rem' }}>
              We eliminate middleman markups by coordinating directly with auction coordinators in Yokohama and Kobe, ensuring verified condition grading, genuine mileage, and direct customs clearance.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <Award size={28} style={{ color: '#38bdf8' }} />
              <h2 style={{ fontSize: '1.75rem', color: '#FFF' }}>What Do We Do?</h2>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={18} style={{ color: '#4ade80', shrink: 0, marginTop: '2px' }} />
                <span><strong>Motorbicycle & Maxi-Scooter Imports:</strong> Specializing in Honda ADV 160, PCX 125, BMW C400GT, Kawasaki ZX-25RR, and Yamaha MT series.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={18} style={{ color: '#4ade80', shrink: 0, marginTop: '2px' }} />
                <span><strong>Itemized Cost Transparency:</strong> Clear breakdown of base Japan auction price (JPY), RoRo shipping, Customs duties, and local port clearance.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={18} style={{ color: '#4ade80', shrink: 0, marginTop: '2px' }} />
                <span><strong>Lawyer DMT Registration Support:</strong> Dedicated legal registration assistance to obtain Sri Lankan DMT vehicle registration numbers smoothly.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Section 2: How Does the Import Process Work? */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-red" style={{ marginBottom: '0.5rem' }}>STEP-BY-STEP PROCESS</span>
            <h2 style={{ fontSize: '2.4rem', color: '#FFF', marginBottom: '0.5rem' }}>How the Import Process Works</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
              From initial auction bidding in Japan to final legal registration and doorstep delivery in Sri Lanka.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              { 
                num: '01', 
                title: 'Selection & Auction Bidding', 
                icon: <Search size={30} style={{ color: 'var(--accent)' }} />, 
                desc: 'Select from available stock or request a custom model. We inspect official USS Japan auction sheets for 4.5+ grade rating.' 
              },
              { 
                num: '02', 
                title: 'Itemized Cost Quotation', 
                icon: <FileCheck size={30} style={{ color: '#38bdf8' }} />, 
                desc: 'Receive an exact quotation calculating JPY base cost, RoRo vessel shipping, Sri Lanka Customs duties, and legal fees.' 
              },
              { 
                num: '03', 
                title: 'RoRo Vessel Shipment', 
                icon: <Ship size={30} style={{ color: '#4ade80' }} />, 
                desc: 'Vehicle is loaded on RoRo vessels from Yokohama/Kobe ports. Track vessel position live as it sails to Hambantota/Colombo.' 
              },
              { 
                num: '04', 
                title: 'Lawyer DMT Reg & Delivery', 
                icon: <ShieldCheck size={30} style={{ color: '#fbbf24' }} />, 
                desc: 'Our appointed lawyer completes customs clearing and DMT legal registration, followed by direct customer handover.' 
              },
            ].map((step, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '900', color: 'rgba(255, 255, 255, 0.05)', position: 'absolute', top: '1rem', right: '1.25rem' }}>
                  {step.num}
                </div>
                <div style={{ marginBottom: '1.25rem' }}>{step.icon}</div>
                <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Trust & Assurance Stats */}
        <div className="glass-panel" style={{ padding: '3rem', marginBottom: '4rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)', border: '1px solid rgba(220, 38, 38, 0.3)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#FFF' }}>1,500+</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Vehicles & Bikes Imported</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent)' }}>100%</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>USS Auction Certified</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#38bdf8' }}>04 Wks</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Fast Vessel Transit Time</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4ade80' }}>Legal</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Lawyer DMT Registration</div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ textAlign: 'center', margin: '3rem 0' }}>
          <h2 style={{ fontSize: '2rem', color: '#FFF', marginBottom: '1rem' }}>Ready to Order Your Dream Motorbike or Vehicle?</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/vehicles" className="btn btn-crimson" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              Explore Inventory <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-navy" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              Contact Bhagya Enterprises
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
