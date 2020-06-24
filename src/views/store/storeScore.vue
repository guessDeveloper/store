<template>
  <div class="menager-box">
     <div class="tab-box">
            <div class="tab-item" @click="toTab(1)" :class="{active:tab ==1}">积分充值</div>
             <div class="tab-item" @click="toTab(2)" :class="{active:tab ==2}">积分奖励</div>
         <div class="tip-box"><span class="iconfont iconcjwt"></span>积分使用常见问题</div>
      </div>
     <div class="tab-content" v-show="tab==1">
        <div class="btn-box">
           <router-link class="chong-btn" tag="button" to="/storeMoney">立即充值</router-link>
        </div>
        <div class="table-box">
          <el-table :data="chongList"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930">
            <el-table-column property="CreateTime" label="时间" width="219" align="center">
            </el-table-column>
            <el-table-column property="state" label="状态" width="563" align="center"></el-table-column>
            <el-table-column property="number" label="积分数量" width="148" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="table-small-box">
          <div class="list-item" v-for="(item,index) in chongList" :key="index">
            <div class="list-item-p">
              <p>时间：<span>{{item.CreateTime}}</span></p>
              <p>积分数量：<span>{{item.number}}</span></p>
            </div>
            <div class="list-item-b text-right">
              <p>状态：<span>{{item.state}}</span></p>
            </div>
          </div>
        </div>
          <div class="page-box">
            <el-pagination
                        @current-change="getChongList"
                        :current-page.sync="chongIndex"
                        :page-size="chongPage"
                        :hide-on-single-page="chongTotal == 0"
                        layout="prev, pager, next, jumper"
                        :total="chongTotal">
              </el-pagination>
          </div>
          <div class="page-box small">
            <el-pagination
                    small 
                        @current-change="getChongList"
                        :current-page.sync="chongIndex"
                        :page-size="chongPage"
                        :hide-on-single-page="chongTotal == 0"
                        layout="prev, pager, next"
                        :total="chongTotal">
              </el-pagination>
          </div>
     </div>
     <div class="tab-content"  v-show="tab==2">
        <div class="table-box jiangli">
          <el-table :data="jiangList"  header-row-style="font-size:12px;color:#999;" row-class-name="table-line" width="930">
            <el-table-column property="time" label="时间" width="219" align="center">
            </el-table-column>
            <el-table-column property="Type" label="状态" width="563" align="center"></el-table-column>
            <el-table-column property="Number" label="积分数量" width="148" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="table-small-box">
          <div class="list-item" v-for="(item,index) in jiangList" :key="index">
            <div class="list-item-p">
              <p>时间：<span>{{item.time}}</span></p>
              <p>积分数量：<span>{{item.Number}}</span></p>
            </div>
            <div class="list-item-b">
              <p>状态：<span>{{item.Type}}</span></p>
            </div>
          </div>
        </div>
        <div class="page-box">
            <el-pagination
                        @current-change="getJiangList"
                        :current-page.sync="jinagIndex"
                        :page-size="jiangPagesize"
                        :hide-on-single-page="jiangTotal == 0"
                        layout="prev, pager, next, jumper"
                        :total="jiangTotal">
              </el-pagination>
          </div>
          <div class="page-box small">
            <el-pagination
                    small 
                        @current-change="getJiangList"
                        :current-page.sync="jinagIndex"
                        :page-size="jiangPagesize"
                        :hide-on-single-page="jiangTotal == 0"
                        layout="prev, pager, next"
                        :total="jiangTotal">
              </el-pagination>
          </div>
     </div>
  </div>
</template>
<script>
import '../../plugins/element-table'
export default {
  data(){
    return{
      tab:1,
      chongIndex:1,
      chongPage:20,
      chongTotal:0,
      chongList:[],
      jinagIndex:1,
      jiangPagesize:20,
      jiangTotal:0,
      jiangList:[]
    }
  },
  mounted(){
    this.getChongList();
    this.getJiangList();
  },
  methods:{
    toTab(num){
      this.tab = num
    },
    //获取充值记录
    getChongList(){
      this.$http.storePost(this.$api.RechangeList,{pageIndex:this.chongIndex,pageSize:this.chongPage}).then(res=>{
        if(res.data.Code ==1){
          this.chongList= res.data.Data.list
          this.chongTotal = res.data.Data.count
        }else{
          this.$message.error(res.data.Msg)
        }

      })
    },
    //获取积分奖励jil
    getJiangList(){
      this.$http.storePost(this.$api.MerchantUseIntegralRecords,{pageIndex:this.chongIndex,pageSize:this.chongPage}).then(res=>{
        if(res.data.Code ==1){
          this.jiangList= res.data.Data.List
          this.jiangTotal = res.data.Data.Count
        }else{
          this.$message.error(res.data.Msg)
        }

      })
    }
  }
}
</script>
<style lang="less" scoped>
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
   .tip-box{
     float:right;
     margin-top:23px;
     color:@subtitle_color;
     font-size:12px;
     line-height:14px;
     .iconfont{
       font-size:14px;
       color:@subtitle_color;
       margin-right:8px;
     }
   }
}
.jiangli{
    padding-top:20px;
  }
.tab-content{
  padding:0 30px;
  .btn-box{
    padding:30px 0;
    text-align: right;
  }
  .chong-btn{
    width:136px;
    height:40px;
    font-size:14px;
    color:@main;
    border:1px solid @main;
    background:#fff;
  }
}
.table-small-box {
  display: none;
  .list-item {
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
    .list-item-p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      color: #999999;
      span {
        color: #333333;
      }
    }
    .list-item-b {
      color: #999999;
    }
  }
}
@media screen and(max-width:@change_width) {
  .menager-box {
    .tab-box {
      padding: 0 15px;
      border-bottom: 10px solid #F8F8F8;
      .tab-item {
        margin-right: 0;
      }
      .tab-item:first-child {
        margin-right: 30px;
      }
    }
    .tab-content {
      padding: 0 15px;
      .btn-box {
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
      .table-small-box {
        display: block;
      }
    }
  }
}
.page-box{
  padding:30px 0;
}
</style>
