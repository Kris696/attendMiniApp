import request from './utils/request';

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
    //发送请求,解析页面数据
    this.addClassinfo();
    //发送请求,添加点到信息
    this.addCheckInfo();

  },

  //发送请求,解析页面数据
  addClassinfo:function(){
    request('/check/addClassinfo');
  },

  //发送请求,添加点到信息
  addCheckInfo:function(){
    request('/check/addCheckInfo');
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
