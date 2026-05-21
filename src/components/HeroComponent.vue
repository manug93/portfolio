<script setup lang="ts">
import { computed, defineAsyncComponent, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const route  = useRoute();
const router = useRouter();

// ── Sections ───────────────────────────────────────────────────────────────
const VALID_SECTIONS = ["about", "projects", "achievements", "skills", "contact"] as const;
type SectionId = typeof VALID_SECTIONS[number];

const activeId = computed<SectionId>(() => {
  const name = route.name as string;
  return (VALID_SECTIONS.includes(name as SectionId) ? name : "about") as SectionId;
});

const components: Record<SectionId, ReturnType<typeof defineAsyncComponent>> = {
  about:        defineAsyncComponent(() => import("./AboutMe.vue")),
  projects:     defineAsyncComponent(() => import("./Projects.vue")),
  achievements: defineAsyncComponent(() => import("./Achievements.vue")),
  skills:       defineAsyncComponent(() => import("./Skills.vue")),
  contact:      defineAsyncComponent(() => import("./Contact.vue")),
};

const menuItems = computed(() => [
  { id: "about",        label: t("menu.about"),        clipPath: "polygon(5% 10%, 60% 0%, 92% 25%, 95% 80%, 40% 100%, 0% 60%)" },
  { id: "projects",     label: t("menu.projects"),     clipPath: "polygon(0% 0%, 50% 20%, 90% 0%, 95% 100%, 30% 88%, 0% 100%, 0% 30%)" },
  { id: "achievements", label: t("menu.achievements"), clipPath: "polygon(0% 20%, 50% 0%, 100% 15%, 100% 85%, 55% 100%, 0% 90%)" },
  { id: "skills",       label: t("menu.skills"),       clipPath: "polygon(10% 0%, 90% 5%, 100% 70%, 60% 100%, 0% 85%)" },
  { id: "contact",      label: t("menu.contact"),      clipPath: "polygon(15% 0%, 85% 5%, 100% 35%, 95% 75%, 50% 100%, 5% 80%)" },
]);

// ── Menu mobile ────────────────────────────────────────────────────────────
const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function select(id: string) {
  router.push({ name: id });
  menuOpen.value = false;
}

// ── Masquer logo/liens quand le clavier virtuel est visible ────────────────
const keyboardVisible = ref(false);

function handleViewportResize() {
  if (!window.visualViewport) return;
  keyboardVisible.value = window.visualViewport.height < window.innerHeight * 0.75;
}

onMounted(() => {
  window.visualViewport?.addEventListener("resize", handleViewportResize);
});
onUnmounted(() => {
  window.visualViewport?.removeEventListener("resize", handleViewportResize);
});

// ── Langue ─────────────────────────────────────────────────────────────────
function changeLanguage(lang: "en" | "fr") {
  locale.value = lang;
  localStorage.setItem("lang", lang);
}
</script>

<template>
  <div class="main">

    <!-- ── Lang selector desktop (position fixe, toujours visible sur desktop) ── -->
    <div class="lang-selector desktop-lang">
      <button class="lang-btn" @click="changeLanguage('en')">EN</button>
      <button class="lang-btn" @click="changeLanguage('fr')">FR</button>
    </div>

    <!-- ── Topbar mobile (hamburger + lang) ── -->
    <header class="topbar">
      <button
        class="hamburger"
        :class="{ open: menuOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
      <div class="lang-selector">
        <button class="lang-btn" @click="changeLanguage('en')">EN</button>
        <button class="lang-btn" @click="changeLanguage('fr')">FR</button>
      </div>
    </header>

    <!-- ── Overlay menu mobile ── -->
    <Transition name="slide-menu">
      <nav v-if="menuOpen" class="mobile-nav-overlay" @click.self="menuOpen = false">
        <div class="mobile-nav-panel">
          <div
            v-for="item in menuItems"
            :key="item.id"
            class="mobile-nav-item"
            :class="{ active: activeId === item.id }"
            @click="select(item.id)"
          >
            {{ item.label }}
          </div>
        </div>
      </nav>
    </Transition>

    <!-- ── Héro ── -->
    <div class="hero">
      <div class="menu-container">

        <!-- Menu latéral (desktop uniquement) -->
        <nav class="main-menu">
          <div
            v-for="item in menuItems"
            :key="item.id"
            class="menu-item"
            :class="[item.id, { active: activeId === item.id }]"
            :style="{ clipPath: item.clipPath }"
            @click="select(item.id)"
          >
            <span>{{ item.label }}</span>
          </div>
        </nav>

        <!-- Contenu -->
        <div class="menu-content">
          <Transition name="fade" mode="out-in">
            <component :is="components[activeId]" :key="activeId" />
          </Transition>
        </div>

      </div>
    </div>

    <!-- ── Logo : masqué quand clavier virtuel ouvert ── -->
    <div v-show="!keyboardVisible" class="logo" />

    <!-- ── Liens externes : masqués quand clavier virtuel ouvert ── -->
    <div class="external-links" :class="{ 'keyboard-open': keyboardVisible }">
      <a href="https://github.com/manug93" target="_blank" rel="noopener noreferrer">
        <svg fill="#fff" width="24px" height="24px" viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"/>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
          <g id="SVGRepo_iconCarrier">
            <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z"/>
          </g>
        </svg>
      </a>
      <a href="https://linkedin.com/in/mamankehuguesarmel" target="_blank" rel="noopener noreferrer">
        <svg fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 97.75 97.75">
          <g>
            <path d="M48.875,0C21.882,0,0,21.882,0,48.875S21.882,97.75,48.875,97.75S97.75,75.868,97.75,48.875S75.868,0,48.875,0z M30.562,81.966h-13.74V37.758h13.74V81.966z M23.695,31.715c-4.404,0-7.969-3.57-7.969-7.968c0.001-4.394,3.565-7.964,7.969-7.964c4.392,0,7.962,3.57,7.962,7.964C31.657,28.146,28.086,31.715,23.695,31.715z M82.023,81.966H68.294V60.467c0-5.127-0.095-11.721-7.142-11.721c-7.146,0-8.245,5.584-8.245,11.35v21.869H39.179V37.758h13.178v6.041h0.185c1.835-3.476,6.315-7.14,13-7.14c13.913,0,16.481,9.156,16.481,21.059V81.966z"/>
          </g>
        </svg>
      </a>
    </div>

  </div>
</template>

<style scoped>
/* ── Base ──────────────────────────────────────────────────────────────────── */
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  font-family: 'Pricedown', cursive;
}

