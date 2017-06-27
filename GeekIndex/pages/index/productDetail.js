// pages/index/productDetail.js
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var lineChartsupport = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:null,
     // 时间
    time: [],
    // 已筹金额
    currentmoey: [],
    // 支持人数
    supportpeople: [],
    // 当日净增金额
    growthmoney: [],
    // 当日净增支持人数
    growthsupport: []
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    var productid = getApp().detailproductid;
    // console.log(productid)
    // 更加产品编号查询详情
    wx.request({
      url: 'http://54.223.181.88/show/productdetail?pkId=' + productid,
      success:function(res){
          console.log(res.data)
          page.setData({
            "product": res.data
          })
      }
    });

    var time = [];
    var currentmoey = [];
    var supportpeople = [];
    var growthmoney = [];
    var growthsupport = [];
    wx.request({
      url: 'http://54.223.181.88/show/productchange?pkId=' + productid,
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
        console.log(time);
        console.log(currentmoey);
        console.log(supportpeople);
        page.setData({
          "time": time,
          "currentmoey": currentmoey,
          "supportpeople": supportpeople,
          "growthmoney": growthmoney,
          "growthsupport": growthsupport
        });
        console.log(len)
        if(len>0){
           page.show(time, currentmoey, supportpeople, growthmoney, growthsupport);
        }
      }
    });
  },
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
  // 加载图表，不能直接在onload将数据复制给图表，不知道为啥
  // onReady: function (e) {
  //   console.log(this.data.time);
  //   console.log(this.data.currentmoey);
  //   console.log(this.data.supportpeople);
  //   var windowWidth = 320;
  //   try {
  //     var res = wx.getSystemInfoSync();
  //     windowWidth = res.windowWidth;
  //   } catch (e) {
  //     console.error('getSystemInfoSync failed!');
  //   }

  //   lineChart = new wxCharts({
  //     canvasId: 'lineCanvas',
  //     type: 'line',
  //     categories: this.data.time,
  //     animation: true,
  //     background: '#f5f5f5',
  //     series: [{
  //       name: '已筹金额',
  //       data: this.data.currentmoey,
  //       format: function (val, name) {
  //         return val.toFixed(2) + '元';
  //       }
  //     }, {
  //       name: '净增额',
  //       data: this.data.growthmoney,
  //       format: function (val, name) {
  //         return val.toFixed(2) + '元';
  //       }
  //     }],
  //     xAxis: {
  //       disableGrid: true
  //     },
  //     yAxis: {
  //       title: '众筹金额 (元)',
  //       format: function (val) {
  //         return val.toFixed(2);
  //       },
  //       min: 0
  //     },
  //     width: windowWidth,
  //     height: 200,
  //     dataLabel: false,
  //     dataPointShape: true,
  //     extra: {
  //       lineStyle: 'curve'
  //     }
  //   });

  //   lineChartsupport = new wxCharts({
  //     canvasId: 'suportchange',
  //     type: 'line',
  //     categories: this.data.time,
  //     animation: true,
  //     background: '#f5f5f5',
  //     series: [{
  //       name: '总支持人数',
  //       data: this.data.supportpeople,
  //       format: function (val, name) {
  //         return val.toFixed(2) + '人';
  //       }
  //     }, {
  //       name: '当日支持人数',
  //       data: this.data.growthsupport,
  //       format: function (val, name) {
  //         return val.toFixed(2) + '人';
  //       }
  //     }],
  //     xAxis: {
  //       disableGrid: true
  //     },
  //     yAxis: {
  //       title: '支持人数 (人)',
  //       format: function (val) {
  //         return val.toFixed(2);
  //       },
  //       min: 0
  //     },
  //     width: windowWidth,
  //     height: 200,
  //     dataLabel: false,
  //     dataPointShape: true,
  //     extra: {
  //       lineStyle: 'curve'
  //     }
  //   });
  // }

})