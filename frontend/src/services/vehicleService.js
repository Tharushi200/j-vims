import api from './api';

const MOCK_CATEGORIES = [
  { id: 2, name: 'Motorcycle', code: 'MOTORCYCLE', description: 'Japanese Motorcycles, Scooters, and Sports Bikes', active: true },
  { id: 1, name: 'Bicycle', code: 'BICYCLE', description: 'Japanese Bicycles, E-Bikes, and Sports Bicycles', active: true },
  { id: 3, name: 'Car', code: 'CAR', description: 'Japanese Sedans, Hatchbacks, and Compact Cars', active: true },
  { id: 4, name: 'Van / Bus', code: 'VAN', description: 'Japanese Commercial Vans, Passenger Vans, and Minibuses', active: true },
  { id: 5, name: 'SUV / 4x4', code: 'SUV', description: 'Japanese SUVs, Crossovers, and 4x4 Vehicles', active: true }
];

const MOCK_VEHICLES = [
  {
    id: 1,
    category: { id: 2, name: 'Motorcycle', code: 'MOTORCYCLE' },
    brand: 'BMW',
    model: 'C400GT ABS',
    modelYear: 2024,
    conditionType: 'BRAND_NEW',
    mileageKm: 0,
    fuelType: 'PETROL',
    transmission: 'AUTOMATIC',
    engineCapacityCc: 350,
    color: 'Alpine White',
    japanPriceJpy: 1150000,
    importCostLkr: 1850000,
    sellingPriceLkr: 4600000,
    availabilityStatus: 'AVAILABLE',
    description: 'Premium BMW C400GT maxi-scooter with TFT connectivity display, Keyless Ride, Automatic Stability Control (ASC), and spacious underseat storage. Direct Japanese import.',
    primaryImageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 2,
    category: { id: 2, name: 'Motorcycle', code: 'MOTORCYCLE' },
    brand: 'Kawasaki',
    model: 'Ninja ZX-25RR KRT Edition',
    modelYear: 2024,
    conditionType: 'BRAND_NEW',
    mileageKm: 0,
    fuelType: 'PETROL',
    transmission: 'MANUAL',
    engineCapacityCc: 249,
    color: 'Lime Green / Ebony',
    japanPriceJpy: 1080000,
    importCostLkr: 1700000,
    sellingPriceLkr: 4250000,
    availabilityStatus: 'AVAILABLE',
    description: 'High-revving 249cc in-line 4 cylinder supersport bike with SHOWA BFRC lite rear suspension, Kawasaki Quick Shifter (KQS), and KTRC traction control.',
    primaryImageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 3,
    category: { id: 2, name: 'Motorcycle', code: 'MOTORCYCLE' },
    brand: 'Honda',
    model: 'ADV 160 ABS',
    modelYear: 2024,
    conditionType: 'BRAND_NEW',
    mileageKm: 0,
    fuelType: 'PETROL',
    transmission: 'AUTOMATIC',
    engineCapacityCc: 157,
    color: 'Mat Charcoal Gray',
    japanPriceJpy: 490000,
    importCostLkr: 820000,
    sellingPriceLkr: 1980000,
    availabilityStatus: 'AVAILABLE',
    description: 'Rugged urban adventure scooter featuring 157cc 4-valve eSP+ engine, Honda Selectable Torque Control (HSTC), adjustable windscreen, and Honda Smart Key.',
    primaryImageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 4,
    category: { id: 2, name: 'Motorcycle', code: 'MOTORCYCLE' },
    brand: 'Honda',
    model: 'PCX 125cc ABS',
    modelYear: 2024,
    conditionType: 'BRAND_NEW',
    mileageKm: 0,
    fuelType: 'PETROL',
    transmission: 'AUTOMATIC',
    engineCapacityCc: 124,
    color: 'Pearl Jasmine White',
    japanPriceJpy: 380000,
    importCostLkr: 650000,
    sellingPriceLkr: 1650000,
    availabilityStatus: 'AVAILABLE',
    description: 'Ultra-efficient Japanese spec Honda PCX 125cc with eSP+ engine, full LED lighting, USB Type-C charging port, and large 30L under-seat storage.',
    primaryImageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 5,
    category: { id: 2, name: 'Motorcycle', code: 'MOTORCYCLE' },
    brand: 'Yamaha',
    model: 'MT-07 ABS Japan Spec',
    modelYear: 2023,
    conditionType: 'BRAND_NEW',
    mileageKm: 0,
    fuelType: 'PETROL',
    transmission: 'MANUAL',
    engineCapacityCc: 689,
    color: 'Cyan Storm',
    japanPriceJpy: 780000,
    importCostLkr: 1200000,
    sellingPriceLkr: 4200000,
    availabilityStatus: 'AVAILABLE',
    description: 'Brand new 2023 Yamaha MT-07. 689cc CP2 engine, TFT digital dashboard, aggressive streetfighter styling, dual front disc brakes.',
    primaryImageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 6,
    category: { id: 3, name: 'Car', code: 'CAR' },
    brand: 'Toyota',
    model: 'Prius Hybrid S-Grade',
    modelYear: 2021,
    conditionType: 'RECONDITIONED',
    mileageKm: 35000,
    fuelType: 'HYBRID',
    transmission: 'AUTOMATIC',
    engineCapacityCc: 1800,
    color: 'Pearl White',
    japanPriceJpy: 1850000,
    importCostLkr: 3200000,
    sellingPriceLkr: 10800000,
    availabilityStatus: 'AVAILABLE',
    description: 'Mint condition 2021 Toyota Prius S-Safety Plus. Direct from Kobe auction. Features Toyota Safety Sense 2.0, dual-zone climate, and reverse camera.',
    primaryImageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 7,
    category: { id: 5, name: 'SUV / 4x4', code: 'SUV' },
    brand: 'Honda',
    model: 'Vezel e:HEV Z-Package',
    modelYear: 2022,
    conditionType: 'RECONDITIONED',
    mileageKm: 22000,
    fuelType: 'HYBRID',
    transmission: 'AUTOMATIC',
    engineCapacityCc: 1500,
    color: 'Crystal Black',
    japanPriceJpy: 2400000,
    importCostLkr: 3800000,
    sellingPriceLkr: 14500000,
    availabilityStatus: 'AVAILABLE',
    description: 'Stunning 2022 Honda Vezel Z-Package e:HEV. Premium leather interior, panoramic glass roof, 360-degree camera system, and Honda Sensing suite.',
    primaryImageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 8,
    category: { id: 4, name: 'Van / Bus', code: 'VAN' },
    brand: 'Toyota',
    model: 'HiAce Super GL Dark Prime II',
    modelYear: 2020,
    conditionType: 'RECONDITIONED',
    mileageKm: 48000,
    fuelType: 'DIESEL',
    transmission: 'AUTOMATIC',
    engineCapacityCc: 2800,
    color: 'Metallic Silver',
    japanPriceJpy: 2900000,
    importCostLkr: 4100000,
    sellingPriceLkr: 16800000,
    availabilityStatus: 'AVAILABLE',
    description: '2020 Toyota HiAce Dark Prime II Turbo Diesel 1GD. Dual sliding doors, upgraded LED headlights, half-leather seating, push start button.',
    primaryImageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 9,
    category: { id: 1, name: 'Bicycle', code: 'BICYCLE' },
    brand: 'Bridgestone',
    model: 'TB1e Dual Drive Electric Bike',
    modelYear: 2024,
    conditionType: 'BRAND_NEW',
    mileageKm: 0,
    fuelType: 'ELECTRIC',
    transmission: 'AUTOMATIC',
    engineCapacityCc: 0,
    color: 'Matte Black',
    japanPriceJpy: 140000,
    importCostLkr: 180000,
    sellingPriceLkr: 550000,
    availabilityStatus: 'AVAILABLE',
    description: 'Japanese precision Bridgestone TB1e Electric Bicycle. Dual drive front motor with kinetic energy recovery braking. Range up to 130km per charge.',
    primaryImageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80']
  }
];

