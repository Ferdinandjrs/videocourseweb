import axiosInstance from './axiosInstance';

export const loginAPI = async (email, password) => {
  const response = await axiosInstance.post('/login', { email, password });
  return response.data;
};

export const registerAPI = async (userData) => {
  const response = await axiosInstance.post('/register', userData);
  return response.data;
};

export const getProfileAPI = async () => {
  const response = await axiosInstance.get('/profile');
  return response.data;
};

export const updateProfileAPI = async (profileData) => {
  const response = await axiosInstance.put('/profile', profileData);
  return response.data;
};

export const uploadFileAPI = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
