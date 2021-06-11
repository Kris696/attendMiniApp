// pages/rollCall/rollCall.js
var util=require('../../utils/util');
import request from '../../utils/request/';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkInfo:[],//今时今日点到信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前时间
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });

    //发送请求,获取今时今日点到信息
    this.getCheckInfo();
  },
  //发送请求,获取今时今日点到信息
  async getCheckInfo(){
    let checkInfo = await request('/check/addCheckInfo');
    this.setData({
      checkInfo
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