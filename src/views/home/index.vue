<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue'

import { defineComponent } from 'vue';
import BDMapProvider from './BDMapProvider';
// import bdmap from '@/script/bdmap.js'
// import BMap from 'BaiduMap'
// import BaiduMap from 'BaiduMap'

const camera_icon = require('@/assets/images/camera_icon.png');
const warn_icon = require('@public/assets/icons/against_law.svg');
// eslint-disable-next-line import/no-unresolved
const alarm_car_icon = require('@public/assets/icons/alarm_car.svg');
// eslint-disable-next-line import/no-unresolved
const tollgate_icon = require('@public/assets/icons/tollgate.svg');

declare const BMap: any;

// 创建位置点
    var point = new BMapGL.Point(116.404, 39.915);
    // 创建带高度的点
    var marker3d = new BMapGL.Marker3D(point, 8000, {
        size: 50,
        shape: BMAP_SHAPE_CIRCLE,
        fillColor: '#454399',
        fillOpacity: 0.6
    });
    // 将点添加到地图上
    map.addOverlay(marker3d);

export default defineComponent({
  name: 'OnlineBdMap',
  props: {
    mapStyle: {
      type: Array,
    },
    // roadColors: {
    //   type: Array,
    //   required: true
    // },
    mapParam: {
      // [纬度，经度]
      type: Object,
      required: true,
    },
    pointData: {
      type: Object,
    },
    onLoaded: Function,
    // rRegion: {
    //   type: String,
    //   required: true
    // }
    // polyline: null
  },
  data() {
    return {
      refmap: null as any,
      cameraIcon: new BMap.Icon(camera_icon, new BMap.Size(28, 28), {
        // 指定定位位置。
        // 当标注显示在地图上时，其所指向的地理位置距离图标左上角各偏移10像素和25像素。您可以看到在本例中该位置即是图标中央下端的尖角位置。
        anchor: new BMap.Size(5, 25),
        // // 设置图片偏移。需要指定大图的偏移位置，此做法与css sprites技术类似。
        // imageOffset: new BMap.Size(0, 0 - 25)   // 设置图片偏移
      }),
      tollgateIcon: new BMap.Icon(tollgate_icon, new BMap.Size(28, 28), { anchor: new BMap.Size(15, 15) }),
      alarmCarIcon: new BMap.Icon(alarm_car_icon, new BMap.Size(28, 28), { anchor: new BMap.Size(13, 10) }),
      warnIcon: new BMap.Icon(warn_icon, new BMap.Size(28, 28), { anchor: new BMap.Size(13, 10) }),
      zNum: 1000,
    };
  },
  // computed: {
  //   refmap() {
  //     return new BMap.Map('allmap');
  //   },
  // },
  watch: {
    pointData: {
      handler(val) {
        // debugger
        if (!this.refmap) {
          return;
        }
        (this as any).refmap.clearOverlays(); // .removeOverlay(this.polyline);
        this.donePointData(val);
        this.addMarker(val, this.alarmCarIcon);
      },
      deep: true,
    },
  },
  mounted() {
    const { zoomCenter: { lng, lat }, zoom = 9 } = this.mapParam || {};
    const bdMapProvider = new BDMapProvider();
    bdMapProvider.initMap('allmap', {
      center: [lng, lat],
      zoom,
    });
    this.refmap = bdMapProvider.getMapView();

    if (this.onLoaded) {
      this.onLoaded(bdMapProvider);
    }

    if (this.pointData) {
      this.initMap();
    }
  },
  methods: {
    initMap() {
      // const that = this;
      this.refmap = new BMap.Map('allmap');
      // const { region } = this.$route.params;
      console.log('map-pointData:', this.pointData);
      const { zoomCenter: { lng, lat } } = this.mapParam || {};
      const point = new BMap.Point(lng, lat);
      this.refmap.centerAndZoom(point, this.mapParam.defaultZoom || 14);
      // let zoomCtrl = new BMap.ZoomControl();
      // this.refmap.addControl(zoomCtrl);
      // this.refmap.addControl(new BMap.NavigationControl());
      this.refmap.enableScrollWheelZoom(true);
      this.refmap.setMaxZoom(this.mapParam.maxZoom || 16);
      this.refmap.setMinZoom(this.mapParam.minZoom || 5);
      // this.refmap.setMapStyleV2({styleJson: this.mapStyle});
      // if (this.pointData.type === "camera") {
      this.addMarker(this.pointData, this.alarmCarIcon);
      // }
      this.donePointData(this.pointData);
    },
    donePointData(data, bol?) {
      if (!data) {
        return;
      }
      const area = bol || false;
      // data.forEach((item) => {
      //   this.addPolyLine(item, area);
      // });
      this.addPolyLine(data, area);
    },
    /**
       * 道路绘制
       */
    addPolyLine(pts, area) {
      if (!pts.data) {
        return;
      }
      const typePoints = pts.data.map((pt) => new BMap.Point(...pt.lnglats));
      console.log('typePoints:', typePoints);
      const polyline = new BMap.Polyline(typePoints, pts.polyLineOptions);
      if (area) { polyline.disableMassClear(); }
      this.refmap.addOverlay(polyline);
    },

    addMarker(latlonData, typeIcon) {
      if (!latlonData.data) {
        return;
      }
      // 创建标注对象并添加到地图
      (latlonData.data || []).forEach((item, index) => {
        let marker;
        const pt = new BMap.Point(...item.lnglats);
        if (index === latlonData.data.length - 1) {
          marker = new BMap.Marker(pt, {
            icon: this.warnIcon,
          });
        } else {
          marker = new BMap.Marker(pt, {
            icon: typeIcon,
          });
        }
        marker.setZIndex(index);
        // marker.disableMassClear();
        const content = `${item.tollgate}<br/>${item.passtime}`;
        const label = new BMap.Label(content, { // 创建文本标注
          position: pt, // 设置标注的地理位置
          offset: new BMap.Size(13, -38), // 设置标注的偏移量
          // zIndex: index,
        });
        label.setZIndex(index);
        label.addEventListener('click', () => {
          this.zNum += index;
          label.setZIndex(this.zNum);
          // marker.setZIndex(this.zNum);
          this.zNum += 1;
          marker.setTop(true);
        });
        marker.addEventListener('click', () => {
          this.zNum += index;
          label.setZIndex(this.zNum);
          // marker.setZIndex(this.zNum);
          this.zNum += 1;
          marker.setTop(true);
          // label.setTop('true');
        });
        this.refmap.addOverlay(label); // 将标注添加到地图中
        this.refmap.addOverlay(marker); // 将标注添加到地图中
        label.setStyle({ // 设置label的样式
          color: '#fff',
          fontSize: '14px',
          backgroundColor: '#12395E',
          borderRadius: '6px',
          border: '1px solid #02AFFF',
        });
      });
    },
  },
});
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/images/svg/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <p>test</p>

    <div id="allmap" class="map"></div>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>


<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
  background-color: #08304A !important;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>