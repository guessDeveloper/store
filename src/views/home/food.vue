<template>
    <div class="food-box">
        <div class="brand-top-nav">
            <router-link tag="a" to="/">首页</router-link>
            <span class="iconfont iconjiantou"></span>
            <span class="now-nav">美食广场</span>
        </div>
        <div class="food-select-box">
            <div class="food-select-item">
                <ul>
                    <li class="name">分类：</li>
                    <li class="active"><a href="">全部</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
                    <li><a href="">饺子混沌</a></li>
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
        <div class="food-list-box">
            <ul class="food-list">
                <li><foodCard></foodCard></li>
                <li><foodCard></foodCard></li>
                <li><foodCard></foodCard></li>
                <li><foodCard></foodCard></li>
                <li><foodCard></foodCard></li>
                <li><foodCard></foodCard></li>
                <li><foodCard></foodCard></li>
                <li><foodCard></foodCard></li>
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
import foodCard from '@/components/food/foodCard'
export default {
    data(){
        return{

        }
    },
    components:{
        foodCard:foodCard,
    }
}
</script>
<style lang="less" scoped>

.food-list-box{
  width:@max-width;
  margin:20px auto 100px;
  background:#fff;
  .page-box{
      padding:30px 0 60px;
  }
}
.food-list{
    display: block;
    background:#fff;
    padding:15px;
    .clear();
    li{
        float: left;
        width:360px;
        margin:15px;
    }
}
</style>