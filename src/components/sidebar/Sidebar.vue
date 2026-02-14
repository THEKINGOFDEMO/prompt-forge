<template>
  <!-- 桌面端侧边栏 -->
  <div v-if="!isMobile" class="sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <n-button text @click="collapsed = !collapsed" class="toggle-btn">
        <n-icon size="20">
          <MenuOutline />
        </n-icon>
      </n-button>
      <span v-if="!collapsed" class="brand">PromptForge</span>
    </div>

    <template v-if="!collapsed">
      <div class="sidebar-content">
        <CategoryNav />
        <TemplateList @select="handleSelect" />
      </div>

      <!-- 底部：用户信息 + 工具箱 -->
      <div class="sidebar-footer">
        <div class="user-profile">
          <n-avatar :src="userAvatar" :size="32" round class="user-avatar" />
          <span class="user-name">访客</span>
        </div>

        <div class="tool-group">
          <n-popover trigger="hover" placement="right">
            <template #trigger>
              <n-button text class="tool-icon" @click="toggleTheme">
                <n-icon size="20">
                  <MoonOutline v-if="themeStore.isDark" />
                  <SunnyOutline v-else />
                </n-icon>
              </n-button>
            </template>
            <span>{{
              themeStore.isDark ? i18n.t("darkMode") : i18n.t("lightMode")
            }}</span>
          </n-popover>

          <n-popover trigger="hover" placement="right">
            <template #trigger>
              <n-button text class="tool-icon" @click="toggleLang">
                <n-icon size="20">
                  <LanguageOutline />
                </n-icon>
              </n-button>
            </template>
            <span>{{ i18n.t("switchLang") }}</span>
          </n-popover>

          <n-popover trigger="hover" placement="right">
            <template #trigger>
              <n-button text class="tool-icon">
                <n-icon size="20">
                  <SettingsOutline />
                </n-icon>
              </n-button>
            </template>
            <div class="tool-popover">
              <div class="tool-item" @click="toggleTheme">
                <n-icon size="18">
                  <MoonOutline v-if="themeStore.isDark" />
                  <SunnyOutline v-else />
                </n-icon>
                <span>{{
                  themeStore.isDark ? i18n.t("darkMode") : i18n.t("lightMode")
                }}</span>
              </div>
              <div class="tool-item" @click="toggleLang">
                <n-icon size="18">
                  <LanguageOutline />
                </n-icon>
                <span>{{ i18n.t("switchLang") }}</span>
              </div>
            </div>
          </n-popover>
        </div>
      </div>
    </template>

    <!-- 折叠状态下的侧边栏 -->
    <div v-if="collapsed" class="sidebar-footer collapsed">
      <n-avatar :src="userAvatar" :size="32" round class="user-avatar" />
      <div class="tool-group vertical">
        <n-popover trigger="hover" placement="right">
          <template #trigger>
            <n-button text class="tool-icon" @click="toggleTheme">
              <n-icon size="20">
                <MoonOutline v-if="themeStore.isDark" />
                <SunnyOutline v-else />
              </n-icon>
            </n-button>
          </template>
          <span>{{
            themeStore.isDark ? i18n.t("darkMode") : i18n.t("lightMode")
          }}</span>
        </n-popover>

        <n-popover trigger="hover" placement="right">
          <template #trigger>
            <n-button text class="tool-icon" @click="toggleLang">
              <n-icon size="20">
                <LanguageOutline />
              </n-icon>
            </n-button>
          </template>
          <span>{{ i18n.t("switchLang") }}</span>
        </n-popover>

        <n-popover trigger="hover" placement="right">
          <template #trigger>
            <n-button text class="tool-icon">
              <n-icon size="20">
                <SettingsOutline />
              </n-icon>
            </n-button>
          </template>
          <span>{{ i18n.t("tools") }}</span>
        </n-popover>
      </div>
    </div>
  </div>

  <!-- 移动端抽屉 -->
  <n-drawer
    v-else
    :show="!mobileCollapsed"
    :width="260"
    placement="left"
    @mask-click="mobileCollapsed = true"
  >
    <div class="sidebar mobile-drawer">
      <div class="sidebar-header">
        <span class="brand">PromptForge</span>
        <n-button text @click="mobileCollapsed = true" class="close-btn">
          <n-icon size="20">
            <CloseOutline />
          </n-icon>
        </n-button>
      </div>

      <div class="sidebar-content">
        <CategoryNav />
        <TemplateList @select="handleSelectMobile" />
      </div>

      <div class="sidebar-footer">
        <div class="user-profile">
          <n-avatar :src="userAvatar" :size="32" round />
          <span class="user-name">访客</span>
        </div>
        <div class="tool-group">
          <n-button text class="tool-icon" @click="toggleTheme">
            <n-icon size="20">
              <MoonOutline v-if="themeStore.isDark" />
              <SunnyOutline v-else />
            </n-icon>
          </n-button>
          <n-button text class="tool-icon" @click="toggleLang">
            <n-icon size="20">
              <LanguageOutline />
            </n-icon>
          </n-button>
        </div>
      </div>
    </div>
  </n-drawer>

  <!-- 移动端菜单按钮 -->
  <div
    v-if="isMobile && mobileCollapsed"
    class="mobile-menu-btn"
    @click="mobileCollapsed = false"
  >
    <n-button text>
      <n-icon size="24">
        <MenuOutline />
      </n-icon>
    </n-button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  MenuOutline,
  CloseOutline,
  MoonOutline,
  SunnyOutline,
  LanguageOutline,
  SettingsOutline,
} from "@vicons/ionicons5";
import CategoryNav from "./CategoryNav.vue";
import TemplateList from "./TemplateList.vue";
import { useThemeStore } from "@/stores/modules/theme";
import { useI18nStore } from "@/stores/modules/i18n";

