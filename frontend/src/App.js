import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomerLogin from './pages/CustomerLogin';
import CustomerSignUp from './pages/CustomerSignUp';
import VehicleList from './components/VehicleList';
import RentalPage from './components/RentalPage';
import PaymentPage from './components/PaymentPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const location = useLocation();


  const hideHeaderFooter = ['/', '/signup','/admin-login'].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<CustomerLogin />} />
        <Route path="/signup" element={<CustomerSignUp />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/rental" element={<RentalPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
