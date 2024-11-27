import { App as VueApp, createApp } from "vue";
import { createPinia } from "pinia";
import generateRouter from "@/router";
import "./style.css";
import App from "./App.vue";
// import store from "./store";
// import UseGeneral from "./plugins/initgeneral";

import { useGlobalPlugins } from "@/plugins";

// import './mockserver';

const app: VueApp<Element> = createApp(App);
const { grouter } = generateRouter();
const pinia = createPinia();

useGlobalPlugins(app, pinia, grouter);
