<script setup lang="ts">
import {  RouterView } from 'vue-router'
import SeoHead from './components/SeoHead.vue';
</script>

<template>

    <div class="main">
      <SeoHead />
      <RouterView />
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
