import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { memberAxios } from "@/util/http-commons";

export const useMemberStore = defineStore(
  "member",
  () => {
    const memberHttp = memberAxios();

    // 상태 관리 객체
    const member = reactive({
      id: "",
      nickname: "",
      email: "",
    });

    const accessToken = ref();

    function login(email, password) {
      return memberHttp
        .post("/token", { email, password }, { withCredentials: true })
        .then((res) => {
          accessToken.value = res.data.accessToken; // 토큰 저장
          getUserData(); // 유저 정보 가져오기
          return accessToken.value; // 토큰 반환
        })
        .catch((err) => {
          console.error("로그인 실패:", err.response || err);
          throw err; // 예외 전달
        });
    }
    function logout() {
      accessToken.value = null; // 토큰 삭제
      member.value = null;

      // Member 객체 초기화
      member.id = "";
      member.email = "";
      member.nickname = "";
      member.phone = "";
      member.address = "";
      member.park = false;
      member.buildingElevatorNum = 0;
      member.floor = 0;
      member.area = 0;
      member.rooms = 0;
      member.bathrooms = 0;
      member.latitude = "";
      member.longitude = "";

      console.log("로그아웃 완료. 상태 초기화:", member);
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
          const data = res.data;

          // 서버에서 받은 모든 데이터를 상태에 저장
          member.id = data.memberId;
          member.email = data.email;
          member.nickname = data.nickname;
          member.phone = data.phone;
          member.address = data.address;
          member.park = data.park;
          member.buildingElevatorNum = data.buildingElevatorNum;
          member.floor = data.floor;
          member.area = data.area;
          member.rooms = data.rooms;
          member.bathrooms = data.bathrooms;
          member.latitude = data.latitude;
          member.longitude = data.longitude;

          // 로그용
          console.log("현재 사용자 상태:", member);
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
      return memberHttp.post("", {
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
      });
    }

    function updateUser({
      email,
      password,
      nickname,
      phone,
      address,
      park,
      buildingElevatorNum,
      floor,
      area,
      rooms,
      bathrooms,
      latitude,
      longitude,
    }) {
      return memberHttp
        .put("", {
          email,
          password, // 기본적으로 store.member.password 전달
          nickname,
          phone,
          address,
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
          console.log("회원 정보 업데이트 성공:", res.data);
        })
        .catch((err) => {
          console.error("회원 정보 업데이트 실패:", err.response?.data || err);
          throw err;
        });
    }

    function deleteUser() {
      memberHttp
        .delete("/api/member", {
          headers: {
            Authorization: `Bearer ${accessToken.value}`, // JWT 토큰 추가
          },
        })
        .then(() => {
          console.log("회원 삭제 성공");
          accessToken.value = null;
          member.value = {};
        })
        .catch((err) => {
          console.error("회원 삭제 실패:", err.response || err);
          alert("회원 삭제에 실패했습니다.");
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
  },
  { persist: true }
);
