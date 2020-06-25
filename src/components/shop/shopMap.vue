<template>
  <div>
     <div class="map" :id="randomId"></div>
  </div>
</template>

<script>
import BMap from 'BMap'
export default {
  data(){
    return{
      randomId: 'map',
      map:'',
      curPoint:''
    }
  },
  props:{
    defaultPoint: {
      type:Object
    }
  },
  mounted(){
    this.show()
  },
  methods:{
    show(){
      if (BMap === null || BMap === undefined) {
              return
      }
      this.$nextTick(() => {
        //初始化地图
        setTimeout(() => {
          //第一次点开地图弹框，进行地图的实例化
          if (!this.map) {
            this.map = new BMap.Map(this.randomId, {
              minZoom: 0,
              maxZoom: 22,
              enableHighResolution: true,
              enableMapClick: false
            })
            //BMAP_NAVIGATION_CONTROL_LARGE
            // var top_right_navigation = new BMap.NavigationControl({
            //   anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            //   type: BMAP_NAVIGATION_CONTROL_SMALL
            // })
            // this.map.addControl(top_right_navigation)
            // this.map.enableScrollWheelZoom()
            // this.map.clearOverlays()

            // this.geoc = new BMap.Geocoder()

            // this.map.addEventListener('click', e => {
            //   if (!this.unableSet) {
            //     this.map.clearOverlays()
            //     this.curPoint = new BMap.Point(e.point.lng, e.point.lat)
            //     let marker = new BMap.Marker(this.curPoint)
            //     this.map.addOverlay(marker)
            //     // this.searct_text = ''
            //   }
            // })

            if (
              this.defaultPoint &&
              this.defaultPoint.MertchntX &&
              this.defaultPoint.MertchntY
            ) {
              this.drawDefaultPoint()
            } else {
              var geolocation = new BMap.Geolocation();
              let _this  = this
                 geolocation.getCurrentPosition(function(r){
                  if(this.getStatus() == 0){
                       let center = new BMap.Point(r.point.lng,r.point.lat)
                        _this.map.centerAndZoom(center, 12)
                    }
                    else {
                      console.log('failed'+this.getStatus());
                    }        
                  },{enableHighAccuracy: true})
            }
          } else {
            
              if (
                this.defaultPoint &&
                this.defaultPoint.MertchntX &&
                this.defaultPoint.MertchntY
              ) {
                this.drawDefaultPoint()
              } else {
                 var geolocation = new BMap.Geolocation();
                 let _this  = this;
                 geolocation.getCurrentPosition(function(r){
                  if(this.getStatus() == 0){
                       let center = new BMap.Point(r.point.lng,r.point.lat)
                        _this.map.centerAndZoom(center, 12)
                    }
                    else {
                      console.log('failed'+this.getStatus());
                    }        
                  },{enableHighAccuracy: true})
              }
            
          }
        }, 500)
      })
    },
     drawDefaultPoint() {
      this.map.clearOverlays()
      this.curPoint = new BMap.Point(
        this.defaultPoint.MertchntX,
        this.defaultPoint.MertchntY
      )
      this.map.centerAndZoom(this.curPoint, 20)
      let marker = new BMap.Marker(this.curPoint)
      this.map.addOverlay(marker)
    },
  }
}
</script>

<style lang="less" scoped>
.map{
  width:100%;
  height:500px;
}
</style>