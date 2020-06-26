<template>
  <div class="grievance">
     <div class="persion-title">
       订单申诉
     </div>
     <div class="grievace-content">
        <div class="choose-box">
                <div class="date-box">
                  <el-date-picker
                      v-model="dataValue"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                      </el-date-picker>
                </div>
               
               <div class="date-small-box">
                    <div class="small-date-box">
                    <el-date-picker
                        v-model="dataValue[0]"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始日期">
                    </el-date-picker>
                   </div>
                   <div class="date-middle"> -</div>
                   <div class="small-date-box">
                        <el-date-picker
                        v-model="dataValue[1]"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="status-select">
                    状态
          
                      <span class="select">
                        <el-select v-model="status" placeholder="请选择"  >
                            <el-option
                                v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                </div>
             
                <div class="input-box">
                    <input type="text" placeholder="输入订单号">
                    <span class="iconfont iconsousuo" @click="search"></span>
                </div>
                <button class="btn" @click="toNew = true">新的申诉</button>
          </div>
          <div class="table-box">
             <el-table :data="listData"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930">
                    <el-table-column property="orderNumber" label="申诉订单号" width="105" align="left">
                    </el-table-column>
                    <el-table-column property="ComplaintTime" label="申诉时间" width="182" align="center"></el-table-column>
                    <el-table-column property="ordertype" label="订单类型" width="105" align="center"></el-table-column>
                    <el-table-column property="orderstate" label="状态" width="110" align="center"></el-table-column>
                    <el-table-column property="ResultOfHandling" label="处理结果" width="428" align="center">
                      <template slot-scope="scope">
                         <div class="result">{{scope.row.ResultOfHandling}}</div>
                      </template>
                    </el-table-column>
                </el-table>
          </div>
          <!-- 移动端列表 -->
          <div class="mobile-list">
            <div class="list-item" v-for="(item, index) in listData" :key="index">
              <div class="list-item-data">
                <div class="list-item-name">申诉订单号：</div>
                {{ item.orderNumber }}
                <p class="status-wrap">状态：<span>{{ item.orderstate }}</span></p>
              </div>
              <div class="list-item-data">
                <div class="list-item-name">申诉时间：</div>
                {{ item.ComplaintTime }}
              </div>
              <div class="list-item-data">
                <div class="list-item-name">订单类型：</div>
                {{ item.ordertype }}
              </div>
              <div class="list-item-data">
                <div class="list-item-name">处理结果：</div>
                {{ item.ResultOfHandling }}
              </div>
            </div>
          </div>
          <!-- 订单申诉 -->
          <el-dialog title="订单申诉" :visible.sync="toNew" custom-class="custom-dialog">
              <div class="change-box">
              <div class="wary">订单申诉，请确认您的订单是通过本站跳转并提交的！</div>
              <div class="tip">请输入您要申诉的第三方平台订单号：</div>
                <div class="input-line">
                  <label for="">订单号：</label><div class="input-box"><input type="text" placeholder="请输入订单号" v-model.trim="newOrderNumber"></div>
                </div>
                <div class="input-line">
                    <label for="">平台类型：</label>
                    <div class="input-box">
                      <span class="select">
                        <el-select v-model="pingtaiSelect" placeholder="请选择"  >
                            <el-option
                                v-for="item in pingtai"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                      </span>
                   </div>

                </div>
                <div class="input-line">
                    <label for="">申诉说明：</label><div class="input-box"><div class="textarea-box"><textarea name="" id="" cols="30" rows="10" placeholder="请输入申诉说明" v-model.trim="newOrderDes"></textarea><span class="input-limit">还可输入500字</span></div></div>
                </div>
                <div class="btn-box">
                  <button class="ok" @click="addOrder">确认</button>
                  <button class="no" @click="toNew = false">取消</button>

                </div>
              </div>
           </el-dialog>
     </div>
  </div>
