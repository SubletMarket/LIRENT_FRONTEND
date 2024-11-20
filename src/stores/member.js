import { reactive } from "vue";
import { defineStore } from "pinia";
import { memberAxios } from "@/util/http-commons";
import { useRouter } from "vue-router";

const router = useRouter();

export const useMemberStore = defineStore("member", () => {
  const memberHttp = memberAxios();

  const member = reactive({
    id: "",
    name: "",
    email: "",
  });

  function login(email, password) {
    memberHttp
      .post("/token", {
        email,
        password,
      })
      .then((res) => {
        getUserData();
      })
      .catch((err) => {});
  }

  function getUserData() {
    memberHttp
      .get("")
      .then((res) => {
        member.id = res.data.userId;
        member.name = res.data.name;
        member.email = res.data.email;
      })
      .catch((err) => {});
  }

  function logout() {
    memberHttp
      .delete("/logout")
      .then((res) => {
        member.id = "";
        member.name = "";
        member.email = "";
        alert("로그아웃되었습니다. 감사합니다.");
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function register(id, pw, name, email) {
    memberHttp.post("", {
      id,
      name,
      pw,
      email,
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

  return {
    member,
    login,
    logout,
    register,
    getUserData,
    updateUser,
    deleteUser,
    resetPassword,
  };
});
