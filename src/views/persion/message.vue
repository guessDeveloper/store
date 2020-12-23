<template>
  <div class="message-box">
    <div class="persion-title">
      消息通知
    </div>
    <div class="message-list" v-loading="loading">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="message-title">
          {{item.Title}}
          <span class="time">{{item.SendTime}}</span>
        </div>
        <div class="message-content">
          {{changeLine(item.value)}}
        </div>
      </div>
      <div class="no-message" v-show="total == 0">
        <span class="iconfont iconxxzwt"></span>
        <div class="tip">未收到任何系统消息</div>
      </div>
      <div class="page-box">
        <el-pagination @current-change="getMessage" :current-page.sync="pageIndex" :page-size="pageSize" :hide-on-single-page="total == 0" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <div class="page-box small">
        <el-pagination small @current-change="getMessage" :current-page.sync="pageIndex" :page-size="pageSize" :hide-on-single-page="total == 0" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      loading: false,
    }
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    getMessage() {
      this.loading = true
      this.$http.limitPost(this.$api.UserMessageList, {
        IsLook: '[0,1]',
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {

        if (res.data.Code == 1) {
          this.list = res.data.Data.list
          this.total = res.data.Data.count
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setTimeout(() => {
          this.loading = false
        }, 500)

      })
    },
    handleSizeChange() {
      this.getMessage();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    changeLine(content) {
      return content.replace(/\\n/, '</br>')
    }
  }
}
</script>
<style lang="less" scoped>
.message-box {
  min-height: 660px;
}
.message-list {
  padding: 0 30px;
  text-align: center;
  @media screen and(max-width:@change_width) {
    padding: 0 15px;
  }
  .item {
    text-align: left;
    padding-top: 20px;
    padding-bottom: 20px;
    .message-title {
      font-size: 14px;
      line-height: 14px;
      .time {
        float: right;
        font-size: 12px;
        color: @subtitle_color;
      }
    }
    .message-content {
      font-size: 12px;
      color: @subtitle_color;
      line-height: 12px;
      margin-top: 15px;
      white-space: pre-line;
    }
    border-bottom: 1px solid @class_border;
  }
  .no-message {
    text-align: center;
    padding-top: 190px;
    .iconfont {
      font-size: 106px;
      color: @subtitle_color;
    }
    .tip {
      font-size: 14px;
      color: @subtitle_color;
    }
  }
}
.page-box {
  padding: 60px 0;
}
</style>