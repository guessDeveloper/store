<template>
  <div>
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">{{titleA}}</span>

      </div>
      <div class="recomend-title">
          <h2>{{titleA}}</h2>
          <p>{{titleB}}</p>
      </div>
      <!-- <div class="solt-box">
         <span></span>
      </div> -->
          <!-- <div class="food-select-box solt-box">
            <div class="food-select-item">
                <ul>
                    <li class="name">排序：</li>
                    <li><a href="">价格排序
                      <span>

                      </span>
                    </a></li>
                    <li><a href="">积分排序</a></li>
                </ul>
            </div>
        </div> -->
      <div class="list-box">
        <ul>
          <li v-for="(item,index) in list"><Card :data="item"></Card></li>
         
        </ul>
          <div class="page-box">
                <el-pagination
                  
                    @current-change="getList"
                    :current-page.sync="currentPage3"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="totatl">
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
       pageIndex:1,
       pageSize:20,
       list:[],
       totatl:0,
       ThemeID:'',
       titleA:'',
       titleB:'',
    }
  },
  mounted(){
    this.$route.query.ThemeID?this.ThemeID = this.$route.query.ThemeID:'';
    this.getList()
  },
  methods:{
    getList(){
      this.$http.post(this.$api.GetThemeGoods,{
        ThemeID:this.ThemeID,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }).then(res=>{
        if(res.data.Code == 1){
          this.list = res.data.Data.List;
          this.totatl = res.data.Data.count;
          this.titleA = res.data.Data.titleA;
          this.titleB = res.data.Data.titleB?res.data.Data.titleB:''
        }
      })
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
  // height: 74px;
  background:#fff;
  margin:20px auto;
}
.list-box{
  width:@max-width;
  margin:20px auto 100px;
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
@media screen and(max-width:@change_width){
  .recomend-title {
    width: 100%;
    height: auto;
    padding-bottom: 20px;
    border-top: 10px solid #F8F8F8;
    border-bottom: 1px solid #F8F8F8;
    h2 {
      margin-top: 20px;
      font-size: 20px;
    }
    p {
      margin-top: 10px;
    }
  }
  .food-select-box.solt-box {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
  .list-box {
    width: 100%;
    background-color: transparent;
    ul {
      li {
        width: 100%;
        margin: 0 0 15px 0;
        float: none;
        .card-box {
          width: 100%;
        }
      }
    }
  }
}
</style>
