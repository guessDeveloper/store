<template>
  <div id="app">
    <router-view></router-view>
    <!-- <fixRight></fixRight> -->
  </div>
</template>

<script>
// import fixRight from '@/components/common/custoer-service'
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
export default {
  name: 'app',
  // components: {
  //   fixRight:fixRight,
  // }
  data(){
    return{

    }
  },
  computed:{
    ...mapState([
      'config'
    ])
  },
  mounted(){
    this.getConfig();
  },
  methods:{
    ...mapMutations([
      'setConfig'
    ]),
    getConfig(){
      this.$http.get(this.$api.GetWebconfig).then(res=>{
        if(res.data.Code ==1){
          document.title = res.data.Data.title
          this.setConfig(res.data.Data)
        }
      })
    }
  }
}
</script>

<style lang="less">
@import './assets/less/common.less';
@import './assets/less/reset.less';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
}
.tc{
  text-align: center;
}
.brand-top-nav{
  width:@max-width;
  margin:0 auto;
  text-align: left;
  line-height: 14px;
  padding:20px 0;
  a{
    font-size:12px;
    color:@font_color;
  }
  .iconfont{
    font-size:10px;
    color:@subtitle_color;
  }
  .now-nav{
    color:@placeholder_color;
  }
}
.menager-box{
  min-height:@persion_height;
  background:#fff;
}
//选择器
.food-select-box{
    width:@max-width;
    margin:0 auto;
    background:#fff;
    .food-select-item{
        margin:0 30px;
        line-height:64px;
        border-bottom:1px solid @class_border;
        &:nth-last-child(1){
          border:0;
        }
        ul{
            position: relative;
            display:block;
            width:100%;
            .clear();
            padding-left: 46px;

            li{
                float: left;
                font-size:14px;
                color:@subtitle_color;
                &.active{
                    a{
                        color:@main;
                    }
                }
                &.name{
                    position: absolute;
                    margin-right:6px;
                    left:0;
                    top:0;
                }
                a{
                    color:@font_color;
                    margin:0 15px;
                    transition:color .3s ease;
                    &:hover{
                        color:@main;
                    }
                }
            }
        }
    }
    @media screen and(max-width:@change_width){
      display: none;
    }
}

//图标
.icon-arrow-down{
  display: inline-block;
  width:9px;
  height:5px;
  background:url(./assets/img/icon-arrow-down.png) no-repeat center center;
  background-size:100%;

}
.icon-arrow-downYellow{
  display: inline-block;
  width:8px;
  height:5px;
  background:url(./assets/img/icon-arrow-downY.png) no-repeat center center;
  background-size:100%;
}
.icon-sort{
  
}
//修改element
.el-pager li.active{
  color:@main!important;
}
.el-pager li:hover{
  color:@main!important;
}
.el-pagination button:hover{
  color:@main!important;
}
.el-dialog__body{
  padding-top:0!important;
  padding-bottom:20px!important;
  @media screen and(max-width:@change_width){
    padding-left:20px!important;
    padding-right:20px!important;
  }
}
.el-table th>.cell{
  padding:0 !important;
}
.el-table .cell{
  padding:0!important;
}
.el-dialog__title{
  font-weight: bold;
}
.el-range-editor .el-range-input{
  line-height: 14px!important;
  font-size: 13px!important;
}
.el-date-editor .el-range__icon{
  line-height: 14px!important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:218px!important;
  height:34px;
  border-radius: 0;
  border-color:@class_border;
}
.small-date-box{
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%!important;
    border-radius: 0!important;
    .el-input__inner{
      border-radius: 0!important;
      height:34px;
    }
  }
}
.date-middle{
  line-height: 34px;
  padding:0 5px;
}
.el-date-editor .el-range-separator{
  line-height: 14px!important;
}
.el-date-editor .el-range__close-icon{
  display: none!important;
  line-height: 14px!important;
}
.el-range-editor.el-input__inner{
  padding:10px 15px!important;
}
.el-table td{
  padding:10px 0!important;
}
.table-line{
  font-size:12px;
  color:@font_color;
}
.el-select{
  width:100%;
  height:100%;
}
.table-header-color{
  background:#FAFAFA;
  th{
    background:#FAFAFA!important;
    &:nth-of-type(1){
      padding-left:20px;
    }
  }
}
.el-input-number{
  height:100%;
}
.el-input-number .el-input{
  height:100%;
}
.el-input__inner{
  height:100%!important;
}
.el-select>.el-input{
   height:100%!important;
}
.el-select .el-input__inner{
  border-radius: 0;
  font-size:12px;
}
.el-checkbox__inner:hover{
  border-color:@main!important;
}
.el-checkbox__inner:active{
  border-color:@main!important;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  border-color:@main!important;
  background:@main!important;
}
.select .el-input__icon{
  line-height: 34px;
}
//轮播图修改 start
.el-carousel__indicator.is-active button{
  opacity: 1;
  background:@main;
}
.el-carousel--horizontal{
  height:100%;
}
//轮播图修改 end 
.el-message-box{
  @media screen and(max-width:@change_width){
    width:330px!important;
  }
}
.el-carousel__arrow{
  @media screen and(max-width:@change_width){
    background-color:rgba(0,0,0,.5)!important;
  }
}
.el-carousel__arrow--left{
   @media screen and(max-width:@change_width){
     display: block!important;
     left:16px!important;
   }
}
.el-carousel__arrow--right{
   @media screen and(max-width:@change_width){
     display: block!important;
     right:16px!important;
   }
}
//page-box
 .page-box{
    text-align: center;
    &.small{
      display: none;
    }
    @media screen and(max-width:@change_width){
      display: none;
      &.small{
        display: block;
      }
    }
  }
//个人中心
.persion-title{
   text-align: left;
  font-size:20px;
  line-height: 60px;
  padding-left:30px;
  border-bottom:1px solid @class_border;
}
@media screen and(max-width:@change_width){

  .el-carousel__button{
    display:none!important;
    width:9px!important;
  }
  .brand-top-nav{
    display: none;
   }
   .persion-title{
     position: relative;
     height:58px;
     line-height: 58px;
     font-size:20px;
     border:0;
     padding-bottom:10px;
    &::before{
      content:'';
      position:absolute;
      left:15px;
      top:19px;
      width:4px;
      height:18px;
      background:@main;
    }
     &::after{
       position: absolute;
       bottom: 0;
       left:0;
       content:'';
       width:100%;
       height:10px;
       background:@body_color;
     }
   }
   .small{
     .el-dialog{
       width:325px!important;
     }
   }
}
.dilog{
  width:500px!important;
  @media screen and(max-width:@change_width){
    width:80%!important;
  }
}
</style>
