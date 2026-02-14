import { createRouter, createWebHistory } from "vue-router";
import chatRoutes from "./modules/chat";

const routes = [
  {
    path: "/",
    redirect: "/chat",
  },
  chatRoutes,
  // 以后加其他模块：...otherRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
