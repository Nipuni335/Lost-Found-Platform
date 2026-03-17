import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getItems = () => API.get("/items");

export const createItem = (data) => API.post("/items", data);

export const getItem = (id) => API.get(`/items/${id}`);