<template>
  <div class="box">
    <a :href="item.URL" v-for="(item,index) in Class" :key="index">
        <span class="iconfont" :style="'background:url('+item.PhonePic+') no-repeat center center;'"></span>
        <div class="name">{{item.PhoneClassName}}</div>
    </a>
  </div>
</template>
<script>
export default {
  data(){
    return{
      //  Class:[{
      //    title:'服装',
      //    icon:'iconyd_fz'
      //  },{
      //    title:'餐厨',
      //    icon:'iconyd_cc'
      //  },{
      //    title:'电器',
      //    icon:'iconyd_dq'
      //  },{
      //    title:'配件',
      //    icon:'iconyd_pj'
      //  },{
      //    title:'居家',
      //    icon:'iconyd_jj'
      //  },{
      //    title:'洗护',
      //    icon:'iconyd_xh'
      //  },{
      //    title:'婴童',
      //    icon:'iconyd_yt'
      //  },{
      //    title:'杂货',
      //    icon:'iconyd_zh'
      //  },{
      //    title:'饮食',
      //    icon:'iconyd_cc'
      //  },{
      //    title:'更多',
      //    icon:'iconyd_gd'
      //  }]
      Class:[],
    }
  },
  mounted(){
     this.getData();
  },
  methods:{
    getData(){
      this.$http.get(this.$api.GetHomePageCats).then(res=>{
          if(res.data.Code == 1){
              this.Class = res.data.Data
          }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.box{
  width:100%;
  overflow: hidden;
  padding-bottom: 10px;
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
      border-radius:45px ;
      overflow: hidden;
      color:@main;
      background-size:cover!important;
    }
    .name{
      font-size:12px;
      line-height: 12px;
      color:@font_color;
    }
  }
}
</style>