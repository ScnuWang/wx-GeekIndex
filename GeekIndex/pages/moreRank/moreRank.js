// moreRank.js
//获取应用实例
var app = getApp()
Page({
  //wxml文件通过{{name}}取出值：其中name的值要对应
  data: {
    catetorys: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.loadCatetory();
  },
  loadCatetory: function () {
    var page = this;
    wx.request({
      url: 'http://54.223.181.88/show/wxcatetorylist',
      success: function (res) {
        console.log(res.data)
        //这里不能直接使用this
        page.setData({
          "catetorys": res.data
        })
      }
    })
  }
})