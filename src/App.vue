<template>
  <n-config-provider :theme="themeStore.naiveTheme">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { onMounted } from "vue";
import { useThemeStore } from "./stores/modules/theme";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.applyTheme();
});
</script>
