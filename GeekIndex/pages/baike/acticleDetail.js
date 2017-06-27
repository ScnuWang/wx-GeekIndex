// acticleDetail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    var acticleid = getApp().detailacticleid;
    console.log(acticleid);
    // 更加产品编号查询详情
    wx.request({
      url: 'http://1670a21b58.imwork.net/show/getacticle?id=' + acticleid,
      success: function (res) {
        var article = res.data.article;
        WxParse.wxParse('article', 'html', article, page, 5);
      }
    });
  }

})