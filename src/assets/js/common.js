const util = {
    // testPhone: /^[1]([3-9])[0-9]{9}$/,
    testPhone: /\d/,
    testNum: /^\d+$/,
    getNowDate() {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth(); //得到月份
        var date = now.getDate(); //得到日期
        // var day = now.getDay();//得到周几
        var hour = now.getHours(); //得到小时
        var minu = now.getMinutes(); //得到分钟
        var sec = now.getSeconds(); //得到秒
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        if (sec < 10) sec = "0" + sec;
        var time = "";
        return time = year + "-" + month + "-" + date;
    },
    beforeUrl: '//files.youledui.com',
    testBeforeUrl: /^\/\/files.youledui.com/,
    phoneLimit(phone) {
        var reg = /^(\d{3})\d{4}(\d{4})$/
        return phone.replace(reg, "$1****$2")
    },
    isAndorid(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        return isAndroid
    }

}
export default util