import { defineStore } from "pinia";

const messages = {
  zh: {
    title: "PromptForge",
    inputPlaceholder: "输入消息... Shift + Enter 换行，Enter 发送",
    send: "发送",
    categories: "分类",
    templates: "推荐模板",
    tools: "工具箱",
    darkMode: "夜间模式",
    lightMode: "白天模式",
    switchLang: "English",
  },
  en: {
    title: "PromptForge",
    inputPlaceholder:
      "Type a message... Shift + Enter for new line, Enter to send",
    send: "Send",
    categories: "Categories",
    templates: "Templates",
    tools: "Tools",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    switchLang: "中文",
  },
};

export const useI18nStore = defineStore("i18n", {
  state: () => ({
    locale: localStorage.getItem("locale") || "zh",
  }),

  actions: {
    toggle() {
      this.locale = this.locale === "zh" ? "en" : "zh";
      localStorage.setItem("locale", this.locale);
      document.documentElement.setAttribute("lang", this.locale);
    },

    setLocale(lang) {
      if (lang === "zh" || lang === "en") {
        this.locale = lang;
        localStorage.setItem("locale", lang);
        document.documentElement.setAttribute("lang", lang);
      }
    },
  },

  getters: {
    t: (state) => (key) => {
      return messages[state.locale]?.[key] || key;
    },
  },

  persist: {
    key: "i18n",
    paths: ["locale"],
  },
});
