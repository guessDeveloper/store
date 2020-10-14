<template>
  <div class="menager-box">
    <div class="persion-title">
      全部订单 <div class="score-box"><span>剩余积分：<b>{{SurplusIntegral}}</b></span><span>待奖励积分：<b>{{TobeReturnIntegral}}</b></span></div>
    </div>
    <div class="order-content" v-loading="loading">
      <div class="choose-box">
        <div class="date-box">
          <el-date-picker v-model="dataValue" type="daterange" :editable="false" :clearable="false" range-separator="-" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" @change="getList">
          </el-date-picker>
        </div>
        <div class="date-small-box">
          <div class="small-date-box">
            <el-date-picker v-model="dataValue[0]" type="date" :editable="false" :clearable="false" value-format="yyyy-MM-dd" @change="getList" placeholder="开始日期">

            </el-date-picker>
          </div>
          <div class="date-middle"> -</div>
          <div class="small-date-box">
            <el-date-picker v-model="dataValue[1]" :editable="false" :clearable="false" type="date" value-format="yyyy-MM-dd" @change="getList" placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="status-select">
          订单状态

          <span class="select">
            <el-select v-model="value" placeholder="请选择" @change="getList">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="input-box">
          <input type="text" placeholder="输入订单号" v-model.trim="orderNum">
          <span class="iconfont iconsousuo" @click="search"></span>
        </div>

      </div>
      <div class="table-box">
        <el-table :data="listData" header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930">
          <el-table-column property="orderNumber" label="订单号" width="160" align="left"></el-table-column>
          <el-table-column property="UserName" label="消费者身份号" width="108" align="center"></el-table-column>
          <el-table-column property="orderMoney" label="消费金额(元)" width="165" align="center"></el-table-column>
          <el-table-column property="orderCreateTime" label="下单时间" width="120" align="center"></el-table-column>
          <el-table-column property="table" label="桌号" width="80" align="center"></el-table-column>
          <el-table-column property="orderIntgralCount" label="预估积分" width="88" align="center"></el-table-column>
          <el-table-column property="orderState" label="订单状态" width="100" align="center"></el-table-column>

          <el-table-column label="操作" width="102" align="center">
            <template slot-scope="scope">
              <button :data="scope" class="action-btn" @click="goDetail(scope.row.orderNumber)">查看详情</button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 移动端分类列表 -->
      <div class="table-small-box">
        <div class="item" v-for="(item,index) in listData" :key="index">
          <div class="des">
            <div>
              <div class="item-name">
                订单号：<span class="item-value">{{item.orderNumber}}</span>
              </div>

              <div class="item-name">
                消费者身份号：<span class="item-value">{{item.UserName}}</span>
              </div>
              <div class="item-name">
                消费金额(元)：<span class="item-value">{{item.orderMoney}}</span>
              </div>
              <div class="item-name">
                下单时间：<span class="item-value">{{item.orderCreateTime}}</span>
              </div>
              <div class="item-name">
                桌号：<span class="item-value">{{item.table}}</span>
              </div>
              <div class="item-name">
                预估积分：<span class="item-value">{{item.orderIntgralCount}}</span>
              </div>
            </div>
            <div class="order-status-wrap">
              <div class="order-status-name">状态：<span>{{item.orderState}}</span></div>
            </div>
          </div>
          <div class="btn-detail" @click="goDetail(item.orderNumber)">查看详情</div>
        </div>
      </div>
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
import '../../plugins/element-dataPicker.js'
export default {
  data() {
    return {
      dataValue: ['', ''],
      value: '',
      options: [{
        label: "全部",
        value: '',
      }, {
        label: '待付款',
        value: 0
      }, {
        label: '已付款，待奖励',
        value: 1
      }, {
        label: '已奖励',
        value: 2
      }, {
        label: '订单取消',
        value: 3
      }],
      listData: [],
      orderNum: '',
      pageIndex: 1,
      pageSize: 20,
      total: 0,
      SurplusIntegral: '',
      TobeReturnIntegral: '',
      newOrder: 0,//新订单
      timer: '',
      loading: false
    }
  },
  mounted() {
    //   this.dataValue = [this.$util.getNowDate(),this.$util.getNowDate()]
    this.getList();
    this.getScore();
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.getRealTime()
    }, 14000)

  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    search() {
      this.pageIndex = 1;
      this.getList();
    },
    //获取实时订单
    getRealTime() {
      this.$http.storePost(this.$api.MerchantOrderListRealtime).then(res => {
        if (res.data.Code == 1) {
          this.newOrder = res.data.Data
        }
      })
    },
    getList() {
      this.loading = true
      this.$http.storePost(this.$api.GetOrderlist, {
        BingTime: this.dataValue[0] ? this.dataValue[0] + ' 00:00:00' : '',
        entTime: this.dataValue[1] ? this.dataValue[1] + ' 23:59:59' : '',
        state: this.value,
        UserName: this.orderNum,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.Code == 1) {
          this.listData = res.data.Data.list;
          this.total = res.data.Data.count
        } else {
          this.listData = [];
          this.total = 0;
        }
        setTimeout(() => {
          this.loading = false
        }, this.$util.loadingTime)
      })
    },
    //获取积分
    getScore() {
      this.$http.storeGet(this.$api.MerchantIntegr).then(res => {
        if (res.data.Code == 1) {
          this.SurplusIntegral = res.data.Data.SurplusIntegral
          this.TobeReturnIntegral = res.data.Data.TobeReturnIntegral
        } else {
          this.$message.error(res.data.Msg)
        }
      })
    },
    //产看订单详情
    goDetail(id) {
      this.$router.push('/storeOrderDetail?id=' + id)
    }
  }
}
</script>
<style lang="less" scoped>
.score-box {
  float: right;
  font-size: 15px;
  padding-right: 30px;
  span {
    margin-left: 40px;
  }
  b {
    color: @main;
  }
}
.order-content {
  padding: 0 30px;
  .status-select {
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
  }
  .choose-box {
    padding: 30px 0;
    .btn {
      float: right;
      width: 84px;
      height: 34px;
      border: 1px solid @main;
      color: @main;
      border-radius: 34px;
    }
  }
  .date-box {
    display: inline-block;
    vertical-align: middle;
  }
  .date-small-box {
    display: none;
  }
  .select {
    position: relative;
    display: inline-block;
    width: 105px;
    height: 34px;
    margin-left: 15px;
    box-sizing: border-box;
    // border:1px solid @class_border;
    font-size: 12px;
    line-height: 34px;

    .iconfont {
      position: absolute;
      top: 10px;
      right: 10px;
      transform: scale(0.41);
      font-size: 12px;
      color: #909399;
    }
  }
  .input-box {
    position: relative;
    display: inline-block;
    width: 214px;
    height: 32px;
    margin-left: 20px;
    border: 1px solid @class_border;
    vertical-align: middle;
    input {
      display: block;
      width: 165px;
      height: 32px;
      padding-left: 15px;
      border: 0;
    }
    .iconfont {
      display: block;
      position: absolute;
      top: 7px;
      right: 12px;
      width: 14px;
      height: 14px;
      font-size: 14px;
      color: @subtitle_color;
    }
  }
}
.table-small-box {
  display: none;
}
@media screen and(max-width:@change_width) {
  .table-box {
    display: none;
  }
  .table-small-box {
    display: block;
    // padding: 0 15px;
    .item {
      padding-top: 20px;
      .des {
        position: relative;
        display: flex;
        .name {
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
        }
        .item-name {
          color: #999999;
          line-height: 26px;
        }
        .item-value {
          max-width: 130px;
          color: #333333;
        }
        .order-status-wrap {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
          line-height: 26px;
          background-color: #ffffff;
          .order-status-name {
            color: #999999;
          }
        }
      }
      .btn-detail {
        padding: 15px 0;
        margin-top: 20px;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        text-align: center;
        text-decoration-line: underline;
      }
    }
  }
  .score-box {
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    height: 64px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    border-bottom: 10px solid #f8f8f8;
    span {
      margin-left: 0;
      display: inline-block;
      height: 24px;
      line-height: 24px;
      flex: 1;
      text-align: right;
    }
    span:not(:last-child) {
      border-right: 1px solid #eeeeee;
      text-align: left;
    }
  }
  .order-content {
    padding: 0 15px;
    .choose-box {
      padding: 90px 0 0;
      .date-box {
        display: none;
      }
      .date-small-box {
        display: flex;
        padding-bottom: 10px;
      }

      .status-select {
        width: 50%;
        margin-left: 0;
        padding-right: 8px;
        box-sizing: border-box;
        .select {
          margin-left: 0;
          width: calc(100% - 66px);
        }
      }
      .input-box {
        width: 50%;
        margin-left: 0;
        box-sizing: border-box;
        input {
          width: 100%;
        }
      }
    }
  }
}
.page-box {
  padding: 30px 0;
}
</style>
