export type Locale = "en-US" | "ar" | "zh-CN" | string;
export type InstallOptions = {
  /**
   * @value en-US 英语(美国)
   * @value zh-CN 简体中文(默认)
   */
  locale?: Locale;
  /**
   * 自定义语言包，可根据中文预发包结构进行翻译
   */
  messages?: Record<string, any>;
};
