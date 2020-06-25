<template>
  <div class="menager-box">
     <div class="persion-title">分类管理</div>
     <div class="classify-box">
        <div class="btn-top-box">
            <button @click="toNew =true">添加新分类</button>
        </div>
        <div class="table-box">
          <el-table :data="listData"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930">
            <el-table-column property="RateName" label="分类名称" width="268" align="left"></el-table-column>
            <el-table-column property="Rate" label="奖励比例" width="160" align="center"></el-table-column>
            <el-table-column property="CreateTime" label="添加时间" width="400" align="center"></el-table-column>
            <el-table-column  label="操作" width="102" align="center">
                <template slot-scope="scope">
                  <button :data="scope" class="action-btn" @click="editClass(scope.row)">修改</button><button class="action-btn delate-btn" @click="deleteClass(scope.row.Id)">删除</button>
                </template>
            </el-table-column>
        </el-table>
        </div>

        <!-- 移动端分类列表 -->
        <div class="table-box-small">
          <div v-for="(item, index) in listData" :key="index" class="list-item">
            <div class="list-item-left">
              <p>分类名称：<span>{{ item.RateName }}</span></p>
              <p>奖励比例：<span>{{ item.Rate }}</span></p>
              <p>添加时间：<span>{{ item.CreateTime }}</span></p>
            </div>
            <div class="list-item-right">
              <p @click="editClass(item)">修改</p>
              <p @click="deleteClass(item.Id)">删除</p>
            </div>
          </div>
        </div>

      </div>
      <div class="page-box">
            <el-pagination
                        @current-change="getList"
                        :current-page.sync="pageIndex"
                        :page-size="pageSize"
                        :hide-on-single-page="total == 0"
                        layout="prev, pager, next, jumper"
                        :total="total">
              </el-pagination>
          </div>
          <div class="page-box small">
            <el-pagination
                    small 
                        @current-change="getList"
                        :current-page.sync="pageIndex"
                        :page-size="pageSize"
                        :hide-on-single-page="total == 0"
                        layout="prev, pager, next"
                        :total="total">
              </el-pagination>
          </div>
      <el-dialog title="添加新产品分类" :visible.sync="toNew" custom-class="custom-dialog">
        <div class="dialog-content-wrap">
          <div class="input-line">
              <label for="">产品分类名称：</label><input type="text" placeholder="请输入分类名称" v-model.trim="NewClassName">
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
                <input type="text" placeholder="请输入1至60的整数" class="percent" v-model.trim="NewClassRate"><span class="per">%</span>
              </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="编辑分类" :visible.sync="toEdit" custom-class="custom-dialog">
        <div class="dialog-content-wrap">
          <div class="input-line">
              <label for="">产品分类名称：</label><input type="text" placeholder="请输入分类名称" v-model.trim="editName">
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
                <input type="text" placeholder="请输入1至60的整数" class="percent" v-model.trim="editRate"><span class="per">%</span>
              </div>
          </div>
          <div class="btn-box">
                    <button class="ok" @click="sendEdit">提交</button>
                    <button class="no" @click="toEdit = false">取消</button>
          </div>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import '../../plugins/element-table.js'
export default {
  data(){
    return{
      listData:[],
      toNew:false,
      toEdit:false,
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
        value: '',
        pageSize:20,
        pageIndex:1,
        total:0,
        NewClassName:'',
        NewClassRate:'',
        editName:'',
        editRate:'',
        editId:''
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
   getList(){
     this.$http.storePost(this.$api.GetProcoteClassList,{pageIndex:this.pageIndex,pageSize:this.pageSize}).then(res=>{
       if(res.data.Code == 1){
          this.listData = res.data.Data.list
          this.total = res.data.Data.count
       }else{
         this.$message.error(res.data.Msg)
       }
     })
   },
   //添加分类
   addClass(){
     if(this.NewClassName == ''){
       this.$message.error('请输入分类名称')
     }else if(!this.$util.testNum.test(this.NewClassRate)){
       this.$message.error('请输入正确的比例')
     }else if(this.NewClassRate>60||this.NewClassRate<1){
       this.$message.error('请输入1-60的正整数')
     }else{
       this.$http.storePost(this.$api.AddProcoteClass,{Rate:parseInt(this.NewClassRate/100),RateName:this.NewClassName}).then(res=>{
         if(res.data.Code == 1){
           this.$message.success('添加成功')
           this.toNew = false;
           this.NewClassName = '';
           this.NewClassRate = '';
           this.pageIndex = 1;
           this.getList()
         }else{
           this.$message.error(res.data.Msg)
         }
       })
     }
   },
   editClass(item){
     this.toEdit = true;
     this.editName = item.RateName
     this.editRate = parseInt(item.Rate*100)
     this.editId = item.Id
   },
   sendEdit(){
      if(this.editName == ''){
       this.$message.error('请输入分类名称')
     }else if(!this.$util.testNum.test(this.editRate)){
       this.$message.error('请输入正确的比例')
     }else if(this.editRate>60||this.editRate<1){
       this.$message.error('请输入1-60的正整数')
     }else{
        this.$http.storePost(this.$api.UpProcoteClass,{
          ClassID:this.editId,
          Rate:this.editRate/100,
          ClassName:this.editName
        }).then(res=>{
          if(res.data.Code == 1){
            this.toEdit = false;
            this.$message.success('编辑成功')
            this.getList()
          }else{
            this.$message.error(res.data.Msg)
          }
        })
     }
   },
   //删除分类
   deleteClass(id){
     console.log(id)
     this.$http.storePost(this.$api.DeleteProcoteClass,{RateId:id}).then(res=>{
       if(res.data.Code == 1){
         this.$message.success('删除成功')
         this.getList();
       }else{
         this.$message.error(res.data.Msg)
       }
     })
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
.table-box-small {
  display: none;
  .list-item {
    padding: 20px 10px;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list-item-left {
      p {
        margin-bottom: 12px;
        color: #999999;
        span {
          color: #333333;
        }
      }
    }
    .list-item-right {
      p {
        margin-bottom: 15px;
        text-decoration-line: underline;
      }
    }
  }
}
@media screen and(max-width:@change_width){
  .classify-box {
    padding: 0 15px;
    .btn-top-box {
      padding: 15px;
      margin: 0 -15px;
      border-bottom: 10px solid #F8F8F8;
      button {
        width: 100%;
      }
    }
    .table-box {
      display: none;
    }
    .table-box-small {
      display: block;
    }
  }
  .dialog-content-wrap {
    .input-line {
      .input-box {
        width: calc(100% - 95px);
        input {
          width: 96%;
        }
        .per {
          width: 4%;
        }
      }
      &>input {
        width: calc(100% - 95px);
      }
    }
  }
}
.page-box{
  padding:30px 0;
}
</style>
