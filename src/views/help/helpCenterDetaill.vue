<template>
  <div>
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <router-link tag="a" to="/helpCenter">帮助中心</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav"></span>
    </div>
    <div class="box">
      <div class="select">
        <h3 class="">常见问题  <span class="arrow iconfont iconxiasanjiao"></span></h3>
      </div>
      <div class="box-left">
         <h3>常见问题</h3>
         <ul class="list">
           <li class="active"><a >购物常见问题</a></li>
         </ul>
      </div>
      <div class="box-right">
         <div class="title">
           购物常见问题
         </div>
         <div class="content">
           • 参与者资格：所有消费乐注册用户均可参与。活动期间每位用户分享邀请码均可获得总值120元的优惠券(有效期7天)，每日分享次数不设上限。 • 新用户领取优惠券并完成注册后，视作邀请新用户成功，新用户会获得总值为180元的优惠券，有效期为系统显示为准，同时邀请人获得60元优惠券；邀请的新用户完成首单后，邀请人可再获得60元优惠券(有效期7天)。 • 每成功邀请一位好友还可获得1积分的奖励，如果好友首次下单并完成付款还可获得奖励1积分的奖励。 • 为了杜绝刷单等妨碍正常用户的恶意行为，系统会在下单后进行核查，同一手机号、支付宝、消费乐帐号、设备号、订单收件人均视为同一用户。对于恶意刷单的用户，取消购买资格。 • 有任何疑问请在app内，咨询消费乐在线客服。 • 消费乐保留法律范围内的最终解释权，如有其它疑问请咨询官方客服。
         </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      nowName:'',
      classId:''
    }
  },
  mounted(){
    this.classId = this.$route.query.id;
    this.getQuestion();
  },
  methods:{
    getQuestion(){
      this.$http.post(this.$api.Q_A_ByClass,{classid:this.classId}).then(res=>{
        if(res.data.Code == 1){
           console.log(res.data.Data)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.box{
  width:@max-width;
  margin:0 auto 100px;
  .clear();
  .select{
    display: none;
  }
  .box-left{
    float: left;
    width:190px;
    height:100%;
    background:#fff;
    min-height: @persion_height;
    h3{
      line-height: 55px;
      font-size:16px;
      padding:0 25px;
    }
    .list{
      li{
        height:44px;
        padding:0 25px;
        line-height: 44px;
        a{
          font-size:14px;
          color:@persion_left;
          vertical-align: middle;
        }
        &.active{
          background:@persion_active;
        }
        &:hover{
          background:@persion_active;
        }
      }
    }

  }
  .box-right{
    float:right;
    width:990px;
    height:100%;
    background:#fff;
    min-height:@persion_height;
    .title{
      margin:0 30px;
      line-height:88px ;
      font-size:28px;
      border-bottom:1px solid @class_border;
    }
    .content{
      margin:25px 30px 0;
      font-size:12px;
    }
  }
  @media screen and(max-width:@change_width){
    width:100%;
    .select{
      display: block;
      height:58px;
      background:#fff;
      margin:10px auto;
      h3{
        position: relative;
        font-size:20px;
        line-height: 58px;
        margin:0 15px;
        padding-left:14px;
        &::before{
          content:'';
          position: absolute;
          left:0;
          top:19px;
          width:4px;
          height:18px;
          background:@main;
        }
        .iconfont{
          position: absolute;
          top:50%;
          right:0;
          transform: translateY(-50%) scale(.6);
          color:@main;
          font-size:12px;
          
        }
      }
    }
    .box-left{
      display: none;
    }
    .box-right{
      width:100%;
      .title{
        margin:0 15/@p;
        line-height:80/@p ;
        font-size:20/@p;
        text-align: center;
      }
      .content{
        margin:24/@p 15/@p 0;
      }
    }
  }
}
</style>