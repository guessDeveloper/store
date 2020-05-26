<template>
  <div class="menager-box">
    <div class="status-box">
       <span class="iconfont iconddqr"></span>
       <span class="txt">等待确认</span>
       <div class="order-num one">
          <div class="name">订单编号：</div>
          <div class="order-content">62205697599</div>
       </div>
        <div class="order-num two">
          <div class="name">下单时间：</div>
          <div class="order-content">2020-05-02 17:09:35</div>
       </div>
       <button class="btn cancle">取消订单</button>
       <button class="btn ok">确认收款</button>
    </div>
    <div class="content">
      <div class="set">
              <span class="iconfont iconzhushi"></span> 请确认消费款到账后，再点击收款！
      </div>
      <div class="table-name">商品信息</div>
       <el-table :data="listData"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930" header-row-class-name="table-header-color">
                    <el-table-column property="img" label="商品信息" width="474" align="left" cell-class-name="order">
                         <template slot-scope="scope">
                            <img :src="scope.row.img" alt="" class="product-img"><span></span>
                        </template>
                    </el-table-column>
                    <el-table-column property="status" label="单价" width="144" align="center"></el-table-column>
                    <el-table-column property="productName" label="数量" width="84" align="center">
                       
                    </el-table-column>
                    <el-table-column property="time" label="小计" width="144" align="center"></el-table-column>
                    <el-table-column property="money" label="实付" width="84" align="center"></el-table-column>
                </el-table>
      <div class="table-name">订单信息</div>
      <div class="order-message">
          <div><span>订单编号：</span>62205697599</div>
          <div><span>下单时间：</span>2020-05-06 17:09:35</div>
      </div>
      <div class="price">
         <div class="item">
              返积分数：<span>60</span>
         </div>
          <div class="item">
              商品件数：<span>6件</span>
         </div>
          <div class="item">
              商品总价：<span>¥60</span>
         </div>
          <div class="item">
              实付总额：<span class="pot">¥60</span>
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
       }]
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
</style>