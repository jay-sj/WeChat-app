const baseUrl = require("/siteInfo.js").site;

App({
  onLaunch: function () {

  },
  globalData: {

  },
  doLogin() {  //跳转到登录
    let pages = getCurrentPages();
    let current = pages[pages.length - 1];
    if (current.route !== "/pages/login/login") {
      // 跳到登录页
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  //验证登录状态
  checkLogin(){
    let token = wx.getStorageSync('token');
    return !!token;
  },
  _post(obj) {
    let App = this;
    obj.data = obj.data ? obj.data : null;
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync('token');
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      wx.request({
        url: baseUrl + obj.url,
        header: {
          "content-type": "application/x-www-form-urlencoded",
          token
        },
        data: obj.data,
        method: "POST",
        success: (res) => {
          wx.hideLoading();
          if (res.data.code === 200) {
            resolve(res);
          } else if (res.data.code === 401) {
            // token过期了
            App.doLogin();
          }

        },
        fail: (err) => {
          reject(err);
        }
      });
    })
  },
  _get(obj) {
    let App = this;
    obj.data = obj.data ? obj.data : null;
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync('token');
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      wx.request({
        url: baseUrl + obj.url,
        header: {
          token
        },
        data: obj.data,
        method: "GET",
        success: (res) => {
          wx.hideLoading();
          if (res.data.code === 200) {
            resolve(res);
          } else if (res.data.code === 401) {
            // token过期了
            App.doLogin();
          }

        },
        fail: (err) => {
          reject(err);
        }
      });
    })
  }
})