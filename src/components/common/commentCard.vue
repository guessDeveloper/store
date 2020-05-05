<template>
  <div class="comment-box">
      <div class="user">
         <div class="head-img">
             <img src="../../assets/img/fuzhuang.png" alt="">
         </div>
         <div class="name">Anna Ivanenko</div>
         <div class="time">2020-05-01</div>
      </div>
      <div class="content">非常好的品牌，一直都在使用。没有什么品牌能比的上这家。非常好…</div>
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
@import '../../assets/less/common.less';
.comment-box{
  width:100%;
  height:142px;
  overflow: hidden;
  text-align: left;
  border-bottom:1px solid @class_border;
  .user{
    position: relative;
    margin-top:40px;
    line-height: 30px;
    .head-img{
      position: absolute;
      left:0;
      top:0;
      width:30px;
      height:30px;
      border-radius: 50%;
      overflow: hidden;
      img{
        display: block;
        width:100%;
        height:100%;
      }
    }
    .name{
      text-align: left;
      font-size:14px;
      padding-left:42px;
      padding-right:90px;
      .overTextOne();
    }
    .time{
      position:absolute;
      right:0;
      top:9px;
      line-height: 12px;
      font-size:14px;
      color:@subtitle_color;
    }
  }
  .content{
    font-size:14px;
    line-height: 14px;
    margin-top:18px;
    color:@subtitle_color;
  }
}
</style>