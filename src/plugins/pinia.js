import pinia from "@/stores";

export function setupPinia(app) {
  app.use(pinia);
}
