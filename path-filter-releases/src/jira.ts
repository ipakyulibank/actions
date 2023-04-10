import axios, { AxiosInstance } from "axios";
import * as core from "@actions/core";


export default function createInstance(
  baseUrl: string,
  username: string,
  password: string
): AxiosInstance {
  baseUrl = baseUrl.startsWith("https://") ? baseUrl : `https://${baseUrl}`;
  baseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  baseUrl = baseUrl.endsWith("rest/api/2")
    ? baseUrl.substring(0, -10)
    : baseUrl;
  const instance = axios.create({
    baseURL: `${baseUrl}rest/api/2/`,
    auth: { username, password },
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
    },
    transformRequest: [(data) => JSON.stringify(data)],
    validateStatus: (s) => {
      return s >= 200 && s < 300;
    },
  });
  instance.interceptors.request.use(function (config) {
    core.debug(`Sending request to Jira ${config.method} ${config.baseURL} ${config.url}`);
    return config;
  }, function (error) {
    // Do something with request error
    core.debug(`Error sending request: ${String(error)}`);
    return Promise.reject(error);
  })

  instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    core.debug(`We have response: ${response.status} ${JSON.stringify(response.data)}`);
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    core.debug(`Error getting response: ${String(error)}`);
    return Promise.reject(error);
  });

  return instance;
}

