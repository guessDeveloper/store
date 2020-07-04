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
              <div class="score">{{UserIntegral?UserIntegral:'0'}}</div>
            </div>
            <button class="btn" @click="duhuan">一键兑换</button>
        </div>
        <div class="item second-item">
           <div class="name">累计获得</div>
           <div class="score">{{UserIntegralTotal?UserIntegralTotal:'0'}}</div>
           <a  class="check-btn" @click="dialogFormVisible = true">查看记录</a>
        </div>
        <div class="item thrid-item">
           <div class="name">累计兑换</div>
           <div class="score">{{UserIntegralUsed?UserIntegralUsed:'0'}}</div>
           <a  class="check-btn" @click="duihuan = true">查看记录</a>
        </div>
      </div>
    </div>
    <el-dialog title="获取记录" :visible.sync="dialogFormVisible" width="520px" class="small">
    <el-table :data="gridData" style="width:480px;" header-row-style="'font-size:12px;color:#999;'" row-class-name="table-line" class="small-table">
    <el-table-column property="OrderNumber" label="订单号" width="134" align="center" fontSize="12px" cell-style="font-size:12px;"></el-table-column>
    <el-table-column property="ConsumptionTime" label="时间" width="154" align="center"></el-table-column>
    <el-table-column property="PlatformType" label="消费平台" width="124" align="center"></el-table-column>
    <el-table-column property="ConsumptionNumber" label="积分数量" width="68" align="center"></el-table-column>
  </el-table>
   <div class="small-box-list">
    <div class="small-box" v-for="(item,index) in gridData" :key="index">
      <div>
        <div><span class="name">订单号：</span>{{item.OrderNumber}}</div>
        <div><span class="name">消费来源：</span>{{item.PlatformType}}</div>
      </div>
      <div class="right">
        <div>{{item.ConsumptionTime}}</div>
        <div><span class="name">积分数量：</span>{{item.ConsumptionNumber}}</div>
      </div>
    </div>
    </div>
   <div class="page-box">
     <el-pagination
 :page-size="onePageSize"
  :current-page.sync="onePageIndex"
  layout="prev, pager, next"
   @size-change="getSorceList"
  :total="gridDatatotal">
</el-pagination>

   </div>
   <div class="page-box small">
     <el-pagination
     small
 :page-size="onePageSize"
  :current-page.sync="onePageIndex"
  layout="prev, pager, next"
   @size-change="getSorceList"
  :total="gridDatatotal">
</el-pagination>
</div>
    </el-dialog>
      <el-dialog title="兑换记录" :visible.sync="duihuan" width="520px" class="small" @opened="duihuanSuccess = false">
    <el-table :data="changeData" style="width:480px;" header-row-style="font-size:12px;color:#999;" row-class-name="table-line" class="small-table">
    <el-table-column property="time" label="时间" width="154" align="center"></el-table-column>
    <el-table-column property="state" label="状态" width="258" align="center"></el-table-column>
    <el-table-column property="number" label="积分数量" width="68" align="center"></el-table-column>
  </el-table>
   <div class="small-box-list">
      <div class="small-box" v-for="(item,index) in changeData" :key="index">
        <div>
           <div class="middle-time">{{item.time}}</div>
        </div>
        <div class="right">
          <div><span class="name">积分数量：</span>{{item.number}}</div>
          <div>{{item.state}}</div>
        </div>
      </div>
   </div>
   <div class="page-box">
     <el-pagination
     @size-change="getXiaofei"
  :page-size="twoPageSize"
  :current-page.sync="twoPageIndex"
  layout="prev, pager, next"
  :total="changeDataTotal">
</el-pagination>
   </div>
   <div class="page-box small">
     <el-pagination
     small
     @size-change="getXiaofei"
  :page-size="twoPageSize"
  :current-page.sync="twoPageIndex"
  layout="prev, pager, next"
  :total="changeDataTotal">
