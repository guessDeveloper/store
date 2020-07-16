<template>
  <div class="box">
    <div class="persion-title" >
       产品详情
    </div>
    <div class="margin"></div>
    <!-- <div class="input-line-box" >
          <label for="">请选择产品分类：</label>
           <el-select v-model="value" placeholder="请选择">
               <el-option
                v-for="item in classOption"
                :key="item.CategoryID"
                :label="item.CategoryName"
                :value="item.CategoryID">
                </el-option>
          </el-select>
    </div> -->
    <div class="input-line-box">
          <label for="">产品名称：</label>
          <input type="text" maxlength="20" v-model.trim="productName">
           <span class="limit">{{productName.length}}/20</span>
    </div>
    <div class="input-line-box">
          <label for="">产品描述：</label>
          <input type="text" maxlength="500" v-model.trim="des" style="padding-right:70px;">
           <span class="limit">{{des.length}}/500</span>
    </div>
    <!-- <div class="input-line-box" style="height:auto;">
      <label for="">产品详情图：</label><div class="input-box" >
            <el-upload
              class="upload-demo"
              :action="uploadImgUrl()"
              accept=".jpg,.png"
              :on-remove="mainRemove"
              :file-list="fileList"
              :beforeUpload="beforeLogoUpload"
              name="FileContent"
              :on-success="mainSuccess"
              :limit='1'
              list-type="picture">
              <button size="small" type="primary" class="upload-btn" v-show="mainUrl == ''">选择上传文件</button>
              <span slot="tip" class="tip" v-show="mainUrl == ''">只能上传jpg/png文件，且不超过1M</span>
            </el-upload>
        </div>
    </div> -->
    <div class="input-line-box">
          <label for="">产品价格：</label>
          <input type="text" maxlength="1000" v-model.trim="price">
    </div>
     <!-- <div class="input-line-box textarea">
          <label for="">产品详情：</label>
          <textarea v-model="detail"></textarea>
    </div> -->
     <div class="input-line-box" style="height:auto;">
        <label for="">产品详情图：</label><div class="input-box">
            <el-upload
              class="upload-demo"
              :action="uploadImgUrl()"
              accept=".jpg,.png"
              :file-list="detialFileList"
              :beforeUpload="beforeLogoUpload"
              :on-success="detailSuccess"
              :on-remove="detailRemove"
              name="FileContent"
              list-type="picture">
              <button size="small" type="primary" class="upload-btn">选择上传文件</button>
              <span slot="tip" class="tip">只能上传jpg/png文件，且不超过1M</span>
            </el-upload>
        </div>
    </div>
     <!-- <div class="input-line-box">
          <label for="">奖励比例：</label>
          <input type="text" maxlength="2" v-model.trim="rate" placeholder="请输入1至60的整数">
          <span class="percent">%</span>
    </div> -->
     
       <div class="input-line-box input-line-box-shelf">
         <label>是否上架：</label>
         <el-switch
          v-model="online"
          active-color="#F38A1D"
          inactive-color="#ff4949">
        </el-switch>
       </div>
       <div class="input-line-box input-line-box-shelf">
         <label>发布时间：</label>
         <div class="input-box">{{detail.CreaterTimr}}</div>
       </div>
       <div class="input-line-box input-line-box-shelf">
         <label>奖励比例：</label>
         <div class="input-box">{{rate}}%</div>
       </div>
        <div class="input-line-box input-line-box-shelf">
           <label for="">返积分数量：</label><div class="input-box">{{backScore}}<span class="tip"></span> </div>
         </div>
         <div class="input-line-box input-line-box-shelf">
         <label>分类：</label>
         <div class="input-box">{{detail.Cat}}</div>
       </div>
       <div class="input-line-box input-line-box-shelf">
         <label>状态：</label>
         <div class="input-box">{{detail.state}}</div>
       </div>
      <div class="input-line-box">
           <button class="submit" @click="btnCheck">确定</button>
      </div>
  </div>
