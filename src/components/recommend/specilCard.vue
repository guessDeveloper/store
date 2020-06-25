<template>
  <a class="card-box" :href="data.ClickUrl" target="_blanck">
    <img :src="data.picurl" alt="" class="left">
    <div class="des-box">
       <h4 class="title">{{data.titleA}}</h4>
       <div class="item">
         <div class="line">{{data.tieleB}}</div>
         <div class="line">特惠价：<span class="red">¥{{data.teamprice}}</span></div>
         <div class="line"> 原价：<span class="gay">¥{{data.price}}</span></div>
       </div>
    </div>
  </a>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  props:{
    data:{
      type:Object
    }
  }
}
</script>
<style lang="less" scoped>
.card-box{
  display: block;
  width:555px;
  height:200px;
  color:@font_color;
  box-sizing: border-box;
  border:1px solid @class_border;
  background:#fff;
  .left{
    float: left;
    width:198px;
    height:198px;
  }
  .des-box{
    margin-left:230px;
    margin-top:40px;
    .title{
      font-size:18px;
      line-height:18px;
      margin-bottom:14px;
    }
    .item{
    display:inline-block;
    vertical-align: middle;
      .line{
        font-size:14px;
        color:@subtitle_color;
        line-height: 28px;
        .yellow{
          color:@main;
        }
        .red{
          color:@percent_color;
        }
        .gay{
          font-weight: bold;
          text-decoration:line-through;
        }
      }
    }
  }
  
}
</style>