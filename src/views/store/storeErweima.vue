<template>
  <div class="erweima">
    <div class="persion-title">二维码管理</div>
    <div class="img-list">
      <div class="btn-box">
         <button @click="toNew =true">生成新的二维码</button>
      </div>

      <ul>
        <li v-for="(item,index) in list" :key="index">
           <img :src="item.QRcodeImage" alt="">
           <div class="name">{{item.QRcodeName}}</div>
           <div class="iconfont el-icon-close" @click="deleteImg(item.QRcodeName)"></div>
        </li>

      </ul>
    </div>
     <el-dialog title="生成新的二维码" :visible.sync="toNew" custom-class="custom-dialog">
       <div class="dialog-content-wrap">
          <div class="input-line">
            <label for="">请输入桌号：</label><input type="text" placeholder="请输入桌号" v-model.trim="addNum" >
          </div>
          <div class="btn-box">
            <button class="ok" @click="addImg">添加</button>
            <button class="no" @click="toNew =false">取消</button>
          </div>
       </div>
     </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      toNew:false,
      pageIndex:1,
      pageSize:20,
      list:[],
      addNum:''
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    //初始化列表
    init(){
      this.pageIndex = 1;
      this.getList();
    },
    getList(){
      this.$http.storePost(this.$api.GetQuickMakList,{pageIndex:this.pageIndex,pageSize:this.pageSize}).then(res=>{
        if(res.data.Code == 1){
          this.list = res.data.Data?res.data.Data.list:[]
        }else{
          this.list = []
          this.$message.error(res.data.Msg)
        }
        
      })
    },
    //添加二维码
    addImg(){
      if(this.addNum == ''){
        this.$message.error('请输入桌号')
        return false
      }else{
        this.$http.storePost(this.$api.AddMyQuickMak,{Name:this.addNum}).then(res=>{
          if(res.data.Code == 1){
            this.$message.success('添加成功');
            this.toNew = false;
            this.addNum = '';
            this.init();
          }else{
            this.$message.error(res.data.Msg)
          }
        })
      }
    },
    //删除二维码
    deleteImg(name){
      this.$http.storePost(this.$api.DeleteQuickMak,{QRcodeName:name}).then(res=>{
        if(res.data.Code == 1){
          this.$message.success('删除成功')
          this.init();
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.erweima{
  min-height: @persion_height;
  background:#fff;
}

.img-list{
  padding:0 30px;
  .btn-box{
    .clear();
    margin:0;
    padding:30px 0 40px 0;
    button{
      float: right;
      width:178px;
      height:40px;
      font-size:14px;
      color:@main;
      border-radius:0;
      border:1px solid @main;
    }
  }
  ul{
    overflow: hidden;
    li{
      position: relative;
      box-sizing: border-box;
      float: left;
      width:290px;
      height:322px;
      margin:0 30px 40px 0;
      border:1px solid @class_border;
      border-radius:;
      &:nth-of-type(3n){
        margin-right:0;
      }
      img{
        display: block;
        width:210px;
        height:210px;
        margin:40px 40px 0 40px;
      }
      .name{
        font-size:14px;
        text-align: center;
        line-height: 12px;
        margin-top:30px;
      }
      .iconfont{
        position: absolute;
        top:15px;
        right:15px;
        font-size:14px;
        color:@subtitle_color;
        cursor: pointer;
      }
    }
  }
}
.input-line{
  margin-top:30px;
  label{
    display: inline-block;
    width:72px;
    font-size:12px;
    line-height: 34px;
    margin-right:9px;
  }
  input{
    display: inline-block;
    box-sizing: border-box;
    width:399px;
    height:34px;
    padding:0 12px;
    font-size:12px;
    border:1px solid @class_border;
  }
}
  .btn-box{
      .clear();
      margin-top:40px;
      button{
        float: right;
        width:65px;
        height:30px;
        font-size:14px;
        margin-left:15px;
        background:#fff;
        border:1px solid @class_border;
        border-radius: 4px;
      }
      .ok{
        color:#fff;
        background:@main;
        border-color:@main;
      }
    }
@media screen and(max-width:@change_width){
  .img-list {
    padding: 0 15px;
    .btn-box {
      padding: 15px;
      margin: 0 -15px;
      border-bottom: 10px solid #F8F8F8;
      button {
        width: 100%;
        margin-left: 0;
      }
    }
    ul {
      li {
        float: none;
        margin: 20px auto 0;
      }
    }
  }
  .dialog-content-wrap {
    .input-line {
      input {
        width: calc(100% - 82px);
      }
    }
  }
}
</style>
