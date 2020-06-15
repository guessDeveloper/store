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
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
              :action="uploadImgUrl"
              :file-list="fileList"
              :limit="1"
              list-type="picture">
              <button size="small" type="primary" class="upload-btn">选择上传文件</button>
              <span slot="tip" class="tip">只能上传jpg/png文件，且不超过1M</span>
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
         <input type="text">
       </div>
       <div class="input-line-box">
         <button class="btn submit">立即充值</button>
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
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        bannerUrl:'',
        value: '',
        infos:{
          BeginEndWorkTime: "0:19-1:19",
          Logo: "http://files.youledui.com/Uploadfiles/image/20200615/9795572b-725a-4e6c-a298-e7582a621bf8.jpg",
          Name: "你好a2",
          Site: "北京市东城区前门大都市街17号北6号楼",
          TelPhpne: "15297692091",
          URl: null,
          describe: null,
        }
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
        }
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
  }
</style>