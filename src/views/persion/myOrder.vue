<template>
    <div class="myOrder-box">
        <div class="tab-box">
            <div class="tab-item active">线上购物订单</div>
             <div class="tab-item">地面消费订单</div>
             <div class="input-box">
                订单号 <input type="text" placeholder="输入订单号"><button>提交订单</button>
             </div>
        </div>    
        <div class="order-content">
            <el-date-picker
                v-model="dataValue"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
        </div>
    </div>
</template>
<script>
import '../../plugins/element-dataPicker.js'
export default {
    data(){
        return{
           dataValue:''
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
           height:32px;
           border:1px solid @class_border;
           border-left:0;
           background:#fff;
       }
   }
}
.order-content{
    padding:0 30px;
}
</style>