<template>
    <div>
        <div class="brand-top-nav">
            <router-link tag="a" to="/">首页</router-link>
            <span class="iconfont iconjiantou"></span>
            <span class="now-nav">淘宝</span>
        </div>
        <div class="item-box">
            <ul>
                <li>
                    <div class="img-box"></div>
                    <div class="name">卫衣</div>
                </li>
                <li>
                    <div class="img-box"></div>
                    <div class="name">卫衣</div>
                </li>
                <li>
                    <div class="img-box"></div>
                    <div class="name">卫衣</div>
                </li>
                <li>
                    <div class="img-box"></div>
                    <div class="name">卫衣</div>
                </li>
                <li>
                    <div class="img-box"></div>
                    <div class="name">卫衣</div>
                </li>
                <li>
                    <div class="img-box"></div>
                    <div class="name">卫衣</div>
                </li>
                <li>
                    <div class="img-box"></div>
                    <div class="name">卫衣</div>
                </li>
                <li>
                    <div class="img-box"></div>
                    <div class="name">卫衣</div>
                </li>
                <li>
                    <div class="img-box"></div>
                    <div class="name">卫衣</div>
                </li>
                <li>
                    <div class="img-box"></div>
                    <div class="name">卫衣</div>
                </li>

            </ul>
        </div>
        <div class="list-box">
            <CardList></CardList>
        </div>
        <div class="subject-box">
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
        </div>
    </div>
</template>
<script>
import CardList from '@/components/taobao/cardListType'
import subjectCard from '@/components/taobao/subjectCard'
export default {
    data(){
        return{

        }
    },
    components:{
       CardList:CardList,
       subjectCard:subjectCard 
    }
}
</script>
<style lang="less" scoped>
.item-box{
    width:@max-width;
    box-sizing: border-box;
    margin:0 auto;
    background:#fff;
    padding:40px 72px 8px;
    text-align: center;
    ul{
        display: inline-block;
        .clear();
        li{
            float: left;
            width:68px;
            margin:0 54px 32px;
            .img-box{
                width:68px;
                height:68px;
                border-radius: 50%;
                background:#ccc;
            }
            .name{
                font-size:14px;
                line-height: 14px;
                margin-top:26px;
            }
        }
    }
}
.list-box{
    margin-top:20px;
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