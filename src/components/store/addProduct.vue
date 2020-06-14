<template>
  <div class="box">
    <div class="input-line-box">
          <label for="">请选择产品分类：</label>
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
          <label for="">产品名称：</label>
          <input type="text" maxlength="50">
    </div>
    <div class="input-line-box">
          <label for="">产品描述：</label>
          <input type="text" maxlength="1000">
    </div>
    <div class="input-line-box">
      <label for="">产品图片：</label><div class="input-box">
            <el-upload
              class="upload-demo"
              action="/up"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              accept=".jpg,.png"
              :file-list="fileList"
              :beforeUpload="beforeLogoUpload"
              name="FileContent"
              list-type="picture">
              <button size="small" type="primary" class="upload-btn">选择上传文件</button>
              <span slot="tip" class="tip">只能上传jpg/png文件，且不超过1M</span>
            </el-upload>
          </div>
    </div>
    <div class="input-line-box">
          <label for="">产品价格：</label>
          <input type="text" maxlength="1000">
    </div>
     <div class="input-line-box textarea">
          <label for="">产品详情：</label>
          <textarea></textarea>
    </div>
     <div class="input-line-box">
          <label for="">奖励比例：</label>
          <input type="text" maxlength="3">
    </div>
     <div class="input-line-box">
           <label for="">返积分数量：</label><div class="input-box"><span class="tip">自动计算用户返积分数量</span> </div>
         </div>
      <div class="input-line-box">
           <button class="submit" @click="btnCheck">确定</button>
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
        value: ''
    }
  },
  methods:{
    beforeLogoUpload(){
      
    }
  }
}
</script>
<style lang="less" scoped>
.box{
  padding-top:20px;
  padding-bottom:100px;
}
 .input-line-box{
    position: relative;
    width:380px;
    height:50px;
    margin-left:160px;
    margin-bottom:20px;
    &.textarea{
      width:500px;
      height:auto;
    }
    label{
      position: absolute;
      right:100%;
      top:0;
      width:100px;
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
    textarea{
      box-sizing: border-box;
      display:block;
      width: 100%;
      height:400px;
      border:1px solid @class_border;
      font-size:14px;
      padding:15px;
      outline: none;
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
   
  }
    .upload-btn{
      width:126px;
      height:40px;
      font-size: 14px;
      color:#fff;
      background:@main;
      border:0;
    }
    .tip{
      font-size:12px;
      color:@subtitle_color;
      padding-left:20px;
    }
  }
</style>