<template>
  <div class="goods-list">
      <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">逛街购物</span>
      </div>
      <div class="goods-box">
         <h2 class="title">
            全部商品 <span>{{total}}</span>
         </h2>
         <div class="list-box">
          <ul class="good-list">
             <li v-for="(item,index) in list" :key="index"><goodCard :data="item"></goodCard></li>
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
              <div class="page-box small">
                <el-pagination
                    small
                    @current-change="getList"
                    :current-page.sync="pageIndex"
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import goodCard from '@/components/shop/shopGoodsCard'
export default {
  data(){
    return {
      id:'',
      pageIndex:1,
      pageSize:10,
      total:0,
      list:[],
    }
  },
  components:{
    goodCard:goodCard
  },
  mounted(){
    if(this.$route.query.id){
      this.id = this.$route.query.id
      this.getList();
    }

  },
  methods:{
    getList(){
      this.$http.post(this.$api.shopProducts,{
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
@media screen and(max-width:@change_width){
  .goods-box {
    width: 100%;
    .title {
      width: 100%;
      padding: 15px 15px 15px 30px;
      border-bottom: 1px solid #F8F8F8;
      box-sizing: border-box;
      font-size:20px;
      position: relative;
    }
    .title:before {
      content: '';
      display: block;
      position: absolute;
      left: 15px;
      top: 50%;
      width: 4px;
      height: 30%;
      transform: translateY(-50%);
      background-color: #F38A1D;
    }
    .list-box {
      width: 100%;
      .good-list {
        padding: 15px;
        overflow: hidden;
        li {
          margin: 0;
          float: left;
          width: 50%;
          box-sizing: border-box;
        }
        li:nth-child(odd) {
          padding-right: 8px;
        }
        li:nth-child(even) {
          padding-left: 8px;
        }
      }
    }
  }
}
</style>
