<template>
    <div >
       <div class="brand-top-nav">
            <router-link tag="a" to="/">首页</router-link>
            <span class="iconfont iconjiantou"></span>
            <span class="now-nav">搜索结果</span>
      </div>
      <div class="list-box" v-show="total>0">
          <ul class="good-list" v-if="searchType == 'taobao'|| searchType == 'pdd'">
            <li v-for='(item,index) in list' :key="index"><goodCard :data="item"></goodCard></li>
          </ul> 
          <ul class="store-list" v-if="searchType == 'store'">
            <li v-for="(item,index) in list" :key="index" @click="jump(item.URL)">
               <storeCard :data="item"></storeCard>
             </li>
          </ul>
           <ul class="food-list" v-if="searchType == 'food'">
                <li  v-for="(item,index) in list" :key="index"><foodCard :item="item"></foodCard></li>
            </ul>
             <ul class="shop-list" v-if="searchType == 'shop'">
                <li v-for="(item,index) in list" :key="index"><shopCard :item="item"></shopCard></li>
                
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
      <div class="empty" v-show="total == 0">
            <span class="iconfont iconspzw"></span>
            <div class="tip">对不起，对应商品分类或筛选组合下没有商品</div>
        </div>
    </div>
</template>
<script>
import goodCard from '@/components/taobao/goodCard'
import storeCard from "@/components/common/storeListCard"
import foodCard from '@/components/food/foodCard'
import shopCard from '@/components/shop/shopCard'
export default {
  data(){
    return{
      option:[
               {
                  path:['/','/taobo','/taobaoList'],
                  name:'淘宝',
                  query:this.$api.GetGoodsByKey,
                  type:'taobao'
               },{
                  path:['/Pdd'],
                  name:'拼多多',
                  query:this.$api.pddGetGoodsByKey,
                  type:'pdd' 
               },{
                  path:['/storeList'],
                  name:'商城返利',
                  query:this.$api.storeGJKeyWordSearch,
                  type:'store' 
               },{
                  path:['/shop'],
                  name:'逛街购物',
                  query:this.$api.GJKeyWordSearch,
                  type:'shop' 
               },{
                  path:['/food'],
                  name:'美食广场',
                  query:this.$api.MSKeyWordSearch,
                  type:'food' 
               }
           ],
           searchType:'',
           searchContent:'',
           searchUrl:'',
           pageIndex:1,
           pageSize:20,
           total:0,
           list:[],
    }
  },
  components:{
    goodCard:goodCard,
    storeCard:storeCard,
    foodCard:foodCard,
    shopCard:shopCard
  },
  mounted(){
    if(this.$route.query.type){
      this.searchType = this.$route.query.type;
      this.option.forEach(element => {
         if(element.type == this.searchType){
           this.searchUrl = element.query
         }
      });
      
    }
    if(this.$route.query.content){
      this.searchContent = this.$route.query.content
    }
    this.init();
  },
  watch:{
     $route: {
          handler() {
              if(this.$route.query.type){
                this.searchType = this.$route.query.type;
                this.option.forEach(element => {
                  if(element.type == this.searchType){
                    this.searchUrl = element.query
                  }
                });
                
              }
              if(this.$route.query.content){
                this.searchContent = this.$route.query.content
              }
              this.init();
        },
        deep: true,
    }
  },
  methods:{
    init(){
      this.pageIndex = 1;
      this.getList();
    },
    getList(){
      this.$http.post(this.searchUrl,{pageIndex:this.pageIndex,pageSize:this.pageSize,KeyValue:this.searchContent}).then(res=>{
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
.list-box{
  width:@max-width;
  margin:20px auto 100px;
  text-align: center;
  background:#fff;
  .page-box{
      padding:36px 0 60px;
  }
  @media screen and(max-width:@change_width){
    width:100%;
    margin:10/@p auto 0;
    padding-top:15/@p;
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
   @media screen and(max-width:@change_width){
    padding:0;
    margin:0px 0 0 15px;
    li{
      width:calc(50% - 15px);
      margin:0;
      margin-right:15px;
    }
  }
}
.store-list{
    .clear();
    border-top:1px solid @class_border;
    li{
      float: left;
      box-sizing: border-box;
      width:20%;
      border-bottom:1px solid @class_border;
      border-right:1px solid @class_border;
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
        cursor: pointer;
    }
}
.shop-list{
        padding:15px;
        .clear();
        li{
            float:left;
            width:555px;
            margin:15px;
        }
    }
.empty{
    width:@max-width;
    margin:20px auto 100px;
    height:500px;
    text-align: center;
    background:#fff;
    overflow: hidden;
    .iconfont{
        display: block;
        margin-top:104px;
        font-size:114px;
        color:#C8C8C8;
    }
    .tip{
        font-size:14px;
        color:@subtitle_color;
    }
    @media screen and(max-width:@change_width) {
        width:100%;
    }
}
</style>