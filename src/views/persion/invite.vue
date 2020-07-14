<template>
  <div class="invite-box" >
    <div class="persion-title">
      邀请有礼
    </div>
    <div class="invite" v-loading="loading">
      <div class="user-link">
         <span class="iconfont iconyqyl"></span><span class="name">我的邀请链接：</span>
         <!-- <span class="link" id="foo">{{url}}</span> -->
         <input type="text" readonly class="link" v-model="url">
         <button class="copy" :data-clipboard-text="url">复制</button>
      </div>
      <div class="invite-list-title">
        邀请记录
      </div>
      <div class="invite-list" >
        <div class="item" v-for="(item,index) in list" :key="index">
           <div class="user"><span class="header" :style="'background:url('+item.UserImg+') no-repeat center center;'">
             <!-- <img :src="item.UserImg" alt=""> -->
             </span>{{item.NickNamep}}</div><div class="phone">{{item.Tel}}</div><div class="time">{{item.CreateTime}}</div>
        </div>
        <div class="small-item" v-for="(item,index) in list" :key="index">
          <div class="user-box">
             <span class="header">
               <img :src="item.UserImg" alt="">
             </span>
             <span class="name-box">
               <div class="name">{{item.NickNamep}}</div>
               <div class="phone">{{item.Tel}}</div>
             </span>
          </div>
             <div class="time">{{item.CreateTime}}</div>

        </div>
          <div class="page-box">
        <el-pagination
                    @current-change="getList"
                    :current-page.sync="pageIndex"
                    :page-size="pageSize"
                    :hide-on-single-page="total == 0"
                    layout="prev, pager, next, jumper"
                    :total="total">
          </el-pagination>
      </div>
       <div class="page-box small">
        <el-pagination
                     small
                    @current-change="getList"
                    :current-page.sync="pageIndex"
                    :page-size="pageSize"
                    :hide-on-single-page="total == 0"
                    layout="prev, pager, next"
                    :total="total">
          </el-pagination>
      </div>
      </div>
      <div class="empty" v-show="total == 0">
          <span class="iconfont iconzwyqzwt"></span>
          <div class="name"> 暂无邀请记录</div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/plugins/clipboard.js'
import QRCode from 'qrcodejs2'
export default {
  data(){
    return{
       url:'',
       pageIndex:1,
       pageSize:20,
       list:[],
       Clipboard:'',
       total:0,
       loading:false
    }
  },
  mounted(){
    this.getUrl();
    const _this = this;
    this.Clipboard = new this.clipboard('.copy');
    this.Clipboard.on('success', function(e) {

      _this.$message.success('复制成功')
    e.clearSelection();
    });

    this.Clipboard.on('error', function() {
        _this.$message.error('复制失败')
    });
    this.getList();
  },
  beforeDestroy(){
    this.Clipboard.destroy();
  },
  methods:{
    getUrl(){
      this.$http.limitGet(this.$api.UserInviterUrl).then(res=>{
         if(res.data.Code == 1){
           this.url = res.data.Data.Url
         }
      })
    },
    //获取邀请链接
    getList(){
      this.loading = true
      this.$http.limitPost(this.$api.UserInviterList,{
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }).then(res=>{
        
        if(res.data.Code == 1){
          this.list = res.data.Data.list
          this.total = res.data.Data.count
        }
        setTimeout(()=>{
          this.loading = false
        },500)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.invite-box{
  width:100%;
  min-height:660px;
  @media screen and(max-width:@change_width){
    min-height: auto;
  }
}
.invite{
  padding:0px 30px;
  .user-link{
    height:106px;
    line-height: 106px;
    text-align: left;
    padding-left:29px;
    border-bottom:1px solid @class_border;
    .iconfont{
      float: left;
      font-size:42px;
      color:@class_border;
    }
    .name{
      margin-left:18px;
      font-size:12px;
      line-height: 106px;
      margin-right:4px;
    }
    .link{
      display: inline-block;
      width:430px;
      height:34px;
      padding:0 10px;
      overflow: hidden;
      line-height: 34px;
      font-size:12px;
      word-break: break-all;
      background:@class_border;
      border-radius: 4px;
      vertical-align:middle;
      border:0;
    }
    .copy{
      width:70px;
      height:34px;
      margin-left:30px;
      color:@main;
      font-size:12px;
      border:1px solid @main;
      border-radius: 34px;
    }
  }
  .invite-list-title{
    padding:40px 0 30px 0;
    font-size:16px;
    text-align: left;
    border-bottom:1px solid @class_border;
  }
  .invite-list{
    .item{
      height:70px;
      border-bottom:1px solid @class_border;
      div{
        float: left;
        width:33.33%;
        font-size:12px;
        line-height: 70px;
      }
      .user{
        font-size:12px;
        text-align: left;
        line-height: 70px;

        .header{
          text-align: left;
          display: inline-block;
          width:30px;
          height:30px;
          margin-right:8px;
          overflow: hidden;
          background:#ccc;
          border-radius: 30px;
          vertical-align: middle;
          background-size: cover!important;
        }

      }
      .phone{
        text-align: center;
      }
      .time{
        text-align: right;
        font-size:12px;
        color:@subtitle_color;
      }
    }
    .small-item{
      display: none;
    }
  }
   @media screen and(max-width:@change_width){
    padding:0 15px;

    .user-link{
      padding:0;
      .name{
      float:left;
      height:12px;
      line-height: 12px;
      margin-top:22px;
      margin-left:18px;

      }
      .link{
        float:left;
        box-sizing: border-box;
        width:180px;
        height:34px;
        margin-top:12px;
        margin-left:18px;
      }
      .copy{
        float: right;
        margin-left:0;
      }
    }
    .invite-list{
      .item{
        display: none;
      }
      .small-item{
        display: flex;
        width:100%;
        height:70px;
        border-bottom:1px solid @class_border;
        justify-content: space-between;
        .user-box{
          display: flex;
          align-items:center;
          .header{
            width:30px;
            height:30px;
            border-radius: 30px;
            background:#ccc;
            vertical-align: middle;
            img{
              height:100%;
            }
          }
          .name-box{
          margin-left:8px;
        }
        }
        .time{
            align-self:flex-end;
            line-height: 70px;
            font-size:12px;
            color:@subtitle_color;
          }
      }
    }
  }
}
.empty{
  text-align: center;
  // padding-top:120px;
  .iconfont{
    display: block;
    margin:0 auto;
    font-size:94px;
    color:@placeholder_color;
  }
  .name{
    font-size:14px;
    line-height: 14px;
    color:@subtitle_color;
  }
   @media screen and(max-width:@change_width){
     padding-top: 60px;
     padding-bottom:119px;
   }
}
.page-box{
  padding:30px 0;
}
</style>
