//app.js
App({
  onLaunch: function () {
    /*前四句代码是官方给的代码，暂时不知道是什么意思*/
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,wx.getUserInfo,wx.requestPayment);
    let clientID = '9636e7f2e129316d535a';
    wx.BaaS.init(clientID);
  }
})