<template>
  <div class="recommend-list">
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <router-link tag="a" to="/">优选推荐</router-link>
        <span class="now-nav">人气推荐</span>
      </div>
      <div class="content-box">
        <ul class="list">
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>
          <li>
            <recomendCard></recomendCard>
          </li>

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
import recomendCard from '@/components/recommend/recommendCard'
export default {
  data(){
    return{

    }
  },
  components:{
    recomendCard:recomendCard
  }
}
</script>
<style lang="less" scoped>
.content-box{
  width:@max-width;
  margin:0 auto 100px;
  background:#fff;
}
.list{
  width:@max-width;
  margin:0 auto;
  background:#fff;
  .clear();
  li{
    float: left;
    width:20%;
    box-sizing: border-box;
    border-right:1px solid @class_border;
    border-bottom:1px solid @class_border;
    &:nth-of-type(5n){
      border-right: 0;
    }
  }
}
 .page-box{
      padding:60px 0 60px;
}
</style>