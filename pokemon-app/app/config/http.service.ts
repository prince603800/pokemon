import { StatusCodes } from "http-status-codes";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  responseType: "json",
  timeout: 30000,
  timeoutErrorMessage: "Request Time out",
  headers: {
    withCredentials: true,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


const getHeaders = ( formData = false) => {
  const headers: { [x: string]: string } = { accept: "application/json" };
  headers["Accept-Language"] =  "en";
  

  if (formData) {
    headers["content-type"] = "multipart/form-data";
  }
  return headers;
};

// export const postRequest = async <T>(
//   url: string,
//   data: any,
//   is_strict = false,
//   formData = false
// ): Promise<AxiosResponse<T>> => {
//   return http.post(url, data, {
//     headers: getHeaders(is_strict, formData),
//   });
// };

export const getRequest = <T>(
  url: string,
  formData = false,
  signal: AbortSignal | undefined = undefined
): Promise<T> => {
  const opt = {
    signal: signal,
    headers: getHeaders( formData),
  };
  if (!signal) delete opt.signal;
  return new Promise((resolve, reject) => {
    http
      .get(url, opt)
      .then((response) => {
        if (
          response &&
          response.status &&
          (response.status === StatusCodes.OK ||
            response.status === StatusCodes.CREATED)
        ) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

