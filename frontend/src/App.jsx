import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VehicleCatalog from './pages/vehicles/VehicleCatalog';
import VehicleDetails from './pages/vehicles/VehicleDetails';
import VehicleManagement from './pages/admin/VehicleManagement';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CreateRequest from './pages/customer/CreateRequest';
import MyRequests from './pages/customer/MyRequests';
import MyQuotations from './pages/customer/MyQuotations';
import MyOrders from './pages/customer/MyOrders';
import Profile from './pages/customer/Profile';
import PaymentHistory from './pages/customer/PaymentHistory';
import CustomRequestsAdmin from './pages/admin/CustomRequestsAdmin';
import OrderManagementAdmin from './pages/admin/OrderManagementAdmin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ReviewsAdmin from './pages/admin/ReviewsAdmin';

// Automatically scroll to top of page on every route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.some(role => user.roles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vehicles" element={<VehicleCatalog />} />
            <Route path="/vehicles/:id" element={<VehicleDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Customer Routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/requests"
              element={
                <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
                  <MyRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/requests/new"
              element={
                <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
                  <CreateRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/quotations"
              element={
                <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
                  <MyQuotations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/orders"
              element={
                <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <ProtectedRoute allowedRoles={['ROLE_CUSTOMER', 'ROLE_ADMIN']}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/payments"
              element={
                <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
                  <PaymentHistory />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/vehicles"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <VehicleManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/custom-requests"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <CustomRequestsAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <OrderManagementAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <ReviewsAdmin />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
