<template>
  <div >
    <div class="brand-top-nav">
            <router-link tag="a" to="/">首页</router-link>
            <span class="iconfont iconjiantou"></span>
            <span class="now-nav">美食广场</span>
    </div>
    <div class="comment-list-box">
          <h2 class="title">
              全部评价 <span>100</span>
          </h2>
        
            <ul class="comment-list">
              <li>
                <commentCard></commentCard>
              </li>
              <li>
                <commentCard></commentCard>
              </li>
              <li>
                <commentCard></commentCard>
              </li>
              <li>
                <commentCard></commentCard>
              </li>
              <li>
                <commentCard></commentCard>
              </li>
              <li>
                <commentCard></commentCard>
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
import commentCard from '@/components/common/commentCard'
export default {
  data(){
    return{

    }
  },
  components:{
    commentCard:commentCard
  }
}
</script>
<style lang="less" scoped>
.comment-list-box{
  width:@max-width;
  margin: 0 auto 100px;
  background:#fff;
  .title{
    padding:40px 30px 0;
    font-size:28px;
    text-align: left;
    line-height:24px;
    span{
      color:@comment_num_color;
    }
  }
}
.comment-list{
  display:block;
  .clear();
  padding:0 5px;
  li{
    float: left;
    width:545px;
    margin:0 25px;
  }

}
.page-box{
      padding:60px 0 60px;
  }
</style>