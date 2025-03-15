import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { title: "Home" },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/AboutPage.vue"),
    meta: { title: "About" },
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: () => import("../pages/PortfolioPage.vue"),
    meta: { title: "Portfolio" },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../pages/ContactPage.vue"),
    meta: { title: "Contact" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../pages/NotFoundPage.vue"),
    meta: { title: "404 - Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

// Update page title
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Abid Ibadurrahman`;
  next();
});

export default router;
