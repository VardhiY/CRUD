import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" }
});

export const taskAPI = {
  list: () => api.get("/tasks").then(r => r.data),
  get: (id) => api.get(`/tasks/${id}`).then(r => r.data),
  create: (data) => api.post("/tasks", data).then(r => r.data),
  update: (id, data) => api.put(`/tasks/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/tasks/${id}`).then(r => r.data)
};
