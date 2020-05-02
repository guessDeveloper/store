<template>
    <section class="classFy">
        <ul>
            <li>
                <a>服装</a><span>/</span><a href="">毛衫</a><span>/</span><a>外衣</a> <span class="iconfont iconjinruyindao"></span>
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

        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
.classFy{
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
}
</style>