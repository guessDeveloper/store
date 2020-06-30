<template>
  <div class="pesionbox">
     <div class="persion-title title">我的账户</div>
     <div class="content">
        <div class="persion-box">
           <div class="head-img" :style="'background-image:url('+UserImg+')'">

           </div>
           <div class="user-msg">
              <div class="line top"><span class="name">昵称：</span>{{userInfo.nickName}}<span class="change" @click="showChangeBox">修改昵称</span></div>
              <div class="line bottom"><span class="name">手机号：</span>{{phoneLimit(userInfo.UserTel)}}</div>
           </div>
           <div class="score-box">
              <div class="first item">
                <div class="name">累计获得积分</div>
                <div class="num">{{UserIntegralTotal?UserIntegralTotal:'0'}}</div>
              </div>
                <div class="second item">
                <div class="name">我的积分</div>
                <div class="num">{{UserIntegral?UserIntegral:'0'}}</div>
              </div>
                <div class="three item">
                <div class="name">累计使用积分</div>
                <div class="num">{{UserIntegralUsed?UserIntegralUsed:'0'}}</div>
              </div>
           </div>

        </div>
         <div class="set">
            <!-- <span class="iconfont iconzhushi"></span> 请完善您的信息：您的手机号尚未绑定！<a href="">立即设置</a> -->
           </div>
          <div class="small-nav-list">
             <div class="margin"></div>
             <ul>
               <li class="" v-for="(item,index) in smallNav" :key="index">
                   <router-link tag="a" :to="item.to" @click.native="routerChange(item.to)"><span class="iconfont" :class="item.icon" :style="'font-size:'+item.iconSize+';'"></span>{{item.title}}<span class="iconfont iconjiantou"></span></router-link>
               </li>
             </ul>
          </div>
          
     </div>
     <el-dialog title="修改昵称" :visible.sync="toNew" custom-class="custom-dialog">
        <div class="change-box">
          <div class="input-line" style="height:auto;">
             <label for="">头像：</label>
            <div class="input-box" style="border:0;height:auto;">
            <el-upload
              class="avatar-uploader"
              :action="uploadImgUrl()"
              :on-preview="handlePreview"
              :on-remove="logoRemove"
              :on-success="logoSuccess"
              accept=".jpg,.png"
              :show-file-list="false"
              :beforeUpload="beforeLogoUpload"
              name="FileContent"
              >

              <div v-if="PersionImg" :src="PersionImg" class="avatar" :style="'background-image:url('+PersionImg+');'"></div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
         </div>
          </div>
          <div class="input-line">
          <label for="">昵称：</label><div class="input-box">
            <input type="text"  v-model.trim="name">
          </div>
          </div>
           <div class="btn-box">
            <button class="ok" @click="changeMsg">确认</button>
            <button class="no" @click="toNew = false">取消</button>
        </div>
        </div>
     </el-dialog>
  </div>
