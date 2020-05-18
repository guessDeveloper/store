<template>
  <div class="menager-box">
     <div class="tab-box">
            <div class="tab-item" @click="toTab(1)" :class="{active:tab ==1}">积分充值</div>
             <div class="tab-item" @click="toTab(2)" :class="{active:tab ==2}">积分奖励</div>
         <div class="tip-box"><span class="iconfont iconcjwt"></span>积分使用常见问题</div>
      </div>
     <div class="tab-content">
        <div class="btn-box">
           <button class="chong-btn">立即充值</button>
        </div>
     </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tab:1
    }
  }
}
</script>
<style lang="less" scoped>
.tab-box{
   padding:0 30px;
   height:60px;
   border-bottom:1px solid @class_border;
   .tab-item{
       float: left;
       font-size:20px;
       line-height:60px;
       margin-right:60px;
       cursor: pointer;
       &.active{
           color:@main;
           font-weight: bold;
           position: relative;
           &::after{
               position: absolute;
               left:0;
               bottom:0;
               content:'';
               display: block;
               width:100%;
               height:3px;
               background:@main;
           }
       }
   }
   .tip-box{
     float:right;
     margin-top:23px;
     color:@subtitle_color;
     font-size:12px;
     line-height:14px;
     .iconfont{
       font-size:14px;
       color:@subtitle_color;
       margin-right:8px;
     }
   }
}
.tab-content{
  padding:0 30px;
  .btn-box{
    padding:30px 0;
    text-align: right;
  }
  .chong-btn{
    width:136px;
    height:40px;
    font-size:14px;
    color:@main;
    border:1px solid @main;
    background:#fff;
  }
}
</style>