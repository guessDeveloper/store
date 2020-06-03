<template>
  <div>
    <navBar type="none"></navBar>
    <div class="content" v-html="content">
       
    </div>
    <footerBar :isLogin="true"></footerBar>
  </div>
</template>
<script>
import navBar from '@/components/login/login-nav'
import footerBar from '@/components/common/footer'
export default {
  data(){
    return{
      content:''
    }
  },
  mounted(){
    if(this.$route.query.isStore&&this.$route.query.isStore == 1){
      this.getStoreConent();
    }else{
      this.getUserContent();
    }
  },
  components:{
    footerBar:footerBar,
    navBar:navBar
  },
  methods:{
    getUserContent(){
       this.$http.get(this.$api.GetUserAgreement).then(res=>{
         if(res.data.Code == 1){
           this.content = res.data.Data.AgreementValue
         }
       })
    },
    getStoreConent(){
      this.$http.get(this.$api.GetMerchantAgreement).then(res=>{
         if(res.data.Code == 1){
           this.content = res.data.Data.AgreementValue
         }
       })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  width:@max-width;
  margin:30px auto 0;
  background:#fff;
  box-sizing: border-box;
  padding:50px 90px 80px;
  @media screen and(max-width:@change_width){
    width:100%;
    margin-top:15px;
    padding:30px 29px 30px;
  }
}
</style>