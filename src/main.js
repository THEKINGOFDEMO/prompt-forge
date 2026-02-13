import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { setupPlugins } from "./plugins";

const app = createApp(App);
//一键注册所有组件
setupPlugins(app);
app.mount("#app");
