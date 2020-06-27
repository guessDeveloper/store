<template>
  <div class="nav ">
    <div class="nav-box clear">
       <div class="tip">
         <span class="iconfont iconguangbo"></span>
         <span class="msg" v-for="(item,index) in tip" :key="index" :class="{active:tipActive == index}">{{item.Message}}</span>
      </div>
       <div class="nav-right">
          <a class="iconfont iconyd_saoyisao login-btn"></a>
          <span v-show="!isLogin">
            <router-link to="/login" tag='a' >请先登录</router-link>
            <router-link to="/register" tag='a' >免费注册</router-link>
           </span>
           <span v-show="isLogin">
             <router-link to="/persion" class="userName">{{userName}}</router-link>
             <router-link to='/myOrder' tag='a'>我的订单</router-link>
             <a @click="loginOut">退出登录</a>
           </span>
          <router-link to="/helpCenter" class="help" tag="a">帮助中心</router-link>
       </div>
      <a  class="loginout" v-show="isLogin" @click="loginOut">退出登录</a>
      <router-link tag="a" to="/persion" class="logined" v-show="isLogin"><span class="iconfont iconzh"></span>个人中心</router-link>
      <router-link href="" class="regester" to="/register" tag="a" v-show="!isLogin"> 注册</router-link>
      <router-link class="login" tag="a" to="/login" v-show="!isLogin">登录</router-link>
    </div>
  </div>
</template>
<script>

import BMap from 'BMap'
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
export default {
  data(){
    return{
      tip:[],
      tipActive:0,
      timer:'',
      userName:''
    }
  },
  computed:{
     ...mapState([
       'positionX',
       'isLogin'
     ])
  },
  mounted(){
    let _this = this;
     this.baiduMap();
    this.getMessage()
    _this.getUserInfo();
   
    // this.getLcationPostion();

  },
  methods:{
    ...mapMutations([
      'setPositionX',
      'setPositionY',
      'setLogin',
    ]),
    loop(){
      clearInterval(this.timer);
      this.timer = setInterval(()=>{
        this.tipActive++;

        if(this.tipActive>this.tip.length-1){
          this.tipActive = 0;
        }
      },4000)
    },
    //获取公告
     getMessage(){
      this.$http.get(this.$api.GetWebMessage).then(res=>{
          if(res.data.Code == 1){
            this.tip = res.data.Data;
            this.loop();
          }
      })
     },
     //获取用户登录信息
     getUserInfo(){
       this.$http.get(this.$api.GetUserInfo).then(res=>{
         if(res.data.Code == 1){
           this.setLogin(true)
           this.userName = res.data.Data.nickName
           let userInfo = JSON.stringify(res.data.Data);
           sessionStorage.setItem('userInfo',userInfo)
         }
       })
     },
     //百度地图获取地理文职
     baiduMap(){
      var geolocation = new BMap.Geolocation();
      const _this = this;
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == 0){
          _this.setPositionX(r.point.lng);
          _this.setPositionY(r.point.lat);
            console.log('您的位置：'+r.point.lng+','+r.point.lat);
          }
          else {
            console.log('failed'+this.getStatus());
          }
        },{enableHighAccuracy: true})
     },
     //获取用户地理位置
     getLcationPostion(){
       navigator.geolocation.getCurrentPosition(function (position) {
        var currentLat = position.coords.latitude;
        var currentLon = position.coords.longitude;

        console.log(currentLat,currentLon)
        },
            function (err) {
                switch (err.code) {
                    case 0:
                        {
                            alert("不包括其他错误编号中的错误");
                            break;
                        }
                    case 1:
                        {
                            alert("用户拒绝浏览器获取位置信息");
                            break;
                        }
                    case 2:
                        {
                            alert("尝试获取用户信息，但失败了");
                            break;
                        }
                    case 3:
                        {
                            alert("获取位置超时了");
                            break;
                        }
                    default:
                        {
                            alert("未知错误");
                            break;
                        }
                }
            },
            {
                //enableHighAcuracy: true, //位置是否精确获取
                //timeout: 5000,            //获取位置允许的最长时间
                //maximumAge: 1000          //多久更新获取一次位置
            });
     },
     //退出登录
     loginOut(){
       this.$http.limitGet(this.$api.LoginOut).then(res=>{
         if(res.data.Code == 1){
           this.setLogin(false);
            localStorage.setItem('token','')
            this.$router.push('/')
         }else{
           this.$message.error(res.data.Msg)
         }
       })
     }
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },

}
</script>
<style lang="less" scoped>

.nav{
  width:100%;
  height:32px;
  background:@nav_bg;
  .nav-box{
    width:@max-width;
    height:100%;
    overflow: hidden;
    margin:0 auto;
    background:@nav_bg;
    .tip{
      float: left;
      position: relative;
      width:300px;
      font-size:12px;
      color:#fff;
      line-height:32px;
      padding-left:19px;
      .iconfont{
        position: absolute;
        left:0;
        font-size:12px;
        margin-right:5px;
      }
      .msg{
        position: absolute;
        top:0;
        left:0;
        text-align: left;
        text-indent:19px ;
        width:100%;
        display:block;
        opacity: 0;
        &.active{
           animation: msgMove .5s ease forwards;
        }
      }

    }
    .login{
      display: none;
    }
    .regester{
      display: none;
    }
    .nav-right{
      float: right;
      font-size:0;
      a{
        float: left;
        margin-top:10px;
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        color:#fff;
        padding:0 12px;
        border-left:1px solid @nav-border;
        &.help{
          padding-right:0;
        }
        &.login-btn{
          border-left:0;
        }
      }
    }
  }
}
@keyframes msgMove {
   0%{
     opacity: 0;
     transform: translate3d(0,10px,0);
   }
   100%{
     opacity: 1;
      transform: translate3d(0,0,0);
   }
}
.loginout, .logined {
  display: none;
}
@media screen and(max-width:@change_width){
  .nav{
    width:100%;
    height:40/@p;
    background:@body_color;
    .nav-box{
      box-sizing: border-box;
      width:100%;
      padding:0 15px;
      background:@body_color;
      .tip{
        width:204/@p;
        font-size:12px;
        line-height: 40/@p;
        color:@subtitle_color;
        .msg{
          width:170/@p;
          height:40/@p;
        }
      }
      .nav-right{
        display: none;
      }
      .login,.regester{
        box-sizing: border-box;
        display: block;
        float: right;
        width:44/@p;
        height:24/@p;
        margin-left:6/@p;
        margin-top:8/@p;
        text-align: center;
        line-height: 22/@p;
        color:@main;
        font-size:12px;
        border:1px solid @main;
        border-radius: 4/@p;
      }
      .logined{
        display: block;
        float: right;
        width:83/@p;
        height:24/@p;
        color:#4A90E2;
        line-height: 24/@p;
        text-align: center;
        border:1px solid #4A90E2;
        border-radius:4/@p ;
        margin-top:8/@p;
        margin-right: 8/@p;
        .iconfont{
          font-size:12px;
          color:#4A90E2;
          margin-right:5px;
        }
      }
      .loginout{
        display: block;
        float: right;
        width:68/@p;
        height:24/@p;
        color:@main;
        line-height: 24/@p;
        text-align: center;
        border:1px solid @main;
        border-radius:4/@p ;
        margin-top:8/@p;
      }
    }
  }
}
</style>
