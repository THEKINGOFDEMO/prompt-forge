<template>
  <div class="message-list" ref="containerRef">
    <MessageItem
      v-for="msg in chatStore.messages"
      :key="msg.id"
      :message="msg"
    />
    <div v-if="chatStore.loading" class="loading-item">
      <MessageItem
        :message="{ role: 'assistant', content: '' }"
        :loading="true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useChatStore } from "@/stores";
import MessageItem from "./MessageItem.vue";

const chatStore = useChatStore();
const { messages, loading } = storeToRefs(chatStore);
const containerRef = ref(null);

// 自动滚动到底部
watch(
  [messages, loading],
  () => {
    setTimeout(() => {
      if (containerRef.value) {
        containerRef.value.scrollTop = containerRef.value.scrollHeight;
      }
    }, 50);
  },
  { deep: true },
);
</script>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
}
</style>