</template>
<script>
// const beforeUrl = 'http://files.youledui.com';
let beforeUrl = '';
import '@/plugins/element-upload.js'
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
export default {
  data(){
    return{
       userName:'',
       userTel:'',
       UserIntegralTotal:'',//用户获得积分总计
       UserIntegralUsed:'',//用户已使用积分
       UserIntegral:'',
       UserImg:'',
       toNew:false,
       name:'',//昵称
       PersionImg:'', //头像
       fileList:[],
       smallNav:[
      {
        title:"扫码获积分",
        to:'/erweima',
        icon:"iconsmfjl",
        iconSize:'15px'
      },
      {
        title:"消息通知",
        to:'/message',
        icon:'iconxxzx',
        iconSize:'12px'
      },
      {
        title:"安全设置",
        to:'/safe',
        icon:'iconaqsz',
        iconSize:'17px'
      },
      {
        title:"我的积分",
        to:'/myPorints',
        icon:'icondqjf',
        iconSize:'16px'
      },
      {
        title:"邀请有礼",
        to:'/invite',
        icon:'iconjfjl',
        iconSize:'15px'
      },
      {
        title:"我的订单",
        to:'/myOrder',
        icon:'iconddgl',
        iconSize:'15px'
      },
       {
        title:"帮助中心",
        to:'/helpCenter',
        icon:'iconbangzhu',
        iconSize:'15px'
      },]
    }
  },
  mounted(){
    beforeUrl = this.$util.beforeUrl
    this.getUserInfo();
  },
  computed:{
    ...mapState([
      'userInfo'
    ])
  },
  methods:{
    ...mapMutations([
      'setUserInfo'
    ]),
     //获取用户登录信息
     getUserInfo(){
       this.$http.limitGet(this.$api.GetUserInfo).then(res=>{
         if(res.data.Code == 1){
           let data = res.data.Data
           this.setUserInfo(res.data.Data);
           this.userName = data.nickName
           this.userTel = data.UserTel
           this.UserImg = data.UserImg
           this.UserIntegralTotal = data.UserJifen[0].UserIntegralTotal
           this.UserIntegral = data.UserJifen[0].UserIntegral
           this.UserIntegralUsed = data.UserJifen[0].UserIntegralUsed
         }
       })
     },
     //手机好脱敏
    phoneLimit(phone){
       return this.$util.phoneLimit(phone)
    },
    uploadImgUrl(){
        return process.env.NODE_ENV === 'production' ? 'https://files.youledui.com/create?dir=image' : '/up/create?dir=image'
    },
    beforeLogoUpload(file){
         var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'png'
        const isLt2M = file.size / 1024 / 1024 <= 1
        if(!extension && !extension2) {
            this.$message({
                message: '上传文件只能是 jpn、png格式!',
                type: 'error'
            });
        }
        if(!isLt2M) {
            this.$message({
                message: '上传文件大小不能超过 1MB!',
                type: 'error'
            });
        }
        return extension || extension2 && isLt2M
      },
       //logo 上传成功
      logoSuccess(file){
        if(file.Code == 1){
          this.PersionImg = beforeUrl+file.Data
        }
      },
      handlePreview(file) {
        console.log(file);
      },
       //logo 删除
      logoRemove(){
        this.logoUrl = ''
      },
      //
      showChangeBox(){
        this.name = this.userName;
        this.PersionImg = this.UserImg
        this.toNew = true;
      },
      //修改信息
      changeMsg(){
        if(!this.PersionImg){
          this.$message.error('请上传头像')
        }else if(this.name == ''){
          this.$message.error('请输入昵称')
        }else{
          let img = this.PersionImg.replace(this.$util.testBeforeUrl,'');
          console.log(img,this.$util.testBeforeUrl)
          this.$http.limitPost(this.$api.UserEditUserInfo,{
            UserImg:img,
            NickName:this.name
          }).then(res=>{
            if(res.data.Code == 1){
              this.$message.success('修改成功')
              this.toNew = false;
              this.getUserInfo();
            }else{
              this.$message.error(res.data.Msg)
            }
          })
        }
        
      }
  }
}
</script>
<style lang="less" scoped>
.pesionbox{
  width:100%;
  min-height: 660px;
}

