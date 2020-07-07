<template>
    <div v-loading.fullscreen.lock="loading" class="home">
        <div class="brand-top-nav">
            <router-link tag="a" to="/">首页</router-link>
            <span class="iconfont iconjiantou"></span>
            <span class="now-nav">淘宝</span>
        </div>
        <div class="item-box">
            <ul>
                <li v-for="(item,index) in classList" :key="index">
                   <router-link :to="'/taobaoList?classId='+item.ID+'&className='+item.titleA" tag="div">
                    <div class="img-box">
                        <img :src="item.CatPhoto" alt="">
                    </div>
                    <div class="name">{{item.titleA}}</div>
                   </router-link>
                </li>
                
            </ul>
        </div>
        <div class="list-box">
            <CardList v-for="(item,index) in goodsList" :key="index" :data="item"></CardList>
        </div>
        <!-- <div class="subject-box">
            <div class="title">相关专题</div>
            <ul>
                <li><subjectCard></subjectCard></li>
                 <li><subjectCard></subjectCard></li>
                  <li><subjectCard></subjectCard></li>
                   <li><subjectCard></subjectCard></li>
                    <li><subjectCard></subjectCard></li>
                     <li><subjectCard></subjectCard></li>
            </ul>
            <button class="more">查看更多</button>
        </div> -->
    </div>
</template>
<script>
import CardList from '@/components/taobao/cardListType'
// import subjectCard from '@/components/taobao/subjectCard'
export default {
    data(){
        return{
            classList:[],
            goodsList:[],
            loading:false
        }
    },
    mounted(){
        this.getClass();
        this.getGoods();
    },
    components:{
       CardList:CardList,
    //    subjectCard:subjectCard 
    },
    methods:{
        //获取顶部分类
        getClass(){
            
            this.$http.get(this.$api.GetClassNoPic).then(res=>{
               if(res.data.Code == 1){
                  this.classList = res.data.Data
               }
              
            })
        },
        //获取精选分类
        getGoods(){
            this.loading = true
            this.$http.get(this.$api.GetClassMaterial).then(res=>{
              if(res.data.Code == 1){
                  this.goodsList = res.data.Data
                 
              }
              setTimeout(()=>{
            this.loading = false
          },this.$util.loadingTime)
            }).catch(()=>{
               setTimeout(()=>{
            this.loading = false
          },this.$util.loadingTime)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.home{
    min-height: 100vh;
}
.item-box{
    width:@max-width;
    box-sizing: border-box;
    margin:0 auto;
    background:#fff;
    padding:40px 45px 8px;
    text-align: center;
    ul{
        display: inline-block;
        .clear();
        li{
            float: left;
            width:185px;
            margin:0 0px 32px;
            cursor: pointer;
            .img-box{
                width:68px;
                height:68px;
                margin:0 auto;
                border-radius: 50%;
                background:#ccc;
                overflow: hidden;
                img{
                    display: block;
                    width:100%;
                    height:100%;
                }
            }
            .name{
                font-size:14px;
                line-height: 14px;
                margin-top:26px;
            }
        }
    }
    @media screen and(max-width:@change_width){
      &{
          width:100%;
          margin-top:10px;
          padding:20/@p 15/@p 0;
          ul{
              display: flex;
              flex-wrap: wrap;
              li{
                float: none;
                width:25%;
                margin-bottom:22/@p;
                .img-box{
                    width:60/@p;
                    height:60/@p;
                }
                .name{
                    font-size:12/@p;
                    line-height: 12/@p;
                    margin-top:10/@p;
                }
              }
              
          }
      }
    }
}
.list-box{
    margin-top:20px;
    margin-bottom:100px;
}
.subject-box{
    width:@max-width;
    margin:0 auto;
    text-align: center;
    padding-bottom:150px;
    .title{
        font-size:28px;
        line-height: 28px;
        padding:80px 0 50px;
    }
    ul{
        .clear();
        li{
            float: left;
            width:380px;
            margin:0 30px 30px 0;
            &:nth-of-type(3n){
                margin-right:0;
            }
        }
    }
    .more{
        width:252px;
        height:40px;
        border:2px solid @main;
        font-size: 16px;
        color:@main;
        border-radius: 40px;
        margin-top:30px;
        transition: all .3s ease;
        &:hover{
            background:@main;
            color:#fff;
        }
    }
}

</style>