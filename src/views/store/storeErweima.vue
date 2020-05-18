<template>
  <div class="erweima">
    <div class="persion-title">二维码管理</div>
    <div class="img-list">
      <div class="btn-box">
         <button @click="toNew =true">生成新的二维码</button>
      </div>

      <ul>
        <li>
           <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589718303262&di=b832f5d361dfd07b9dc22ca49f50d55e&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D3571592872%2C3353494284%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1200%26h%3D1290" alt="">
           <div class="name">001号桌</div>
           <div class="iconfont el-icon-close"></div>
        </li>
        <li>
           <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589718303262&di=b832f5d361dfd07b9dc22ca49f50d55e&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D3571592872%2C3353494284%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1200%26h%3D1290" alt="">
           <div class="name">001号桌</div>
           <div class="iconfont el-icon-close"></div>
        </li>
        <li>
           <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589718303262&di=b832f5d361dfd07b9dc22ca49f50d55e&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D3571592872%2C3353494284%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1200%26h%3D1290" alt="">
           <div class="name">001号桌</div>
           <div class="iconfont el-icon-close"></div>
        </li>
        <li>
           <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589718303262&di=b832f5d361dfd07b9dc22ca49f50d55e&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D3571592872%2C3353494284%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1200%26h%3D1290" alt="">
           <div class="name">001号桌</div>
           <div class="iconfont el-icon-close"></div>
        </li>
        <li>
           <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589718303262&di=b832f5d361dfd07b9dc22ca49f50d55e&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D3571592872%2C3353494284%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1200%26h%3D1290" alt="">
           <div class="name">001号桌</div>
           <div class="iconfont el-icon-close"></div>
        </li>
      </ul>
    </div>
     <el-dialog title="生成新的二维码" :visible.sync="toNew" width="520px">
       <div class="input-line">
          <label for="">请输入桌号：</label><input type="text" placeholder="请输入桌号">
       </div>
        <div class="btn-box">
                  <button class="ok">添加</button>
                  <button class="no">取消</button>   
        </div>
     </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      toNew:false
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
</style>