<script>
import { useHousesStore } from '@/stores/app.js'; // Import the store for managing house data.
import { ref, computed } from 'vue'; // Import Vue's reactivity and computed property features.

const searchQuery = ref(''); // Reactive variable to store the search input.

export { searchQuery }; // Export the searchQuery to make it accessible in other components.

export default {
    setup() {
        const activeButton = ref('price'); // Tracks the active sorting button ('price' or 'size').

        /**
         * Clears the current search input by resetting the searchQuery.
         */
        function clearSearch() {
            searchQuery.value = '';
        }

        /**
         * Sorts houses by price in descending order and sets the active button to 'price'.
         */
        function sortPrice() {
            const storeHouses = useHousesStore(); // Access the house store.
            activeButton.value = 'price'; // Mark the price button as active.
            return storeHouses.sortHousesByPrice(); // Trigger the sorting action in the store.
        }

        /**
         * Sorts houses by size in descending order and sets the active button to 'size'.
         */
        function sortSize() {
            const storeHouses = useHousesStore();
            activeButton.value = 'size'; // Mark the size button as active.
            return storeHouses.sortHousesBySize(); // Trigger the sorting action in the store.
        }

        // Computes whether the size button is currently active.
        const isSizeActive = computed(() => activeButton.value === 'size');

        // Return all reactive variables and functions for use in the template.
        return {
            searchQuery,
            clearSearch,
            sortPrice,
            activeButton,
            isSizeActive,
            sortSize,
        };
    },
};
</script>

<template>
    <div class="wrapper">
        <!-- Top section containing title and create house buttons -->
        <div class="top">
            <h1 class="title">Houses</h1>
            
            <!-- Button to create a new house (desktop view) -->
            <div class="create">
                <RouterLink class="create-house" to="/create-house">
                    <img class="plus" src="@/assets/images/plus_white.png">
                    CREATE NEW
                </RouterLink>
            </div>

            <!-- Button to create a new house (mobile view) -->
            <div class="mobile-create">
                <RouterLink class="create-house-mobile" to="/create-house">
                    <img class="plus-mobile" src="@/assets/images/ic_plus_grey.png">
                </RouterLink>
            </div>
        </div>
    </div>

    <div class="mid">
        <!-- Search bar for filtering houses -->
        <div class="searchbar">
            <img class="searchmagnifier" src="@/assets/images/ic_search.png" alt="search magnifier">
            <input class="search" type="text" placeholder="Search for a house" v-model="searchQuery" />
            <img 
                src="@/assets/images/ic_clear.png" 
                v-if="searchQuery" 
                alt="cancel" 
                class="clearsearch" 
                @click="clearSearch()" 
            />
        </div>

        <!-- Sorting buttons for price and size -->
        <div class="doubleButtons">
            <!-- Button for sorting by price -->
            <div 
                :class="{ active: activeButton === 'price', red: isSizeActive }" 
                @click="sortPrice()" 
                class="button1"
            >
                <button class="price">Price</button>
            </div>
            
            <!-- Button for sorting by size -->
            <div 
                :class="{ active: activeButton === 'size' }" 
                @click="sortSize()" 
                class="button2"
            >
                <button class="size">Size</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
body,
h1 {
    font-family: var(--font-family);
    font-weight: 550;
}

.wrapper {
    height: 20%;
    width: 100%;
}

.top {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 15%;
    width: 70%;
}

.mid {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 15%;
    margin-right: 20%;
    width: 70%;
}

.create {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--primary);
    border-radius: 5px;
    width: 150px;
    height: 40px;
}

.plus-mobile {
    display: none;
}

.create-house {
    display: flex;
    color: var(--background2);
    text-decoration: none;
    font-family: var(--font-family);
    font-weight: 550;
}

.create-house-mobile {
    display: none;
}

.plus {
    width: 15px;
    height: 15px;
    margin-top: 3px;
    margin-right: 5px;
}

input[type="text"] {
    padding-left: 45px;
    font-weight: 400;
    font-family: var(--font-family);
}

.search {
    background: var(--tertiary);
    border-radius: 5px;
    border: none;
    width: 100%;
    height: 35px;
    font-family: var(--font-family);
    color: var(--secondary-text);
}

.searchmagnifier {
    margin-top: 5px;
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 1;
    left: 10px;
}


.button1.red {
    background-color: var(--tertiary2);
}

.button2.active {
    background-color: var(--primary);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
.doubleButtons {
    display: flex;
    background: var(--tertiary2);
    width: 220px;
    height: 40px;
    border-radius: 10px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.button1,
.button2 {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button1 {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background: var(--primary);
}

button {
    background: none;
    border: none;
    font-family: var(--font-family);
    font-weight: 550;
    color: var(--background);
    cursor: pointer;
}

a.router-link-exact-active {
    color: var(--primary);
}

.clearsearch {
    width: 20px;
    position: absolute;
    right: 10px;
    top: 6px;
}

.searchbar {
    background: var(--tertiary);
    border-radius: 5px;
    border: none;
    width: 40%;
    height: 35px;
    font-family: var(--font-family);
    color: var(--secondary-text);
    position: relative;
}

.mobile-create {
    display: none;
}

@media screen and (max-width: 750px) {

    .wrapper {
        display: flex;
        height: 20%;
        width: 100%;
    }

    .top {
        display: flex;
        width: 90%;
        margin-left: 5%;
    }

    .mid {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 90%;
        margin-left: 5%;
    }

    .create {
        display: none;
    }

    .mobile-create {
        display: flex;
        justify-content: right;
        width: 70%;
    }

    .plus-mobile {
        display: flex;
        width: 20px;
        height: 20px;
        margin-top: 3px;
        margin-right: 5%;
    }

    .create-house-mobile {
        display: flex;
        color: var(--background2);
        text-decoration: none;
        font-family: var(--font-family);
        font-weight: 550;
    }

    .title {
        display: flex;
        justify-content: right;
        width: 100%;
    }

    input[type="text"] {
        display: block;
    }

    .search {
        display: block;
    }

    .searchbar {
        display: block;
        width: 100%;
    }

    .searchmagnifier {
        display: block;
    }

    .doubleButtons {
        display: flex;
        margin-top: 20px;
        width: 100%;
    }

    .button1,
    .button2 {
        display: block;
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .button1 {
        display: flex;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background: var(--primary);
    }

    .size {
        display: flex;
    }
}
</style>