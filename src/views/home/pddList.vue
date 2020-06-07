<template>
   <div class="taobao">
      <div class="brand-top-nav">
            <router-link tag="a" to="/">首页</router-link>
            <span class="iconfont iconjiantou"></span>
            <router-link  tag="a" to="/Pdd">拼多多</router-link>
            <span class="iconfont iconjiantou"></span>
            <span class="now-nav">{{className}}</span>
        </div>
        <div class="food-select-box">
            <div class="food-select-item">
                <ul>
                    <li class="name">分类：</li>
                    <li :class="{active:classId == 0}"><a @click="changeClass('0','全部')">全部</a></li>
                    <li v-for="(item,index) in classList" :key="index" :class="{active:classId == item.catid}" ><a  @click="changeClass(item.catid,item.titleA)">{{item.titleA}}</a></li>
                </ul>
            </div>
            <div class="food-select-item">
                <ul>
                    <li class="name">排序：</li>
                    <li :class="{active:sort == 0}"><a @click="changeSort(0)">最新商品</a></li>
                    <li :class="{active:sort == 1}"><a @click="changeSort(1)">最高人气</a></li>
                    <li :class="{active:sort == 2||sort == 3,up:sort==2,down:sort==3}"><a @click="changeSort(sort==2?3:2)" class="sort" :class="{up:sort==2,down:sort==3}">价格</a></li>
                </ul>
            </div>
        </div>
        <div class="small-select-box">
          <div class="small-list-box">
             <ul class="small-list">
                <li :class="{active:classId == 0}"><a @click="changeClass('0','全部')">全部</a></li>
                <li v-for="(item,index) in classList" :key="index" :class="{active:classId == item.catid}" ><a  @click="changeClass(item.catid,item.titleA)">{{item.titleA}}</a></li>
             </ul>
          </div>
          <ul class="small-bottom">
              <li :class="{active:sort == 0}"><a @click="changeSort(0)">最新商品</a></li>
              <li :class="{active:sort == 1}"><a @click="changeSort(1)">最高人气</a></li>
              <li :class="{active:sort == 2||sort == 3,up:sort==2,down:sort==3}"><a @click="changeSort(sort==2?3:2)" class="sort" :class="{up:sort==2,down:sort==3}">价格</a></li>
          </ul>
        </div>
        <div class="list-box">
          <ul class="good-list">
             <li v-for='(item,index) in list' :key="index"><goodCard :data="item"></goodCard></li>
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
        </div>
   </div>
</template>
<script>
import goodCard from '@/components/taobao/goodCard'
export default {
  data(){
    return{
        className:'',
        classId:'',
        classList:[],
        sort:0,
        pageIndex:1,
        pageSize:20,
        total:0,
        list:[]
    }
  },
  mounted(){
    this.className = this.$route.query.className
    this.classId = this.$route.query.classId
    this.$route.query.sort?this.sort = this.$route.query.sort:''
    this.getClass();
    this.getList();
  },
  components:{
    goodCard:goodCard
  },
  methods:{
    getClass(){
      this.$http.get(this.$api.pddGetClassNoPic).then(res =>{
         if(res.data.Code == 1){
           this.classList = res.data.Data.list
         }
      })
    },
    //修改分类
    changeClass(id,name){
       this.classId = id;
       this.pageIndex = 1;
       this.className= name;
       this.$router.push(`/pddList?className=${name}&classId=${id}&sort=${this.sort}`)
       this.getList();
    },
    //修改排序
    changeSort(sort){
      this.sort = sort;
      this.$router.push(`/pddList?className=${this.className}&classId=${this.classId}&sort=${this.sort}`)
      this.pageIndex = 1;
      this.getList();
    },
    //获取商品列表
    getList(){
       let sendData = {
         Catid:this.classId,
         sort:this.sort,
         pageIndex:this.pageIndex,
         pageSize:this.pageSize
       }
       this.$http.post(this.$api.pddGerPageList,sendData).then(res=>{
          if(res.data.Code == 1){
             this.list = res.data.Data.list
             this.total = res.data.Data.count
             document.body.scrollTop = 0;
             document.documentElement.scrollTop = 0;
          }
       })
    },
    //分页数据
    handleCurrentChange(){
       this.getList()
    },
    handleSizeChange(res){
      console.log(res,'sss')
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
.sort{
  position: relative;
  padding-right:12px;
  &.up{
    &::after{
        background:url(../../assets/img/icon-sort-up.png) no-repeat center center;
        background-size:100%;
    }
  }
  &.down{
    &::after{
        background:url(../../assets/img/icon-sort-down.png) no-repeat center center;
        background-size:100%;
    }
  }
  &:after{
    content:'';
    position: absolute;
    right:0;
    top:50%;
    margin-top:-6px;
    width:8px;
    height:12px;
    background:url(../../assets/img/icon-sort.png) no-repeat center center;
    background-size:100%;
  }
}
.small-select-box{
  display:none;
  margin-top: 10px;
  .small-list-box{
    width:100%;
    overflow-x:scroll ;
    overflow-y: hidden;
    height:47/@p;
    border-bottom:1px solid @class_border;
    .small-list{
      display: flex;
      padding:0 5px 5px;
      li{
        padding:0 10/@p;
        line-height:47/@p;
        flex-shrink: 0;
        a{
          font-size:12px;
          color:@subtitle_color;
        }
        &.active{
          position: relative;
          a{
            color:@main;
          }
          &::after{
            content:'';
            display: block;
            position: absolute;
            bottom:0;
            left:50%;
            margin-left:-6/@p;
            width:12/@p;
            height: 2/@p;
            background:@main;
          }
        }
      }
    }
  }
  .small-bottom{
    display: flex;
    height:47px;
    justify-content: space-around;
    li{
      font-size:12px;
      line-height: 47px;
      a{
        font-size:12px;
      }
      &.active{
        a{
          color:@main;
        }
      }
    }
  }
  @media screen and(max-width:@change_width){
    display: block;
    width:100%;
    background:#fff;
  }
}
</style>