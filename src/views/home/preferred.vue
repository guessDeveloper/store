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
  .line{
    margin-bottom:20px;
  }
}
</style>