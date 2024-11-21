import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { memberAxios } from "@/util/http-commons";

export const useMemberStore = defineStore("member", () => {
  const memberHttp = memberAxios();

  const member = reactive({
    id: "",
    name: "",
    email: "",
  });

  const accessToken = ref(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlblR5cGUiOiJBQ0NFU1MiLCJtZW1iZXJJZCI6MSwic3ViIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNzMyMTUyODY5LCJleHAiOjE5MTIxNTI4Njl9.HVTXS4N-hsq2K9b_7NwaiRy-RXZyXMvJYNfFbheNbs8"
  );

  function login(email, password) {
    memberHttp
      .post("/token", {
        email,
        password,
      })
      .then((res) => {
        accessToken.value = res.data.accessToken;
        console.log(accessToken);
      })
      .catch((err) => {});
  }

  // function logout() {
  //   memberHttp
  //     .delete("/logout")
  //     .then((res) => {
  //       member.id = "";
  //       member.name = "";
  //       member.email = "";
  //       alert("로그아웃되었습니다. 감사합니다.");
  //       router.push("/");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  function register({
    email,
    password,
    phone,
    address,
    nickname,
    bcode,
    bun,
    ji,
    dong,
    ho,
    floor,
    area,
    rooms,
    bathrooms,
  }) {
    memberHttp
      .post("", {
        email,
        password,
        phone,
        address,
        nickname,
        bcode,
        bun,
        ji,
        dong,
        ho,
        floor,
        area,
        rooms,
        bathrooms,
      })
      .then((res) => {
        console.log("Register 성공함 : " + res);
        console.log(res);
      });
  }

  function updateUser(pw, name, email) {
    memberHttp
      .put("", {
        name,
        email,
        password: pw,
      })
      .then((res) => {
        getUserData();
      })
      .catch((err) => {});
  }

  function deleteUser() {
    memberHttp
      .delete("")
      .then((res) => {
        member.id = "";
        member.name = "";
        member.email = "";
      })
      .catch((err) => {});
  }

  function resetPassword(name, email, userId, password) {
    memberHttp
      .put("/passwordReset", {
        name,
        email,
        userId,
        password,
      })
      .catch((err) => {});
  }

  function getUser() {
    memberHttp
      .get("", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
      });
  }

  return {
    accessToken,
    login,
    register,
    updateUser,
    deleteUser,
    resetPassword,
    getUser,
  };
});
