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
                    <el-dropdown>
                        <span class="select">
                            全部<i class="iconfont iconxiasanjiao"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="input-box">
                    <input type="text" placeholder="输入订单号">
                    <span class="iconfont iconsousuo"></span>
                </div>
                
            </div>
            <div class="table-box">
                  <el-table :data="listData"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930">
                    <el-table-column property="img" label="产品图片" width="50" align="left">
                         <template slot-scope="scope">
                            <img :src="scope.row.img" alt="" class="product-img">
                        </template>
                    </el-table-column>
                    <el-table-column property="status" label="订单号" width="160" align="center"></el-table-column>
                    <el-table-column property="productName" label="产品名称" width="108" align="left"></el-table-column>
                    <el-table-column property="time" label="消费时间" width="195" align="center"></el-table-column>
                    <el-table-column property="type" label="订单类型" width="69" align="center"></el-table-column>
                    <el-table-column property="money" label="消费金额(元)" width="88" align="center"></el-table-column>
                    <el-table-column property="score" label="奖励积分" width="70" align="center"></el-table-column>
                     <el-table-column property="score" label="状态" width="88" align="center"></el-table-column>
                    <el-table-column  label="操作" width="102" align="center">
                         <template slot-scope="scope">
                            <button :data="scope" class="action-btn">查看详情</button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
  </div>
</template>
<script>
import '../../plugins/element-dataPicker.js'
export default {
  data(){
    return{

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
</style>