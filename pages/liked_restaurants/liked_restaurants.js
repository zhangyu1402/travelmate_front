// pages/liked_restaurants/liked_restaurants.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restaurants:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  unlike: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/demo/superadmin/deletelikedrestaurant',
      data: {
        restaurant: e.target.dataset.id,
        session_key: wx.getStorageSync("LoginSessionKey")
      },
      success: function (res) {
        var old_data = that.data.restaurants;
        for (var i = 0; i < old_data.length; i++) {
          if (old_data[i].id == e.target.dataset.id) {
            old_data[i] = null;
          }
        }
        that.setData({
          restaurants:old_data
        })
        console.log(that.data.likedrrtId)
        wx.showToast({
          title: 'unlike success',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/demo/superadmin/getlikedrrt',
      data: { "session_key": wx.getStorageSync("LoginSessionKey")},
      success:function(res){
        that.setData({
          restaurants:res.data.restaurants
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.reLaunch({
      url: '../main/main'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})