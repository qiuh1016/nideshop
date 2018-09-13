// default config
module.exports = {
  default_module: 'api',
  workers: 1,
  // host: '127.0.0.1',
  weixin: {
    appid: 'wxb2c22856549f3ab2', // 小程序 appid
    secret: '34268d31ff74199a69a7b5d017d8b450', // 小程序密钥
    mch_id: '', // 商户帐号ID
    partner_key: '', // 微信支付密钥
    notify_url: '' // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
  },
  express: {
    // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.kdniao.com/
    appid: '', // 对应快递鸟用户后台 用户ID
    appkey: '', // 对应快递鸟用户后台 API key
    request_url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'
  }
};
