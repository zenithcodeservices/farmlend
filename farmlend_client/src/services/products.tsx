import { Product } from '@/types/product';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Create a new product
export const createProduct = async (product: Product) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get a single product by ID
export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Update an product by ID
export const updateProduct = async (id:number, product: Product) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete an product by ID
export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
