<template>
    <!-- 原有地图 -->
  <OfflineBdMap :map-param="mapInfo" :point-data="pointData" ref="OnlineMap" />
</template>

<script>
import OfflineBdMap from './OfflineBdMap.vue';

export default {
  name: 'RoadMap',
  components: {
    OfflineBdMap,
  },
  props: {
    pointData: Object,
  },
  data() {
    return {
      mapInfo: {
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
      },
    };
  },
};
</script>
