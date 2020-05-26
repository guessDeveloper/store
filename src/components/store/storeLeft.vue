<template>
  <div class="content">
     <ul>
       <li v-for="(item,index) in navList" :key="index" :class="{active:item.to == nowPath}"> 
        <router-link tag="a" :to="item.to" @click.native="routerChange(item.to)"><span class="iconfont" :class="item.icon" :style="'font-size:'+item.iconSize+';'"></span>{{item.title}}</router-link>
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
        to:'/storeSafe',
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
        to:'/storeClassify',
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
        to:'/storeOrder',
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
        to:'/storeReturn',
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
    routerChange(to){
      this.nowPath = to;
    }
  }
}
</script>