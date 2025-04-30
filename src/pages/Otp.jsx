import React from 'react';
import saLogo from '../assets/sa-logo.svg';
import saName from '../assets/sa-name.svg';
const EnterOtpScreen = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="flex flex-col items-center gap-8 w-full max-w-md">
          {/* Name Logo */}
          <img
            src={saName}
            alt="Scholars Adda Name"
            className="w-[220px] h-auto object-contain"
          />

          {/* Text */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter OTP</h1>
            <p className="text-sm text-gray-600">Please login to your admin account</p>
          </div>

          {/* OTP Boxes */}
          <div className="flex justify-center gap-3">
            {[...Array(4)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-14 h-14 border border-gray-300 rounded-lg text-center text-xl font-mono"
              />
            ))}
          </div>

          {/* Resend text */}
          <p className="text-sm text-gray-500">Resend OTP In <span className="font-semibold text-gray-800">20s</span></p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FC7614] hover:bg-orange-700 transition text-white py-3 rounded-lg text-base font-semibold"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          src={saLogo}
          alt="Scholars Adda Logo"
          className="w-full max-w-[500px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default EnterOtpScreen;