<template>
  <div>
    <div class="brand-top-nav">
      <router-link tag="a" to="/">首页</router-link>
      <span class="iconfont iconjiantou"></span>
      <span class="now-nav">搜索结果</span>
    </div>
    <div class="list-box" v-show="total>0">
      <div class="good-class-list" v-show="searchType == 'taobao'||searchType == 'pdd'">
        <div class="item" v-for="(item,index) in classList" :key="item.sortId" :class="{active:item.sortId == sort}" @click="clickClass(item)">{{item.sortDescribe}}</div>
      </div>
      <!-- <div class="food-select-item">
        <ul>
          <li class="name">排序：</li> -->
      <!-- <li :class="{active:sort == 0}"><a @click="changeSort(0)">最新商品</a></li>
                    <li :class="{active:sort == 1}"><a @click="changeSort(1)">最高人气</a></li>
                    <li :class="{active:sort == 2||sort == 3,up:sort==2,down:sort==3}"><a @click="changeSort(sort==2?3:2)" class="sort" :class="{up:sort==2,down:sort==3}">价格</a></li> -->
      <!-- <li :class="{active:sort == 0}"><a @click="changeSort(0)">综合排序</a></li>
          <li :class="{active:sort == 1||sort == 2,up:sort==1,down:sort==2}"><a @click="changeSort(sort==1?2:1)" class="sort" :class="{up:sort==1,down:sort==2}">积分比例</a></li>
          <li :class="{active:sort == 3||sort == 4,up:sort==3,down:sort==4}"><a @click="changeSort(sort==3?4:3)" class="sort" :class="{up:sort==3,down:sort==4}">价格</a></li>
          <li :class="{active:sort == 5||sort == 6,up:sort==5,down:sort==6}"><a @click="changeSort(sort==5?6:5)" class="sort" :class="{up:sort==5,down:sort==6}">销量</a></li>
        </ul>
      </div>
      <div class="filter-small-box">
        <ul>
          <li :class="{active:sort == 0}"><a @click="changeSort(0)">综合排序</a></li>
          <li :class="{active:sort == 1||sort == 2,up:sort==1,down:sort==2}"><a @click="changeSort(sort==1?2:1)" class="sort" :class="{up:sort==1,down:sort==2}">积分比例</a></li>
          <li :class="{active:sort == 3||sort == 4,up:sort==3,down:sort==4}"><a @click="changeSort(sort==3?4:3)" class="sort" :class="{up:sort==3,down:sort==4}">价格</a></li>
          <li :class="{active:sort == 5||sort == 6,up:sort==5,down:sort==6}"><a @click="changeSort(sort==5?6:5)" class="sort" :class="{up:sort==5,down:sort==6}">销量</a></li>
        </ul>
      </div> -->
      <ul class="good-list" v-if="searchType == 'taobao'|| searchType == 'pdd'">
        <li v-for='(item,index) in list' :key="index">
          <goodCard :data="item"></goodCard>
        </li>
      </ul>
      <ul class="store-list" v-if="searchType == 'store'">
        <li v-for="(item,index) in list" :key="index" @click="jump(item.ID,item.picurl,item.title)">
          <storeCard :data="item"></storeCard>
        </li>
      </ul>
      <ul class="food-list" v-if="searchType == 'food'">
        <li v-for="(item,index) in list" :key="index">
          <foodCard :item="item"></foodCard>
        </li>
      </ul>
      <ul class="shop-list" v-if="searchType == 'shop'">
        <li v-for="(item,index) in list" :key="index">
          <shopCard :item="item"></shopCard>
        </li>

      </ul>
      <div class="page-box">
        <el-pagination v-if="pageShow" @current-change="pageChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <div class="page-box small">
        <el-pagination small v-if="pageShow" @current-change="pageChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next" :total="total">
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
import { mapState, mapMutations } from 'vuex' //注册 action 和 state
import goodCard from '@/components/taobao/goodCard'
import storeCard from "@/components/common/storeListCard"
import foodCard from '@/components/food/foodCard'
import shopCard from '@/components/shop/shopCard'
export default {
  data() {
    return {
      option: [
        {
          path: ['/', '/taobo', '/taobaoList'],
          name: '淘宝',
          query: this.$api.GetGoodsByKey,
          type: 'taobao'
        }, {
          path: ['/Pdd'],
          name: '拼多多',
          query: this.$api.pddGetGoodsByKey,
          type: 'pdd'
        }, {
          path: ['/storeList'],
          name: '商城返利',
          query: this.$api.storeGJKeyWordSearch,
          type: 'store'
        }, {
          path: ['/shop'],
          name: '逛街购物',
          query: this.$api.GJKeyWordSearch,
          type: 'shop'
        }, {
          path: ['/food'],
          name: '美食广场',
          query: this.$api.MSKeyWordSearch,
          type: 'food'
        }
      ],
      searchType: '',
      searchContent: '',
      searchUrl: '',
      pageIndex: 1,
      pageSize: 20,
      total: 0,
      list: [],
      pageShow: true,
      classList: [], //淘宝拼多多分类
      sort: 0, // 默认排序
      sortName: ''
    }
  },
  components: {
    goodCard: goodCard,
    storeCard: storeCard,
    foodCard: foodCard,
    shopCard: shopCard
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  mounted() {
    if (this.$route.query.type) {
      this.searchType = this.$route.query.type;
      this.option.forEach(element => {
        if (element.type == this.searchType) {
          this.searchUrl = element.query
        }
      });

    }
    if (this.$route.query.content) {
      this.searchContent = this.$route.query.content
    }
    if (this.$route.query.page) {
      this.pageIndex = Number(this.$route.query.page)
      this.pageShow = false;
      this.$nextTick(() => {
        this.pageshow = true
      })
      this.getList();
    } else {
      this.init();
    }

  },
  watch: {
    $route: {
      handler() {
        this.sortId = 0;
        if (this.$route.query.type) {
          this.searchType = this.$route.query.type;
          this.option.forEach(element => {
            if (element.type == this.searchType) {
              this.searchUrl = element.query
            }
          });

        }
        if (this.$route.query.content) {
          this.searchContent = this.$route.query.content
        }
        if (this.$route.query.page) {
          this.pageIndex = Number(this.$route.query.page)
          this.getList();
        } else {
          this.init();
        }
      },
      deep: true,
    }
  },
  methods: {
    init() {
      this.pageIndex = 1;
      this.getClass();
      this.getList();
    },
    pageChange() {
      this.$router.push(`/search?type=${this.searchType}&content=${this.searchContent}&page=${this.pageIndex}`)
      this.getList();
    },
    getList() {

      this.$http.post(this.searchUrl, { pageIndex: this.pageIndex, pageSize: this.pageSize, KeyValue: this.searchContent, sortId: this.sort, sortName: this.sortName }).then(res => {
        if (res.data.Code == 1) {
          res.data.Data.List ? this.list = res.data.Data.List : ''
          res.data.Data.list ? this.list = res.data.Data.list : ''

          this.total = res.data.Data.count
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          this.pageShow = false;
          this.pageShow = true;
        }
      })
    },
    jump(id, img, title) {
      if (!this.isLogin) {
        this.$router.push('/login')
      } else {
        let routeUrl = this.$router.resolve({
          path: "/jump",
          query: { id: id, img: img, title: title }
        });
        window.open(routeUrl.href, '_blank');
        // this.$router.push(`/jump?id=${id}&img=${img}`,'_blank')
      }
    },
    //获取搜索分类
    getClass() {
      this.$http.get(this.$api.GetGoodsSort).then(res => {
        if (res.data.Code == 1) {
          this.classList = res.data.Data
        }
      })
    },
    //点击分类
    changeSort(item) {
      this.sort = item
      this.pageIndex = 1;
      // this.sortName = item.sortName
      this.getList();
    },
    clickClass(item) {
      this.sort = item.sortId
      this.pageIndex = 1;
      this.sortName = item.sortName
      this.getList();
    }
  }

}
</script>
<style lang="less" scoped>
.list-box {
  width: @max-width;
  margin: 20px auto 100px;
  text-align: center;
  background: #fff;
  overflow: hidden;
  .page-box {
    padding: 36px 0 60px;
  }
  @media screen and(max-width:@change_width) {
    width: 100%;
    margin: 10 / @p auto 0;
    // padding-top:15/@p;
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
    padding: 0;
    margin: 0px 0 0 15px;
    li {
      width: calc(50% - 15px);
      margin: 0;
      margin-right: 15px;
    }
  }
}
.store-list {
  .clear();
  border-top: 1px solid @class_border;
  li {
    float: left;
    box-sizing: border-box;
    width: 20%;
    border-bottom: 1px solid @class_border;
    border-right: 1px solid @class_border;
  }
  @media screen and(max-width:@change_width) {
    li {
      width: 33.33%;
    }
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
  @media screen and(max-width:@change_width) {
    width: 100%;
    background-color: transparent;
    padding: 0 15px 15px;
    box-sizing: border-box;
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
.shop-list {
  padding: 15px;
  .clear();
  li {
    float: left;
    width: 555px;
    margin: 15px;
  }
  @media screen and(max-width:@change_width) {
    padding: 5px 15px 15px;
    margin: 0;
    background-color: #f8f8f8;
    li {
      width: 100%;
      margin: 0 0 15px;
      background-color: #ffffff;
      border: 1px solid #eeeeee;
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

.filter-small-box {
  display: none;
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
  @media screen and(max-width:@change_width) {
    display: block;
  }
  background-color: #ffffff;
}
.good-class-list {
  overflow: hidden;
  margin: 30px 15px 0;
  .item {
    float: left;
    font-size: 14px;
    margin: 0 15px;
    cursor: pointer;
    &.active {
      color: @main;
    }
  }
  @media screen and(max-width:@change_width) {
    display: -webkit-box;
    margin: 0 15 / @p 15 / @p;
    line-height: 45 / @p;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      float: none;
      margin: 0 10 / @p 0 0;
      font-size: 12 / @p;
      color: @font_color;
      &.active {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          bottom: 0;
          width: 12 / @p;
          height: 2 / @p;
          background: @main;
        }
      }
    }
  }
}
</style>