</el-pagination>
   </div>
    </el-dialog>
     <el-dialog title="" :visible.sync="duihuanSuccess" width="320px" class="small" :show-close="true">
       
       <div class="duihuan-success">
          <span class="iconfont iconqrwc"></span>
          <h3>积分兑换申请成功</h3>
          <p>请耐心等待处理</p>
          <div class="btn" @click="chakan">查看兑换记录</div>
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
        duihuanSuccess:false,
        gridData: [ ],
        changeData:[],
        UserIntegral:'',
        UserIntegralTotal:'',
        UserIntegralUsed:'',
        onePageIndex:1,
        onePageSize:10,
        twoPageIndex:1,
        twoPageSize:10,
        gridDatatotal:0,
        changeDataTotal:0
    }
  },
  mounted(){
    this.getCode();
    this.getSorceList();
    this.getXiaofei();
  },
  methods:{
    getCode(){
      this.$http.limitGet(this.$api.UserIntegralRecordInfo).then(res=>{
         if(res.data.Code == 1){
           const data = res.data.Data;
           this.UserIntegral = data.UserIntegral;
           this.UserIntegralTotal = data.UserIntegralTotal
           this.UserIntegralUsed = data.UserIntegralUsed
         }
      })
    },
    chakan(){
      // this.duihuanSuccess = false;
      this.duihuan = true
    },
    duhuan(){
      if(this.UserIntegral == ''|| this.UserIntegral == '0'){
         this.$message.error('您还没有赚到积分，您现在需要努力赚积分哟，加油！')
         return false
      }
      this.$http.limitPost(this.$api.IntegralExchange,{
        IntegralNum:this.UserIntegral
      }).then(res=>{
        this.duihuanSuccess = true
        if(res.data.Code == 1){
          this.gridData = res.data.Data.list
          this.gridDatatotal = res.data.Data.count
        }
      })
    },
    //获取用户积分记录
    getSorceList(){
      this.$http.limitPost(this.$api.UserIntegralRecords,{pageIndex:this.onePageIndex,pageSize:this.onePageSize}).then(res=>{
         if(res.data.Code == 1){
          this.gridData = res.data.Data.list
          this.gridDatatotal = res.data.Data.count
        }
      })
    },
    //获取用户消费记录
    getXiaofei(){
      this.$http.limitPost(this.$api.UserUsedIntegralRecords,{pageIndex:this.twoPageIndex,pageSize:this.twoPageSize}).then(res=>{
        if(res.data.Code == 1){
          this.changeData = res.data.Data.list
          this.changeDataTotal = res.data.Data.count
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.myPorint-box{
  width:100%;
  min-height:@persion_height ;
  @media screen and(max-width:@change_width){
     min-height: auto;
   }
}
.myPorint-content{
  padding:0 30px;
   @media screen and(max-width:@change_width){
     padding:0 15px;
   }
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
  @media screen and(max-width:@change_width){
    padding-top:0;
    border:0;
    .first-item{
      width:100%;
      height:110px;
      line-height: 110px;
      padding-left:0;
      border-right:0;
      border-bottom:1px solid @class_border;
      .btn{
        float:right;
        margin-top:38px;
      }
      margin-bottom:40px;
    }
    .second-item{
      box-sizing: border-box;
      width:50%;
    }
    .thrid-item{
      width:50%;
      padding:0;
      text-align: center;
    }
  }
}
.page-box{
  padding:35px 0;
  text-align: center;
}
.duihuan-success{
  width:100%;
  height:200px;
  text-align: center;
  .iconfont{
    font-size:60px;
    color:#52C41A;
  }
  h3{
    font-size:18px;
    line-height: 18px;
    margin-top:25px;
  }
  p{
    font-size:12px;
    color:@persion_left;
    margin-top:15px;
  }
  .btn{
    font-size:12px;
    float: right;
    margin-top:20px;
    cursor: pointer;
  }
}
.small-box{
  display: none;
  @media screen and(max-width:@change_width){
    display: flex;
    font-size:12px;
    line-height: 16px;
    justify-content: space-between;
    padding:4px 0;
    border-bottom:1px solid @class_border;
    .name{
      color:@subtitle_color;
    }
    .right{
      text-align: right;
    }
    .middle-time{
      line-height: 32px;
    }
  }
}
.small-box-list{
  display: none;
}
 @media screen and(max-width:@change_width){
   .small-box-list{
     display: block;
     border-top:1px solid @class_border;
   }
   .small-table{
     display: none;
   }
 }
</style>