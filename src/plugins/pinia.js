import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
export function setupPinia(app) {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate); // 启用持久化插件
  app.use(pinia);
  return pinia;
}
