<template>
  <div class="shop">
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">逛街购物</span>
    </div>
    <div class="food-select-box">
            <div class="food-select-item">
                <ul>
                    <li class="name">分类：</li>
                    <li class="active"><a href="">全部</a></li>
                    <li><a href="">温暖家居</a></li>
                    <li><a href="">健康美体</a></li>
                    <li><a href="">宝贝成长</a></li>
                    <li><a href="">饺子混沌</a></li>
                </ul>
            </div>
             <div class="food-select-item">
                <ul>
                    <li class="name">地址：</li>
                    <li><a href="">全部</a></li>
                    <li><a href="">北京</a></li>
                    <li><a href="">上海</a></li>
                    <li><a href="">武汉</a></li>
                    <li><a href="">河北</a></li>
                </ul>
            </div>
            <div class="food-select-item">
                <ul>
                    <li class="name">排序：</li>
                    <li><a href="">默认</a></li>
                    <li><a href="">任务奖励</a></li>
                    <li><a href="">商家诚信</a></li>
                    <li><a href="">商家积分</a></li>
                </ul>
            </div>
        </div>
        <div class="shop-list-box">
            <ul class="shop-list">
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
            </ul>
            <div class="page-box">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000">
                </el-pagination>
            </div>
        </div>
  </div>
</template>
<script>
import shopCard from '@/components/shop/shopCard'
export default {
    data(){
        return{
            
        }
    },
    components:{
        shopCard:shopCard
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
.shop-list-box{
    width:@max-width;
    margin:20px auto 100px;
    background:#fff;
    .shop-list{
        padding:15px;
        .clear();
        li{
            float:left;
            width:555px;
            margin:15px;
        }
    }

}
.page-box{
    padding:45px 0 60px;
}
</style>