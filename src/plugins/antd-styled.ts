/*
 * @Description: antd 组件
 */

/**
 *  系统的全局设置size，全部加载方便设置。
 *  如需按需加载:
 *  1.放开注释
 *  2.引入babel-plugin-component库
 *  3.放开babel.config 注释
 */
import Antd, { message } from "ant-design-vue";

import "ant-design-vue/dist/antd.css";
// import "ant-design-vue/dist/antd.dark.less";
// import 'ant-design-vue/dist/antd.less'; // 引入官方提供的 less 样式入口文件

import "@/assets/styles/main/base.scss";
import "@/assets/styles/components/general.scss";
import "@/assets/styles/components/app.scss";
// import "uno.css";

//  import { useStore } from '@/stores'
export default function loadComponent(app: any) {
  app.use(Antd);
  app.config.globalProperties.$message = message;
}
