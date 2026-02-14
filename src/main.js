import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupPlugins } from "./plugins";
import "./assets/styles/global.css";
import "./assets/styles/variables.css";

const app = createApp(App);

app.use(router);
setupPlugins(app);

app.mount("#app");
