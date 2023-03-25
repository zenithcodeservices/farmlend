import { Order } from '@/types/order';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Create a new order
export const createOrder = async (order: Order) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, order);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get all orders
export const getOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get a single order by ID
export const getOrderById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Update an order by ID
export const updateOrder = async (id:number, order: Order) => {
  try {
    const response = await axios.put(`${BASE_URL}/orders/${id}`, order);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete an order by ID
export const deleteOrder = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
