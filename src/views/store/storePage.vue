<template>
  <div :class="['store-page', {'store-page-center': enterpriseSet}]">
    <div class="persion-title">
       基本信息
    </div>
    <div class="content">
       <div class="input-line link">
          <label for="">邀请链接：</label><div class="input-box"><input type="text" :value="infos.Invitelink" readonly class="readonly"><button class="copy" :data-clipboard-text="infos.Invitelink">复制</button></div>
       </div>
       <div class="input-line">
         <label for="">商家名称：</label><div class="input-box"><input type="text" placeholder="请输入商家名称" v-model="infos.Name" maxlength="20" ><span class="limit">{{infos.Name?infos.Name.length:0}}/20</span></div>
       </div>
       <div class="input-line">
         <label for="">商家描述：</label><div class="input-box"><input type="text" placeholder="请输入商家描述" v-model.trim="infos.describe" maxlength="300"><span class="limit">{{infos.describe?infos.describe.length:0}}/300</span></div>
       </div>
       <div class="input-line">
         <label for="">商家LOGO：</label><div class="input-box">
            <el-upload
              class="upload-demo"
              :action="uploadImgUrl()"
              :on-preview="handlePreview"
              :on-remove="logoRemove"
              :on-success="logoSuccess"
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
       <div class="input-line">
         <label for="">商家介绍：</label><div class="input-box">
            <el-upload
              class="upload-demo"
              :action="changeUrl"
              :on-success="mp4Success"
              :on-remove="handleRemove"
              :on-change="uploadChane"
              :data="sendData"
              :on-preview="handlePictureCardPreview"
              name="FileContent"
              accept=".jpg,.png,.mp4"
              :beforeUpload="beforeBannerUpload"
              multiple
              :file-list="desMp4"
              ref="mp4Uploader"
              :auto-upload="false"
             >
              <button size="small" type="primary" class="upload-btn">选择上传文件</button>
              <span slot="tip" class="tip">可以上传多个图片和短视频</span>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <div class="dialog-content-wrap">
              <img width="100%" :src="dialogImageUrl" alt="">
              </div>
            </el-dialog>
             <el-dialog :visible.sync="dialogVideo" :before-close="videoClose" :custom-class="'dilog'">
              <div class="dialog-content-wrap" style="margin-top:20px;" >
                <div class="video-box">
                <video width="100%" :src="VideoRul" alt="" height="350px" controls ref="video"></video>
                </div>
              </div>
            </el-dialog>
          </div>
       </div>
        <div class="input-line">
         <label for="">商家地址：</label><div class="input-box">
            <input type="text"  @click="showMap = true" v-model="address" maxlength="50"><span class="limit">{{address?address.length:0}}/50</span>
          </div>
       </div>
        <div class="input-line">
         <label for="">请选择商家分类：</label><div class="input-box" style="height:50px;">
              <el-select v-model="value" placeholder="请选择"  @change="changeClass">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>

          </div>
          <div class="input-box" style="height:50px;margin-top:20px;" v-show="value!==''">
              <el-select v-model="secondOptionValue" placeholder="请选择" @change="setCat" >
                <el-option
                  v-for="item in secondOption"
                  :key="item.Id"
                  :label="item.CategoryName"
                  :value="item.Id">
                </el-option>
            </el-select>

          </div>
       </div>
        <div class="input-line">
         <label for="">联系方式：</label><div class="input-box"><input type="text" placeholder="请输入联系方式" v-model.trim="infos.TelPhone"></div>
       </div>
        <div class="input-line">
         <!-- <label for="">营业时间：</label><div class="input-box"><input type="text" placeholder="请输入营业时间" ></div> -->
         <label for="">营业时间：</label><div class="input-box">
           <el-time-picker
            is-range
            v-model="time"
             :editable="false"
              :clearable="false"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
          </div>
       </div>
        <div class="input-line">
         <label for="">商家网址：</label><div class="input-box"><input type="text" placeholder="请输入商家网址" v-model="netWork" maxlength="50"><span class="limit">{{netWork?netWork.length:0}}/50</span></div>
       </div>
        <div class="input-line">
         <label for="">商家奖励比例：</label><div class="input-box percent"><input type="text" placeholder="请输入1至60整数" v-model.trim="infos.ReturnPercent"><div class="danwei">%</div></div>
       </div>
       <div class="input-line">
         <button class="submit" @click="submit">提交</button>
       </div>
       <el-dialog title="选择地址" :visible.sync="showMap" width="520px" class="small">
         <Map @getLocation="addressClick" :defaultPoint="defaultPoint" @close="showMap = false"></Map>
       </el-dialog>
    </div>

    <!-- 移动端个人中心 -->
    <div class="small-nav-list">
      <ul :class="{isfood:storeInfo.BigCatgroup == '1'}">
        <li class="" v-for="(item,index) in smallNav" :key="index" :class="{erwima:item.contor == true}">
            <router-link tag="a" :to="item.to" @click.native="routerChange(item.to)" ><span class="iconfont" :class="item.icon" :style="'font-size:'+item.iconSize+';'"></span>{{item.title}}<span class="iconfont iconjiantou"></span></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// const beforeUrl = 'https://files.youledui.com';
