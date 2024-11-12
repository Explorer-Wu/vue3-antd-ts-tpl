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
// import ElementPlus from 'element-plus';
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import "dayjs/locale/zh-cn";

// import 'element-plus/dist/index.css'; // 全局引入样式
//  import 'element-plus/packages/theme-chalk/src/base.scss'; // 按需引入样式

import "ant-design-vue/dist/antd.css";
// import "ant-design-vue/dist/antd.dark.less";
// import 'ant-design-vue/dist/antd.less'; // 引入官方提供的 less 样式入口文件
// import '@/assets/styles/components/bluetheme.less'; // 用于覆盖上面定义的变量

// import '@/assets/styles/theme/element.scss';
import "@/assets/styles/main/base.scss";
import "@/assets/styles/components/general.scss";
import "@/assets/styles/components/app.scss";
import "uno.css";

//  import { useStore } from '@/stores'
export default function loadComponent(app: any) {
  // app.use(ElementPlus, { size: useStore().state.app.size })
  // app.use(ElementPlus, {
  // 	locale: zhCn,
  // 	size: 'small',
  // 	zIndex: 3000,
  // });
  //  components.forEach(component => {
  //     app.component(component.name, component)
  //  })
  //  plugins.forEach(plugin => {
  //     app.use(plugin)
  //  })

  app.config.globalProperties.$message = ElMessage;
}
