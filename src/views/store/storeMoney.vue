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
            :label="item.label"
            :value="item.price">
          </el-option>
          </el-select>
       </div>
       <div class="input-line-box">
         <label>商家名称：</label>
         <input type="text" v-model="infos.Name" maxlength="20">
         <span class="limit">{{infos.Name.length}}/50</span>

       </div>
       <div class="input-line-box">
          <label>商家描述：</label>
         <input type="text" v-model="infos.describe" maxlength="300">
         <span class="limit">{{infos.describe.length}}/300</span>
       </div>
       <div class="input-line-box" style="height:auto;">
         <label for="">商家LOGO：</label><div class="input-box">
            <el-upload
              class="upload-demo"
              :action="uploadImgUrl()"
              
              accept=".jpg,.png"
              :beforeUpload="beforeLogoUpload"
              name="FileContent"
              :on-success="logoSuccess"
              :show-file-list="false"
              >
                <img :src="fileList" alt=""  class="upload-img" v-show="fileList !== ''">
               <i class="el-icon-plus" v-if="fileList == ''"></i>
              <!-- <button size="small" type="primary" class="upload-btn" v-show="fileList.length == 0">选择上传文件</button> -->
              <span slot="tip" class="tip" >只能上传jpg/png文件，且不超过1M</span>
            </el-upload>
          </div>
       </div>
       <div class="input-line-box">
         <label>商家网址：</label>
         <input type="text" v-model="infos.URl" maxlength="50">
         <span class="limit">{{infos.URl.length}}/50</span>
       </div>
      <div class="input-line-box">
         <label>商家地址：</label>
         <input type="text" v-model="infos.Site" maxlength="50">
          <span class="limit">{{infos.Site.length}}/50</span>
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
             :editable="false"
            :clearable="false"
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
// const beforeUrl = 'https://files.youledui.com';
let beforeUrl = '';
import '@/plugins/element-upload.js'
export default {
  data(){
    return{
       options: [],
        fileList:'',
        bannerUrl:'',
        value: '',
        time:'',
        infos:{

        },

    }
  },
  mounted(){
    beforeUrl = this.$util.beforeUrl;
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
              this.fileList = this.infos.Logo
            }
            res.data.Data.Recharge.filter(item=>{
              item.label = item.price+'元'
            })
            this.options=res.data.Data.Recharge
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    },
    logoSuccess(file){
      if(file.Code == 1){
          this.fileList = beforeUrl+file.Data
        }
    },
     beforeLogoUpload(file){
         var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'png'
        const isLt2M = file.size / 1024 / 1024 <= 1
        if(!extension && !extension2) {
            this.$message({
                message: '上传文件只能是 jpn、png格式!',
                type: 'error'
            });
        }
        if(!isLt2M) {
            this.$message({
                message: '上传文件大小不能超过 1MB!',
                type: 'error'
            });
        }
        return extension || extension2 && isLt2M
      },
    //充值
    Recharge(){
      let logo = this.fileList.replace(this.$util.testBeforeUrl,'')
      this.$http.storePost(this.$api.Recharge,{
        price:this.value,
        type:0,
        Name: this.infos.Name,
        describe: this.infos.describe,
        Logo: logo,
        site: this.infos.Site,
        TelPhone: this.infos.TelPhpne,
        BeginWorkTime: this.time[0],
        EndWorkTime: this.time[1],
        URl: this.infos.URl
      }).then(res=>{
        if(res.data.Code == 1){
           window.open(res.data.Data.Url,'_blank')
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    },
    uploadImgUrl(){
        return process.env.NODE_ENV === 'production' ? 'https://files.youledui.com/create?dir=image' : '/up/create?dir=image'
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
.upload-demo{
  .upload-img{
    vertical-align: baseline;
    display: inline-block;
    width:100px;
    height:100px;
  }
  .el-icon-plus{
    width:100px;
    height:100px;
    line-height: 100px;
    border:1px solid @class_border;
  }
  .tip{
    display: block;
    line-height: 20px;

  }
}


 .input-line-box{
    position: relative;
    width:380px;
    height:50px;
    margin:0 auto;
    margin-bottom:20px;
     .limit{
      position:absolute;
      right:1px;
      top:1px;
      background:#fff;
      padding-left:20px;
      padding-right:10px;
      line-height: 48px;

    }

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
@media screen and(max-width:@change_width){
  .menager-box {
    .money-box {
      .banner {
        margin: 15px;
      }
      .big-box {
        padding-top: 30px;
        .input-line-box {
          width: 92%;
          margin-bottom: 46px;
          label {
            left: 0;
            height: 38px;
            line-height: 38px;
            top: -38px;
          }
        }
      }
    }
  }
}
</style>
