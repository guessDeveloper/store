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
                  <button :data="scope" class="action-btn">修改</button><button class="action-btn comment-btn" @click="toRate = true">删除</button>
                </template>
            </el-table-column>
        </el-table>
        </div>
      </div>
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
      }]
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
</style>