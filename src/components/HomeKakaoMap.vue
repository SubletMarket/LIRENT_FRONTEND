<script setup>
import { homeDealAxios } from "@/util/http-commons";
import { computed, onMounted, ref, watch } from "vue";

const dealHttp = homeDealAxios();

const props = defineProps({
  selectedApt: Object,
});
const mapInstance = ref();

onMounted(() => {
  mapInstance.value = new KakaoMap();
});

// Overlay 변경
watch(props.selectedApt, (oldVal, newVal) => {
  dealHttp
    .get("", {
      params: {
        aptSeq: newVal.value.aptSeq,
      },
    })
    .then(({ data }) => {
      console.log(data);
      console.log(props);
      let content =
        `
                  <div id="home-overlay" class="overlay-container card"  style="max-height: 500px; overflow-y: auto;">
                    <div class="card-header text-center">
                      <h4>` +
        props.selectedApt.value.aptName +
        ` 거래 내역</h4>
                    </div>
                    <div class="card-body">
                      <table class="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">거래가</th>
                            <th scope="col">거래일자</th>
                            <th scope="col">층</th>
                            <th scope="col">면적</th>
                          </tr>
                        </thead>
                      <tbody>`;

      for (const deal of data) {
        content += `
                  <tr>
                    <td>${deal.dealAmount}만원</td>
                    <td>${deal.dealYear}.${deal.dealMonth}.${deal.dealDay}</td>
                    <td>${deal.floor}</td>
                    <td>${deal.areaSize}</td>
                  </tr>`;
      }
      content += `
                  </tbody>
                </table>
              </div>
            </div>`;

      mapInstance.value.deleteOverlay();

      mapInstance.value.setOverlay(
        { latitude: newVal.value.latitude, longitude: newVal.value.longitude },
        content
      );

      mapInstance.value.setCenter({
        latitude: newVal.value.latitude,
        longitude: newVal.value.longitude,
      });
    });
});

class KakaoMap {
  map;
  customOverlay;
  constructor() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      // script가 로드된 후 실행될 함수 정의
      script.onload = () => kakao.maps.load(this.initMap.bind(this));
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=53145e5b6696588dc70ac4fcb0dda36a";
      document.head.appendChild(script);
    }
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
    const kakaoCoords = new kakao.maps.LatLng(coords.latitude, coords.longitude);

    this.customOverlay = new kakao.maps.CustomOverlay({
      position: kakaoCoords,
      content: content,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });

    console.log("map set");
    this.customOverlay.setMap(this.map);
  }

  deleteOverlay() {
    if (this.customOverlay) {
      this.customOverlay.setMap(null);
    }
  }

  setCenter(coords) {
    const kakaoCoords = new kakao.maps.LatLng(coords.latitude, coords.longitude);
    this.map.setCenter(kakaoCoords);
  }
}
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#searchWindow {
  width: 30%;
  margin: 2% 0;
}

#map-data-field {
  width: 100%;

  margin: 1% 0 0 3%;
}

#map-data-table {
  width: 100%;

  margin: 1% 0 0 3%;
}

#map {
  width: 100%;
  aspect-ratio: 1;
}

#search-engine {
  margin-top: 3%;
}

.overlay-container {
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-height: 800px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 세로 스크롤 추가 */
}

.overlay-container h5 {
  margin: 0;
  font-size: 0.75rem;
}

.overlay-container table {
  margin-bottom: 0; /* 테이블 하단에 불필요한 여백 제거 */
}

.overlay-container .card-header,
.overlay-container .card-body {
  padding: 10px;
}
</style>
