<template>
  <div class="menager-box">
   <div class="persion-title">充值中心</div>
   <div class="money-box">
     <div class="banner">
       <img :src="bannerUrl" alt="">
     </div>
     <div class="big-box">
       <div class="input-line-box">
          <label for="">充值金额：</label>
           <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.price"
            :label="item.price"
            :value="item.price">
          </el-option>
          </el-select>
       </div>
       <div class="input-line-box">
         <label>商家名称：</label>
         <input type="text" v-model.trim="infos.Name">
       </div>
       <div class="input-line-box">
          <label>商家描述：</label>
         <input type="text" v-model.trim="infos.describe">
       </div>
       <div class="input-line-box" style="height:auto;">
         <label for="">商家LOGO：</label><div class="input-box">
            <el-upload
              class="upload-demo"
              :action="uploadImgUrl()"
              :file-list="fileList"
              accept=".jpg,.png"
              :limit="1"
              :beforeUpload="beforeLogoUpload"
              list-type="picture-card"
              name="FileContent"
              >
               <i class="el-icon-plus" v-if="fileList.length == 0"></i>
              <!-- <button size="small" type="primary" class="upload-btn" v-show="fileList.length == 0">选择上传文件</button> -->
              <span slot="tip" class="tip" v-show="fileList.length == 0">只能上传jpg/png文件，且不超过1M</span>
            </el-upload>
          </div>
       </div>
       <div class="input-line-box">
         <label>商家网址：</label>
         <input type="text" v-model.trim="infos.URl">
       </div>
      <div class="input-line-box">
         <label>商家地址：</label>
         <input type="text" v-model.trim="infos.Site">
       </div>
        <div class="input-line-box">
         <label>联系方式：</label>
         <input type="text" v-model.trim="infos.TelPhpne">
       </div>
       <div class="input-line-box">
         <label>营业时间：</label>
          <el-time-picker
            is-range
            v-model="time"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
       </div>
       <div class="input-line-box">
         <button class="btn submit" @click="Recharge">立即充值</button>
       </div>
     </div>
   </div>
  </div>
</template>
<script>
import '@/plugins/element-upload.js'
export default {
  data(){
    return{
       options: [],
        fileList:[],
        bannerUrl:'',
        value: '',
        time:'',
        infos:{
         
        },
        
    }
  },
  mounted(){
    this.getConfig();
  },
  methods:{
    getConfig(){
      this.$http.storePost(this.$api.SelectRechargeMoney).then(res=>{
        if(res.data.Code == 1){
            this.bannerUrl = res.data.Data.RechangeBanner
            this.infos = res.data.Data.MerchantInfo
            if(this.infos.BeginWorkTime !== ''){
              this.time = [new Date(this.infos.BeginWorkTime),new Date(this.infos.EndWorkTime)]
            }
            if(this.infos.Logo){
              this.fileList.push({url:this.infos.Logo})
            }
            this.options=res.data.Data.Recharge
        }
      })
    },
    //充值
    Recharge(){
      this.$http.storePost(this.$api.Recharge,{
        price:this.value,
        type:0,
        Name: this.infos.Name,
        describe: this.infos.describe,
        Logo: this.fileList[0].url,
        site: this.infos.Site,
        TelPhone: this.infos.TelPhpne,
        BeginWorkTime: this.time[0],
        EndWorkTime: this.time[1],
        URl: this.infos.URl
      }).then(res=>{
        console.log(res)
      })
    },
    uploadImgUrl(){
        return process.env.NODE_ENV === 'production' ? 'http://files.youledui.com/create?dir=image' : '/up/create?dir=image'
    },
  }
}
</script>
<style lang="less" scoped>
.big-box{
  padding-bottom:100px;
}
.banner{
  margin:30px;
  img{
    display: block;
    width:100%;
  }
}
 .input-line-box{
    position: relative;
    width:380px;
    height:50px;
    margin:0 auto;
    margin-bottom:20px;
    label{
      position: absolute;
      right:100%;
      top:0;
      width:90px;
      height:50px;
      line-height: 50px;
      color:#464855;
    }
    .code{
      position: absolute;
      top:0;
      width:100px;
      height:50px;
      font-size:14px;
      text-align: right;
      padding-right:20px;
      right:0;
      color:@main;
    }
    input{
        display: block;
        box-sizing: border-box;
        width:100%;
        height:50px;
        border:1px solid @class_border;
        font-size:14px;
        padding:0 15px;
    }
    .submit{
      width:100%;
      height:50px;
      color:#fff;
      font-size:16px;
      background:@main;
      border:0;
      // margin:30px auto 100px;
    }
    .upload-btn{
      width:126px;
      height:40px;
      font-size: 14px;
      color:#fff;
      background:@main;
      border:0;
    }
  }
</style>