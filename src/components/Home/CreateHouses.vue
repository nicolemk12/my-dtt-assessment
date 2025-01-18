<script>
import { useStoreHouse } from '@/stores/app.js';
import { computed } from 'vue';
export default {
    data() {
        // Import the store to manage house-related state and actions.
        const houseStore = useStoreHouse();
       
        // Computed property to track the ID of the new house for navigation.
        const id = computed(() => { 
            return houseStore.id 
        });
        // Object to hold all the necessary fields for creating a new house.
        return {
            newHouse: {
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
            },
            image: null,
            url: null,
            id,
        };
    },
    methods: {
        /* Generates a preview of the uploaded image by creating a temporary URL.
         This allows users to visually confirm the selected file. */
        ShowPreview(event) {
            this.image = event.target.files[0];
            this.url = URL.createObjectURL(this.image);
        },

        /* Clears the uploaded image and resets the preview.
          Resets the input element for consistent user experience. */
        ClearPreview() {
            this.image = null;
            this.url = null;
            document.getElementById('image').value = '';
        },

        /* Sends the new house data and the selected image to the API using the store's action.
          Navigates to the details page of the newly created house upon success. */
        addHouse() {
            const houseStore = useStoreHouse();
            houseStore.postHouses(this.newHouse, this.image)
                .then(() => {
                    this.$router.push(`/houses/detail/${this.id}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        /* Validates the form by checking if all required fields are filled
         and an image has been uploaded. Returns true if the form is incomplete.*/
        isButtonDisabled() {
            return (
                this.newHouse.price === '' ||
                this.newHouse.bedrooms === '' ||
                this.newHouse.bathrooms === '' ||
                this.newHouse.size === '' ||
                this.newHouse.streetName === '' ||
                this.newHouse.houseNumber === '' ||
                this.newHouse.city === '' ||
                this.newHouse.zip === '' ||
                this.newHouse.constructionYear === '' ||
                this.newHouse.hasGarage === '' ||
                this.newHouse.description === '' ||
                this.image === null
            );
        },
    },
}

</script>

<template>
    <div class="wrapper">
        <!-- Background image for the page -->
        <img src="../../assets/images/img_background.png" class="background">
        
        <!-- Navigation link back to the houses overview -->
        <div class="back">
            <div class="mobile-back">
                <router-link class="back-class" to="/houses">
                    <img class="back-button" src="../../assets/images/ic_back_grey.png" alt="back">
                    <a class="back-text">Back to overview</a>
                </router-link>
            </div>
            <div class="mobile-listing">
                <h1 class="mobile-title">Create new listing</h1>
            </div>
        </div>
        
        <h1 class="title">Create new listing</h1>

        <!-- Form for creating a new house -->
        <form @submit.prevent="addHouse">
            <div class="form">
                <!-- Street name input -->
                <div class="streetname">
                    <label class="labelstreet" for="street">Street name*</label>
                    <input class="street" v-model="newHouse.streetName" required type="text"
                        placeholder="Enter the street class">
                </div>

                <!-- House number and optional addition -->
                <div class="numberandaddition">
                    <div class="number">
                        <label class="labelhousenumber" for="housenumber">House number*</label>
                        <input class="housenumber" v-model="newHouse.houseNumber" required type="text"
                            placeholder="Enter house number">
                    </div>

                    <div class="extra">
                        <label class="labeladdition" for="addition">Addition (optional)</label>
                        <input class="addition" v-model="newHouse.numberAddition" type="text" placeholder="e.g. A">
                    </div>
                </div>

                <!-- Postal code input -->
                <div class="postcode">
                    <label class="labelpostalcode" for="postalcode">Postal code*</label>
                    <input class="postalcode" v-model="newHouse.zip" type="text" placeholder="e.g. 1000 AA">
                </div>

                <!-- City input -->
                <div>
                    <label class="labelcity" for="city">City*</label>
                    <input class="city" v-model="newHouse.city" type="text" placeholder="e.g. Utrecht">
                </div>

                <!-- Picture upload section -->
                <div class="picture">
                    <label class="labelpicture">Upload picture (PNG or JPG)*</label>
                    <input @change="ShowPreview" class="image" id="image" type="file" accept=".jpg, .png">
                </div>

                <!-- Image preview and remove option -->
                <div v-if="url">
                    <img class="preview" :src="url" alt="preview">
                    <img class="previewremove" src="../../assets/images/ic_clear_white.png" alt="remove" @click="ClearPreview">
                </div>
                <label class="labelimage" for="image" v-else>
                    <img class="imageplus" src="../../assets/images/ic_plus_grey.png" alt="plus">
                </label>

                <!-- Other form inputs (price, size, garage, etc.) -->
                <!-- Form continues with appropriate labels and placeholders -->

                <!-- Submit button, disabled if the form is incomplete -->
                <div class="post">
                    <button :disabled="isButtonDisabled()" class="postbutton">POST</button>
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

.postbutton:disabled {
    cursor: not-allowed;
    opacity: 0.5;
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

.form {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-left: 15%;
    margin-top: 30px;
}

.housenumber,
.addition,
.bed,
.garage,
.size,
.bath {
    width: 100%;
}

.number,
.extra,
.bathfield,
.sizefield,
.garagefield,
.bedfield {
    width: 20%;
}

input,
textarea,
select {
    width: 45%;
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
    display: flex;
}

.sizeandgarage,
.bedandbath,
.numberandaddition {
    display: flex;
    gap: 5%;
}

.description {
    height: 100px;
    padding-top: 10px;
    resize: none;
}

.garage {
    background-color: var(--background2);
}

.picture>input {
    display: none
}

.imageplus {
    width: 30px;
    height: 30px;
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
    width: 45%;
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
        width: 50%;
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

}
</style>