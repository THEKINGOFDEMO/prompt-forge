<template>
  <div class="category-nav">
    <div class="title">分类</div>
    <div class="items">
      <div
        v-for="cat in promptsStore.categories"
        :key="cat.id"
        class="item"
        :class="{ active: promptsStore.activeCategoryId === cat.id }"
        @click="promptsStore.setActiveCategory(cat.id)"
      >
        <span class="icon">{{ cat.icon }}</span>
        <span class="label">{{ cat.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePromptsStore } from "@/stores";

const promptsStore = usePromptsStore();
</script>

<style scoped>
.category-nav {
  padding: 16px 8px;
  border-bottom: 1px solid var(--border-color);
}

.title {
  padding: 0 8px 8px;
  font-size: 12px;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.item.active {
  background-color: rgba(24, 160, 88, 0.1);
  color: var(--primary-color);
}

.dark .item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.icon {
  font-size: 18px;
}

.label {
  font-size: 14px;
}
</style>
