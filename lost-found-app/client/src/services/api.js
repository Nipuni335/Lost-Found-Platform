import axios from "axios";

// create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// GET all items
export const getItems = async () => {
  return await API.get("/items");
};

// CREATE new item
export const createItem = async (data) => {
  return await API.post("/items", data);
};

// GET single item by ID
export const getItem = async (id) => {
  return await API.get(`/items/${id}`);
};