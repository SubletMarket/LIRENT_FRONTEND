import axios from "axios";

const { VITE_MEMBER_API_URL, VITE_NOTICE_API_URL } = import.meta.env;

function createAxiosInstance(baseUrl) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return instance;
}

function memberAxios() {
  return createAxiosInstance(VITE_MEMBER_API_URL);
}

function noticeAxios() {
  return createAxiosInstance(VITE_NOTICE_API_URL);
}

export { memberAxios, noticeAxios };
