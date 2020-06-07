<template>
  <div class="nav ">
    <div class="nav-box clear">
       <div class="tip">
         <span class="iconfont iconguangbo"></span>
         <span class="msg" v-for="(item,index) in tip" :key="index" :class="{active:tipActive == index}">{{item.Message}}</span>
      </div>
       <div class="nav-right">
          <a class="iconfont iconyd_saoyisao login-btn"></a>
          <router-link to="/login" tag='a' >请先登录</router-link>
           <router-link to="/register" tag='a' >免费注册</router-link>
          <router-link to="/helpCenter" class="help" tag="a">帮助中心</router-link>
       </div>
      <router-link href="" class="regester" to="/register" tag="a"> 注册</router-link>
      <router-link class="login" tag="a" to="/login">登录</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tip:[],
      tipActive:0,
      timer:''
    }
  },
  mounted(){
    this.getMessage()
    this.getUserInfo();
  },
  methods:{
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
         console.log(res)
       })
     }
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
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
    }
  }
}
</style>