<template>
  <div class="not-found">
    <div class="hero">
      <div class="mask">
        <div class="glitch-wrapper">
          <div class="code" data-text="404">404</div>
          <div class="subtitle">{{t('not_found.title')}}</div>
        </div>

        <div class="card">
          <div class="issuer-badge">
            <span class="issuer-icon">⬡</span>
            <span class="issuer-name">{{t('not_found.errorName')}}</span>
          </div>

          <p class="message">
            {{t('not_found.message')}}
          </p>

          <div class="meta">
            <span class="meta-item">
              <span class="meta-label">CODE</span>
              <span class="meta-value">HTTP_404_NOT_FOUND</span>
            </span>
            <span class="meta-item">
              <span class="meta-label">PATH</span>
              <span class="meta-value">{{ currentPath }}</span>
            </span>
            <span class="meta-item">
              <span class="meta-label">TIME</span>
              <span class="meta-value">{{ timestamp }}</span>
            </span>
          </div>

          <div class="tags">
            <span class="tag">{{t('not_found.tag1')}}</span>
            <span class="tag">{{t('not_found.tag2')}}</span>
          </div>

          <button class="home-btn" @click="goHome">
            <svg class="btn-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polygon points="15,4 7,12 15,20" />
            </svg>
            {{t('not_found.homeButton')}}
          </button>
        </div>
      </div>



    </div>
    <div class="logo" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter()
const route  = useRoute()

const currentPath = ref(route.fullPath)
const timestamp   = ref('')

onMounted(() => {
  const now = new Date()
  timestamp.value = now.toISOString().replace('T', ' ').substring(0, 19)
})

function goHome() {
  router.push('/')
}
</script>

<style scoped>
/* ── Layout global ── */
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 100vh;
  width: 100%;
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  background-color: #000dff;
  font-family: 'Pricedown', cursive;
  clip-path: polygon(10% 0%, 90% 5%, 100% 70%, 60% 100%, 0% 80%);
  position: relative;
}
.mask{
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

/* ── 404 Glitch ── */
.glitch-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.code {
  font-family: 'Pricedown', cursive;
  font-size: clamp(5rem, 15vw, 9rem);
  color: #fff;
  position: relative;
  text-shadow:
    0 0 20px rgba(255, 107, 107, 0.7),
    0 0 60px rgba(255, 107, 107, 0.3);
  line-height: 1;
  animation: flicker 4s infinite;
}

/* pseudo-éléments pour l'effet glitch */
.code::before,
.code::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.code::before {
  color: #ff6b6b;
  clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
  animation: glitch-top 3s infinite;
}
.code::after {
  color: #6b73ff;
  clip-path: polygon(0 55%, 100% 55%, 100% 75%, 0 75%);
  animation: glitch-bot 3s infinite;
}

.subtitle {
  font-family: 'Courier New', monospace;
  font-size: clamp(0.65rem, 2vw, 0.9rem);
  letter-spacing: 0.35em;
  color: #ff6b6b;
  text-transform: uppercase;
}

/* ── Card ── */
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.85rem;
  width: min(440px, 85%);
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  clip-path: polygon(0% 0%, 103% 10%, 80% 100%, 5% 90%);
  padding: 1.75rem 2rem 2.25rem;
}

.issuer-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  padding: 0.25rem 0.75rem;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
}
.issuer-icon {
  font-size: 1rem;
  color: #ff6b6b;
}
.issuer-name {
  font-family: 'Courier New', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
}

.message {
  font-family: 'Chalet Comprime', 'Cabin', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin: 0;
}

/* ── Meta ── */
.meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
}
.meta-item {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}
.meta-label {
  font-family: 'Courier New', monospace;
  font-size: 0.63rem;
  letter-spacing: 0.14em;
  color: #ff6b6b;
  text-transform: uppercase;
  min-width: 40px;
}
.meta-value {
  font-family: 'Courier New', monospace;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
  word-break: break-all;
}

/* ── Tags ── */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tag {
  font-family: 'Courier New', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.6rem;
  border: 1px solid rgba(255, 107, 107, 0.5);
  color: #ff6b6b;
  clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
  background: rgba(255, 107, 107, 0.08);
  text-transform: uppercase;
}

/* ── Bouton retour ── */
.home-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  background: rgba(255, 107, 107, 0.12);
  border: 1px solid rgba(255, 107, 107, 0.5);
  color: #ff6b6b;
  font-family: 'Pricedown', cursive;
  font-size: 1rem;
  letter-spacing: 0.08em;
  padding: 0.5rem 1.25rem;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease;
}
.home-btn:hover {
  background: rgba(255, 107, 107, 0.28);
  color: #fff;
}
.btn-arrow {
  width: 16px;
  height: 16px;
  fill: currentColor;
  transition: transform 0.2s ease;
}
.home-btn:hover .btn-arrow {
  transform: translateX(-3px);
}

/* ── Logo ── */
.logo {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 150px;
  height: 150px;
  background-image: url('@/assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 100;
}

/* ── Animations ── */
@keyframes flicker {
  0%, 95%, 100% { opacity: 1; }
  96%            { opacity: 0.6; }
  97%            { opacity: 1; }
  98%            { opacity: 0.4; }
  99%            { opacity: 1; }
}

@keyframes glitch-top {
  0%, 90%, 100% { transform: translate(0); }
  92%            { transform: translate(-4px, -2px); }
  94%            { transform: translate(4px, 2px); }
}

@keyframes glitch-bot {
  0%, 90%, 100% { transform: translate(0); }
  93%            { transform: translate(4px, 2px); }
  95%            { transform: translate(-4px, -1px); }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .hero {
    clip-path: none;
  }
  .card {
    clip-path: none;
    width: 90%;
    padding: 1.25rem;
  }
  .logo {
    position: fixed;
  }
}
</style>
