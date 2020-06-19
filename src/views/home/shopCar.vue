<template>
  <div>
     <div class="title">我的购物车</div>
     <!-- <div class="table-box">
        <div class="table-item">
           <div class="subtitle">
              麦当劳
           </div>
              <el-table
              ref="multipleTable"
              :data="listData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange" header-row-class-name="table-header-color">
              <el-table-column
                type="selection"
                width="60" >
              </el-table-column>
              <el-table-column
                label="全选"
                width='60'>
                <template slot-scope="scope">
                  <img :src="scope.row.img" alt="" class="prd-img">
                </template>
              </el-table-column>
              <el-table-column
                prop="des"
                label="商品信息"
                width="296">
              </el-table-column>
              <el-table-column
                prop="score"
                label="积分约"
                width='110'
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="price"
                label="单价"
                width="182"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
                align="center "
                width="142"

                show-overflow-tooltip>
                 <template slot-scope="scope">
                 <div class="" style="height:28px;">
                    <el-input-number size="mini" v-model="scope.row.num"></el-input-number>
                 </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="total"
                label="小计"
                width='172'
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="操作"
                width='108'
                align="center">
                 <template slot-scope="scope">
                  <button :data="scope"> 删除</button>
                </template>
              </el-table-column>
  </el-table>
      <div class="">
         <el-checkbox v-model="checked">备选项</el-checkbox>
      </div>
        </div> -->
     <!-- </div> -->
     <div class="car-item"  v-for="(item ,index) in myCar" :key="index">
       <div class="car-store-name">{{item.Mertchntname}}</div>
       <div class="top-check">
          <el-checkbox v-model="item.check" class="check-box"></el-checkbox>全选
       </div>
       <div class="car-list">
         <div class="item">
           <div class="car-check">
             <el-checkbox v-model="checked" class="check-box"></el-checkbox>
           </div>
           <div class="img-box">
              <img src="http://image.biaobaiju.com/uploads/20181227/20/1545914811-SLGUAHsukp.jpeg" alt="">
           </div>
           <div class="content">
             <div class="name">奶油鸡蛋卷 150克（5袋）</div>
             <div class="price-box">单价：<i>¥15</i> <span class="score">积分约：<i>300</i></span></div>
             <div style="height:28px;">
                 <el-input-number size="mini" ></el-input-number>
             </div>
             <div class="total">
                小计：<span class="money">¥249</span>    <button class="cancle">删除</button>
             </div>
           </div>
         </div>
       </div>
      <div class="top-check">
          <el-checkbox v-model="checked" class="check-box"></el-checkbox>全选<span class="cancle-all">删除选中商品</span>
       </div>
       <div class="total-box">
         <div class="chose-num">
           共<span>2</span>件商品，已选择<span>1</span>件
         </div>
         <div>
            总积分约：400 
         </div>
         <div>
           商品合计 :¥1245.00
         </div>
         <div>
           应付总额：<span class="money">¥1245.00</span>
         </div>
         <div>
         <button class="btn">提交订单</button>
         </div>
       </div>
       <div>{{myCar}}</div>
     </div>
  </div>
</template>
<script>
import '../../plugins/element-checkbox.js'
import '@/plugins/element-shopCar'
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
export default {
  data(){
    return{
        listData:[{
           img:'http://image.biaobaiju.com/uploads/20181227/20/1545914811-SLGUAHsukp.jpeg',
           des:'奶油鸡蛋卷 150克（5袋）',
           score:200,
           price:'$12',
           num:1,
           total:'¥249',

        }],
        checked:false,
    }
  },
  computed:{
    ...mapState([
      'myCar'
    ])
  },
  
}
</script>
<style lang="less" scoped>
  .title{
    position: relative;
    width:@max-width;
    font-size:28px;
    line-height: 24px;
    padding-left:14px;
    margin:30px auto 20px;
    &::before{
      display: block;
      content:'';
      position: absolute;
      left:0;
      width:4px;
      height:24px;
      background:@main;
      
    }
    @media screen and(max-width:@change_width){
      width:auto;
      height:58px;
      line-height: 58px;
      font-size: 20px;
      padding-left:29px;
      background:#fff;
      margin:10px auto;
      &::before{
        left: 15px;
        top:20px;
      }
    }
  }
  .table-box{
    width:@max-width;
    overflow: hidden;
    text-align: center;
    margin:0 auto;
    background:#fff;
    .table-item{
      padding:0 30px;
      .subtitle{
        font-size:20px;
        line-height: 20px;
        margin-bottom:15px;
        margin-top:30px;
        text-align: left;
      }
    }
  }
  .prd-img{
    display: block;
    width:40px;
    height:40px;
  }
.car-item{
  .car-store-name{
    font-size:16px;
    height:56px;
    line-height: 56px;
    background:#fff;
    padding:0 15px;
  }
  .top-check{
    height:54px;
    line-height: 54px;
    font-size:14px;
    color:@subtitle_color;
    padding:0 24px;
    .check-box{
      margin-right:20px;
    }
    .cancle-all{
      margin-left:20px;
    }
  }
      //合计
  .total-box{
    background: #fff;
    padding:25px 15px 30px; 
    color:#666666;
    line-height: 20px;
    span{
      color:@main;
    }
    .money{
      font-size:18px;
      color:#D51B32;
      font-weight: bold;
    }
    .btn{
      display: block;
      width:100%;
      background:@main;
      color:#fff;
      height:50px;
      font-size: 16px;
      margin-top:30px;
    }

  }
  .car-list{
    background:#fff;
    .item{
      display: flex;
      overflow: hidden;
      padding-bottom:20px;
      border-bottom:1px solid @class_border;
      .car-check{
        width:36px;
        padding-left:24px;
        .check-box{
          margin-top:27px;
        }
      }
      .img-box{
        width:40px;
        padding-top:15px;
        img{
          display: block;
          width:40px;
          height:40px;
        }
      }
      .content{
        width:calc(100% - 100px);
        padding-left:20px;
        padding-top:15px;
        padding-right:15px;
        .name{
          font-size:14px;
          line-height:14px;
          margin-bottom: 10px;
        }
        .price-box{
          overflow: hidden;
          font-size:14px;
          color:@subtitle_color;
          line-height: 14px;
          margin-bottom:10px;
          .score{
            float:right;
          }
          i{
            color:@font_color;
            font-style:normal ;
          }
        }
        .total{
          font-size:14px;
          color:@subtitle_color;
          line-height: 14px;
          margin-top:10px;
          .money{
            color:#D51B32;
          }
          .clear();
          .cancle{
            float:right;
            color:@subtitle_color;
          }
        }
      }
    }

  }
  
}
</style>