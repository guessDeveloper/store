<template>
  <div class="menager-box">
     <div class="tab-box">
            <div class="tab-item" @click="toTab(1)" :class="{active:tab ==1}">获得积分</div>
             <div class="tab-item" @click="toTab(2)" :class="{active:tab ==2}">积分奖励</div>
         <a class="tip-box" tag="div" :href="storeInfo.QAintegral" ><span class="iconfont iconcjwt"></span>积分使用常见问题</a>
      </div>
     <div class="tab-content" v-show="tab==1">
        <div class="btn-box">
          <span class="score">我的剩余积分：<span class="">{{Integral.SurplusIntegral}}</span>累计积分：<span>{{Integral.RechargeIntegral}}</span> 已赠送积分：<span>{{Integral.SendIntegral}}</span></span> <router-link class="chong-btn" tag="button" to="/storeMoney">立即获得</router-link>
        </div>
        <div class="score-box">
           <div class="score-item">
              <div >我的剩余积分</div>
              <div class="score-name">{{Integral.SurplusIntegral}}</div>
           </div>
           <div class="score-item">
             <div >累计积分</div>
             <div class="score-name">{{Integral.RechargeIntegral}}</div>
           </div>
           <div class="score-item">
             <div >已赠送积分</div>
             <div class="score-name">
                {{Integral.SendIntegral}}
             </div>
           </div>
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
            <el-table-column property="time" label="时间" width="170" align="center">
            </el-table-column>
             <el-table-column property="UserName" label="用户名" width="180" align="center">
            </el-table-column>
             <el-table-column property="Amount" label="消费金额(元)" width="180" align="center">
            </el-table-column>
              <el-table-column property="RebateRatio" label="返利比例(%)" width="180" align="center">
            </el-table-column>
             <el-table-column property="Number" label="积分数量" width="140" align="center"></el-table-column>
            <el-table-column property="Type" label="状态" width="80" align="center"></el-table-column>
           
          </el-table>
        </div>
        <div class="table-small-box">
          <div class="list-item" v-for="(item,index) in jiangList" :key="index">
            <div class="list-item-p">
              <p>时间：<span>{{item.time}}</span></p>
              <p>积分数量：<span>{{item.Number}}</span></p>
            </div>
            <div class="list-item-p">
              <p>用户名：<span>{{item.UserName}}</span></p>
              <p>状态：<span>{{item.Type}}</span></p>
              
            </div>
            <div class="list-item-p">
              <p>消费金额：<span>{{item.Amount}}</span></p>
            </div>
            <div class="list-item-b">
              <p>返利比例：<span>{{item.RebateRatio}}%</span></p>
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
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
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
      jiangList:[],
      Integral:{},
    }
  },
  computed:{
    ...mapState([
      'storeInfo'
    ])
  },
  mounted(){
    this.getChongList();
    
    this.getTotal();
  },
  methods:{
    toTab(num){
      this.tab = num
      if(num == 2){
        this.getJiangList();
      }
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
    },
    //获取商家充值总数
    getTotal(){
      this.$http.storePost(this.$api.MerchantIntegral).then(res=>{
        if(res.data.Code == 1){
          this.Integral = res.data.Data.Integral
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
    overflow: hidden;
    text-align: left;
    .score{
      line-height: 40px;
      font-size:16px;
      span{
        color:@main;
        font-weight: bold;
        margin-right: 30px;
      }
    }
  }
  .chong-btn{
    float:right;
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
.score-box{
  display: none;
  @media screen and(max-width:@change_width) {
    display: flex;
    padding:14px 0;
    margin:0 -15px;
    border-bottom: 10px solid @body_color;
    .score-item{
      width:33.33%;
      text-align: center;
      font-size:14px;
      .score-name{
        color:@main;
        font-weight: bold;
      }
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
  .score{
    display: none;
  }
}
.page-box{
  padding:30px 0;
}

</style>
