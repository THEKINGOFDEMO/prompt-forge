<template>
  <div class="chat-view">
    <Sidebar @selectTemplate="handleSelectTemplate" />

    <div class="main">
      <!-- 上层：标题栏 - 完美居中 -->
      <div class="main-header">
        <div class="header-left">
          <n-button text class="mobile-menu" @click="showMobileSidebar = true">
            <n-icon size="24"><MenuOutline /></n-icon>
          </n-button>
          <div class="header-placeholder"></div>
        </div>

        <h2 class="title">{{ i18n.t("title") }}</h2>

        <div class="header-right">
          <div class="header-placeholder"></div>
        </div>
      </div>

      <!-- 中层：消息列表 -->
      <MessageList ref="messageListRef" class="main-middle" />

      <!-- 下层：输入区域 -->
      <div class="main-bottom">
        <InputBar
          v-model="inputText"
          :loading="chatStore.loading"
          :placeholder="i18n.t('inputPlaceholder')"
          @send="handleSend"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { MenuOutline } from "@vicons/ionicons5";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import MessageList from "@/components/chat/MessageList.vue";
import InputBar from "@/components/chat/InputBar.vue";
import { useChatStore } from "@/stores";
import { useI18nStore } from "@/stores/modules/i18n";
import { fetchChatStream } from "@/utils/stream";

const message = useMessage();
const chatStore = useChatStore();
const i18n = useI18nStore();

const inputText = ref("");
const messageListRef = ref(null);
const showMobileSidebar = ref(false);

const handleSelectTemplate = (content) => {
  inputText.value = content;
};

const handleSend = async () => {
  if (!inputText.value.trim() || chatStore.loading) return;

  const userMessage = inputText.value;
  inputText.value = "";

  chatStore.addMessage({ role: "user", content: userMessage });

  chatStore.addMessage({ role: "assistant", content: "" });
  chatStore.setLoading(true);

  const messages = chatStore.messages
    .filter((m) => m.content)
    .map((m) => ({ role: m.role, content: m.content }));

  try {
    await fetchChatStream(messages, (chunk) => {
      chatStore.updateLastMessage(chunk);
    });
  } catch (error) {
    message.error("请求失败");
    chatStore.messages.pop();
  } finally {
    chatStore.setLoading(false);
  }
};
</script>

<style scoped>
.chat-view {
  height: 100vh;
  display: flex;
  background-color: var(--bg-color);
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.main-header {
  height: 64px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 24px;
  position: relative;
}

.header-left,
.header-right {
  flex: 1;
  display: flex;
  align-items: center;
}

.header-left {
  justify-content: flex-start;
}

.header-right {
  justify-content: flex-end;
}

.header-placeholder {
  width: 40px;
}

.mobile-menu {
  display: none;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
}

.mobile-menu:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .mobile-menu:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 64px;
  text-align: center;
  flex-shrink: 0;
}

.main-middle {
  flex: 1;
  overflow-y: auto;
  padding: 0 32px 24px 32px;
}

.main-bottom {
  padding: 0 32px 32px 32px;
  margin-top: 16px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main {
    max-width: 100%;
    margin: 0;
  }

  .main-header {
    padding: 0 16px;
    margin-bottom: 16px;
    height: 56px;
  }

  .mobile-menu {
    display: flex;
  }

  .header-placeholder {
    width: 0;
  }

  .title {
    font-size: 18px;
    line-height: 56px;
  }

  .main-middle {
    padding: 0 16px 16px 16px;
  }

  .main-bottom {
    padding: 0 16px 16px 16px;
    margin-top: 8px;
  }
}

.dark .main-header {
  border-bottom-color: var(--border-color);
}
</style>
