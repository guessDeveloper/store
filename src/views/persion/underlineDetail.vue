<template>
  <div class="menager-box">
    <div class="status-box">
       <span class="iconfont " :class="{iconddqr:detail.state !== '以奖励'}"></span>
       <span class="txt">{{detail.state}}</span>
       <div class="order-num one">
          <div class="name">订单编号：</div>
          <div class="order-content">{{detail.orderNumber}}</div>
       </div>
        <div class="order-num two">
          <div class="name">下单时间：</div>
          <div class="order-content">{{detail.createrTime}}</div>
       </div>
       <div class="order-num three">
         <div class="name">积分约：</div>
          <div class="order-content">
            {{detail.BonusPoints}}
          </div>
       </div>
       <button class="btn ok" @click="CollectionConfirmation" v-show="detail.state=='待付款'">取消订单</button>
    </div>
    <div class="content">
      <div class="set">
              <span class="iconfont iconzhushi"></span> 对于未完成的订单，您可以在24小时后取消，如果想提前取消，请联系商家。
      </div>
      <!-- 步骤 -->
      <div class="step step-one" v-show="step != 3">
                <div class="step-item" :class="{active:step >= 1}">
                    <span class="step-num">1</span>
                    <span class="iconfont iconqrwc"></span>
                    <div class="step-name">提交订单</div>
                    <div class="time">{{detail.createrTime}}</div>
                </div>
                <div class="step-item middle" :class="{active:step >= 2}">
                    <span class="step-num">2</span>
                    <span class="iconfont iconqrwc"></span>
                    <div class="step-name">付款成功</div>
                </div>
                <div class="step-item middle" :class="{active:step >= 3}">
                    <span class="step-num">3</span>
                    <span class="iconfont iconqrwc"></span>
                    <div class="step-name">商家确认</div>
                </div>
                 <div class="step-item middle" :class="{active:step >= 4}">
                    <span class="step-num">4</span>
                    <span class="iconfont iconqrwc"></span>
                    <div class="step-name">交易完成</div>
                </div>
                <div class="step-item" :class="{active:step >= 5}">
                    <span class="step-num">5</span>
                    <span class="iconfont iconqrwc"></span>
                    <div class="step-name">获赠积分</div>
                </div>
            </div>
        <!-- 步骤 -->
      <div class="table-name">商品信息</div>
       <el-table :data="detail.OrderGoodsList"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930" header-row-class-name="table-header-color">
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
          <div><span>下单时间：</span>{{detail.createrTime}}</div>
      </div>
      <div class="price">
         <div class="item">
              返积分数：<span> {{detail.BonusPoints}}</span>
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
  </div>
</template>
<script>
import '@/plugins/element-table'
export default {
  data(){
    return{
       listData:[{
          img:'',
          des:'口袋里的咖啡馆 日本浓缩胶囊咖啡液8颗装口袋里的咖啡馆 日本浓缩胶…',
          type:''
       }],
       id:'',
       detail:{},
       step:1,
    }
  },
  mounted(){
    this.$route.query.id?this.id = this.$route.query.id:''
    this.getDetail();

  },
  methods:{
    getDetail(){
      this.$http.limitPost(this.$api.UserGroundOrderModel,{
        orderID:this.id
      }).then(res=>{
        if(res.data.Code == 1){
          this.detail = res.data.Data
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    },
    //取消订单
    CollectionConfirmation(){
      this.$http.limitPost(this.$api.CollectionConfirmation,{
        Ordernumber:this.id
      }).then(res=>{
        if(res.data.Code == 1){
          this.$message.success('取消成功')
          this.$router.push('/myOrder?tab=2')
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
    float: right;
    width:160px;
    height:50px;
    border:1px solid @main;
    color:@main;
    margin:35px 30px 0 0 ;
    background:#fff;
    font-size:16px;
    &.cancle{
      margin-right: 15px;
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
//步骤
.step{
        position: relative;
        display: inline-block;
        overflow: hidden;
        margin-top:50px;
        text-align: center;
        &.step-one{
            &::before{
                background:@main;
            }
        }
       
        &:after{
           content:'';
            display: block;
            position: absolute;
            right: 54px;
            top:19px;
            width:288px;
            height:2px;
            background:@class_border; 
        }
        .step-item{
            float: left;
            width:125px;
            position: relative;
            margin-right:75px;
             &:before{
                  content:'';
                  display: block;
                  position: absolute;
                  left: 78px;
                  top:19px;
                  width:190px;
                  height:2px;
                  background:@class_border;
              }
            &.active{
                .step-num{
                    display: none;
                    border-color: @main;
                    color:@main;
                }
                .step-name{
                    color:@main;
                }
                 &::before{
                    background:@main;
                }
                .iconfont{
                  display: block;
                  color:@main;
                  font-size:38px;
                  height:38px;
                  line-height: 44px;
                }
                
            }
            &:nth-last-child(1){
              margin-right:0;
              &::before{
                background:#fff;
              }
            }
            .step-num{
                position: relative;
                display:block;
                width:38px;
                height:38px;
                margin:0 auto;
                border:2px solid @class_border;
                font-size:16px;
                line-height: 38px;
                color:@class_border;
                border-radius: 50%;
                background:#fff;
                z-index: 4;
            }
            .iconfont {
              display: none;
            }
            .step-name{
                font-size:14px;
                line-height:22px;
                margin-top:12px;
                color:@subtitle_color;
            }
            .time{
              font-size:12px;
              color:#C8C8C8;
            }
        }
        // .middle{
        //     margin:0 49px;
        // }
    }
    @media screen and(max-width:@change_width){
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
              float:left;
              width:60px;
              .step-name{
                  font-size:12px;
                  line-height: 12px;
                  margin-top:18px;
              }
            }
            .middle{
                margin:0 70px;
            }
        }
        
    }
</style>