<template>
  <div class="order-detail">
    <div class="persion-title">
      订单详情
    </div>
    <div class="order-detail-content">
       <div class="img-box">
         <img :src="detail.img" alt="">
       </div>
       <div class="item">
          <label for="">订单号：</label>{{detail.orderNumber}}
       </div>
       <div class="item">
         <label for="">消费时间：</label>{{detail.createrTime}}
       </div>
        <div class="item item-name-wrap">
         <label for="">产品名称：</label><span class="item-name-value">{{detail.GoosName}}</span>
       </div>
        <div class="item">
         <label for="">消费金额：</label>{{detail.orderMoney}}
       </div>
          <div class="item">
         <label for="">订单类型：</label>{{detail.orderType}}
       </div>
          <div class="item">
         <label for="">奖励积分：</label>{{detail.BonusPoints}}
       </div>
          <div class="item">
         <label for="">积分到账时间：</label>{{detail.IntegralToUserTime}}
       </div>
         <div class="item">
         <label for="">状态：</label>{{detail.state}}
       </div>
    </div>
    <div class="btn-box">
        <button class="btn" @click="back">返回我的订单</button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      id:'',
      detail:''
    }
  },
  mounted(){
    this.$route.query.id?this.id = this.$route.query.id:''
    this.getDetail()
  },
  methods:{
    back(){
      this.$router.push('/myOrder')
    },
    getDetail(){
      this.$http.limitPost(this.$api.UserOnlineOrderModel,{
        OrderNo:this.id
      }).then(res=>{
        if(res.data.Code == 1){
          this.detail = res.data.Data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.order-detail{
  min-height: @persion_height;
  background:#fff;
}
.order-detail-content{
  position: relative;
  padding:22px 30px 60px;

  .item{
    font-size:12px;
    line-height:38px;
    label{
      display: inline-block;
      width:92px;
      text-align: right;
      margin-right: 12px;
    }
  }
  .img-box{
    position: absolute;
    top:40px;
    right:40px;
    width:200px;
    height:200px;
    img{
      display: block;
      width:100%;
    }
  }
  @media screen and(max-width:@change_width){
    padding-bottom: 10px;
    .img-box {
      position: static;
      margin: 0 auto 10px;
    }
    .item {
      color: #333333;
      line-height: 20px;
      padding-bottom: 18px;
      label {
        color: #666666;
      }
      &.item-name-wrap {
        display: flex;
        .item-name-value {
          flex: 1;
        }
      }
    }
  }
}
.btn-box{
  margin:0 30px;
  text-align: center;
  border-top:1px solid @class_border;
  @media screen and(max-width:@change_width){
    padding-bottom: 119px;
  }
}
.btn{
  width:220px;
  height:50px;
  margin-top:50px;
  background:@main;
  border:0;
  color:#fff;
  font-size:16px;
}
</style>
