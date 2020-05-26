<template>
  <div>
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <router-link tag="a" to="/">美食广场</router-link>
        <span class="iconfont iconjiantou"></span>

      </div>
        <div class="goods-box">
           <h2 class="title">
              全部商品 <span>100</span>
          </h2>
          <ul class="list">
            <li @click="goDetail">
              <foodCard></foodCard>
            </li>
             <li>
              <foodCard></foodCard>
            </li>
             <li>
              <foodCard></foodCard>
            </li>
             <li>
              <foodCard></foodCard>
            </li>

             <li>
              <foodCard></foodCard>
            </li>
             <li>
              <foodCard></foodCard>
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
import foodCard from '@/components/food/foodListCard'
export default {
  data(){
    return{

    }
  },
  methods:{
    goDetail(){
      this.$router.push('/foodDetail')
    }
  },
  components:{
    foodCard:foodCard
  }
}
</script>
<style lang="less" scoped>
.goods-box{
  width:@max-width;
  margin:0 auto 100px;
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
.list{
  .clear();
  padding:40px 14px 0;
  li{
    float:left;
    width:265px;
    margin:0 13px;
    cursor: pointer;
  }
}
.page-box{
  padding:10px 0 60px 0;
}
</style>