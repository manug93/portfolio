import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    menu: {
      about: 'About Me',
      projects: 'Projects',
      achievements: 'Achievements',
      skills: 'Skills',
      contact: 'Contact',
    }
  },

  fr: {
    menu: {
      about: 'À propos',
      projects: 'Projets',
      achievements: 'Réalisations',
      skills: 'Compétences',
      contact: 'Contact',
    }
  }
}

import en from "./en";
import fr from "./fr";
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("lang") || 'en',
  fallbackLocale: 'en',
  messages:{
    en,
    fr
  },
})

export default i18n
