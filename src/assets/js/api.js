export default {
    //首页
    GetBannerGoods: '/api/Webconfig/GetBannerGoods', //获取banner
    GetWebMessage: '/api/Webconfig/GetWebMessage', //获取公告
    GetHomePageCats: '/api/Webconfig/GetHomePageCats', //获取分类
    GetCat: '/api/Webconfig/GetCat', //获取商品
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
    //商家列表
    GetMerchaterClass: '/api/YiQiFa/GetMerchaterClass', //获取商家列表
    //逛街购物
    shopCitys: '/api/shopping/Citys', //获取城市分类
    shopCategorys: '/api/shopping/Categorys', //商家类型
    //美食广场
    foodCategorys: '/api/Food/Categorys', //商家类型
    //帮助中心
    Q_A_Class: '/api/QuestionAnswer/Q_A_Class', //帮助中心
    Q_A_ByClass: '/api/QuestionAnswer/Q_A_ByClass', //通过id 获取分类列表
    //登录
    Login: '/api/LoginRegister/Login', //用户登录
    UserLoginIsNeedVerify: '/api/LoginRegister/UserLoginIsNeedVerify', //用户登录是否需要验证
    storeLogin: '/api/LoginRegister/MerchanterLogin', //商家登录
    MerchantLoginIsNeedVerify: '/api/LoginRegister/MerchantLoginIsNeedVerify', //商家登录是否需要验证
    UserLoginSendVerifyCode: '/api/LoginRegister/UserLoginSendVerifyCode', //用户登录获取验证码
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

    //个人中心
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
}