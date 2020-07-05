<template>
 <div class="nav-bar-box">
    <div class="box clear">
        <a href="" class="logo">
            <img src="../../assets/img/logo.png" alt="">
        </a>
        <a  class="sao" tag="a"  @click="sao">
            <span class="iconfont iconyd_saoyisao"></span>
        </a>
        <a class="menu" @click="openNav" v-show="!navIsOpen">
            <span class="iconfont iconyd_gengduo"></span>
        </a>
        <a class="menu" v-show="navIsOpen" @click="closeNav">
            <span class="el-icon-close"></span>
        </a>
        <div class="nav-box" >
            <router-link :to="item.path" v-for="(item,index) in navList" :key="index" tag="a" :class="{active:nowPath == item.path||nowName == item.name}" @click.native="goRouter(item.path)" >{{item.name}}</router-link>
        </div>
        <div class="search-box" v-show="!navIsOpen" :class="{'has-car':showCar&&isLogin}">
             <!-- <div class="search-box has-car" v-show="!navIsOpen" :class="{'has-car':showCar&&isLogin}"> -->
            <div class="input-box">
             <el-dropdown trigger="click" class="select" @command="chengeSelect">
                <span class="el-dropdown-link">
                   {{nowSelect}}<span class="iconfont icon-arrow-downYellow"></span>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index) in option" :key="index" :command="item">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
                <!-- <div class="select" >
                    拼多多<span class="iconfont icon-arrow-downYellow"></span>
                </div> -->
                <input type="text" placeholder="输入商品关键词" v-model.trim="searchContent">
            </div>
            <a  class="btn" @click="search">
                <span class="iconfont iconsousuo"></span><span class="name">搜索</span>
            </a>
        </div>
        <router-link class="shop-car" :class="{show:showCar&&isLogin}" tag="div" to="/shopCar" v-show="!navIsOpen">
            <span class="iconfont icongwc"></span>美食订单 <span class="num" v-show="charNowNum>0||charNum>0">{{charNum>0?charNum:charNowNum}}</span>
        </router-link>
        
    </div>
     <div class="nav-list" :class='{open:navIsOpen}'>
            <router-link :to="item.path" v-for="(item,index) in navList" :key="index" tag="a" :class="{active:nowPath == item.path||nowName == item.name}" @click.native="goRouter(item.path)" >{{item.name}}</router-link>
     </div>
     <div class="back" :class="{show:navIsOpen}" @click="closeNav"></div>
 </div>
