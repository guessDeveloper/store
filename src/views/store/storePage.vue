<template>
  <div class="store-page">
    <div class="persion-title">
       基本信息
    </div>
    <div class="content">
       <div class="input-line">
          <label for="">邀请链接：</label><div class="input-box"><input type="text" value="https://miaosha.youledui.com/#5398175" readonly></div>
       </div>
       <div class="input-line">
         <label for="">商家名称：</label><div class="input-box"><input type="text" placeholder="请输入商家名称"></div>
       </div>
       <div class="input-line">
         <label for="">请输入商家名称:</label><div class="input-box"><input type="text" placeholder="请输入商家描述"></div>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.store-page{
  min-height: @persion_height;
  background:#fff;
}
</style>