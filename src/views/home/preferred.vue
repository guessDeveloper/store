<template>
  <div class="preferred-box">
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">优选推荐</span>
      </div>
      <div class="recomend-title">
          <h2>优选推荐</h2>
          <p>优选推荐，精心整理的推荐好物</p>
      </div>
      <div class="content-box">
        <div class="line">
          <Card ></Card>
        </div>
        <div class="line">
          <Card ></Card>
        </div>
        <div class="line">
          <Card ></Card>
        </div>
      </div>
  </div>
</template>
<script>
import Card from '@/components/recommend/preferredCard'
export default {
  data(){
    return{

    }
  },
  components:{
    Card:Card
  }
}
</script>
<style lang="less" scoped>
.recomend-title{
    width:@max-width;
    height:125px;
    margin:0 auto;
    background:#fff;
    overflow: hidden;
    text-align: center;
    h2{
        margin-top:35px;
        font-size:28px;
        color:@main;
        line-height: 28px;
        font-weight: normal;
    }
    p{
        font-size:14px;
        color:@subtitle_color;
        line-height: 12px;
        margin-top:15px;
    }
}
.content-box{
  margin:20px auto 100px;
  text-align: center;
  .line{
    margin-bottom:20px;
  }
}
@media screen and(max-width:@change_width){
  .recomend-title {
    width: 100%;
    height: auto;
    padding-bottom: 20px;
    border-top: 10px solid #F8F8F8;
    border-bottom: 1px solid #F8F8F8;
    h2 {
      margin-top: 20px;
      font-size: 20px;
    }
    p {
      margin-top: 10px;
    }
  }
  .content-box {
    margin-top: 10px;
    .line {
      margin-bottom: 10px;
      .card-box {
        width: 100%;
        .title {
          margin-left: 15px;
          padding: 15px 0 15px 25px;
        }
      }
    }
  }
}
</style>
