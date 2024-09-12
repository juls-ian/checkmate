import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
  linkActiveClass: "active",
});

router.beforeEach(async (to, from) => {
  const store = useAuthStore();
  await store.fetchUser();
  // if to.meta has auth=true && user is not logged in
  if (to.meta.auth && !store.isLoggedIn) {
    return { name: "login", query: { redirect: to.fullPath } };
  } else if (to.meta.guest && store.isLoggedIn) {
    return { name: "tasks", query: { redirect: to.fullPath } };
  }
});

export default router;
