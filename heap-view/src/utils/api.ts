import { format } from "url";
import fetch from "unfetch";

import { getDeepValue } from "utils/json";
import { getLocale, getUserToken } from "utils/storage";

export interface IOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  params?: any;
}

interface IData {
  data: any;
  status: number;
}

export const requestAPI = async ({ method, url, params }: IOptions) => {
  try {
    let isFormData = params instanceof FormData;
    let responseStatus: number = 0;
    let path = url;
    let headers = Object.assign(
      {
        "Accept-Language": getLocale(),
        "X-AUTH-TOKEN": getUserToken() || ""
      },
      !isFormData ? { "Content-Type": "application/json" } : {}
    );

    (method || "").match(/(GET|DELETE)/) &&
      (path = `${path}${format({ query: params })}`);

    const result = await fetch(path, {
      method: method,
      headers: headers,
      body:
        (method || "").match(/(POST|PATCH)/) && params
          ? isFormData
            ? params
            : JSON.stringify(params)
          : null,
      mode: "cors"
    })
      .then(response => {
        responseStatus = response.status;

        return response.json();
      })
      .then(data => {
        if (responseStatus >= 200 && responseStatus < 300) {
          return {
            data,
            status: responseStatus
          };
        } else {
          throw getDeepValue(data, `errors.0.message`) ||
            getDeepValue(data, `message`);
        }
      })
      .catch(error => {
        throw error;
      });

    return result;
  } catch (error) {
    throw error;
  }
};
