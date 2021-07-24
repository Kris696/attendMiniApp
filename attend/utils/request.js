// 引入服务器配置信息
import config from './config';

// 发生ajax请求
export default (url,data={},method="GET")=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.mobileHost+url,
      data,
      method,
      header:{
        // cookie : wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item=> item.indexOf('MUSIC_U') !== -1):''
        'Content-Type': 'application/json'
      },
      success:(res)=>{
        console.log('请求成功'+res);
        //登录请求
        // if(data.isLogin){
        //   wx.setStorage({
        //     data: res.cookies,
        //     key: 'cookies',
        //   })
        // }
        resolve(res.data);
      },
      fail:(err)=>{
        console.log('请求失败'+err);
        reject(err);
      }
    });
  });
}