<template>
  <div class="banner-box">
     <el-carousel trigger="click" >
      <el-carousel-item v-for="item in 4" :key="item">
         <img src="../../assets/img/banner.png" alt="" draggable="false">
      </el-carousel-item>
    </el-carousel>
    
  </div>
</template>
<script>
export default {
   data(){
     return{}
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