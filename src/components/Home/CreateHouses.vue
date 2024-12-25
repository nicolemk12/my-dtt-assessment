<script>
import { useStoreHouse } from '@/stores/app.js';
import { computed } from 'vue';
export default {
    data() {

        const houseStore = useStoreHouse();

        const id = computed(() => { 
            return houseStore.id 
        });

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
        ShowPreview(event) {
            this.image = event.target.files[0];
            this.url = URL.createObjectURL(this.image);
        },
        ClearPreview() {
            this.image = null;
            this.url = null;
            document.getElementById('image').value = '';
        },


        addHouse() {
    const houseStore = useStoreHouse();

    // Ensure the image is not null or undefined
    if (!this.image) {
        alert('Please upload an image.');
        return;
    }

    const formData = new FormData();

    // Append the house fields to formData
    formData.append('price', this.newHouse.price);
    formData.append('bedrooms', this.newHouse.bedrooms);
    formData.append('bathrooms', this.newHouse.bathrooms);
    formData.append('size', this.newHouse.size);
    formData.append('streetName', this.newHouse.streetName);
    formData.append('houseNumber', this.newHouse.houseNumber);
    formData.append('city', this.newHouse.city);
    formData.append('zip', this.newHouse.zip);
    formData.append('numberAddition', this.newHouse.numberAddition || '');
    formData.append('constructionYear', this.newHouse.constructionYear);
    formData.append('hasGarage', this.newHouse.hasGarage);
    formData.append('description', this.newHouse.description);
    formData.append('image', this.image);

    // Log to check
    console.log("FormData to be sent:", formData);

    houseStore.postHouses(formData)
        .then((response) => {
            // If successful, navigate to the details page or reload the house list
            if (response && response.id) {
                this.$router.push(`/houses/detail/${response.id}`); // Navigate to details page
                // Optionally, reload the list of houses or trigger a refresh
                this.$router.go(0);  // Force page reload to fetch new data
            } else {
                console.error('No ID returned by the server.');
                alert('Failed to post the house. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Error posting house:', error);
            alert('An error occurred while posting the house.');
        });
}




    isButtonDisabled() {
        return (
            !this.newHouse.price ||
            !this.newHouse.bedrooms ||
            !this.newHouse.bathrooms ||
            !this.newHouse.size ||
            !this.newHouse.streetName ||
            !this.newHouse.houseNumber ||
            !this.newHouse.city ||
            !this.newHouse.zip ||
            !this.newHouse.constructionYear ||
            this.newHouse.hasGarage === '' ||
            !this.newHouse.description ||
            !this.image
        );
    }
    },
}

</script>

<template>
    <div class="wrapper">
        <img src="../../assets/images/img_background.png" class="background">
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
        <form @submit.prevent="addHouse">
            <div class="form">
                <div class="streetname">
                    <label class="labelstreet" for="street">Street name*</label>
                    <input class="street" v-model="newHouse.streetName" required type="text"
                        placeholder="Enter the street class">
                </div>

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


                <div class="postcode">
                    <label class="labelpostalcode" for="postalcode">Postal code*</label>
                    <input class="postalcode" v-model="newHouse.zip" type="text" placeholder="e.g. 1000 AA">
                </div>

                <div>
                    <label class="labelcity" for="city">City*</label>
                    <input class="city" v-model="newHouse.city" type="text" placeholder="e.g. Utrecht">
                </div>

                <div class="picture">
                    <label class="labelpicture">Upload picture (PNG or JPG)*</label>
                    <input @change="ShowPreview" class="image" id="image" type="file" accept=".jpg, .png">
                </div>

                <div v-if="url">
                    <img class="preview" :src="url" alt="preview">
                    <img class="previewremove" src="../../assets/images/ic_clear_white.png" alt="remove" @click="ClearPreview">
                </div>
                <label class="labelimage" for="image" v-else>
                    <!-- kruisje om weg te klikken -->
                    <img class="imageplus" src="../../assets/images/ic_plus_grey.png" alt="plus">
                </label>


                <div class="price">
                    <label class="labelprice" for="price">Price*</label>
                    <input class="price" v-model="newHouse.price" type="text" placeholder="e.g. €150.000">
                </div>

                <div class="sizeandgarage">
                    <div class="sizefield">
                        <label class="labelsize" for="size">Size*</label>
                        <input class="size" v-model="newHouse.size" type="text" placeholder="e.g. 60m2">
                    </div>

                    <div class="garagefield">
                        <label class="labelgarage" for="garage">Garage*</label>
                        <select v-model="newHouse.hasGarage" class="garage">
                            <option value="" selected disabled>Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>

                <div class="bedandbath">
                    <div class="bedfield">
                        <label class="labelbed" for="bed">Bedrooms*</label>
                        <input v-model="newHouse.bedrooms" class="bed" type="text" placeholder="Enter amount">
                    </div>

                    <div class="bathfield">
                        <label class="labelbath" for="bath">Bathrooms*</label>
                        <input v-model="newHouse.bathrooms" class="bath" type="text" placeholder="Enter amount">
                    </div>
                </div>

                <div class="constructiondate">
                    <label class="labeldate" for="date">Date*</label>
                    <input v-model="newHouse.constructionYear" class="date" type="text" placeholder="e.g. 1990">
                </div>

                <div class="desc">
                    <label class="labeldescription" for="description">Description*</label>
                    <textarea class="description" v-model="newHouse.description" type="text"
                        placeholder="Enter description"></textarea>
                </div>

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