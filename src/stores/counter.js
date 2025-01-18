import { ref, computed } from "vue"; 
import { defineStore } from "pinia";

// Define a Pinia store named "counter" for managing a simple counter.
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0); // Reactive state to hold the counter value.

  // Computed property to calculate double the current counter value.
  const doubleCount = computed(() => count.value * 2);

  //Function to increment the counter value by 1.
  function increment() {
    count.value++;
  }

  // Return the state and actions for use in components.
  return { count, doubleCount, increment };
});
