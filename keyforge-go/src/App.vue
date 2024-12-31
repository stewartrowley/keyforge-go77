<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import { useHomeStore } from './stores/HomeStore';
useHomeStore().fetchAll();
const IsReady = computed(() => { 
  return useHomeStore().isReady;
});
</script>

<template>
  <header v-if="IsReady">
    <NavBar />
  </header>

  <RouterView />
</template>

<style scoped>

</style>
