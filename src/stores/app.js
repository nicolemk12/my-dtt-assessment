import { defineStore } from 'pinia'
import { useRoute } from 'vue-router';


const myHeaders = new Headers();
myHeaders.append("X-Api-Key", "Jux6fCtiNcIGOMpEynFSbKz1TWv3PQR7");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};


export const useHousesStore = defineStore({
    id: 'houses',
    state: () => ({
        houses: [],
    }),
    actions: {
        deletePopup(id) {
            this.deletePopup = true;
            this.deleteId = id;
        },

        sortHousesByPrice() {
            this.houses.sortBy = 'price';
            this.houses.sort((a, b) => b.price - a.price);
        },

        sortHousesBySize() {
            this.houses.sortBy = 'size';
            this.houses.sort((a, b) => b.size - a.size);
        },

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
        getHouses() {
            fetch("https://api.intern.d-tt.nl/api/houses", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch houses');
                    }
                    return response.json();
                })
                .then(data => {
                    if (!Array.isArray(data)) {
                        throw new Error('Unexpected response format');
                    }
                    this.houses = data;
                    this.sortHousesByPrice();
                })
                .catch(error => {
                    console.error('Error fetching houses:', error);
                    this.houses = []; // Ensure houses is at least an empty array
                });
        }
        
    }
})

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
        
        async postHouses(formData) {
            const myHeaders = new Headers();
            myHeaders.append("X-Api-Key", "Jux6fCtiNcIGOMpEynFSbKz1TWv3PQR7");
        
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,  // Do not manually set Content-Type here
                body: formData,      // This is the FormData you send
                redirect: 'follow'
            };
        
            try {
                const response = await fetch("https://api.intern.d-tt.nl/api/houses", requestOptions);
                const data = await response.json();
                if (response.ok) {
                    return data;
                } else {
                    throw new Error(`Error: ${response.status} - ${data.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error posting house:', error);
                throw error;
            }
        }
        
        }
    });     

export const useUpdateImage = defineStore({
    id: 'updateImage',
    state: () => ({
        image: null,
    }),
    actions: {
        async updateImage(id, image) {
            const imageFormData = new FormData();
            imageFormData.append("image", image, "house.jpg");
            const imageRequestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: imageFormData,
                redirect: 'follow'
            };

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