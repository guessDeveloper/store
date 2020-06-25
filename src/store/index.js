import Vue from 'vue'
import Vuex from 'vuex'
// import { delete } from 'vue/types/umd';
// import { delete } from 'vue/types/umd';


Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        positionX: '', // 经度
        positionY: '', //纬度
        storeInfo: '', //商家信息
        searchItem: '', //搜索页面
        isLogin: false,
        charNum: JSON.parse(localStorage.getItem("carNum")) || 0, // 购物车数量
        myCar: JSON.parse(localStorage.getItem("carObject")) || {}, //购物车对象
    },
    getters: {
        charNowNum: (state) => {
            let num = 0;
            for (let element in state.myCar) {
                if (state.myCar[element].goodsList) {
                    for (let item in state.myCar[element].goodsList) {
                        num++
                    }
                }
            }
            return num
        },
    },
    mutations: {
        changeNum(state, num) {
            state.charNum = num
        },
        delNum(state) {
            state.charNum--
        },
        setLogin(state, num) {
            state.isLogin = num
        },
        setPositionX(state, num) {
            state.positionX = num
        },
        setPositionY(state, num) {
            state.positionY = num
        },
        setStoreInfo(state, object) {
            state.storeInfo = object
        },
        //购物车增加商品
        carAddStore(state, object) {
            let storeObject = object[0]
            let goodsObject = object[1]

            if (state.myCar[storeObject.id]) {
                if (state.myCar[storeObject.id].goodsList[goodsObject.GoodsId]) {
                    state.myCar[storeObject.id].goodsList[goodsObject.GoodsId].num = state.myCar[storeObject.id].goodsList[goodsObject.GoodsId].num + goodsObject.num
                } else {
                    state.myCar[storeObject.id].goodsList[goodsObject.GoodsId] = goodsObject
                }

            } else {
                state.myCar[storeObject.id] = {
                    MertchntID: storeObject.id,
                    Mertchntname: storeObject.name,
                    tablenumber: storeObject.tablenumber,
                    goodsList: {},
                    checked: false,
                    goodsNum: 1,
                }
                state.myCar[storeObject.id].goodsList[goodsObject.GoodsId] = goodsObject
            }
            let arr = Object.keys(state.myCar[storeObject.id].goodsList)
            state.myCar[storeObject.id].goodsNum = arr.length
            let num = 0;
            for (let element in state.myCar) {
                if (state.myCar[element].goodsList) {
                    for (let item in state.myCar[element].goodsList) {
                        num++
                    }
                }
            }
            state.charNum = num
            for (let item in state.myCar) {
                let checkNum = 0; //选择数
                let totoalMony = 0; //总计金额
                let goodsList = state.myCar[item].goodsList;
                for (let element in state.myCar[item].goodsList) {
                    if (goodsList[element].check == true) {
                        checkNum++
                        totoalMony += goodsList[element].GoodsMoneny * goodsList[element].num
                    }
                }
                state.myCar[item].choseNum = checkNum
                state.myCar[item].totoalMony = totoalMony
            }
            state.myCar = Object.assign({}, state.myCar)
        },
        //商品数量改变计算价格
        choseGood(state) {
            console.log('change', state.myCar)
            for (let item in state.myCar) {
                let checkNum = 0; //选择数
                let totoalMony = 0; //总计金额
                let totalScore = 0; // 总返利积分
                let isChooseAll = true;
                let goodsList = state.myCar[item].goodsList;
                for (let element in state.myCar[item].goodsList) {
                    if (goodsList[element].check == true) {
                        checkNum++
                        totoalMony += goodsList[element].GoodsMoneny * goodsList[element].num
                        totalScore += goodsList[element].Goodsfanli * goodsList[element].num
                    }
                    isChooseAll = isChooseAll && goodsList[element].check
                }
                state.myCar[item].choseNum = checkNum
                state.myCar[item].totoalMony = totoalMony
                state.myCar[item].totalScore = totalScore
                state.myCar[item].check = isChooseAll

            }
            state.myCar = Object.assign({}, state.myCar)
        },
        //全选
        choseAll(state) {
            for (let item in state.myCar) {
                let checkNum = 0; //选择数
                let totoalMony = 0; //总计金额
                let totalScore = 0; // 总返利积分
                let goodsList = state.myCar[item].goodsList;
                if (state.myCar[item].check == true) {
                    for (let element in state.myCar[item].goodsList) {
                        checkNum++
                        goodsList[element].check = true
                        totoalMony += goodsList[element].GoodsMoneny * goodsList[element].num
                        totalScore += goodsList[element].Goodsfanli * goodsList[element].num
                    }
                } else {
                    for (let element in state.myCar[item].goodsList) {
                        goodsList[element].check = false
                    }
                }
                state.myCar[item].choseNum = checkNum
                state.myCar[item].totoalMony = totoalMony
                state.myCar[item].totalScore = totalScore
                state.myCar = Object.assign({}, state.myCar)
            }
        },
        //删除单个商品
        cancleSingle(state, object) {
            let storeId = object[0];
            let goodsId = object[1];
            delete(state.myCar[storeId].goodsList[goodsId])
            let arr = Object.keys(state.myCar[storeId].goodsList)
            state.myCar[storeId].goodsNum = arr.length
            let num = 0;
            for (let element in state.myCar) {
                if (state.myCar[element].goodsList) {
                    for (let item in state.myCar[element].goodsList) {
                        num++
                    }
                }
            }

            state.charNum = num
            for (let item in state.myCar) {
                let checkNum = 0; //选择数
                let totoalMony = 0; //总计金额
                let totalScore = 0; // 总返利积分
                let goodsList = state.myCar[item].goodsList;
                for (let element in state.myCar[item].goodsList) {
                    if (goodsList[element].check == true) {
                        checkNum++
                        totoalMony += goodsList[element].GoodsMoneny * goodsList[element].num
                        totalScore += goodsList[element].Goodsfanli * goodsList[element].num
                    }
                }
                state.myCar[item].choseNum = checkNum
                state.myCar[item].totoalMony = totoalMony
                state.myCar[item].totalScore = totalScore
            }
            if (arr.length == 0) {
                delete(state.myCar[storeId])
            }
            let charNum = 0;
            for (let element in state.myCar) {
                if (state.myCar[element].goodsList) {
                    for (let item in state.myCar[element].goodsList) {
                        charNum++
                    }
                }
            }
            state.charNum = charNum
            state.myCar = Object.assign({}, state.myCar)
        },
        //删除选中商品
        cancleChose(state, storeId) {
            let goods = state.myCar[storeId].goodsList;
            for (let i in goods) {
                if (goods[i].check == true) {
                    delete(goods[i])
                }
            }
            let num = 0;
            let arr = Object.keys(state.myCar[storeId].goodsList)
            for (let element in state.myCar) {
                if (state.myCar[element].goodsList) {
                    for (let item in state.myCar[element].goodsList) {
                        num++
                    }
                }
            }

            state.charNum = num
            for (let item in state.myCar) {
                let checkNum = 0; //选择数
                let totoalMony = 0; //总计金额
                let totalScore = 0; // 总返利积分
                let goodsList = state.myCar[item].goodsList;
                for (let element in state.myCar[item].goodsList) {
                    if (goodsList[element].check == true) {
                        checkNum++
                        totoalMony += goodsList[element].GoodsMoneny * goodsList[element].num
                        totalScore += goodsList[element].Goodsfanli * goodsList[element].num
                    }
                }
                state.myCar[item].choseNum = checkNum
                state.myCar[item].totoalMony = totoalMony
                state.myCar[item].totalScore = totalScore
            }
            if (arr.length == 0) {
                delete(state.myCar[storeId])
            }
            let charNum = 0;
            for (let element in state.myCar) {
                if (state.myCar[element].goodsList) {
                    for (let item in state.myCar[element].goodsList) {
                        charNum++
                    }
                }
            }
            state.charNum = charNum
            state.myCar = Object.assign({}, state.myCar)

        },
        //购物成功
        shopSuccess(state, id) {
            delete state.myCar[id]
            state.myCar = Object.assign({}, state.myCar)
        }



    },
    actions: {

    },
    modules: {}

})
store.subscribe((mutations, state) => {
    localStorage.setItem('carNum', JSON.stringify(state.charNum))
    localStorage.setItem("carObject", JSON.stringify(state.myCar));
})
export default store