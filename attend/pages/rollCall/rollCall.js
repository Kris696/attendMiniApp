// pages/rollCall/rollCall.js
var util=require('../../utils/util');
import request from '../../utils/request/';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkinfo:[],//今时今日点到信息
    page:1,//页数
    total:0,//总页数
    time:[],//时间
    morOrAfter:0,//上午或下午
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前时间
    let time = util.formatTime(new Date());
    let morOrAfter=time[1].substr(0,2);
    this.setData({
      time,
      morOrAfter
    });

    // request('/check/addClassinfo').then(()=>{
    //   request('/check/addCheckInfo').then(()=>{
    //     this.getCheckInfo();
    //   })
    // });

    //发送请求,解析页面数据
    this.addClassinfo();
    //发送请求,添加点到信息
    this.addCheckInfo();
    //发送请求,获取今时今日点到信息
    this.getCheckInfo();
  },
  //发送请求,解析页面数据
  addClassinfo:function(){
    request('/check/addClassinfo');
  },

  //发送请求,添加点到信息
  addCheckInfo:function(){
    request('/check/addCheckInfo');
  },

  //发送请求,获取今时今日点到信息
   getCheckInfo:async function(){
    // 请求
    let {checkinfo,page,total} = await request('/check/getCheckInfo',{page:this.data.page});
    // 将数据存储值本地
    wx.setStorageSync('checkinfo', checkinfo);
    this.setData({
      checkinfo,
      total
    });
    // console.log(checkinfo);
  },

  // 返回当前页数据至后台
  saveCheckInfo:function(){
    // 获取本地存储的值
    let checkInfoData= wx.getStorageSync('checkinfo');
    console.log(checkInfoData)
    checkInfoData=JSON.stringify(checkInfoData);
    // 调用接口
    request('/check/saveCheckInfo',{checkInfoData:checkInfoData},"POST");
  },

  // 上一页
  getPrePage:function(){
    if(this.data.page==1) return false;
    let page = this.data.page - 1 ;
    this.setData({
      page
    });
    // 返回当前页数据至后台
    this.saveCheckInfo();
    // 获取上一页数据
    this.getCheckInfo();
  },

  // 下一页
  getNextPage:function(){
    if(this.data.page==this.data.total) return false;
    let page = this.data.page + 1 ;
    this.setData({
      page
    });
    // 返回当前页数据至后台
    this.saveCheckInfo();
    // 获取下一页数据
    this.getCheckInfo();
  },

  // 跳转查看结果页面
  toResultPage:function(){
    // 返回当前页数据至后台
    this.saveCheckInfo();
    // 清除本地存储内容
    wx.removeStorageSync('checkinfo');
    // 跳转
    wx.navigateTo({
      url: '/pages/staResult/staResult',
    })
  },

  // 页面有修改
  reloadPage:function(){
    // 获取本地存储
    let checkInfoData= wx.getStorageSync('checkinfo');
    this.setData({
      checkinfo:checkInfoData
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