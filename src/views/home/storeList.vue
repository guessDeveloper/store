<template>
 <div class="store-box">
   <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">商城返利</span>
    </div>
    <div class="food-select-box">
            <div class="food-select-item store">
                <ul>
                    <li class="active"><a href="">全部</a></li>
                    <li><a href="">饺子混沌(65)</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>

                </ul>
            </div>
        </div>
        <div class="content-list">
          <div class="list-title">食品材料（54）</div>
           <ul>
             <li>
               <Card></Card>
             </li>
              <li>
               <Card></Card>
             </li>
              <li>
               <Card></Card>
             </li>
              <li>
               <Card></Card>
             </li>
              <li>
               <Card></Card>
             </li>
              <li>
               <Card></Card>
             </li>
              <li>
               <Card></Card>
             </li>
           </ul>
        </div>
 </div>
</template>
<script>
import Card from "@/components/common/storeListCard"
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
.store{
  ul{
    li{
      width:11.11%;
      border-bottom:1px solid @class_border;
    }
  }
}
.content-list{
  width:@max-width;
  background:#fff;
  margin:20px auto 100px;
  .list-title{
    text-align: center;
    font-size:28px;
    font-weight: bold;
    line-height: 128px;
  }
  ul{
    .clear();
    border-top:1px solid @class_border;
    li{
      float: left;
      box-sizing: border-box;
      width:20%;
      border-bottom:1px solid @class_border;
      border-right:1px solid @class_border;
    }
  }
}
</style>