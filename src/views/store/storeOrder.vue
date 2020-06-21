<template>
  <div class="menager-box">
    <div class="persion-title">
      全部订单  <div class="score-box"><span>剩余积分：<b>239900</b></span><span>待返积分：<b>239900</b></span></div>
    </div>
     <div class="order-content" >
            <div class="choose-box">
                <div class="date-box">
                    <el-date-picker
                        v-model="dataValue"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>

                <div class="status-select">
                    订单状态
                    <!-- <el-dropdown trigger="click" >
                        <span class="select">
                            全部<i class="iconfont iconxiasanjiao"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :>待付款</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled>双皮奶</el-dropdown-item>

                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <span class="select">
                        <el-select v-model="value" placeholder="请选择"  >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
                  <el-table :data="listData"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930">
                    <el-table-column property="img" label="产品图片" width="50" align="left">
                         <template slot-scope="scope">
                            <img :src="scope.row.img" alt="" class="product-img">
                        </template>
                    </el-table-column>
                    <el-table-column property="orderNumber" label="订单号" width="160" align="center"></el-table-column>
                    <el-table-column property="productName" label="产品名称" width="108" align="left"></el-table-column>
                    <el-table-column property="orderCreateTime" label="消费时间" width="195" align="center"></el-table-column>
                    <el-table-column property="type" label="订单类型" width="69" align="center"></el-table-column>
                    <el-table-column property="orderMoney" label="消费金额(元)" width="88" align="center"></el-table-column>
                    <el-table-column property="score" label="奖励积分" width="70" align="center"></el-table-column>
                     <el-table-column property="orderState" label="状态" width="88" align="center"></el-table-column>
                    <el-table-column  label="操作" width="102" align="center">
                         <template slot-scope="scope">
                            <button :data="scope" class="action-btn" @click="goDetail(scope.row.orderNumber)">查看详情</button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 移动端分类列表 -->
            <div class="table-small-box">
                <div class="item">
                    <div class="des">
                        <div>
                            <div class="item-name">
                                订单号：<span class="item-value">20191212083520</span>
                            </div>
                            <div class="item-name">
                                用户名：<span class="item-value">2020-05-05 06:30:30</span>
                            </div>
                            <div class="item-name">
                                消费金额(元)：<span class="item-value">淘宝订单</span>
                            </div>
                            <div class="item-name">
                                下单时间：<span class="item-value">2020-05-05 06:30:30</span>
                            </div>
                            <div class="item-name">
                                返积分数：<span class="item-value">2020</span>
                            </div>
                        </div>
                        <div class="order-status-wrap">
                            <div class="order-status-name">状态：<span>已付款</span></div>
                        </div>
                    </div>
                    <div class="btn-detail">查看详情</div>
                </div>
            </div>

        </div>
  </div>
</template>
<script>
import '../../plugins/element-dataPicker.js'
export default {
  data(){
    return{
        dataValue:[new Date(),new Date()],
        value:'',
        options:[{
            label:"全部",
            value:'',
        },{
            label:'待付款',
            value:0
        },{
            label:'已付款，待奖励',
            value:1
        },{
            label:'已奖励',
            value:2
        },{
             label:'订单取消',
            value:3
        }],
        listData:[],
        orderNum:'',
        pageIndex:1,
        pageSize:20,
        total:0,
    }
  },
  mounted(){
      this.getList();
  },
  methods:{
      search(){
         this.pageIndex = 1;
         this.getList();
      },
      getList(){
         this.$http.storePost(this.$api.GetOrderlist,{
             BingTime:this.dataValue[0],
             entTime:this.dataValue[1],
             state:this.value,
             UserName:this.orderNum,
             pageIndex:this.pageIndex,
             pageSize:this.pageSize
         }).then(res=>{
            if(res.data.Code == 1){
                this.listData = res.data.Data.list;
                this.total = res.data.Data.count
            }
         })
      },
      //产看订单详情
      goDetail(id){
        this.$router.push('/storeOrderDetail?id='+id)
      }
  }
}
</script>
<style lang="less" scoped>
.score-box{
  float: right;
  font-size:15px;
  padding-right:30px;
  span{
    margin-left:40px;
  }
  b{
    color:@main;
  }
}
.order-content{
    padding:0 30px;
    .status-select{
      display: inline-block;
      vertical-align: middle;
      margin-left:20px;
    }
    .choose-box{
    padding:30px 0;
    .btn{
        float: right;
        width:84px;
        height:34px;
        border:1px solid @main;
        color:@main;
        border-radius: 34px;
    }
}
.date-box{
    display: inline-block;
    vertical-align: middle;
}
    .select{
        position: relative;
        display: inline-block;
        width:105px;
        height:34px;
        margin-left:15px;
        box-sizing:border-box;
        // border:1px solid @class_border;
        font-size:12px;
        line-height:34px ;


        .iconfont{
            position: absolute;
            top:10px;
            right:10px;
            transform: scale(.41);
            font-size:12px;
            color:#909399;
        }
    }
    .input-box{
        position: relative;
        display: inline-block;
        width:214px;
        height:32px;
        margin-left:20px;
        border:1px solid @class_border;
        vertical-align: middle;
        input{
            display: block;
            width:165px;
            height:32px;
            padding-left:15px;
            border:0;
        }
        .iconfont{
            display: block;
            position:absolute;
            top:7px;
            right:12px;
            width:14px;
            height:14px;
            font-size:14px;
            color:@subtitle_color;
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
        padding: 0 15px;
        .item {
            padding-top: 20px;
            .des{
                position: relative;
                display: flex;
                .name {
                    font-size:12px;
                    font-family:PingFangSC-Semibold,PingFang SC;
                    font-weight:600;
                    color:rgba(51,51,51,1);
                }
                .item-name {
                    color: #999999;
                    line-height: 26px;
                }
                .item-value {
                    color: #333333;
                }
                .order-status-wrap {
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 1;
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
        border-bottom: 10px solid #F8F8F8;
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
                display: block;
                margin-bottom: 10px;
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
</style>
