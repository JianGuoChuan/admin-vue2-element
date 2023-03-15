<template>
  <div>
    <el-form-item
      :class="'is-required ' + (address_error == '' ? '' : 'is-error')"
      :error="address_error"
    >
      <el-select
        style="width: 100%"
        v-model="form1.addressName"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词搜索"
        :filter-method="searchAddress"
        :loading="wasSearching"
        @change="handleSelect"
      >
        <el-option
          v-for="(item, index) in searchList"
          :key="'index3-' + index"
          :label="item.name"
          :value="item.id"
          class="city-select-dropdown__item"
        >
          <div class="f-l mw-300">
            <span>{{ item.name }}</span>
          </div>
        </el-option>
      </el-select>
    </el-form-item>
    <div
      id="map2-container"
      class="map2-container"
      style="width: 90%; height: 300px; margin-bottom: 20px;margin-top:20px;"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wasSearching: false,
      searchList: [],
      restTime: 0,
      classList: [],
      address_error: "",
      map: null,
      mk: null,
      form1: {
        addPoint: "",
        addressName: "",
        cityCode: ''
      },
    };
  },
  props:{
    visible:{
      type: Boolean,
      default: false
    },
    formData:{
      type: Object,
      default(){
        return {}
      }
    },
  },
  watch:{
    visible:{
      handler: function(val) {
        if(val){
          this.$nextTick(function(){
            if(this.formData.addressName){
              if(this.map){
                this.initMap(true)
                let add = this.formData.jwd.split(",")
                var point = new AMap.LngLat(Number(add[0]), Number(add[1]));
                this.form1.addressName = this.formData.addressName
                this.mk.setPosition(point) //重新设置标注的地理坐标
                this.map.setCenter(point)  //将地图的中心点更改为给定的点
                this.map.setZoom(11)
              }else{
                this.initMap(true)
                let add = this.formData.jwd.split(",")
                var point = new AMap.LngLat(add[0], add[1]);
                this.form1.addressName = this.formData.addressName
                this.mk.setPosition(point) //重新设置标注的地理坐标
                this.map.setCenter(point)  //将地图的中心点更改为给定的点
                this.map.setZoom(11)
              }


            }else{
              this.initMap()
            }
          })

        }
      },
      immediate: true
    }
  },
  methods: {
    initMap(edit = false) {
      let that = this;
      var map = new AMap.Map("map2-container", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始化地图层级
        center: [116.397428, 39.90923], //初始化地图中心点
      });
      var marker = new AMap.Marker();
      marker.setMap(map);
      marker.on("dragend", function (e) {
        that.getAddrByPoint(e.lnglat); //拖拽结束后调用逆地址解析函数，e.point为拖拽后的地理坐标
      });
      map.on("click", function (e) {
        //给地图绑定点击事件
        that.getAddrByPoint(e.lnglat); //点击后调用逆地址解析函数
      });
      that.mk = marker;
      that.map = map;
      if (!edit) {
        that.geolocation();
      }
    },
    /**
     * 逆地址解析函数（根据坐标点获取详细地址）
     * @param {Object} point   百度地图坐标点，必传
     */
    getAddrByPoint(point) {
      var that = this;
      that.map.plugin("AMap.Geocoder", function () {
        var geocoder = new AMap.Geocoder({
          radius: 2000,
          extensions: "base",
        });
        geocoder.getAddress(point, function (status, result) {
          if (status === "complete" && result.regeocode) {
            that.mk.setPosition(point); //重新设置标注的地理坐标
            that.map.setCenter(point); //将地图的中心点更改为给定的点
            that.form1.addressName = result.regeocode.formattedAddress; //记录该点的详细地址信息
            that.form1.addPoint = point.lng + "," + point.lat; //记录当前坐标点
            that.form1.cityCode = result.regeocode.addressComponent.adcode
            that.$emit('change',that.form1)
          } else {
            that.$message.error("根据经纬度查询地址失败");
          }
        });
        geocoder.on("error", function (e) {
          console.log(e);
        });
      });
    },
    /**
     * 浏览器定位函数
     */
    geolocation() {
      var that = this;
      that.map.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        that.map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", function (e) {
          that.mk.setPosition(e.position); //重新设置标注的地理坐标
          that.map.setCenter(e.position); //将地图的中心点更改为给定的点
          that.form1.addressName = e.formattedAddress; //记录该点的详细地址信息
          that.form1.addPoint = e.position.lng + "," + e.position.lat; //记录当前坐标点
          that.form1.cityCode = e.addressComponent.adcode
          that.$emit('change',that.form1)
        }); //返回定位信息
        AMap.event.addListener(geolocation, "error", function (e) {
          console.log(e);
          that.$message({
            type: "error",
            message: "定位失败",
          });
        }); //返回定位出错信息
      });
    },
    searchAddress(str, cb) {
      let that = this;
      AMap.plugin(["AMap.PlaceSearch", "AMap.Autocomplete"], function () {
        var autoComplete = new AMap.Autocomplete({
          city: "",
        });
        autoComplete.search(str, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (status == "complete") {
            that.searchList = result.tips;
            // if(result.poiList.count>0){

            // }else{
            //   that.searchList = []
            // }
          } else if (status == "no_data") {
            that.searchList = [];
          }
        });
      });
    },
    handleSelect(e) {
      let that = this;
      this.searchList.map((item) => {
        if (item.id == e) {
          if (!item.location) {
            this.$emit('change',{
              addPoint: "",
              addressName: ""
            })
            this.$message.warning("此地点暂无经纬度，请选择附近的地点！！！");
            return;
          }
          this.form1.addPoint = item.location.lng + "," + item.location.lat;
          this.form1.addressName = item.name;
          that.form1.cityCode = item.adcode
          this.mk.setPosition(item.location); //重新设置标注的地理坐标
          this.map.setCenter(item.location); //将地图的中心点更改为给定的点
          this.$emit('change',that.form1)
        }
      });
    },
  },
};
</script>