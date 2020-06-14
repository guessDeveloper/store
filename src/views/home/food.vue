<template>
    <div class="food-box">
        <div class="brand-top-nav">
            <router-link tag="a" to="/">首页</router-link>
            <span class="iconfont iconjiantou"></span>
            <span class="now-nav">美食广场</span>
        </div>
        <div class="food-select-box">
            <div class="food-select-item">
                <ul>
                    <li class="name">分类：</li>
                    <li :class="{active:ClasssId== ''}"><a @click="changeClass('')">全部</a></li>
                    <li v-for="(item,index) in classType" :key="index" :class="{active:ClasssId == item.ClasssId}" ><a  @click="changeClass(item.ClasssId)">{{item.Classname}}</a></li>
                </ul>
            </div>
             <div class="food-select-item">
                <ul>
                    <li class="name">地址：</li>
                    <li :class="{active:cityId == ''}"><a >全部</a></li>
                    <li v-for="(item,index) in cityList" :class="{active:cityId == item.CityId}"><a  @click="changeCity(item.CityId)">{{item.CityName}}</a></li>
                </ul>
            </div>
            <div class="food-select-item">
                <ul>
                    <li class="name">排序：</li>
                    <li :class="{active:sort == 0}" ><a  @click="changeSort(0)">默认</a></li>
                    <li :class="{active:sort == 1||sort==2}"><a  class="sort" :class="{up:sort==2,down:sort==1}" @click="changeSort(sort==2?1:2)">任务奖励</a></li>
                    <li :class="{acitve:sort == 3|| sort == 4}"><a class="sort" :class="{acitve:sort == 3|| sort == 4,up:sort==3,down:sort==4}" @click="changeSort(sort==3?4:3)">商家诚信</a></li>
                    <li :class="{active:sort == 5||sort == 6}"><a class="sort" :class="{active:sort == 5||sort == 6,up:sort==5,down:sort==6}"  @click="changeSort(sort==5?6:5)">商家积分</a></li>
                </ul>
            </div>
        </div>
        <div class="food-list-box">
            <ul class="food-list">
                <li  v-for="(item,index) in list"><foodCard :item="item"></foodCard></li>
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
import { mapState} from 'vuex' //注册 action 和 state
import foodCard from '@/components/food/foodCard'
export default {
    data(){
        return{
            classType:'',
            ClasssId:'',
            cityList:[],
            cityId:'',
            sort:0,
            pageIndex:1,
            pageSize:20,
            total:0,
            list:[]
        }
    },
    mounted(){
        this.getCalss();
        this.getCity();
        this.getList();
    },
    computed:{
     ...mapState([
       'positionX',
       'positionY'
     ])
    },
    methods:{
        goDetail(){
            this.$router.push('/foodDetail')
        },
        changeClass(id){
            this.ClasssId = id;
            this.getList();
        },
        changeCity(id){
            this.cityId = id
            this.getList();
        },
        changeSort(id){
            this.sort = id;
            this.getList();
        },
        //获取分类
        getCalss(){
            this.$http.get(this.$api.foodCategorys).then(res=>{
                if(res.data.Code == 1){
                this.classType = res.data.Data
                }
            })
        },
        getCity(){
            this.$http.get(this.$api.foodCitys).then(res=>{
                if(res.data.Code == 1){
                    this.cityList = res.data.Data
                }
            })
        },
        getList(){
            this.$http.post(this.$api.foodNearBy,{PointX:this.positionX,PointY:this.positionY,Category:this.ClasssId,BdCityCode:this.cityId,Sort:this.sort,pageIndex:this.pageIndex,pageSize:this.pageSize}).then(res=>{
                if(res.data.Code == 1){
                  this.list = res.data.Data.List;
                  this.total = res.data.Data.count;
                }else{
                    this.$message.error(res.data.Msg)
                }
            })
        }
    },
    components:{
        foodCard:foodCard,
    }
}
</script>
<style lang="less" scoped>

.food-list-box{
  width:@max-width;
  margin:20px auto 100px;
  background:#fff;
  text-align: center;
  .page-box{
      padding:30px 0 60px;
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
</style>