<template>
   <div class="taobao">
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
        <div class="list-box">
          <ul class="good-list">
             <li><goodCard></goodCard></li>
             <li><goodCard></goodCard></li>
             <li><goodCard></goodCard></li>
             <li><goodCard></goodCard></li>
             <li><goodCard></goodCard></li>
             <li><goodCard></goodCard></li>
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
import goodCard from '@/components/taobao/goodCard'
export default {
  data(){
    return{

    }
  },
  components:{
    goodCard:goodCard
  }
}
</script>
<style lang="less" scoped>

.list-box{
  width:@max-width;
  margin:20px auto 100px;
  text-align: center;
  background:#fff;
  .page-box{
      padding:36px 0 60px;
  }
}
.good-list{
  display: block;
  padding:17px;
  .clear();
  li{
    float: left;
    width:265px;
    margin:13px;
  }
}
</style>