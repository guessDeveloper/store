<template>
  <div class="card-box">
    <div class="title">
       <h3>搞定熊孩子</h3>
       <p>宝贝闹翻天 玩具来救急</p>
       <router-link tag="a" class="more" to="/">查看全部<span class="iconfont iconjiantou"></span></router-link>
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
</style>