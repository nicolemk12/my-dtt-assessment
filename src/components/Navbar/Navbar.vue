<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <div class="navbar">
      <nav>
        <img class="logo" src="@/assets/images/logo_dtt.png" alt="logo">
        <!-- Home Link -->
        <RouterLink to="/" class="home">Home</RouterLink>
        <!-- Houses Link -->
        <RouterLink v-if="$route.name !== 'home' && ($route.name === 'detail' || $route.name === 'houses')" class="houses-active" to="/houses">Houses</RouterLink>
        <RouterLink v-else class="houses" to="/houses">Houses</RouterLink>
        <!-- About Link -->
        <RouterLink class="about" to="/about">About</RouterLink>
      </nav>
    </div>
  </div>

  <!-- Mobile Navigation -->
  <div class="mobile-wrapper">
    <div class="mobile-navbar">
      <!-- Mobile Home Link -->
      <RouterLink class="mobile-home" to="/">
       <font-awesome-icon v-if="$route.name === 'home'" :icon="['fas', 'dolly']" style="color: #ff4433; font-size: 27px; margin-top: 20px;" class="home-active-icon"></font-awesome-icon>
      <font-awesome-icon v-else :icon="['fas', 'dolly']" style="color: #c3c3c3; font-size: 27px;margin-top: 20px;" class="home-inactive-icon"></font-awesome-icon>
      </RouterLink>
      <!-- Mobile Houses Link -->
      <RouterLink class="mobile-houses" to="/houses">
        <img v-if="$route.name === 'houses' || $route.name === 'detail'" class="house-logo" src="@/assets/images/navigarion_home_active.png">
        <img v-else class="inactive-house-logo" src="@/assets/images/navigarion_home.png">
      </RouterLink>
      <!-- Mobile About Link -->
      <RouterLink class="mobile-about" to="/about">
        <img v-if="$route.name === 'about'" class="about-logo" src="@/assets/images/navigarion_info_active.png">
        <img v-else class="inactive-about-logo" src="@/assets/images/navigarion_info.png">
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* Styles remain unchanged */
@media (min-width: 750px) {
    .mobile-wrapper {
        display: none;
    }
}

@media (max-width: 750px) {
    .wrapper {
        display: none;
    }
}

.mobile-wrapper {
    width: 100%;
    background: var(--background2);
    height: 70px;
    position: fixed;
    bottom: 0;
    z-index: 3;
}

.mobile-navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.mobile-navbar img {
    width: 30px;
    height: 30px;
    margin-top: 20px;
}

.wrapper {
    width: 100%;
    background: var(--background2);
    height: 70px;
}

.navbar {
    display: flex;
    margin-left: 15%;
}

nav {
    display: flex;
    align-items: center;
}

.logo {
    width: 120px;
    margin-top: 15px;
}

.home,
.about,
.houses {
    margin-top: 15px;
    margin-left: 40px;
    font-size: 15px;
    font-family: var(--font-family);
    font-weight: 650;
    color: var(--tertiary);
    text-decoration: none;
}

.houses-active {
    margin-top: 15px;
    margin-left: 40px;
    font-size: 15px;
    font-family: var(--font-family);
    font-weight: 650;
    color: var(--primary-text);
    text-decoration: none;
}

a.router-link-exact-active {
    color: var(--primary-text);
}
</style>
