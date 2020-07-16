<template>
  <div class="home">
    <navBar></navBar>
    <navBottom></navBottom>
     <div class="brand-top-nav">
        <router-link tag="a" to="/store">商家中心</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">商家产品</span>
      </div>
        <div class="goods-box">
           <h2 class="title">
              全部商品 <span>{{total}}</span>
          </h2>
          <ul class="list">
            <li v-for="(item,index) in list" :key="index">
              <foodCard :data="item"></foodCard>
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
    <footerBar></footerBar>
  </div>
</template>

<script>
import  navBar from '@/components/store/storeNav'
import  navBottom from'@/components/store/storeNavBar'
import footerBar from '@/components/common/footer'
import left from '@/components/store/storeLeft'
import foodCard from '@/components/store/storeFoodListCard'
export default {
  name: 'Home',
  data(){
    return{
      title:"商家中心",
      list:[],
      pageIndex:1,
      pageSize:20,
      total:0,
      id:'',
      zhuohao:''
    }
  },
  mounted(){
      if(this.$route.query.id){
      this.id = this.$route.query.id
      if(this.$route.query.zhuohao){
        this.zhuohao = this.$route.query.zhuohao
        this.ScanQRcode();
      }else{
        this.getList();
      }

     }
  },
  components: {
    navBar:navBar,
    navBottom:navBottom,
    footerBar:footerBar,
    left:left,
     foodCard:foodCard
  },
  methods:{
    changeTitle(title){
      
      this.title = title
    },
     getList(){
      this.$http.post(this.$api.foodProducts,{
         'MerchantId':this.id,
         'token':localStorage.getItem('token')?localStorage.getItem('token'):'',
         'pageIndex':this.pageIndex,
         'pageSize':this.pageSize
      }).then(res=>{
        if(res.data.Code == 1){
          let list = res.data.Data.List
          this.list = list.map((item)=>{
              return {...item,MertchntID:res.data.Data.MerchantId,Mertchntname:res.data.Data.MerchantName,tablenumber:'',IsQRcode:''}
          })
          console.log(this.list)
          
          this.total = res.data.Data.Count
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.box{
  width:@max-width;
  margin:0 auto 100px;
  .clear();
 
}
@media screen and(max-width:@change_width){
  .box {
    margin-bottom: 0;
    width:100%;
    
  }
}
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
@media screen and(max-width:@change_width){
  .goods-box {
    width: 100%;
    .title {
      padding: 15px 15px 15px 30px;
      border-top: 10px solid #F8F8F8;
      border-bottom: 1px solid #F8F8F8;
      font-size: 20px;
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
    .list {
      padding: 15px;
      // overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 0;
        // float: left;
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
</style>
