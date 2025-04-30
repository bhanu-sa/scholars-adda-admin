import React from 'react';
import saLogo from '../assets/sa-logo.svg';
import saWel from '../assets/sa-wel.svg';
import saName from '../assets/sa-name.svg';

const OtpLogin = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left: Login Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="flex flex-col items-center gap-8 w-full max-w-md">
          {/* Logos */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={saName}
              alt="Scholars Adda Name"
              className="w-[220px] h-auto object-contain"
            />
            <img
              src={saWel}
              alt="Welcome"
              className="w-[340px] h-auto object-contain"
            />
          </div>

          {/* Email & Password */}
          <div className="flex flex-col gap-4 w-full">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
            />
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#FC7614] hover:bg-orange-700 transition text-white py-3 rounded-lg text-base font-semibold"
          >
            Login
          </button>
        </div>
      </div>

      {/* Right: Logo */}
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

export default OtpLogin;