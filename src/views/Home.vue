<template>
  <div class="home">
    <navBar></navBar>
    <navBottom></navBottom>
    <router-view></router-view>
    <footerBar></footerBar>
  </div>
</template>

<script>
import  navBar from '@/components/common/nav'
import  navBottom from'@/components/common/nav-bar'
import footerBar from '@/components/common/footer'
export default {
  name: 'Home',
  data(){
    return{
      classActive:1,
      classNav:[{
        title:'服装',
        active:1,
        type:1
      },{
        title:'厨具',
        active:0,
        type:2
      },{
        title:'配件',
        active:0,
        type:3
      },{
        title:'家居',
        active:0,
        type:4
      },]
    }
  },
  mounted(){
     
  },
  components: {
    navBar:navBar,
    navBottom:navBottom,
    footerBar:footerBar,
  }
}
</script>
<style lang="less" scoped>
@import '../assets/less/common.less';

</style>
