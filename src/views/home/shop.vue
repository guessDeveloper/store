<template>
  <div class="shop">
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">逛街购物</span>
    </div>
    <div class="food-select-box">
        <div class="food-select-item">
            <ul>
                <li class="name" >分类：</li>
                <li :class="{active:nowClassId == 0}" ><a  @click="changeClass(0)">全部</a></li>
                <li v-for="(item,index) in classList" :key="index" :class="{active:nowClassId == item.ClasssId}"><a @click="changeClass(item.ClasssId)">{{item.Classname}}</a></li>
            </ul>
        </div>
            <div class="food-select-item">
            <ul>
                <li class="name">地址：</li>
                <li :class="{active:BdCityCode == 0}"><a @click="BdCityCode = 0" >全部</a></li>
                <li v-for="(item) in citys" :key="item.CityId" :class="{active:BdCityCode == item.CityId}"><a @click="changeCity(item.CityId)" >{{item.CityName}}</a></li>
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

    <!-- 移动端筛选条件 -->
    <div class="classify-list-small-box">
        <ul>
            <li class="active">全部</li>
            <li v-for="(item, index) in classList" :key="index">{{ item.Classname }}</li>
        </ul>
    </div>
    <div class="filter-small-box">
        <div>
            地址：
            <el-dropdown trigger="click" class="select" @command="chengeSelect">
                <span class="el-dropdown-link">
                   <span class="el-dropdown-label">全部</span><span class="iconfont icon-arrow-downYellow"></span>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div>
            排序：
            <el-dropdown trigger="click" class="select" @command="chengeSelect">
                <span class="el-dropdown-link">
                   <span class="el-dropdown-label">默认</span><span class="iconfont icon-arrow-downYellow"></span>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
    <!-- 移动端商品列表 -->
    <div class="shop-list-small-box">
        <ul>
            <li class="list-item">
                <img src="https://b-ssl.duitang.com/uploads/item/201706/27/20170627012435_mJLiX.thumb.700_0.jpeg" alt="" class="list-item-img">
                <div class="list-item-title">
                    <img src="https://b-ssl.duitang.com/uploads/item/201706/27/20170627012435_mJLiX.thumb.700_0.jpeg" alt="">
                    <span>全聚德烤鸭店（昌平店）</span>
                </div>
                <div class="list-item-integral">
                    <p class="list-item-integral-honesty">
                        商家诚信积分：<span>100</span>
                    </p>
                    <p class="list-item-integral-residue">
                        剩余积分：<span>100</span>
                    </p>
                </div>
                <div class="list-item-reward">
                    任务奖励：<span>5%-20%</span>
                </div>
                <div class="list-item-area">
                    <div class="list-item-area-left">
                        距离：<span>500m</span>
                    </div>
                    <div class="list-item-area-right">
                        <img src="https://b-ssl.duitang.com/uploads/item/201706/27/20170627012435_mJLiX.thumb.700_0.jpeg" alt="" class="list-item-area-img">
                        <span>北京</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>

        <div class="shop-list-box">
            <ul class="shop-list">
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
  </div>
