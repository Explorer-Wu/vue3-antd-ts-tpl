import Fetch from "./request.ts";

export default class AxiosFetch {
  constructor(domain) {
    this.axInstance = this.ajax(domain);
  }

  ajax(baseUrl) {
    return (options) =>
      Fetch({
        baseUrl,
        ...options,
      });
  }
}
