<template>
  <div>
     <div class="title">我的购物车</div>
     <div class="table-box">
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
        </div>
     </div>
  </div>
</template>
<script>
import '@/plugins/element-shopCar'
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

        }]
    }
  }
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
</style>