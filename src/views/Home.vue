<template>
  <div class="home">
    <navBar></navBar>
    
  </div>
</template>

<script>
import  navBar from '@/components/common/nav'
export default {
  name: 'Home',
  mounted(){
 
  },
  components: {
    navBar:navBar
  }
}
</script>
<style lang="less" scoped>
 .home{
     display: flex;
 }
</style>
