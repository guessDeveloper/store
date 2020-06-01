<template>
 <div class="nav-bar-box">
    <div class="box clear">
        <a href="" class="logo">
            <img src="../../assets/img/logo.png" alt="">
        </a>
        <a href="" class="sao">
            <span class="iconfont iconyd_saoyisao"></span>
        </a>
        <a class="menu" @click="openNav" v-show="!navIsOpen">
            <span class="iconfont iconyd_gengduo"></span>
        </a>
        <a class="menu" v-show="navIsOpen" @click="closeNav">
            <span class="el-icon-close"></span>
        </a>
        <div class="nav-box" >
            <router-link :to="item.path" v-for="(item,index) in navList" :key="index" tag="a" :class="{active:nowPath == item.path||nowName == item.name}" @click.native="goRouter(item.path)" target="_blank">{{item.name}}</router-link>
        </div>
        <div class="search-box" v-show="!navIsOpen">
            <div class="input-box">
             <el-dropdown trigger="click" class="select">
                <span class="el-dropdown-link">
                   {{nowName}}<span class="iconfont icon-arrow-downYellow"></span>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index) in navList" :key="index">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
                <!-- <div class="select" >
                    拼多多<span class="iconfont icon-arrow-downYellow"></span>
                </div> -->
                <input type="text" placeholder="输入商品关键词">
            </div>
            <a href="" class="btn">
                <span class="iconfont iconsousuo"></span><span class="name">搜索</span>
            </a>
        </div>
    </div>
     <div class="nav-list" :class='{open:navIsOpen}'>
            <router-link :to="item.path" v-for="(item,index) in navList" :key="index" tag="a" :class="{active:nowPath == item.path||nowName == item.name}" @click.native="goRouter(item.path)" target="_blank">{{item.name}}</router-link>
     </div>
 </div>
</template>
<script>
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
           },{
               name:'商城返利',
               path:'/storeList'
           },{
               name:'逛街购物',
               path:'/shop'
           },{
               name:'美食广场',
               path:'/food'
           }],
           nowName:'首页',
           navIsOpen:false
        }
    },
    computed:{
       
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
    },
    methods:{
        goRouter(){
            this.nowPath = this.$route.path;
           
        },
        openNav(){
            this.navIsOpen = true
            document.querySelector('body').style.height = '100%';
            document.querySelector('body').style.overflow = 'hidden';
        },
        closeNav(){
            this.navIsOpen = false
            document.querySelector('body').style.height = 'auto';
            document.querySelector('body').style.overflow = 'auto';
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
        width:60%;
    }
    .search-box{
        width:100%;
        margin-top:14px;
        position: relative;
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
  }
}
</style>