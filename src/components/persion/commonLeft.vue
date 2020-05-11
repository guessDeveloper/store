<template>
  <div class="content">
     <ul>
       <li v-for="(item,index) in navList" :key="index" :class="{active:item.to == nowPath}"> 
        <router-link tag="a" :to="item.to">{{item.title}}</router-link>
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
      a{
        color:@persion_left;
      }
      &.active{
        background:@persion_active;
        a{
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
        to:'/persion'
      },
      {
        title:"扫码获积分",
        to:'/'
      },
      {
        title:"消息通知",
        to:'/'
      },
      {
        title:"安全设置",
        to:'/'
      },
      {
        title:"我的积分",
        to:'/'
      },
      {
        title:"邀请有礼",
        to:'/'
      },
      {
        title:"我的订单",
        to:'/'
      },
       {
        title:"帮助中心",
        to:'/'
      },
      ]
    }
  },
  mounted(){
    this.nowPath = this.$route.path;
    console.log(this.nowPath)
  }
}
</script>