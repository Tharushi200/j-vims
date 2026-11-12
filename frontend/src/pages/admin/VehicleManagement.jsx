import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicleService } from '../../services/vehicleService';
import {
  Car, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, RefreshCw,
  X, Search, Filter, Eye, ArrowLeft
} from 'lucide-react';

const EMPTY_FORM = {
  categoryId: '',
  brand: '',
  model: '',
  modelYear: new Date().getFullYear(),
  conditionType: 'BRAND_NEW',
  mileageKm: 0,
  fuelType: 'PETROL',
  transmission: 'AUTOMATIC',
  engineCapacityCc: 0,
  color: '',
  japanPriceJpy: 0,
  importCostLkr: 0,
  sellingPriceLkr: '',
  availabilityStatus: 'AVAILABLE',
  description: '',
  imageUrl: ''
};

const VehicleManagement = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null); // null = Add, object = Edit
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formLoading, setFormLoading] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Clear messages after 4 seconds
  useEffect(() => {
    if (success || error) {
      const t = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [success, error]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [vData, cData] = await Promise.all([
        vehicleService.getAllVehicles(),
        vehicleService.getCategories()
      ]);
      setVehicles(vData);
      setCategories(cData);
    } catch (err) {
      setError('Failed to load inventory data');
    } finally {
      setLoading(false);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingVehicle(null);
    setFormData({ ...EMPTY_FORM, categoryId: categories[0]?.id || '' });
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (v) => {
    setEditingVehicle(v);
    setFormData({
      categoryId: v.category?.id || categories[0]?.id || '',
      brand: v.brand || '',
      model: v.model || '',
      modelYear: v.modelYear || new Date().getFullYear(),
      conditionType: v.conditionType || 'BRAND_NEW',
      mileageKm: v.mileageKm || 0,
      fuelType: v.fuelType || 'PETROL',
      transmission: v.transmission || 'AUTOMATIC',
      engineCapacityCc: v.engineCapacityCc || 0,
      color: v.color || '',
      japanPriceJpy: v.japanPriceJpy || 0,
      importCostLkr: v.importCostLkr || 0,
      sellingPriceLkr: v.sellingPriceLkr || '',
      availabilityStatus: v.availabilityStatus || 'AVAILABLE',
      description: v.description || '',
      imageUrl: v.primaryImageUrl || v.imageUrls?.[0] || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingVehicle(null);
    setFormData(EMPTY_FORM);
  };

  // Form Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    const payload = {
      ...formData,
      categoryId: parseInt(formData.categoryId),
      modelYear: parseInt(formData.modelYear),
      mileageKm: parseInt(formData.mileageKm),
      engineCapacityCc: parseInt(formData.engineCapacityCc),
      japanPriceJpy: parseFloat(formData.japanPriceJpy || 0),
      importCostLkr: parseFloat(formData.importCostLkr || 0),
      sellingPriceLkr: parseFloat(formData.sellingPriceLkr),
      imageUrls: formData.imageUrl ? [formData.imageUrl] : []
    };

    try {
      if (editingVehicle) {
        await vehicleService.updateVehicle(editingVehicle.id, payload);
        setSuccess(`${formData.brand} ${formData.model} successfully updated!`);
      } else {
        await vehicleService.createVehicle(payload);
        setSuccess(`${formData.brand} ${formData.model} added to inventory!`);
      }
      closeModal();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save vehicle. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  // Status Change (inline)
  const handleStatusChange = async (id, status) => {
    try {
      await vehicleService.updateVehicleStatus(id, status);
      setSuccess(`Status updated to ${status}`);
      fetchData();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  // Delete
  const confirmDelete = (v) => setDeleteTarget(v);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await vehicleService.deleteVehicle(deleteTarget.id);
      setSuccess(`"${deleteTarget.brand} ${deleteTarget.model}" deleted from inventory.`);
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      setError('Failed to delete vehicle');
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatLkr = (amount) => {
    if (!amount) return 'LKR 0';
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);
  };

  const statusColor = (s) => {
    switch (s) {
      case 'AVAILABLE':   return { bg: 'rgba(16,185,129,0.15)', color: '#34d399', border: 'rgba(16,185,129,0.35)' };
      case 'RESERVED':    return { bg: 'rgba(251,191,36,0.15)',  color: '#fbbf24', border: 'rgba(251,191,36,0.35)' };
      case 'IMPORTED':    return { bg: 'rgba(56,189,248,0.15)',  color: '#38bdf8', border: 'rgba(56,189,248,0.35)' };
      case 'SOLD':        return { bg: 'rgba(239,68,68,0.15)',   color: '#f87171', border: 'rgba(239,68,68,0.35)' };
      default:            return { bg: 'rgba(148,163,184,0.1)',  color: '#94a3b8', border: 'rgba(148,163,184,0.2)' };
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || `${v.brand} ${v.model} ${v.color || ''}`.toLowerCase().includes(q);
    const matchCat = !filterCategory || v.category?.id === parseInt(filterCategory);
    return matchSearch && matchCat;
  });

  const setField = (key) => (e) => setFormData(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div style={{ maxWidth: '1320px', margin: '2rem auto', padding: '0 2rem' }} className="animate-fade-in">

      <button 
        type="button" 
        onClick={() => navigate('/admin/dashboard')} 
        className="btn btn-secondary" 
        style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem' }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#FFF', marginBottom: '0.35rem' }}>Vehicle Inventory Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Add, edit, update status, and delete vehicle listings &bull; {vehicles.length} vehicles in inventory
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchData} className="btn btn-secondary" style={{ padding: '0.6rem 1rem' }} title="Refresh">
            <RefreshCw size={16} />
          </button>
          <button onClick={openAddModal} className="btn btn-crimson" style={{ padding: '0.7rem 1.4rem' }}>
            <Plus size={18} /> Add New Vehicle
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '0.85rem 1.25rem', marginBottom: '1.25rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}
      {success && (
        <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', padding: '0.85rem 1.25rem', marginBottom: '1.25rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <CheckCircle2 size={18} /> {success}
        </div>
      )}

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by brand, model, color..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem', margin: 0 }}
          />
          <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={15} style={{ color: 'var(--text-muted)' }} />
          <select className="form-select" value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ margin: 0, minWidth: '160px' }}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
          Showing {filteredVehicles.length} / {vehicles.length}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '0.9rem 1rem' }}>Vehicle</th>
              <th style={{ padding: '0.9rem 1rem' }}>Category</th>
              <th style={{ padding: '0.9rem 1rem' }}>Year / Engine</th>
              <th style={{ padding: '0.9rem 1rem' }}>Japan Price</th>
              <th style={{ padding: '0.9rem 1rem' }}>Selling Price</th>
              <th style={{ padding: '0.9rem 1rem' }}>Status</th>
              <th style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading inventory...</td></tr>
            ) : filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <Car size={36} style={{ display: 'block', margin: '0 auto 1rem' }} />
                  {vehicles.length === 0 ? 'No vehicles yet. Click "Add New Vehicle" to start.' : 'No vehicles match your search/filter.'}
                </td>
              </tr>
            ) : (
              filteredVehicles.map((v) => {
                const sc = statusColor(v.availabilityStatus);
                return (
                  <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <img src={v.primaryImageUrl} alt={v.model} style={{ width: '54px', height: '42px', objectFit: 'cover', borderRadius: '7px', border: '1px solid rgba(255,255,255,0.08)' }} />
                        <div>
                          <div style={{ fontWeight: '700', color: '#FFF' }}>{v.brand} {v.model}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{v.color || '—'} &bull; {v.conditionType}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>{v.category?.name}</span>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ fontWeight: '600', color: '#FFF' }}>{v.modelYear}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{v.engineCapacityCc}cc &bull; {v.fuelType} &bull; {v.transmission}</div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      &yen;{(v.japanPriceJpy || 0).toLocaleString()}
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ fontWeight: '700', color: 'var(--accent)', fontSize: '0.95rem' }}>{formatLkr(v.sellingPriceLkr)}</div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <select
                        className="form-select"
                        value={v.availabilityStatus}
                        onChange={e => handleStatusChange(v.id, e.target.value)}
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', width: 'auto', minWidth: '115px', background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: '6px', fontWeight: '700', margin: 0 }}
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="RESERVED">RESERVED</option>
                        <option value="IMPORTED">IMPORTED</option>
                        <option value="SOLD">SOLD</option>
                        <option value="UNAVAILABLE">UNAVAILABLE</option>
                      </select>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <a href={`/vehicles/${v.id}`} target="_blank" rel="noreferrer" className="btn btn-secondary" title="View Public Page" style={{ padding: '0.4rem 0.65rem' }}>
                          <Eye size={14} />
                        </a>
                        <button onClick={() => openEditModal(v)} className="btn btn-secondary" title="Edit Vehicle" style={{ padding: '0.4rem 0.65rem', color: '#38bdf8', borderColor: 'rgba(56,189,248,0.3)' }}>
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => confirmDelete(v)} className="btn btn-secondary" title="Delete Vehicle" style={{ padding: '0.4rem 0.65rem', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT VEHICLE MODAL */}
      {showModal && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5,10,20,0.88)', backdropFilter: 'blur(10px)', overflowY: 'auto', padding: '2rem 1rem' }}
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="animate-fade-in" style={{ width: '100%', maxWidth: '760px', margin: '0 auto', background: '#141C2F', border: '1px solid rgba(220,38,38,0.4)', borderRadius: '16px', padding: '2rem 2.25rem', boxShadow: '0 30px 80px rgba(0,0,0,0.9)' }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', color: '#FFF' }}>
                  {editingVehicle ? `Edit: ${editingVehicle.brand} ${editingVehicle.model}` : 'Add New Vehicle Listing'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  {editingVehicle ? 'Update the vehicle details below and save changes.' : 'Fill in the vehicle details to add it to the live inventory.'}
                </p>
              </div>
              <button onClick={closeModal} className="btn btn-secondary" style={{ padding: '0.4rem' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '1rem' }}>Basic Information</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Category *</label>
                    <select className="form-select" value={formData.categoryId} onChange={setField('categoryId')} required>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Condition Type *</label>
                    <select className="form-select" value={formData.conditionType} onChange={setField('conditionType')}>
                      <option value="BRAND_NEW">Brand New</option>
                      <option value="RECONDITIONED">Reconditioned</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Brand *</label>
                    <input type="text" className="form-input" placeholder="BMW / Honda / Kawasaki" value={formData.brand} onChange={setField('brand')} required />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Model *</label>
                    <input type="text" className="form-input" placeholder="C400GT / ADV 160 / ZX-25RR" value={formData.model} onChange={setField('model')} required />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Model Year *</label>
                    <input type="number" className="form-input" min="2000" max="2030" value={formData.modelYear} onChange={setField('modelYear')} required />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Color</label>
                    <input type="text" className="form-input" placeholder="Alpine White / Pearl Black" value={formData.color} onChange={setField('color')} />
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#38bdf8', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '1rem' }}>Technical Specifications</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Fuel Type</label>
                    <select className="form-select" value={formData.fuelType} onChange={setField('fuelType')}>
                      <option value="PETROL">Petrol</option>
                      <option value="DIESEL">Diesel</option>
                      <option value="HYBRID">Hybrid</option>
                      <option value="ELECTRIC">Electric</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Transmission</label>
                    <select className="form-select" value={formData.transmission} onChange={setField('transmission')}>
                      <option value="AUTOMATIC">Automatic</option>
                      <option value="MANUAL">Manual</option>
                      <option value="CVT">CVT</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Engine CC</label>
                    <input type="number" className="form-input" min="0" value={formData.engineCapacityCc} onChange={setField('engineCapacityCc')} />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Mileage (km)</label>
                    <input type="number" className="form-input" min="0" value={formData.mileageKm} onChange={setField('mileageKm')} />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Availability Status</label>
                    <select className="form-select" value={formData.availabilityStatus} onChange={setField('availabilityStatus')}>
                      <option value="AVAILABLE">Available</option>
                      <option value="RESERVED">Reserved</option>
                      <option value="IMPORTED">Imported</option>
                      <option value="SOLD">Sold</option>
                      <option value="UNAVAILABLE">Unavailable</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#4ade80', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '1rem' }}>Pricing</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Japan Price (JPY)</label>
                    <input type="number" className="form-input" placeholder="1850000" min="0" value={formData.japanPriceJpy} onChange={setField('japanPriceJpy')} />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Import Cost (LKR)</label>
                    <input type="number" className="form-input" placeholder="3200000" min="0" value={formData.importCostLkr} onChange={setField('importCostLkr')} />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Selling Price (LKR) *</label>
                    <input type="number" className="form-input" placeholder="10800000" min="0" value={formData.sellingPriceLkr} onChange={setField('sellingPriceLkr')} required />
                  </div>
                </div>
              </div>

              {/* Media & Description */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#fbbf24', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '1rem' }}>Media & Description</div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Image URL</label>
                  <input type="url" className="form-input" placeholder="https://images.unsplash.com/photo-..." value={formData.imageUrl} onChange={setField('imageUrl')} />
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="preview" style={{ marginTop: '0.75rem', height: '80px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} onError={e => e.target.style.display = 'none'} />
                  )}
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" rows="3" placeholder="Vehicle condition, features, auction grade, special equipment..." value={formData.description} onChange={setField('description')}></textarea>
                </div>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} className="btn btn-secondary" style={{ padding: '0.7rem 1.5rem' }}>Cancel</button>
                <button type="submit" className="btn btn-crimson" style={{ padding: '0.7rem 1.75rem' }} disabled={formLoading}>
                  {formLoading
                    ? (editingVehicle ? 'Saving...' : 'Adding...')
                    : editingVehicle ? <><Edit2 size={16} /> Save Changes</> : <><Plus size={16} /> Add to Inventory</>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(5,10,20,0.9)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="animate-fade-in" style={{ maxWidth: '420px', width: '100%', background: '#141C2F', border: '1px solid rgba(239,68,68,0.5)', borderRadius: '14px', padding: '2rem', boxShadow: '0 25px 70px rgba(0,0,0,0.85)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(239,68,68,0.12)', marginBottom: '1rem' }}>
                <Trash2 size={30} style={{ color: '#f87171' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#FFF', marginBottom: '0.5rem' }}>Delete Vehicle Listing?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Are you sure you want to permanently delete<br />
                <strong style={{ color: '#FFF' }}>{deleteTarget.brand} {deleteTarget.model} ({deleteTarget.modelYear})</strong>?<br />
                This action cannot be undone.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={cancelDelete} className="btn btn-secondary" style={{ flex: 1, padding: '0.75rem' }}>Keep Vehicle</button>
              <button onClick={handleDelete} className="btn btn-crimson" style={{ flex: 1, padding: '0.75rem' }} disabled={deleteLoading}>
                {deleteLoading ? 'Deleting...' : <><Trash2 size={15} /> Yes, Delete</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;
