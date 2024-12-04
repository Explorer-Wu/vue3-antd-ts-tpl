<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-controls/lib/controls.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl-style-switcher/styles.css";
import * as turf from "@turf/turf";
import { LanguageControl, RulerControl } from "mapbox-gl-controls";
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";

function initMap() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibGt4MTIzIiwiYSI6ImNsZ2J4NGM5ejF1emczbnFyNzF1dWt1NXUifQ.-sJsEMb8N8m19dac72C6JA";
  let map = new mapboxgl.Map({
    container: "map",
    style: "./static/map/tiandituVec.json",
    center: [120, 36],
    zoom: 6,
    language: "zh",
    projection: "equirectangular",
  });
  // 全屏控件
  map.addControl(new mapboxgl.FullscreenControl());
  // 缩放控件
  map.addControl(new mapboxgl.NavigationControl());
  // 比例尺控件
  map.addControl(
    new mapboxgl.ScaleControl(
      {
        maxWidth: 100,
        unit: "metric",
      },
      "bottom-left"
    )
  );
  // 语言控件
  map.addControl(
    new LanguageControl({
      language: "zh",
    })
  );
  // 测距控件，不好设置样式
  // map.addControl(
  //     new RulerControl({
  //         units: "miles",
  //         labelFormat: (n) => `${n.toFixed(2)} ml`
  //     }),
  //     "top-right"
  // );
  // 底图切换控件
  let mapStyleSwitchControl = mapStyleSwitch();
  map.addControl(mapStyleSwitchControl, "top-right");
  // 绘制控件
  map.addControl(draw, "top-right");
  return map;
}
</script>

<template>
  <div class="map-container">
    <div id="map">
      <!-- 放在右上角，使用mapbox本身右上角按钮的样式 -->
      <div class="mapboxgl-ctrl-top-right">
        <div class="mapboxgl-ctrl mapboxgl-custom-ctrl-group">
          <button
            class="custom-layer-switch-control"
            title="图层"
            @click="layerSwitch()"
          >
            <i class="iconfont icon-tuceng-" />
          </button>
          <button
            class="custom-draw-line-control"
            title="测距"
            @click="changeDrawMode('draw_line_string')"
          >
            <i class="iconfont icon-ceju" />
          </button>
          <button
            class="custom-draw-polygon-control"
            title="测面"
            @click="changeDrawMode('draw_polygon')"
          >
            <i class="iconfont icon-cemian" />
          </button>
          <button
            class="custom-draw-trash-control"
            title="删除"
            @click="changeDrawMode('')"
          >
            <i class="iconfont icon-shanchu" />
          </button>
          <button
            class="custom-location-control"
            title="定位"
            @click="location()"
          >
            <i class="iconfont icon-Location" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mapboxgl-ctrl-top-right {
  /* position: relative; */
  top: 7%;
  right: 1.5%;
  .mapboxgl-custom-ctrl-group {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  .mapboxgl-style-switcher {
    position: absolute;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    right: 45px;
    /* //为了不让这个按钮妨碍到其他按钮，把位置调了，如果不调的话应该可以不用设置样式 */
    top: -145px;
    background-image: url();
    background-position: center;
    background-repeat: no-repeat;
    background-size: 70%;
  }

  /* // 打开图层切换后，弹出的图层菜单 */
  .mapboxgl-style-list {
    display: none;
    width: 130px;
    top: -145px;
    position: absolute;
    right: 45px;
    background-color: #fff;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  .mapboxgl-custom-ctrl-group:not(:empty) {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  .mapboxgl-custom-ctrl-group {
    top: 140px;
    position: relative;
    background: #fff;
    border-radius: 4px;
    button {
      background-color: transparent;
      border: 0;
      box-sizing: border-box;
      cursor: pointer;
      display: block;
      height: 29px;
      outline: none;
      overflow: hidden;
      padding: 0;
      width: 29px;
    }
    button:first-child {
      border-radius: 4px 4px 0 0;
    }
    button + button {
      border-top: 1px solid #ddd;
    }
    button:last-child {
      border-radius: 0 0 4px 4px;
    }
  }
}

.mapboxgl-ctrl-bottom-left {
  left: 2%;
  .mapboxgl-ctrl-logo {
    display: none;
  }
  .mapboxgl-ctrl-scale {
    height: 10px;
    /* // background-color: transparent; */
    line-height: 10%;
    text-align: center;
  }
}

.mapboxgl-ctrl-bottom-right {
  display: none;
}
</style>
