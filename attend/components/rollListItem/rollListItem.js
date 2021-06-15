// components/rollListItem/rollListItem.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkId:{
      type:Number,
      value:0
    },
    rollName:{
      type:String,
      value:'默认名'
    },
    icon:{
      type:String,
      value:'icon-check-circle-fill'
    },
    arrive:{
      type:String,
      value:'arrive'
    },
    notArrive:{
      type:String,
      value:''
    },
    leave:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //id:0,//被点击元素的id
  },

  //修改properties的值


  /**
   * 组件的方法列表
   */
  methods: {
    // 修改样式
    // 已到
    getArrive:function(event){
      // 获取id
      let id=event.currentTarget.dataset.id;
      // 获取本地存储
      let checkInfoData= wx.getStorageSync('checkinfo');
      // 遍历数组
      for (let i = 0; i < checkInfoData.length; i++) {
        if (checkInfoData[i].check_id==id) {
          checkInfoData[i].status=1;
          checkInfoData[i].icon='icon-check-circle-fill',
          checkInfoData[i].arrive='arrive';
          checkInfoData[i].notArrive='';
          checkInfoData[i].leave='';
        }
      }
      // 移除本地数据
      wx.removeStorageSync('checkinfo');
      // 将数据存储值本地
      wx.setStorageSync('checkinfo', checkInfoData);
    },
    // =======================================
    // 未到
    getNotArrive:function(event){
      // 获取id
      let id=event.currentTarget.dataset.id;
      // 获取本地存储
      let checkInfoData= wx.getStorageSync('checkinfo');
      // 遍历数组
      for (let i = 0; i < checkInfoData.length; i++) {
        if (checkInfoData[i].check_id==id) {
          checkInfoData[i].status=0;
          checkInfoData[i].icon='icon-chahao',
          checkInfoData[i].arrive='';
          checkInfoData[i].notArrive='notArrive';
          checkInfoData[i].leave='';
        }
      }
      // 移除本地数据
      wx.removeStorageSync('checkinfo');
      // 将数据存储值本地
      wx.setStorageSync('checkinfo', checkInfoData);
    },
    // =======================================
    // 请假
    getLeave:function(event){
      // 获取id
      let id=event.currentTarget.dataset.id;
      // 获取本地存储
      let checkInfoData= wx.getStorageSync('checkinfo');
      // 遍历数组
      for (let i = 0; i < checkInfoData.length; i++) {
        if (checkInfoData[i].check_id==id) {
          checkInfoData[i].status=2;
          checkInfoData[i].icon='icon-gantan',
          checkInfoData[i].arrive='';
          checkInfoData[i].notArrive='';
          checkInfoData[i].leave='leave';
        }
      }
      // 移除本地数据
      wx.removeStorageSync('checkinfo');
      // 将数据存储值本地
      wx.setStorageSync('checkinfo', checkInfoData);
    },
  }
})
