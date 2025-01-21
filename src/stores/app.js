import { defineStore } from 'pinia';
import { apiService } from '@/stores/apiService'; // Import the API service

// Main store for managing houses
export const useHousesStore = defineStore({
  id: 'houses',
  state: () => ({
    houses: [], // List of houses
    id: null, // ID of the last created/edited house
  }),
  actions: {
    /**
     * Fetch all houses from the API and update the state.
     */
    async getHouses() {
      try {
        console.log('Fetching houses...');
        const data = await apiService.fetchHousesData();
        console.log('Fetched houses:', data);
        this.houses = data;
        this.sortHousesByPrice(); // Sort after fetching
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    },

    /**
     * Create a new house and optionally upload an image.
     * @param {Object} newHouse - House details.
     * @param {File} image - Image file (optional).
     */
    async postHouses(newHouse, image) {
      try {
        console.log('Creating a new house...');
        const formData = new FormData();
        formData.append('price', newHouse.price);
        formData.append('bedrooms', newHouse.bedrooms);
        formData.append('bathrooms', newHouse.bathrooms);
        formData.append('size', newHouse.size);
        formData.append('streetName', newHouse.streetName);
        formData.append('houseNumber', newHouse.houseNumber);
        formData.append('numberAddition', newHouse.numberAddition || '');
        formData.append('zip', newHouse.zip);
        formData.append('city', newHouse.city);
        formData.append('constructionYear', newHouse.constructionYear);
        formData.append('hasGarage', newHouse.hasGarage);
        formData.append('description', newHouse.description);

        const houseData = await apiService.createHouse(formData);
        console.log('House created:', houseData);
        this.id = houseData.id;

        if (image) {
          console.log('Uploading image...');
          const imageFormData = new FormData();
          imageFormData.append('image', image);
          await apiService.uploadImage(this.id, imageFormData);
          console.log('Image uploaded.');
        }
      } catch (error) {
        console.error('Error creating house:', error);
        throw error;
      }
    },

    /**
     * Delete a house by its ID.
     * @param {number} id - House ID.
     */
    async deleteHouse(id) {
      try {
        console.log('Deleting house with ID:', id);
        await apiService.deleteHouse(id);
        console.log('House deleted.');
        await this.getHouses(); // Refresh the list
      } catch (error) {
        console.error('Error deleting house:', error);
      }
    },

    /**
     * Sort houses by price in descending order.
     */
    sortHousesByPrice() {
      this.houses.sort((a, b) => b.price - a.price);
    },

    sortHousesBySize() {
        this.houses.sort((a, b) => b.size - a.size);
      },
  },
});

// Store for editing house details
export const useEditHouse = defineStore({
  id: 'editHouse',
  state: () => ({
    editHome: {
      price: '',
      bedrooms: '',
      bathrooms: '',
      size: '',
      streetName: '',
      houseNumber: '',
      city: '',
      zip: '',
      description: '',
      numberAddition: '',
      constructionYear: '',
      hasGarage: '',
      id: null,
    },
  }),
  actions: {
    async editHouse(editHome) {
      try {
        console.log('Editing house with data:', editHome);

        const formData = new FormData();
        formData.append('price', editHome.price);
        formData.append('bedrooms', editHome.bedrooms);
        formData.append('bathrooms', editHome.bathrooms);
        formData.append('size', editHome.size);
        formData.append('streetName', editHome.streetName);
        formData.append('houseNumber', editHome.houseNumber);
        formData.append('numberAddition', editHome.numberAddition || '');
        formData.append('zip', editHome.zip);
        formData.append('city', editHome.city);
        formData.append('constructionYear', editHome.constructionYear);
        formData.append('hasGarage', editHome.hasGarage);
        formData.append('description', editHome.description);

        const response = await apiService.updateHouse(editHome.id, formData);
        console.log('House edited successfully:', response);
      } catch (error) {
        console.error('Error editing house:', error);
        throw error;
      }
    },
  },
});

// Store for uploading images
export const useUpdateImage = defineStore({
  id: 'updateImage',
  actions: {
    async updateImage(id, imageFile) {
      try {
        console.log('Uploading image for house ID:', id);
        const formData = new FormData();
        formData.append('image', imageFile);

        await apiService.uploadImage(id, formData);
        console.log('Image uploaded successfully.');
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    },
  },
});
