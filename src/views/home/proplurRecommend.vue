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
            <recomendCard :title='one'></recomendCard>
          </div>
         <div class="line">
            <recomendCard :title="two"></recomendCard>
          </div>
          <div class="line">
            <recomendCard :title="three"></recomendCard>
          </div>
      </div> 
    </div>
</template>
<script>
import recomendCard from '@/components/recommend/poplurCard'
export default {
    data(){
        return{
           one:{
               title:'人气推荐',
               titleIcon:'iconxsrx',
               titleColor:'#4A90E2'
           },
           two:{
               title:'人气周榜',
               titleColor:'#F38A1D',
               titleIcon:'iconrqzb'
           },
           three:{
               title:'热销总榜',
               titleColor:'#D51B32',
               titleIcon:'iconrxzb'
           }
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
    @media screen and(max-width:@change_width){
        width:100%;
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