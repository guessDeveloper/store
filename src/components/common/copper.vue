<template>
  <div>
    <el-dialog :visible.sync="isShow" append-to-body custom-class="custom-dialog">
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper ref="cropper" :img="imgUrl" :outputSize="option.size" :outputType="option.outputType" :info="true" :canScale="option.canScale" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" :fixed="option.fixed" :fixedNumber="option.fixedNumber" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :centerBox="option.centerBox" :infoTrue="option.infoTrue" :full="option.full" :enlarge="option.enlarge" :mode="option.mode"></vueCropper>
        </div>
      </div>
      <div class="btn-box">
        <button class="ok" @click="finish">确认</button>
        <button class="no" @click="isShow = false">取消</button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import '../../plugins/vue-copper.js'
export default {
  data() {
    return {
      option: {
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        info: true, // 裁剪框的大小信息
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 120, // 默认生成截图框宽度
        autoCropHeight: 120, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        canMove: true, // 上传图片是否可以移动
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        full: false, // 是否输出原图比例的截图
        enlarge: '1', // 图片根据截图框输出比例倍数
        mode: 'contain' // 图片默认渲染方式
      },
      isShow: false
    }
  },
  props: {
    imgUrl: {

    },
    fileName: {

    }
  },
  methods: {
    //显示弹框
    showCopper() {
      this.isShow = true
    },
    //剪裁
    finish() {
      this.$refs.cropper.getCropData((data) => {
        // this.$emit('finish', this.dataURLtoFile(data, this.fileName))
        this.$emit('finish', data)
      })
    },
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let len = bstr.length
      let u8arr = new Uint8Array(len)
      while (len--) {
        u8arr[len] = bstr.charCodeAt(len)
      }
      return new File([u8arr], filename, { type: mime })
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.cropper-content {
  width: 100%;
  height: 300px;
  margin-top: 20px;
  .cropper {
    width: auto;
    height: 300px;
  }
}
.btn-box {
  .clear();
  margin-top: 40px;
  button {
    float: right;
    width: 65px;
    height: 30px;
    font-size: 14px;
    margin-left: 15px;
    background: #fff;
    border: 1px solid @class_border;
    border-radius: 4px;
  }
  .ok {
    color: #fff;
    background: @main;
    border-color: @main;
  }
}
</style>