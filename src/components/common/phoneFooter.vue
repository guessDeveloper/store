<template>
  <div class="fix-box">
    <div class="inner-box">
      <div class="home-box item" :class="{active:nowPath=='/'}" @click="goRouter('/')">
        <span class="iconfont icontab_sy nomall"></span>
        <span class="iconfont icontab_sydj on"></span>
        <div class="name">
          首页
        </div>
      </div>
      <div class="item" :class="{active:nowPath == '/taobao'||nowPath == '/Pdd' ||nowPath == '/storeList',open:newWork}">
        <span class="iconfont icontab_wg nomall" @click="openMenu()"></span>
        <span class="iconfont on icontab_wgdj" @click="openMenu()"></span>
        <div class="name" @click="openMenu()">
          网购消费
        </div>
        <div class="menu">
          <div class="menu-item" :class="{active:nowPath == '/storeList'}" @click="goRouter('/storeList')">商城</div>
          <div class="menu-item" :class="{active:nowPath == '/Pdd'}" @click="goRouter('/Pdd')">拼多多</div>
          <div class="menu-item" :class="{active:nowPath == '/taobao'}" @click="goRouter('/taobao')">淘宝</div>
        </div>
      </div>
      <div class="item" :class="{active:nowPath == '/shop'||nowPath == '/food',open:shore}">
        <span class="iconfont icontab_st nomall" @click="openShoreMenu"></span>
        <span class="iconfont on icontab_stdj" @click="openShoreMenu"></span>
        <div class="name" @click="openShoreMenu">
          实体消费
        </div>
        <div class="menu">
          <div class="menu-item" :class="{active:nowPath == '/food'}" @click="goRouter('/food')">美食广场</div>
          <div class="menu-item" :class="{active:nowPath == '/shop'}" @click="goRouter('/shop')">逛街购物</div>
        </div>
      </div>
      <div class="item" :class="{active:nowPath == '/helpCenter'}" @click="goRouter('/helpCenter')">
        <span class="iconfont icontab_xy nomall"></span>
        <span class="iconfont on icontab_xydj"></span>
        <div class="name">
          商学院
        </div>
      </div>
      <div class="item" :class="{active:nowPath == '/persion'}" @click="goMyPage('/persion')">
        <span class="iconfont icontab_wd nomall"></span>
        <span class="iconfont on icontab_wddj"></span>
        <div class="name">
          我的
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex' //注册 action 和 state
export default {
  data() {
    return {
      nowPath: '/',
      navList: [{
        name: '首页',
        path: '/'
      }, {
        name: '淘宝',
        path: '/taobao',
        child: [
          {
            path: '/taobaoList',
            name: '淘宝列表'
          }
        ]
      }, {
        name: '拼多多',
        path: '/Pdd',
        child: [
          {
            path: '/special',
            name: '活动页面'
          }
        ]
      }, {
        name: '商城',
        path: '/storeList'
      }, {
        name: '逛街购物',
        path: '/shop',
        child: [
          {
            path: '/shopDetail',
            name: '淘宝列表'
          },
          {
            path: '/shopGoodsDetail',
            name: '淘宝列表'
          }, {
            path: '/goodsList',
            name: '商品列表'
          }
        ]
      }, {
        name: '美食广场',
        path: '/food',
        child: [
          {
            path: '/fooddetail',
            name: '美食详情'
          },
          {
            path: '/foodList',
            name: '美食详情'
          }
        ]
      }, {
        name: '帮助中心',
        path: '/helpCenter',
        child: [
          {
            path: '/helpCenterDetail',
            name: '帮助中心详情'
          }
        ]
      }, {
        name: '我的',
        path: '/persion',
        child: [

        ]
      }],
      newWork: false,
      shore: false
    }
  },
  mounted() {
    this.getNowPath();
  },
  computed: {
    ...mapState([
      'isLogin',
      'userInfo'
    ])
  },
  methods: {
    //判断当前路由
    getNowPath() {
      let path = this.$route.path
      this.newWork = false;
      this.shore = false;
      this.navList.forEach(Element => {
        if (Element.path == path) {
          this.nowPath = Element.path
        }
        if (!!Element.child) {
          Element.child.forEach(childElement => {
            if (childElement.path == path) {
              this.nowPath = Element.path
            }
          })
        }
      })
    },
    //打开菜单
    openMenu(open, close) {
      this.newWork = !this.newWork
      this.shore = false
    },
    openShoreMenu() {
      this.shore = !this.shore
      this.newWork = false
    },
    //跳转路由
    goRouter(router) {
      this.$router.push(router)
    },
    //我的
    goMyPage(path) {
      if (this.isLogin) {
        this.$router.push(path)
      } else {
        this.$router.push('/login')
      }
    }
  },
  watch: {
    $route: {
      handler() {
        this.getNowPath()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.fix-box {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  // height: 56 / @p;
  background: #fff;
  box-shadow: 0px -3px 14px 0px rgba(0, 0, 0, 0.06);
  .inner-box {
    display: flex;
    width: 100%;
    height: 56 / @p;
    align-items: center;
    justify-content: space-around;
    color: #999;
    .item {
      position: relative;
      width: 40 / @p;
      text-align: center;
      .nomall {
        display: inline-block;
      }
      .on {
        display: none;
      }
      &.open {
        .menu {
          display: block;
        }
      }
      .menu {
        display: none;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 50 / @p;
        width: 76 / @p;
        padding: 3 / @p 0;
        background: #fff;
        box-shadow: 0px -10px 20px 0px rgba(0, 0, 0, 0.2);
        .menu-item {
          width: 60 / @p;
          margin: 0 auto;
          line-height: 36 / @p;
          font-size: 12 / @p;
          border-bottom: 1px solid @class_border;
          &.active {
            color: @main;
          }
          &:nth-last-child(1) {
            border: 0;
          }
        }
      }
      &.active {
        .name {
          color: @main;
        }
        .nomall {
          display: none;
        }
        .on {
          display: inline-block;
          color: @main;
        }
      }
      .iconfont {
        font-size: 20 / @p;
      }
      .name {
        font-size: 10 / @p;
      }
    }
  }
}
</style>