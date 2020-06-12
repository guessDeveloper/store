<template>
  <div class="pesionbox">
     <div class="persion-title title">我的账户</div>
     <div class="content">
        <div class="persion-box">
           <div class="head-img">

           </div>
           <div class="user-msg">
              <div class="line top"><span class="name">昵称：</span>{{userName}}<span class="change">修改昵称</span></div>
              <div class="line bottom"><span class="name">手机号：</span>{{userTel}}</div>
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
            <span class="iconfont iconzhushi"></span> 请完善您的信息：您的手机号尚未绑定！<a href="">立即设置</a>
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
  </div>
</template>
<script>
export default {
  data(){
    return{
       userName:'',
       userTel:'',
       UserIntegralTotal:'',//用户获得积分总计
       UserIntegralUsed:'',//用户已使用积分
       UserIntegral:'',
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
    this.getUserInfo();
  },
  methods:{
     //获取用户登录信息
     getUserInfo(){
       this.$http.limitGet(this.$api.GetUserInfo).then(res=>{
         if(res.data.Code == 1){
           let data = res.data.Data
           this.userName = data.nickName
           this.userTel = data.UserTel
           this.UserIntegralTotal = data.UserJifen[0].UserIntegralTotal
           this.UserIntegral = data.UserJifen[0].UserIntegral
           this.UserIntegralUsed = data.UserJifen[0].UserIntegralUsed
         }
       })
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
  height:30px;
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
      }
      .change{
        margin-left:50px;
        color:@main;
        cursor: pointer;
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

</style>