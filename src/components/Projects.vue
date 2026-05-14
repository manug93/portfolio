<template>
  <div class="card">
    <!-- Bouton haut — triangle incliné SVG -->
    <button class="arrow-btn arrow-up" @click="prev" aria-label="Projet précédent">
      <svg viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,34 55,28 30,4" />
      </svg>
    </button>

    <!-- Conteneur du carousel -->
    <div class="carousel-wrapper" ref="wrapperRef">
      <TransitionGroup name="slide" tag="div" class="carousel-track">
        <div
          class="slide"
          v-for="(project, index) in projects"
          :key="project.id"
          v-show="index === current"
        >
          <div class="card-content">
            <div class="project-index">{{ String(index + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}</div>
            <h2 class="project-title">{{ t(project.title) }}</h2>
            <p class="project-description">{{ t(project.description) }}</p>
            <div class="project-tags">
              <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
            <a v-if="project.link" :href="project.link" class="project-link" target="_blank">
              {{ t('projects.more') }} ↗
            </a>
          </div>
        </div>
      </TransitionGroup>

      <!-- Indicateurs de progression -->
      <div class="dots">
        <span
          v-for="(_, i) in projects"
          :key="i"
          class="dot"
          :class="{ active: i === current }"
          @click="goTo(i)"
        />
      </div>
    </div>

    <!-- Bouton bas — triangle incliné SVG -->
    <button class="arrow-btn arrow-down" @click="next" aria-label="Projet suivant">
      <svg viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,4 55,8 30,34" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { t,locale } = useI18n();

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

// ── Données de démo — remplace par tes vraies données ──
const projects: Project[] = [
  {
    id: 1,
    title: "projects.project1.title",
    description: "projects.project1.description",
    tags: ["Vue 3", "TypeScript", "CSS"],
  },
  {
    id: 2,
    title: "projects.project2.title",
    description: "projects.project2.description",
    tags: ["Symfony", "PHP", "Vue.js","API Platform"],
    link: "https://hidocta.com",
  },
  {
    id: 3,
    title: "projects.project3.title",
    description: "projects.project3.description",
    tags: ["React", "Nodejs", "PostgreSQL"],
    link: "https://groupelacitadelle-sa.com",
  },
  {
    id: 4,
    title: "projects.project4.title",
    description: "projects.project4.description",
    tags: ["Express", "JWT", "Docker"],
    link: "https://groupelacitadelle-sa.com",
  },
];

const current = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;
const INTERVAL = 10000;

function next() {
  current.value = (current.value + 1) % projects.length;
  resetTimer();
}

function prev() {
  current.value = (current.value - 1 + projects.length) % projects.length;
  resetTimer();
}

function goTo(index: number) {
  current.value = index;
  resetTimer();
}

function startTimer() {
  timer = setInterval(next, INTERVAL);
}

function resetTimer() {
  if (timer) clearInterval(timer);
  startTimer();
}

onMounted(startTimer);
onUnmounted(() => { if (timer) clearInterval(timer); });
</script>

<style scoped>
/* ── Variables ── */
:root {
  --accent: #ff6b6b;
  --glass: rgba(0, 0, 0, 0.5);
}

/* ── Card container ── */
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  min-height: 420px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  clip-path: polygon(0% 0%, 103% 10%, 80% 100%, 5% 90%);
  padding: 1.5rem 2rem 2rem;
  gap: 0.5rem;
}

/* ── Boutons fléchés SVG ── */
.arrow-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 60px;
  height: 36px;
  opacity: 0.7;
  transition: opacity 0.25s ease, transform 0.2s ease;
  filter: drop-shadow(0 0 4px rgba(255, 107, 107, 0.6));
}

.arrow-btn:hover {
  opacity: 1;
  transform: scaleX(1.1);
}

.arrow-btn svg polygon {
  fill: #ff6b6b;
  transition: fill 0.25s ease;
}

.arrow-btn:hover svg polygon {
  fill: #fff;
}

/* Légère inclinaison pour rappeler le clip-path du site */
.arrow-up svg {
  transform: rotate(-4deg);
}
.arrow-down svg {
  transform: rotate(3deg);
}

/* ── Carousel ── */
.carousel-wrapper {
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-track {
  position: relative;
  width: 100%;
  flex: 1;
}

.slide {
  width: 100%;
}

/* ── Contenu d'un projet ── */
.card-content {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.65rem;
}

.project-index {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #ff6b6b;
  opacity: 0.8;
}

.project-title {
  font-family: 'Pricedown', cursive;
  font-size: 1.8rem;
  margin: 0;
  color: #fff;
  line-height: 1.1;
  text-shadow: 0 0 12px rgba(255, 107, 107, 0.4);
}

.project-description {
  font-family: 'Chalet Comprime', 'Cabin', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  text-align: left;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.6rem;
  border: 1px solid rgba(255, 107, 107, 0.5);
  color: #ff6b6b;
  clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
  background: rgba(255, 107, 107, 0.08);
  text-transform: uppercase;
}

.project-link {
  font-family: 'Pricedown', cursive;
  font-size: 0.95rem;
  color: #ff6b6b;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;
  margin-top: 0.25rem;
}

.project-link:hover {
  color: #fff;
}

/* ── Dots ── */
.dots {
  display: flex;
  gap: 6px;
  margin-top: 0.75rem;
}

.dot {
  width: 7px;
  height: 7px;
  background: rgba(255, 255, 255, 0.3);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  cursor: pointer;
  transition: background 0.25s ease, transform 0.2s ease;
}

.dot.active {
  background: #ff6b6b;
  transform: scale(1.4);
}

/* ── Transition slide vertical ── */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
  position: absolute;
  width: 100%;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .card {
    clip-path: none;
    width: 100%;
    min-height: unset;
    padding: 1rem;
  }
  .project-title {
    font-size: 1.3rem;
  }
  .project-description {
    font-size: 0.85rem;
  }
}
</style>
