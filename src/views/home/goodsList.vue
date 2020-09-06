<template>
  <div class="goods-list">
    <div class="brand-top-nav">
      <router-link tag="a" to="/">首页</router-link>
      <span class="iconfont iconjiantou"></span>
      <span class="now-nav">逛街购物</span>
    </div>
    <div class="goods-box">
      <h2 class="title">
        全部商品 <span>{{total}}</span>
      </h2>
      <div class="good-class-list">
        <div class="item" :class="{active:nowClass == ''}" @click="getGoodsByClass('')">全部</div>
        <div class="item" v-for="(item,index) in classList" :key="index" :class="{active:nowClass == item.Id}" @click="getGoodsByClass(item.Id)">{{item.CategoryName}}</div>
      </div>
      <div class="list-box">
        <ul class="good-list">
          <li v-for="(item,index) in list" :key="index">
            <goodCard :data="item"></goodCard>
          </li>
        </ul>
        <div class="page-box">
          <el-pagination @current-change="getList" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <div class="page-box small">
          <el-pagination small @current-change="getList" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import goodCard from '@/components/shop/shopGoodsCard'
export default {
  data() {
    return {
      id: '',
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      list: [],
      classList: [],
      nowClass: '',
    }
  },
  components: {
    goodCard: goodCard
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getClass();
      this.getList();
    }

  },
  methods: {
    getList() {
      this.$http.post(this.$api.shopProducts, {
        MerchanterId: this.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        ProductCategoryId: this.nowClass
      }).then(res => {
        if (res.data.Code == 1) {
          this.list = res.data.Data.list
          this.total = res.data.Data.count
        }
      })
    },
    //获取产品分类
    getClass() {
      this.$http.post(this.$api.GetMerchantProductClass, {
        MerchantId: this.id
      }).then(res => {
        if (res.data.Code == 1) {
          this.classList = res.data.Data.List
        }
      })
    },
    getGoodsByClass(id) {
      this.nowClass = id;
      this.pageIndex = 1;
      this.$http.post(this.$api.shopProducts, {
        MerchanterId: this.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        ProductCategoryId: this.nowClass
      }).then(res => {
        if (res.data.Code == 1) {
          this.list = res.data.Data.list
          this.total = res.data.Data.count
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
.goods-box {
  width: @max-width;
  margin: 0 auto;
  background: #fff;
  .title {
    padding: 40px 30px 0;
    font-size: 28px;
    text-align: left;
    line-height: 24px;
    span {
      color: @main;
    }
  }
}
.list-box {
  width: @max-width;
  margin: 0px auto 100px;
  background: #fff;
  .page-box {
    padding: 36px 0 60px;
  }
}
.good-list {
  display: block;
  padding: 17px 17px 17px 17px;
  .clear();
  li {
    float: left;
    width: 265px;
    margin: 13px;
  }
}
@media screen and(max-width:@change_width) {
  .goods-box {
    width: 100%;
    .title {
      width: 100%;
      padding: 15px 15px 15px 30px;
      border-bottom: 1px solid #f8f8f8;
      box-sizing: border-box;
      font-size: 20px;
      position: relative;
    }
    .title:before {
      content: "";
      display: block;
      position: absolute;
      left: 15px;
      top: 50%;
      width: 4px;
      height: 30%;
      transform: translateY(-50%);
      background-color: #f38a1d;
    }
    .list-box {
      width: 100%;
      .good-list {
        padding: 15px;
        overflow: hidden;
        li {
          margin: 0;
          float: left;
          width: 50%;
          box-sizing: border-box;
        }
        li:nth-child(odd) {
          padding-right: 8px;
        }
        li:nth-child(even) {
          padding-left: 8px;
        }
      }
    }
  }
}
.good-list {
  display: block;
  padding: 17px 17px 17px 17px;
  .clear();
  li {
    float: left;
    width: 265px;
    margin: 13px;
  }
  @media screen and(max-width:@change_width) {
    padding: 10px 0 0 15px;
    li {
      width: calc(50% - 15px);
      margin: 0 15px 15px 0;
    }
  }
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
    margin: 0 15 / @p;
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
