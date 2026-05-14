<template>
  <div class="card">
    <button class="arrow-btn arrow-up" @click="prev" aria-label="Précédent">
      <svg viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,34 55,28 30,4" />
      </svg>
    </button>

    <div class="carousel-wrapper">
      <TransitionGroup name="slide" tag="div" class="carousel-track">
        <div
          class="slide"
          v-for="(achievement, index) in achievements"
          :key="achievement.id"
          v-show="index === current"
        >
          <div class="card-content">
            <div class="achievement-index">
              {{ String(index + 1).padStart(2, '0') }} / {{ String(achievements.length).padStart(2, '0') }}
            </div>

            <div class="issuer-badge">
              <span class="issuer-icon">{{ achievement.icon }}</span>
              <span class="issuer-name">{{ achievement.issuer }}</span>
            </div>

            <h2 class="achievement-title">{{ achievement.title }}</h2>

            <div class="achievement-meta">
              <span class="meta-item">
                <span class="meta-label">ID</span>
                <span class="meta-value">{{ achievement.credentialId }}</span>
              </span>
              <span class="meta-item">
                <span class="meta-label">DATE</span>
                <span class="meta-value">{{ achievement.date }}</span>
              </span>
            </div>

            <div class="achievement-tags">
              <span class="tag" v-for="tag in achievement.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <div class="dots">
        <span
          v-for="(_, i) in achievements"
          :key="i"
          class="dot"
          :class="{ active: i === current }"
          @click="goTo(i)"
        />
      </div>
    </div>

    <button class="arrow-btn arrow-down" @click="next" aria-label="Suivant">
      <svg viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,4 55,8 30,34" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Achievement {
  id: number;
  title: string;
  issuer: string;
  icon: string;
  credentialId: string;
  date: string;
  tags: string[];
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Azure AI Fundamentals",
    issuer: "Microsoft",
    icon: "⬡",
    credentialId: "D263A3A2CD6A758F",
    date: "Janvier 2026",
    tags: ["Azure", "Intelligence Artificielle", "Cloud"],
  },
  {
    id: 2,
    title: "Data Analyst Professional",
    issuer: "IBM",
    icon: "◈",
    credentialId: "JNX4JBYI1FQ9",
    date: "Mars 2026",
    tags: ["Data Analysis", "Python", "SQL", "Visualisation"],
  },
];

const current = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;
const INTERVAL = 5000;

function next() {
  current.value = (current.value + 1) % achievements.length;
  resetTimer();
}
function prev() {
  current.value = (current.value - 1 + achievements.length) % achievements.length;
  resetTimer();
}
function goTo(i: number) {
  current.value = i;
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

/* ── Boutons ── */
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
.arrow-btn:hover { opacity: 1; transform: scaleX(1.1); }
.arrow-btn svg polygon { fill: #ff6b6b; transition: fill 0.25s ease; }
.arrow-btn:hover svg polygon { fill: #fff; }
.arrow-up svg  { transform: rotate(-4deg); }
.arrow-down svg { transform: rotate(3deg); }

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
.slide { width: 100%; }

/* ── Contenu ── */
.card-content {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
}

.achievement-index {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #ff6b6b;
  opacity: 0.8;
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
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.9);
}

.achievement-title {
  font-family: 'Pricedown', cursive;
  font-size: 1.7rem;
  margin: 0;
  color: #fff;
  line-height: 1.1;
  text-shadow: 0 0 14px rgba(255, 107, 107, 0.45);
}

/* ── Meta ID / Date ── */
.achievement-meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}
.meta-item {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}
.meta-label {
  font-family: 'Courier New', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  color: #ff6b6b;
  text-transform: uppercase;
  min-width: 36px;
}
.meta-value {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.06em;
}

/* ── Tags ── */
.achievement-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tag {
  font-family: 'Courier New', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.6rem;
  border: 1px solid rgba(255, 107, 107, 0.5);
  color: #ff6b6b;
  clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
  background: rgba(255, 107, 107, 0.08);
  text-transform: uppercase;
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

/* ── Transition ── */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
  position: absolute;
  width: 100%;
}
.slide-enter-from { opacity: 0; transform: translateY(20px); }
.slide-leave-to   { opacity: 0; transform: translateY(-20px); }

/* ── Responsive ── */
@media (max-width: 768px) {
  .card {
    clip-path: none;
    width: 100%;
    min-height: unset;
    padding: 1rem;
  }
  .achievement-title { font-size: 1.3rem; }
}
</style>
