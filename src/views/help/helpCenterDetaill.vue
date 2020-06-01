<template>
  <div>
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <router-link tag="a" to="/helpCenter">帮助中心</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav"></span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      nowName:'',
      classId:''
    }
  },
  mounted(){
    this.classId = this.$route.query.id;
    this.getQuestion();
  },
  methods:{
    getQuestion(){
      this.$http.post(this.$api.Q_A_ByClass,{classid:this.classId}).then(res=>{
        if(res.data.Code == 1){
           console.log(res.data.Data)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>