import { defineStore } from "pinia";

export const usePromptsStore = defineStore("prompts", {
  state: () => ({
    // 分类列表
    categories: [
      { id: 1, name: "写作助手", icon: "✍️" },
      { id: 2, name: "代码调试", icon: "💻" },
      { id: 3, name: "翻译润色", icon: "🌍" },
      { id: 4, name: "面试准备", icon: "🎯" },
    ],

    // 模板数据（硬编码）
    prompts: [
      // 写作助手
      {
        id: 101,
        categoryId: 1,
        title: "周报生成器",
        content: "请帮我写一份周报，主题是{{主题}}，主要工作包括{{工作内容}}",
      },
      {
        id: 102,
        categoryId: 1,
        title: "会议纪要",
        content: "将以下内容整理成会议纪要：{{会议内容}}",
      },
      {
        id: 103,
        categoryId: 1,
        title: "邮件润色",
        content: "帮我润色这封邮件：{{邮件内容}}",
      },

      // 代码调试
      {
        id: 201,
        categoryId: 2,
        title: "代码审查",
        content: "审查以下代码，指出潜在问题：\n```\n{{代码}}\n```",
      },
      {
        id: 202,
        categoryId: 2,
        title: "添加注释",
        content: "给以下代码添加详细注释：\n```\n{{代码}}\n```",
      },
      {
        id: 203,
        categoryId: 2,
        title: "性能优化",
        content: "优化以下代码的性能：\n```\n{{代码}}\n```",
      },

      // 翻译润色
      {
        id: 301,
        categoryId: 3,
        title: "中译英",
        content: "将以下内容翻译成英文：{{内容}}",
      },
      {
        id: 302,
        categoryId: 3,
        title: "英译中",
        content: "将以下内容翻译成中文：{{内容}}",
      },
      {
        id: 303,
        categoryId: 3,
        title: "学术润色",
        content: "润色以下学术段落：{{内容}}",
      },

      // 面试准备
      {
        id: 401,
        categoryId: 4,
        title: "自我介绍",
        content: "帮我写一份前端开发岗位的自我介绍，技术栈是{{技术栈}}",
      },
      {
        id: 402,
        categoryId: 4,
        title: "项目介绍",
        content: "帮我介绍我的项目：{{项目名称}}，用到的技术有{{技术栈}}",
      },
      {
        id: 403,
        categoryId: 4,
        title: "面试题",
        content: "列举{{面试主题}}常见的面试题和答案",
      },
    ],

    // 当前选中的分类
    activeCategoryId: 1,

    // 当前选中的模板（用于填充输入框）
    selectedPrompt: null,
  }),

  actions: {
    setActiveCategory(id) {
      this.activeCategoryId = id;
    },

    selectPrompt(prompt) {
      this.selectedPrompt = prompt;
    },

    clearSelectedPrompt() {
      this.selectedPrompt = null;
    },
  },

  getters: {
    // 当前分类下的模板
    currentPrompts: (state) =>
      state.prompts.filter((p) => p.categoryId === state.activeCategoryId),

    // 分类名称映射
    categoryMap: (state) => {
      const map = {};
      state.categories.forEach((c) => (map[c.id] = c.name));
      return map;
    },
  },
});
