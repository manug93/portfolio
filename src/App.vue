<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeroComponent from './components/HeroComponent.vue'
</script>

<template>

    <div class="main">
      <SeoHead />
      <HeroComponent />
    </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}
</style>
