<template>
  <div class="food-box" v-loading.fullscreen.lock="loading">
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
          <li v-for="(item,index) in classType" :key="index" :class="{active:ClasssId == item.ClasssId}"><a @click="changeClass(item.ClasssId)">{{item.Classname}}</a></li>
        </ul>
      </div>
      <div class="food-select-item">
        <ul>
          <li class="name">地址：</li>
          <li :class="{active:cityId == ''}" @click="changeCity('')"><a>全部</a></li>
          <li v-for="(item,index) in cityList" :class="{active:cityId == item.CityId}"><a @click="changeCity(item.CityId)">{{item.CityName}}</a></li>
        </ul>
      </div>
      <div class="food-select-item">
        <ul>
          <li class="name">排序：</li>
          <li :class="{active:sort == 0}"><a @click="changeSort(0)">默认</a></li>
          <li :class="{active:sort == 1||sort==2}"><a class="sort" :class="{up:sort==2,down:sort==1}" @click="changeSort(sort==1?2:1)">任务奖励</a></li>
          <li :class="{acitve:sort == 3|| sort == 4}"><a class="sort" :class="{acitve:sort == 3|| sort == 4,up:sort==3,down:sort==4}" @click="changeSort(sort==4?3:4)">商家诚信</a></li>
          <li :class="{active:sort == 5||sort == 6}"><a class="sort" :class="{active:sort == 5||sort == 6,up:sort==5,down:sort==6}" @click="changeSort(sort==6?5:6)">商家积分</a></li>
        </ul>
      </div>
    </div>

    <!-- 移动端筛选条件 -->
    <div class="classify-list-small-box">
      <ul>
        <li @click="changeClass('')" :class="{active:ClasssId== ''}">全部</li>
        <li v-for="(item, index) in classType" :key="index" :class="{active:ClasssId == item.ClasssId}" @click="changeClass(item.ClasssId)">{{ item.Classname }}</li>
      </ul>
    </div>
    <div class="filter-small-box">
      <div>
        地址：
        <el-dropdown trigger="click" class="select" @command="phoneChangeCity">
          <span class="el-dropdown-link">
            <span class="el-dropdown-label">{{phoneCity}}</span><span class="iconfont icon-arrow-downYellow"></span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{ CityId:'',CityName:'全部'}">全部</el-dropdown-item>
            <el-dropdown-item v-for="(item,index) in cityList" :key="index" :command="item">{{item.CityName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        排序：
        <el-dropdown trigger="click" class="select" @command="phoneChangeSort">
          <span class="el-dropdown-link">
            <span class="el-dropdown-label">{{phoneSort}}</span><span class="iconfont icon-arrow-downYellow"></span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{id:0,name:'默认'}">默认</el-dropdown-item>
            <el-dropdown-item :command="{id:1,name:'任务奖励(正序)'}">任务奖励(正序)</el-dropdown-item>
            <el-dropdown-item :command="{id:2,name:'任务奖励(倒序)'}">任务奖励(倒序)</el-dropdown-item>
            <el-dropdown-item :command="{id:3,name:'商家诚信(正序)'}">商家诚信(正序)</el-dropdown-item>
            <el-dropdown-item :command="{id:4,name:'商家诚信(倒序)'}">商家诚信(倒序)</el-dropdown-item>
            <el-dropdown-item :command="{id:5,name:'商家积分(正序)'}">商家积分(正序)</el-dropdown-item>
            <el-dropdown-item :command="{id:6,name:'商家积分(倒序)'}">商家积分(倒序)</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="food-list-box" v-show="total>0">
      <ul class="food-list">
        <li v-for="(item,index) in list">
          <foodCard :item="item"></foodCard>
        </li>
      </ul>
      <div class="page-box">
        <el-pagination @current-change="getList" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <div class="page-box small">
        <el-pagination samll @current-change="getList" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next" :total="total">
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
import { mapState } from 'vuex' //注册 action 和 state
import foodCard from '@/components/food/foodCard'
export default {
  data() {
    return {
      classType: '',
      ClasssId: '',
      cityList: [],
      cityId: '',
      sort: 0,
      pageIndex: 1,
      pageSize: 20,
      total: 0,
      phoneCity: '全部',
      phoneSort: '默认',
      list: [],
      loading: false
    }
  },
  mounted() {
    let _this = this;
    this.getCalss();
    this.getCity();
    setTimeout(() => {
      _this.getList()
    }, 200)
  },
  computed: {
    ...mapState([
      'positionX',
      'positionY'
    ])
  },
  methods: {
    goDetail() {
      this.$router.push('/foodDetail')
    },
    changeClass(id) {
      this.ClasssId = id;
      this.getList();
    },
    changeCity(id) {
      this.cityId = id
      this.getList();
    },
    phoneChangeCity(item) {
      this.cityId = item.CityId
      this.phoneCity = item.CityName
      this.getList();
    },
    phoneChangeSort(item) {
      this.phoneSort = item.name
      this.sort = item.id;
      this.getList();
    },
    changeSort(id) {
      this.sort = id;
      this.getList();
    },
    //获取分类
    getCalss() {
      this.$http.get(this.$api.foodCategorys).then(res => {
        if (res.data.Code == 1) {
          this.classType = res.data.Data
        }
      })
    },
    getCity() {
      this.$http.get(this.$api.foodCitys).then(res => {
        if (res.data.Code == 1) {
          this.cityList = res.data.Data
        }
      })
    },
    getList() {
      this.loading = true
      this.$http.post(this.$api.foodNearBy, { PointX: this.positionX, PointY: this.positionY, Category: this.ClasssId, BdCityCode: this.cityId, Sort: this.sort, pageIndex: this.pageIndex, pageSize: this.pageSize }).then(res => {
        if (res.data.Code == 1) {
          this.list = res.data.Data.List;
          this.total = res.data.Data.count;
        } else {
          this.$message.error(res.data.Msg)
        }
        setTimeout(() => {
          this.loading = false
        }, this.$util.loadingTime)
      }).catch(() => {
        setTimeout(() => {
          this.loading = false
        }, this.$util.loadingTime)
      })
    }
  },
  components: {
    foodCard: foodCard,
  }
}
</script>
<style lang="less" scoped>
.food-list-box {
  width: @max-width;
  margin: 20px auto 100px;
  background: #fff;
  text-align: center;
  .page-box {
    padding: 30px 0 60px;
  }
}
.food-list {
  display: block;
  background: #fff;
  padding: 15px;
  .clear();
  li {
    float: left;
    width: 360px;
    margin: 15px;
    cursor: pointer;
  }
}
.sort {
  position: relative;
  padding-right: 12px;
  &.up {
    &::after {
      background: url(../../assets/img/icon-sort-up.png) no-repeat center center;
      background-size: 100%;
    }
  }
  &.down {
    &::after {
      background: url(../../assets/img/icon-sort-down.png) no-repeat center
        center;
      background-size: 100%;
    }
  }
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -6px;
    width: 8px;
    height: 12px;
    background: url(../../assets/img/icon-sort.png) no-repeat center center;
    background-size: 100%;
  }
}
.classify-list-small-box {
  display: none;
}
.filter-small-box {
  display: none;
}
@media screen and(max-width:@change_width) {
  .shop-list-box {
    display: none;
  }
  .classify-list-small-box {
    display: block;
    border-top: 10px solid #f8f8f8;
    border-bottom: 1px solid #f8f8f8;
    padding: 0 15px;
    overflow-x: auto;
    overflow-y: hidden;
    height: 58px;
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
        font-size: 12px;
        color: #999999;
      }
      li.active {
        color: #f38a1d;
      }
      li.active:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 13px;
        transform: translateX(-50%);
        width: 50%;
        height: 2px;
        background-color: #f38a1d;
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
      color: #f38a1d;
      font-size: 12px;
    }
  }
  .food-list-box {
    width: 100%;
    background-color: transparent;
    .food-list {
      padding: 0 15px 15px;
      background-color: transparent;
      li {
        margin: 0;
        width: 100%;
        background-color: #ffffff;
        margin-bottom: 15px;
        .card-des {
          padding: 0 15px 20px;
        }
      }
    }
  }
}
.empty {
  width: @max-width;
  margin: 20px auto 100px;
  height: 500px;
  text-align: center;
  background: #fff;
  overflow: hidden;
  .iconfont {
    display: block;
    margin-top: 104px;
    font-size: 114px;
    color: #c8c8c8;
  }
  .tip {
    font-size: 14px;
    color: @subtitle_color;
  }
  @media screen and(max-width:@change_width) {
    width: 100%;
  }
}
</style>
