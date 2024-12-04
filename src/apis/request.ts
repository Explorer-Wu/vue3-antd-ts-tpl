import Vue from "vue";
import axios from "axios";
import { ACCESS_TOKEN, TENANT_ID } from "@/store/mutation-types";
import { getStringParams } from "@/utils/index";

const isProd = ["production", "uat", "preview"].includes(process.env.NODE_ENV);

export default function Fetch(options) {
  const instance = axios.create({
    baseURL: isProd ? options.baseUrl : process.env.BASE_URL,
    // 是否跨域携带cookie
    withCredentials: true,
    timeout: 10 * 1000,
    transformRequest: [
      (data, headers) => {
        console.log("transformRequest:", data, headers);
        if (
          headers.noFormData ||
          headers["Content-Type"] === "application/json"
        ) {
          headers.post["Content-Type"] = "application/json";
          headers.put["Content-Type"] = "application/json";
          headers.patch["Content-Type"] = "application/json";
          // if (headers['Content-Type'] === 'application/json') {
          //   return data;
          // }
          return JSON.stringify(data);
        }
        //参数序列化
        return getStringParams(data);
      },
    ],
  });
  //自定义配置
  let extraOptions = {
    $quiet: options.$quiet || false, //默认弹出message提示
  };

  // handle error status
  const errorConfig = {
    400: "错误请求",
    401: "未授权，请重新登录",
    403: "拒绝访问",
    404: "请求错误，未找到资源",
    408: "请求超时",
    500: "服务端出错",
    502: "网络错误",
    503: "服务不可用",
    504: "网络超时",
    505: "http版本不支持该请求",
  };

  const errorHandle = (error, errorStatus) =>
    errorConfig[errorStatus] || `连接错误${error.response.status}`;
  const handleMessageError = (msg, traceId = "") => {
    $message({
      message: `${msg} ${traceId}` || "系统错误，稍后再试",
      type: "error",
      duration: 5 * 1000,
    });
  };

  // 拦截器
  const interceptors = {
    request: {
      config: (config) => {
        const token = Vue.ls.get(ACCESS_TOKEN);
        if (token) {
          config.headers["X-Access-Token"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
        }

        let tenantid = Vue.ls.get(TENANT_ID);
        if (!tenantid) {
          tenantid = 0;
        }
        config.headers["tenant-id"] = tenantid;
        return config;
      },
      error: (error) => Promise.reject(error),
    },
    response: {
      response: (response) => {
        const { status, data } = response || {}; // code, data, msg
        // if the custom code is not 200, it is judged as an error.
        if (status && status !== 200) {
          !extraOptions.$quiet &&
            handleMessageError(data.message, data.traceId);
          return Promise.reject(
            new Error(data.message || "系统错误，稍后再试")
          );
        }

        return response;
      },
      error: (error) => {
        // eslint-disable-next-line
        console.log("error:", error);
        if (error && error.response.status) {
          error.message = errorHandle(error, error.response.status);
        }
        if (error.message.includes("timeout")) error.message = "网络请求超时！";
        !extraOptions.$quiet && handleMessageError(error.message);
        return Promise.reject(error);
        // return Promise.reject(error.response.data || error.message);
      },
    },
  };

  // request interceptor
  instance.interceptors.request.use(
    interceptors.request.config,
    interceptors.request.error
  );

  // response interceptor
  instance.interceptors.response.use(
    interceptors.response.response,
    interceptors.response.error
  );

  return instance(options)
    .then((response) => {
      const { data } = response;
      // if (status === 200 && typeof window !== 'undefined') {
      //   throw error; // message.error(error +', 请求失败！');
      // }

      return Promise.resolve({
        ...data,
      });
    })
    .catch((error) => Promise.reject(error));
}