</template>
<script>
import '../../plugins/element-dataPicker.js'
export default {
  data(){
    return{
       listData:[],
       dataValue:[new Date(),new Date()],
       status:'',
       total:0,
       statusOptions:[{
         label:'全部',
         value:''
       },
       { //0-待审核 1-已通过 2-已驳回 -1 已取消 
         label:'待审核',
         value:0
       },{
         label:'已通过',
         value:1
       },{
         label:'已驳回',
         value:2
       },{
         label:'已取消',
         value:-1
       }],
       pingtai:[{ //2-淘宝 3-拼多多 4-亿起发 ,
         label:'淘宝',
         value:2
       },{
         label:'拼多多',
         value:3
       },{
         label:'亿起发',
         value:4
       }],
       pingtaiSelect:2,
       toNew:false,
       newOrderNumber:'',
       newOrderDes:'', // 申诉原因
       pageIndex:1,
       pageSize:20,

    }
  },
  mounted(){
    this.dataValue = [this.$util.getNowDate()+' 00:00:00',this.$util.getNowDate()+' 24:00:00']
    this.getList()
  },
  methods:{
    //添加申诉
    addOrder(){
      if(this.newOrderNumber == ''){
        this.$message.error('请输入订单号')
      }else if(this.newOrderDes == ''){
        this.$message.error('请输入申诉说明')
      }else{
        this.$http.limitPost(this.$api.AddOrderAppealList,{
          "orderSerialNumber": this.newOrderNumber,
          "orderType": this.pingtaiSelect,
          "ComplaintContent": this.newOrderDes
        }).then(res=>{
          if(res.data.Code == 1){
            this.$message.success('发送成功')
            this.toNew = false;
            this.newOrderNumber = '';
            this.newOrderDes = '';
            this.getList();
          }else{
            this.$message.error(res.data.Msg)
          }
        })
      }
    },
    //获取申诉列表
    getList(){
      this.$http.limitPost(this.$api.GetOrderAppealList,{
        StartTime:this.dataValue[0],
        EndTime:this.dataValue[1],
        State:this.status,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }).then(res=>{
        if(res.data.Code == 1){
          this.listData = res.data.Data.list
          this.total = res.data.Data.count
        }
      })
    },
    //搜索
    search(){
      this.pageIndex = 1;
      this.getList()
    }
  }
}
</script>
<style lang="less" scoped>
.grievance{
  min-height: @persion_height;
  background:#fff;
}
.grievace-content{
  padding:0 30px;
  @media screen and(max-width:@change_width) {
    padding: 0 15px;
    .choose-box {
      position: relative;
      padding-top: 90px;
      padding-bottom: 0;
      .date-box {
        display: none;
      }
      .date-small-box {
        display: flex;
      }
      .status-select {
        width: 50%;
        margin: 10px 0;
        display: inline-flex;
        align-items: center;
      }
      .select-type {
        justify-content: flex-end;
      }
      .input-box {
        width: 100%;
        margin-left: 0;
      }
      .btn {
        position: absolute;
        top: 15px;
        left: 0;
        width: 100%;
      }
      .btn:after {
        content: '';
        position: absolute;
        left: -15px;
        right: -15px;
        bottom: -25px;
        height: 10px;
        background-color: #F8F8F8;
      }
    }
    .table-box {
      display: none;
    }
    .mobile-list {
      display: block;
    }
  }
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
    .date-box{
        display: inline-block;
        vertical-align: middle;
    }
    .date-small-box {
      display: none;
    }
    .status-select{
      display: inline-block;
      vertical-align: middle;
      margin-left:20px;
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
        line-height:12px ;
        // padding:10px 15px;
        .el-input__icon{
          line-break: 34px;
        }
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
.mobile-list {
  display: none;
  .list-item {
    position: relative;
    padding: 25px 0 10px;
    border-bottom: 1px solid #eeeeee;
    .list-item-data {
      padding-bottom: 15px;
      .list-item-name {
        display: inline-block;
        color: #999999;
      }
      .status-wrap {
        color: #999999;
        float: right;
      }
    }
    .list-item-status {
      position: absolute;
      top: 25px;
      right: 0;
      color: #999999;
    }
  }
}
.result{
  width:375px;
  margin:0 auto;
  text-align: left;
}
.change-box{
  .wary{
    font-size:12px;
    color:@status_Rewarded;
    line-height: 12px;
    margin-top:20px;
    margin-bottom:12px;
  }
  .tip{
    font-size:12px;
    line-height: 12px;
    color:@font_color;
    padding-bottom: 10px;
  }
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
        .select{
          position: relative;
          display: inline-block;
          width:105px;
          height:34px;
          box-sizing:border-box;
          // border:1px solid @class_border;
          font-size:12px;
          line-height:34px ;
          // padding:10px 15px;

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
    @media screen and (max-width:@change_width){
      .input-line {
        .input-box {
          width: calc(100% - 70px);
          input {
            width: calc(100% - 12px);
          }
          .textarea-box {
            width: 100%;
          }
        }
      }
    }
}
</style>
