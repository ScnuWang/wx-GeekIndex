// pages/index/searchResult.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      products: getApp().serachresult
    })
  },
  detailproduct(e) {//跳转到产品详情页
    var id = e.currentTarget.id;
    app.detailproductid = id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/index/productDetail',
    })
  }
})