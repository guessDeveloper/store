<template>
  <div>
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">特惠推荐</span>
        
      </div>
      <div class="recomend-title">
          <h2>特惠推荐</h2>
          <p>给你贴心的日用好物</p>
      </div>
      <div class="solt-box">

      </div>
      <div class="list-box">
        <ul>
          <li><Card></Card></li>
          <li><Card></Card></li>
          <li><Card></Card></li>
          <li><Card></Card></li>
          <li><Card></Card></li>
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
import Card from '@/components/recommend/specilCard'
export default {
  data(){
    return{

    }
  },
  components:{
    Card:Card
  }
}
</script>
<style lang="less" scoped>
.recomend-title{
    width:@max-width;
    height:125px;
    margin:0 auto;
    background:#fff;
    overflow: hidden;
    text-align: center;
    h2{
        margin-top:35px;
        font-size:28px;
        color:@main;
        line-height: 28px;
        font-weight: normal;
    }
    p{
        font-size:14px;
        color:@subtitle_color;
        line-height: 12px;
        margin-top:15px;
    }
}
.solt-box{
  width:@max-width;
  height: 74px;
  background:#fff;
  margin:20px auto;
}
.list-box{
  width:@max-width;
  margin:0 auto 100px;
  background:#fff;
  ul{
    .clear();
    padding:15px;
    li{
      float:left;
      margin:15px;
    }
  }
}
 .page-box{
   text-align: center;
      padding:45px 0 60px;
}
</style>