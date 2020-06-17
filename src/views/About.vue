<template>
  <div class="about">
    <!-- <input type="file">sfs  -->
    <canvas class="can" id="can"></canvas>
    <video src="" id="video" ></video>
  </div>
</template>
<script>
import jsQR from 'jsqr';
export default {
  data(){
    return{
      height:400,
      timer:''
    }
  },
  mounted(){
    const _this = this;
    this.height = window.innerHeight;
    console.log(window.navigator.getUserMedia)
    if ( window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia){
    //调用用户媒体设备，访问摄像头
    this.getUserMedia({
        video:{width:480,height:320}
    },function(res){
      console.log(res)
      var CompatibleURL = window.URL || window.webkitURL;
      console.log(CompatibleURL)
      var video = document.getElementById("video");
      //将视频流设置为video元素的源
      video.srcObject = res;   // 此处的代码将会报错  解决的办法是将video的srcObject属性指向stream即可
      //播放视频
      video.play();
      var canvas = document.querySelector('#can');
      var context = canvas.getContext("2d");
      clearInterval(_this.timer)
      _this.timer = setInterval(()=>{
        console.log('time')
        context.drawImage(video, 0, 0, canvas.width = video.videoWidth, canvas.height = video.videoHeight);
        var imageData=context.getImageData(0,0,canvas.width,canvas.width);
        console.log(imageData)
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });
        if(code){
          window.location.replace = code.data
        }
      },1000)

    },'');
      } else {
          alert("你的浏览器不支持访问用户媒体设备");
      }
  },
  methods:{
    //访问用户媒体设备的兼容方法
      getUserMedia(constrains,success,error){
          if(window.navigator.mediaDevices.getUserMedia){
              //最新标准API
              window.navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
          } else if (window.navigator.webkitGetUserMedia){
              //webkit内核浏览器
              window.navigator.webkitGetUserMedia(constrains).then(success).catch(error);
          } else if (window.navigator.mozGetUserMedia){
              //Firefox浏览器
              window.navagator.mozGetUserMedia(constrains).then(success).catch(error);
          } else if (window.navigator.getUserMedia){
              //旧版API
              window.navigator.getUserMedia(constrains).then(success).catch(error);
          }
      }
  },
  successss(stream){
    console.log(stream)
    var CompatibleURL = window.URL || window.webkitURL;
    var video = document.getElementById("video");
    //将视频流设置为video元素的源
    video.src = CompatibleURL.createObjectURL(stream);   // 此处的代码将会报错  解决的办法是将video的srcObject属性指向stream即可
    //播放视频
    video.play();
    
    
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.about{
  width:100%;
  height:100%;
  background:#000;
}
  video{
    width:100%;
    height:100vh;
  }
 .can{
   display: none;
   width:100%;
   height:100vh;
 }
</style>
