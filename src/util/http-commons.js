import axios from "axios";

const {
  VITE_MEMBER_API_URL,
  VITE_NOTICE_API_URL,
  VITE_HOME_API_URL,
  VITE_REGCODE_API_URL,
  VITE_HOMEDEAL_API_URL,
} = import.meta.env;

function createAxiosInstance(baseUrl, credentials) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: credentials,
  });

  // 요청 인터셉터 추가
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken"); // 저장된 토큰 가져오기
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Authorization 헤더 추가
    }
    console.log("Axios 요청 설정:", config);
    return config;
  });

  return instance;
}

function memberAxios() {
  return createAxiosInstance(VITE_MEMBER_API_URL, true);
}

function noticeAxios() {
  return createAxiosInstance(VITE_NOTICE_API_URL, true);
}

function homeAxios() {
  return createAxiosInstance(VITE_HOME_API_URL, true);
}

function homeDealAxios() {
  return createAxiosInstance(VITE_HOMEDEAL_API_URL, true);
}

function regcodeAxios() {
  return createAxiosInstance(VITE_REGCODE_API_URL, false);
}

export { memberAxios, noticeAxios, homeAxios, regcodeAxios, homeDealAxios };
