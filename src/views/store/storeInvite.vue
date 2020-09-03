<template>
  <div class="invite-box">
    <div class="persion-title">
      邀请分享
    </div>
    <div class="invite" v-loading="loading">
      <div class="user-link">
        <span class="iconfont iconyqyl"></span><span class="name">我的邀请链接：</span>
        <!-- <span class="link" id="foo">{{url}}</span> -->
        <input type="text" readonly class="link" v-model="url">
        <button class="copy" :data-clipboard-text="url">复制</button>
        <div class="erweima-box">
          <span>我的邀请二维码：</span>
          <div class="erweima">
            <div id="qrcode">
              <img :src="qrcUrl" alt="">
            </div>
            <div class="hover-box" id="qrcode2">
              <img :src="qrcUrl">
            </div>
          </div>
          <button class="download" @click="downloadPop = true">下载分享海报</button>
        </div>
      </div>
      <div class="phone-link">
        我的邀请二维码： <img :src="qrcUrl" alt="" class="img"> <button class="download" @click="downloadPop = true"> 下载分享海报</button>
      </div>
      <div class="invite-list-title">
        邀请记录
      </div>
      <div class="invite-list">
        <div class="item" v-for="(item,index) in list" :key="index">
          <div class="user"><span class="header" :style="'background:url('+item.UserImg+') no-repeat center center;'">
              <!-- <img :src="item.UserImg" alt=""> -->
            </span>{{item.NickNamep}}</div>
          <div class="phone">{{item.Tel}}</div>
          <div class="time">{{item.CreateTime}}</div>
        </div>
        <div class="small-item" v-for="(item,index) in list" :key="index">
          <div class="user-box">
            <span class="header" :style="'background:url('+item.UserImg+') no-repeat center center;'">
              <!-- <img :src="item.UserImg" alt=""> -->
            </span>
            <span class="name-box">
              <div class="name">{{item.NickNamep}}</div>
              <div class="phone">{{item.Tel}}</div>
            </span>
          </div>
          <div class="time">{{item.CreateTime}}</div>

        </div>
        <div class="page-box">
          <el-pagination @current-change="getList" :current-page.sync="pageIndex" :page-size="pageSize" :hide-on-single-page="total == 0" layout="prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <div class="page-box small">
          <el-pagination small @current-change="getList" :current-page.sync="pageIndex" :page-size="pageSize" :hide-on-single-page="total == 0" layout="prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="empty" v-show="total == 0">
        <span class="iconfont iconzwyqzwt"></span>
        <div class="name"> 暂无邀请记录</div>
      </div>
    </div>
    <el-dialog title="下载海报" :visible.sync="downloadPop" width="520px" class="small">

      <div class="postImg-header">
        <div class="left">
          海报
        </div>
        <div class="right">
          操作
        </div>

      </div>
      <div class="postImg-line" v-for="(item,index) in posterList" :key="index">
        <div class="name">{{item.Name}}</div>
        <div class="action"><a :href="item.Url" :download="item.Name+'.jpg'" target="_blanck">点击下载</a></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import '@/plugins/clipboard.js'
