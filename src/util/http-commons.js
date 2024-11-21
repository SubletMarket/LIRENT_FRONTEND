import axios from "axios";

const { VITE_MEMBER_API_URL, VITE_NOTICE_API_URL, VITE_SUBLEASE_API_URL } =
  import.meta.env;

function createAxiosInstance(baseUrl, credientials) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: credientials,
  });

  return instance;
}

function memberAxios() {
  return createAxiosInstance(VITE_MEMBER_API_URL, true);
}

function noticeAxios() {
  return createAxiosInstance(VITE_NOTICE_API_URL, true);
}

function subleaseAxios() {
  return createAxiosInstance(VITE_SUBLEASE_API_URL, true);
}

// function homeAxios() {
//   return createAxiosInstance(VITE_HOME_API_URL, true);
// }

// function homeDealAxios() {
//   return createAxiosInstance(VITE_HOMEDEAL_API_URL, true);
// }

// function regcodeAxios() {
//   return createAxiosInstance(VITE_REGCODE_API_URL, false);
// }

export { memberAxios, noticeAxios, subleaseAxios };
