/* eslint-disable no-continue */
declare const BMap: any;

interface IconProps {
  icon: string;
  iconSize?: number[];
}
interface IconMarker extends IconProps {
  point: number[];
  click?: Function;
}

interface LabelProps {
  point: number[];
  text: string;
  offset?: number[];
}

export default class BDMapProvider {
  private instance: any = null;
  // private elementId: string;

  // constructor() {
  // this.elementId = elementId;
  // }

  initMap(el: string, options?: any) {
    const { center, zoom = 11, maxZoom = 18, minZoom = 10 } = options || {};
    const map = new BMap.Map(el); // 创建Map实例
    map.enableScrollWheelZoom(true);

    const point = new BMap.Point(center[0], center[1]); // 创建点坐标
    map.centerAndZoom(point, zoom); // 初始化地图，设置中心点坐标和地图级别
    // 添加地图类型控件
    // map.addControl(new BMap.NavigationControl());
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    map.setMaxZoom(maxZoom);
    map.setMinZoom(minZoom);

    this.instance = map;

    this.changeMapStyle('midnight');
  }

  getMapView() {
    return this.instance;
  }

  setMapView(mapView: any) {
    this.instance = mapView;
  }

  addEventListener(event: string, callback: Function) {
    if (!callback) {
      return;
    }
    this.instance.addEventListener(event, (type: any, e: any, opt: any) => {
      callback(type, e, opt);
    });
  }

  getZoom() {
    return this.instance.getZoom();
  }

  getBounds(mapType: string) {
    const bounds = this.instance.getBounds();
    let offsetX = 0;
    let offsetY = 0;

    if (!mapType || mapType === 'GCJ02') {
      offsetX = 0.006588137;
      offsetY = 0.005672648;
    }
    if (mapType === 'WGS84') {
      offsetX = 0.0109772;
      offsetY = 0.0028134;
    }
    return {
      min: { lng: bounds.Me - offsetX, lat: bounds.Yd - offsetY },
      max: { lng: bounds.He - offsetX, lat: bounds.Wd - offsetY },
    };
  }

  panTo(lng: number, lat: number) {
    this.instance.panTo(new BMap.Point(lng, lat));
  }

  addOverlay(overlay: any) {
    this.instance.addOverlay(overlay);
  }

  addOverlays(overlays: any[]) {
    overlays.forEach((e: any) => this.addOverlay(e));
  }

  removeOverlays(overlays: any[]) {
    overlays.filter((e: any) => !!e).forEach((e: any) => this.instance.removeOverlay(e));
  }

  clearOverlays() {
    this.instance.clearOverlays();
  }

  static createLabel(opts: LabelProps) {
    const { point, text = '', offset = [-16, -32] } = opts || {};
    const pt = new BMap.Point(point[0], point[1]);
    const labelOpts = {
      position: pt, // 指定文本标注所在的地理位置
      offset: new BMap.Size(offset[0], offset[1]), // 设置文本偏移量
    };
    // 创建文本标注对象
    const label = new BMap.Label(text, labelOpts);
    // 自定义文本标注样式
    label.setStyle({
      color: '#EEE',
      borderRadius: '3px',
      // borderColor: '#141419',
      border: '1px solid #3b3b4e',
      background: '#141419',
      // padding: '2px 3px',
      fontSize: '12px',
      // height: '22px',
      // lineHeight: '22px',
      fontFamily: '微软雅黑',
    });

    return label;
  }

  static createIcon(opts: IconProps) {
    const { icon, iconSize = [32, 28] } = opts || {};
    return new BMap.Icon(icon, new BMap.Size(iconSize[0], iconSize[1]));
  }

  static createMarker(opts: IconMarker) {
    const { point, icon, iconSize = [32, 28], click } = opts || {};
    let bIcon = null;
    if (icon) {
      bIcon = BDMapProvider.createIcon({ icon, iconSize }); // new BMap.Icon(icon, new BMap.Size(iconSize[0], iconSize[1]));
    }
    const pt = new BMap.Point(point[0], point[1]);
    const marker = new BMap.Marker(pt, {
      icon: bIcon,
    });
    marker.addEventListener('click', () => {
      if (click) {
        click(marker, opts);
      }
    });
    return marker;
  }

  static createLine(opts: any) {
    const { points, strokeColor, strokeWeight = 2 } = opts || {};
    const coords = points.map((e: number[]) => new BMap.Point(e[0], e[1]));
    const polyline = new BMap.Polyline(coords, {
      strokeColor,
      strokeWeight,
      strokeOpacity: 0.5,
    });
    return polyline;
  }

  changeMapStyle(style: string) {
    const mapStyle = {
      features: [{
        featureType: 'building',
        elementType: 'geometry.topfill',
        stylers: {
          color: '#2a3341ff',
          visibility: 'off',
        },
      }, {
        featureType: 'building',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#1a212eff',
          visibility: 'off',
        },
      },
      ], // ['road', 'building', 'water', 'land', 'districtlabel', 'businesstowerlabel'], // 隐藏地图上的'poi',
      style,
    };
    this.instance.setMapStyle(mapStyle);
  }
}
