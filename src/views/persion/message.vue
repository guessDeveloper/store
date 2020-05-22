<template>
  <div class="message-box">
    <div class="persion-title">
      消息通知
    </div>
    <div class="message-list">
      <div class="item">
         <div class="message-title">
             您的奖励积分已经到账
             <span class="time">2020-12-26 21:10:30</span>
         </div>
         <div class="message-content">
           尊敬的用户，您的订单20151515已完成奖励，获得积分
         </div>
      </div>
      <div class="page-box">
        <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000">
          </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  }
}
</script>
<style lang="less" scoped>
.message-box{
  min-height:660px;
}
.message-list{
  padding:0 30px;
  text-align: center;
  .item{
    text-align: left;
    padding-top:20px;
    padding-bottom:20px;
    .message-title{
      font-size:14px;
      line-height: 14px;
      .time{
        float:right;
        font-size:12px;
        color:@subtitle_color;
      }
    }
    .message-content{
      font-size:12px;
      color:@subtitle_color;
      line-height: 12px;
      margin-top:15px;
    }
    border-bottom:1px solid @class_border;
  }
}
.page-box{
  padding:60px 0;
}
</style>