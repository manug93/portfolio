<template>
  <div class="card">
    <!-- ── Bouton Haut ── -->
    <button
      class="arrow-btn arrow-up"
      @click="prev"
      aria-label="Précédent"
    >
      <svg viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,34 55,28 30,4" />
      </svg>
    </button>

    <!-- ── Carousel ── -->
    <div class="carousel-wrapper">
      <TransitionGroup
        name="slide"
        tag="div"
        class="carousel-track"
      >
        <div
          class="slide"
          v-for="(group, index) in skillGroups"
          :key="group.category"
          v-show="index === current"
        >
          <div class="card-content">
            <!-- Index -->
            <div class="skill-index">
              {{ String(index + 1).padStart(2, '0') }}
              /
              {{ String(skillGroups.length).padStart(2, '0') }}
            </div>

            <!-- Badge -->
            <div class="group-badge">
              <span class="group-icon">
                {{ group.icon }}
              </span>

              <span class="group-name">
                {{ group.category }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="group-title">
              {{ group.category }}
            </h2>

            <!-- Skills -->
            <div class="skills-tags">
              <span
                class="tag"
                v-for="skill in group.skills"
                :key="skill"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Dots -->
      <div class="dots">
        <span
          v-for="(_, i) in skillGroups"
          :key="i"
          class="dot"
          :class="{ active: i === current }"
          @click="goTo(i)"
        />
      </div>
    </div>

    <!-- ── Bouton Bas ── -->
    <button
      class="arrow-btn arrow-down"
      @click="next"
      aria-label="Suivant"
    >
      <svg viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,4 55,8 30,34" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
} from "vue";

interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Langages",
    icon: "⬡",
    skills: [
      "Python",
      "JavaScript",
      "PHP",
      "Java",
      "Bash",
    ],
  },
  {
    category: "Web & API",
    icon: "◈",
    skills: [
      "HTML",
      "CSS",
      "REST APIs",
      "JSON",
      "OpenAPI",
    ],
  },
  {
    category: "Databases",
    icon: "⬢",
    skills: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Microsoft Access",
    ],
  },
  {
    category: "Data & ETL",
    icon: "◆",
    skills: [
      "Pandas",
      "NumPy",
      "SQL",
      "Matplotlib",
      "Seaborn",
      "Dash",
      "Excel",
      "Power BI",
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "⬣",
    skills: [
      "Microsoft Azure",
      "Google Cloud Platform",
      "Git",
      "GitHub",
      "CI/CD pipelines",
      "Docker",
    ],
  },
  {
    category: "Tools & IDEs",
    icon: "◉",
    skills: [
      "VS Code",
      "IntelliJ",
      "Jupyter Notebook",
      "Trello",
    ],
  },
  {
    category: "Methodologies",
    icon: "✦",
    skills: [
      "Agile",
      "Scrum",
      "Kanban",
    ],
  },
  {
    category: "OS",
    icon: "⬟",
    skills: [
      "Ubuntu",
      "Fedora",
      "Windows 10",
    ],
  },
];

const current = ref(0);

let timer: ReturnType<typeof setInterval> | null = null;

const INTERVAL = 10000;

/* ── Navigation ── */
function next() {
  current.value =
    (current.value + 1) % skillGroups.length;

  resetTimer();
}

function prev() {
  current.value =
    (current.value - 1 + skillGroups.length)
    % skillGroups.length;

  resetTimer();
}

function goTo(i: number) {
  current.value = i;

  resetTimer();
}

/* ── Auto Slide ── */
function startTimer() {
  timer = setInterval(next, INTERVAL);
}

function resetTimer() {
  if (timer) clearInterval(timer);

  startTimer();
}

onMounted(startTimer);

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
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

  clip-path:
    polygon(
      0% 0%,
      103% 10%,
      80% 100%,
      5% 90%
    );

  padding: 1.5rem 2rem 2rem;

  gap: 0.5rem;

  position: relative;
  overflow: hidden;
}

/* ── Overlay ── */
.card::before {
  content: "";

  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      135deg,
      rgba(255, 107, 107, 0.08),
      transparent 45%
    );

  pointer-events: none;
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

  transition:
    opacity 0.25s ease,
    transform 0.2s ease;

  filter:
    drop-shadow(
      0 0 4px
      rgba(255, 107, 107, 0.6)
    );
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

/* ── Content ── */
.card-content {
  padding: 1rem 1.5rem;

  display: flex;
  flex-direction: column;

  align-items: flex-start;

  gap: 1rem;
}

/* ── Index ── */
.skill-index {
  font-family: 'Courier New', monospace;

  font-size: 0.75rem;

  letter-spacing: 0.15em;

  color: #ff6b6b;

  opacity: 0.8;
}

/* ── Badge ── */
.group-badge {
  display: flex;
  align-items: center;

  gap: 0.5rem;

  background:
    rgba(255, 107, 107, 0.1);

  border:
    1px solid
    rgba(255, 107, 107, 0.3);

  padding: 0.25rem 0.75rem;

  clip-path:
    polygon(
      6px 0%,
      100% 0%,
      calc(100% - 6px) 100%,
      0% 100%
    );
}

.group-icon {
  font-size: 1rem;
  color: #ff6b6b;
}

.group-name {
  font-family: 'Courier New', monospace;

  font-size: 0.75rem;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  color: rgba(255,255,255,0.9);
}

/* ── Title ── */
.group-title {
  font-family: 'Pricedown', cursive;

  font-size: 1.8rem;

  margin: 0;

  color: #fff;

  line-height: 1.1;

  text-shadow:
    0 0 14px
    rgba(255, 107, 107, 0.45);
}

/* ── Skills ── */
.skills-tags {
  display: flex;
  flex-wrap: wrap;

  gap: 0.45rem;
}

.tag {
  font-family: 'Courier New', monospace;

  font-size: 0.68rem;

  letter-spacing: 0.08em;

  padding: 0.28rem 0.7rem;

  border:
    1px solid
    rgba(255, 107, 107, 0.5);

  color: #ff6b6b;

  background:
    rgba(255, 107, 107, 0.08);

  clip-path:
    polygon(
      4px 0%,
      100% 0%,
      calc(100% - 4px) 100%,
      0% 100%
    );

  text-transform: uppercase;

  transition:
    transform 0.2s ease,
    background 0.25s ease,
    color 0.25s ease;
}

.tag:hover {
  transform: translateY(-2px);

  background:
    rgba(255, 107, 107, 0.18);

  color: #fff;
}

/* ── Dots ── */
.dots {
  display: flex;

  gap: 6px;

  margin-top: 1rem;
}

.dot {
  width: 7px;
  height: 7px;

  background:
    rgba(255, 255, 255, 0.3);

  clip-path:
    polygon(
      50% 0%,
      100% 50%,
      50% 100%,
      0% 50%
    );

  cursor: pointer;

  transition:
    background 0.25s ease,
    transform 0.2s ease;
}

.dot.active {
  background: #ff6b6b;

  transform: scale(1.4);
}

/* ── Transition ── */
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;

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

  .group-title {
    font-size: 1.4rem;
  }

  .tag {
    font-size: 0.62rem;
  }
}
</style>
