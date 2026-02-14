<template>
  <div class="message" :class="[message.role, { loading }]">
    <div class="avatar">
      <n-avatar :src="avatarSrc" :size="36" round />
    </div>
    <div class="message-content">
      <div class="message-header">
        <span class="sender">{{
          message.role === "user" ? "你" : "PromptForge"
        }}</span>
        <span class="time">{{ formatTime(message.id) }}</span>
      </div>
      <div class="message-bubble">
        <!-- AI 消息用自定义 Markdown 渲染 -->
        <MarkdownRenderer
          v-if="message.role === 'assistant' && !loading && message.content"
          :content="message.content"
        />
        <!-- 加载状态 -->
        <div v-else-if="loading" class="typing">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <!-- 用户消息纯文本 -->
        <div v-else class="text">{{ message.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import MarkdownRenderer from "./MarkdownRenderer.vue";
import { useThemeStore } from "@/stores/modules/theme";

const props = defineProps({
  message: { type: Object, required: true },
  loading: { type: Boolean, default: false },
});

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const avatarSrc = computed(() => {
  return props.message.role === "user"
    ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
    : "https://api.dicebear.com/7.x/avataaars/svg?seed=ai";
});

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};
</script>

<style scoped>
.message {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  max-width: 800px;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.message.user .message-header {
  justify-content: flex-end;
}

.sender {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.message-bubble {
  padding: 16px 20px;
  background-color: var(--message-bg);
  border-radius: 20px;
  line-height: 1.6;
  font-size: 14px;
  color: var(--text-primary);
  word-break: break-word;
}

.message.user .message-bubble {
  background-color: var(--user-message-bg);
  color: var(--user-message-text);
}

.text {
  white-space: pre-wrap;
}

/* 打字机动画 */
.typing {
  display: flex;
  gap: 4px;
  padding: 4px 0;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: var(--text-tertiary);
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

/* 暗黑模式 - 柔和风格 */
.dark .message-bubble {
  background-color: #2c2c2e !important;
  color: #e6e6e6 !important;
}

.dark .message.user .message-bubble {
  background-color: #1e3a2a !important;
  color: #e6e6e6 !important;
}

.dark .sender {
  color: #a0a0a0;
}

.dark .time {
  color: #787878;
}

.dark .dot {
  background-color: #787878;
}
</style>
