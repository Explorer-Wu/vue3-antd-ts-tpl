import { type App as AppInstance, createApp } from "vue";
import type {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import dayjs from "dayjs";
// import Fetch from '@/api/fetch';
// import { asyncApi, asyncModuleApi } from '@/apis';
import EventBus from "./eventbus";
// import CookieStorage from '@/utils/cookiestorage';

import SvgIcon from "@/components/SvgIcon/index.vue";
import "virtual:svg-icons-register";
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

const GeneralPlugin = {
  install(app: AppInstance): void {
    // 全局实例方法
    app.config.globalProperties.$EventBus = new EventBus();
    app.config.globalProperties.$dayjs = dayjs;
    // 全局的api
    // app.config.globalProperties.$ApiAuth = new ApiAuth(BaseURl.ipAuth);
    // app.config.globalProperties.$Api = new Api(BaseURl.ipCommon);

    // app.provide('i18n', options)
    // app.directive('my-directive', {
    //   mounted (el, binding, vnode, oldVnode) {
    //     // some logic ...
    //   }
    //   ...
    // })

    // 全局混入，注入组件选项
    // app.mixin(MixinsGlobal);
  },
};

// NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/404", "/403", "/500"];

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeof createApp>} app 整个应用的实例
 */
export function useGlobalPlugins(
  app: ReturnType<typeof createApp>,
  store: any,
  router: any
) {
  // (app: any, store: any, router: any)
  // const files = import.meta.glob('./*.ts'); // 为过动态导入，构建时，会分离为独立的 chunk
  const files: Record<string, any> = import.meta.glob("./*.ts", {
    eager: true,
  }); // 直接引入
  console.log("Plugins-files0:", files);

  for (const key in files) {
    // const modules = {};
    // modules[key.replace(/(\.\/module\/|\.js)/g, '')] = files[key].default;
    if (key !== "./index.ts" && key !== "./eventbus.ts") {
      console.log("Plugins-files:", files[key].default);
      // modules[key.replace(/(\.ts)/g, '')] = files[key].default;
      files[key].default(app);
    }
  }

  // router.beforeEach((to, from, next: NavigationGuardNext) => {
  // 	const title = to.meta && to.meta.title;
  // 	if (title) {
  // 		// document.title = title;
  // 	}

  // 	// 判断该路由是否需要登录权限
  // 	// console.log("router-auth:", store.state.auth, localStorage.getItem('access_token'))
  // 	if (to.matched.some(record => record.meta.auth) && !store.state.auth.authenticated) {
  // 		next({
  // 			name: 'Login',
  // 			query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
  // 		});
  // 	}
  // 	next();
  // });
  // 全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
  // router.afterEach((to, from) => {
  //   console.log("afterEach:", to)
  // })

  // VuexRouterSync.sync(store, router);

  app
    .use(router)
    .use(store)
    .use(GeneralPlugin)
    .component("svg-icon", SvgIcon)
    .mount("#subvue3-app");
}
