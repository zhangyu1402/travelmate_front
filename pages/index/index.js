// pages/index/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    plan: function(){
      wx.redirectTo({
        url: '../plan/plan',
      })
    },
    onLoad: function() {
      if (wx.getStorageSync('LoginSessionKey')) {
        wx.request({
          url: 'http://localhost:8080/demo/superadmin/LoginCheck',
          data: {
            data: wx.getStorageSync('LoginSessionKey')
          },
          method: 'GET',
          success: function(res) {
            if (res.data.state == '200') {
              // wx.redirectTo({
              //   url: '../main/main',
              // })
            } else {
              wx.login({
                success: function(res) {
                  if (res.code) {
                    wx.request({
                      url: 'http://localhost:8080/demo/superadmin/Login',
                      data: {
                        data: res.code
                      },
                      method: 'GET',
                      success: function(res) {
                        if (res.statusCode == "200") {
                          try {
                            wx.setStorageSync('LoginSessionKey', res.data.Sessionkey);
                          } catch (e) {
                            console.log("error")
                            console.log(e)
                          }
                          // var resinfo = wx.getStorageInfoSync()
                          // var tmp = wx.getStorageSync('LoginSessionKey');
                          // wx.redirectTo({
                          //   url: '../main/main',
                          // })
                        }
                      },
                      fail: function(res) {
                        console.log(res)
                      }
                    })
                  }
                },
                fail: function(res) {
                  console.log(res)
                }
              })
            }
          }
        })
      } else {
        var that = this;
        console.log("dont have session key");
        wx.login({
          success: function(res) {
            if (res.code) {
              wx.request({
                url: 'http://localhost:8080/demo/superadmin/Login',
                data: {
                  data: res.code
                },
                method: 'GET',
                success: function(res) {
                  if (res.statusCode == "200") {
                    try {
                      wx.setStorageSync('LoginSessionKey', res.data.Sessionkey);
                    } catch (e) {
                      console.log("error")
                      console.log(e)
                    }
                    // var resinfo = wx.getStorageInfoSync()
                    // var tmp = wx.getStorageSync('LoginSessionKey');
                    // wx.redirectTo({
                    //   url: '../main/main',
                    // })
                  }
                },
                fail: function(res) {
                  console.log(res)
                }
              })
            }
          },
          fail: function(res) {
            console.log(res)
          }
        })
      }
    }
  }

})