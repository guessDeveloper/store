<template>
  <div>
    <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">帮助中心</span>
      </div>
      <div class="banner">
          <div class="txt">
             <div class="top">帮助中心</div>
             <div class="bottom">Help center</div>
          </div>
      </div>
      <div class="qustion-list">
        <div class="title">问题分类</div>
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="goDetal(item)">
             <div class="icon">
               <img :src="item.HtIpIco" alt="">
             </div>
             <div class="content">
                <h3>{{item.Name}}</h3>
                <p>{{item.title}}</p>
             </div>
          </li>
         
        </ul>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      list:[]
    }
  },
  mounted(){
    this.getClass();
  },
  methods:{
    getClass(){
      this.$http.get(this.$api.Q_A_Class).then(res=>{
        if(res.data.Code == 1){
          this.list = res.data.Data.Class
        }
      })
    },
    goDetal(item){
      this.$router.push(`/helpCenterDetail?id=${item.ID}`)
    }
  }
}
</script>
<style lang="less" scoped>
.banner{
  width: @max-width;
  height:240px;
  background:#025D94;
  margin:0 auto;
  color:#fff;
  text-align: center;
  line-height: 240px;
  .txt{
    display: inline-block;
    vertical-align: middle;
    .top{
      font-size:40px;
      line-height: 44px;
      margin-bottom:10px;
    }
    .bottom{
      font-size:20px;
      line-height: 20px;
    }
  }

}
.qustion-list{
  width:@max-width;
  margin:0 auto;
  .title{
    position: relative;
    font-size:28px;
    line-height: 24px;
    padding-left:14px;
    margin:50px auto 20px;
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
  ul{
    .clear();
    padding-bottom:165px;
    li{
      float: left;
      width:285px;
      height:110px;
      background:#fff;
      line-height: 110px;
      margin:0 20px 20px 0;
      cursor: pointer;
      &:nth-of-type(4n){
        margin-right:0;
      }
      .icon{
        display: inline-block;
        width:60px;
        height:60px;
        margin:0 15px 0 30px;
        border-radius: 60px;
        font-size:24px;
        line-height: 60px;
        color:#C8C8C8;
        border:1px solid #FFD1C8;
        text-align: center;
        vertical-align: middle;
        overflow: hidden;
        img{
          display: block;
          width:100%;
          height:100%;
        }
      }
      .content{
        display: inline-block;
        vertical-align: middle;
        h3{
          font-size:16px;
          line-height: 16px;
          margin-bottom:12px;
        }
        p{
          font-size :12px;
          color:@subtitle_color;
          line-height: 12px;
        }
      }
    }
  }
}
</style>