<template>
  <div class="card">
    <div class="card-content">
      <h1 class="card-title">{{ t('about.title') }}</h1>
      <p class="card-description">{{ t('about.content') }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  max-width: 90%;
  text-align: center;
  clip-path: polygon(0% 0%, 130% 20%, 80% 100%,  5% 90%);
}
.card-content {
  padding: 3rem;
}
.card-description {
  font-family: 'Chalet Comprime',"Cabin";
  font-size: 1.3rem;
}
@media (max-width: 768px) {
  .card{
    clip-path: none;
  }
  .card-description {
    font-size: .8rem;

  }
}
</style>
