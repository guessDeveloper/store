<template>
  <div class="banner-box">
     <el-carousel trigger="click" :height="bannerHeight">
      <el-carousel-item v-for="item in 4" :key="item">
         <img src="../../assets/img/banner.png" alt="" draggable="false" class="banner-img">
      </el-carousel-item>
    </el-carousel>
    
  </div>
</template>
<script>
export default {
   data(){
     return{
       bannerHeight:'340px'
     }
   },
   mounted(){
     const _this =this;
    const img = document.querySelector('.banner-img');
     img.onload = function(){
        _this.bannerHeight = `${img.height}px`
     }
     window.onresize = function(){
         _this.bannerHeight = `${img.height}px`
     }
   },
   destroyed(){
     window.onresize = null
   }
}
</script>
<style lang="less" scoped>
.banner-box{
  width: 100%;
  img{
    width:100%;
  }
}
</style>