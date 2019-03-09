// pages/main/main.js
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
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
    show3: false,
    todolistId: null,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2020, 10, 1).getTime(),
    currentDate: new Date().getTime(),


    time_focus: null,
    ac_id:null,

    time: '12:01',
    tabs: ["flight", "events", "restaurant"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    countries: ["中国", "美国", "英国"],
    countryIndex: 0,
    latitude: 0,
    longitude: 0,
    res_data: 0,
    likedrrtId: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleActionSheet3(e) {
      this.setData({
        ac_id : e.target.dataset.id
      })
      this.toggle('show3');
    },
    toggle(type) {
      this.setData({
        [type]: !this.data[type]
      });
    },
    onConfirm: function () {
      var that = this;
      wx.request({
        url: 'http://localhost:8080/demo/superadmin/addactivity',
        data: {
          activity_id: that.data.ac_id,
          session_key: wx.getStorageSync("LoginSessionKey"),
          activity_type: 'restaurant',
          start_time: that.data.time_focus
        },
        success:function(res){
          wx.showToast({
            title: 'add success',
          })
        }
      })
    },
    onChange(event) {
      const { detail, currentTarget } = event;
      const result = new Date(detail)
      this.setData({
        time_focus: result
      })

    },
    add_to_list: function(e){
      wx.request({
        url: 'http://localhost:8080/demo/superadmin/addactivity',
        data: {
          activity_id: e.target.dataset.id,
          session_key: wx.getStorageSync("LoginSessionKey"),
          activity_type: 'restaurant'
        },
        success:function(res){
          wx.showToast({
            title: 'add successfully',
          })
        }
      })
    },
    d_from_list: function(e){
      wx.request({
        url: 'http://localhost:8080/demo/superadmin/deleteactivity',
        data: {
          activity_id: e.target.dataset.id,
          session_key: wx.getStorageSync("LoginSessionKey"),
          activity_type: 'restaurant'
        },
        success: function (res) {
          wx.showToast({
            title: 'delete successfully',
          })
        }
      })
    },
    unlike:function(e){
      var that = this;
      wx.request({
        url: 'http://localhost:8080/demo/superadmin/deletelikedrestaurant',
        data: {
          restaurant: e.target.dataset.id,
          session_key: wx.getStorageSync("LoginSessionKey")
        },
        success: function (res) {
          var old_data = that.data.res_data;
          for(var i =0; i<old_data.businesses.length;i++){
            if (old_data.businesses[i].id == e.target.dataset.id){
              old_data.businesses[i].liked = false;
            }
          }
          that.setData({
            res_data:old_data
          })
          console.log(that.data.likedrrtId)
          wx.showToast({
            title: 'unlike success',
            duration: 2000
          })
        }
      })
    },
    isInArray: function(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true;
        }
      }
      return false;
    },

    onShow: function() {
      this.getlocation();
      var that = this;
      wx.request({
        url: 'http://localhost:8080/demo/superadmin/getlikedrrtId',
        data: {
          "session_key": wx.getStorageSync("LoginSessionKey")
        },
        success: function(res) {
          that.setData({
            likedrrtId: res.data.restaurantsId
          })
        }
      })
      wx.request({
        url: 'http://localhost:8080/demo/superadmin/gettodolistId',
        data:{
          "session_key": wx.getStorageSync("LoginSessionKey"),
          "type":"restaurant"
        },
        success:function(res){
          that.setData({
            todolistId: res.data.todolistId
          })
        }
      })
    },
    gotoliked: function() {
      wx.redirectTo({
        url: '../liked_restaurants/liked_restaurants',
      })
    },
    like: function(e) {
      var that = this
      console.log(e.target.dataset.id)
      wx.request({
        url: 'http://localhost:8080/demo/superadmin/addlikedrestaurant',
        data: {
          restaurant: e.target.dataset.id,
          session_key: wx.getStorageSync("LoginSessionKey")
        },
        success: function(res) {
          wx.showToast({
            title: 'like success',
            duration: 2000
          })
        }
      })
    },
    getlocation: function() {
      var that = this;
      var latitude;
      var longitude;
      latitude, longitude = wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
          return latitude, longitude
        }
      });
      console.log(that.data.latitude, that.data.longitude)
      wx.request({
        url: 'http://localhost:8080/demo/superadmin/getBusiness',
        data: {
          latitude: that.data.latitude,
          longitude: that.data.longitude
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          for (var i = 0; i < res.data.businesses.length; i++) {
            if (that.isInArray(that.data.todolistId, res.data["businesses"][i]["id"])){
              res.data["businesses"][i]['inTodoList'] = true
            }else{
              res.data["businesses"][i]['inTodoList'] = false
            }
            if (that.isInArray(that.data.likedrrtId, res.data["businesses"][i]["id"])) {
              res.data["businesses"][i]['liked'] = true
            } else {
              res.data["businesses"][i]['liked'] = false
            }
          }
          that.setData({
            res_data: res.data
          })
        }
      })
      // for (var i = 0; i < that.res_data.length; i++) {
      //   that.res_data
      // }


    },
    onLoad: function() {
      var that = this;
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex

          });
          console.log((res.windowWidth / that.data.tabs.length - sliderWidth) / 2);
        }
      });
    },
    tabClick: function(e) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id

      });
    },
    bindCountryChange: function(e) {
      console.log('picker country 发生选择改变，携带值为', e.detail.value);

      this.setData({
        countryIndex: e.detail.value
      })
    },
  }
})