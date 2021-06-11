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
    indexItem:[{
      text:'点个小到',
      imgUrl:'/static/image/bg2.png'
    },{
      text:'结果统计',
      imgUrl:'/static/image/bg3.png'
    }],
    // statisticsItemText:['每日统计','本周统计','本月统计','个人结果统计'],
    statisticsItem:[
      {
        text:'每日统计',
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
    // 页面跳转方法
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
  }
})
