<template>
    <section class="classFy">
        <ul>
            <li>
                <a>服装</a><span>/</span><a href="">毛衫</a><span>/</span><a>外衣</a>
            </li>
            <li>
                <a>服装</a><span>/</span><a href="">毛衫</a><span>/</span><a>外衣</a>
            </li>
            <li>
                <a>服装</a><span>/</span><a href="">毛衫</a><span>/</span><a>外衣</a>
            </li>
            <li>
                <a>服装</a><span>/</span><a href="">毛衫</a><span>/</span><a>外衣</a>
            </li>
            <li>
                <a>服装</a><span>/</span><a href="">毛衫</a><span>/</span><a>外衣</a>
            </li>
            <li>
                <a>服装</a><span>/</span><a href="">毛衫</a><span>/</span><a>外衣</a>
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
                padding:0 10px;
            }
        }
    }
}
</style>