const filterMockVehicles = (params = {}) => {
  let list = [...MOCK_VEHICLES];
  if (params.categoryId) {
    list = list.filter(v => v.category?.id === parseInt(params.categoryId));
  }
  if (params.fuelType) {
    list = list.filter(v => v.fuelType === params.fuelType);
  }
  if (params.transmission) {
    list = list.filter(v => v.transmission === params.transmission);
  }
  if (params.search && params.search.trim() !== '') {
    const q = params.search.toLowerCase().trim();
    const words = q.split(/\s+/).filter(Boolean);
    list = list.filter(v => {
      const fullText = `${v.brand || ''} ${v.model || ''} ${v.description || ''} ${v.color || ''} ${v.category?.name || ''}`.toLowerCase();
      return words.every(word => fullText.includes(word));
    });
  }
  return list;
};

export const vehicleService = {
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return MOCK_CATEGORIES;
    } catch (err) {
      console.warn('Backend unavailable, using mock categories');
      return MOCK_CATEGORIES;
    }
  },

  getAllVehicles: async (params = {}) => {
    try {
      const response = await api.get('/vehicles', { params });
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
      return filterMockVehicles(params);
    } catch (err) {
      console.warn('Backend unavailable, using mock vehicle inventory');
      return filterMockVehicles(params);
    }
  },

  getVehicleById: async (id) => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      if (response.data) return response.data;
      return MOCK_VEHICLES.find(v => v.id === parseInt(id)) || MOCK_VEHICLES[0];
    } catch (err) {
      console.warn('Backend unavailable, using mock vehicle details');
      return MOCK_VEHICLES.find(v => v.id === parseInt(id)) || MOCK_VEHICLES[0];
    }
  },

  createVehicle: async (vehicleData) => {
    try {
      const response = await api.post('/admin/vehicles', vehicleData);
      return response.data;
    } catch (err) {
      const newV = {
        id: Date.now(),
        ...vehicleData,
        category: MOCK_CATEGORIES.find(c => c.id === vehicleData.categoryId) || MOCK_CATEGORIES[0],
        primaryImageUrl: vehicleData.imageUrls?.[0] || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80'
      };
      MOCK_VEHICLES.unshift(newV);
      return newV;
    }
  },

  updateVehicle: async (id, vehicleData) => {
    try {
      const response = await api.put(`/admin/vehicles/${id}`, vehicleData);
      return response.data;
    } catch (err) {
      return vehicleData;
    }
  },

  updateVehicleStatus: async (id, status) => {
    try {
      const response = await api.patch(`/admin/vehicles/${id}/status`, null, { params: { status } });
      return response.data;
    } catch (err) {
      const v = MOCK_VEHICLES.find(item => item.id === parseInt(id));
      if (v) v.availabilityStatus = status;
      return v;
    }
  },

  deleteVehicle: async (id) => {
    try {
      const response = await api.delete(`/admin/vehicles/${id}`);
      return response.data;
    } catch (err) {
      const idx = MOCK_VEHICLES.findIndex(v => v.id === parseInt(id));
      if (idx !== -1) MOCK_VEHICLES.splice(idx, 1);
      return { message: 'Vehicle deleted' };
    }
  }
};
