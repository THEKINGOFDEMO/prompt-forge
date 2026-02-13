<template>
  <div class="chat-container">
    <!-- 消息列表 -->
    <div class="message-list" ref="messageListRef">
      <div
        v-for="msg in chatStore.messages"
        :key="msg.id"
        :class="['message-item', msg.role]"
      >
        <!-- 头像 -->
        <n-avatar
          :src="msg.role === 'user' ? userAvatar : aiAvatar"
          :size="40"
        />

        <!-- 消息内容 -->
        <div class="message-content">
          <div class="message-bubble">
            <!-- AI消息用Markdown渲染 -->
            <MdPreview
              v-if="msg.role === 'assistant'"
              :modelValue="msg.content"
              :theme="isDark ? 'dark' : 'light'"
              language="zh-CN"
              :showCodeRowNumber="true"
              :autoDetectCode="true"
            />
            <!-- 用户消息保持纯文本 -->
            <div v-else>{{ msg.content }}</div>
          </div>
          <div class="message-time">
            {{ new Date(msg.id).toLocaleTimeString() }}
          </div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="chatStore.loading" class="message-item assistant">
        <n-avatar :src="aiAvatar" :size="40" />
        <div class="message-content">
          <div class="message-bubble">
            <TypingIndicator />
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <n-input
        v-model:value="inputText"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 4 }"
        placeholder="输入消息... Shift + Enter 换行，Enter 发送"
        :disabled="chatStore.loading"
        @keydown.enter.prevent="handleSend"
      />
      <n-button
        type="primary"
        @click="handleSend"
        :loading="chatStore.loading"
        :disabled="!inputText.trim()"
      >
        发送
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useChatStore } from "@/stores";
import { fetchChatStream } from "@/utils/stream";
import { useMessage } from "naive-ui";
import TypingIndicator from "./TypingIndicator.vue";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

// 暗黑模式判断（Naive UI主题）
import { useThemeVars } from "naive-ui";
const themeVars = useThemeVars();
const isDark = computed(() => themeVars.value.primaryColor === "#63e2b7"); // Naive暗黑特征值

const message = useMessage();

// 头像（你可以换成自己的图）
const userAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
const aiAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";

const chatStore = useChatStore();
const inputText = ref("");
const messageListRef = ref(null);

// 发送消息
const handleSend = async () => {
  if (!inputText.value.trim() || chatStore.loading) return;

  const userMessage = inputText.value;
  inputText.value = "";

  // 添加用户消息
  chatStore.addMessage({
    role: "user",
    content: userMessage,
  });

  // 滚动到底部
  scrollToBottom();

  // 添加空的AI消息占位
  chatStore.addMessage({
    role: "assistant",
    content: "",
  });
  chatStore.setLoading(true);

  // 构建消息历史（发给AI）
  const messages = chatStore.messages
    .filter((m) => m.content) // 过滤掉空消息
    .map((m) => ({
      role: m.role,
      content: m.content,
    }));

  try {
    await fetchChatStream(messages, (chunk) => {
      chatStore.updateLastMessage(chunk);
      scrollToBottom();
    });
  } catch (error) {
    message.error("请求失败，请检查API Key或网络");
    // 删除刚才添加的空AI消息
    chatStore.messages.pop();
  } finally {
    chatStore.setLoading(false);
    scrollToBottom();
  }
};
// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight;
    }
  }, 50);
};
</script>

<style scoped>
.chat-container {
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message-item {
  display: flex;
  margin-bottom: 20px;
  gap: 12px;
}

.message-item.user {
  flex-direction: row-reverse;
}

.message-content {
  max-width: 70%;
  text-align: left;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  word-break: break-word;
}

.message-item.user .message-bubble {
  background-color: #18a058;
  color: white;
}

.message-time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  text-align: right;
}

.message-item.user .message-time {
  text-align: left;
}

.input-area {
  display: flex;
  gap: 12px;
  padding: 20px;
  background-color: white;
  border-top: 1px solid #eee;
}

.input-area .n-input {
  flex: 1;
}

/* 强制 MdPreview 左对齐 */
.message-bubble .md-editor-preview {
  text-align: left !important;
  width: 100%;
}

/* 表格容器宽度限制 */
.message-bubble table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
}

.message-bubble th,
.message-bubble td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.message-bubble th {
  background-color: #f5f5f5;
  font-weight: bold;
}

/* 暗黑模式适配 */
.message-item.user .message-bubble th {
  background-color: #2a4a3a;
  border-color: #3a5a4a;
}
</style>