const themeStore = useThemeStore();
const i18n = useI18nStore();

// 用户头像
const userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=visitor";

// 桌面端折叠
const collapsed = ref(false);
// 移动端折叠
const mobileCollapsed = ref(true);
// 响应式判断
const isMobile = ref(window.innerWidth <= 768);

const emit = defineEmits(["selectTemplate"]);

const handleSelect = (content) => {
  emit("selectTemplate", content);
};

const handleSelectMobile = (content) => {
  emit("selectTemplate", content);
  mobileCollapsed.value = true;
};

const toggleTheme = () => {
  themeStore.toggle();
};

const toggleLang = () => {
  i18n.toggle();
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  if (!isMobile.value) {
    mobileCollapsed.value = true;
  }
};

onMounted(() => {
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.2s;
  position: relative;
  z-index: 100;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.toggle-btn {
  padding: 4px;
  border-radius: var(--radius-full);
}

.brand {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-color);
  white-space: nowrap;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.sidebar-footer.collapsed {
  flex-direction: column;
  gap: 20px;
  padding: 16px 8px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 14px;
  color: var(--text-primary);
}

.tool-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-group.vertical {
  flex-direction: column;
  gap: 12px;
}

.tool-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
}

.tool-icon:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--text-primary);
}

.dark .tool-icon:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.tool-popover {
  padding: 8px;
  min-width: 140px;
}

.tool-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
}

.tool-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .tool-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* 移动端样式 */
.mobile-drawer {
  width: 260px;
  height: 100vh;
  background-color: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
}

.close-btn {
  margin-left: auto;
  border-radius: var(--radius-full);
}

.mobile-menu-btn {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 90;
  width: 44px;
  height: 44px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.dark .mobile-menu-btn {
  background-color: var(--sidebar-bg);
  border-color: var(--border-color);
}

/* 响应式 */
@media (max-width: 768px) {
  .sidebar:not(.mobile-drawer) {
    display: none;
  }

  .sidebar-footer {
    padding: 12px;
  }

  .tool-group {
    gap: 4px;
  }
}
</style>
