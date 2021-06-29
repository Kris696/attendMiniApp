// pages/weekSta/weekSta.js
import request from '../../utils/request';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPrint:true,//是否显示打印按钮
    time:'',//显示时间
    weekPage:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTime();
  },

  // 获取本周日期
  getTime:async function(){
    let {weekDate} =await request('/statistics/weekAndMonthDate');
    let startTime = weekDate[0].split("-");
    let endTime = weekDate[weekDate.length - 1].split("-");
    let time = startTime[1]+'.'+startTime[2]+'-'+endTime[1]+'.'+endTime[2];
    this.setData({
      time
    });
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
    if (wx.getStorageSync('weekPage')) {
      let weekPage = wx.getStorageSync('weekPage');
      weekPage-=1;
      wx.setStorageSync('weekPage', weekPage);
      this.setData({
        weekPage:wx.getStorageSync('weekPage')
      });
    }
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