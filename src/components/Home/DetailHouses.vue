<script>
import { useHousesStore } from '@/stores/app.js'; 
import { useRoute } from 'vue-router'; 
import { computed, watch, ref } from 'vue'; 

export default {
    setup() {
        const storeHouses = useHousesStore(); // Initialize the house store.
        const router = useRoute(); // Access the current route.
        const id = router.params.id; // Get the house ID from the route parameters.

        // Deletes a house by ID using the store's delete action.
        const deleteHouse = (id) => {
            storeHouses.deleteHouse(id);
        };

        // Fetches the list of all houses from the API.
        const getHouses = () => {
            storeHouses.getHouses();
        };

        // Retrieves the details of the house matching the current ID.
        const house = computed(() => {
            return storeHouses.houses.find(house => house.id.toString() === id.toString());
        });

        // Provides access to the full list of houses from the store.
        const houses = computed(() => {
            return storeHouses.houses;
        });

        // Computes a list of recommended houses based on the current house.
        const recommendedHouses = computed(() => {
            const index = houses.value.findIndex(house => house.id.toString() === id.toString());
            const nextThreeHouses = houses.value.slice(index + 1, index + 4);
            if (nextThreeHouses.length < 3) {
                // Ensures there are always three recommended houses.
                const firstThreeHouses = houses.value.slice(0, 3);
                return nextThreeHouses.concat(firstThreeHouses);
            }
            return nextThreeHouses;
        });

        // Opens a delete confirmation popup for the selected house.
        const deletePopup = (id) => {
            const popup = document.getElementById('popup');
            popup.style.display = 'flex';

            // Adds event listeners for the confirmation buttons.
            const yes = document.getElementById('yes');
            yes.addEventListener('click', () => {
                deleteHouse(id);
                popup.style.display = 'none';
            });
            const no = document.getElementById('no');
            no.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        };

        // Watches for route changes to update the current house ID and reload the page.
        const houseId = ref(router.params.id);
        watch(() => router.params.id, (newId) => {
            houseId.value = newId;
            window.location.reload();
        });

        return {
            getHouses,
            house,
            id,
            houses,
            deleteHouse,
            recommendedHouses,
            deletePopup,
        };
    },

    // Fetches the list of houses when the component is created.
    created() {
        this.getHouses();
    },
};
</script>

