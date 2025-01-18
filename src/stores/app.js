import { defineStore } from 'pinia'
import { useRoute } from 'vue-router';

// Set up headers for API requests with the API key.
const myHeaders = new Headers();
myHeaders.append("X-Api-Key", "Jux6fCtiNcIGOMpEynFSbKz1TWv3PQR7");

// Default request options for GET requests.
const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

// Store for managing house-related actions and state.
export const useHousesStore = defineStore({
    id: 'houses',
    state: () => ({
        houses: [], // Array to store fetched houses.
    }),
    actions: {
        // Trigger a popup for confirming deletion of a house.
        deletePopup(id) {
            this.deletePopup = true;
            this.deleteId = id;
        },
        
        // Sort houses by price in descending order.
        sortHousesByPrice() {
            this.houses.sortBy = 'price';
            this.houses.sort((a, b) => b.price - a.price);
        },

        // Sort houses by size in descending order.
        sortHousesBySize() {
            this.houses.sortBy = 'size';
            this.houses.sort((a, b) => b.size - a.size);
        },

        // Send a DELETE request to remove a house by ID.
        deleteHouse(id) {
            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, requestOptions)
                .then(response => response.text())
                .catch(error => console.log('error', error));
        },
        
        /* Fetches all houses from the API, stores them in state, and sorts them by price. */
        getHouses() {
            fetch("https://api.intern.d-tt.nl/api/houses", requestOptions)
                .then(response => response.json())  // Parse the response as JSON.
                .then(data => this.houses = data)  // Store the data in state.
                .then(this.sortHousesByPrice)  // Sort houses by price.
                .catch(error => console.error('Error fetching houses:', error)); // Error handling.
        },
    }
})

// Store for editing house details.
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
        }
    }),
    actions: {
        // Send a POST request to update a house by ID.
        async editHouse(editHome) {
            var formdata = new FormData();
            formdata.append('price', editHome.price);
            formdata.append('bedrooms', editHome.bedrooms);
            formdata.append('bathrooms', editHome.bathrooms);
            formdata.append('size', editHome.size);
            formdata.append('streetName', editHome.streetName);
            formdata.append('houseNumber', editHome.houseNumber);
            formdata.append('numberAddition', editHome.numberAddition);
            formdata.append('zip', editHome.zip);
            formdata.append('city', editHome.city);
            formdata.append('constructionYear', editHome.constructionYear);
            formdata.append('hasGarage', editHome.hasGarage);
            formdata.append('description', editHome.description);


            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const id = editHome.id;
            return await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, requestOptions)
                .then(response => response.text())
                .catch(error => console.log('error', error));
        }
    }
})
// Store for creating a new house.
export const useStoreHouse = defineStore({
    id: 'post',
    state: () => ({
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
        image: null,
        id: '',
    }),
    actions: {
        // Send a POST request to create a new house.
        async postHouses(newPost, image) {
            var formdata = new FormData();
            formdata.append('price', newPost.price);
            formdata.append('bedrooms', newPost.bedrooms);
            formdata.append('bathrooms', newPost.bathrooms);
            formdata.append('size', newPost.size);
            formdata.append('streetName', newPost.streetName);
            formdata.append('houseNumber', newPost.houseNumber);
            formdata.append('numberAddition', newPost.numberAddition);
            formdata.append('zip', newPost.zip);
            formdata.append('city', newPost.city);
            formdata.append('constructionYear', newPost.constructionYear);
            formdata.append('hasGarage', newPost.hasGarage);
            formdata.append('description', newPost.description);
            formdata.append('image', image, "house.jpg");


            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            return await fetch("https://api.intern.d-tt.nl/api/houses", requestOptions)
                .then(response => response.json()) // Parse the response as JSON.
                .then(data => {
                    const id = data.id;
                    this.id = data.id;
                    const imageFormData = new FormData();
                    imageFormData.append("image", image, "house.jpg");
                    const imageRequestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: imageFormData,
                        redirect: 'follow'
                    };

                    // Upload the house image.
                    return fetch(`https://api.intern.d-tt.nl/api/houses/${id}/upload`, imageRequestOptions)
                        .then((respone) => {
                            if (!respone.ok) {
                                throw new Error(respone.statusText);
                            }
                            return respone.json();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch(error => console.log('error', error));
        }
    },
})

// Store for updating a house image.
export const useUpdateImage = defineStore({
    id: 'updateImage',
    state: () => ({
        image: null,
    }),
    actions: {
        // Send a POST request to update the image of a house by ID.
        async updateImage(id, image) {
            const imageFormData = new FormData();
            imageFormData.append("image", image, "house.jpg");
            const imageRequestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: imageFormData,
                redirect: 'follow'
            };
            
            // Upload the house image.
            return await fetch(`https://api.intern.d-tt.nl/api/houses/${id}/upload`, imageRequestOptions)
                .then((respone) => {
                    if (!respone.ok) {
                        throw new Error(respone.statusText);
                    }
                    return respone.json();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}); 