import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { memberAxios } from "@/util/http-commons";

export const useMemberStore = defineStore("member", () => {
  const memberHttp = memberAxios();

  // 상태 관리 객체
  const member = reactive({
    id: "",
    nickname: "",
    email: "",
  });

  const accessToken = ref(localStorage.getItem("accessToken") || "");

  function login(email, password) {
    return memberHttp
      .post("/token", {
        email,
        password,
      })
      .then((res) => {
        accessToken.value = res.data.accessToken; // 토큰 저장
        localStorage.setItem("accessToken", res.data.accessToken); // localStorage에 저장
        return accessToken.value; // 토큰 반환
      })
      .catch((err) => {
        console.error("로그인 실패:", err.response || err);
        throw err; // 예외 전달
      });
  }
  function logout() {
    accessToken.value = ""; // 토큰 삭제
    localStorage.removeItem("accessToken"); // 저장된 토큰 삭제
    member.id = "";
    member.nickname = "";
    member.email = "";
    console.log("로그아웃 성공");
  }
  function getUserData() {
    return memberHttp
      .get("/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      })
      .then((res) => {
        console.log("사용자 정보 가져오기 성공:", res.data);
        member.id = res.data.memberId;
        member.name = res.data.nickname;
        member.email = res.data.email;
      })
      .catch((err) => {
        console.error("사용자 정보 가져오기 실패:", err.response || err);
        throw err;
      });
  }
  function register({
    email,
    password,
    phone,
    address,
    nickname,
    park,
    buildingElevatorNum,
    floor,
    area,
    rooms,
    bathrooms,
    latitude,
    longitude,
  }) {
    memberHttp
      .post("", {
        email,
        password,
        phone,
        address,
        nickname,
        park,
        buildingElevatorNum,
        floor,
        area,
        rooms,
        bathrooms,
        latitude,
        longitude,
      })
      .then((res) => {
        console.log("Register 성공함:", res);
      })
      .catch((err) => {
        console.error("회원가입 실패:", err);
      });
  }

  function updateUser(pw, nickname, email) {
    memberHttp
      .put("", {
        nickname,
        email,
        password: pw,
      })
      .then((res) => {
        console.log("회원 정보 업데이트 성공");
      })
      .catch((err) => {
        console.error("회원 정보 업데이트 실패:", err);
      });
  }

  function deleteUser() {
    memberHttp
      .delete("")
      .then((res) => {
        // member 객체 초기화
        member.id = "";
        member.nickname = "";
        member.email = "";
      })
      .catch((err) => {
        console.error("회원 삭제 실패:", err);
      });
  }

  function resetPassword(nickname, email, userId, password) {
    memberHttp
      .put("/passwordReset", {
        nickname,
        email,
        userId,
        password,
      })
      .then((res) => {
        console.log("비밀번호 초기화 성공");
      })
      .catch((err) => {
        console.error("비밀번호 초기화 실패:", err);
      });
  }

  return {
    member,
    accessToken,
    login,
    logout,
    register,
    updateUser,
    deleteUser,
    resetPassword,
    getUserData,
  };
});
