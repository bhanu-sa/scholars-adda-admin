import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { validateEmail } from '../utills/validation';
import { sendOtp } from '../services/api';
import saLogo from '../assets/sa-logo.svg';
import saWel from '../assets/sa-wel.svg';
import saName from '../assets/sa-name.svg';

const OtpLogin = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ define version here (set it to backend-required value)
  const version = '2.4.9'; // ← replace this with the correct version string

  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // ✅ pass version along with email
      await sendOtp(email, version);
      localStorage.setItem('email', email);
      toast.success('OTP sent successfully');
      navigate('/otp');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={handleSendOtp}
            disabled={isLoading}
            className="w-full bg-[#FC7614] hover:bg-orange-700 text-white py-3 rounded-lg text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
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
