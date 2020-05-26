<template>
  <div class="card-list-box">
     <div class="title">
        <h4>毛衫</h4>
        <p>温暖柔软，品质之选</p>
     </div>
     <ul class="card-list">
       <li><Card></Card></li>
       <li><Card></Card></li>
       <li><Card></Card></li>
       <li><Card></Card></li>
       <li><Card></Card></li>
       <li><Card></Card></li>
       <li><Card></Card></li>
       <li><Card></Card></li>
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
   components:{
     Card:Card
   }
}

</script>
<style lang="less" scoped>
.card-list-box{
  width:@max-width;
  margin:0 auto;
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
</style>