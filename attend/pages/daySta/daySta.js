// pages/daySta/daySta.js
var util=require('../../utils/util');
import request from '../../utils/request';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',//显示时间
    isPrint:false,//是否显示打印按钮
    checkTimes:0,//跳转设置
    nextPage:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 设置时间
    var date=util.formatTime(new Date());
    this.setData({
      time : date[2]
    });
    // 获取页面跳转设置
    let {result}=await request('/statistics/today');
    this.setData({
      checkTimes:result.checkTimes
    });
    // 都有
    if(wx.getStorageSync('change')=='xw'){
      this.setData({
        nextPage:2
      });
    };
    // 总计
    if(wx.getStorageSync('change')=='zong'){
      this.setData({
        nextPage:3
      });
    };
  },

  //返回首页
  toIndexPage:function(){  
    wx.reLaunch({
      url: '/pages/statisticsIndex/statisticsIndex'
    })
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