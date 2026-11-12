import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { vehicleService } from '../../services/vehicleService';
import { Search, Filter, Car, Fuel, Gauge, Calendar, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

const VehicleCatalog = () => {
  const [searchParams] = useSearchParams();
  const initialSearchParam = searchParams.get('search') || '';

  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState(initialSearchParam);
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlQuery = searchParams.get('search');
    if (urlQuery !== null) {
      setSearch(urlQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVehicles();
    }, 200);
    return () => clearTimeout(timer);
  }, [selectedCategory, fuelType, transmission, search]);

  const fetchCategories = async () => {
    try {
      const data = await vehicleService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  };

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory) params.categoryId = selectedCategory;
      if (fuelType) params.fuelType = fuelType;
      if (transmission) params.transmission = transmission;
      if (search && search.trim() !== '') params.search = search.trim();

      const data = await vehicleService.getAllVehicles(params);
      setVehicles(data);
    } catch (err) {
      console.error('Failed to load vehicles', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchVehicles();
  };

  const formatLkr = (amount) => {
    if (!amount) return 'LKR 0';
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 2rem' }} className="animate-fade-in">
      {/* Header & Search */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Japanese Motorbicycle & Vehicle Catalog</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Explore curated Japanese motorbicycles and vehicles available for direct import</p>

        <form onSubmit={handleSearchSubmit} style={{ maxWidth: '600px', margin: '1.5rem auto 0 auto', display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search BMW C400GT, ZX-25RR, ADV 160, PCX 125..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.75rem', borderRadius: '9999px' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
          <button type="submit" className="btn btn-crimson" style={{ borderRadius: '9999px', padding: '0.75rem 1.5rem' }}>
            Search
          </button>
        </form>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button
          className={`btn ${selectedCategory === null ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedCategory(null)}
          style={{ borderRadius: '9999px', fontSize: '0.875rem' }}
        >
          All Vehicles
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedCategory(cat.id)}
            style={{ borderRadius: '9999px', fontSize: '0.875rem' }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>
          <Filter size={16} /> Filters:
        </div>

        <select className="form-select" value={fuelType} onChange={(e) => setFuelType(e.target.value)} style={{ width: 'auto', padding: '0.5rem 1rem' }}>
          <option value="">All Fuel Types</option>
          <option value="PETROL">Petrol</option>
          <option value="DIESEL">Diesel</option>
          <option value="HYBRID">Hybrid</option>
          <option value="ELECTRIC">Electric</option>
        </select>

        <select className="form-select" value={transmission} onChange={(e) => setTransmission(e.target.value)} style={{ width: 'auto', padding: '0.5rem 1rem' }}>
          <option value="">All Transmissions</option>
          <option value="AUTOMATIC">Automatic</option>
          <option value="MANUAL">Manual</option>
          <option value="CVT">CVT</option>
        </select>

        {(selectedCategory || fuelType || transmission || search) && (
          <button
            onClick={() => { setSelectedCategory(null); setFuelType(''); setTransmission(''); setSearch(''); }}
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginLeft: 'auto' }}
          >
            <RefreshCw size={14} /> Clear Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading catalog...</div>
      ) : vehicles.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
          <Car size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Vehicles Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Try adjusting your filters or request a custom import.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {vehicles.map((v) => (
            <div key={v.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.25s ease' }}>
              <div style={{ position: 'relative', height: '200px', backgroundColor: '#000' }}>
                <img src={v.primaryImageUrl} alt={`${v.brand} ${v.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className={`badge ${v.availabilityStatus === 'AVAILABLE' ? 'badge-emerald' : 'badge-amber'}`} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                  {v.availabilityStatus}
                </span>
                <span className="badge badge-blue" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  {v.category?.name}
                </span>
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                  {v.brand} {v.model}
                </h3>

                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} /> {v.modelYear}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Fuel size={14} /> {v.fuelType}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Gauge size={14} /> {v.mileageKm ? `${v.mileageKm.toLocaleString()} km` : '0 km'}
                  </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {v.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: 'var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Estimated Price</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-red)' }}>{formatLkr(v.sellingPriceLkr)}</div>
                  </div>
                  <Link to={`/vehicles/${v.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleCatalog;
