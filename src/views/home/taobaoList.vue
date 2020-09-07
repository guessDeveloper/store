<template>
  <div class="taobao" v-loading.fullscreen.lock="loading">
    <div class="brand-top-nav">
      <router-link tag="a" to="/">首页</router-link>
      <span class="iconfont iconjiantou"></span>
      <router-link tag="a" to="/taobao">淘宝</router-link>
      <span class="iconfont iconjiantou"></span>
      <span class="now-nav">{{className}}</span>
    </div>
    <div class="food-select-box">
      <div class="food-select-item">
        <ul>
          <li class="name">分类：</li>
          <li :class="{active:classId == 0}"><a @click="changeClass('0','全部')">全部</a></li>
          <li v-for="(item,index) in classList" :key="index" :class="{active:classId == item.catid}"><a @click="changeClass(item.catid,item.titleA)">{{item.titleA}}</a></li>
        </ul>
      </div>
      <div class="food-select-item">
        <ul>
          <li class="name">排序：</li>
          <!-- <li :class="{active:sort == 0}"><a @click="changeSort(0)">最新商品</a></li>
                    <li :class="{active:sort == 1}"><a @click="changeSort(1)">最高人气</a></li>
                    <li :class="{active:sort == 2||sort == 3,up:sort==2,down:sort==3}"><a @click="changeSort(sort==2?3:2)" class="sort" :class="{up:sort==2,down:sort==3}">价格</a></li> -->
          <li :class="{active:sort == 0}"><a @click="changeSort(0)">综合排序</a></li>
          <li :class="{active:sort == 1||sort == 2,up:sort==1,down:sort==2}"><a @click="changeSort(sort==1?2:1)" class="sort" :class="{up:sort==1,down:sort==2}">积分比例</a></li>
          <li :class="{active:sort == 3||sort == 4,up:sort==3,down:sort==4}"><a @click="changeSort(sort==3?4:3)" class="sort" :class="{up:sort==3,down:sort==4}">价格</a></li>
          <li :class="{active:sort == 5||sort == 6,up:sort==5,down:sort==6}"><a @click="changeSort(sort==5?6:5)" class="sort" :class="{up:sort==5,down:sort==6}">销量</a></li>
        </ul>
      </div>
    </div>

    <!-- 移动端筛选条件 -->
    <div class="classify-list-small-box">
      <ul>
        <li @click="changeClass('0','全部')" :class="{active:classId == 0}">全部</li>
        <li v-for="(item, index) in classList" :key="index" :class="{active:classId == item.catid}" @click="changeClass(item.catid,item.titleA)">{{ item.titleA }}</li>
      </ul>
    </div>
    <div class="filter-small-box">
      <ul>
        <li :class="{active:sort == 0}"><a @click="changeSort(0)">综合排序</a></li>
        <li :class="{active:sort == 1||sort == 2,up:sort==1,down:sort==2}"><a @click="changeSort(sort==1?2:1)" class="sort" :class="{up:sort==1,down:sort==2}">积分比例</a></li>
        <li :class="{active:sort == 3||sort == 4,up:sort==3,down:sort==4}"><a @click="changeSort(sort==3?4:3)" class="sort" :class="{up:sort==3,down:sort==4}">价格</a></li>
        <li :class="{active:sort == 5||sort == 6,up:sort==5,down:sort==6}"><a @click="changeSort(sort==5?6:5)" class="sort" :class="{up:sort==5,down:sort==6}">销量</a></li>
      </ul>
    </div>

    <div class="list-box">
      <ul class="good-list">
        <li v-for='(item,index) in list' :key="index">
          <goodCard :data="item"></goodCard>
        </li>
      </ul>
      <div class="page-box">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <div class="page-box small">
        <el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import goodCard from '@/components/taobao/goodCard'
export default {
  data() {
    return {
      className: '',
      classId: '',
      classList: [],
      sort: 0,
      pageIndex: 1,
      pageSize: 20,
      total: 100,
      list: [],
      loading: false
    }
  },
  mounted() {
    this.className = this.$route.query.className
    this.classId = this.$route.query.classId
    this.$route.query.sort ? this.sort = this.$route.query.sort : ''
    this.getClass();
    this.getList();
  },
  components: {
    goodCard: goodCard
  },
  methods: {
    getClass() {
      this.$http.get(this.$api.ListGetClassNoPic).then(res => {
        if (res.data.Code == 1) {
          this.classList = res.data.Data
        }
      })
    },
    //修改分类
    changeClass(id, name) {
      this.classId = id;
      this.pageIndex = 1;
      this.className = name;
      this.$router.push(`/taobaoList?className=${name}&classId=${id}&sort=${this.sort}`)
      this.getList();
    },
    //修改排序
    changeSort(sort) {
      this.sort = sort;
      this.$router.push(`/taobaoList?className=${this.className}&classId=${this.classId}&sort=${this.sort}`)
      this.pageIndex = 1;
      this.getList();
    },
    //获取商品列表
    getList() {
      let sendData = {
        category_id: this.classId,
        sort: this.sort,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      this.loading = true;
      this.$http.post(this.$api.optimusByPager, sendData).then(res => {
        if (res.data.Code == 1) {
          this.list = res.data.Data.List,
            this.total = res.data.Data.count
        }
        setTimeout(() => {
          this.loading = false
        }, this.$util.loadingTime)
      }).catch(() => {
        setTimeout(() => {
          this.loading = false
        }, this.$util.loadingTime)
      })
    },
    //分页数据
    handleCurrentChange() {
      this.getList();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    handleSizeChange(res) {
      console.log(res, 'sss')
    }
  }
}
</script>
<style lang="less" scoped>
.taobao {
  min-height: 100vh;
}
.list-box {
  width: @max-width;
  margin: 20px auto 100px;
  text-align: center;
  background: #fff;
  .page-box {
    padding: 36px 0 60px;
  }
  @media screen and(max-width:@change_width) {
    width: 100%;
    margin: 10 / @p auto 0;
    padding-top: 15 / @p;
  }
}
.good-list {
  display: block;
  padding: 17px;
  .clear();
  li {
    float: left;
    width: 265px;
    margin: 13px;
  }
  @media screen and(max-width:@change_width) {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0px 0 0 15px;
    li {
      width: calc(50% - 15px);
      margin: 0;
      margin-right: 15px;
    }
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
    display: block;
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 45px;
      color: #333333;
      height: 47px;
      .active {
        a {
          color: #f38a1d;
        }
      }
    }

    background-color: #ffffff;
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
</style>
