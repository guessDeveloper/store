<template>
  <div class="item" >
     <img :src="data.GoodsImg" alt="" @click="goDetail">
     <h4>{{data.GoodsName}}</h4>
     <p>积分约：</p>
     <div class="price">¥{{data.GoodsMoneny}}</div>
     <button class="add" @click="addCar">加入购物车</button>
  </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
export default {
  data(){
    return{

    }
  },
  computed:{
     ...mapState([
       'positionX',
       'isLogin'
     ])
  },
  props:{
    data:{
      type:Object
    }
  },
  methods:{
   ...mapMutations([
      'addNum',
      'setLogin',
   ]),
   goDetail(){
      this.$router.push(`/earthDetail?ProductId=${this.data.GoodsId}`)
   },
   //添加购物车
   addCar(){
     this.addNum()
   }
  }
}
</script>
<style lang="less" scoped>
.item{
  width:100%;
  text-align: center;
  padding-bottom:50px;
  img{
    display:block;
    width:265px;
    height:265px;
    margin:0 auto 20px;
  }
  h4{
    font-size:14px;
    line-height: 14px;
  }
  p{
    font-size:12px;
    color:@subtitle_color;
    line-height: 12px;
    margin-top:12px;
  }
  .price{
    font-size:16px;
    font-weight: bold;
    color:@percent_color;
    line-height: 12px;
    margin-top:12px;
  }
  .add{
    width:100px;
    height:26px;
    margin-top:15px;
    font-size:12px;
    color:@main;
    border:1px solid @main;
    border-radius:26px;

  }
  @media screen and(max-width:@change_width){
    padding-bottom:15px;
    img{
      width:100%;
      height:auto;
    }
  }
}
</style>