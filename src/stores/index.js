import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;

// 导出所有 stores
export { useChatStore } from "./modules/chat";
export { usePromptsStore } from "./modules/prompts";
export { useThemeStore } from "./modules/theme";
export { useI18nStore } from "./modules/i18n";
