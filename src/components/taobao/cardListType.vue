<template>
  <div class="card-list-box">
     <div class="title">
        <h4>{{data.titleA}}</h4>
        <p>{{data.titleB}}</p>
        <div class="more" @click="more">查看更多<span class="iconfont iconjiantou"></span></div>
     </div>
     <ul class="card-list">
       <li v-for="(item) in data.proList" :key="item.ID"><Card :data="item"></Card></li>
     </ul>
  </div>
</template>
<script>
import Card from './goodCard'
export default {
   data(){
     return{

     }
   },
   props:{
     data:{
       type:Object
     }
   },
   components:{
     Card:Card
   },
   methods:{
     more(){
       if(this.data.proList[0].type == '2'){
         this.$router.push(`/taobaoList?classId=${this.data.catid}&className=${this.data.titleA}`)
       }else{
        this.$router.push(`/pddList?classId=${this.data.catid}&className=${this.data.titleA}`)
       }
       
     }
   }
}

</script>
<style lang="less" scoped>
.card-list-box{
  width:@max-width;
  margin:0 auto 20px;
  background:#fff;
  text-align: center;
  .title{
    position: relative;
    h4{
      font-size:28px;
      line-height:28px;
      padding:40px 0 15px 0;
    }
    p{
      font-size: 12px;
      line-height: 12px;
      color:@subtitle_color;
    }
    .more{
      position: absolute;
      top:40px;
      right:30px;
      font-size:12px;
      color:@font_color;
      cursor: pointer;
      .iconfont{
        font-size: 10px;
      }
    }
  }
}
.card-list{
  display: block;
  padding:17px;
  .clear();
  li{
    float: left;
    width:265px;
    margin:13px;
  }
}
 @media screen and(max-width:@change_width){
   .card-list-box{
     width:100%;
     margin:0 auto 10/@p;
     .title{
       text-align: left;
       padding-left:15px;
       h4{
         font-size:20/@p;
         line-height: 20/@p;
         padding:20/@p 0 10/@p 0;
       }
       p{
         font-size:;
       }
       .more{
         top:24/@p;
         right:15/@p;
       }
     }
   }
   .card-list{
     display: flex;
     flex-wrap: wrap;
     justify-content:space-between;
     padding:15/@p;
     &::after{
       display: none;
     }
     li{
       width:calc(50% - 7px);
       height:auto;
       margin:0;
       
     }
   }
 }
</style>