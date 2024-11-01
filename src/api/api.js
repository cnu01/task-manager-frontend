// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-manager-backend-o6uq.onrender.com/api', 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchTasks = () => api.get('/tasks');

export const createTask = (taskData) => api.post('/tasks/createTask', taskData);

export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;