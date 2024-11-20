<script setup>
import { noticeAxios } from "@/util/http-commons";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { Modal } from "bootstrap";
import { useMemberStore } from "@/stores/member";

const noticeHttp = noticeAxios();
const router = useRouter();
const store = useMemberStore();

const list = ref([]);
const currentQna = ref({});
const member = store.member;

const writeMode = ref(false);
const readonlyMode = computed(() => {
  return !isMyPost.value && !writeMode.value;
});

const isMyPost = computed(() => {
  return member.id == currentQna.value.memberId;
});

let qnaModal;

onMounted(() => {
  // 모달창
  loadQnaList();
  qnaModal = new Modal("#qnaDetailModal", {
    backdrop: true,
    focus: true,
    keyboard: true,
  });
});

function loadQnaList() {
  noticeHttp.get("").then(({ data }) => {
    list.value = data;
  });
}

function writeQna() {
  writeMode.value = true;
  currentQna.value = {};
  qnaModal.show();
}

function changeDetail(index) {
  writeMode.value = false;
  currentQna.value = { ...list.value[index] };
}

function deleteQna() {
  noticeHttp.delete(`/${currentQna.value.id}`).then((res) => {
    if (res.status === 200) {
      // 성공
      qnaModal.hide();
      currentQna.value = {};
      loadQnaList();
    } else if (res.status === 400) {
      // 실패
      window.alert("삭제에 실패했습니다.");
    }
  });
}

function createQna() {
  noticeHttp
    .post("", {
      title: currentQna.value.title,
      content: currentQna.value.content,
    })
    .then((res) => {
      if (res.status === 201) {
        qnaModal.hide();
        loadQnaList();
      }
    });
}

function updateQna() {
  noticeHttp.put(`/${currentQna.value.id}`, currentQna.value).then((res) => {
    if (res.status === 200) {
      loadQnaList();
    }
  });
}
</script>

<template>
  <div>
    <div class="container mt-4">
      <h2>Q&A 게시판</h2>
      <button class="btn btn-primary mb-3" @click="writeQna">글쓰기</button>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody @click="qnaModal.show()">
          <tr
            v-for="(qna, index) in list"
            :key="qna.id"
            @click="changeDetail(index)"
          >
            <th>{{ qna.title }}</th>
            <th>{{ qna.memberId }}</th>
            <th>{{ qna.createdDate + index }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 상세 페이지 모달 -->
    <div
      class="modal fade"
      id="qnaDetailModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <!-- modal HEADER -->
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">질문</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!--modal BODY -->
          <div class="modal-body">
            <div class="container mt-4">
              <div class="mb-3">
                <label for="title" class="form-label">제목</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  :readonly="readonlyMode"
                  v-model="currentQna.title"
                />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">내용</label>
                <textarea
                  class="form-control"
                  id="content"
                  rows="5"
                  :readonly="readonlyMode"
                  v-model="currentQna.content"
                ></textarea>
              </div>
              <template v-if="!writeMode">
                <div class="mb-3">
                  <label for="writer" class="form-label">작성자</label>
                  <input
                    type="text"
                    class="form-control"
                    id="writer"
                    :value="currentQna.memberId"
                    readonly
                  />
                </div>
                <div class="mb-3">
                  <label for="date" class="form-label">생성일자</label>
                  <input
                    type="text"
                    class="form-control"
                    id="date"
                    :value="currentQna.createdDate"
                    readonly
                  />
                </div>
              </template>
            </div>
          </div>
          <div class="modal-footer">
            <template v-if="isMyPost">
              <button type="button" class="btn btn-danger" @click="deleteQna">
                삭제
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="updateQna"
              >
                수정
              </button>
            </template>
            <button
              v-if="writeMode"
              type="button"
              class="btn btn-primary"
              @click="createQna"
            >
              작성
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