</template>
<script>
class Photo {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}
// const beforeUrl = 'https://files.youledui.com';
let beforeUrl = '';
import '@/plugins/element-upload.js'
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
export default {
  data(){
    return{
       classOption: [],
        value: '',
        fileList:[],
        price:'',
        des:'',
        detail:'',
        rate:'', //返利比例
        online:true, //是否上架
        productName:'', //产品名称
        detialFileList:[],
        mainUrl:'',
        detialList:[],
        id:'',
    }
  },
  mounted(){
    beforeUrl = this.$util.beforeUrl;
    this.getClass();
    if(this.$route.query.id){
      this.id = this.$route.query.id
      this.getDetail();
    }
  },
  computed:{
    ...mapState([
      'ScoreRate'
    ]),
    backScore(){
      if(this.price!==''&&this.rate!==''){
       return this.price*this.rate/100*this.ScoreRate
      }else{
        return '自动计算用户返积分数量'
      }
    }
  },
  methods:{
    //获取产品分类
    getClass(){
        this.$http.storeGet(this.$api.GetProductCategory).then(res=>{
            if(res.data.Code == 1){
                this.classOption = res.data.Data;
                
            }
        })
    },
    //获取产品详情
    getDetail(){
      this.$http.storePost(this.$api.ShowProduct,{
        ProductId:this.id
      }).then(res=>{
        if(res.data.Code == 1){
           this.detail = res.data.Data
           this.productName = this.detail.Name
           this.rate = this.detail.fanli.replace(/%/,'')
           this.des = this.detail.title;
           if(this.detail.Isshangjia == "上架"){
             this.online = true
           }else{
             this.online = false
           }
           this.price = this.detail.price
           this.value = this.detail.CatID
           this.detail.PicList.forEach(element=>{
             this.detialFileList.push(new Photo(element,element))
           })
        }
      })
    },
     uploadImgUrl(){
        return process.env.NODE_ENV === 'production' ? 'https://files.youledui.com/create?dir=image' : '/up/create?dir=image'
      },
    beforeLogoUpload(file){
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      const isLt2M = file.size / 1024 / 1024 <= 5
      if(!extension && !extension2) {
          this.$message({
              message: '上传文件只能是 jpg、png格式!',
              type: 'error'
          });
          return false
      }
      if(!isLt2M) {
          this.$message({
              message: '上传文件大小不能超过 5MB!',
              type: 'error'
          });
           return false
      }
      return extension || extension2 && isLt2M
    },
    //主图上传成功
    mainSuccess(file,fileList){

      if(file.Code == 1){
        this.mainUrl =  beforeUrl+ file.Data
        console.log(this.mainUrl)
      }
    },
    mainRemove(){
      this.mainUrl = ''
    },
    //详情图上传成功
    detailSuccess(file,fileList){
      if(file.Code ==1){
        fileList.url = beforeUrl +file.Data
         this.detialFileList.push(fileList)
      }
    },
    detailRemove(file){
       let Index = '';
       this.detialFileList.forEach((element,index) => {
         if(element.uid == file.uid){
           Index = index
         }
       });
       Index !==''?this.detialFileList.splice(Index,1):''
    },
    btnCheck(){
      if(this.value == ''){
        this.$message.error('请选择分类')
      }else if(this.productName == ''){
         this.$message.error('请输入产品名称')
      }else if(this.des == ''){
        this.$message.error('请输入产品描述')
      }else if(this.price == ''){
        this.$message.error('请输入价格')
      }else if(this.detialFileList.length==0){
        this.$message.error('上传产品详情图')
      }else if(this.rate == ''){
        this.$message.error("请输入奖励比例")
      }else{
        let imgList = [];
        this.detialFileList.forEach(element=>{
          imgList.push(element.url.replace(this.$util.testBeforeUrl,''))
        })
        this.$http.storePost(this.$api.EditProduct,{
          ProductID:this.id,
          ProductName:this.productName,
          ProductImg:imgList[0],
          ProductPrice:this.price,
          ProductDescribe:this.des,
          CatID:this.value,
          UpOrDown:this.online?1:0,
          picList:imgList,
          Rate:this.rate/100
        }).then(res=>{
          if(res.data.Code == 1){
            this.$message.success('修改成功')
            this.$router.push('/storeProduct')
          }else{
            this.$message.error(res.data.Msg)
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.box{
  padding-bottom:100px;
}
.margin{
  height:30px;
}
 .input-line-box{
    position: relative;
    width:380px;
    height:50px;
    line-height:50px;
    margin-left:160px;
    margin-bottom:20px;
    .limit{
      position: absolute;
      right:12px;
      bottom:0;
    }
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
      padding-right:15px;
      text-align: right;
      line-height: 50px;
      color:#464855;
    }
    .percent{
      position:absolute;
      width:50px;
      text-align:center;
      left:100%;
      top:0;
      line-height:50px;
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
  @media screen and(max-width:@change_width){
    .box {
      .margin{
        padding-top:50px;
      }
      .input-line-box {
        margin: 0 auto 46px;
        width: 92%;
        label {
          line-height: 38px;
          top: -38px;
          right: auto;
          left: 0;
          text-align: left;
        }
        .percent {
          width: 4%;
          max-width: 50px;
        }
        .input-box {
          .tip {
            font-size: 12px;
          }
        }
      }
      .input-line-box-integral {
        display: flex;
        height: 50px;
        line-height: 50px;
        margin: -30px auto 0;
        label {
          position: static;
          line-height: 50px;
        }
      }
      .input-line-box-shelf {
        display: flex;
        align-items: center;
        padding-left: 75px;
        box-sizing: border-box;
        margin-bottom: 25px;
        label {
          top: 0;
          line-height: 50px;
        }
      }
    }
  }
</style>
