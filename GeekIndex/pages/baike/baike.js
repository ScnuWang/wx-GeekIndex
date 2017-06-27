var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
var lineChart = null;
var lineChartsupport = null;
Page({
  data: {
    // 文章标题
    tittles:[],
  },
  onLoad: function (e) {
    var page  = this
    wx.request({
      url: 'http://54.223.181.88/show/getacticle',
      success: function (res) {
        console.log(res.data);
        page.setData({
          "tittles": res.data
        })
      }
    });
  },
  detailarticle(e){
    var id = e.currentTarget.id;
    app.detailacticleid = id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/baike/acticleDetail',
    })
  } 
});