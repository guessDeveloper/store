<template>
  <div class="myPorint-box">
    <div class="persion-title">
      我的积分
    </div>
    <div class="myPorint-content">
      <div class="content">
        <div class="item first-item">
           <span class="iconfont iconjfgl"></span>
            <div class="mycsore">
              当前积分
              <div class="score">1000</div>
            </div>
            <button class="btn">一键兑换</button>
        </div>
        <div class="item second-item">
           <div class="name">累计获得</div>
           <div class="score">1800</div>
           <a  class="check-btn" @click="dialogFormVisible = true">查看记录</a>
        </div>
        <div class="item thrid-item">
           <div class="name">累计兑换</div>
           <div class="score">1800</div>
           <a  class="check-btn" @click="duihuan = true">查看记录</a>
        </div>
      </div>
    </div>
    <el-dialog title="获取记录" :visible.sync="dialogFormVisible" width="520px">
    <el-table :data="gridData" style="width:480px;" header-row-style="font-size:12px;color:#999;" row-class-name="table-line">
    <el-table-column property="date" label="订单号" width="134" align="center" fontSize="12px" cell-style="font-size:12px;"></el-table-column>
    <el-table-column property="time" label="时间" width="154" align="center"></el-table-column>
    <el-table-column property="stage" label="消费平台" width="124" align="center"></el-table-column>
    <el-table-column property="num" label="积分数量" width="68" align="center"></el-table-column>
  </el-table>
   <div class="page-box">
     <el-pagination
  :page-size="20"
  :pager-count="6"
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
   </div>
    </el-dialog>
      <el-dialog title="兑换记录" :visible.sync="duihuan" width="520px">
    <el-table :data="changeData" style="width:480px;" header-row-style="font-size:12px;color:#999;" row-class-name="table-line">
    <el-table-column property="time" label="时间" width="154" align="center"></el-table-column>
    <el-table-column property="status" label="状态" width="258" align="center"></el-table-column>
    <el-table-column property="num" label="积分数量" width="68" align="center"></el-table-column>
  </el-table>
   <div class="page-box">
     <el-pagination
  :page-size="20"
  :pager-count="6"
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
   </div>
    </el-dialog>
  </div>
</template>
<script>
import '../../plugins/element-table.js'
export default {
  data(){
    return{
        dialogFormVisible:false,
        duihuan:false,
        gridData: [{
          date: '201205421545',
          time: '2019-12-04 12:10:00',
          stage: '京东',
          num:'+200'
        }, ],
        changeData:[{
          time:'2019-12-04 12:10:00',
          status:'兑换成功',
          num:'+200'
        }]
    }
  }
}
</script>
<style lang="less" scoped>
.myPorint-box{
  width:100%;
  min-height:@persion_height ;
}
.myPorint-content{
  padding:0 30px;
}
.content{
  .clear();
  padding:50px 0;
  border-bottom:1px solid @class_border;
  .item{
    float:left;
    line-height: 12px;
    .name{
      margin-top:6px;
      line-height: 12px;
      color:@subtitle_color;
      font-size:12px;
    }
    .score{
      font-size:20px;
      font-weight: bold;
      margin-top:15px;
      line-height: 12px;
    }
    .check-btn{
      display:inline-block;
      margin-top:15px;
      font-size:12px;
      line-height: 12px;
      color:@persion_left;
      text-decoration: underline;
    }
  }
  .first-item{
    width:310px;
    height:80px;
    padding-left:30px;
    line-height: 80px;
    border-right: 1px solid @class_border;
    .iconfont{
      font-size:40px;
      color:@class_border;
      vertical-align: middle;
    }
    .mycsore{
      display: inline-block;
      font-size:12px;
      line-height: 12px;
      color:@subtitle_color;
      vertical-align: middle;
      margin-left:15px;
      margin-right:50px;
      .score{
        font-size:20px;
        color:@main;
        font-weight: bold;
        line-height: 12px;
        margin-top:13px;
      }
    }
    .btn{
      width:90px;
      height:34px;
      color:@main;
      font-size: 12px;
      border:1px solid @main;
      border-radius: 34px;
      vertical-align: middle;
      background:#fff;
    }
  }
  .second-item{
    width:245px;
    height:80px;
    text-align: center;
    border-right:1px solid @class_border;
  }
  .thrid-item{
    width:239px;
    height:80px;
    padding-left:100px;
    text-align: left;
  }
}
.page-box{
  padding:35px 0;
  text-align: center;
}
</style>