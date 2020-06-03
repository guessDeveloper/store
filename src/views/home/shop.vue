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
                    <li class="name">分类：</li>
                    <li :class="{active:nowClassId == 0}"><a href="">全部</a></li>
                    <li v-for="(item,index) in classList" :key="index" :class="{active:nowClassId == item.ClasssId}"><a @click="changeClass(item.ClasssId)">{{item.Classname}}</a></li>
                </ul>
            </div>
             <div class="food-select-item">
                <ul>
                    <li class="name">地址：</li>
                    <li ><a href="">全部</a></li>
                    <li v-for="(item) in citys" :key="item.CityId"><a href="">{{item.CityName}}</a></li>
                </ul>
            </div>
            <div class="food-select-item">
                <ul>
                    <li class="name">排序：</li>
                    <li><a href="">默认</a></li>
                    <li><a href="">任务奖励</a></li>
                    <li><a href="">商家诚信</a></li>
                    <li><a href="">商家积分</a></li>
                </ul>
            </div>
        </div>
        <div class="shop-list-box">
            <ul class="shop-list">
                <li @clcik="goDetail"><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
                <li><shopCard></shopCard></li>
            </ul>
            <div class="page-box">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000">
                </el-pagination>
            </div>
        </div>
  </div>
</template>
<script>
import shopCard from '@/components/shop/shopCard'
export default {
    data(){
        return{
            citys:[],
            classList:[],
            nowClassId:0,
        }
    },
    mounted(){
        this.getClass()
        this.getCity()
    },
    methods:{
        goDetail(){
            this.$router.push('/earthDetail');
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
        },
        getCity(){
            this.$http.get(this.$api.shopCitys).then(res=>{
                if(res.data.Code == 1){
                    this.citys = res.data.Data
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
</style>