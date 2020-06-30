<template>
  <div class="storeProduct-box">
      <div class="tab-box">
            <div class="tab-item" @click="toTab(1)" :class="{active:tab ==1}">产品列表</div>
             <div class="tab-item" @click="toTab(2)" :class="{active:tab ==2}" v-show="classOption.length>0">添加产品</div>
      </div>
      <div class="order-content" v-show="tab == '1'">
         <div class="choose-box">
                <div class="date-box">
                    <el-date-picker
                        v-model="dataValue"
                        type="daterange"
                         value-format="yyyy-MM-dd"
                        range-separator="-"
                         :editable="false"
                        :clearable="false"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                </div>
                <div class="date-small-box">
                    <div class="small-date-box">
                    <el-date-picker
                        v-model="dataValue[0]"
                        type="date"
                         :editable="false"
                        :clearable="false"
                        value-format="yyyy-MM-dd"
                        placeholder="开始日期">
                    </el-date-picker>
                   </div>
                   <div class="date-middle"> -</div>
                   <div class="small-date-box">
                        <el-date-picker
                        v-model="dataValue[1]"
                        type="date"
                         :editable="false"
                        :clearable="false"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="status-select status-select-wrap">
                    状态
                    <span class="select">
                        <el-select v-model="status" placeholder="请选择"  >
                            <el-option
                                v-for="item in statusOption"
                                :key="item.status"
                                :label="item.label"
                                :value="item.status">
                                </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="status-select">
                    产品分类
                    <span class="select">
                        <el-select v-model="classNow" placeholder="请选择"  >
                            <el-option
                                v-for="item in classOption"
                                :key="item.CategoryID"
                                :label="item.CategoryName"
                                :value="item.CategoryID">
                                </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="input-box">
                    <input type="text" placeholder="输入产品名称" v-model.trim="ProductName">
                    <span class="iconfont iconsousuo" @click="search"></span>
                </div>
            </div>
            <div class="table-box">
                    <el-table :data="listData"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930">
                    <el-table-column property="img" label="产品图片" width="50" align="left">
                         <template slot-scope="scope">
                            <img :src="scope.row.picurl" alt="" class="product-img">
                        </template>
                    </el-table-column>
                    <el-table-column property="Cat" label="产品分类" width="160" align="center"></el-table-column>
                    <el-table-column property="Name" label="产品名称" width="247" align="left">
                        <template slot-scope="scope">
                           <div class="store-name">{{scope.row.Name}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column property="CreaterTime" label="产品上架时间" width="195" align="center"></el-table-column>
                    <el-table-column property="price" label="价格(元)" width="88" align="center"></el-table-column>
                     <el-table-column property="state" label="状态" width="88" align="center"></el-table-column>
                    <el-table-column  label="操作" width="102" align="center">
                         <template slot-scope="scope">
                            <button :data="scope" class="action-btn" @click="toProductDetail(scope.row.ID)">修改</button><button class="action-btn comment-btn" @click="UpOrDownProduct(scope.row.ID,0)" v-show="scope.row.state == '审核通过上架'">下架</button><button class="action-btn comment-btn" @click="UpOrDownProduct(scope.row.ID,1)" v-show="scope.row.state == '审核通过下架'">上架</button>
                        </template>
                    </el-table-column>
                    </el-table>
            </div>
            <!-- 移动端列表 -->
            <div class="table-small-box">
                <div class="item" v-for="(item,index) in listData" :key="index">
                    <div class="des">
                        <div class="item-img-wrap">
                            <img :src="item.picurl" alt="" class="item-img">
                        </div>
                        <div>
                            <div class="name">{{item.Name}}</div>
                            <div class="item-name">
                                产品分类：<span class="item-value">{{item.Cat}}</span>
                            </div>
                            <div class="item-name">
                                产品上架时间：<span class="item-value"></span>
                            </div>
                            <div class="item-name">
                                价格(元)：<span class="item-value">{{item.price}}</span>
                            </div>
                            
                        </div>
                        <div class="order-status-wrap">
                            <div class="order-status-name">状态：<span>{{item.state}}</span></div>
                        </div>
                    </div>
                    <div class="btn-detail" @click="toProductDetail(item.ID)">修改</div>
                </div>
            </div>
            <div class="page-box">
                <el-pagination
                    @current-change="getList"
                    :current-page.sync="pageIndex"
                    :page-size="pageSize"
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
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
      </div>
      <div class="" v-if="tab== 2">
        <addProduct @success="addSuccess"></addProduct>
      </div>
  </div>
</template>
<script>
import addProduct from '@/components/store/addProduct'
import '../../plugins/element-dataPicker.js'
export default {
  data(){
    return{
      tab:1,
      dataValue:[new Date(),new Date()],
      listData:[
               
           ],
       classNow:"",
       ProductName:'',
       statusOption:[{
           label:'全部',
           status:'',
       },{
           label:'下架',
           status:0,
       },{
           label:'上架',
           status:1,
       },{
           label:'待审核',
           status:2
       }],
       status:'', // 状态
       classOption:[],
       pageIndex:1,
       pageSize:20,
       total:0,
    }
  },
  mounted(){
        this.dataValue = [this.$util.getNowDate(),this.$util.getNowDate()]
      this.getClass();
      this.getList();
  },
  components:{
      addProduct:addProduct
  },
  methods:{
      toTab(num){
          this.tab = num
      },
      //获取产品分类
      getClass(){
          this.$http.storeGet(this.$api.GetProductCategory).then(res=>{
              if(res.data.Code == 1){
                  this.classOption = res.data.Data;
                  if(this.classOption.length == 0){
                      this.$message.error('您还没有设置分类请先添加分类')
                      this.$router.push('/storeClassify')
                  }
              }
          })
      },
      //添加成功
      addSuccess(){
          this.tab =1;
          this.pageIndex = 1;
          this.getList();
      },
      //获取产品列表
      getList(){
         this.$http.storePost(this.$api.Products,{
            State:this.status,
            ProductName:this.ProductName,
            OnShelevesTimeBegin: this.dataValue[0] +' 00:00:00',
            OnShelevesTimeEnd: this.dataValue[1]+' 23:59:59' ,
            Catid:this.classNow,
            pageIndex: this.pageIndex ,
            pageSize:this.pageSize
         }).then(res=>{
             if(res.data.Code == 1){
                 this.listData = res.data.Data.list
                 this.total = res.data.Data.count
             }
         })
      },
      //产品修改
      toProductDetail(id){
          this.$router.push('/storeProductDetail?id='+id)
      },
      //产品上下架
      UpOrDownProduct(id,status){
          this.$http.storePost(this.$api.UpOrDownProduct,{
              ProductId:id,
              UpOrDown:status
          }).then(res=>{
              if(res.data.Code == 1){
                  this.$message.success('操作成功')
                  this.getList();
              }
          })
      },
      search(){
          this.pageIndex = 1;
          this.getList();
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
    .date-small-box{
        display: none;
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
        // border:1px solid @class_border;
        font-size:12px;
        line-height:34px ;
        // padding:10px 15px;

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
  .product-img{
      width:50px;
      height:50px;
  }
.table-small-box{
    display: none;
    // padding: 0 15px;
    .item-img-wrap {
        margin-right: 15px;
    }
    .item{
        padding-top: 20px;
        .des{
            position: relative;
            display: flex;
            .name {
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
    .tab-box {
        border-bottom: 10px solid #F8F8F8;
    }
    .order-content {
        padding: 0 15px;
        .choose-box {
            padding: 15px 0 0;
            .date-box {
                display: none;
                align-items: center;
                // justify-content: center;
            }
            .date-small-box{
                display: flex;
            }
            .status-select {
                margin-left: 0;
                margin-top: 10px;
                margin-bottom: 10px;
                width: 50%;
                display: inline-flex;
                align-items: center;
                box-sizing: border-box;
                .select {
                    flex: 1;
                }
            }
            .status-select-wrap {
                padding-right: 20px;
            }
            .input-box {
                width: 100%;
                margin-left: 0;
            }
        }
        .table-box {
            display: none;
        }
        .table-small-box {
            display: block;
        }
    }
}
.page-box{
    padding:30px 0;
}
</style>
