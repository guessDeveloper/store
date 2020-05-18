<template>
    <div class="myOrder-box">
        <div class="tab-box">
            <div class="tab-item" @click="toTab(1)" :class="{active:tab ==1}">线上购物订单</div>
             <div class="tab-item" @click="toTab(2)" :class="{active:tab ==2}">地面消费订单</div>
             <div class="input-box" v-show="tab == 1">
                订单号 <input type="text" placeholder="输入订单号"><button>提交订单</button>
             </div>
        </div>    
        <div class="order-content" v-show="tab == '1'">
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
                <button class="btn">订单申诉</button>
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
       <div class="order-content" v-show="tab=='2'">
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
                    <el-table-column property="productName" label="店铺名称" width="247" align="left">
                        <template slot-scope="scope">
                           <div class="store-name">{{scope.row.productName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column property="time" label="消费时间" width="195" align="center"></el-table-column>
                    <el-table-column property="money" label="消费金额(元)" width="88" align="center"></el-table-column>
                     <el-table-column property="score" label="状态" width="88" align="center"></el-table-column>
                    <el-table-column  label="操作" width="102" align="center">
                         <template slot-scope="scope">
                            <button :data="scope" class="action-btn">查看详情</button><button class="action-btn comment-btn" @click="toRate = true">评价</button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 评价 -->
                <el-dialog title="评价" :visible.sync="toRate" width="520px">
                    <div class="rate-box">
                        <div class="input-line">
                            <label for="">商品评分：</label> <div class="input-box" style="padding-top:7px;"><el-rate v-model="value1" ></el-rate></div>
                        </div>
                        <div class="input-line" style="margin-top:10px;">
                            <label for="">填写评论：</label><div class="input-box"><div class="textarea-box"><textarea name="" id="" cols="30" rows="10" placeholder="宝贝是否满足了你的期待？说说你的使用心得分享给其它想购买的朋友吧"></textarea><span class="input-limit">还可输入500字</span></div></div>
                        </div>
                        <div class="btn-box">
                            <button class="ok">确认</button>
                            <button class="no">取消</button>
                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import '../../plugins/element-dataPicker.js'
import '../../plugins/element-rate.js'
export default {
    data(){
        return{
           dataValue:'',
           listData:[
               {
                   img:'https://b-ssl.duitang.com/uploads/item/201706/27/20170627012435_mJLiX.thumb.700_0.jpeg',
                   productName:'儿童网鞋男童透气…',
                   status:'20191212083520',
                   time:'2020-05-05 06:30:30',
                   type:'淘宝订单',
                   money:'3000',
                   score:'333'
               }
           ],
           tab:1,
           value1:'',
           toRate:false
        }
    },
    mounted(){
       this.tab = this.$route.query.tab?this.$route.query.tab:'1'
    },
    methods:{
        toTab(num){
          this.tab = num
          this.$router.push('/myOrder?tab='+num)
        }
    }
}
</script>
<style lang="less" scoped>
.myOrder-box{
    width:100%;
    min-height: @persion_height;
    background:#FFF;
}
.tab-box{
   padding:0 30px;
   height:60px;
   border-bottom:1px solid @class_border;
   .tab-item{
       float: left;
       font-size:20px;
       line-height:60px;
       margin-right:60px;
       cursor: pointer;
       &.active{
           color:@main;
           font-weight: bold;
           position: relative;
           &::after{
               position: absolute;
               left:0;
               bottom:0;
               content:'';
               display: block;
               width:100%;
               height:3px;
               background:@main;
           }
       }
   }
   .input-box{
       float: right;
       font-size:12px;
       line-height: 60px;
       input{
           display: inline-block;
           width:200px;
           height:32px;
           padding-left:15px;
           border:1px solid @class_border;
       }
       button{
           width:84px;
           height:34px;
           border:1px solid @class_border;
           border-left:0;
           background:#fff;
       }
   }
}
.date-box{
    display: inline-block;
    vertical-align: middle;
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
.order-content{
    padding:0 30px;
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
//表格
.table-head{
    .cell{
        padding:0!important;
    }
}
.product-img{
    display: block;
    width:50px;
    height:50px;
}
.action-btn{
    border:0;
    background:none;
}
.comment-btn{
    margin-left:8px;
}
.store-name{
    width:221px;
    .overTextOne()
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