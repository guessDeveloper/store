<template>
  <div >
    <div class="brand-top-nav">
            <router-link tag="a" to="/">首页</router-link>
            <span class="iconfont iconjiantou"></span>
            <span class="now-nav">美食广场</span>
    </div>
    <div class="comment-list-box">
          <h2 class="title">
              全部评价 <span>{{total}}</span>
          </h2>

            <ul class="comment-list">
              <li v-for="(item,index) in list" :key="index">
                <commentCard :data="item"></commentCard>
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
import commentCard from '@/components/common/commentCard'
export default {
  data(){
    return{
      ID:'',
      type:'',
      list:[],
      pageIndex:1,
      pageSize:20,
      total:0,
      url:""
    }
  },
  mounted(){
    this.$route.query.id?this.ID = this.$route.query.id:''
    this.$route.query.type?this.type = this.$route.query.type:''
    this.type==1?this.url = this.$api.shopGetMerchanter:this.url = this.$api.GetMerchanter
    this.getList();
  },
  methods:{
     getList(){
       this.$http.post(this.url,{
         MerchanterId:this.ID,
         pageIndex:this.pageIndex,
         pageSize:this.pageSize
       }).then(res=>{
         if(res.data.Code == 1){
           this.list = res.data.Data.List;
           this.total = res.data.Data.Count
         }
       })
     }
  },
  components:{
    commentCard:commentCard
  },

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
@media screen and(max-width:@change_width){
  .comment-list-box {
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
  }
}
</style>
