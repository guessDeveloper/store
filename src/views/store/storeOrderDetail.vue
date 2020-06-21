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
       <el-table :data="detail.orderGoodsList"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930" header-row-class-name="table-header-color">
                    <el-table-column property="img" label="商品信息" width="474" align="left" cell-class-name="order">
                         <template slot-scope="scope">
                            <img :src="scope.row.Photo" alt="" class="product-img"><span class="goods-name">{{scope.row.goodsName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="goodsPrice" label="单价" width="144" align="center"></el-table-column>
                    <el-table-column property="goodsNumber" label="数量" width="84" align="center">
                       
                    </el-table-column>
                    <el-table-column property="Subtotal" label="小计" width="144" align="center"></el-table-column>
                    <el-table-column property="Subtotal" label="实付" width="84" align="center"></el-table-column>
                </el-table>
      <div class="table-name">订单信息</div>
      <div class="order-message">
          <div><span>订单编号：</span>{{detail.orderNumber}}</div>
          <div><span>下单时间：</span>{{detail.orderCreateTime}}</div>
      </div>
      <div class="price">
         <div class="item">
              返积分数：<span>{{detail.GoodsCount}}</span>
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
          <label for="">用户手机号：</label><span class="content">18******265</span> <label for="">返还比例：</label><span >10%</span>
        </div>
        <div class="jifen-line">
          <label for="">消费金额：</label><span class="content">600</span> <label for="">返积分数量：</label><span >10%</span>
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
</style>