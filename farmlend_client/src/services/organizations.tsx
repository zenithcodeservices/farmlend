import { Organization } from '@/types/organization';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Create a new organization
export const createOrganization = async (organization: Organization) => {
  try {
    const response = await axios.post(`${BASE_URL}/organizations`, organization);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get all organizations
export const getOrganizations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/organizations`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get a single organization by ID
export const getOrganizationById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/organizations/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Update an organization by ID
export const updateOrganization = async (id:number, organization: Organization) => {
  try {
    const response = await axios.put(`${BASE_URL}/organizations/${id}`, organization);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete an organization by ID
export const deleteOrganization = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/organizations/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
