<script setup lang="ts">
import {  RouterView } from 'vue-router'
</script>

<template>

    <div class="main">
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
  background:#000;
}
</style>
