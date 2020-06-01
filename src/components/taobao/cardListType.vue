<template>
  <div class="card-list-box">
     <div class="title">
        <h4>{{data.titleA}}</h4>
        <p>{{data.titleB}}</p>
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
       h4{
         font-size:20/@p;
         line-height: 20/@p;
         padding:20/@p 0 10/@p 0;
       }
       p{
         font-size:;
       }
     }
   }
   .card-list{
     display: flex;
     flex-wrap: wrap;
     justify-content:space-between;
     padding:15/@p;
     li{
       width:calc(50% - 7px);
       height:auto;
       margin:0;
       
     }
   }
 }
</style>