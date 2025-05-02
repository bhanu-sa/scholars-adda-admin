import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import saLogo from '../assets/sa-logo.svg';
import saWel from '../assets/sa-wel.svg';
import saName from '../assets/sa-name.svg';

const OtpLogin = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.get(`/genEmailLoginOtp?email=${email}`);
      localStorage.setItem('email', email);
      navigate('/otp');
    } catch (err) {
      alert('Failed to send OTP');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="flex flex-col items-center gap-8 w-full max-w-md">
          <div className="flex flex-col items-center gap-2">
            <img src={saName} alt="Scholars Adda Name" className="w-[220px]" />
            <img src={saWel} alt="Welcome" className="w-[340px]" />
          </div>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
          />

          <button
            onClick={handleSendOtp}
            className="w-full bg-[#FC7614] hover:bg-orange-700 text-white py-3 rounded-lg text-base font-semibold"
          >
            Send OTP
          </button>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center">
        <img src={saLogo} alt="Scholars Adda Logo" className="w-full max-w-[500px]" />
      </div>
    </div>
  );
};

export default OtpLogin;
