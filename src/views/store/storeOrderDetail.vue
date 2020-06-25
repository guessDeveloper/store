<template>
  <div class="menager-box">
    <div class="status-box">
       <span class="iconfont iconddqr" :class="{iconddqr:detail.orderState == '待付款'|| detail.orderState == '待奖励'}"></span>
       <span class="txt">{{detail.orderState}}</span>
       <div class="order-num one">
          <div class="name">订单编号：</div>
          <div class="order-content">{{detail.orderNumber}}</div>
       </div>
        <div class="order-num two">
          <div class="name">下单时间：</div>
          <div class="order-content">{{detail.orderCreateTime}}</div>
       </div>
       <button class="btn cancle" v-show="detail.orderState == '待付款'" @click="cancleOrder">取消订单</button>
       <button class="btn ok" v-show="detail.orderState == '待付款'" @click="getMoney">确认收款</button>
       <button class="btn jifenbtn" v-show="detail.orderState == '待奖励'" @click="toNew=true">确认返积分</button>
    </div>
    <div class="content">
      <div class="set">
              <span class="iconfont iconzhushi"></span> 请确认消费款到账后，再点击收款！
      </div>
      <div class="table-name">商品信息</div>
       <el-table :data="detail.orderGoodsList"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930" header-row-class-name="table-header-color" class="goods-table">
                    <el-table-column property="img" label="商品信息" width="474" align="left" cell-class-name="order">
                         <template slot-scope="scope">
                            <img :src="scope.row.Photo" alt="" class="product-img"><span class="goods-name">{{scope.row.goodsName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="goodsPrice" label="单价" width="144" align="center"></el-table-column>
                    <el-table-column property="goodsNumber" label="数量" width="84" align="center"></el-table-column>
                    <el-table-column property="Subtotal" label="实付" width="84" align="center"></el-table-column>
                    <el-table-column property="GoodsFanbi" label="返比(%)" width="60" align="center"></el-table-column>
                    <el-table-column property="GoodsIntegralCount" label="返积分" width="84" align="center"></el-table-column>
                </el-table>
      <!-- 移动端-商品信息列表 -->
      <div class="goods-list-small">
        <ul>
          <li v-for="(item, index) in detail.orderGoodsList" :key="index">
            <img :src="item.Photo">
            <div class="list-item-right">
              <p class="list-item-title">{{ item.goodsName }}</p>
              <!-- <p>颜色：黑色 尺码：M</p> -->
              <p class="list-item-value-wrap">
                <span>单价：<span class="list-item-value">￥{{ item.goodsPrice }}</span></span>
                <span>数量：<span class="list-item-value">￥{{ item.goodsNumber }}</span></span>
              </p>
              <p class="list-item-value-wrap">
                <span>小计：<span class="list-item-value list-item-subtotal">￥{{ item.Subtotal }}</span></span>
                <span>实付：<span class="list-item-value">￥{{ item.Subtotal }}</span></span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="table-name">订单信息</div>
      <div class="order-message">
          <div><span>订单编号：</span>{{detail.orderNumber}}</div>
          <div><span>下单时间：</span>{{detail.orderCreateTime}}</div>
      </div>
      <div class="price">
         <div class="item">
              返积分数：<span>{{detail.Integral}}</span>
         </div>
          <div class="item">
              商品件数：<span>{{detail.GoodsCount}}件</span>
         </div>
          <div class="item">
              商品总价：<span>¥{{detail.orderTotalPrices}}</span>
         </div>
          <div class="item">
              实付总额：<span class="pot">¥{{detail.orderGoodRealMoney}}</span>
         </div>
      </div>
    </div>
    <el-dialog title="确认返积分" :visible.sync="toNew" custom-class="custom-dialog">
      <div class="dialog-content-wrap">
        <div class="jifen-line">
          <label for="">用户手机号：</label><span class="content">{{detail.Userphone}}</span> 
          <!-- <label for="">返还比例：</label><span >10%</span> -->
        </div>
        <div class="jifen-line">
          <label for="">消费金额：</label><span class="content">{{detail.orderGoodRealMoney}}</span> <label for="">返积分数量：</label><span >{{detail.Integral}}</span>
        </div>
        <div class="btn-box">
              <button class="ok" @click="backScore">确认</button>
              <button class="no" @click="toNew =false">取消</button>
            </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import '@/plugins/element-table'
export default {
  data(){
    return{

       id:'',
       detail:'',
       toNew:false
    }
  },
  mounted(){
    if(this.$route.query.id){
      this.id = this.$route.query.id
      this.getDetail();
    }
  },
  methods:{
    getDetail(){
      this.$http.storePost(this.$api.GetOrderInfo,{
        OrderId:this.id
      }).then(res=>{
        if(res.data.Code == 1){
          this.detail = res.data.Data
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    },
    //取消订单
    cancleOrder(){
      this.$http.storePost(this.$api.CancelOrder,{
        OrderNo:this.id
      }).then(res=>{
        if(res.data.Code == 1){
          this.$message.success('取消成功')
          this.$router.push('/storeOrder')
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    },
    //确认收款
    getMoney(){
      this.$http.storePost(this.$api.confirmOrderPay,{
        OrderNo:this.id
      }).then(res=>{
        if(res.data.Code == 1){
          this.$message.success('收款成功')
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    },
    //确认返积分
    backScore(){
      this.$http.storePost(this.$api.confirmOrder,{
        OrderNo:this.id
      }).then(res=>{
        if(res.data.Code == 1){
          this.$message.success('积分奖励成功')
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

.status-box{
  box-sizing: border-box;
  width:930px;
  height:120px;
  line-height: 120px;
  margin:30px auto 0;
  background: #FAFBFC;
  border-radius:4px;
  border:1px solid @class_border;
  .txt{
    display: inline-block;
    width:124px;
    font-size:16px;
    color:@main;
    margin-left:20px;
    font-weight: bold;
  }
  .iconddqr{
    font-size:51px;
    color:@main;
    margin-left:35px;
    vertical-align: middle;
  }
  .btn{
    width:160px;
    height:50px;
    border:1px solid @main;
    color:@main;
    background:#fff;
    font-size:16px;
    &.cancle{
      margin-right: 15px;
    }
    &.jifenbtn{
      float: right;
      margin:35px 30px 0 0;
    }
  }
  .order-num{
    display: inline-block;
    vertical-align: middle;
    &.one{
      width:120px;
    }
    &.two{
      width:176px;
    }
    .name{
      font-size:12px;
      color:@subtitle_color;
      line-height: 12px;
      margin-bottom:12px;
    }
    .order-content{
      font-size:12px;
      line-height: 12px;
      text-align: left;
      .overTextOne();
    }
  }
}
.content{
  padding:0 30px;
  .table-name{
     font-size:16px;
     font-weight: bold;
     line-height: 16px;
     margin:40px auto 20px;
  }
  .table-head{
    background:#FAFAFA;
  }
}
.set{
  text-align: left;
  height:30px;
  border:1px solid #F38A1D;
  background:rgba(243,138,29,0.1);
  font-size:12px;
  color:#000;
  margin-top:15px;
  padding-left:10px;
  border-radius: 4px;
  line-height: 30px;
  .iconfont{
    color:@main;
    font-size: 14px;
    margin-right:5px;
    margin-top:1px;
  }
  a{
    color:@main;
  }
}
.order-message{
  padding:7px 20px;
  font-size:12px;
  border-top:1px solid @class_border;
  border-bottom:1px solid @class_border;
  line-height:40px ;
  span{
    color:@subtitle_color;
  }
}
.product-img{
  float: left;
  width:50px;
  height:50px;
  margin:0 20px;
}
.goods-name{
  display:inline-block;
  line-height: 50px;
}
.price{
  text-align: right;
  color:@subtitle_color;
  font-size:14px;
  line-height: 32px;
  padding:30px 0 51px;
  span{
    display: inline-block;
    width:122px;
    color:@percent_color;
    font-weight: bold;
    &.pot{
      font-size:18px;
    }
  }
}
.jifen-line{
  line-height: 12px;
  margin-top:30px;
  margin-bottom:10px;
  label{
    display: inline-block;
    width:72px;
    font-size:12px;
    color:#666;
  }
  .content{
    display: inline-block;
    width:200px;
  }
}
.btn-box{
      .clear();
      margin-top:40px;
      button{
        float: right;
        width:65px;
        height:30px;
        font-size:14px;
        margin-left:15px;
        background:#fff;
        border:1px solid @class_border;
        border-radius: 4px;
      }
      .ok{
        color:#fff;
        background:@main;
        border-color:@main;
      }
    }
     .goods-list-small{
       display: none;
     }
@media screen and(max-width:@change_width){
  .goods-table {
    display: none;
  }
  width:auto;
  margin:15px;
  height:auto;
  padding-bottom:50px;
  overflow:hidden;
  .step{

      &:before{

          width:calc(50% - 60px);
          left:50px;
      }
      &:after{
        width:calc(50% - 60px);
        right:50px;
      }
      .step-item{
        float: none;
        // width:60px;
        height: 65px;
        .iconfont {
          position: absolute;
        }
        .step-name{
          position: absolute;
          width: 60px;
          left: 50px;
          top: 5px;
          font-size:12px;
          line-height: 12px;
          margin-top: 0;
        }
        .time {
          position: absolute;
          width: 120px;
          left: 50px;
          top: 24px;
        }
        &::before {
          content: '';
          width: 2px;
          height: 30px;
          left: 17px;
          top: 38px;
          background-color: #F38A1D;
        }
      }
  }
  .menager-box {
    .status-box {
      width: 92%;
      min-height: 130px;
      height: auto;
      line-height: normal;
      margin: 15px auto 0;
      padding: 15px;
      box-sizing: border-box;
      position: relative;
      .iconddqr {
        margin: 0;
      }
      .txt {
        // float: left;
      }
      .order-num.one {
        position: absolute;
        left: 15px;
        top: 75px;
      }
      .order-num.two {
        position: absolute;
        left: 50%;
        top: 15px;
      }
      .order-num.three {
        position: absolute;
        left: 50%;
        top: 75px;
      }
      .btn {
        width: 100%;
        margin: 50px 0 0;
        float: none;
      }
    }
    .content {
      padding: 0 15px;
      .set {
        height: auto;
      }
    }
  }
  .goods-list-small {
    display: block;
    ul {
      li {
        padding: 15px 0;
        overflow: hidden;
        border-bottom: 1px solid #E8E8E8;
        img {
          width: 40px;
          margin-right: 15px;
          float: left;
        }
        .list-item-right {
          float: left;
          .list-item-title {
            font-size: 14px;
            color: #333333;
          }
          .list-item-value-wrap {
            margin-top: 10px;
            color: #999999;
            .list-item-value {
              color: #333333;
            }
            .list-item-subtotal {
              color: #D51B32;
            }
            &>span:first-child {
              margin-right: 80px;
            }
          }
        }
      }
    }
  }
}
</style>
