<template>
  <div id="app">
    <router-view></router-view>
    <fixRight></fixRight>
  </div>
</template>

<script>
import fixRight from '@/components/common/custoer-service'
export default {
  name: 'app',
  components: {
    fixRight:fixRight,
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
//选择器
.food-select-box{
    width:@max-width;
    margin:0 auto;
    background:#fff;
    .food-select-item{
        margin:0 30px;
        line-height:64px;
        border-bottom:1px solid @class_border;
        ul{
            display:block;
            width:100%;
            .clear();
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
                    margin-right:6px;
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
}
// .el-table th>.cell{
//   font-size:12px;
//   color:@subtitle_color;
// }
.el-dialog__title{
  font-weight: bold;
}
.table-line{
  font-size:12px;
  color:@font_color;
}
//个人中心
.persion-title{
   text-align: left;
  font-size:20px;
  line-height: 60px;
  padding-left:30px;
  border-bottom:1px solid @class_border;
}
</style>
