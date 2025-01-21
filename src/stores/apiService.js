import axios from 'axios';

const API_BASE_URL = 'https://api.intern.d-tt.nl/api';
const API_KEY = 'Jux6fCtiNcIGOMpEynFSbKz1TWv3PQR7';

export const apiService = {
  async fetchHousesData() {
    try {
      const response = await axios.get(`${API_BASE_URL}/houses`, {
        headers: { 'X-Api-Key': API_KEY },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching houses data:', error);
      throw error;
    }
  },

  async createHouse(houseForm) {
    try {
      const response = await axios.post(`${API_BASE_URL}/houses`, houseForm, {
        headers: { 'X-Api-Key': API_KEY },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating house:', error);
      throw error;
    }
  },

  async updateHouse(id, houseForm) {
    try {
      const response = await axios.post(`${API_BASE_URL}/houses/${id}`, houseForm, {
        headers: { 'X-Api-Key': API_KEY },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating house:', error);
      throw error;
    }
  },

  async deleteHouse(id) {
    try {
      await axios.delete(`${API_BASE_URL}/houses/${id}`, {
        headers: { 'X-Api-Key': API_KEY },
      });
    } catch (error) {
      console.error('Error deleting house:', error);
      throw error;
    }
  },

  async uploadImage(id, imageForm) {
    try {
      const response = await axios.post(`${API_BASE_URL}/houses/${id}/upload`, imageForm, {
        headers: {
          'X-Api-Key': API_KEY,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },
};
