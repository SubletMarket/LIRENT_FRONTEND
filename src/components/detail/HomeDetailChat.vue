<script setup>
import { useMemberStore } from "@/stores/member";
import { chatsAxios } from "@/util/http-commons";
import {
  computed,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";

const chatsHttp = chatsAxios();
const store = useMemberStore();

const props = defineProps({
  sublease: Object,
});

// 채팅 데이터
const chats = ref([]);
const chatPollInstance = ref();

const myMessage = ref();
const currentMemberIsOwner = computed(() => {
  return props.sublease.memberId === store.member.id;
});

onUpdated(() => {
  //TODO: 채팅 필요할때 풀기..
  // clearInterval(chatPollInstance.value);
  // chatPollInstance.value = setInterval(
  //   getChats,
  //   100,
  //   props.sublease.subleaseId
  // );
});

// 채팅 데이터 가져오기
function getChats(subleaseId) {
  chatsHttp.get(`/${subleaseId}`).then(({ data }) => {
    chats.value = data;
  });
}

function sendMessage() {
  console.log();

  chatsHttp.post("", {
    subleaseId: props.sublease.subleaseId,
    memberId: store.member.id,
    message: myMessage.value,
    owner: currentMemberIsOwner.value,
  });
}
</script>

<template>
  <div class="container py-4">
    <div class="card fixed-card">
      <div class="card-header text-center bg-primary text-white">
        <h5 class="mb-0">채팅</h5>
      </div>
      <div class="card-body" style="max-height: 300px; overflow-y: auto">
        <!-- 받은 메시지 -->
        <template v-for="chat in chats">
          <template v-if="chat.owner">
            <div class="d-flex flex-column align-items-start mb-3">
              <div class="fw-bold">전차인</div>
              <div class="p-2 rounded text-bg-light border">
                {{ chat.message }}
              </div>
            </div>
          </template>

          <!-- 보낸 메시지 -->
          <template v-else>
            <div class="d-flex flex-column align-items-end mb-3">
              <div class="fw-bold">사용자</div>
              <div class="p-2 rounded text-bg-primary text-white">
                {{ chat.message }}
              </div>
            </div>
          </template>
        </template>
      </div>
      <form class="card-footer d-flex gap-2">
        <input
          type="text"
          class="form-control"
          placeholder="메시지 입력..."
          v-model="myMessage"
        />
        <button class="btn btn-primary" @click.prevent="sendMessage">
          보내기
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.fixed-card {
  position: fixed;
  top: 8%;
  right: 20px;
  max-width: 600px;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
