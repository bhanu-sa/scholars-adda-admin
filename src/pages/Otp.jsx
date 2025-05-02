import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import saLogo from '../assets/sa-logo.svg';
import saName from '../assets/sa-name.svg';

const EnterOtpScreen = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

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
    const enteredOtp = otp.join('');
    try {
      const res = await axios.get(`/verifyLoginOtp?identifier=${email}&otp=${enteredOtp}`);
      localStorage.setItem('token', res.data.token);
      navigate('/Dashboard');
    } catch (err) {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="flex flex-col items-center gap-8 w-full max-w-md">
          <img src={saName} alt="Scholars Adda Name" className="w-[220px]" />

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Enter OTP</h1>
            <p className="text-sm">Please login to your admin account</p>
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
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
              />
            ))}
          </div>

          <p className="text-sm text-gray-500">Resend OTP in <span className="font-semibold">20s</span></p>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#FC7614] hover:bg-orange-700 text-white py-3 rounded-lg text-base font-semibold"
          >
            Submit
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
