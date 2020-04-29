<template>
  <div class="box">
    <a href="" v-for="(item,index) in Class" :key="index">
        <span class="iconfont" :class="item.icon"></span>
        <div class="name">{{item.title}}</div>
    </a>
  </div>
</template>
<script>
export default {
  data(){
    return{
       Class:[{
         title:'服装',
         icon:'iconyd_fz'
       },{
         title:'餐厨',
         icon:'iconyd_cc'
       },{
         title:'电器',
         icon:'iconyd_dq'
       },{
         title:'配件',
         icon:'iconyd_pj'
       },{
         title:'居家',
         icon:'iconyd_jj'
       },{
         title:'洗护',
         icon:'iconyd_xh'
       },{
         title:'婴童',
         icon:'iconyd_yt'
       },{
         title:'杂货',
         icon:'iconyd_zh'
       },{
         title:'饮食',
         icon:'iconyd_cc'
       },{
         title:'更多',
         icon:'iconyd_gd'
       }]
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
.box{
  width:100%;
  a{
    float: left;
    width:20%;
    margin-bottom:3px;
    .iconfont{
      display: block;
      width:45px;
      height:45px;
      line-height: 45px;
      margin:17px auto 11px;
      font-size:45px;
      color:@main;
    }
    .name{
      font-size:12px;
      line-height: 12px;
      color:@font_color;
    }
  }
}
</style>