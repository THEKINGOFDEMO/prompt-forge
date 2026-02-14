import { setupNaive } from "./naive";
import { setupPinia } from "./pinia";

export function setupPlugins(app) {
  setupPinia(app);
  setupNaive(app);
}
