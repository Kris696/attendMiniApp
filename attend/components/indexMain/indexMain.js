// components/indexMainItem/indexMainItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    indexMainItemNum:{
      type: Number,
      value: 2
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 首页按钮
    indexItem:[{
      text:'点个小到',
      imgUrl:'/static/image/bg2.png'
    },{
      text:'结果统计',
      imgUrl:'/static/image/bg3.png'
    }],
    // 统计按钮
    statisticsItem:[
      {
        text:'今日统计',
        imgUrl:'/static/image/bg2.png'
      },{
        text:'本周统计',
        imgUrl:'/static/image/bg3.png'
      },{
        text:'本月统计',
        imgUrl:'/static/image/bg4.png'
      },{
        text:'个人结果统计',
        imgUrl:'/static/image/bg5.png'
      }
    ],

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 首页页面跳转方法
    changePage(event){
      if (event.currentTarget.dataset.index==0) {// 跳转至点到页面
        wx.navigateTo({
          url: '/pages/rollCall/rollCall',
        });
      }else{//跳转至结果统计页面
        wx.navigateTo({
          url: '/pages/statisticsIndex/statisticsIndex',
        });
      }
    },
    // 统计结果页页面跳转方法
    toResPage(event){
      let index= event.currentTarget.dataset.index;
      switch (index) {
        case 0:
          wx.navigateTo({
            url: '/pages/daySta/daySta',
          });
        break;
        case 1:
          wx.navigateTo({
            url: '/pages/weekSta/weekSta',
          });
        break;
        case 2:
          wx.navigateTo({
            url: '/pages/monthSta/monthSta',
          });
        break;
        case 3:
          wx.navigateTo({
            url: '/pages/personSta/personSta',
          });
        break;
        default:
          break;
      }
      

    },
  }
})