/* ── Lang selector desktop ─────────────────────────────────────────────────── */
.desktop-lang {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 300;
  display: flex;
  gap: 0.5rem;
}

/* ── Topbar mobile (cachée sur desktop) ────────────────────────────────────── */
.topbar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  align-items: center;
  justify-content: space-between;
}

/* ── Hamburger ─────────────────────────────────────────────────────────────── */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.hamburger span {
  display: block;
  height: 2px;
  background: #ff6b6b;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}
.hamburger.open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }

/* ── Overlay menu mobile ───────────────────────────────────────────────────── */
.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 150;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.mobile-nav-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  max-width: 300px;
  height: 100%;
  background: rgba(10, 10, 30, 0.97);
  border-right: 1px solid rgba(255, 107, 107, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 1.5rem;
}
.mobile-nav-item {
  font-family: 'Pricedown', cursive;
  font-size: 1.6rem;
  color: #ff6b6b;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  border-left: 3px solid transparent;
}
.mobile-nav-item:hover,
.mobile-nav-item.active {
  color: #fff;
  background: rgba(255, 107, 107, 0.15);
  border-left-color: #ff6b6b;
}

/* Transition slide du panel */
.slide-menu-enter-active { transition: opacity 0.3s ease; }
.slide-menu-leave-active { transition: opacity 0.3s ease; }
.slide-menu-enter-from,
.slide-menu-leave-to { opacity: 0; }
.slide-menu-enter-active .mobile-nav-panel,
.slide-menu-leave-active .mobile-nav-panel { transition: transform 0.3s ease; }
.slide-menu-enter-from .mobile-nav-panel { transform: translateX(-100%); }
.slide-menu-leave-to .mobile-nav-panel { transform: translateX(-100%); }

/* ── Héro ──────────────────────────────────────────────────────────────────── */
.hero {
  display: flex;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  color: #fff;
  text-align: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  clip-path: polygon(10% 0%, 90% 5%, 100% 70%, 60% 100%, 0% 80%);
}
.menu-container {
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

/* ── Menu latéral desktop ──────────────────────────────────────────────────── */
.main-menu {
  position: relative;
  width: 50%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  height: 100vh;
  align-items: flex-end;
  flex-direction: column;
}
.menu-item {
  position: relative;
  right: 0;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease, background-color 0.3s ease;
}
.menu-item span {
  padding: 0.5rem 2.5rem;
  display: inline-block;
}
.menu-item:hover,
.menu-item.active {
  color: #fff;
  background-color: rgba(255, 107, 107, 0.25);
}

/* ── Contenu ───────────────────────────────────────────────────────────────── */
.menu-content {
  position: relative;
  width: 50%;
  display: flex;
  gap: 1rem;
  align-items: center;
  overflow: hidden;
}

/* ── Transitions ───────────────────────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.fade-enter-from { opacity: 0; transform: translateX(16px); }
.fade-leave-to { opacity: 0; transform: translateX(-16px); }

/* ── Logo ──────────────────────────────────────────────────────────────────── */
.logo {
  display: block;
  margin: 0 auto;
  width: 150px;
  height: 150px;
  position: absolute;
  background-image: url('@/assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  bottom: 20px;
  left: 20px;
  z-index: 100;
}

/* ── Liens externes ────────────────────────────────────────────────────────── */
.external-links {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 1rem;
  transition: opacity 0.3s ease;
}
.external-links.keyboard-open {
  opacity: 0;
  pointer-events: none;
}
.external-links a {
  color: #ff6b6b;
  transition: color 0.3s ease;
}
.external-links a:hover {
  color: #fff;
  background-color: transparent;
}

/* ── Lang button ───────────────────────────────────────────────────────────── */
.lang-selector {
  display: flex;
  gap: 0.5rem;
}
.lang-btn {
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease;
  font-family: 'Pricedown', cursive;
  border-radius: 4px;
}
.lang-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ── Mobile ≤ 768px ────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  /* Afficher la topbar mobile */
  .topbar {
    display: flex;
  }

  /* Cacher le lang selector desktop */
  .desktop-lang {
    display: none;
  }

  /* Cacher le menu latéral desktop */
  .main-menu {
    display: none;
  }

  /* Hero sans clip-path sur mobile, plein écran */
  .hero {
    clip-path: none;
    background-size: cover;
    background-position: 10% 50%;
  }

  /* Contenu plein écran avec espace pour la topbar */
  .menu-container {
    flex-direction: column;
  }
  .menu-content {
    width: 100%;
    height: 100%;
    padding: 1rem;
    padding-top: calc(56px + 1rem); /* topbar height + padding */
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
  }

  /* Logo réduit sur mobile */
  .logo {
    width: 60px;
    height: 60px;
    bottom: 10px;
    left: 10px;
    opacity: 0.7;
    position: fixed;
  }

  /* Liens externes en fixed sur mobile */
  .external-links {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
}
</style>
