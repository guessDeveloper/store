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
       <button class="btn comment"  v-show="detail.state == '已奖励' || detail.state == '待奖励'" @click="goToComment">发表评价</button>
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
                     <div class="time" v-show="step == 4">{{detail.accomplishTime}}</div>
                </div>
                <div class="step-item" :class="{active:step >= 5}">
                    <span class="step-num">5</span>
                    <span class="iconfont iconqrwc"></span>
                    <div class="step-name">获赠积分</div>
                    <div class="time" v-show="step == 5">{{detail.accomplishTime}}</div>
                </div>
            </div>
        <!-- 步骤 -->
      <div class="table-name">商品信息</div>
       <el-table :data="detail.OrderGoodsList"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930" header-row-class-name="table-header-color" class="goods-table">
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
      <!-- 移动端-商品信息列表 -->
      <div class="goods-list-small">
        <ul>
          <li v-for="(item, index) in detail.OrderGoodsList" :key="index">
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
<!-- 评价 -->
    <el-dialog title="评价" :visible.sync="toRate" custom-class="custom-dialog">
        <div class="rate-box">
            <div class="input-line">
                <label for="">商品评分：</label> <div class="input-box" style="padding-top:7px;"><el-rate v-model="value1" ></el-rate></div>
            </div>
            <div class="input-line" style="margin-top:10px;">
                <label for="">填写评论：</label><div class="input-box"><div class="textarea-box"><textarea name="" id="" cols="30" rows="10" placeholder="宝贝是否满足了你的期待？说说你的使用心得分享给其它想购买的朋友吧" v-model="comment" maxlength="500"></textarea><span class="input-limit">还可输入{{500-comment.length}}字</span></div></div>
            </div>
            <div class="btn-box">
                <button class="ok" @click="AddComment">确认</button>
                <button class="no" @click="quitComment">取消</button>
            </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import '@/plugins/element-table'
import '../../plugins/element-rate.js'
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
       //评价
      value1:'',
      toRate:false,
      comment:'',
      commentData:''
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
          if(this.detail.state == '待奖励'){
            this.step = 4
          }
          if(this.detail.state == '已奖励'){
            this.step = 5
          }
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
    },
    //评价
  //去评价
    goToComment(){
        this.toRate = true;
    },
    AddComment(){

        this.$http.limitPost(this.$api.AddComment,{
            "MerchantID":this.detail.MerchantID,
            "Content": this.comment,
            "StarNum": this.value1,
            "OrderID": this.commentData.ID
        }).then(res=>{
            if(res.data.Code == 1){
                this.$message.success('评价成功')
                this.toRate = false
                this.value1 = ''
                this.comment = ''
            }else{
                this.$message.error(res.data.Msg)
            }
        })
    },
    quitComment(){
        this.toRate = false
        this.value1 = ''
        this.comment = ''
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
    &.comment{
      border-color:#4A90E2;
      background:#4A90E2;
      color:#fff;
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
                  width:168px;
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
                display: none;
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
    .goods-list-small {
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
            .middle{

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
// 评价
.rate-box{
  .input-line{
    margin-top:20px;
    label{
      float: left;
      display: inline-block;
      width:60px;
      line-height: 34px;
      text-align: right;
      font-size:12px;
      color:@persion_left;
      margin-right:9px;
    }
    .input-box{
      display: inline-block;
      width: auto;
      height:auto;
      margin-left:0;
      border:0;
        .select{
          position: relative;
          display: inline-block;
          width:105px;
          height:34px;
          box-sizing:border-box;
          border:1px solid @class_border;
          font-size:12px;
          line-height:12px ;
          padding:10px 15px;

          .iconfont{
              position: absolute;
              top:10px;
              right:10px;
              transform: scale(.41);
              font-size:12px;
              color:#909399;
          }
       }
       input{
         display: block;
         width:397px;
         height:32px;
         padding-left: 12px;
         font-size:12px;
         border:1px solid @class_border;
       }
       .textarea-box{
         position: relative;
         width:411px;
         textarea{
           display: block;
           box-sizing: border-box;
           width:100%;
           height:134px;
           border:1px solid @class_border;
           padding:12px 12px;
           font-size:12px;
           line-height: 18px;
           outline: none;
         }
         .input-limit{
           position: absolute;
           right:12px;
           bottom:12px;
           font-size:12px;
           color:@persion_left;

         }
       }
        @media screen and(max-width:@change_width) {
            width: calc(100% - 70px);
            .textarea-box {
                width: 100%;
            }
        }
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
}
</style>