<template>
    <!-- Wrapper for house details -->
    <div class="wrapper" v-if="house">
        <!-- Delete confirmation popup -->
        <div class="popup" id="popup">
            <div class="popup-content">
                <a class="headertext">Delete Listing</a>
                <a class="popup-text" id="firsttext">Are you sure you want to delete this listing?</a>
                <a class="popup-text" id="secondtext">This action cannot be undone.</a>
                <div class="popup-buttons">
                    <button class="popup-button" id="yes">YES, DELETE</button>
                    <button class="popup-button" id="no">GO BACK</button>
                </div>
            </div>
        </div>

        <!-- Navigation back to overview -->
        <div class="back">
            <router-link class="back-class" to="/houses">
                <img class="back-button" src="../../assets/images/ic_back_grey.png" alt="back">
                <a class="back-text">Back to overview</a>
            </router-link>
            <router-link class="mobile-back-class" to="/houses">
                <img class="mobile-back-button" src="../../assets/images/ic_back_white.png" alt="back">
            </router-link>

            <!-- Edit and delete options for houses created by the current user -->
            <div class="mobile-edits" v-if="house.madeByMe">
                <router-link :to="`/edit-house/${house.id}`">
                    <img class="mobile-edit" src="../../assets/images/ic_edit_white.png" alt="edit">
                </router-link>
                <div class="deletebutton" @click="deletePopup(house.id)">
                    <img class="mobile-delete" src="../../assets/images/ic_delete_white.png" alt="delete">
                </div>
            </div>
        </div>

        <!-- House details section -->
        <div class="mid">
            <div class="house">
                <div class="image">
                    <img class="houseimage" :src="`${house.image}`" alt="house">
                </div>
                <div class="housedetail">
                    <div class="firstline">
                        <a class="street">{{ house.location.street }}</a>
                        <div class="edits" v-if="house.madeByMe">
                            <router-link class="edit" :to="`/edit-house/${house.id}`">
                                <img class="edit" src="../../assets/images/ic_edit.png" alt="edit">
                            </router-link>
                            <div class="deletebutton" @click="deletePopup(house.id)">
                                <img class="delete" src="../../assets/images/ic_delete.png" alt="delete">
                            </div>
                        </div>
                    </div>

                    <!-- Location, price, and size details -->
                    <div class="details">
                        <div class="postalcode">
                            <img src="../../assets/images/ic_location.png" alt="location" class="postalcodeimage">
                            <a class="postalcodetext">{{ house.location.zip + ' ' + house.location.city }}</a>
                        </div>
                        <div class="price">
                            <img src="../../assets/images/ic_price.png" alt="price" class="priceimage">
                            <a class="pricetext">€ {{ house.price }}</a>
                            <img src="../../assets/images/ic_size.png" alt="size" class="sizeimage">
                            <a class="sizetext">{{ house.size }} m2 </a>
                            <img src="../../assets/images/ic_construction_date.png" alt="built" class="builtimage">
                            <a class="builttext">Built in {{ house.constructionYear }}</a>
                        </div>

                        <!-- Bedrooms, bathrooms, and garage details -->
                        <div class="info">
                            <img src="../../assets/images/ic_bed.png" alt="bed" class="bedimage">
                            <a class="bedtext">{{ house.rooms.bedrooms }}</a>
                            <img src="../../assets/images/ic_bath.png" alt="bath" class="bathimage">
                            <a class="bathtext">{{ house.rooms.bathrooms }}</a>
                            <img src="../../assets/images/ic_garage.png" alt="garage" class="garageimage">
                            <a class="garagetext">{{ house.hasGarage ? 'Yes' : 'No' }}</a>
                        </div>
                        <div class="text">
                            <a class="infotext">{{ house.description }}</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recommended houses section -->
            <div class="recommended">
                <a class="recommendedtext">Recommended for you</a>
                <div v-for="house in recommendedHouses.slice(0, 3)" :key="house.id">
                    <router-link class="housedetail" style="text-decoration: none; color: inherit;"
                        :to="{ name: 'detail', params: { id: house.id } }">
                        <div class="smallhouse">
                            <img :src="`${house.image}`" alt="" class="smallhouseimage">
                            <div class="smallhousedetail">
                                <div class="smallstreet">
                                    <a class="smallhousestreet">{{ house.location.street }}</a>
                                </div>
                                <div class="smallprice">
                                    <a class="smallhouseprice">€ {{ house.price }}</a>
                                </div>
                                <div class="smallpostalcode">
                                    <a class="smallhousepostalcode">{{ house.location.zip + ' ' + house.location.city }}</a>
                                </div>

                                <div class="smalldetails">
                                    <img src="../../assets/images/ic_bed.png" alt="bed" class="smallbedimage">
                                    <a class="smallbedtext">{{ house.rooms.bedrooms }}</a>
                                    <img src="../../assets/images/ic_bath.png" alt="bath" class="smallbathimage">
                                    <a class="smallbathtext">{{ house.rooms.bathrooms }}</a>
                                    <img src="../../assets/images/ic_size.png" alt="size" class="smallsizeimage">
                                    <a class="smallsizetext">{{ house.size }} m2</a>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.wrapper {
    width: 70%;
    margin-left: 15%;
}

router-link {
    text-decoration: none;
    color: inherit;
}

.mid {
    display: flex;
    width: 100%;
}

.popup {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}

.popup-content {
    background-color: var(--background);
    padding: 20px;
    width: 40%;
    margin: auto;
    height: 35%;
    border-radius: 3%;
}

.deletebutton {
    cursor: pointer;
}

#yes,
#no {
    cursor: pointer;
}

.headertext {
    font-family: var(--font-family);
    font-size: 20px;
    display: flex;
    justify-content: center;
    color: var(--primary-text);
    font-weight: 550;
    margin-top: 15px;
}

.popup-text {
    font-family: var(--font-family);
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: var(--secondary-text);
}

#firsttext {
    margin-top: 15px;
}

.popup-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.popup-button {
    font-family: var(--font-family);
    width: 50%;
    height: 15%;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    background-color: var(--primary);
    color: var(--background);
    font-weight: 550;
}

#no {
    background-color: var(--secondary);
}

