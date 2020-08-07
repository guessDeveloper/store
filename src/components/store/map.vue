<template>
  <div class="map-box">

    <div
      class="search_w"
      v-show="!unableSearch"
    >
      <div class="inputW">
        <input
          v-model="searct_text"
          placeholder="请输入地址"
          size="medium"
          ref="searchInput"
        >
      </div>
      <button
        type="primary"
        @click.stop="search"
        size="medium"
        class="el-icon-search"
      >搜索</button>
    </div>
    <div class="confirm-content">
      <div
        class="baiduMap"
        :id="randomId"
      ></div>
    </div>
    <div class="operate">
      <!-- <div class="leftSide">经度：{{curPoint.lng ? curPoint.lng: '无'}}&nbsp;&nbsp;&nbsp;&nbsp;纬度：{{curPoint.lat ?curPoint.lat: '无'}}</div> -->
      <div class="rightSide">
        <button
          v-if="!unableSet"
          @click.stop="confirm"
          type="primary"
          class="ok"
        >确认</button>
        <button @click.stop="hide">{{unableSet === true ? '关闭' : '取消'}}</button>
      </div>
    </div>

    <span @click="show">
      <slot>

      </slot>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
import BMap from 'BMap'
export default {
  data() {
    return {
      showFlag: false,
      randomId: 'map',
      searct_text: '',
      resultObj: {}, //坐标逆解析结果对象
      curPoint: {}, //当前选中的坐标
      cityName: '',
      scrollTop: null,
      scrollLeft: null
    }
  },
  props: {
    defaultPoint: {
      type: Object,
      default: null
    },
    unableSearch: {
      type: Boolean,
      default: false
    },
    unableSet: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.randomId = this.randomString()
  },
  mounted() {
    this.show();
  },
  methods: {
    search() {
      if (!this.searct_text) {
        this.$message('请输入地址')
        return
      }
      let localSearch = new BMap.LocalSearch(this.map)
      localSearch.setSearchCompleteCallback(searchResult => {
        let poi = searchResult.getPoi(0)
        if (poi) {
          var point = poi.point
          this.map.clearOverlays()
          this.map.centerAndZoom(point, 16)
          this.curPoint = new BMap.Point(point.lng, point.lat)
          this.map.addOverlay(new BMap.Marker(point))
        } else {
          this.$alert('请输入详细的地址信息', '无法搜索到准确位置', {
            confirmButtonText: '知道了',

          })
        }
      })
      localSearch.search(this.searct_text)
    },
    show() {
      if (BMap === null || BMap === undefined) {
        return
      }
      // document.body.style.overflow = 'hidden'
      // this.scrollTop = document.documentElement.scrollTop
      // this.scrollLeft = document.documentElement.scrollLeft
      // window.scrollTo(0, 0)
      // this.showFlag = true
      // this.searct_text = ''
      // if (this.map && !this.resultObj.lng && !this.resultObj.lat) {
      //   this.map.clearOverlays()
      //   this.curPoint = {}
      // }
      this.$nextTick(() => {
        //初始化地图
        setTimeout(() => {
          //第一次点开地图弹框，进行地图的实例化
          this.$refs.searchInput.focus();
          if (!this.map) {
            this.map = new BMap.Map(this.randomId, {
              minZoom: 0,
              maxZoom: 22,
              enableHighResolution: true,
              enableMapClick: false
            })
            console.log(this.map)
            //BMAP_NAVIGATION_CONTROL_LARGE
            // var top_right_navigation = new BMap.NavigationControl({
            //   anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            //   type: BMAP_NAVIGATION_CONTROL_SMALL
            // })
            // this.map.addControl(top_right_navigation)
            // this.map.enableScrollWheelZoom()
            // this.map.clearOverlays()

            this.geoc = new BMap.Geocoder()

            this.map.addEventListener('click', e => {
              // e.stopPropagation(); 
              console.log('dssss')
              if (!this.unableSet) {
                this.map.clearOverlays()
                this.curPoint = new BMap.Point(e.point.lng, e.point.lat)
                let marker = new BMap.Marker(this.curPoint)
                this.map.addOverlay(marker)
                // this.searct_text = ''
              }
            },false)
            var obj = {};

            this.map.addEventListener('touchstart', function (e) {
              obj.e = e.changedTouches ? e.changedTouches[0] : e;
              obj.target = e.target;
              obj.time = Date.now();
              obj.X = obj.e.pageX;
              obj.Y = obj.e.pageY;
              console.log('start',e)
            }, false);
            let _this = this;
            this.map.addEventListener('touchend', function (e) {
              obj.e = e.changedTouches ? e.changedTouches[0] : e;
              if (
                obj.target === e.target &&

                // 大于 750 可看成长按了
                ((Date.now() - obj.time) < 750) &&

                // 应用勾股定理判断，如果 touchstart 的点到 touchend 的点小于 15，就可当成地图被点击了
                (Math.sqrt(Math.pow(obj.X - obj.e.pageX, 2) + Math.pow(obj.Y - obj.e.pageY, 2)) < 5)
              ) {
                // 地图被点击了，执行一些操作
                // if (!_this.unableSet) {
                //   _this.map.clearOverlays()
                 
                //   _this.curPoint = new BMap.Point(e.point.lng, e.point.lat)
                //    console.log(e)
                //   let marker = new BMap.Marker(_this.curPoint)
                //   _this.map.addOverlay(marker)
                //   // this.searct_text = ''
                //   console.log('设置完成')
                // }
                _this.$message.warning('建议此功能在电脑端操作')
              }
            },false);
            //  this.map.addEventListener('touchend', e => {
            //   // e.stopPropagation();
            //   // window.event.stopPropagation()
            //   console.log(e,'DIANJI')
            //   if (!this.unableSet) {
            //     this.map.clearOverlays()
            //     this.curPoint = new BMap.Point(e.point.lng, e.point.lat)
            //     let marker = new BMap.Marker(this.curPoint)
            //     this.map.addOverlay(marker)
            //     // this.searct_text = ''
            //     console.log('设置完成')
            //   }
            // },false)
            if (
              this.defaultPoint &&
              this.defaultPoint.lng &&
              this.defaultPoint.lat
            ) {
              this.drawDefaultPoint()
            } else {
              var geolocation = new BMap.Geolocation();
              let _this = this
              geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == 0) {
                  let center = new BMap.Point(r.point.lng, r.point.lat)
                  _this.map.centerAndZoom(center, 12)
                }
                else {
                  console.log('failed' + this.getStatus());
                }
              }, { enableHighAccuracy: true })
            }
          } else {
            //再次点开地图弹框，如果上次没有选择结果，则对地图进行重置
            if (!this.resultObj.lng || !this.resultObj.lat) {
              if (
                this.defaultPoint &&
                this.defaultPoint.lng &&
                this.defaultPoint.lat
              ) {
                this.drawDefaultPoint()
              } else {
                var geolocation = new BMap.Geolocation();
                let _this = this;
                geolocation.getCurrentPosition(function (r) {
                  if (this.getStatus() == 0) {
                    let center = new BMap.Point(r.point.lng, r.point.lat)
                    _this.map.centerAndZoom(center, 12)
                  }
                  else {
                    console.log('failed' + this.getStatus());
                  }
                }, { enableHighAccuracy: true })
              }
            }
          }
        }, 500)
      })
    },
    hide() {
      this.showFlag = false
      document.body.style.overflow = 'auto'
      this.map.clearOverlays();
      // this.map = null
      if (this.scrollTop !== null && this.scrollLeft !== null) {
        window.scrollTo(this.scrollLeft, this.scrollTop)
      }
      // if (!this.resultObj.lng && !this.resultObj.lat) {
      //   this.map.clearOverlays()
      //   if (
      //     this.defaultPoint &&
      //     this.defaultPoint.lng &&
      //     this.defaultPoint.lat
      //   ) {
      //     this.drawDefaultPoint()
      //   } else {

      //     var geolocation = new BMap.Geolocation();
      //     let _this  = this
      //         geolocation.getCurrentPosition(function(r){
      //         if(this.getStatus() == 0){
      //               let center = new BMap.Point(r.point.lng,r.point.lat)
      //               _this.map.centerAndZoom(center, 12)
      //           }
      //           else {
      //             console.log('failed'+this.getStatus());
      //           }        
      //         },{enableHighAccuracy: true})


      //   }
      // }
      this.$emit('close')
    },
    confirm() {
      if (!this.curPoint.lng && !this.curPoint.lat) {
        this.$message({
          message: '请在地图上标记位置点',
          type: 'info'
        })
        return
      }
      this.geoc.getLocation(this.curPoint, res => {
        this.showFlag = false
        // document.body.style.overflow = 'auto'
        // if (this.scrollTop !== null && this.scrollLeft !== null) {
        //   window.scrollTo(this.scrollLeft, this.scrollTop)
        // }
        if (res !== null) {
          this.resultObj = {
            address: res
          }
          console.log(res);
          this.$emit('getLocation', this.resultObj)
        } else {
          this.$message({
            message: '未能获取位置详细信息',
            type: 'warning'
          })
          if (this.searct_text) {
            this.resultObj = {
              address: this.searct_text,
              ...this.curPoint
            }
          } else {
            this.resultObj = this.curPoint
          }
          this.$emit('getLocation', this.resultObj)
        }
      })
    },
    drawDefaultPoint() {
      this.map.clearOverlays()
      this.curPoint = new BMap.Point(
        this.defaultPoint.lng,
        this.defaultPoint.lat
      )
      this.map.centerAndZoom(this.curPoint, 18)
      let marker = new BMap.Marker(this.curPoint)
      this.map.addOverlay(marker)
    },
    randomString() {
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = $chars.length
      var pwd = ''
      for (let i = 0; i < 32; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    clearResult() {
      this.resultObj = {}
    }
  }
}
</script>
<style lang="less" scoped>
.map-box {
  width: 100%;
  height: 440px;
  .confirm-content {
    width: 100%;
    height: 300px;
    .baiduMap {
      width: 100%;
      height: 100%;
    }
  }
}
.search_w {
  overflow: hidden;
  margin-bottom: 15px;
  input {
    float: left;
    width: 200px;
    height: 30px;
    padding-left: 15px;
    border: 1px solid @class_border;
  }
  .el-icon-search {
    width: 50px;
    height: 30px;
    margin-left: 15px;
    background: @main;
    color: #fff;
  }
}
.rightSide {
  .clear();
  margin-top: 40px;
  button {
    float: right;
    width: 65px;
    height: 30px;
    font-size: 14px;
    margin-left: 15px;
    background: #fff;
    border: 1px solid @class_border;
    border-radius: 4px;
  }
  .ok {
    color: #fff;
    background: @main;
    border-color: @main;
  }
}
</style>