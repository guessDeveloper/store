<template>
  <div class="storeProduct-box">
      <div class="tab-box">
            <div class="tab-item" @click="toTab(1)" :class="{active:tab ==1}">产品列表</div>
             <div class="tab-item" @click="toTab(2)" :class="{active:tab ==2}">添加产品</div>
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
                    产品分类 
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
                    <el-table-column property="status" label="产品分类" width="160" align="center"></el-table-column>
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
            </div>  
      </div>   
  </div>
</template>
<script>
import '../../plugins/element-dataPicker.js'
export default {
  data(){
    return{
      tab:1,
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
    }
  }
}
</script>
<style lang="less" scoped>
.storeProduct-box{
  min-height: @persion_height;
  background:#fff;
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
.order-content{
  padding:0 30px;
}
 .action-btn{
    border:0;
    font-size:12px;
    color:@persion_left;
  }
  .comment-btn{
      margin-left:8px;
  }
</style>