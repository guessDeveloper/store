export default {
    //全局配置
    GetWebconfig:'/api/Webconfig/GetWebconfig',
    //搜索
    GetGoodsByKey: '/api/Taobao/GetGoodsByKey', // 搜索淘宝
    GJKeyWordSearch: "/api/shopping/GJKeyWordSearch", //逛街购物搜索
    pddGetGoodsByKey: '/api/PDD/GetGoodsByKey', //拼多多搜索
    MSKeyWordSearch: '/api/Food/MSKeyWordSearch', //美食广场搜索
    storeGJKeyWordSearch: '/api/YiQiFa/GJKeyWordSearch', //商城搜索
    //首页
    GetBannerGoods: '/api/Webconfig/GetBannerGoods', //获取banner
    GetWebMessage: '/api/Webconfig/GetWebMessage', //获取公告
    GetHomePageCats: '/api/Webconfig/GetHomePageCats', //获取分类
    GetCat: '/api/Webconfig/GetCat', //获取商品
    GetMerchanters: '/api/Webconfig/GetMerchanters', //获取城市商家联盟

    //淘宝
    GetClassNoPic: '/api/Taobao/GetClass', //获取顶部分类
    GetClassMaterial: '/api/Taobao/GetClassMaterial', //获取精选分类
    ListGetClassNoPic: '/api/Taobao/GetClassNoPic', //淘宝列表获取分类
    optimusByPager: '/api/Taobao/optimusByPager', //根据分类获得淘宝列表
    //拼多多
    classPdd: '/api/PDD/GetTopCats', //获取顶部分类
    GetrecommendCatGoods: '/api/PDD/GetrecommendCatGoods', //获取列表
    GetThemeList: '/api/PDD/GetThemeList', //获取专题
    pddGetClassNoPic: '/api/PDD/GetClassNoPic', //获取拼多多全部分类
    pddGerPageList: '/api/PDD/GerPageList', //通过分类获取拼多多列表
    GetThemeGoods: '/api/PDD/GetThemeGoods', //获取活动列表
    //详情页面
    GetMaterialGoodsById: '/api/Detail/GetGoodsinfo', //获取详情
    clickTobuy: '/api/Detail/clickTobuy', //购买
    //商家列表
    GetMerchaterClass: '/api/YiQiFa/GetMerchaterClass', //获取商家列表
    jumpClickToBuy: '/api/YiQiFa/ClickToBuy', //跳转商城
    //逛街购物
    shopCitys: '/api/shopping/Citys', //获取城市分类
    shopCategorys: '/api/shopping/Categorys', //商家类型
    NearBy: '/api/shopping/NearBy', //h获取列表
    MerchantInfo: '/api/Detail/MerchantInfo', //获取商家详情
    shopGetMerchanter: '/api/shopping/GetMerchanter', //获取商家评价
    shopProducts: '/api/shopping/Products', //获取产品列表
    shopGetMerchanterGoodInfo: "/api/shopping/GetMerchanterGoodInfo", //获取商家产品详情
    //美食广场
    foodCategorys: '/api/Food/Categorys', //商家类型
    foodCitys: '/api/Food/Citys', // 城市
    foodNearBy: '/api/Food/NearBy', //获取列表
    GetMerchanterGoodInfo: '/api/Food/GetMerchanterGoodInfo', //获取商家详情
    GetMerchanter: "/api/Food/GetMerchanter", //获取商家评论
    GetPinoinfo: '/api/Food/GetPinoinfo', //获取评论详情
    foodProducts: '/api/Food/Products', //获取产品列表
    submitFoodOrder: '/api/User/submitFoodOrder', //扫码下单
    //帮助中心
    Q_A_Class: '/api/QuestionAnswer/Q_A_Class', //帮助中心
    Q_A_ByClass: '/api/QuestionAnswer/Q_A_ByClass', //通过id 获取分类列表
    //登录
    Login: '/api/LoginRegister/Login', //用户登录
    UserLoginIsNeedVerify: '/api/LoginRegister/UserLoginIsNeedVerify', //用户登录是否需要验证
    storeLogin: '/api/LoginRegister/MerchanterLogin', //商家登录
    MerchantLoginIsNeedVerify: '/api/LoginRegister/MerchantLoginIsNeedVerify', //商家登录是否需要验证
    UserLoginSendVerifyCode: '/api/LoginRegister/UserLoginSendVerifyCode', //用户登录获取验证码
    MerchanterSendVerifyCode: '/api/LoginRegister/MerchanterSendVerifyCode', //商家获取验证码
    //注册
    SendRegistCode: '/api/LoginRegister/SendRegistCode', //注册发送验证码
    AddUser: '/api/LoginRegister/AddUser', //用户注册
    ADDMerchanter: '/api/LoginRegister/ADDMerchanter', //商家注册
    GetUserAgreement: '/api/LoginRegister/GetUserAgreement', //获取用户注册协议
    M_SendRegistCode: '/api/LoginRegister/M_SendRegistCode', // 商家注册获取验证码
    GetMerchantAgreement: '/api/LoginRegister/GetMerchantAgreement', //获取商家协议
    //忘记密码
    GetVerificationCode: '/api/LoginRegister/GetVerificationCode', // 图像验证码
    UserForgetPWDSendVerifyCode: '/api/LoginRegister/UserForgetPWDSendVerifyCode', //获取验证码
    UserForgetPWD: '/api/LoginRegister/UserForgetPWD', //找回密码
    UserForgetUserNameAndImgCode: '/api/LoginRegister/UserForgetUserNameAndImgCode', //用户验证图形
    MerchanteForgetUserNameAndImgCode: '/api/LoginRegister/MerchanteForgetUserNameAndImgCode', //商家验证图形
    MerchanteForgetPWD: '/api/LoginRegister/MerchanteForgetPWD', // 商家找回密码
    MerchanteForgetPWDSendVerifyCode: '/api/LoginRegister/MerchanteForgetPWDSendVerifyCode', //商家找回密码获验证码
    //个人中心
    ScanQRcode: '/api/User/ScanQRcode', //扫码提交
    UserEditUserInfo: '/api/User/UserEditUserInfo', //修改用户信息
    GetUserInfo: '/api/User/GetUserInfo', //获取用户登录状态
    GetVerificationNum: '/api/User/GetVerificationNum', //获取用户二维码
    UserIntegralRecordInfo: '/api/User/UserIntegralRecordInfo', //获取用户的积分
    UserInviterUrl: '/api/User/UserInviterUrl', // 获取邀请链接
    UserMessageList: '/api/User/UserMessageList', //获取消息列表
    UserInviterList: '/api/User/UserInviterList', //邀请列表
    IntegralExchange: '/api/User/IntegralExchange', //积分兑换
    UserIntegralRecords: '/api/User/UserIntegralRecords', //获取用户积分记录
    UserUsedIntegralRecords: '/api/User/UserUsedIntegralRecords', //获取用户消费积分记录
    UserEditPWDSendVerifyCode: '/api/User/UserEditPWDSendVerifyCode', //修改密码获取验证码
    EditUserInfo_PWD: '/api/User/EditUserInfo_PWD', //修改密码
    UserEditPhoneNOVerify: '/api/User/UserEditPhoneNOVerify', //验证旧手机号获取验证码
    UserEditPhoneNOSendVerifyCode: '/api/User/UserEditPhoneNOSendVerifyCode', // 获取旧手机验证码
    UserEditPhoneNOSendVerifyCodeAgain: '/api/User/UserEditPhoneNOSendVerifyCodeAgain', //获取新手机验证码
    UserEditPhoneNOVerifyAgain: '/api/User/UserEditPhoneNOVerifyAgain', //验证新手机号
    AddOrderAppealList: '/api/User/AddOrderAppealList', //订单申诉
    GetOrderAppealList: '/api/User/GetOrderAppealList', //订单申诉列表
    UserOnlineOrderList: '/api/User/UserOnlineOrderList', //获取线上订单列表
    UserOnlineOrderModel: '/api/User/UserOnlineOrderModel', //获取线上订单详情
    UserGroundOrderList: '/api/User/UserGroundOrderList', // 获取地面订单列表
    UserGroundOrderModel: '/api/User/UserGroundOrderModel', //获取订单详情
    CollectionConfirmation: '/api/User/CollectionConfirmation', //取消订单
    AddComment: '/api/User/AddComment', //评价
    LoginOut: '/api/LoginRegister/LoginOut', //退出登录
    submitOrder:'/api/User/submitOrder',//提交订单
    //商家中心
    MerchanterMerchanter: '/api/Merchant/MerchanterMerchanter', //获取商家信息
    MerchanterLoginOut: '/api/LoginRegister/MerchanterLoginOut', //退出登录
    GetQuickMakList: '/api/Merchant/GetQuickMakList', //获取商家里的二维码
    AddMyQuickMak: "/api/Merchant/AddMyQuickMak", //添加商家二维码
    DeleteQuickMak: '/api/Merchant/DeleteQuickMak', // 删除商家二维码
    GetProcoteClassList: '/api/Merchant/GetProcoteClassList', // 获取分类
    AddProcoteClass: '/api/Merchant/AddProcoteClass', //添加分类
    DeleteProcoteClass: '/api/Merchant/DeleteProcoteClass', //删除分类
    UpProcoteClass: "/api/Merchant/UpProcoteClass", //编辑分类
    ReturnUserIntegrals: "/api/Merchant/ReturnUserIntegrals", //返给用户积分
    SendChangePwdVerifyCode: '/api/Merchant/SendChangePwdVerifyCode', //修改密码发送短信
    ChangePwd: '/api/Merchant/ChangePwd', //修改密码
    SendChangeTelPhoneVerifyCode: '/api/Merchant/SendChangeTelPhoneVerifyCode', //修改手机号发送验证码
    VerifyChangeTelPhone: '/api/Merchant/VerifyChangeTelPhone', //验证旧手机验证码
    SendChangeTelPhoneNewPhoneVerifyCode: '/api/Merchant/SendChangeTelPhoneNewPhoneVerifyCode', //发送新手机验证码
    ChangeMerchantTelPhone: '/api/Merchant/ChangeMerchantTelPhone', //修改新手机
    RechangeList: '/api/Merchant/RechangeList', //获取充值记录
    MerchantUseIntegralRecords: '/api/Merchant/MerchantUseIntegralRecords', //获取积分奖励记录
    ChangeMyInfo: '/api/Merchant/ChangeMyInfo', // 修改商家信息
    GetMerchantCategory: '/api/Merchant/GetMerchantCategory', //获取商家分类
    SelectRechargeMoney: '/api/Merchant/SelectRechargeMoney', //获取充值配置
    GetOrderlist: '/api/Merchant/GetOrderlist', //获取订单列表
    GetProductCategory: '/api/Merchant/GetProductCategory', //获取商家全部分类
    AddProduct: '/api/Merchant/AddProduct', //添加商品
    Products: '/api/Merchant/Products', //获取产品列表
    Recharge: '/api/Merchant/Recharge', //充值
    GetOrderInfo: '/api/Merchant/GetOrderInfo', //获取订单详情
    CancelOrder: '/api/Merchant/CancelOrder', //取消订单
    confirmOrderPay: '/api/Merchant/confirmOrderPay', //确认首款
    confirmOrder: '/api/Merchant/confirmOrder', //确认返积分
    UpOrDownProduct: '/api/Merchant/UpOrDownProduct', //上下架商品
    ShowProduct: '/api/Merchant/ShowProduct', //获取产品详情
    EditProduct: '/api/Merchant/EditProduct', //编辑产品详情
    MerchantIntegr: '/api/Merchant/MerchantIntegr', //获取商家剩余积分
    MerchantIntegral: '/api/Merchant/MerchantIntegral', //获取商家充值总数
    RmbExchangeRate: '/api/Merchant/RmbExchangeRate', //获取积分汇率
    MerchantOrderListRealtime: '/api/Merchant/MerchantOrderListRealtime', //获取实时订单
}