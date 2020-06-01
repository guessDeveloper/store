<template>
  <div class="comment-box">
      <div class="user">
         <div class="head-img">
             <img src="../../assets/img/fuzhuang.png" alt="">
         </div>
         <div class="name">
           <div class="name-des"> Anna Ivanenko</div>
           <el-rate
            v-model="value"
            disabled
            >
          </el-rate>
          </div>
         <div class="time">2020-05-01</div>
      </div>
      <div class="content" @click="dialogVisible = true">非常好的品牌，一直都在使用。没有什么品牌能fasdfadsfasdfasdfadsfasdfa比的上这家。非常fasdfasdfsf好…</div>
      <el-dialog
      title="评价详情"
      :visible.sync="dialogVisible"
      width="520px"
      >
      <div class="user alert">
        <div class="head-img">
             <img src="../../assets/img/fuzhuang.png" alt="">
         </div>
         <div class="name">
           <div class="name-des"> Anna Ivanenko</div>
           <el-rate
            v-model="value"
            disabled
            >
          </el-rate>
          </div>
         <div class="time">2020-05-01</div>
        
      </div>
       <div class="detail-content">
             非常好的品牌，一直都在使用。没有什么品牌能fasdfadsfasdfasdfadsfasdfa比的上这家。非常fasdfasdfsf好…
       </div>
        <div class="btn-box">
            <button class="ok" @click="dialogVisible=false">确认</button>
        </div>
     </el-dialog>


  </div>
</template>
<script>
import '../../plugins/element-rate'
export default {
  data(){
    return{
        dialogVisible:false,
        value:3
    }
  }
}
</script>
<style lang="less" scoped>
.comment-box{
  width:100%;
  height:142px;
  overflow: hidden;
  text-align: left;
  border-bottom:1px solid @class_border;
  .user{
    position: relative;
    margin-top:40px;
    line-height: 30px;
    &.alert{
      margin-top:20px;
    }
    .head-img{
      position: absolute;
      left:0;
      top:0;
      width:30px;
      height:30px;
      border-radius: 50%;
      overflow: hidden;
      img{
        display: block;
        width:100%;
        height:100%;
      }
    }
    .name{
      text-align: left;
      font-size:14px;
      padding-left:42px;
      padding-right:90px;
      .name-des{
          .overTextOne();
          line-height: 14px;
      }
    }
    .time{
      position:absolute;
      right:0;
      top:9px;
      line-height: 12px;
      font-size:14px;
      color:@subtitle_color;
    }
  }
  .content{
    font-size:14px;
    line-height: 14px;
    margin-top:18px;
    color:@subtitle_color;
    .overTextOne()
  }
  
}
.detail-content{
    margin-top:13px;
    font-size:14px;
    line-height: 28px;
    color:@font_color;
  }
  .btn-box{
      .clear();
      margin-top:40px;
      button{
        float: right;
        width:65px;
        height:30px;
        font-size:14px;
        margin-left:15px;
        background:#fff;
        border:1px solid @class_border;
        border-radius: 4px;
      }
      .ok{
        color:#fff;
        background:@main;
        border-color:@main;
      }
    }
</style>