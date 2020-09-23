<template>
  <div>
    <div class="brand-top-nav">
      <router-link tag="a" to="/">首页</router-link>
      <span class="iconfont iconjiantou"></span>
      <span class="now-nav">商学院</span>
    </div>
    <div class="banner">
      <img src="">
      <!-- <div class="txt"> -->
      <!-- <div class="top">{{banner.titleA}}</div>
             <div class="bottom">{{banner.titleB}}</div> -->
      <!-- <div class="top">帮助中心</div>
             <div class="bottom">Help center</div>
          </div> -->
    </div>
    <div class="qustion-list">
      <div class="title">资料分类</div>
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="goDetal(item)">
          <div class="icon">
            <img :src="item.HtIpIco" alt="">
          </div>
          <div class="content">
            <h3>{{item.Name}}</h3>
            <p>{{item.title}}</p>
          </div>
        </li>

      </ul>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      banner: {},
      list: []
    }
  },
  mounted() {
    this.getClass();
  },
  methods: {
    getClass() {
      this.$http.get(this.$api.Q_A_Class).then(res => {
        if (res.data.Code == 1) {
          // this.banner = res.data.Data.Banner[0]
          this.list = res.data.Data.Class
        }
      })
    },
    goDetal(item) {
      this.$router.push(`/helpCenterDetail?id=${item.ID}`, '_blank')
    }
  }
}
</script>
<style lang="less" scoped>
.banner {
  width: @max-width;
  height: 240px;
  background: #025d94;
  margin: 0 auto;
  color: #fff;
  text-align: center;
  line-height: 240px;
  background: url(../../assets/img/helpCenterBanner.png) no-repeat center center;
  background-size: auto 100%;
  .txt {
    display: inline-block;
    vertical-align: middle;
    .top {
      font-size: 40px;
      line-height: 44px;
      margin-bottom: 10px;
    }
    .bottom {
      font-size: 20px;
      line-height: 20px;
    }
  }
  @media screen and(max-width:@change_width) {
    width: 100%;
    margin-top: 10 / @p;
    height: 140px;
    line-height: 140px;
    .txt {
      .top {
        font-size: 30px;
      }
      .bottom {
        font-size: 14px;
      }
    }
  }
}
.qustion-list {
  width: @max-width;
  margin: 0 auto;
  .title {
    position: relative;
    font-size: 28px;
    line-height: 24px;
    padding-left: 14px;
    margin: 50px auto 20px;
    &::before {
      display: block;
      content: "";
      position: absolute;
      left: 0;
      width: 4px;
      height: 24px;
      background: @main;
    }
  }
  ul {
    .clear();
    padding-bottom: 165px;
    li {
      float: left;
      width: 285px;
      height: 110px;
      background: #fff;
      line-height: 110px;
      margin: 0 20px 20px 0;
      cursor: pointer;
      &:nth-of-type(4n) {
        margin-right: 0;
      }
      .icon {
        display: inline-block;
        width: 60px;
        height: 60px;
        margin: 0 15px 0 30px;
        border-radius: 60px;
        font-size: 24px;
        line-height: 60px;
        color: #c8c8c8;
        border: 1px solid #ffd1c8;
        text-align: center;
        vertical-align: middle;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .content {
        display: inline-block;
        vertical-align: middle;
        h3 {
          font-size: 16px;
          line-height: 16px;
          margin-bottom: 12px;
        }
        p {
          font-size: 12px;
          color: @subtitle_color;
          line-height: 12px;
        }
      }
    }
  }
  @media screen and(max-width:@change_width) {
    width: 100%;
    .title {
      margin-top: 10 / @p;
      margin-bottom: 15 / @p;
      background: #fff;
      line-height: 58 / @p;
      font-size: 20 / @p;
      padding-left: 29 / @p;
      &::before {
        left: 15px;
        top: 19px;
        height: 18px;
      }
    }
    ul {
      padding-bottom: 100px;
      li {
        display: block;
        float: none;
        width: auto;
        margin: 0px 15px 10 / @p;
        &:nth-of-type(4n) {
          margin-right: 15 / @p;
        }
      }
    }
  }
}
</style>
