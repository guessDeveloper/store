<template>
    <section class="classFy">
        <ul>
            <li @mouseover="showHover = true" @mouseleave="showHover= fasle">
                <a>服装</a><span>/</span><a href="">毛衫</a><span>/</span><a>外衣</a> <span class="iconfont iconjinruyindao"></span>
                <div class="banner-class" :class="{show:showHover == true}">
                        <div class="title clear">
                            <h3>分类推荐</h3><span>根据您的购买或浏览记录推荐</span>
                        </div>
                        <ul class="class-box clear">
                            <li class="clear">
                                <img src="../../assets/img/brand.png" alt="">
                                <div  class="des">
                                    <div class="name">芒果新鲜水果 热带水果</div>
                                    <div class="subtitle"> 匠心剪裁，垂感质</div>
                                    <div class="price">¥249</div>
                                </div>
                            </li>
                            <li class="clear">
                                <img src="../../assets/img/brand.png" alt="">
                                <div  class="des">
                                    <div class="name">芒果新鲜水果 热带水果</div>
                                    <div class="subtitle"> 匠心剪裁，垂感质</div>
                                    <div class="price">¥249</div>
                                </div>
                            </li>
                            <li class="clear">
                                <img src="../../assets/img/brand.png" alt="">
                                <div  class="des">
                                    <div class="name">芒果新鲜水果 热带水果</div>
                                    <div class="subtitle"> 匠心剪裁，垂感质</div>
                                    <div class="price">¥249</div>
                                </div>
                            </li>
                            <li class="clear">
                                <img src="../../assets/img/brand.png" alt="">
                                <div  class="des">
                                    <div class="name">芒果新鲜水果 热带水果</div>
                                    <div class="subtitle"> 匠心剪裁，垂感质</div>
                                    <div class="price">¥249</div>
                                </div>
                            </li>
                            <li class="clear">
                                <img src="../../assets/img/brand.png" alt="">
                                <div  class="des">
                                    <div class="name">芒果新鲜水果 热带水果</div>
                                    <div class="subtitle"> 匠心剪裁，垂感质</div>
                                    <div class="price">¥249</div>
                                </div>
                            </li>
                            <li class="clear">
                                <img src="../../assets/img/brand.png" alt="">
                                <div  class="des">
                                    <div class="name">芒果新鲜水果 热带水果</div>
                                    <div class="subtitle"> 匠心剪裁，垂感质</div>
                                    <div class="price">¥249</div>
                                </div>
                            </li>
                            <li class="clear">
                                <img src="../../assets/img/brand.png" alt="">
                                <div  class="des">
                                    <div class="name">芒果新鲜水果 热带水果</div>
                                    <div class="subtitle"> 匠心剪裁，垂感质</div>
                                    <div class="price">¥249</div>
                                </div>
                            </li>
                            <li class="clear">
                                <img src="../../assets/img/brand.png" alt="">
                                <div  class="des">
                                    <div class="name">芒果新鲜水果 热带水果</div>
                                    <div class="subtitle"> 匠心剪裁，垂感质</div>
                                    <div class="price">¥249</div>
                                </div>
                            </li>
                            <li class="clear">
                                <img src="../../assets/img/brand.png" alt="">
                                <div  class="des">
                                    <div class="name">芒果新鲜水果 热带水果</div>
                                    <div class="subtitle"> 匠心剪裁，垂感质</div>
                                    <div class="price">¥249</div>
                                </div>
                            </li>

                        </ul>
                </div>
            </li>
            <li>
                <a>餐厨</a><span>/</span><a href="">餐具</a><span>/</span><a>茶具</a><span class="iconfont iconjinruyindao"></span>
            </li>
            <li>
                <a>电器</a><span>/</span><a href="">数码产品</a><span class="iconfont iconjinruyindao"></span>
            </li>
            <li>
                <a>配件</a><span>/</span><a href="">行李箱</a><span>/</span><a>女鞋</a><span class="iconfont iconjinruyindao"></span>
            </li>
            <li>
                <a>居家</a><span>/</span><a href="">床品套件</a><span>/</span><a>被枕</a><span class="iconfont iconjinruyindao"></span>
            </li>
            <li>
                <a>洗护</a><span>/</span><a href="">洗发护发</a><span>/</span><a>美妆</a><span class="iconfont iconjinruyindao"></span>
            </li>
            <li>
                <a>婴童</a><span>/</span><a href="">儿童服饰</a><span>/</span><a>玩具</a><span class="iconfont iconjinruyindao"></span>
            </li>
            <li>
                <a>杂货</a><span>/</span><a href="">户外</a><span>/</span><a>文具</a><span class="iconfont iconjinruyindao"></span>
            </li>
            <li>
                <a>饮食</a><span>/</span><a href="">坚果炒货</a><span>/</span><a>肉制品</a><span class="iconfont iconjinruyindao"></span>
            </li>
        </ul>
        
    </section>
</template>

<script>
export default {
    data(){
        return{
            showHover:false
        }
    }
}
</script>
<style lang="less" scoped>
@hover_color:#eee;
.classFy{
    position: relative;
    width:100%;
    height:100%;
    background:#fff;
    ul{
        padding-top:15px;
        padding-bottom:19px;
        li{
            position: relative;
            text-align: left;
            padding-left:30px;
            line-height: 34px;
            transition:all .3s ease;
            &:hover{
                background:@hover_color;
            }
            a{
                color:@font_color;
                font-size:14px;
            }
            span{
                display:inline-block;
                font-size:14px;
                color:@placeholder_color;
                padding:0 8px;
            }
            .iconfont{
                position: absolute;
                right:30px;
                font-size:12px;
            }
        }
    }
    .banner-class{
        display: none;
        position: absolute;
        left:100%;
        top:-15px;
        width:940px;
        height:340px;
        background:#fff;
        z-index:50;
        box-shadow:0px 0px 8px 0px rgba(0,0,0,0.15);
        &.show{
            display: block;
        }
        .title{
            line-height: 14px;
            padding:20px;
            h3{
                float: left;
                font-size: 14px;
            }
            span{
                float:left;
                margin:2px 0 0 14px;
                font-size:12px;
                line-height:12px;
                color:@subtitle_color;
            }
        }
        .class-box{
            display: block;
            padding:10px;
            .clear();
            li{
                float: left;
                width:285px;
                height:80px;
                padding-left:0;
                margin:0px 10px 13px 10px;
                box-sizing: border-box;
                border:1px solid @hover_color;
                overflow: hidden;
                &:hover{
                    background:#fff;
                    transform: scale(1.05);
                }
                img{
                    float: left;
                    display: block;
                    width:80px;
                    height:80px;
                    cursor: pointer;
                }
                .des{
                    float: left;
                    width: 203px;
                    box-sizing: border-box;
                    padding:0 15px;
                    .name{
                        font-size:12px;
                        line-height: 12px;
                        margin:13px 0 10px 0;
                        cursor: pointer;
                        transition: color .3 ease;
                        &:hover{
                            color:@main;
                        }
                    }
                    .subtitle{
                        font-size:12px;
                        color:@subtitle_color;
                        line-height: 12px;
                        margin-bottom:10px;
                    }
                    .price{
                        font-size:14px;
                        font-weight: bold;
                        line-height: 14px;
                        color:@percent_color;
                    }
                }
            }
        }
    }
}
</style>