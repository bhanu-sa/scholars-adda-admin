export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validateOtp = (otp) => {
    return otp.length === 6 && !otp.includes('');
  };