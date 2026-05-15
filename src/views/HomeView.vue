<script setup lang="ts">
import HeroComponent from '../components/HeroComponent.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <HeroComponent />
    <RouterView v-show="false"/>
  </main>
</template>