</template>
<script>
import jsQR from 'jsqr';
import Quagga from 'quagga';
import { mapState, mapGetters,mapMutations} from 'vuex' //注册 action 和 state
export default {
    data(){
        return{
           nowPath:'/',
           navList:[{
               name:'首页',
               path:'/'
           },{
               name:'淘宝',
               path:'/taobao',
               child:[
                   {
                       path:'/taobaoList',
                       name:'淘宝列表'
                   }
               ]
           },{
               name:'拼多多',
               path:'/Pdd',
               child:[
                   {
                       path:'/special',
                       name:'活动页面'
                   }
               ]
           },{
               name:'商城返利',
               path:'/storeList'
           },{
               name:'逛街购物',
               path:'/shop',
               child:[
                   {
                       path:'/shopDetail',
                       name:'淘宝列表'
                   }
               ]
           },{
               name:'美食广场',
               path:'/food',
               child:[
                   {
                       path:'/fooddetail',
                       name:'美食详情'
                   }
               ]
           }],
           searchContent:'',
           option:[
               {
                  path:['/','/taobo','/taobaoList'],
                  name:'淘宝',
                  query:this.$api.GetGoodsByKey,
                  type:'taobao'
               },{
                  path:['/Pdd','/productDetail'],
                  name:'拼多多',
                  query:this.$api.pddGetGoodsByKey,
                  type:'pdd' 
               },{
                  path:['/storeList'],
                  name:'商城返利',
                  query:this.$api.storeGJKeyWordSearch,
                  type:'store' 
               },{
                  path:['/shop','/shopDetail','/shopGoodsDetail'],
                  name:'逛街购物',
                  query:this.$api.GJKeyWordSearch,
                  type:'shop' 
               },{
                  path:['/food','/fooddetail','/earthDetail','/shopCar','/foodList'],
                  name:'美食广场',
                  query:this.$api.MSKeyWordSearch,
                  type:'food' 
               }
           ],
           nowName:'首页',
           nowSelect:'',
           nowSearchUrl:'',
           navIsOpen:false,
           searchType:'',
           showCar:false,
           showCarList:['/fooddetail','/earthDetail','/shopCar','/foodList'],
        //    charNowNum:0,
        }
    },
    computed:{
     ...mapState([
       'isLogin',
       'charNum',
       'myCar',
       'userInfo'
       
     ]),
     ...mapGetters([
         'charNowNum'
     ])
    },
    watch:{
     $route: {
        handler() {
        //    this.showCarList.forEach(item=>{
        //        if(item == this.$route.path){
        //            this.showCar = true
        //        }
        //    })
            this.closeNav();
            this.nowPath = this.$route.path
            this.navList.forEach((item)=>{
                if(item.path == this.nowPath){
                    this.nowName = item.name
                }
            item.child&&item.child.forEach(item2=>{
                if(item2.path == this.nowPath){
                    this.nowName = item.name
                }
            })
            })
            console.log(this.charNowNum,'eeee')
            if(this.$route.query.type){
                this.option.forEach((item)=>{
                    if(item.type ==this.$route.query.type){
                        this.nowSelect = item.name
                        this.nowSearchUrl = item.query
                        this.searchType = item.type
                    }
                })
            }else{
                
                this.option.forEach((item)=>{
                    item.path.forEach((item2)=>{
                    if(item2 == this.nowPath){
                        this.nowSelect = item.name
                        this.nowSearchUrl = item.query
                        this.searchType = item.type
                    }
                    })
                })
                if(this.nowSelect == ''){
                    this.nowSelect = this.option[0].name
                    this.nowSearchUrl = this.option[0].query
                        this.searchType = this.option[0].type
                }
            }
            if(this.$route.query.content){
                this.searchContent = this.$route.query.content
            }
            this.showCarList.forEach(item=>{
                if(item == this.$route.path){
                    this.showCar = true
                }
            })
            if(this.$route.path == '/productDetail'&&this.$route.query.GoodType == 2){
                this.nowPath = '/taobao',
                this.searchType = 'taobao'
                this.nowName = '淘宝'
            }
             if(this.$route.path == '/productDetail'&&this.$route.query.GoodType == 1){
                this.nowPath = '/Pdd',
                this.searchType = 'pdd'
                this.nowName = '拼多多'
            }
        },
        deep: true,
    },
    myCar:{
        handler(){
           let num = 0;
            for (let element in this.myCar) {
                if (this.myCar[element].goodsList) {
                    for (let item in this.myCar[element].goodsList) {
                        num++
                    }
                }
            }
           
           this.changeNum(num)
           localStorage.setItem("carObject", JSON.stringify(this.myCar));
        },
        deep:true,
    }
   },
    mounted(){
        this.nowPath = this.$route.path
        this.navList.forEach((item)=>{
            if(item.path == this.nowPath){
                this.nowName = item.name
            }
           item.child&&item.child.forEach(item2=>{
               if(item2.path == this.nowPath){
                   this.nowName = item.name
               }
           })
        })
        console.log(this.charNowNum,'eeee')
        if(this.$route.query.type){
            this.option.forEach((item)=>{
                if(item.type ==this.$route.query.type){
                    this.nowSelect = item.name
                    this.nowSearchUrl = item.query
                    this.searchType = item.type
                }
             })
        }else{
            
             this.option.forEach((item)=>{
                item.path.forEach((item2)=>{
                if(item2 == this.nowPath){
                    this.nowSelect = item.name
                    this.nowSearchUrl = item.query
                     this.searchType = item.type
                }
                })
             })
             if(this.nowSelect == ''){
                 this.nowSelect = this.option[0].name
                  this.nowSearchUrl = this.option[0].query
                     this.searchType = this.option[0].type
             }
        }
        if(this.$route.query.content){
            this.searchContent = this.$route.query.content
        }
        this.showCarList.forEach(item=>{
            if(item == this.$route.path){
                this.showCar = true
            }
        })
        if(this.$route.path == '/productDetail'&&this.$route.query.GoodType == 2){
                this.nowPath = '/taobao',
                this.searchType = 'taobao'
                this.nowName = '淘宝'
        }
        if(this.$route.path == '/productDetail'&&this.$route.query.GoodType == 1){
            this.nowPath = '/Pdd',
            this.searchType = 'pdd'
            this.nowName = '拼多多'
        }
    },
    methods:{
        ...mapMutations([
            'changeNum',
            'setUserInfo'
        ]),
        goRouter(){
            this.nowPath = this.$route.path;
           
        },
        openNav(){
            console.log(1)
            this.navIsOpen = true
            document.querySelector('body').style.height = '100%';
            document.querySelector('body').style.overflow = 'hidden';
        },
        closeNav(){
            this.navIsOpen = false
            document.querySelector('body').style.height = 'auto';
            document.querySelector('body').style.overflow = 'auto';
        },
        chengeSelect(item){
            this.nowSelect = item.name
            this.nowSearchUrl = item.query
            this.searchType = item.type
        },
        search(){
          if(this.searchContent == ''){
            this.$message.error('请输入关键字')
          }else{
            this.$router.push(`/search?type=${this.searchType}&content=${this.searchContent}`)
          }
         
        },
        //点击扫一扫
        sao(){
            let _this = this;
            if(this.isLogin){
                // // this.$router.push('/sao')
                // if(this.$util.isAndorid()){
                //      this.$router.push('/sao')
                // }else{
                //     let inputUploadObj = document.createElement('input')
                // inputUploadObj.setAttribute('id', 'input_upload_ID');
                // inputUploadObj.setAttribute('type', 'file');
                // // 添加这个属性，就可以唤起相机的功能
                // inputUploadObj.setAttribute('capture', 'camera');
                // // 这里如果不加属性 accept 是 "image/*" 或者 "video/*"，就默认打开摄像头，既可以拍照也可以录像
                // inputUploadObj.setAttribute('accept', 'image/*');
                // inputUploadObj.setAttribute("style", 'visibility:hidden');
                // // 这里将创建的隐式input控件拼接到body的最后面，会增加页面的长度，所以要在适当的时候，移除掉这个隐式创建的input控件
                // document.body.appendChild(inputUploadObj);
                // // 这里是模拟点击了input控件
                // inputUploadObj.click();
                // var c = document.getElementById("qrcanvas");
                // var ctx = c.getContext("2d");
                // inputUploadObj.addEventListener('change',function(evt){
                    
                //     var file = evt.target.files[0];
			    //     let reader = new FileReader();
                //     reader.readAsDataURL(file);
                //     reader.onloadend = function() {
                //         alert(1)
                //         var img = new Image();
                //         img.src = reader.result;
                //         alert(reader.result,'sss')
                //         img.onload = function(){
                //             alert('2')
                //             c.width = img.width;
                //             c.height = img.height;
                //             ctx.drawImage(img, 0, 0, img.width, img.height);
                //             var imageData = ctx.getImageData(0, 0, img.width, img.height).data;
                            
                //             var loading = _this.$loading({
                //                 lock: true,
                //                 text: '正在识别中',
                //                 spinner: 'el-icon-loading',
                //                 background: 'rgba(0, 0, 0, 0.7)'
                //             });
                //             var code = jsQR(imageData, img.width, img.height, {
                //                 inversionAttempts: 'dontInvert'
                //             });
                            
                //             if(code){
                //                 loading.close()
                //                 // window.location.href = code.data
                //             }else{
                //                 loading.close()
                //                 _this.$message.error('识别失败请重试')
                //                 inputUploadObj.value = ''
                //             }
                //         }
                        
                        
                //     }

                // },false)
                // }
                
                window.location.href = './static/que/index.html'
            }else{
                
                this.$router.push('/login')
                
            }
        }
    },
}
</script>
<style lang="less" scoped>

