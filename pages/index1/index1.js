//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../main/main'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if(wx.getStorageSync('LoginSessionKey')){
      wx.request({
        url: 'http://localhost:8080/demo/superadmin/LoginCheck',
        data: { data: wx.getStorageSync('LoginSessionKey')},
        method:'GET',
        success:function(res){
          if (res.data.state == '200'){
            wx.redirectTo({
              url: '../main/main',
            })
          }else{
            wx.login({
              success: function (res) {
                if (res.code) {
                  wx.request({
                    url: 'http://localhost:8080/demo/superadmin/Login',
                    data: { data: res.code },
                    method: 'GET',
                    success: function (res) {
                      if (res.statusCode == "200") {
                        try {
                          wx.setStorageSync('LoginSessionKey',res.data.Sessionkey);
                        } catch (e) {
                          console.log("error")
                          console.log(e)
                        }
                        // var resinfo = wx.getStorageInfoSync()
                        // var tmp = wx.getStorageSync('LoginSessionKey');
                        wx.redirectTo({
                          url: '../main/main',
                        })
                      }
                    },
                    fail: function (res) {
                      console.log(res)
                    }
                  })
                }
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        }
      })
    }else{
      var that = this;
      console.log("dont have session key");
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: 'http://localhost:8080/demo/superadmin/Login',
              data: { data: res.code },
              method: 'GET',
              success: function (res) {
                if (res.statusCode == "200") {
                  try{
                    wx.setStorageSync('LoginSessionKey', res.data.Sessionkey);
                  }catch(e){
                    console.log("error")
                    console.log(e)
                  }
                  // var resinfo = wx.getStorageInfoSync()
                  // var tmp = wx.getStorageSync('LoginSessionKey');
                  wx.redirectTo({
                    url: '../main/main',
                  })
                }
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
