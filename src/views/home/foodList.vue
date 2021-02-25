<template>
  <div>
    <div class="brand-top-nav">
      <router-link tag="a" to="/">首页</router-link>
      <span class="iconfont iconjiantou"></span>
      <router-link tag="a" to="/food">美食广场</router-link>
      <!-- <span class="iconfont iconjiantou"></span> -->

    </div>
    <div class="goods-box">
      <h2 class="title">
        全部商品 <span>{{total}}</span>
      </h2>
      <div class="good-class-list">
        <div class="item" :class="{active:nowClass == ''}" @click="getGoodsByClass('')">全部</div>
        <div class="item" v-for="(item,index) in classList" :key="index" :class="{active:nowClass == item.Id}" @click="getGoodsByClass(item.Id)">{{item.CategoryName}}</div>
      </div>
      <ul class="list">
        <li v-for="(item,index) in list" :key="index">
          <foodCard :data="item"></foodCard>
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
</template>
<script>
import { mapState, mapMutations } from 'vuex' //注册 action 和 state
import foodCard from '@/components/food/foodListCard'
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 20,
      total: 0,
      id: '',
      zhuohao: '',
      classList: [],
      nowClass: '',
    }
  },
  computed: {
    ...mapState([
      'myCar'
    ])
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      if (this.$route.query.zhuohao) {
        this.zhuohao = this.$route.query.zhuohao
        this.ScanQRcode();
      } else {
        this.getClass();
        this.getList();
      }

    }
  },
  methods: {
    ...mapMutations([
      'setClearCar'
    ]),
    getList() {
      this.$http.post(this.$api.foodProducts, {
        'MerchantId': this.id,
        'token': localStorage.getItem('token') ? localStorage.getItem('token') : '',
        'pageIndex': this.pageIndex,
        'pageSize': this.pageSize
      }).then(res => {
        if (res.data.Code == 1) {
          let list = res.data.Data.List
          this.list = list.map((item) => {
            return { ...item, MertchntID: res.data.Data.MerchantId, Mertchntname: res.data.Data.MerchantName, tablenumber: res.data.Data.tablenumber, IsQRcode: res.data.Data.IsQRcode }
          })
          console.log(this.list)
          if (!this.myCar[res.data.Data.MerchantId]) {
            this.setClearCar();
          }
          this.total = res.data.Data.Count
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
    //扫码提交
    ScanQRcode() {
      this.$http.limitGet(this.$api.ScanQRcode, {
        MerchanterId: this.id,
        tablenumber: this.zhuohao
      }).then(res => {
        if (res.data.Code == 1) {
          this.getList();
        }
      })
    },
    getGoodsByClass(id) {
      this.nowClass = id;
      this.pageIndex = 1;
      this.$http.post(this.$api.foodProducts, {
        MerchantId: this.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        ProductCategoryId: this.nowClass
      }).then(res => {
        if (res.data.Code == 1) {
          let list = res.data.Data.List
          this.list = list.map((item) => {
            return { ...item, MertchntID: res.data.Data.MerchantId, Mertchntname: res.data.Data.MerchantName, tablenumber: res.data.Data.tablenumber, IsQRcode: res.data.Data.IsQRcode }
          })
          console.log(this.list)
          if (!this.myCar[res.data.Data.MerchantId]) {
            this.setClearCar();
          }
          this.total = res.data.Data.Count
        }
      })
    }
  },
  components: {
    foodCard: foodCard
  }
}
</script>
<style lang="less" scoped>
.goods-box {
  width: @max-width;
  margin: 0 auto 100px;
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
.list {
  .clear();
  padding: 40px 14px 0;
  li {
    float: left;
    width: 265px;
    margin: 0 13px;
    cursor: pointer;
  }
}
.page-box {
  padding: 10px 0 60px 0;
}
@media screen and(max-width:@change_width) {
  .goods-box {
    width: 100%;
    .title {
      padding: 15px 15px 15px 30px;
      border-top: 10px solid #f8f8f8;
      border-bottom: 1px solid #f8f8f8;
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
    .list {
      padding: 15px;
      // overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 0;
        // float: left;
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
