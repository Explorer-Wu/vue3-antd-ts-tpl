import Fetch from "./request.ts";

export default class AxiosFetch {
  axInstance: any;

  constructor(domain: string) {
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
