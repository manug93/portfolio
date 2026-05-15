import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        // Redirect racine vers /about par défaut
        { path: '', redirect: '/about' },
        { path: 'about',        name: 'about',        component: { template: '<div/>' } },
        { path: 'projects',     name: 'projects',     component: { template: '<div/>' } },
        { path: 'achievements', name: 'achievements', component: { template: '<div/>' } },
        { path: 'skills',       name: 'skills',       component: { template: '<div/>' } },
        { path: 'contact',      name: 'contact',      component: { template: '<div/>' } },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
})

export default router
