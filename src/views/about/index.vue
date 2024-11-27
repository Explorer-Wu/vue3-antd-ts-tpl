<template>
  <div id="baiduMap"></div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import BaiduMapProvider from './BaiduMapProvider';
  //import RoadSketchService from "@/services/RoadSketchService";
  // import bdmap from "@/script/bdmap.js";

  export default {
    name: "BaiduMap",
    props:{
      mapServer: {
        type: String,
        required: false,
      }, // 地图服务地址
      ak: {
        type: String,
        required: false,
      }, // 地图服务访问授权码
      heatMapType: {
        type: Number,
        required: false
      },
      roadColors: {
        type: Array,
        required: false
      },
      zoomCenter: {
        //[纬度，经度]
        type: Array,
        required: false
      }
    },
    data(){
      return {
        heatPoints:[],
        map: '',
        heatMapOverlays: [],
      }
    },
    methods: {
      loadMap() {
        let that=this
        // bdmap.then(()=>{
          //var point = new BMap.Point(120.734023,27.935295);  // 创建点坐标
          //console.log('that.zoomCenter',that.zoomCenter)
          that.initMap('')
        // })
      },
      initMap(val){
        this.map = BaiduMapProvider.initMap('baiduMap', {
          center: this.zoomCenter,
          zoom: 14,
        });
        // this.map = new BMap.Map("baiduMap");
        // var point = new BMap.Point(this.zoomCenter[0],this.zoomCenter[1]);  // 创建点坐标
        // this.map.centerAndZoom(point, 11);                 // 初始化地图，设置中心点坐标和地图级别
        // //添加地图类型控件
        // this.map.addControl(new BMap.NavigationControl());
        // this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        // this.map.setMaxZoom(14);
        // this.map.setMinZoom(10);
        Vue.prototype.$map = this.map;
      },
      addMarker(){
        // 创建小车图标
        var pt = new BMap.Point(120.734023,27.935295);
        var myIcon = new BMap.Icon("/images/camera_icon.png", new BMap.Size(52, 26));
        var marker = new BMap.Marker(pt, {
          icon: myIcon
        });  // 创建标注
        this.map.addOverlay(marker); // 将标注添加到地图中
      },
    },
    mounted() {
      this.loadMap();
    }
  }
</script>
<style lang="less">
  #baiduMap{
    position: fixed !important;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    // min-width: 1920px;
    // min-height: 1080px;
    width: 100%;
    height: 100%;
    background-color: #08304A !important;
  }
</style>