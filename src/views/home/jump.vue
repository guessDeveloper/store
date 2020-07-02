<template>
  <div class="box">
    <div class="middle-box">
        <div class="top">
           <div class="logo">
              <img src="../../assets/img/logo.png" alt="">
           </div>
           <div class="arrow"></div>
           <div class="iconfont iconjinruyindao"></div>
           <div class="logon">
             <div class="tologo" :style="'background:url('+imgUrl+') center center no-repeat'"></div>
           </div>
        </div>
        <div class="hello">
           HI,{{userInfo.nickName}}
        </div>
        <div class="main">
          返利网正带您进入“{{title}}”，购物拿任务奖励
        </div>
        <div class="tip">(温馨提示：开具增值税发票的订单，暂无任务奖励。)</div>
        <div class="time"><span>{{second}}</span>秒后自动跳转</div>
        <button class="btn" @click="jump">立即前往</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
export default {
  data(){
    return{
      id:'',
      imgUrl:'',
      jumpUrl:'',
      timer:'',
      title:'',
      second:5,
    }
  },
  mounted(){
    this.id = this.$route.query.id
    this.imgUrl = this.$route.query.img
    this.title = this.$route.query.title
    this.getUrl();
  },
  computed:{
    ...mapState([
      'userInfo'
    ])
  },
  methods:{
    getUrl(){
      this.$http.limitPost(this.$api.jumpClickToBuy+"?id="+this.id,{
        id:this.id
      }).then(res=>{
        if(res.data.Code == 1){
           this.jumpUrl = res.data.Data;
           this.startTimer();
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    },
    jump(){
      window.location.href = this.jumpUrl
    },
    //倒计时
    startTimer(){
      let _this = this;
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        _this.second --;
        if(_this.second == 0){
          clearInterval(_this.timer)
          _this.jump();
        }
      }, 1000);
    }
  },
  beforeDestroy(){
    clearInterval(_this.timer)
  }
}
</script>
<style lang="less" scoped>
.box{
  min-height: 100vh;
  .middle-box{
    box-sizing: border-box;
    width:660px;
    margin:120px auto 0;
    padding:50px;
    height:440px;
    background:#fff;
    text-align: center;
    .top{
      overflow: hidden;
      .logo{
        float: left;
        width:170px;
        height:80px;
        border:1px solid @class_border;
        border-radius: 3px;
        img{
          display: block;
          width:100px;
          height:27px;
          margin:27px auto 0;

        }
      }
      .iconfont{
        display: none;
      }
      .arrow{
         float: left;
         width:171px;
         height:41px;
         background:url(../../assets/img/logo-arrow.png) no-repeat center center;
         background-size:100%;
         margin-top:21px;
         margin-left:25px;
      }
      .logon{
        float: right;
        width:170px;
        height:80px;
        border:1px solid @class_border;
        border-radius: 3px;
        .tologo{
          display: block;
          width:100px;
          height:27px;
          margin:27px auto 0;
          background-size: contain!important;
        }
      }
    }
    .hello{
      font-size:16px;
      line-height: 16px;
      text-align: center;
      margin-top:20px;
    }
    .main{
      font-size:20px;
      font-weight: bold;
      line-height: 20px;
      margin-top:16px;
    }
    .tip{
      font-size:12px;
      line-height: 12px;
      color:#D51B32;
      margin-top:20px;
    }
    .time{
      font-size:16px;
      margin-top:30px;
      span{
        color:#D51B32;
      }
    }
    .btn{
      width:240px;
      height:50px;
      background:@main;
      margin-top:45px;
      color:#fff;
    }
  }
}
@media screen and(max-width:@change_width){
  .box{
    .middle-box{
      width:100%;
      height:auto;
      margin-top: 10px;
      padding:65px 15px 93px;
      .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo{
          width:140px;
          height:66px;
          flex-shrink: 0;
          img{
            width:84px;
            height:23px;
            margin:23px auto;
          }
        }
        .arrow{
          display: none;
        }
        .iconfont{
          display: block;
          font-size:36px;
          color:@main;
        }
        .logon{
          align-items: flex-end;
          width:140px;
          height:66px;
          border:1px solid @class_border;
          border-radius: 3px;
          .tologo{
            display: block;
            width:84px;
            height:23px;
            margin:23px auto 0;
            background-size: contain!important;
          }
        }
      }
      .main{
        font-size:15px;
        font-weight: bold;
        line-height: 20px;
        margin-top:16px;
      }
    }
    
  }
  
}
</style>