// import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      url: '',
      pageIndex: 1,
      pageSize: 20,
      list: [],
      Clipboard: '',
      total: 0,
      loading: false,
      qrcUrl: '',
      downloadPop: false,
      posterList: [],
    }
  },
  mounted() {
    this.getUrl();
    const _this = this;
    this.Clipboard = new this.clipboard('.copy');
    this.Clipboard.on('success', function (e) {
      _this.$message.success('复制成功')
      e.clearSelection();
    });

    this.Clipboard.on('error', function () {
      _this.$message.error('复制失败')
    });
    this.getList();
    this.getInviteErweima();
    this.getPoserList();

  },
  beforeDestroy() {
    this.Clipboard.destroy();
  },
  methods: {
    getUrl() {
      this.$http.storeGet(this.$api.MerchantInviterUrl).then(res => {
        if (res.data.Code == 1) {
          this.url = res.data.Data.Url
          // let qrcode = new QRCode('qrcode', {
          //   width: 60,
          //   height: 60, // 高度
          //   text: res.data.Data.Url, // 二维码内容
          //   colorDark: '#000',      //前景色
          //   colorLight: '#fff',      //背景色
          //   correctLevel: QRCode.CorrectLevel.L     //容错等级 
          // })
          // let qrcode2 = new QRCode('qrcode2', {
          //   width: 180,
          //   height: 180, // 高度
          //   text: res.data.Data.Url, // 二维码内容
          //   colorDark: '#000',      //前景色
          //   colorLight: '#fff',      //背景色
          //   correctLevel: QRCode.CorrectLevel.L     //容错等级 
          // })
        }
      })
    },
    //获取邀请链接
    getList() {
      this.loading = true
      this.$http.storePost(this.$api.MerchantInviterList, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {

        if (res.data.Code == 1) {
          this.list = res.data.Data.list
          this.total = res.data.Data.count
        }
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    //获取二维码
    getInviteErweima() {
      this.$http.storeGet(this.$api.GetMerchantinviteVerificationNum).then(res => {
        if (res.data.Code == 1) {
          console.log('111')
          this.qrcUrl = res.data.Data.QRcodeImagePath
        }
      })
    },
    //获取海报列表
    getPoserList() {
      this.$http.storeGet(this.$api.GetMerchantPosterList).then(res => {
        if (res.data.Code == 1) {
          this.posterList = res.data.Data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.invite-box {
  width: 100%;
  min-height: 660px;
  @media screen and(max-width:@change_width) {
    min-height: auto;
  }
}
.invite {
  padding: 0px 30px;
  .user-link {
    height: 106px;
    line-height: 106px;
    text-align: left;
    border-bottom: 1px solid @class_border;
    .iconfont {
      float: left;
      font-size: 42px;
      color: @class_border;
    }
    .name {
      margin-left: 18px;
      font-size: 12px;
      line-height: 106px;
      margin-right: 4px;
    }
    .link {
      display: inline-block;
      width: 346px;
      height: 34px;
      padding: 0 10px;
      overflow: hidden;
      line-height: 34px;
      font-size: 12px;
      word-break: break-all;
      background: @class_border;
      border-radius: 4px;
      vertical-align: middle;
      border: 0;
    }
    .copy {
      width: 70px;
      height: 34px;
      margin-left: 20px;
      margin-right: ;
      color: @main;
      font-size: 12px;
      border: 1px solid @main;
      border-radius: 34px;
    }
    //二维码
    .erweima-box {
      float: right;
      height: 106px;
      line-height: 106px;
      @media screen and(max-width:@change_width) {
        display: none;
      }
      .erweima {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin: 0 20px 0 15px;
        #qrcode {
          img {
            display: block;
            width: 60px;
            height: 60px;
          }
        }
        &:hover {
          .hover-box {
            display: block;
          }
        }
        .hover-box {
          display: none;
          position: absolute;
          top: 81px;
          left: -70px;
          width: 180px;
          height: 180px;
          padding: 10px;
          background: #fff;
          box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
          img {
            display: block;
          }
        }
      }
      .download {
        display: inline-block;
        width: 100px;
        height: 34px;
        color: @main;
        font-size: 12px;
        border: 1px solid @main;
        border-radius: 34px;
      }
    }
  }
  .invite-list-title {
    padding: 40px 0 30px 0;
    font-size: 16px;
    text-align: left;
    border-bottom: 1px solid @class_border;
  }
  .invite-list {
    .item {
      height: 70px;
      border-bottom: 1px solid @class_border;
      div {
        float: left;
        width: 33.33%;
        font-size: 12px;
        line-height: 70px;
      }
      .user {
        font-size: 12px;
        text-align: left;
        line-height: 70px;

        .header {
          text-align: left;
          display: inline-block;
          width: 30px;
          height: 30px;
          margin-right: 8px;
          overflow: hidden;
          background: #ccc;
          border-radius: 30px;
          vertical-align: middle;
          background-size: cover !important;
        }
      }
      .phone {
        text-align: center;
      }
      .time {
        text-align: right;
        font-size: 12px;
        color: @subtitle_color;
      }
    }
    .small-item {
      display: none;
    }
  }
  @media screen and(max-width:@change_width) {
    padding: 0 15px;

    .user-link {
      padding: 0;
      .name {
        float: left;
        height: 12px;
        line-height: 12px;
        margin-top: 22px;
        margin-left: 18px;
      }
      .link {
        float: left;
        box-sizing: border-box;
        width: 180px;
        height: 34px;
        margin-top: 12px;
        margin-left: 18px;
      }
      .copy {
        float: right;
        margin-left: 0;
      }
    }
    .invite-list {
      .item {
        display: none;
      }
      .small-item {
        display: flex;
        width: 100%;
        height: 70px;
        border-bottom: 1px solid @class_border;
        justify-content: space-between;
        .user-box {
          display: flex;
          align-items: center;
          .header {
            width: 30px;
            height: 30px;
            border-radius: 30px;
            background: #ccc;
            overflow: hidden;
            vertical-align: middle;
            background-size: cover !important;
            img {
              height: 100%;
            }
          }
          .name-box {
            margin-left: 8px;
          }
        }
        .time {
          align-self: flex-end;
          line-height: 70px;
          font-size: 12px;
          color: @subtitle_color;
        }
      }
    }
  }
}
.empty {
  text-align: center;
  // padding-top:120px;
  .iconfont {
    display: block;
    margin: 0 auto;
    font-size: 94px;
    color: @placeholder_color;
  }
  .name {
    font-size: 14px;
    line-height: 14px;
    color: @subtitle_color;
  }
  @media screen and(max-width:@change_width) {
    padding-top: 60px;
    padding-bottom: 119px;
  }
}
.page-box {
  padding: 30px 0;
}
//下载弹框
.postImg-header {
  overflow: hidden;
  line-height: 42px;
  border-bottom: 1px solid @class_border;
  color: #999999;
  font-size: 12px;
  .left {
    float: left;
    width: 100px;
    text-align: center;
  }
  .right {
    float: right;
    width: 126px;
    text-align: center;
  }
  @media screen and(max-width:@change_width) {
    display: none;
  }
}
.postImg-line {
  overflow: hidden;
  line-height: 42px;
  border-bottom: 1px solid @class_border;
  .name {
    float: left;
    color: @font_color;
    font-size: 12px;
    padding-left: 10px;
  }
  .action {
    float: right;
    width: 126px;
    text-align: center;
    a {
      color: #4a90e2;
      font-size: 12px;
    }
  }
  @media screen and(max-width:@change_width) {
    .name {
      padding-left: 0;
    }
    .action {
      width: auto;
      text-align: right;
    }
  }
}
.phone-link {
  display: none;
  @media screen and(max-width:@change_width) {
    display: block;
    height: 107 / @p;
    line-height: 107 / @p;
    border-bottom: 1px solid @class_border;
    img {
      display: inline-block;
      width: 77 / @p;
      height: 77 / @p;
      margin-left: 10 / @p;
      vertical-align: middle;
    }
    .download {
      float: right;
      display: inline-block;
      width: 100px;
      height: 34px;
      color: @main;
      font-size: 12px;
      margin-top: 37 / @p;
      border: 1px solid @main;
      border-radius: 34px;
    }
  }
}
</style>
