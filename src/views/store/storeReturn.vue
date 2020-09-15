<template>
  <div class="menager-box">
    <div class="persion-title">
      扫码返积分
    </div>
    <div class="content">
      <div class="input-line">
        <label for="">消费者身份码：</label>
        <div class="input-box"><input type="text" placeholder="请输入消费者手机号/或者扫描用户二维码" v-model.trim="userPhone"></div>
      </div>
      <div class="input-line">
        <label for="">消费金额: </label>
        <div class="input-box"><input type="text" placeholder="请输入消费金额" v-model.trim="money"></div>
      </div>
      <div class="input-line">
        <label for="">请选择返还比例：</label>
        <div class="input-box percent"><input type="text" placeholder="默认调取商家的奖励比例" v-model="rateE">
          <div class="danwei">%</div>
        </div>
      </div>
      <div class="input-line input-line-integral">
        <label for="">返积分数量：</label>
        <div class="input-box"><span class="tip">{{backNum}}</span> </div>
      </div>
      <div class="input-line">
        <button class="submit" @click="btnCheck">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import '../../plugins/element-table.js'
import { mapState, mapMutations } from 'vuex' //注册 action 和 state
export default {
  data() {
    return {
      userPhone: '',
      money: '',
      rateE: '',
      lock: false,
    }
  },
  computed: {
    ...mapState([
      'ScoreRate',
      'storeInfo'
    ]),
    backNum() {
      if (this.money !== '' & this.rateE !== '') {
        return Math.floor(this.money * this.rateE / 100 * this.ScoreRate * 100) / 100
      } else {
        return '自动计算用户返积分数量'
      }
    },
    rate() {
      return this.storeInfo.ReturnPercent
    }
  },
  watch: {
    storeInfo: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.rateE = newVal.ReturnPercent
      }
    }
  },
  mounted() {
    console.log(this.ScoreRate)
    if (this.$route.query.phone) {
      this.userPhone = this.$route.query.phone
    }
    this.rateE = this.storeInfo.ReturnPercent
  },
  methods: {
    btnCheck() {
      if (this.userPhone == '') {
        this.$message.error('请输入用户手机号');
      } else if (this.money == '') {
        this.$message.error('请输入消费金额')
      } else if (!/^[0-9]+(.[0-9]{2})?$/.test(this.money)) {
        this.$message.error('请输入正确的金额')
      } else if (this.money > 10000000) {
        this.$message.error('消费金额不能超过1000万')
      } else if (this.rateE < 0 || this.rateE > 60) {
        this.$message.error('请输入正确1%-60%的比例')
      } else {
        if (this.lock) {
          return false
        }
        this.lock = true
        this.$http.storePost(this.$api.ReturnUserIntegrals, {
          Mobile: this.userPhone,
          SpendMoney: this.money,
          Rate: this.rateE
        }).then(res => {
          if (res.data.Code == 1) {
            this.clear();
            this.$message.success('返利成功')
          } else {
            this.$message.error(res.data.Msg)
          }
          this.lock = false
        })
      }
    },
    //清空
    clear() {
      this.userPhone = '';
      this.money = '';
      // this.rate = '';
    },
    //返利给用户
    backUser() {
      this.$http.storePost(this.$api.ReturnUserIntegrals, {
        Mobile: this.userPhone,
      }).then(res => {
        if (res.data.Code == 1) {
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  padding-top: 30px;
}
.input-line {
  position: relative;
  width: 380px;
  margin: 0 auto 20px;
  label {
    position: absolute;
    top: 0;
    right: 380px;
    width: 200px;
    font-size: 14px;
    line-height: 50px;
    color: #464855;
    text-align: right;
    padding-right: 15px;
  }
  .input-box {
    &.percent {
      overflow: hidden;
      input {
        float: left;
        width: 350px;
      }
      .danwei {
        float: right;
        line-height: 50px;
      }
    }
    input {
      display: block;
      box-sizing: border-box;
      width: 380px;
      height: 50px;
      border: 1px solid @class_border;
      padding: 0 15px;
      font-size: 14px;
      &.readonly {
        background: @readOnly;
      }
    }
    .tip {
      font-size: 14px;
      color: @subtitle_color;
      line-height: 50px;
    }
    .persent {
      position: absolute;
      font-size: ;
    }
  }
  .submit {
    width: 100%;
    height: 50px;
    color: #fff;
    font-size: 16px;
    background: @main;
    border: 0;
    margin: 20px auto 100px;
  }
}
@media screen and(max-width:@change_width) {
  .content {
    padding-top: 56px;
    .input-line {
      width: 92%;
      margin-bottom: 46px;

      label {
        left: 0;
        height: 38px;
        line-height: 38px;
        top: -38px;
        text-align: left;
      }
      .input-box {
        &.percent {
          display: flex;
          input {
            float: left;
          }
          .danwei {
            float: right;
            width: 20px;
            text-align: right;
            line-height: 50px;
          }
        }
        input {
          width: 100%;
        }
      }
    }
    .input-line-integral {
      display: flex;
      margin-top: -25px;
      margin-bottom: 10px;
      label {
        position: static;
        width: 84px;
        height: 50px;
        line-height: 50px;
      }
      .input-box {
      }
    }
  }
}
</style>
