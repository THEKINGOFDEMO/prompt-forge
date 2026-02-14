<template>
  <div class="input-area">
    <div class="input-wrapper">
      <div class="input-container">
        <textarea
          ref="textareaRef"
          :value="modelValue"
          @input="onInput"
          @keydown.enter.prevent="onEnter"
          :placeholder="placeholder"
          :disabled="loading"
          class="chat-textarea"
          rows="1"
        ></textarea>
      </div>
      <button
        class="send-button"
        :disabled="!modelValue?.trim() || loading"
        @click="$emit('send')"
      >
        <svg
          v-if="!loading"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
        </svg>
        <div v-else class="loading-spinner"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  loading: { type: Boolean, default: false },
  placeholder: { type: String, default: "输入消息..." },
});

const emit = defineEmits(["update:modelValue", "send"]);
const textareaRef = ref(null);

const onInput = (e) => {
  emit("update:modelValue", e.target.value);
  autoResize(e.target);
};

const onEnter = (e) => {
  if (!e.shiftKey) {
    emit("send");
  }
};

const autoResize = (textarea) => {
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
};
</script>

<style scoped>
.input-area {
  width: 100%;
  padding: 0 4px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 4px 4px 4px 16px;
  transition: all 0.2s;
  min-height: 48px;
}

.input-wrapper:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.1);
}

.input-container {
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 40px;
}

.chat-textarea {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-primary);
  resize: none;
  padding: 10px 0;
  margin: 0;
  font-family: inherit;
  max-height: 120px;
}

.chat-textarea::placeholder {
  color: var(--text-tertiary);
  opacity: 0.8;
}

.chat-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  padding: 0;
}

.send-button:hover:not(:disabled) {
  background-color: var(--primary-hover);
  transform: scale(1.05);
}

.send-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 暗黑模式 */
.dark .input-wrapper {
  background-color: #2d2d2d;
  border-color: #404040;
}

.dark .input-wrapper:focus-within {
  border-color: #63e2b7;
  box-shadow: 0 0 0 2px rgba(99, 226, 183, 0.2);
}

.dark .chat-textarea {
  color: #e0e0e0;
}

.dark .chat-textarea::placeholder {
  color: #808080;
}

.dark .send-button {
  background-color: #63e2b7;
  color: #1e1e1e;
}

.dark .send-button:hover:not(:disabled) {
  background-color: #7fe7c4;
}
</style>
