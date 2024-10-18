import { API_URLS } from "../constants/vars";

export const getApiUrl = (
    name: string,
    value: { [key: string]: string } = {}
  ) => {
    if (Array.isArray(value)) {
      throw Error("Array is not a valid param. Use Object with key and values");
    }
    if (!Object.keys(value).length) {
      return API_URLS[name];
    }
    let url = API_URLS[name];
  
    const keys = Object.keys(value);
    keys.forEach((name) => {
      url = url.replace(":" + name, value[name]);
    });
    return url;
  };