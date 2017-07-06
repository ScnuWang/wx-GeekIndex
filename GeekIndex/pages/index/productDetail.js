// pages/index/productDetail.js
var wxCharts = require('../../utils/wxcharts.js');
// 金额曲线
var lineChart = null;
// 支持人数曲线
var lineChartsupport = null;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:null,
    // 产品的竞争产品列表
    products:[],
    // 行业比较
    catetorytstat:null,
     // 时间
    time: [],
    // 已筹金额
    currentmoey: [],
    // 支持人数
    supportpeople: [],
    // 当日净增金额
    growthmoney: [],
    // 当日净增支持人数
    growthsupport: [],
    
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0, 
  },
  touchHandler: function (e) {
    // console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      background: '#7cb5ec'
    });
    lineChartsupport.showToolTip(e, {
      // background: '#7cb5ec'
    });
  },

  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.getSystemInfo({
      success: function (res) {
        page.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    }); 
    var productid = getApp().detailproductid;
    // console.log(productid)
    // 根据产品编号查询详情
    wx.request({
      url: 'https://weixin.geekview.cn/show/productdetail?pkId=' + productid,
      success:function(res){
          // console.log(res.data)
          page.setData({
            "product": res.data
          })
      }
    });
    // 根据产品编号查询竞争者产品列表以及行业比较
    wx.request({
      url: 'https://weixin.geekview.cn/show/getcompetitor?pkId=' + productid,
      success: function (res) {
        
        console.log(res.data.catetorytstat)
        
        page.setData({
          "products": res.data.products,
          "catetorytstat": res.data.catetorytstat
        })
      }
    });

    // 产品走势
    var time = [];
    var currentmoey = [];
    var supportpeople = [];
    var growthmoney = [];
    var growthsupport = [];
    wx.request({
      url: 'https://weixin.geekview.cn/show/productchange?pkId=' + productid,
      success: function (res) {
        // console.log(res.data.moneychange[1][0])
        var len = res.data.moneychange.length;
        for (var i = 0; i < len; i++) {
          time.push(res.data.moneychange[i][0]);
          currentmoey.push(res.data.moneychange[i][1]);
          supportpeople.push(res.data.supportchange[i][1]);
          growthmoney.push(res.data.moneygrowthchange[i][1]);
          growthsupport.push(res.data.supportgrowthchange[i][1]);
        }
        page.setData({
          "time": time,
          "currentmoey": currentmoey,
          "supportpeople": supportpeople,
          "growthmoney": growthmoney,
          "growthsupport": growthsupport
        });
        // console.log(time)
        if(len>0){
           page.show(time, currentmoey, supportpeople, growthmoney, growthsupport);
        }
      }
    });
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

  // 曲线走势图
  show: function (time, currentmoey, supportpeople, growthmoney, growthsupport) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: this.data.time,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '已筹金额',
        data: this.data.currentmoey,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }, {
        name: '净增额',
        data: this.data.growthmoney,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '众筹金额 (元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });

    lineChartsupport = new wxCharts({
      canvasId: 'suportchange',
      type: 'line',
      categories: this.data.time,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '总支持人数',
        data: this.data.supportpeople,
        format: function (val, name) {
          return val.toFixed(2) + '人';
        }
      }, {
        name: '当日支持人数',
        data: this.data.growthsupport,
        format: function (val, name) {
          return val.toFixed(2) + '人';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '支持人数 (人)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

})