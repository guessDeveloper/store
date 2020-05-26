<template>
    <div>
        <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">人气推荐</span>
      </div>
      <div class="recomend-title">
          <h2>人气推荐</h2>
          <p>人气好物推荐，它们最受欢迎</p>
      </div>
      <div class="content-box">
          <div class="line">
            <recomendCard ></recomendCard>
          </div>
         <div class="line">
            <recomendCard ></recomendCard>
          </div>
          <div class="line">
            <recomendCard ></recomendCard>
          </div>
      </div> 
    </div>
</template>
<script>
import recomendCard from '@/components/recommend/poplurCard'
export default {
    data(){
        return{

        }
    },
    components:{
        recomendCard:recomendCard
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
</style>