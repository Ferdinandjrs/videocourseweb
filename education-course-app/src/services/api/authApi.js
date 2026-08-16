import axiosInstance from './axiosInstance';

export const loginAPI = async (email, password) => {
  const response = await axiosInstance.post('/login', { email, password });
  return response.data;
};

export const registerAPI = async (userData) => {
  const response = await axiosInstance.post('/register', userData);
  return response.data;
};
