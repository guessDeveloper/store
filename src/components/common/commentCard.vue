<template>
  <div class="comment-box">
      <div class="user">
         <div class="head-img">
             <img :src="data.UserIcon" alt="">
         </div>
         <div class="name">
           <div class="name-des">{{data.UserNickname}}</div>
           <el-rate
            v-model="data.StarNum"
            disabled
            >
          </el-rate>
          </div>
         <div class="time">{{data.Time}}</div>
      </div>
      <div class="content" @click="getCommentDetail">{{data.UserComment}}</div>
      <el-dialog
      title="评价详情"
      :visible.sync="dialogVisible"
      width="520px"
      class="small"
      >
      <div class="user alert">
        <div class="head-img">
             <img :src="data.UserIcon" alt="">
         </div>
         <div class="name">
           <div class="name-des"> {{data.UserNickname}}</div>
           <el-rate
            v-model="data.StarNum"
            disabled
            >
          </el-rate>
          </div>
         <div class="time">{{data.Time}}</div>
        
      </div>
       <div class="detail-content">
            {{Detial.UserComment}}
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
        Detial:{},
    }
  },
  methods:{
    getCommentDetail(){
      this.$http.post(this.$api.GetPinoinfo,{
        CommentID:this.data.ID
      }).then(res=>{
        if(res.data.Code == 1){
          this.Detial = res.data.Data
          this.dialogVisible = true
        }
      })
    }
  },
  props:{
    data:{
      type:Object
    }
  },
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
   @media screen and(max-width:@change_width){
     height:auto;
     padding-bottom:25px;
     .user{
       margin-top:20px;
     }
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