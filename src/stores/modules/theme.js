import { defineStore } from "pinia";
import { darkTheme } from "naive-ui";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
  }),

  actions: {
    toggle() {
      this.isDark = !this.isDark;
      this.applyTheme();
    },

    setDark(val) {
      this.isDark = val;
      this.applyTheme();
    },

    applyTheme() {
      if (this.isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },

  getters: {
    naiveTheme: (state) => (state.isDark ? darkTheme : null),
  },

  persist: {
    key: "theme",
    paths: ["isDark"],
  },
});
