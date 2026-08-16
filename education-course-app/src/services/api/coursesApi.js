import axiosInstance from './axiosInstance';

const ENDPOINT = '/courses';

export const getCourses = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const addCourse = async (courseData) => {
  try {
    const response = await axiosInstance.post(ENDPOINT, courseData);
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const response = await axiosInstance.put(`${ENDPOINT}/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.error(`Error updating course with id ${id}:`, error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axiosInstance.delete(`${ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting course with id ${id}:`, error);
    throw error;
  }
};
