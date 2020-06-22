<template>
  <div class="card-box">
    <div class="title">
       <h3>搞定熊孩子</h3>
       <p>宝贝闹翻天 玩具来救急</p>
       <router-link tag="a" class="more" to="/recommendList">查看全部<span class="iconfont iconjiantou"></span></router-link>
    </div>
    <ul class="list">
      <li>
        <preferredCard></preferredCard>
      </li>
      <li>
        <preferredCard></preferredCard>
      </li>
      <li>
        <preferredCard></preferredCard>
      </li>
      <li>
        <preferredCard></preferredCard>
      </li>
      <li>
        <preferredCard></preferredCard>
      </li>
    </ul>

  </div>
</template>
<script>
import preferredCard from '@/components/recommend/recommendCard'
export default {
  data(){
    return{

    }
  },
  components:{
    preferredCard:preferredCard
  }
}
</script>
<style lang="less" scoped>
.card-box{
  width:@max-width;
  margin:0 auto;
  background:#fff;
}
.title{
  position: relative;
  padding:26px 0 26px 30px;
  text-align: left;
  border-bottom:1px solid @class_border;
  &::before{
    content:'';
    position: absolute;
    left:0;
    top:26px;
    display: block;
    width:4px;
    height:51px;
    background:@main;
  }
  h3{
    font-size:28px;
    line-height: 28px;
  }
  p{
    font-size:12px;
    line-height: 12px;
    margin-top:12px;
    color:@subtitle_color;
  }
  .more{
    position:absolute;
    line-height: 12px;
    top:46px;
    right:30px;
    color:@font_color;
    font-size: 12px;
    .iconfont{
      font-size:10px;
      transform: scale(.5);
    }
  }
}
.list{
  display: block;
  width:100%;
  .clear();
  li{
    float: left;
    width:20%;
    box-sizing: border-box;
    border-right:1px solid @class_border;
    &:nth-last-child(1){
      border-right:0;
    }
  }
}
@media screen and(max-width:@change_width){
  .card-box {
    width: 100%;
    .title {
      margin-left: 15px;
      margin-right: 15px;
      padding: 15px 0 15px 15px;
      h3 {
        font-size: 20px;
      }
      &::before {
        top: 18px;
      }
      .more {
        top: 35px;
        right: 0;
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 15px 30px;
      width: 100%;
      box-sizing: border-box;
      li {
        width: 50%;
        border: 0;
        &:nth-child(odd) {
          padding-right: 7px;
        }
        &:nth-child(even) {
          padding-left: 7px;
        }
      }
    }
  }
}
</style>
