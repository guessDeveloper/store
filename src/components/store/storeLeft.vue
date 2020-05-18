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
        title:"商家账号",
        to:'/store',
        icon:'iconsjzh',
        iconSize:'14px'
      },
      {
        title:"安全设置",
        to:'/erweima',
        icon:"iconaqsz",
        iconSize:'15px'
      },
      {
        title:"产品管理",
        to:'/storeProduct',
        icon:'iconcpgl',
        iconSize:'12px'
      },
      {
        title:"分类管理",
        to:'/safe',
        icon:'iconflgl',
        iconSize:'17px'
      },
      {
        title:"二维码管理",
        to:'/storeErweima',
        icon:'iconewmgl',
        iconSize:'16px'
      },
      {
        title:"订单管理",
        to:'/invite',
        icon:'iconddgl',
        iconSize:'15px'
      },
      {
        title:"积分管理",
        to:'/storeScore',
        icon:'iconjfgl',
        iconSize:'15px'
      },
       {
        title:"扫码返奖励积分",
        to:'/',
        icon:'iconsmfjl',
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