.content{
  padding:0 30px;
}
.set{
  text-align: left;
  opacity: 0;
  height:0px;
  border:1px solid #F38A1D;
  background:rgba(243,138,29,0.1);
  font-size:12px;
  color:#000;
  margin-top:30px;
  padding-left:10px;
  border-radius: 4px;
  line-height: 30px;
  .iconfont{
    color:@main;
    font-size: 14px;
    margin-right:5px;
    margin-top:1px;
  }
  a{
    color:@main;
  }
  @media screen and(max-width:@change_width){
    margin-top:55px;
  }
}
.persion-box{
    margin-top:30px;
    border-bottom:1px solid @class_border;
    padding-bottom:30px;
    height:80px;
  .clear();
  .head-img{
    float: left;
    width:80px;
    height:80px;
    background:#ccc;
    border-radius: 80px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position:center center;
    background-size:cover;
  }
  .user-msg{
    float: left;
    .line{
      text-align: left;
      line-height: 12px;
      &.top{
        margin-top:22px;
      }
      &.bottom{
        margin-top:15px;
      }
      .name{
        display:inline-block;
        text-align: right;
        width:100px;
        color:@subtitle_color;
        @media screen and(max-width:@change_width){
          width:60px;
        }
      }
      .change{
        margin-left:50px;
        color:@main;
        cursor: pointer;
        @media screen and(max-width:@change_width){
          margin-left:20px;
        }
      }
    }
  }
  .score-box{
    float: right;
    text-align: left;
    .clear();
    .item{
      float: left;
    }
    .first{
      width:162px;
    }
    .second{
      width:162px;
    }
    .three{
      width:120px;
    }
    .name{
      margin-top:22px;
      font-size:12px;
      color:@subtitle_color;
    }
    .num{
      font-size:16px;
      margin-top:13px;
      line-height: 12px;
      font-weight: bold;
    }
  }
  @media screen and(max-width:@change_width){
    margin-top:15px;
    border:0;
    .head-img{
      width:60px;
      height:60px;
      margin-bottom:15px;
    }
    .user-msg{
      .line{
        &.top{
          margin-top:12px;
        }
      }
    }
    .score-box{
      float: none;
      margin-top:15px;
      display: flex;
      border-top:1px solid @class_border;
      width:100%;
      overflow: hidden;
      padding-bottom:15px;
      .clear();
    }
  }
}
.small-nav-list{
  display: none;
}
@media screen and(max-width:@change_width){
     .title{
       display: none;
     }
     .content{
       padding:0 15px;
     }
     .small-nav-list{
       display: block;
       .margin{
         width:100%;
         height:10px;
         background:@body_color;
       }
       ul{
         li{
           height:50/@p;
           line-height: 50/@p;
            a{
              display: block;
              font-size:14px;
              color:@persion_left;
              border-bottom:1px solid @class_border;
              .iconfont{
                margin-right:10px;
                color:@placeholder_color;
              }
              .iconjiantou{
                float:right;
                font-size:10px;
              }
            }
         }
       }
     }
}
 .input-line{
    position: relative;
    height:34px;
    margin:10px 0;
    overflow: hidden;
    .btn{
      position: absolute;
      top:1px;
      right:1px;
      width:87px;
      height:32px;
      padding:0 12px;
      font-size:12px;
      color:@main;
      border:0;
      text-align: right;
      background:#fff;
    }
    label{
      float: left;
      width:16.67%;
      box-sizing: border-box;
      padding-right:6px;
      text-align:right;
      font-size: 12px;
      line-height:34px;
      height:34px;
      color:#666;
    }
    .input-box{
      float:left;
      box-sizing: border-box;
      width:83.33%;
      height:34px;
      border:1px solid @class_border;
      .upload-btn{
      width:126px;
      height:40px;
      font-size: 14px;
      color:#fff;
      background:@main;
      border:0;
    }
    .avatar{
      display: inline-block;
      width:80px;
      height:80px;
      border-radius: 80px;
       background-repeat: no-repeat;
    background-position:center center;
    background-size:cover;
      
    }
    .avatar-uploader-icon{
      width:80px;
      height:80px;
      border-radius:80px;
      border:1px solid @class_border;
      font-size: 30px;
      line-height: 80px;
    }
    .el-upload{
      width:100px;
      height:100px;
      border:1px solid @class_border;
      border-radius: 100px;
    }
    .tip{
      font-size:12px;
      color:@subtitle_color;
    }
      input{
        display: block;
        width:100%;
        height:100%;
        box-sizing: border-box;
        padding-left:12px;
        border:0;
        font-size:12px;
      }
    }
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
