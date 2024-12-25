<script setup>
import { defineProps } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar/Navbar.vue";
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
