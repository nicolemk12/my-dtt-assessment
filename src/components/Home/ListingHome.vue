<script>
import { useHousesStore } from '@/stores/app.js';
import { computed } from 'vue';
import { searchQuery } from '@/components/Home/Houses.vue';

export default {
    setup() {
        const storeHouses = useHousesStore();
        const getHouses = () => {
            storeHouses.getHouses();
        };

        const deleteHouse = (id) => {
            storeHouses.deleteHouse(id);
        };

        const filteredHouses = computed(() => {
            if (!searchQuery.value) {
                return storeHouses.houses;
            }
            const lowerCaseQuery = searchQuery.value.toLowerCase();

            return storeHouses.houses.filter(house =>
                house.location.street.toLowerCase().includes(lowerCaseQuery) ||
                house.location.city.toLowerCase().includes(lowerCaseQuery) ||
                house.location.zip.toLowerCase().includes(lowerCaseQuery) ||
                house.price.toString().toLowerCase().includes(lowerCaseQuery) ||
                house.size.toString().toLowerCase().includes(lowerCaseQuery)
            );
        });

        const deletePopup = (id) => {
            const popup = document.getElementById('popup');
            popup.style.display = 'flex';
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



        return {
            searchQuery,
            getHouses,
            filteredHouses,
            deleteHouse,
            deletePopup,
        };
    },

    created() {
        this.getHouses();
    }
};
</script>
<template>
    <div class="wrapper">
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
        <div class="total" v-if="searchQuery && filteredHouses.length">
            <a class="totaltext">{{ filteredHouses.length }} results found</a>
        </div>
        <div class="noresult" v-if="filteredHouses.length === 0">
            <img class="noresultimg" src="@/assets/images/img_empty_houses.png" alt="no result">
            <a class="noresulttext">No results found.</a>
            <br>
            <a class="noresulttexttwo">Please try another keyword.</a>
        </div>
        <div class="house" v-for="house in filteredHouses" :key="house.id">
            <RouterLink class="housedetail" :to="`/houses/detail/${house.id}`">
                <div class="houseimage">
                    <img class="houseimg" :src="`${house.image}`" alt="house">
                </div>
                <div class="inforow">
                    <a class="street">{{ house.location.street }}</a>
                    <a class="price">€ {{ house.price }}</a>
                    <a class="postalcode">{{ house.location.zip + ' ' + house.location.city }}</a>
                    <div class="houseinfo">
                        <img class="bed" src="@/assets/images/ic_bed.png" alt="bed">
                        <a class="beds">{{ house.rooms.bedrooms }}</a>
                        <img class="bath" src="@/assets/images/ic_bath.png" alt="bath">
                        <a class="baths">{{ house.rooms.bathrooms }}</a>
                        <img class="size" src="@/assets/images/ic_size.png" alt="size">
                        <a class="sizes">{{ house.size }} m2</a>
                    </div>
                </div>
            </RouterLink>
            <div class="edits" v-if="house.madeByMe">
                <RouterLink class="edit" :to="`/edit-house/${house.id}`">
                    <img class="edit" src="@/assets/images/ic_edit.png" alt="edit">
                </RouterLink>
                <div class="deletebutton" @click="deletePopup(house.id)">
                    <img class="delete" src="@/assets/images/ic_delete.png" alt="delete">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    width: 70%;
    margin-left: 15%;
}

.deletebutton {
    width: 15px;
    cursor: pointer;
}

#yes, #no {
    cursor: pointer;
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

.housedetail {
    display: flex;
    width: 100%;
    height: 100%;
    text-decoration: none;
}

.total {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
}

.totaltext {
    margin-left: 10px;
    font-size: 18px;
    color: var(--primary-text);
    font-weight: 550;
}

.noresult {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 15%;
}

.noresultimg {
    height: 200px;
}

.noresulttext {
    font-size: 18px;
    color: var(--secondary);
    margin-top: 20px;
}

.noresulttexttwo {
    font-size: 18px;
    color: var(--secondary);
}

.house {
    display: flex;
    background-color: var(--background2);
    border: solid 0 var(--tertiary);
    border-radius: 5px;
    height: 160px;
    width: 100%;
    padding: 10px;
    margin: 6px;
}

.houseimage img {
    width: 140px;
    height: 140px;
    border-radius: 5px;
    object-fit: cover;
    object-position: left;
}

.inforow {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 15px;
}

.street {
    font-weight: 550;
    font-size: 18px;
    color: var(--primary-text);
    margin-top: 8px;
}

.price {
    color: var(--secondary);
    margin-top: 5px;
}

.postalcode {
    color: var(--tertiary2);
    margin-top: 5px;
}

.houseinfo {
    height: 10%;
    margin-top: 10px;
    padding-right: 10px;
    width: 30%;
    display: flex;
    color: var(--secondary-text);
}

.houseinfo a {
    font-family: var(--secondary-text);
    font-size: 14px;
    white-space: nowrap;
    margin: -3px 13px 0px 2px;
}

.edits {
    display: flex;
    height: 25px;
    padding: 3px;
}

.edit,
.delete {
    height: 100%;
    margin-left: 5px;
}

@media screen and (max-width: 750px) {
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        width: 90%;
        margin-left: 5%;
    }

    .popup-content {
        background-color: var(--background);
        padding: 20px;
        width: 70%;
        margin: auto;
        height: 35%;
        border-radius: 3%;
    }

    .edits {
        position: absolute;
        right: 0;
        display: flex;
        height: 25px;
        padding: 4px;
        margin-right: 10px;
    }

}

@media screen and (max-width: 500px) {
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        width: 90%;
        margin-left: 5%;
    }

    .house {
        display: flex;
        background-color: var(--background2);
        border: solid 0 var(--tertiary);
        border-radius: 5px;
        height: 120px;
        width: 100%;
        padding: 10px;
    }

    .street {
        font-weight: 550;
        font-size: 12px;
        color: var(--primary-text);
        width: 65%;
    }

    .inforow {
        display: flex;
        flex-direction: column;
        flex: 1;
        font-weight: 300;
        font-size: 12px;
        width: 67%;
    }

    .houseinfo {
        height: 10%;
        margin-top: 18px;
        width: 90%;
        height: 15px;
    }

    .houseimage img {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        object-fit: cover;
        object-position: left;
    }

    .edits {
        position: absolute;
        right: 0;
        display: flex;
        height: 20px;
        padding: 4px;
    }

    .edit {
        display: flex;
    }

    .delete {
        display: flex;
    }
}
</style>