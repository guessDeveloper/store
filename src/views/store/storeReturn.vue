<template>
  <div class="menager-box">
      <div class="persion-title">
         扫码返积分
      </div>
      <div class="content">
         <div class="input-line">
           <label for="">用户手机号：</label><div class="input-box"><input type="text" placeholder="请输入用户手机号/或者扫描用户二维码" v-model.trim="userPhone"></div>
         </div>
         <div class="input-line">
           <label for="">消费金额: </label><div class="input-box"><input type="text" placeholder="请输入消费金额" v-model.trim="money"></div>
         </div>
         <div class="input-line">
           <label for="">请选择返还比例：</label><div class="input-box"><input type="text" placeholder="默认调取商家的奖励比例" v-model="rate"></div>
         </div>
         <div class="input-line input-line-integral">
           <label for="">返积分数量：</label><div class="input-box"><span class="tip">{{backNum}}</span> </div>
         </div>
         <div class="input-line">
           <button class="submit" @click="btnCheck">确定</button>
         </div>
      </div>
  </div>
</template>
<script>
import '../../plugins/element-table.js'
export default {
  data(){
    return{
      userPhone:'',
      money:'',
      rate:'',
    }
  },
  computed:{
    backNum(){
       if(this.money !== ''&this.rate !== ''){
         return this.money*this.rate/100
       }else{
         return '自动计算用户返积分数量'
       }
    }
  },
  methods:{
    btnCheck(){
      if(this.userPhone == ''){
        this.$message.error('请输入用户手机号');
      }else if(this.money == ''){
        this.$message.error('请输入消费金额')
      }else if(!/^[0-9]+(.[0-9]{2})?$/.test(this.money)){
        this.$message.error('请输入正确的金额')
      }else if(!this.$util.testNum.test(this.rate)){
        this.$message.error('请输入正确的比例')
      }else{
        this.$http.storePost(this.$api.ReturnUserIntegrals,{
          Mobile:this.userPhone,
          SpendMoney:this.money,
          Rate:this.rate/100
        }).then(res=>{
          if(res.data.Code == 1){
            this.$message.success('返利成功')
          }else{
            this.$message.error(res.data.Msg)
          }
        })
      }
    },

    //返利给用户
    backUser(){
      this.$http.storePost(this.$api.ReturnUserIntegrals,{
        Mobile:this.userPhone,
      }).then(res=>{
        if(res.data.Code == 1){
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  padding-top:30px;
}
.input-line{
  position: relative;
  width:380px;
  margin:0 auto 20px;
  label{
      position: absolute;
      top:0;
      right:380px;
      width:200px;
      font-size:14px;
      line-height: 50px;
      color:#464855;
      text-align: right;
      padding-right:15px;
  }
  .input-box{
    input{
      display: block;
      box-sizing: border-box;
      width:380px;
      height:50px;
      border:1px solid @class_border;
      padding:0 15px;
      font-size:14px;
      &.readonly{
          background:@readOnly;
      }
    }
    .tip{
       font-size:14px;
       color:@subtitle_color;
       line-height: 50px;
    }
    .persent{
      position: absolute;
      font-size:;
    }
  }
   .submit{
      width:100%;
      height:50px;
      color:#fff;
      font-size:16px;
      background:@main;
      border:0;
      margin:20px auto 100px;
    }
}
@media screen and(max-width:@change_width){
  .content {
    padding-top: 56px;
    .input-line {
      width: 92%;
      margin-bottom: 46px;
      label {
        left: 0;
        height: 38px;
        line-height: 38px;
        top: -38px;
        text-align: left;
      }
      .input-box {
        input {
          width: 100%;
        }
      }
    }
    .input-line-integral {
      display: flex;
      margin-top: -25px;
      margin-bottom: 10px;
      label {
        position: static;
        width: 84px;
        height: 50px;
        line-height: 50px;
      }
      .input-box {

      }
    }
  }
}
</style>
