import api from './axios';

export const sendOtp = async (email) => {
  const res = await api.get(`/genEmailLoginOtp`, {
    params: { email },
  });
  return res.data;
};

export const verifyOtp = async (identifier, otp) => {
  const res = await api.get(`/verifyLoginOtp`, {
    params: { identifier, otp },
  });
  return res.data;
};

export const renewToken = async () => {
  const res = await api.post(`/renewToken`);
  return res.data;
};
