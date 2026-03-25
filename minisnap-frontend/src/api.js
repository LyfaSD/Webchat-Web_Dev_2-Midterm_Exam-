import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

// STORIES
export const getStories = () => api.get("/stories");
export const postStory = (formData) =>
  api.post("/stories", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// MESSAGES (chats)
export const getUsers = () => api.get("/users");
export const getMessages = (userId) => api.get(`/messages/${userId}`);
export const sendMessage = (data) => api.post("/messages", data);