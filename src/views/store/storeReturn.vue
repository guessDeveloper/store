<template>
  <div class="menager-box">
      <div class="persion-title">
         扫码返积分
      </div>
      <div class="content">
         <div class="input-line">
           <label for="">用户手机号：</label><div class="input-box"><input type="text" placeholder="请输入用户手机号/或者扫描用户二维码"></div>
         </div>
         <div class="input-line">
           <label for="">消费金额: </label><div class="input-box"><input type="text" placeholder="请输入消费金额"></div>
         </div>
         <div class="input-line">
           <label for="">请选择返还比例：</label><div class="input-box"><input type="text" placeholder="默认调取商家的奖励比例"></div>
         </div>
         <div class="input-line">
           <label for="">返积分数量：</label><div class="input-box"><span class="tip">自动计算用户返积分数量</span> </div>
         </div>
         <div class="input-line">
           <button class="submit">确定</button>
         </div>
      </div>
  </div>
</template>
<script>
import '../../plugins/element-table.js'
export default {
  data(){
    return{
      
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  padding-top:30px;
}
.input-line{
  position: relative;
  width:380px;
  margin:0 auto 20px;
  label{
      position: absolute;
      top:0;
      right:380px;
      width:200px;
      font-size:14px;
      line-height: 50px;
      color:#464855;
      text-align: right;
      padding-right:15px;
  }
  .input-box{ 
    input{
      display: block;
      box-sizing: border-box;
      width:380px;
      height:50px;
      border:1px solid @class_border;
      padding:0 15px;
      font-size:14px;
      &.readonly{
          background:@readOnly;
      }
    }
    .tip{
       font-size:14px;
       color:@subtitle_color;
       line-height: 50px;
    }
   
  }
   .submit{
      width:100%;
      height:50px;
      color:#fff;
      font-size:16px;
      background:@main;
      border:0;
      margin:20px auto 100px;
    }
}
</style>