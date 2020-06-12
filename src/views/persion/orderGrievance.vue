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
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>    
                <div class="status-select">
                    状态 
                    <el-dropdown trigger="click">
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
                <div class="status-select">
                    订单类型 
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
                <button class="btn" @click="toNew = true">新的申诉</button>
          </div>
          <div class="table-box">
             <el-table :data="listData"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930">
                    <el-table-column property="orderNum" label="申诉订单号" width="105" align="left">
                    </el-table-column>
                    <el-table-column property="time" label="申诉时间" width="182" align="center"></el-table-column>
                    <el-table-column property="type" label="订单类型" width="105" align="center"></el-table-column>
                    <el-table-column property="status" label="状态" width="110" align="center"></el-table-column>
                    <el-table-column property="result" label="处理结果" width="428" align="center">
                      <template slot-scope="scope">
                         <div class="result">{{scope.row.result}}</div>
                      </template>
                    </el-table-column>
                </el-table>
          </div>
          <!-- 订单申诉 -->
          <el-dialog title="订单申诉" :visible.sync="toNew" width="520px">
              <div class="change-box">
              <div class="wary">订单申诉，请确认您的订单是通过本站跳转并提交的！</div>
              <div class="tip">请输入您要申诉的第三方平台订单号：</div>
                <div class="input-line">
                  <label for="">订单号：</label><div class="input-box"><input type="text" placeholder="请输入订单号"></div>
                </div>
                <div class="input-line"> 
                    <label for="">平台类型：</label>
                    <div class="input-box"> 
                      <el-dropdown>
                          <span class="select el-dropdown-link">
                              全部<i class="iconfont iconxiasanjiao"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>黄金糕</el-dropdown-item>
                              <el-dropdown-item>狮子头</el-dropdown-item>
                              <el-dropdown-item>螺蛳粉</el-dropdown-item>
                          
                          </el-dropdown-menu>
                      </el-dropdown>
                   </div>
                
                </div>
                <div class="input-line"> 
                    <label for="">申诉说明：</label><div class="input-box"><div class="textarea-box"><textarea name="" id="" cols="30" rows="10" placeholder="请输入申诉说明"></textarea><span class="input-limit">还可输入500字</span></div></div>
                </div>
                <div class="btn-box">
                  <button class="ok">确认</button>
                  <button class="no">取消</button>
                  
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
       listData:[{
         orderNum:20191212083520,
         time:'2020-05-05 06:30:30',
         type:'淘宝',
         status:'未处理',
         result:'线上到线下(Online To Offline，O2O)，是指将线下的商务机会与互联网结合，让互联网成为线下交易的平台。O2O服务性电商模式包括选择商品(服务)、下单、支付等流程。随着O2O服务性电商模式的不断发…'
       }],
       toNew:false
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