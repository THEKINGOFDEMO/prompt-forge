<template>
  <div class="markdown-body" v-html="renderedContent"></div>
</template>

<script setup>
import { computed } from "vue";
import { marked } from "marked";
import { useThemeStore } from "@/stores/modules/theme";

const props = defineProps({
  content: { type: String, default: "" },
});

const themeStore = useThemeStore();

// 配置 marked
marked.setOptions({
  breaks: true, // 支持换行
  gfm: true, // GitHub 风格 markdown
  headerIds: false, // 不生成 header id
  mangle: false, // 不转义邮箱
});

const renderedContent = computed(() => {
  return marked(props.content);
});
</script>

<style scoped>
.markdown-body {
  line-height: 1.6;
  font-size: 14px;
  color: inherit;
  background-color: transparent;
}

/* 段落 - 保持主色 */
.markdown-body :deep(p) {
  margin: 0 0 10px 0;
  color: var(--text-primary);
}

.markdown-body :deep(p:last-child) {
  margin-bottom: 0;
}

/* 标题 - 更粗更突出 */
.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  margin: 20px 0 12px 0;
  font-weight: 700;
  color: var(--text-primary);
}

.markdown-body :deep(h1) {
  font-size: 1.8em;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 8px;
}

.markdown-body :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 6px;
}

.markdown-body :deep(h3) {
  font-size: 1.3em;
  color: var(--text-secondary);
}

.markdown-body :deep(h4) {
  font-size: 1.2em;
  color: var(--text-secondary);
}

/* 列表 - 缩进清晰 */
.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 8px 0 12px 0;
  padding-left: 28px;
  color: var(--text-primary);
}

.markdown-body :deep(li) {
  margin: 6px 0;
  color: var(--text-primary);
}

.markdown-body :deep(li::marker) {
  color: var(--primary-color);
}

/* 代码块 - 深色背景 + 彩色文字 */
.markdown-body :deep(pre) {
  background-color: #1e1e1e;
  padding: 16px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 16px 0;
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid #333;
}

.markdown-body :deep(code) {
  font-family:
    "Fira Code", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace;
}

.markdown-body :deep(pre code) {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  color: #d4d4d4;
}

/* 行内代码 - 不同颜色 */
.markdown-body :deep(code):not(pre code) {
  background-color: rgba(0, 0, 0, 0.08);
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.9em;
  color: #d14;
  font-weight: 500;
}

/* 引用 - 左侧竖线 + 灰色文字 */
.markdown-body :deep(blockquote) {
  margin: 12px 0;
  padding: 8px 20px;
  border-left: 4px solid var(--primary-color);
  background-color: rgba(0, 0, 0, 0.02);
  color: var(--text-secondary);
  font-style: italic;
}

.markdown-body :deep(blockquote p) {
  color: var(--text-secondary);
}

/* 链接 - 绿色 */
.markdown-body :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
  color: var(--primary-hover);
}

/* 表格 */
.markdown-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
  font-size: 13px;
}

.markdown-body :deep(th) {
  background-color: rgba(0, 0, 0, 0.05);
  font-weight: 600;
  padding: 10px 12px;
  text-align: left;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.markdown-body :deep(td) {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.markdown-body :deep(tr:nth-child(even)) {
  background-color: rgba(0, 0, 0, 0.02);
}

/* 水平线 */
.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 24px 0;
}

/* 图片 */
.markdown-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 粗体 */
.markdown-body :deep(strong) {
  color: var(--primary-color);
  font-weight: 700;
}

/* 斜体 */
.markdown-body :deep(em) {
  color: var(--text-secondary);
  font-style: italic;
}

/* 删除线 */
.markdown-body :deep(del) {
  color: var(--text-tertiary);
}

/* 暗黑模式调整 */
.dark .markdown-body :deep(pre) {
  background-color: #0d1117;
  border-color: #30363d;
}

.dark .markdown-body :deep(code):not(pre code) {
  background-color: rgba(255, 255, 255, 0.12);
  color: #ff7b72;
}

.dark .markdown-body :deep(blockquote) {
  background-color: rgba(255, 255, 255, 0.02);
  border-left-color: #63e2b7;
}

.dark .markdown-body :deep(th) {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: #30363d;
}

.dark .markdown-body :deep(td) {
  border-color: #30363d;
}

.dark .markdown-body :deep(tr:nth-child(even)) {
  background-color: rgba(255, 255, 255, 0.02);
}

.dark .markdown-body :deep(hr) {
  border-top-color: #30363d;
}

.dark .markdown-body :deep(strong) {
  color: #63e2b7;
}

.dark .markdown-body :deep(a) {
  color: #63e2b7;
}

.dark .markdown-body :deep(a:hover) {
  color: #7fe7c4;
}

/* 用户消息内的特殊处理 - 白色背景上 */
.message.user .markdown-body :deep(code):not(pre code) {
  background-color: rgba(255, 255, 255, 0.15);
  color: #ffe484;
}

.message.user .markdown-body :deep(pre) {
  background-color: rgba(0, 0, 0, 0.3);
}

.message.user .markdown-body :deep(blockquote) {
  background-color: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
}
</style>
