<script setup lang="ts">
import { useHead } from '@unhead/vue'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  url?: string
  image?: string
}>(), {
  title: 'Bienvenue sur Mon Portfolio — Développeur Full Stack spécialisé en Data, Cloud et Web',
  description: 'Portfolio de Mama Nke Hugues Armel — Développeur Full Stack spécialisé en Data, Cloud et Web.',
  url: 'https://manug.dev',
  image: 'https://manug.dev/preview.png',
})

useHead({
  title: () => props.title,
  htmlAttrs: { lang: 'fr' },
  meta: [
    // Base
    { name: 'description',        content: () => props.description },
    { name: 'robots',             content: 'index, follow' },
    { name: 'author',             content: 'Mama Nke Hugues Armel' },

    // Open Graph (Facebook, LinkedIn)
    { property: 'og:type',        content: 'website' },
    { property: 'og:title',       content: () => props.title },
    { property: 'og:description', content: () => props.description },
    { property: 'og:url',         content: () => props.url },
    { property: 'og:image',       content: () => props.image },
    { property: 'og:locale',      content: 'en_US' },

    // Twitter Card
    { name: 'twitter:card',        content: 'summary_large_image' },
    { name: 'twitter:title',       content: () => props.title },
    { name: 'twitter:description', content: () => props.description },
    { name: 'twitter:image',       content: () => props.image },
  ],
  link: [
    { rel: 'canonical', href: () => props.url },
  ],
})
</script>

<template>

</template>
