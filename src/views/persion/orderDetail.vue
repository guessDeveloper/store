<template>
  <div class="order-detail">
    <div class="persion-title">
      订单详情
    </div>
    <div class="order-detail-content">
       <div class="item">
          <label for="">订单号：</label>20191212083520
       </div>
       <div class="item">
         <label for="">消费时间：</label>2020-01-01 1:12:12
       </div>
        <div class="item">
         <label for="">产品名称：</label>运动开衫式超柔软拉毛运动开衫女式超柔软拉毛运动开衫式超柔软拉毛运动
       </div>
        <div class="item">
         <label for="">消费金额：</label>200
       </div>
          <div class="item">
         <label for="">订单类型：</label>淘宝订单
       </div>
          <div class="item">
         <label for="">奖励积分：</label>200
       </div>
          <div class="item">
         <label for="">积分到账时间：</label>200
       </div>
         <div class="item">
         <label for="">状态：</label>200
       </div>
       <div class="img-box">
         <img src="../../assets/img/fuzhuang.png" alt="">
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

    }
  },
  methods:{
    back(){
      this.$router.push('/myOrder')
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
  padding:22px 30px 0;
  height:400px;
 
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
}
.btn-box{
  margin:0 30px;
  text-align: center;
  border-top:1px solid @class_border;
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