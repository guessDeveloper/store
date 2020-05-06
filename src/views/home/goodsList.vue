<template>
  <div class="goods-list">
      <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">美食广场</span>
      </div>
      <div class="goods-box">
         <h2 class="title">
            全部商品 <span>100</span>
         </h2>
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
  </div>
</template>
<script>
import goodCard from '@/components/taobao/goodCard'
export default {
  data(){
    return {

    }
  },
  components:{
    goodCard:goodCard
  }
}
</script>
<style lang="less" scoped>
.goods-box{
  width:@max-width;
  margin:0 auto;
  background:#fff;
  .title{
    padding:40px 30px 0;
    font-size:28px;
    text-align: left;
    line-height:24px;
    span{
      color:@main;
    }
  }

}
.list-box{
  width:@max-width;
  margin:0px auto 100px;
  background:#fff;
  .page-box{
      padding:36px 0 60px;
  }
}
.good-list{
  display: block;
  padding:27px 17px 17px 17px;
  .clear();
  li{
    float: left;
    width:265px;
    margin:13px;
  }
}
</style>