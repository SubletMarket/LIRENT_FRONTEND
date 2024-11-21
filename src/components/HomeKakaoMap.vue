<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { subleaseAxios } from "@/util/http-commons";
import { useMemberStore } from "@/stores/member";
import { useRoute } from "vue-router";

// 피니아
const memberStore = useMemberStore();
// 통신
const subleaseHttp = subleaseAxios();
// 라우트
const route = useRoute();

// 변수들
const mapInstance = ref();
const mapCenter = reactive({});
const subleases = reactive({});

// 경로가 /detail/{subleasaeId} 일 경우, 해당 subleaseId값
const subleaseId = route.params.subleaseId;
const sublease = reactive({});

onMounted(async () => {
  // 카카오 지도 생성
  mapInstance.value = new KakaoMap();

  await mapInstance.value.loadKakaoMapAPI();
  // 현재 전대차 매물 불러와서 지도에 표시
  await initSubleases();

  // detail의 subleaseID값이 있으면 위치 가져오기
  if (subleaseId) {
    getSublease(subleaseId);
  } else {
    console.log("get my location");
    getCurrentCoord();
  }
});

async function initSubleases() {
  const { data } = await subleaseHttp.get("");
  subleases.value = data;
}

function getCurrentCoord() {
  console.log("HomeKakaoMap getCurrentCoord()");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coord = pos.coords;
      mapCenter.value = {
        latitude: coord.latitude,
        longitude: coord.longitude,
      };
    });
  }
}

function getSublease(id) {
  subleaseHttp.get(`/${id}`).then(({ data }) => {
    sublease.value = data;
    mapCenter.value = {
      latitude: data.latitude,
      longitude: data.longitude,
    };
  });
}

// sublease 목록이 변하면 지도에 오버레이 업데이트
watch(subleases, (newVal, oldVal) => {
  console.log(newVal.value);

  for (const sublease of newVal.value) {
    const adjustedPrice = sublease.price / 10000;
    const content = `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              height: 40px;
              background-color: white;
              color: black;
              font-size: 14px;
              font-weight: bold;
              border: 2px solid black;
              border-radius: 10px;
              padding: 5px;
              text-align: center;
              box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);">
              ${adjustedPrice}만원 / 하루
            </div>`;

    mapInstance.value.setOverlay(
      {
        latitude: sublease.latitude,
        longitude: sublease.longitude,
      },
      content
    );
  }

  watch(mapCenter, (newVal, oldVal) => {
    mapInstance.value.setCenter(newVal.value);
  });
});

function setMapCenter(data) {
  console.log("setMapCenter");

  mapCenter.value.latitude = data.latitude;
  mapCenter.value.longitude = data.longitude;
}

class KakaoMap {
  map;
  customOverlaies = [];

  constructor() {
    this.loadKakaoMapAPI().then(() => {
      this.initMap();
    });
  }

  loadKakaoMapAPI() {
    return new Promise((resolve, reject) => {
      if (window.kakao && window.kakao.maps) {
        resolve(); // 이미 로드된 경우
      } else {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(resolve); // 로드 후 resolve 호출
        script.onerror = reject; // 로드 실패 시 reject 호출
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=53145e5b6696588dc70ac4fcb0dda36a";
        document.head.appendChild(script);
      }
    });
  }

  initMap() {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(36.358843, 127.344192),
      level: 3,
    };

    this.map = new kakao.maps.Map(container, options);
  }

  setOverlay(coords, content) {
    console.log("KakaoMap.setOverlay executed");
    const kakaoCoords = new kakao.maps.LatLng(
      coords.latitude,
      coords.longitude
    );

    const newOverlay = new kakao.maps.CustomOverlay({
      position: kakaoCoords,
      content: content,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });

    newOverlay.setMap(this.map);
    this.customOverlaies.push(newOverlay);
  }

  deleteOverlay() {
    for (const overlay of this.customOverlaies) {
      overlay.setMap(null);
    }
    this.customOverlaies = {};
  }

  setCenter(coords) {
    console.log("KakaoMap.setCenter executed");
    const kakaoCoords = new kakao.maps.LatLng(
      coords.latitude,
      coords.longitude
    );
    this.map.setCenter(kakaoCoords);
  }
}
</script>

<template>
  <div id="map">
    <RouterView :sublease="sublease.value" />
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: calc(100vh - 56px);
  aspect-ratio: 1;
}
</style>
