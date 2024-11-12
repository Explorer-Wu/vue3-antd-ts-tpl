import { App as VueApp, createApp } from "vue";
import Antd, { message } from "ant-design-vue";
import "./style.css";
import App from "./App.vue";

import router from "./router";
// import store from "./store";
// import UseGeneral from "./plugins/initgeneral";
import { useGlobalPlugins } from "@/plugins";

// import './mockserver';
import "./globalConfig";

// const UseGeneral = require('./plugins/initgeneral')

const app: VueApp<Element> = createApp(App, Antd);
UseGeneral(app);
app.use(store).use(router).use(Antd).mount("#app");
app.config.globalProperties.$message = message;
