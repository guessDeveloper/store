<template>
  <div class="store-page">
    <div class="persion-title">
       基本信息
    </div>
    <div class="content">
       <div class="input-line">
          <label for="">邀请链接：</label><div class="input-box"><input type="text" value="https://miaosha.youledui.com/#5398175" readonly class="readonly"></div>
       </div>
       <div class="input-line">
         <label for="">商家名称：</label><div class="input-box"><input type="text" placeholder="请输入商家名称"></div>
       </div>
       <div class="input-line">
         <label for="">请输入商家名称：</label><div class="input-box"><input type="text" placeholder="请输入商家描述"></div>
       </div>
       <div class="input-line">
         <label for="">商家LOGO：</label><div class="input-box">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <button size="small" type="primary" class="upload-btn">选择上传文件</button>
              <span slot="tip" class="tip">只能上传jpg/png文件，且不超过1M</span>
            </el-upload>
          </div>
       </div>
       <div class="input-line">
         <label for="">商家介绍：</label><div class="input-box">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture">
              <button size="small" type="primary" class="upload-btn">选择上传文件</button>
              <span slot="tip" class="tip">可以上传多个图片和短视频</span>
            </el-upload>
          </div>
       </div>
        <div class="input-line">
         <label for="">商家地址：</label><div class="input-box">
            <input type="text" >
          </div>
       </div>
        <div class="input-line">
         <label for="">请选择商家分类：</label><div class="input-box" style="height:50px;">
              <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
       </div>
        <div class="input-line">
         <label for="">联系方式：</label><div class="input-box"><input type="text" placeholder="请输入联系方式"></div>
       </div>
        <div class="input-line">
         <label for="">营业时间：</label><div class="input-box"><input type="text" placeholder="请输入营业时间"></div>
       </div>
        <div class="input-line">
         <label for="">商家网址：</label><div class="input-box"><input type="text" placeholder="请输入商家网址"></div>
       </div>
        <div class="input-line">
         <label for="">商家奖励比例：</label><div class="input-box"><input type="text" placeholder="商家默认奖励比例"></div>
       </div>
       <div class="input-line">
         <button class="submit">提交</button>
       </div>
    </div>
  </div>
</template>
<script>
import '@/plugins/element-upload.js'
export default {
  data(){
   return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
   methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
}
</script>
<style lang="less" scoped>
.store-page{
  min-height: @persion_height;
  background:#fff;
}
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
}
.submit{
  width:100%;
  height:50px;
  color:#fff;
  font-size:16px;
  background:@main;
  border:0;
  margin:30px auto 100px;
}
</style>