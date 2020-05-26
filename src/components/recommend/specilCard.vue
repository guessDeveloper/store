<template>
  <div class="card-box">
    <img src="../../assets/img/rec_2.png" alt="" class="left">
    <div class="des-box">
       <h4 class="title">女式坑条冰纱短袖针织衫</h4>
       <div class="item">
         <div class="line">积分约：<span class="yellow">50</span></div>
         <div class="line">特惠价：<span class="red">¥345</span></div>
         <div class="line"> 原价：<span class="gay">¥343</span></div>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  }
}
</script>
<style lang="less" scoped>
.card-box{
  width:555px;
  height:200px;
  box-sizing: border-box;
  border:1px solid @class_border;
  background:#fff;
  .left{
    float: left;
    width:198px;
    height:198px;
  }
  .des-box{
    margin-left:30px;
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