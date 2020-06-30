<template>
 <div class="store-box">
   <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">商城返利</span>
    </div>
 
        <div class="content-list">
          <!-- <div class="list-title">食品材料（54）</div> -->
           <ul>
             <li v-for="(item,index) in list" :key="index" @click="jump(item.ID,item.picurl)">
               <Card :data="item"></Card>
             </li>
              
           </ul>
            <div class="page-box">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageIndex"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
            <div class="page-box small">
                <el-pagination
                    small
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageIndex"
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div>
 </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
import Card from "@/components/common/storeListCard"
export default {
  data(){
    return{
       pageIndex:1,
       pageSize:50,
       list:[],
       total:0
    }
  },
  computed:{
    ...mapState([
      'isLogin'
    ])
  },
  mounted(){
    this.$route.query.pageIndex?this.pageIndex = this.$route.query.pageIndex:''
    //  this.$route.query.pageIndex?this.pageSize = this.$route.query.pageSize:''
    this.getList();
  },
  components:{
    Card:Card
  },
  methods:{
    getList(){
      
      this.$http.post(this.$api.GetMerchaterClass,{
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }).then(res=>{
        if(res.data.Code == 1){
          this.list = res.data.Data.List
          this.total = res.data.Data.count
        }
      })
    },
    handleCurrentChange(){
       this.getList();
       this.$router.push(`/storeList?pageIndex=${this.pageIndex}`)
       document.body.scrollTop = 0;
       document.documentElement.scrollTop = 0;
    },
    handleSizeChange(){

    },
    jump(id,img){
      if(!this.isLogin){
        this.$router.push('/login')
      }else{
         let routeUrl = this.$router.resolve({
            path: "/jump",
            query: {id:id,img:img}
          });
          window.open(routeUrl.href, '_blank');
        // this.$router.push(`/jump?id=${id}&img=${img}`,'_blank')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.store{
  ul{
    li{
      width:11.11%;
      border-bottom:1px solid @class_border;
    }
   
  }
}
.content-list{
  width:@max-width;
  background:#fff;
  margin:0px auto 100px;
  .list-title{
    text-align: center;
    font-size:28px;
    font-weight: bold;
    line-height: 128px;
  }
  ul{
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
  .page-box{
    text-align: center;
    padding:36px 0 60px;
    &.small{
      display: none;
    }
  }
  @media screen and(max-width:@change_width){
    &{
      width:100%;
      margin-top:10/@p;
      ul{
        li{
          width:33.33%;
        }
      }
      .page-box{
        display: none;
        &.small{
          display: block;
        }
      }
    }
  }
}
</style>