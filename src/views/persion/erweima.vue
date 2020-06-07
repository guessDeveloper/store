<template>
  <div class="erweima-box">
      <div class="persion-title">
         基本信息
      </div>
      <div class="erweima-content">
         <img src="" alt="">
         <p>尊敬的用户，去地面商家消费完成之后，请出示您的二维码，获得宝贵的积分。</p>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  mounted(){
    this.getErweima();
  },
  methods:{
    getErweima(){
      this.$http.get(this.$api.GetVerificationNum).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.erweima-box{
  text-align: center;
  height:660px;
}
.erweima-content{
  img{
    display: block;
    width:200px;
    height:200px;
    margin:80px auto 40px;
  }
  p{
    font-size:12px;
    line-height: 12px;
  }
}
@media screen and(max-width:@change_width){
  .erweima-box{
    height:auto;
  }
  .erweima-content{
    padding-bottom:60px;
    img{
      margin:60px auto 40px;
    }
    p{
      width:228px;
      line-height: 24px;
      margin:0 auto;
    }
  }
}
</style>
