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
           <label for="">返积分数量：</label><div class="input-box"><input type="text" placeholder="自动计算用户返积分数量"></div>
         </div>
         <div class="input-line">
           <label for=""></label><button class="btn">确定</button>
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

</style>