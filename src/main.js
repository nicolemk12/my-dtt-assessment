import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/style/style.css";

// Import Font Awesome Core and Icon Library
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faDolly } from "@fortawesome/free-solid-svg-icons"; // Add any additional icons you need here

// Add icons to the library
library.add(faDolly);

// Create the Vue application
const app = createApp(App);

// Use Pinia and Router
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Register Font Awesome Icon globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Mount the application
app.mount("#app");
