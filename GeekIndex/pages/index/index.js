//index.js
//获取应用实例
var app = getApp()
Page({
  //wxml文件通过{{name}}取出值：其中name的值要对应
  data: {
    productcount:0,
    inputVal: "",
    products: [],
    loadingHidden: true,
    modalHidden: true,
    tip: "",
    hotproducts:[]
  },
  bindKeyInput(event) {
    this.setData({ inputVal: event.detail.value });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.loaddata();
  },
  loaddata: function () {//已收录项目
    var page = this;
    wx.request({
      url: 'https://weixin.geekview.cn/show/wxsingledatas',
      success:function(res){
        // console.log(res.data.hotproducts)
         //这里不能直接使用this
        page.setData({
          "productcount": res.data.productcount,
          "hotproducts": res.data.hotproducts
        })
      }
    })
  },
  //跳转到产品详情页
  detailproduct(e) {
    var id = e.currentTarget.id;
    app.detailproductid = id;
    // console.log(id);
    wx.navigateTo({
      url: '/pages/index/productDetail',
    })
  },
  // 产品分类关键字查询
  search() {
    var page = this;
    var queryStr = page.data.inputVal;
    if (queryStr == "") {
      this.setData({ "tip": "输入内容不能为空" });
      this.setData({ "modalHidden": false });
    } else {
      page.setData({ loadingHidden: false });
      wx.request({
        url: "https://weixin.geekview.cn/show/searchproduct?keyword=" + queryStr,
        //data: { count: 50 },
        success: function (res) {
          // console.log(res.data)
          app.serachresult = res.data
          page.setData({
            "products" : res.data,
            "modalHidden" : true
          })
          wx.navigateTo({
            url: '/pages/index/searchResult'
          })
        }
      });
    }
  },
  modalChange() {
    this.setData({ "modalHidden": true });
  }
  
})