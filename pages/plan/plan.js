// pages/plan/plan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show3: false,
    todolist:null,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2020, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    time_focus:null,
    time: '12:01'
  },
  
  // onChange:function(e){
  //   console.log(e.detail)
  // },
  onChange(event) {
    const { detail, currentTarget } = event;
    const result = new Date(detail)
    this.setData({
      time_focus:result
    })
    
  },

  // getResult(time, type) {
  //   const date = new Date(time);
  //   console.log(date)
  //   switch (type) {
  //     case 'datetime':
  //       return date.toLocaleString();
  //     case 'date':
  //       return date.toLocaleDateString();
  //     case 'year-month':
  //       return `${date.getFullYear()}/${date.getMonth() + 1}`;
  //     case 'time':
  //       return time;
  //     default:
  //       return '';
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/demo/superadmin/gettodolist',
      data: {
        "session_key": wx.getStorageSync("LoginSessionKey"),
        "type": "restaurant"
      },
      success: function (res) {
        that.setData({
          todolist: res.data.todolist
        })
        console.log("tet");
      }
    })
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
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