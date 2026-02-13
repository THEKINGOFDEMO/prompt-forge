import { defineStore } from "pinia";

function loadInitialMessages() {
  try {
    const saved = localStorage.getItem("promptforge-chat");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("读取对话历史失败", e);
  }
  return [
    {
      id: Date.now(),
      role: "assistant",
      content: "你好！我是PromptForge助手，有什么可以帮你的？",
    },
  ];
}

export const useChatStore = defineStore("chat", {
  state: () => ({
    messages: loadInitialMessages(),
    loading: false,
    error: null,
  }),

  actions: {
    // 保存到 localStorage
    saveToLocalStorage() {
      localStorage.setItem("promptforge-chat", JSON.stringify(this.messages));
    },

    // 添加消息
    addMessage(message) {
      this.messages.push({
        id: Date.now() + Math.random(),
        ...message,
      });
      this.saveToLocalStorage(); // ✅ 需要
    },

    // 更新AI的最后一条回复
    updateLastMessage(content) {
      const last = this.messages[this.messages.length - 1];
      if (last && last.role === "assistant") {
        last.content += content;
        this.saveToLocalStorage(); // ✅ 需要
      }
    },

    // 设置加载状态
    setLoading(status) {
      this.loading = status; // ❌ 不需要存
    },

    // 设置错误信息
    setError(error) {
      this.error = error; // ❌ 不需要存
    },

    // 清空对话
    clearMessages() {
      this.messages = [
        {
          id: Date.now(),
          role: "assistant",
          content: "你好！我是PromptForge助手，有什么可以帮你的？",
        },
      ];
      this.saveToLocalStorage(); // ✅ 需要
    },
  },

  getters: {
    messageCount: (state) => state.messages.length,
    hasError: (state) => !!state.error,
  },
});