</template>
<script>
import { mapState} from 'vuex' //注册 action 和 state
import shopCard from '@/components/shop/shopCard'
export default {
    data(){
        return{
            citys:[],
            classList:[],
            nowClassId:0,
            Category:'',
            BdCityCode:0,
            sort:0,
            pageIndex:0,
            pageSize:20,
            total:0,
            list:[],
        }
    },
    mounted(){
        this.getClass()
        this.getCity()
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
            this.$router.push('/earthDetail');
        },
        changeCity(id){

            this.BdCityCode = id;
            this.getList();
        },
        changeSort(item){
            this.sort = item
            this.getList();
        },
        //获取商家类型
        getClass(){
            this.$http.get(this.$api.shopCategorys).then(res=>{
                if(res.data.Code == 1){
                    this.classList = res.data.Data
                }
            })
        },
        //修改分类
        changeClass(id){
          this.nowClassId = id
          this.getList();
        },
        getCity(){
            this.$http.get(this.$api.shopCitys).then(res=>{
                if(res.data.Code == 1){
                    this.citys = res.data.Data
                }
            })
        },
        getList(){
            this.$http.post(this.$api.NearBy,{PointX:this.positionX,PointY:this.positionY,Category:this.nowClassId,BdCityCode:this.BdCityCode,Sort:this.sort,pageIndex:this.pageIndex,pageSize:this.pageSize}).then(res=>{
                if(res.data.Code == 1){
                  this.list = res.data.Data.list;
                  this.total = res.data.Data.count;
                }else{
                    this.$message.error(res.data.Msg)
                }
            })
        }

    },
    components:{
        shopCard:shopCard
    }
}
</script>
<style lang="less" scoped>
.shop-list-box{
    width:@max-width;
    margin:20px auto 100px;
    background:#fff;
    text-align: center;
    .shop-list{
        padding:15px;
        .clear();
        li{
            float:left;
            width:555px;
            margin:15px;
        }
    }

}
.page-box{
    padding:45px 0 60px;
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
.classify-list-small-box {
    display: none;
}
.filter-small-box {
    display: none;
}
.shop-list-small-box {
    display: none;
}
@media screen and(max-width:@change_width) {
    .shop-list-box {
        display: none;
    }
    .classify-list-small-box {
        display: block;
        border-bottom: 1px solid #F8F8F8;
        padding: 0 15px;
        overflow-x: auto;
        overflow-y: hidden;
        height: 48px;
        box-sizing: border-box;
        background-color: #ffffff;
        ul {
            // width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            li {
                position: relative;
                display: inline-block;
                margin-right: 20px;
                height: 56px;
                // line-height: 56px;
                padding-top: 15px;
                box-sizing: border-box;
                font-size:12px;
                color: #999999;
            }
            li.active {
                color: #F38A1D;
            }
            li.active:after {
                content: '';
                position: absolute;
                left: 50%;
                bottom: 13px;
                transform: translateX(-50%);
                width: 50%;
                height: 2px;
                background-color: #F38A1D;
            }
        }
    }
    .filter-small-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 60px;
        color: #999999;
        height: 47px;
        background-color: #ffffff;
        .el-dropdown-label {
            margin-right: 4px;
            color: #F38A1D;
            font-size: 12px;
        }
    }
    .shop-list-small-box {
        display: block;
        ul {
            padding: 15px;
            .list-item {
                padding-bottom: 15px;
                .list-item-img {
                    width: 100%;
                }
                .list-item-title {
                    display: flex;
                    align-items: center;
                    margin-top: 20px;
                    padding-left: 15px;
                    img {
                        width: 29px;
                        margin-right: 10px;
                    }
                    span {
                        font-size:16px;
                        color: #333333;
                        font-weight:600;
                    }
                }
                .list-item-integral {
                    display: flex;
                    align-items: center;
                    padding-left: 15px;
                    margin-top: 10px;
                    color: #999999;
                    .list-item-integral-honesty {
                        margin-right: 20px;
                        span {
                            color: #50BCFF;
                            font-weight:400;
                        }
                    }
                    .list-item-integral-residue {
                        span {
                            color: #F38A1D;
                            font-weight:400;
                        }
                    }
                }
                .list-item-reward {
                    padding-left: 15px;
                    margin-top: 12px;
                    color: #999999;
                    span {
                        color: #D51B32;
                        font-weight:400;
                    }
                }
                .list-item-area {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-left: 15px;
                    margin-top: 12px;
                    color: #999999;
                    .list-item-area-left {
                        span {
                            color: #333333;
                            font-weight: 400;
                        }
                    }
                    .list-item-area-right {
                        display: flex;
                        align-items: center;
                        .list-item-area-img {
                            width: 11px;
                            margin-right: 5px;
                        }
                        span {
                            text-decoration-line: underline;
                        }
                    }
                }
            }
        }
    }
}
</style>
