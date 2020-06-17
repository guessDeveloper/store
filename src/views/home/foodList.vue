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
              全部商品 <span>{{total}}</span>
          </h2>
          <ul class="list">
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
             <li>
              <foodCard></foodCard>
            </li>
          </ul>
          <div class="page-box">
                <el-pagination
                    @current-change="getList"
                    :current-page.sync="pageIndex"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="total">
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
      list:[],
      pageIndex:1,
      pageSize:20,
      total:0,
      id:'',
    }
  },
  mounted(){
     if(this.$route.query.id){
      this.id = this.$route.query.id
      this.getList();
    }
  },
  methods:{
    getList(){
      this.$http.post(this.$api.Products,{
         MerchanterId:this.id,
         pageIndex:this.pageIndex,
         pageSize:this.pageSize
      }).then(res=>{
        if(res.data.Code == 1){
          this.list = res.data.Data.list
          this.total = res.data.Data.count
        }
      })
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