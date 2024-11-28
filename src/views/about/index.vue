<template>
    <!-- 原有地图 -->
  <MainBdMap :map-param="mapInfo" :point-data="props.pointData" ref="mainMap" />
</template>

<script>
import MainBdMap from './mainBdMap.vue';

const props = defineProps({
  pointData: {
    type: Object,
  },
  // name: {
  //   type: String,
  //   required: true
  // },
});

const mapInfo = reactive({
  zoomCenter: { lng: 121.136704, lat: 28.85194 },
  // zoomCenter: {
  //   yuntest: {
  //     lng: 115.2881472,
  //     lat: 40.99225096,
  //   },
  // },
  defaultZoom: 14,
  maxZoom: 15,
  minZoom: 11,
});

defineOptions({
  name: 'RoadMap',
});

</script>
