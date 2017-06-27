var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
  data: {
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://54.223.181.88/show/getacticle?id=4',
      success:function(res){
        var article = res.data.article;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    
  }
})