let beforeUrl = '';
import '@/plugins/clipboard.js'
import '@/plugins/element-upload.js'
import '@/plugins/element-dataPicker.js'
import Map from '@/components/store/map'
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
class Photo {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}
export default {
  data(){
   return {
        showMap:false,
        fileList: [],
        options: [{
          value: '0',
          label: '逛街购物'
        }, {
          value: '1',
          label: '美食广场'
        }],
        secondOption:[],
        value: '',
        secondOptionValue:'',
        invetUrl:'',
        logoUrl:'',
        desMp4:[],
        mp4List:[],
        changeUrl:'',
        netWork:'',
        sendData:{
          dir:'media'
        },
        lat:'',//经度
        lng:'',//纬度
        address:'', //地址
        addressCity:'',
        defaultPoint:{}, //初始化商家地址
        infos:{
          BeginWorkTime:"",
          Category: "",
          EndWorkTime:"",
          Invitelink: "",
          Logo: "",
          Name: "",
          PointX: '',
          PointY: '',
          ReturnPercent: "",
          TelPhone: "",
          URl: '',
          describe: '',
          introduce: '',
          phone: "",
        },
        smallNav: [
          {
            title:"商家账号",
            to:'/store?basicInfo=true',
            icon:"iconsjzh",
            iconSize:'15px'
          },
          {
            title:"安全设置",
            to:'/storeSafe',
            icon:"iconaqsz",
            iconSize:'15px'
          },
           {
            title:"分类管理",
            to:'/storeClassify',
            icon:"iconflgl",
            iconSize:'15px'
          },
          {
            title:"产品管理",
            to:'/storeProduct',
            icon:"iconcpgl",
            iconSize:'15px'
          },
         
          {
            title:"二维码管理",
            to:'/storeErweima',
            icon:"iconewmgl",
            iconSize:'15px',
             contor:true
          },
          {
            title:"订单管理",
            to:'/storeOrder',
            icon:"iconddgl",
            iconSize:'15px',
             contor:true
          },
          {
            title:"积分管理",
            to:'/storeScore',
            icon:"iconjfgl",
            iconSize:'15px'
          },
          {
            title:"扫码返奖励积分",
            to:'/storeReturn',
            icon:"iconsmfjl",
            iconSize:'15px'
          }
        ],
        time:'',
        Clipboard:'',
        dialogImageUrl:'',
        dialogVisible:false,
        dialogVideo:false,
        VideoRul:'',

      }
  },
  computed:{
    ...mapState([
       'storeInfo',
       'isLogin'
    ]),
    uploadMp4Url(){
      return this.changeUrl
    },
    // 商家个人中心
    enterpriseSet() {
      return JSON.stringify(this.$route.query) === '{}'
    }
  },
  components:{
    Map:Map
  },
  mounted(){
    beforeUrl = this.$util.beforeUrl;
    const _this = this;
    this.Clipboard = new this.clipboard('.copy');
    this.Clipboard.on('success', function(e) {

    _this.$message.success('复制成功')
    e.clearSelection();
    });

    this.Clipboard.on('error', function() {
        _this.$message.error('复制失败')
    });
    this.getStoreInfo();
  },
  beforeDestroy(){
    this.Clipboard.destroy();
    this.clipboard = ''
  },
   methods: {
      ...mapMutations([
      'setStoreInfo'
    ]),
    //获取用户登录信息
     getStoreInfo(){
      this.$http.storePost(this.$api.MerchanterMerchanter).then(res=>{
        if(res.data.Code == 1){
         
           let userInfo = JSON.stringify(res.data.Data);
           this.setStoreInfo(res.data.Data)
           sessionStorage.setItem('storeUserInfo',userInfo)
        }
      })
    },
      handleRemove(file, fileList) {
        console.log(file,fileList,'remove') 
        let index = '';
        this.desMp4.forEach((element,t)=>{
           if(element.uid == file.uid){
             index = t
           }
        })
        console.log(index)
        index!==''?this.desMp4.splice(index,1):''
        console.log(this.desMp4,'remove')
      },
      videoClose(){
        document.querySelector('video').pause();
        this.VideoRul = '';
        this.dialogVideo = false

      },
      handlePreview(){

      },
      handlePictureCardPreview(file) {
        if(/.mp4/.test(file.url)){
          this.dialogVideo = true
          this.VideoRul = file.url
        }else{
          this.dialogImageUrl = file.url;
           this.dialogVisible = true;
        }
        
      },
      uploadImgUrl(){
        return process.env.NODE_ENV === 'production' ? 'https://files.youledui.com/create?dir=image' : '/up/create?dir=image'
      },
      getStoreInfo(){
        this.$http.storePost(this.$api.MerchanterMerchanter).then(res=>{
          if(res.data.Code == 1){
            this.infos = res.data.Data
            if(this.infos.Logo){
              this.fileList=[];
              this.fileList.push(new Photo(this.infos.Logo,this.infos.Logo))
              this.logoUrl = this.infos.Logo
            }
            if(this.infos.introduce){
              this.desMp4 = [];
              this.infos.introduce.forEach(element => {
                  this.desMp4.push(new Photo(element,element))
              })
            }
            if(this.infos.PointX){
              this.defaultPoint.lng =this.infos.PointX
              this.defaultPoint.lat = this.infos.PointY
              this.lng = this.infos.PointX
              this.lat = this.infos.PointY
            }
            if(this.infos.BeginWorkTime !== ''){
              this.time = [new Date(this.infos.BeginWorkTime),new Date(this.infos.EndWorkTime)]
            }
            if(this.infos.BigCatgroup){
              this.value = this.infos.BigCatgroup
              this.getStoreClass();
            }
            if(this.infos.Category){
              this.secondOptionValue = this.infos.Category
            }
            this.infos.URl?this.netWork = this.infos.URl:''
            this.infos.Address?this.address = this.infos.Address:''
            this.addressCity = this.infos.CityName
          }
        })
      },
      getStoreClass(){
        this.$http.storePost(this.$api.GetMerchantCategory,{
          BigCatgroup:this.value,
          // token:localStorage.getItem('storeToken') ? localStorage.getItem('storeToken') : ''
        }).then(res=>{
          if(res.data.Code == 1){
            this.secondOption = res.data.Data
          }
        })
      },
      changeClass(){
         this.secondOptionValue = ''
         this.getStoreClass();
      },
      setCat(value){
        this.infos.Category = value
      },
      beforeLogoUpload(file){
         var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'png'
        const isLt2M = file.size / 1024 / 1024 <= 1
        if(!extension && !extension2) {
            this.$message({
                message: '上传文件只能是 jpg、png格式!',
                type: 'error'
            })
            return false
        }
        if(!isLt2M) {
            this.$message({
                message: '上传文件大小不能超过 1MB!',
                type: 'error'
            })
            return false
        }
        return extension || extension2 && isLt2M
      },
      //logo 上传成功
      logoSuccess(file,fileList){
        if(file.Code == 1){
          this.logoUrl = beforeUrl+file.Data;
          this.fileList = [];
          this.fileList.push(fileList)
        }
      },
      mp4Success(file,fileList){
         if(file.Code == 1){
          //  this.desMp4.push(beforeUrl+file.Data)
          fileList.url = beforeUrl + file.Data
          this.desMp4.push(fileList)

         }
         console.log(fileList,this.desMp4,'ttt')
      },
      //logo 删除
      logoRemove(){
        this.logoUrl = ''
      },
      uploadChane(file){
        console.log('change')
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'png'
        const extension3 = testmsg === 'mp4'
        if(extension || extension2){
          this.changeUrl= process.env.NODE_ENV === 'production' ? 'https://files.youledui.com/create?dir=image' : '/up/create?dir=image'
        }
        if(extension3){
          this.changeUrl= process.env.NODE_ENV === 'production' ? 'https://files.youledui.com/create?dir=media' : '/up/create?dir=media'
        }
        setTimeout(()=>{
          this.$refs.mp4Uploader.submit()
        })
      },

      beforeBannerUpload(file){
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'png'
        const extension3 = testmsg === 'mp4'
        const isLt2M = file.size / 1024 / 1024 <= 10
        // if(extension || extension2){
        //   this.uploadMp4Url= '/up/create?dir=image'
        // }
        // if(extension3){
        //   this.uploadMp4Url= '/up/create?dir=media'
        // }
        if(!extension && !extension2 && !extension3) {
            this.$message({
                message: '上传文件只能是 jpg、png、mp4格式!',
                type: 'error'
            });
            return false
        }
        if(!isLt2M) {
            this.$message({
                message: '上传文件大小不能超过 10MB!',
                type: 'error'
            });
            return false
        }
        return extension || extension2 || extension3&& isLt2M
      },
    addressClick(res){
      this.address = res.address.surroundingPois[0].address
      this.lat = res.address.point.lat
      this.lng = res.address.point.lng
      this.addressCity = res.address.addressComponents.city
      this.showMap = false
    },
    // 提交
    submit(){
      if(this.infos.Name == ''){
        this.$message.error('请输入商家名称')
      }else if(this.infos.describe == ''){
        this.$message.error('请输入商家描述')
      }else if(this.logoUrl == ''){
        this.$message('请上传logo')
      }else if(this.desMp4.length == 0){
        this.$message.error('请上传商家介绍图')
      }else if(this.address==''){
        this.$message.error('请选择商家地址')
      }else if(this.infos.Category == ''){
        this.$message.error('请选择商家分类')
      }else if(this.infos.TelPhone == ''){
        this.$message.error('请输入联系方式')
      }else if(this.time == ''){
        this.$message.error('请选择营业时间')
      }else if(this.infos.ReturnPercent == ''||this.infos.ReturnPercent>60||this.infos.ReturnPercent<0){
        this.$message.error('请输入0-60商家奖励比例')
      }else{
        let logo = this.logoUrl.replace(this.$util.testBeforeUrl,'');
        let imgList = [];
        this.desMp4.filter(element => {
             imgList.push(element.url.replace(this.$util.testBeforeUrl,''))
        });
        this.$http.storePost(this.$api.ChangeMyInfo,{
          MerchantName:this.infos.Name,
          TelPhone:this.infos.TelPhone,
          Address:this.address,
          PointX:this.lng,
          PointY:this.lat,
          Remark:this.infos.describe,
          MerchantLogo:logo,
          ShowImgs:imgList,
          Category:this.infos.Category,
          URl:this.netWork,
          BigworkTime:this.time[0],
          EndworkTime:this.time[1],
          BdCityName:this.addressCity,
          ReturnPercent:this.infos.ReturnPercent
        }).then(res=>{
          if(res.data.Code == 1){
            // this.$message.success('修改信息成功，正在审核中请稍后！！')
            this.$message({
              type:'success',
              message:res.data.Data,
              onClose:function(){
                window.location.reload()
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
              }
            })
            // this.getStoreInfo();
          }else{
            this.$message.error(res.data.Msg)
          }
        })
      }
    }
    },

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
    position: relative;
    &.percent{
      overflow: hidden;
      input{
        float:left;
        width:350px;
      }
      .danwei{
        float: right;
        line-height: 50px;
      }
    }
    
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
    .limit{
      position:absolute;
      right:1px;
      top:1px;
      background:#fff;
      padding-left:20px;
      padding-right:10px;
      line-height: 48px;

    }

  }
  .copy{
    position:absolute;
    right:-80px;
    top:8px;
    width:70px;
    height:34px;
    margin-left:30px;
    color:@main;
    font-size:12px;
    border:1px solid @main;
    border-radius: 34px;
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
.small-nav-list {
  display: none;
  .margin{
    width:100%;
    height:10px;
    background:@body_color;
  }
  ul{
    padding: 0 15px;
    &.isfood{
      li{
        &.erwima{
          display: block;
        }
      }
    }
    li{
      height:50/@p;
      line-height: 50/@p;
      &.erwima{
        display: none;
      }
      a{
        display: block;
        font-size:14px;
        color:@persion_left;
        border-bottom:1px solid @class_border;
        .iconfont{
          margin-right:10px;
          color:@placeholder_color;
        }
        .iconjiantou{
          float:right;
          font-size:10px;
        }
      }
    }
  }
}
@media screen and(max-width:@change_width) {
  .store-page-center {
    .small-nav-list {
      display: block;
    }
    .persion-title {
      display: none;
    }
    .content {
      display: none;
    }
  }
  .store-page {
    min-height: auto;
    margin-bottom: 100px;
    .content {
      padding-top: 60px;
      .input-line {
        width: 92%;
        margin-bottom: 46px;
        &.link{
          .input-box{
            
            input{
              width:calc(100% - 80px);
            }
            .copy{
              right:0;
            }
          }
        }
        label {
          left: 0;
          right: auto;
          top: -38px;
          width: auto;
          line-height: 38px;
        }
        .input-box {
          &.percent{
              display: flex;
              input{
                float:left;
              }
              .danwei{
                float: right;
                width:20px;
                text-align: right;
                line-height: 50px;
              }
            }
          input {
            width: 100%;
          }
        }
        .submit {
          margin-top: 0;
        }
      }
    }
  }
}
.video-box{
  background:#000;
}
</style>
