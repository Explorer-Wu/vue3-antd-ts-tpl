import AxiosFetch from "../index";

let domain = process.env.VUE_APP_API_BASE_URL;

class Common extends AxiosFetch {
  constructor(...args) {
    super(...args);
    super.instance;
    this.name = "Common";
  }

  getUserList(params = {}) {
    return this.axInstance({
      url: "/services/users",
      method: "get",
      $quiet: false, //true响应报错无提示
      params,
    });
  }
}

export default new Common(domain);
