import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const updateProfile = (id, data) => API.put(`/users/profile/${id}`, data);

export const getItems = () => API.get("/items");
export const getItemById = (id) => API.get(`/items/${id}`);

export const createItem = (formData) =>
  API.post("/items", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const getAdminMatches = () => API.get("/admin/matches");
export const informUserMatch = (data) => API.post("/admin/inform-user", data);
export const removeAdminMatch = (data) => API.post("/admin/remove", data);

export default API;