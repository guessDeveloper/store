<template>
    <div class="myOrder-box" >
        <div class="tab-box">
            <div class="tab-item" @click="toTab(1)" :class="{active:tab ==1}">线上购物订单</div>
             <div class="tab-item second" @click="toTab(2)" :class="{active:tab ==2}">地面消费订单</div>
             <div class="input-box" v-show="tab == 1">
                <label>订单号</label> <input type="text" placeholder="输入订单号" v-model="subOrder"><button @click="submitOrder">提交订单</button>
             </div>
        </div>
        <!-- 线上订单 start -->
        <div class="order-content" v-show="tab == '1'" v-loading="loading">
            <div class="choose-small-box">
               <router-link class="btn small-btn" tag="button" to="/orderGrievance">订单申诉</router-link>
               <div class="margin"></div>
               <div class="date-box">
                   <div class="small-date-box">
                    <el-date-picker
                        v-model="onlieTime[0]"
                        type="date"
                        :editable="false"
                        :clearable="false"
                        value-format="yyyy-MM-dd"
                        placeholder="开始日期"
                        @change="getOnlineList">
                    </el-date-picker>
                   </div>
                   <div class="date-middle"> -</div>
                   <div class="small-date-box">
                        <el-date-picker
                        v-model="onlieTime[1]"
                        @change="getOnlineList"
                        type="date"
                        :editable="false"
                        :clearable="false"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期">
                        </el-date-picker>
                    </div>
               </div>
               <div class="select-box">
                   <div class="">
                       <label for="">状态</label>
                      <el-select v-model="onlieStatus" placeholder="请选择"  class="select" @change="getOnlineList">
                        <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                   
                   </div>
                   <div class="last">
                       订单类型
                       
                            <el-select v-model="onlineType" placeholder="请选择"  class="select" @change="getOnlineList">
                                <el-option
                                    v-for="item in orderType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                       
                   </div>
               </div>
               <div class="search-box">
                   <div class="input-box">
                    <input type="text" placeholder="输入订单号" v-model.trim="onlineSearch">
                    <span class="iconfont iconsousuo" @click="getOnlineList"></span>
                  </div>
               </div>
            </div>
            <div class="choose-box">
                <div class="date-box">
                    <el-date-picker
                        v-model="onlieTime"
                        :editable="false"
                        :clearable="false"
                        type="daterange"
                        range-separator="-"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        @change="getOnlineList"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                <div class="status-select">
                    状态
                    <el-select v-model="onlieStatus" placeholder="请选择"  class="select" @change="getOnlineList">
                        <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="status-select">
                    订单类型
                    <el-select v-model="onlineType" placeholder="请选择"  class="select" @change="getOnlineList">
                        <el-option
                            v-for="item in orderType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="input-box">
                    <input type="text" placeholder="输入订单号" v-model.trim="onlineSearch">
                    <span class="iconfont iconsousuo" @click="getOnlineList"></span>
                </div>
                <router-link class="btn" tag="button" to="/orderGrievance">订单申诉</router-link>
            </div>
            <div class="table-box">
                  <el-table :data="listData"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930" class="table-big" >
                    <el-table-column property="img" label="产品图片" width="50" align="left">
                         <template slot-scope="scope">
                            <img :src="scope.row.img" alt="" class="product-img">
                        </template>
                    </el-table-column>
                    <el-table-column property="OrderNumber" label="订单号" width="160" align="center"></el-table-column>
                    <el-table-column property="Name" label="产品名称" width="108" align="left"></el-table-column>
                    <el-table-column property="CreateTime" label="消费日期" width="195" align="center"></el-table-column>
                    <el-table-column property="OrderType" label="订单类型" width="69" align="center"></el-table-column>
                    <el-table-column property="money" label="消费金额(元)" width="88" align="center"></el-table-column>
                    <el-table-column property="fanli" label="奖励积分" width="70" align="center"></el-table-column>
                     <el-table-column property="state" label="状态" width="88" align="center"></el-table-column>
                    <el-table-column  label="操作" width="102" align="center">
                         <template slot-scope="scope">
                            <button :data="scope" class="action-btn" @click="goDetail(scope.row.OrderNumber)">查看详情</button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="table-small-box">
                    <div class="item" v-for="(item,index) in listData" :key="index">
                        <div class="des">
                            <div class="item-img-wrap">
                                <img :src="item.img" alt="" class="item-img">
                            </div>
                            <div>
                                <div class="name">{{item.Name}}</div>
                                <div class="item-name">
                                    订单号：<span class="item-value">{{item.OrderNumber}}</span>
                                </div>
                                <div class="item-name">
                                    消费日期：<span class="item-value">{{item.CreateTime}}</span>
                                </div>
                                <div class="item-name">
                                    订单类型：<span class="item-value">{{item.OrderType}}</span>
                                </div>
                                <div class="item-name">
                                    状态：<span class="item-value">{{item.state}}</span>
                                </div>
                                <div class="item-name">消费金额(元)：<span class="item-value">{{item.money}}</span>

                                </div>
                                <div class="item-name">奖励积分：<span class="item-value">{{item.fanli}}</span></div>
                            </div>
                            <!-- <div class="order-status-wrap">
                                <div class="order-status-name">状态：<span>{{item.state}}</span></div>
                            </div> -->
                        </div>
                        <div class="btn-detail" @click="goDetail(item.OrderNumber)">查看详情</div>
                    </div>
                </div>
             </div>
             <div class="page-box">
                 <el-pagination
                    @current-change="getOnlineList"
                    :current-page.sync="pageIndex"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="onlineTotal">
                </el-pagination>
             </div>
             <div class="page-box small">
                 <el-pagination
                    small
                    v-show="onlineTotal!=0"
                    @current-change="getOnlineList"
                    :current-page.sync="pageIndex"
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="onlineTotal">
                </el-pagination>
             </div>
        </div>
        <!-- 线上订单 end -->
        <!-- 地面订单 start -->
       <div class="order-content" v-show="tab=='2'" v-loading="underlineLoading">
           <div class="choose-small-box choose-small-box-2">
               <div class="date-box">
                   <div class="small-date-box">
                    <el-date-picker
                        v-model="unlineTime[0]"
                        type="date"
                         :editable="false"
                        :clearable="false"
                        @change="getUnderLineList"
                        value-format="yyyy-MM-dd"
                        placeholder="开始日期">
                    </el-date-picker>
                   </div>
                   <div class="date-middle"> -</div>
                   <div class="small-date-box">
                        <el-date-picker
                        v-model="unlineTime[1]"
                        type="date"
                         :editable="false"
                        :clearable="false"
                        @change="getUnderLineList"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期">
                        </el-date-picker>
                    </div>
               </div>
               <div class="select-box">
                   <div class="status-wrap">
                       <label for="">状态</label>
                    <el-select v-model="unlineOrderType" placeholder="请选择"  class="select" @change="getUnderLineList">
                        <el-option
                            v-for="item in unlineType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                   </div>
               </div>
               <div class="search-box">
                   <div class="input-box">
                    <input type="text" placeholder="输入订单号"  v-model.trim="unlineSearch">
                    <span class="iconfont iconsousuo"  @click="foodSearch"></span>
                  </div>
               </div>
            </div>
            <div class="choose-box">
                <div class="date-box">
                    <el-date-picker
                        v-model="unlineTime"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" 
                        @change="getUnderLineList"
                        default-time="">
                        </el-date-picker>
                    </div>
                <div class="status-select">
                    状态
                    <el-select v-model="unlineOrderType" placeholder="请选择"  class="select" @change="getUnderLineList">
                        <el-option
                            v-for="item in unlineType"
                            :key="item.value"
                            :label="item.label"
                            
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="input-box">
                    <input type="text" placeholder="输入订单号" v-model.trim="unlineSearch">
                    <span class="iconfont iconsousuo" @click="foodSearch"></span>
                </div>
            </div>
            <div class="table-box">
                  <el-table :data="unlineData"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930" class="table-big">
                    <!-- <el-table-column property="img" label="产品图片" width="50" align="left">
                         <template slot-scope="scope">
                            <img :src="scope.row.Phtoto" alt="" class="product-img">
                        </template>
                    </el-table-column> -->
                    <el-table-column property="OrderNumber" label="订单号" width="210" align="left">
                         <template slot-scope="scope">
                           <div class="order-name">{{scope.row.OrderNumber}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column property="MerchantName" label="店铺名称" width="247" align="left">
                        <template slot-scope="scope">
                           <div class="store-name">{{scope.row.MerchantName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column property="CreationTime" label="消费日期" width="195" align="center"></el-table-column>
                    <el-table-column property="Money" label="消费金额(元)" width="88" align="center"></el-table-column>
                     <el-table-column property="state" label="状态" width="88" align="center"></el-table-column>
                    <el-table-column  label="操作" width="102" align="center">
                         <template slot-scope="scope">
                            <button :data="scope" class="action-btn" @click="unlineDetail(scope.row.OrderNumber)">查看详情</button><button class="action-btn comment-btn" @click="goToComment(scope.row)" v-if='(scope.row.state=="待奖励"&&scope.row.IsComment == false)||(scope.row.state=="已奖励"&&scope.row.IsComment== false)'>评价</button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="table-small-box">
                    <div class="item" v-for="(item,index) in unlineData" :key="index">
                        <div class="des">
                            <!-- <div class="item-img-wrap">
                                <img :src="item.Phtoto" alt="" class="item-img">
                            </div> -->
                            <div>
                                <div class="name">{{item.MerchantName}}</div>
                                <div class="item-name">
                                    消费日期：<span class="item-value">{{item.CreationTime}}</span>
                                </div>
                                <div class="item-name">
                                    状态：<span class="item-value">{{item.state}}</span>
                                </div>
                                <div class="item-name">消费金额(元)：<span class="item-value">{{item.Money}}</span>

                                </div>
                            </div>
                            <!-- <div class="order-status-wrap">
                                <div class="order-status-name">状态：<span>{{item.state}}</span></div>
                            </div> -->
                        </div>
                        <div class="btn-detail-box">
                           <div class="btn-detail"  @click="unlineDetail(item.OrderNumber)">查看详情</div>
                           <div class="btn-detail" v-if='(item.state=="待奖励"&&item.IsComment == false)||(item.state=="已奖励"&&item.IsComment == false)' @click="goToComment(item)">评价</div>
                        </div>
                    </div>
                </div>
                <div class="page-box">
                    <el-pagination
                        v-show="unlineTotal!=0"
                        @current-change="getUnderLineList"
                        :current-page.sync="unlineIndex"
                        :page-size="unlineSize"
                        layout="prev, pager, next, jumper"
                        :total="unlineTotal">
                    </el-pagination>
                </div>
                <div class="page-box small">
                    <el-pagination
                        small
                        v-show="unlineTotal!=0"
                        @current-change="getUnderLineList"
                        :current-page.sync="unlineIndex"
                        :page-size="unlineSize"
                        layout="prev, pager, next"
                        :total="unlineTotal">
                    </el-pagination>
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
        </div>
    </div>
</template>
<script>
import '../../plugins/element-dataPicker.js'
import '../../plugins/element-rate.js'
export default {
    data(){
        return{
           //线上订单
           onlieTime:['',''],
           pageIndex:1,
           pageSize:20,
           onlineTotal:0,
           onlieStatus:'',
           subOrder:'',
           statusOptions:[
               {value:'',label:'全部'},
               {value:'1',label:'已返利'},
               {value:'2',label:'待返利'},
               {value:'3',label:'等待订单'},
               {value:'-1',label:'订单关闭'},
           ],
           onlineLoading:true,
           orderType:[{ //2-淘宝 3-拼多多 4-亿起发 ,
                label:'淘宝',
                value:2
            },{
                label:'拼多多',
                value:3
            },{
                label:'商城返利',
                value:4
            }],
            onlineType:'',
            onlineSearch:'',
           listData:[],
           loading:false,
           underlineLoading:false,
           tab:1,
           //地面订单
           unlineTime:['',''],
           unlineType:[
               {value:'',label:'全部'},
                {value:'0',label:'待付款'},
               {value:'1',label:"已付款，待奖励"},
               {value:'2',label:'已奖励'},
               {value:'3',label:'订单取消'},
           ],
           unlineOrderType:'',
           unlineSearch:'',
           unlineIndex:1,
           unlineSize:20,
           unlineData:[],
           unlineTotal:0,
           dataValue:'',
           //评价
           value1:'', 
           toRate:false,
           comment:'',
           commentData:''
        }
    },
    mounted(){
       this.tab = this.$route.query.tab?this.$route.query.tab:'1';
    //    this.onlieTime = this.unlineTime = [this.$util.getNowDate(),this.$util.getNowDate()]
       if(this.tab == '1'){
           this.getOnlineList();
       }else{
           this.getUnderLineList();
       }
       
    },
    methods:{
        toTab(num){
          this.tab = num
          this.$router.push('/myOrder?tab='+num);
          if(this.num == 1){
              this.getOnlineList();
          }else{
              this.getUnderLineList();
          }
        },
        goDetail(id){
            this.$router.push('/orderDetail?id='+id)
        },
        submitOrder(){
            this.$http.limitPost(this.$api.submitOrder,{
                ordersn:this.subOrder
            }).then(res=>{
                if(res.data.Code ==1){
                    this.getOnlineList();
                    this.$message.success(res.data.Data)
                }else{
                    this.$message.error(res.data.Msg)
                }
            })
        },
        //获取线上订单列表
        getOnlineList(){
            this.loading = true
            this.$http.limitPost(this.$api.UserOnlineOrderList,{
                StartTime:this.onlieTime[0]?this.onlieTime[0] +' 00:00:00':'',
                EndTime:this.onlieTime[1]?this.onlieTime[1] +' 23:59:59':'',
                State:this.onlieStatus,
                OrderNo:this.onlineSearch,
                OrderType:this.onlineType,
                pageIndex:this.pageIndex,
                pageSize:this.pageSize
            }).then(res=>{
                if(res.data.Code == 1){
                    this.listData = res.data.Data.list,
                    this.onlineTotal = res.data.Data.count
                }
                setTimeout(()=>{
                this.loading = false
                },500)
            })
        },
        //获取地面订单列表
        getUnderLineList(){
            this.underlineLoading = true
            this.$http.limitPost(this.$api.UserGroundOrderList,{
                StartTime:this.unlineTime[0]?this.unlineTime[0]+' 00:00:00':'',
                EndTime:this.unlineTime[1]?this.unlineTime[1]+ ' 23:59:59':'',
                State:this.unlineOrderType,
                OrderNoOrMerchantName:this.unlineSearch,
                pageIndex:this.unlineIndex,
                pageSize:this.unlineSize
            }).then(res=>{
                if(res.data.Code == 1){
                    this.unlineData = res.data.Data.list
                    this.unlineTotal = res.data.Data.count
                }
               
                 setTimeout(()=>{
                   this.underlineLoading = false
                 },500)
            })
        },
        //
        foodSearch(){
            this.unlineIndex = 1;
            this.getUnderLineList();
        },
        //获取地面订单详情
        unlineDetail(id){
            this.$router.push('/underlineDetail?id='+id)
        },
        //去评价
        goToComment(data){
            console.log(data)
            this.commentData = data
            this.toRate = true;
        },
        AddComment(){
            
            this.$http.limitPost(this.$api.AddComment,{
                "MerchantID":this.commentData.MerchantID,
                "Content": this.comment,
                "StarNum": this.value1,
                "OrderID": this.commentData.ID
            }).then(res=>{
                if(res.data.Code == 1){
                    this.$message.success('评价成功')
                    this.toRate = false
                    this.value1 = ''
                    this.comment = ''
                    this.getUnderLineList()
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
   @media screen and(max-width:@change_width){
       padding:0px;
       margin-bottom:10px;

       .tab-item{
           margin:0;
           margin-left:34px;
          &.second{
              float:right;
              margin-right:34px;
          }
       }
       .input-box{
           width:100%;
           box-sizing: border-box;
           justify-content: space-between;
           label{
                display: inline-block;
                width:50px;
                margin-left:15px;
            }
           input{
               width:calc(100% - 186px);
           }
           &::after{
               content:'';
               display: block;
               width:100%;
               height:10px;
               background:@body_color;
           }
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
    @media screen and(max-width:@change_width){
        display:none;
    }
}
.choose-small-box{
    display: none;
    // padding:0 15px;
    padding-top:65px;
    .small-btn{
      display: block;
      width:calc(100% - 30px);
      height:34px;
      text-align: center;
      color:@main;
      margin:10px 15px;
      border:1px solid @main;
      border-radius: 34px;
    }
    .margin{
        height: 10px;
        background:@body_color;
    }
    .date-box{
        display: flex;
        padding:15px 15px 0;
    }
    .select-box{
        display: flex;
        padding:0 15px;
        margin-top:10px;
        justify-content: space-between;
        .last{
            align-items: flex-end;
        }
    }
    .search-box{
        margin-top:10px;
        .input-box{
            margin:0 15px;
            width:calc(100% - 30px);
        }
    }
     @media screen and(max-width:@change_width){
         display:block;
     }
}
.choose-small-box-2 {
    padding-top: 0;
    .select-box {
        display: inline-flex;
        padding-right: 10px;
        box-sizing: border-box;
        width: 46%;
        .status-wrap {
            width: 100%;
            display: flex;
            align-items: center;
            label {
                width: 40px;
            }
            .el-dropdown {
                flex: 1;
                .select {
                    margin-left: 0;
                    width: 100%;
                }
            }
        }
    }
    .search-box {
        display: inline-flex;
        box-sizing: border-box;
        width: 54%;
        padding-right: 15px;
        .input-box {
            margin-left: 0;
            margin-right: 0;
            width: 100%;
        }
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
        // border:1px solid @class_border;
        font-size:12px;
        line-height:12px ;
        

        .iconfont{
            position: absolute;
            top:10px;
            right:10px;
            transform: scale(.41);
            font-size:12px;
            color:#909399;
            cursor: pointer;
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
            cursor: pointer;
        }
    }
     @media screen and(max-width:@change_width){
         padding:0 0px;

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
.order-name{
    width:126px;
    margin:0 auto;
    
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
.table-box{
    .table-big{
        display: block;
    }
    .table-small-box{
        display: none;
        padding: 0 15px;
        .item-img-wrap {
            margin-right: 15px;
        }
        .item{
            padding-top: 20px;
            .des{
                position: relative;
                display: flex;
                .name {
                    width:180px;
                    .overTextOne();
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
            .btn-detail-box{
                display: flex;
                justify-content: center;
                 padding: 15px 0;
                margin-top: 20px;
                 border-top: 1px solid #eeeeee;
                
                border-bottom: 1px solid #eeeeee;
                .btn-detail{
                    width:50%;
                    padding:0;
                    margin:0;
                    border:0;
                     border-right:1px solid #eeeeee;
                    &:nth-last-child(1){
                        border-right:0;
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
            .item-img {
                width: 50px;
            }
        }
        .item:not(:first-child){
            padding-top: 30px;
        }
    }
     @media screen and(max-width:@change_width){
         .table-big{
            display: none;
        }
        .table-small-box{
            display: block;
        }
     }
}
.page-box{
    padding:60px 0;
}
</style>