.back {
    display: flex;
    align-items: center;
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

.mobile-edits {
    display: none;
}

.back-text {
    font-size: 14px;
    font-family: var(--font-family);
    font-weight: 600;
    color: var(--primary-text);
    margin-left: 10px;
    text-decoration: none;
}

.house {
    width: 70%;
    height: 100%;
    margin-top: 30px;
}

.image {
    display: flex;
}

.houseimage {
    width: 100%;
    height: 100%;
}

.housedetail {
    width: 100%;
    height: 90%;
    background: var(--background2);
    padding-bottom: 50px;
}

.firstline {
    display: flex;
    justify-content: space-between;
    margin-left: 30px;
}

.street {
    font-size: 22px;
    font-family: var(--font-family);
    font-weight: 600;
    color: var(--primary-text);
    margin-top: 20px;
}

.edits {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.edit,
.delete {
    width: 17px;
    height: 17px;
    margin-right: 20px;
}

.mobile-back-button {
    display: none;
}

.postalcodetext,
.pricetext,
.sizetext,
.builttext,
.bedtext,
.bathtext,
.garagetext {
    font-size: 10px;
    font-family: var(--font-family);
    font-weight: 525;
    color: var(--secondary-text);
}

.postalcodeimage,
.priceimage,
.sizeimage,
.builtimage,
.bedimage,
.bathimage,
.garageimage {
    width: 15px;
    height: 15px;
    margin-top: 20px;
    margin-left: 30px;
}

.priceimage,
.sizeimage,
.builtimage,
.bedimage,
.bathimage,
.garageimage {
    margin-right: 5px;
}

.text {
    margin-left: 30px;
    margin-top: 10px;
    margin-right: 20px;
}

.recommended {
    width: 40%;
    margin-top: 30px;
    margin-left: 9%;
}

.recommendedtext {
    font-size: 20px;
    font-family: var(--font-family);
    font-weight: 650;
    color: var(--primary-text);
}

.smallhouse {
    display: flex;
    margin-top: 20px;
    background: var(--background2);
    border-radius: 5px;
    padding: 6px;
}

.smallhouseimage {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    object-fit: cover;
    object-position: left;
}

.smallhousedetail {
    width: 70%;
    margin-left: 5px;
}

.smallstreet,
.smallprice,
.smallpostalcode {
    display: flex;
    justify-content: space-between;
}

.smallhousestreet {
    font-weight: 550;
    font-size: 9px;
    color: var(--primary-text);
}

.smallhouseprice {
    font-size: 8px;
    color: var(--secondary);
}

.smallhousepostalcode {
    font-size: 8px;
    color: var(--tertiary2);
}

.smalldetails {
    display: flex;
    margin-top: 30px;
}

.smallbedimage,
.smallbathimage,
.smallsizeimage {
    width: 10px;
    height: 10px;
    margin-right: 5px;
    margin-left: 5px;
    margin-top: 2px;
}

.smallbedtext,
.smallbathtext,
.smallsizetext {
    font-size: 7px;
    white-space: nowrap;
    font-weight: 700;
    color: var(--tertiary2);
    margin-top: 2px;
}

@media screen and (max-width: 750px) {

    .back-class {
        display: none;
    }

    .wrapper {
        width: 100%;
        margin-left: 0;
        position: relative;
    }

    .popup-content {
        background-color: var(--background);
        padding: 20px;
        width: 70%;
        margin: auto;
        height: 35%;
        border-radius: 3%;
    }

    .mid {
        display: block;
    }

    .house {
        width: 100%;
        height: 100%;
        margin-top: 0;
    }

    .mobile-back-button {
        display: flex;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 20px;
        margin-left: 20px;
        z-index: 1;
    }

    .mobile-edits {
        display: flex;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 20px;
        margin-right: 50px;
        z-index: 1;
        gap: 20px;
    }


    .houseimage {
        width: 100%;
        height: 100%;
    }

    .housedetail {
        width: 100%;
        height: 60%;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
        bottom: 55px;
    }

    .postalcodetext,
    .pricetext,
    .sizetext,
    .builttext,
    .bedtext,
    .bathtext,
    .garagetext {
        font-size: 13px;
        font-family: var(--font-family);
        font-weight: 525;
        color: var(--secondary-text);
    }

    .postalcodeimage,
    .priceimage,
    .sizeimage,
    .builtimage,
    .bedimage,
    .bathimage,
    .garageimage {
        width: 15px;
        height: 15px;
        margin-top: 20px;
        margin-left: 20px;
    }

    .edits {
        display: none;
    }

    .mobile-edit,
    .mobile-delete {
        width: 17px;
        height: 17px;
    }

    .recommended {
        width: 90%;
        margin-top: 0;
        margin-left: 5%;
    }

    .smallhouse {
        display: flex;
        margin-top: 10px;
        background: var(--background2);
        border-radius: 5px;
        padding: 6px;
    }

    .smallhouseimage {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        object-fit: cover;
        object-position: left;
    }

    .smallhousedetail {
        margin-left: 10px;
    }

    .smallstreet,
    .smallprice,
    .smallpostalcode {
        display: flex;
        justify-content: space-between;
    }

    .smallhousestreet {
        font-weight: 550;
        font-size: 13px;
        color: var(--primary-text);
    }

    .smallhouseprice {
        font-size: 10px;
        color: var(--secondary);
    }

    .smallhousepostalcode {
        font-size: 10px;
        color: var(--tertiary2);
    }

    .smalldetails {
        display: flex;
        margin-top: 10px;
    }

    .smallbedimage,
    .smallbathimage,
    .smallsizeimage {
        width: 10px;
        height: 10px;
        margin-right: 5px;
        margin-left: 5px;
        margin-top: 2px;
    }

    .smallbedtext,
    .smallbathtext,
    .smallsizetext {
        font-size: 9px;
        white-space: nowrap;
        font-weight: 700;
        color: var(--tertiary2);
        margin-top: 2px;
    }


}
</style>