.nav-bar-box{
    width:100%;
    height:100px;
    line-height: 100px;
    background: #fff;
    text-align: center;
    .nav-list{
        display: none;
    }
    .box{
   
        width:@max-width;
        height: 100%;
        margin:0 auto;
        background: #fff;
        overflow: hidden;
        .logo{
            float: left;
            width:174px;
            margin-top:27px;
            margin-right:56px;
            img{
                display: block;
                width:100%;
            }
        }
        .sao{
            display: none;
        }
        .menu{
            display: none;
        }

        .nav-box{
            float: left;
            height:100%;
            font-size:0;
            a{
                display: inline-block;
                height: 100%;
                line-height: 100px;
                font-size:16px;
                color:@font_color;
                margin-right:40px;
                transition: color ease .3s;
                &:hover{
                    color:@main;
                }
                &.active{
                    color:@main;
                    position: relative;
                    &::after{
                        content:'';
                        display: block;
                        position: absolute;
                        width:30px;
                        height:3px;
                        background:@main;
                        left:50%;
                        transform: translateX(-50%);
                        bottom:0;
                    }
                }
            }
        }
        .search-box{
            float:right;
            height:40px;
            margin-top:30px;
            .input-box{
                float: left;
                width:298px;
                height:36px;
                border:2px solid @main;
                .select{
                    float: left;
                    width:81px;
                    color:@main;
                    font-size:14px;
                    line-height: 36px;
                    outline: none;
                    cursor: pointer;
                    .iconfont{
                        // float:right;
                        // margin-right:29px;
                        // margin-top:18px;
                        margin-left:5px;
                        font-size:5px;
                        vertical-align: middle;
                    }
                }
                input{
                    float: left;
                    margin-top:8px;
                    border:0;
                    height:20px;
                    line-height: 20px;
                    font-size: 14px;
                }

            }
            .btn{
                float: left;
                width:100px;
                height:40px;
                line-height: 40px;
                font-size:18px;
                color:#fff;
                background:@main;
                .iconfont{
                    margin-right:8px;
                }
            }
        }
        .shop-car{
            display: none;
        }
    }
}
@media screen and(max-width:@change_width){
  .nav-bar-box{
    position: relative;
    box-sizing: border-box;
    width:100%;
    height:115/@p;
    padding:0 15/@p 15/@p;
    background:#fff;
    z-index: 200;
        .box{
             position: relative;
            width:100%;
            overflow:inherit;
            .logo{
            width:auto;
            width:94/@p;
            height:25px;
            margin-top:17/@p;
            img{
                height:100%;
            }
        }
    .nav-box{
        display: none;
        position: absolute;
        top:60/@p;
        background: #fff;
        z-index: 300;
    }
    .sao{
        display: block;
        position: absolute;
        top:22px;
        right:35px;
        width:16px;
        height:16px;
        line-height: 16px;
        font-size:16px;
        color:@main;
        .iconfont{
            font-size:16px;
        color:@main;
        }
    }
    .menu{
        display: block;
         position: absolute;
         top:22px;
         right:0px;
        width:16px;
        height:16px;
        line-height: 16px;
        font-size:16px;
        color:@main;
    }
    input{
        width:59%;
    }
    .search-box{
        float: left;
        width:100%;
        margin-top:14px;
        position: relative;
        &.has-car{
            width:calc(100% - 124px);
        }
        .input-box{
            width:100%;
            height:40px;
            box-sizing: border-box;
             .select{
                float: left;
                width:81px;
                color:@main;
                line-height: 36px;
                .iconfont{
                    line-height: 36px;
                    color:@main;
                    font-size:5px;
                }
            }
        }
        .btn{
            position: absolute;
            top:0;
            right:0;
            width:50/@p;
            .name{
                display: none;
            }
            .iconfont{
                margin-right:0px;
            }
        }
    }
        }
    .shop-car{
        float: right;
        width:114px;
        height:36px;
        line-height: 36px;
        border:2px solid @main;
        text-align:center;
        font-size:12px;
        color:@main;
        margin-top: 14px;
        &.show{
            display: block;
        }
        .iconfont{
            font-size:14px;
            margin-right:3px;
        }
        .num{
            color:#fff;
            border-radius: 50%;
            background:#D51B32;
            height:14px;
            padding:0 4px;
        }
    }
    .nav-list{
        display: none;
        position: absolute;
        width:100%;
        left:0;
        top:60/@p;
        background: #fff;
        z-index: 300;
        box-sizing: border-box;
        padding:0 30/@p 15/@p;
        &.open{
            display: block;
            height:auto;
            a{
               display:block;
               margin:0;
               line-height: 54px;
               text-align: left;
               font-size:16px;
               border-bottom: 1px solid @class_border;
               color:#0B0B17;
               &:nth-last-child(1){
                   border:0;
               }
            }
        }
    }
    .back{
        display: none;
        position: absolute;
        top:60px;
        left:0;
        
        width:100%;
        height:100vh;
        background:rgba(0,0,0,.5);
        z-index: 100;
        &.show{
            display: block;
        }
    }
  }
}
</style>