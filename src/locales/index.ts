import type { App } from "vue";
import type { VueI18nTranslation } from "vue-i18n";
import { createI18n } from "vue-i18n";
// import zhCN from "./lang/zh-CN";
import enUS from "./lang/en-US";
import { mapLocale } from "./lang/maplocale";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

// import ar from "./lang/ar";
import type { Locale } from "./lang/locale-type.ts";

function i18n(app: App, locale?: Locale, messages?: Record<string, any>) {
  locale = locale || "zh-CN";
  dayjs.locale(mapLocale[locale]);

  const mergeMessages = Object.assign(
    {
      "zh-CN": zhCN,
      "en-US": enUS,
      // ar,
    },
    messages
  );

  const I18n = createI18n({
    locale,
    fallbackLocale: "zh-CN",
    messages: mergeMessages,
  });
  app.use(I18n);

  app.provide<VueI18nTranslation>("t", app.config.globalProperties.$t);

  // return I18n;
}
export default i18n;
