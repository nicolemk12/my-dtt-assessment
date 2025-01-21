<script>
import { useHousesStore, useEditHouse, useUpdateImage } from '@/stores/app.js'; // Ensure all stores are imported
import { useRoute } from 'vue-router'; 
import { computed } from 'vue';

export default {
    data() {
        const storeHouses = useHousesStore();
        const router = useRoute();
        const id = router.params.id;

        const getHouses = () => {
            storeHouses.getHouses();
        };

        const house = computed(() => {
            return storeHouses.houses.find(house => house.id.toString() === id.toString());
        });

        return {
            house,
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
                id: '',
            },
            image: null,
            url: null,
            getHouses,
        };
    },
    methods: {
        async addHouse() {
            const id = this.$route.params.id;
            const houseEdit = useEditHouse(); // Initialize the store

            try {
                await houseEdit.editHouse(this.editHome);

                if (this.image) {
                    const updateImage = useUpdateImage();
                    await updateImage.updateImage(id, this.image);
                }

                this.$router.push(`/houses/detail/${id}`);
            } catch (error) {
                console.error('Error editing house:', error);
            }
        },
    },
    created() {
        this.getHouses();
    },
    mounted() {
        if (this.house) {
            this.editHome = { ...this.house };
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
                <div class="price">
                    <label class="labelprice" for="price">Price*</label>
                    <input class="price" type="text" v-model="editHome.price" placeholder="e.g. €150.000">
                </div>

                <div class="sizeandgarage">
                    <div class="sizefield">
                        <label class="labelsize" for="size">Size*</label>
                        <input class="size" type="text" v-model="editHome.size" placeholder="e.g. 60m2">
                    </div>

                    <div class="garagefield">
                        <label class="labelgarage" for="garage">Garage*</label>
                        <select v-model="editHome.hasGarage" class="garage">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>

                <div class="bedandbath">
                    <div class="bedfield">
                        <label class="labelbed" for="bed">Bedrooms*</label>
                        <input v-model="editHome.bedrooms" class="bed" type="text" placeholder="Enter amount">
                    </div>
                    <div class="bathfield">
                        <label class="labelbath" for="bath">Bathrooms*</label>
                        <input v-model="editHome.bathrooms" class="bath" type="text" placeholder="Enter amount">
                    </div>
                </div>

                <div class="constructiondate">
                    <label class="labeldate" for="date">Date*</label>
                    <input v-model="editHome.constructionYear" class="date" type="text" placeholder="e.g. 1990">
                </div>

                <div class="desc">
                    <label class="labeldescription" for="description">Description*</label>
                    <textarea v-model="editHome.description" class="description" type="text"
                        placeholder="Enter description"></textarea>
                </div>
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