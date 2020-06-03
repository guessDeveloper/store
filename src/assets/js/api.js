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
    //帮助中心
    Q_A_Class: '/api/QuestionAnswer/Q_A_Class', //帮助中心
    Q_A_ByClass: '/api/QuestionAnswer/Q_A_ByClass', //通过id 获取分类列表
    //登录
    Login: '/api/LoginRegister/Login', //用户登录
    storeLogin: '/api/LoginRegister/MerchanterLogin', //商家登录
    //注册
    SendRegistCode: '/api/LoginRegister/SendRegistCode', //注册发送验证码
    AddUser: '/api/LoginRegister/AddUser', //用户注册
    GetUserAgreement: '/api/LoginRegister/GetUserAgreement', //获取用户注册协议
    GetMerchantAgreement: '/api/LoginRegister/GetMerchantAgreement', //获取商家协议
}