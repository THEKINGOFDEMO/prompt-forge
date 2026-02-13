import { setupNaive } from "./naive";
import { setupPinia } from "./pinia";

export function setupPlugins(app) {
  setupPinia(app); // Pinia 先注册
  setupNaive(app); // 再注册 UI 库
}
