import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { validateOtp } from '../utills/validation';
import { verifyOtp } from '../services/api';
import useAuthStore from '../store/authStore';
import saLogo from '../assets/sa-logo.svg';
import saName from '../assets/sa-name.svg';


const EnterOtpScreen = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const email = localStorage.getItem('email');

  useEffect(() => {
    if (!email) {
      navigate('/', { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    if (!validateOtp(otp)) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtp(email, otp.join(''));
      if (response?.data?.access_token) {
        setToken(response.data.access_token); // Fixed: Using access_token instead of token
        toast.success('Login successful');
        navigate('/dashboard', { replace: true });
      } else {
        toast.error('Invalid response from server');
        setOtp(new Array(6).fill(''));
      }
    } catch (err) {
      console.error('Verification error:', err);
      toast.error(err.response?.data?.message || 'Invalid OTP');
      setOtp(new Array(6).fill(''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    try {
      await sendOtp(email, '2.4.9');
      setTimer(30);
      toast.success('OTP resent successfully');
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="flex flex-col items-center gap-8 w-full max-w-md">
          <img src={saName} alt="Scholars Adda Name" className="w-[220px]" />

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Enter OTP</h1>
            <p className="text-sm">Please enter the OTP sent to {email}</p>
          </div>

          <div className="flex justify-center gap-3">
            {otp.map((value, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            ))}
          </div>

          <button
            onClick={handleResendOtp}
            disabled={timer > 0}
            className="text-sm text-gray-500 hover:text-orange-600"
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-[#FC7614] hover:bg-orange-700 text-white py-3 rounded-lg text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </button>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center">
        <img src={saLogo} alt="Scholars Adda Logo" className="w-full max-w-[500px]" />
      </div>
    </div>
  );
};

export default EnterOtpScreen;