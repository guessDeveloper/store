<template>
  <a class="subject-card" :href="data.ClickURl" > 
      <img :src="data.picurl" alt="">
      <div class="des">
         <h4><span class="title">{{data.title}}</span><span class="price">249元起</span></h4>
         <p>餐厨起居洗护好物</p>
         <div class="phone-price">249元起</div>
         <!-- <div class="num-box"><span class="zan num"><i class="iconfont iconxh"></i>39948</span><span class="num"><i class="iconfont iconck"></i>3434322</span><span class="num comment"><i class="iconfont iconpl"></i>fsdfsdf </span></div> -->
      </div>
  </a>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  props:{
    data:{
      type:Object
    }
  }
}
</script>
<style lang="less" scoped>
.subject-card{
  width:100%;
   background:#fff;
   text-align: left;
   color:@font_color;
  img{
    display: block;
    width:380px;
    height:380px; 
  }
  .des{
    padding:25px 20px 27px;
    h4{
      font-size:16px;
      text-align: left;
      line-height: 16px;
      font-weight: normal;
      .title{
        display: inline-block;
        width:210px;
        .overTextOne();
      }
      .price{
        font-size:16px;
        float:right;
        font-weight:bold;
        color:@percent_color;
      }
    }
    .phone-price{
      display: none;
    }
    p{
      
      font-size:12px;
      line-height: 12px;
      margin-top:8px;
      color:@subtitle_color;
    }
  }
  .num-box{
    margin-top:32px;
    .clear();
    .comment{
      float:right;

    }
    .zan{
      display: inline-block;
      width:85px;
    }
  }
  .num{
    font-size:14px;
    .iconfont{
      font-size:14px;
      color:@placeholder_color;
      margin-right:6px;
    }
  }
   @media screen and(max-width:@change_width){
     &{
       display: flex;
     }
     img{
       width:110/@p;
       height:110/@p;
     }
     .des{
       width:calc(100% - 110px);
       padding:17/@p 17/@p 0 14/@p;
       h4{
         font-size:12px;
         line-height: 12px;
         .title{
           width:100%;
         }
       }
       p{
         font-size:12px ;
       }
       .phone-price{
          display: block;
          font-size:16px;
          line-height: 16px;
          margin-top:11px;
          color:@percent_color;
          font-weight: bold;
       }
       .price{
         display: none;

       }
     }
     .num-box{
       margin-top:11px;
     }
     .num{
       font-size:12px;
       line-height: 12px;
       .iconfont{
         font-size:10px;
         margin-right:4px;
       }
     }
   }
}
</style>