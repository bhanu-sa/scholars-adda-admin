import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OtpLogin from './pages/Login';
import EnterOtpScreen from './pages/Otp';
import EnterAuthScreen from './pages/Auth';
import Dashboard from './pages/admin/dashboard';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OtpLogin />} />
        <Route path="/otp" element={<EnterOtpScreen />} />
        <Route path="/auth" element={<EnterAuthScreen />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
