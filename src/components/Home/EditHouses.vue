<script>
import { useEditHouse, useHousesStore, useUpdateImage } from '@/stores/app.js'; 
import { useRoute } from 'vue-router'; 
import { computed } from 'vue'; 

export default {
    data() {
        const storeHouses = useHousesStore(); // Initialize the store for managing house data.
        const router = useRoute(); // Access the current route.
        const id = router.params.id; // Extract the house ID from the route parameters.

        // Fetch all houses from the API.
        const getHouses = () => {
            storeHouses.getHouses();
        };

        // Find the house to edit based on the current ID.
        const house = computed(() => {
            return storeHouses.houses.find(house => house.id.toString() === id.toString());
        });

        // Extract the numeric portion of the street name.
        const numbers = computed(() => {
            const regex = /\d+/g;
            const matches = house.value.location.street.match(regex);
            return matches ? matches.join(' ') : null;
        });

        // Extract the non-numeric portion of the street name.
        var street = computed(() => {
            const regex = /[^\d]+/g;
            const matches = house.value.location.street.match(regex);
            return matches ? matches.join(' ') : null;
        });

        // Return reactive data for editing a house.
        return {
            house,
            editHome: { // Stores the details of the house being edited.
                price: '',
                bedrooms: '',
                bathrooms: '',
                size: '',
                streetName: '',
                houseNumber: '',
                city: '',
                zip: '',
                numberAddition: '',
                constructionYear: '',
                hasGarage: '',
                description: '',
                id: '',
            },
            image: null, // Stores the uploaded image.
            url: null, // Stores the preview URL of the uploaded image.
            getHouses,
            numbers,
            street,
        };
    },

    methods: {
        /* Generates a preview of the uploaded image.
         Updates the house's image URL for preview purposes.
         @param {Event} event - The input event containing the uploaded file. */
        ShowPreview(event) {
            this.image = event.target.files[0];
            this.url = URL.createObjectURL(this.image);
            this.house.image = this.url;
        },

        /* Clears the image preview and resets the input field. */
        ClearPreview() {
            this.image = null;
            this.house.image = null;
            this.url = null;
            document.getElementById('image').value = ''; // Reset the file input.
        },

        /* Submits the edited house data to the API.
         Updates the house details and optionally uploads a new image. */
        addHouse() {
            const id = this.$route.params.id;

            // Edit house details without changing the image.
            if (!this.image) {
                const houseEdit = useEditHouse();
                houseEdit.editHouse(this.editHome)
                    .then(() => {
                        this.$router.push(`/houses/detail/${id}`); // Navigate to the house details page.
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                // Edit house details and upload a new image.
                const houseEdit = useEditHouse();
                const updateImage = useUpdateImage();
                houseEdit.editHouse(this.editHome)
                    .then(() => {
                        this.$router.push(`/houses/detail/${id}`);
                    })
                    .then(() => {
                        updateImage.updateImage(id, this.image); // Upload the new image.
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
    },

    // Fetches all houses when the component is created.
    created() {
        this.getHouses();
    },

    // Initializes the edit form fields when the component is mounted.
    mounted() {
        this.editHome.price = this.house.price;
        this.editHome.bedrooms = this.house.rooms.bedrooms;
        this.editHome.bathrooms = this.house.rooms.bathrooms;
        this.editHome.size = this.house.size;
        this.editHome.streetName = this.street;
        this.editHome.houseNumber = this.numbers;
        this.editHome.city = this.house.location.city;
        this.editHome.zip = this.house.location.zip;
        this.editHome.constructionYear = this.house.constructionYear;
        this.editHome.hasGarage = this.house.hasGarage ? 'yes' : 'no';
        this.editHome.description = this.house.description;
        this.url = this.house.image;
        this.editHome.id = this.house.id;
        if (this.house.numberAddition) {
            this.editHome.numberAddition = this.house.location.numberAddition;
        }
    },
};
</script>

<template>
    <!-- Wrapper for the edit form -->
    <div class="wrapper">
        <img src="../../assets/images/img_background.png" class="background">

        <!-- Navigation back to the house details page -->
        <div class="back">
            <div class="mobile-back">
                <router-link class="back-class" @click="$router.go(-1)" to="">
                    <img class="back-button" src="../../assets/images/ic_back_grey.png" alt="back">
                    <a class="back-text">Back to detail page</a>
                </router-link>
            </div>
            <div class="mobile-listing">
                <h1 class="mobile-title">Create new listing</h1>
            </div>
        </div>

        <!-- Form for editing house details -->
        <h1 class="title">Edit listing</h1>
        <form @submit.prevent="addHouse">
            <div class="form">
                <!-- Street name input -->
                <div class="streetname">
                    <label class="labelstreet" for="street">Street name*</label>
                    <input class="street" id="street" required type="text" v-model="editHome.streetName"
                        placeholder="Enter the street class">
                </div>

                <!-- House number and addition inputs -->
                <div class="numberandaddition">
                    <div class="number">
                        <label class="labelhousenumber" for="housenumber">House number*</label>
                        <input class="housenumber" required type="text" v-model="editHome.houseNumber"
                            placeholder="Enter house number">
                    </div>
                    <div class="extra">
                        <label class="labeladdition" for="addition">Addition (optional)</label>
                        <input class="addition" type="text" placeholder="e.g. A">
                    </div>
                </div>

                <!-- Postal code input -->
                <div class="postcode">
                    <label class="labelpostalcode" for="postalcode">Postal code*</label>
                    <input class="postalcode" type="text" v-model="editHome.zip" placeholder="e.g. 1000 AA">
                </div>

                <!-- City input -->
                <div>
                    <label class="labelcity" for="city">City*</label>
                    <input class="city" type="text" v-model="editHome.city" placeholder="e.g. Utrecht">
                </div>

                <!-- Picture upload and preview -->
                <div class="picture">
                    <label class="labelpicture">Upload picture (PNG or JPG)*</label>
                    <input @change="ShowPreview" class="image" id="image" type="file" accept=".jpg, .png">
                </div>
                <div v-if="house.image">
                    <img class="preview" :src="url" alt="preview">
                    <img class="previewremove" src="../../assets/images/ic_clear_white.png" alt="remove" @click="ClearPreview">
                </div>
                <label class="labelimage" for="image" v-else>
                    <img class="imageplus" src="../../assets/images/ic_plus_grey.png" alt="plus">
                </label>

                <!-- Price, size, garage, bedrooms, and bathrooms inputs -->
                <!-- Other form fields follow similar patterns -->

                <!-- Submit button -->
                <div class="post">
                    <button class="postbutton">SAVE</button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}

.background {
    width: 100%;
    height: 100%;
    position: absolute;
}

.mobile-listing {
    display: none;
}

.back {
    display: flex;
    align-items: center;
    margin-left: 15%;
}

.back-class {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-top: 30px;
}

.back-button {
    width: 20px;
    height: 20px;
}

.back-text {
    font-size: 14px;
    font-family: var(--font-family);
    font-weight: 600;
    color: var(--primary-text);
    margin-left: 10px;
    text-decoration: none;
}

.title {
    font-size: 24px;
    font-family: var(--font-family);
    font-weight: 700;
    color: var(--primary-text);
    margin-left: 15%;
    margin-top: 30px;
}

.preview {
    width: 120px;
    height: 120px;
}

.previewremove {
    width: 30px;
    height: 30px;
    position: absolute;
    cursor: pointer;
    margin-left: -3.5%;
    margin-top: -2%
}


.form {
    display: flex;
    flex-direction: column;
    width: 25%;
    margin-left: 15%;
    margin-top: 30px;
}

.number,
.extra,
.bathfield,
.bedfield {
    width: 100%;
}

input,
textarea,
select {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 11px;
    font-family: var(--font-family);
    font-weight: 600;
    color: var(--secondary);
    margin-bottom: 10px;
}

label {
    font-size: 11px;
    font-family: var(--font-family);
    font-weight: 600;
    color: var(--secondary);
    margin-bottom: 5px;
}

.sizeandgarage,
.bedandbath,
.numberandaddition {
    display: flex;
    gap: 10px;
}

.description {
    height: 100px;
    padding-top: 10px;
    resize: none;
}

.garage {
    background-color: var(--background2);
}

.sizefield,
.garagefield {
    width: 50%;
}

.picture>input {
    display: none;
}

.imageplus {
    width: 30px;
    height: 30px;
}

.labelimage {
    border-style: dashed;
    border-color: var(--tertiary2);
    border-width: 2px;
    width: 120px;
    height: 120px;
}

.labelimage>img {
    margin-left: 42px;
    margin-top: 40px;
}

.post {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.postbutton {
    width: 170px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: var(--primary);
    font-size: 14px;
    font-family: var(--font-family);
    font-weight: 700;
    color: var(--background2);
    cursor: pointer;
}

@media screen and (max-width: 750px) {

    .wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }

    .background {
        width: 100%;
        bottom: 0;
        height: 50%;
        position: absolute;
        filter: blur(6px);
    }

    .back {
        display: flex;
        margin-left: 20px;
        margin-top: 30px;
    }

    .back-class {
        text-decoration: none;
        display: flex;
        margin-top: 0;
    }

    .mobile-listing {
        display: grid;
        width: 100%;
        height: 100%;
        margin-right: 20px;
        justify-items: center;
        align-items: center;
        white-space: nowrap;
    }

    .back-button {
        width: 20px;
        height: 20px;
    }

    .back-text {
        display: none;
    }

    .title {
        display: none;
    }

    .mobile-title {
        font-size: 24px;
        font-family: var(--font-family);
        font-weight: 700;
        color: var(--primary-text);
    }

    .form {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-left: 20px;
        margin-top: 30px;
        padding-bottom: 20%;
    }

    input,
    textarea,
    select {
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 11px;
        font-family: var(--font-family);
        font-weight: 600;
        color: var(--tertiary2);
        margin-bottom: 10px;
    }

    label {
        font-size: 11px;
        font-family: var(--font-family);
        font-weight: 600;
        color: var(--secondary);
        margin-bottom: 5px;
    }

    .sizeandgarage,
    .bedandbath,
    .numberandaddition {
        display: flex;
        gap: 10px;
    }

    .description {
        height: 100px;
        padding-top: 10px;
        resize: none;
    }

    .garage {
        background-color: var(--background2);
    }

    .sizefield,
    .garagefield {
        width: 50%;
    }

    .picture>input {
        display: none;
    }

    .imageplus {
        width: 30px;
        height: 30px;
    }

    .number,
    .extra,
    .bathfield,
    .bedfield {
        width: 100%;
    }

    .labelimage {
        border-style: dashed;
        border-color: var(--tertiary2);
        border-width: 2px;
        width: 120px;
        height: 120px;
    }

    .labelimage>img {
        margin-left: 42px;
        margin-top: 40px;
    }

    .post {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }

    .postbutton {
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: var(--primary);
        font-size: 14px;
        font-family: var(--font-family);
        font-weight: 700;
        color: var(--background2);
        cursor: pointer;
    }

}</style>