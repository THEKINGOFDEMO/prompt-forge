<template>
  <div class="template-list">
    <div class="title">推荐模板</div>
    <div class="items">
      <div
        v-for="prompt in promptsStore.currentPrompts"
        :key="prompt.id"
        class="item"
        @click="emit('select', prompt.content)"
      >
        <div class="name">{{ prompt.title }}</div>
        <div class="preview">{{ prompt.content.slice(0, 20) }}...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePromptsStore } from "@/stores";

const promptsStore = usePromptsStore();
const emit = defineEmits(["select"]);
</script>

<style scoped>
.template-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px 8px;
}

.title {
  padding: 0 8px 8px;
  font-size: 12px;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.item {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 4px;
  transition: all 0.2s;
}

.item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.preview {
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
