<template>
  <div class="content">
     <ul>
       <li v-for="(item,index) in navList" :key="index" :class="{active:item.to == nowPath}"> 
        <router-link tag="a" :to="item.to" @click.native="routerChange"><span class="iconfont" :class="item.icon" :style="'font-size:'+item.iconSize+';'"></span>{{item.title}}</router-link>
       </li>
     </ul>
  </div>
</template>
<style lang="less" scoped>
.content{
  width:100%;
  height:661px;
  ul{
    display: block;
    padding:14px 0;
    li{
      height:44px;
      padding-left:35px;
      line-height: 44px;
      font-size:14px;
      text-align: left;
      .iconfont{
        margin-right:10px;
        color:@placeholder_color;
      }
      a{
        color:@persion_left;
      }
      &.active{
        background:@persion_active;
        a{
          color:@main;
        }
        .iconfont{
          color:@main;
        }
      }
    }
  }
}
</style>
<script>
export default {
  data(){
    return{
      nowPath:'/',
      navList:[{
        title:"我的账号",
        to:'/persion',
        icon:'icongrzx',
        iconSize:'14px'
      },
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
        to:'/',
        icon:'iconbangzhu',
        iconSize:'15px'
      },
      ]
    }
  },
  mounted(){
    this.nowPath = this.$route.path;
  },
  methods:{
    routerChange(){
      this.nowPath = this.$route.path;
    }
  }
}
</script>