<template>
  <div class="menager-box">
     <div class="persion-title">分类管理</div>
     <div class="classify-box">
        <div class="btn-top-box">
            <button @click="toNew =true">添加新分类</button>
        </div>
        <div class="table-box">
          <el-table :data="listData"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930">
            <el-table-column property="name" label="分类名称" width="268" align="left"></el-table-column>
            <el-table-column property="level" label="奖励比例" width="160" align="center"></el-table-column>
            <el-table-column property="time" label="添加时间" width="400" align="center"></el-table-column>
            <el-table-column  label="操作" width="102" align="center">
                <template slot-scope="scope">
                  <button :data="scope" class="action-btn">修改</button><button class="action-btn delate-btn" @click="toRate = true">删除</button>
                </template>
            </el-table-column>
        </el-table>
        </div>
      </div>
      <el-dialog title="添加新产品分类" :visible.sync="toNew" width="520px">
       <div class="input-line">
          <label for="">产品分类名称：</label><input type="text" placeholder="请输入分类名称">
       </div>
       <div class="input-line">
          <label for="">奖励比例：</label>
          <div class="input-box">
            <!-- <el-select v-model="value" placeholder="请选择比例">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
            <input type="text" placeholder="请输入1至60的整数" class="percent"><span class="per">%</span>
          </div>
       </div>
        <div class="btn-box">
                  <button class="ok">提交</button>
                  <button class="no">取消</button>   
        </div>
     </el-dialog>
  </div>
</template>
<script>
import '../../plugins/element-table.js'
export default {
  data(){
    return{
      listData:[{
          name:'服装',
          level:'10&',
          time:'2020-05-29  21:10:30',
      }],
      toNew:false,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    }
  }
}
</script>
<style lang="less" scoped>
.classify-box{
  padding:0 30px;
}
 .btn-top-box{
    .clear();
    margin:0;
    padding:30px 0 40px 0;
    button{
      float: right;
      width:150px;
      height:40px;
      font-size:14px;
      color:@main;
      border-radius:0;
      border:1px solid @main;
    }
  }
  .action-btn{
    border:0;
    font-size:12px;
    color:@persion_left;
  }
  .delate-btn{
    margin-left:8px;
  }
  .input-line{
  margin-top:30px;
  label{
    display: inline-block;
    width:84px;
    font-size:12px;
    line-height: 34px;
    margin-right:9px;
    text-align: right;
  }
  input{
    display: inline-block;
    box-sizing: border-box;
    width:387px;
    height:34px;
    padding:0 12px;
    font-size:12px;
    border:1px solid @class_border;
    &.percent{
      width:357px;
    }
  }
  .input-box{
    display: inline-block;
    width:387px;
    height:34px;
    .per{
      float: right;
      line-height: 34px;
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
</style>