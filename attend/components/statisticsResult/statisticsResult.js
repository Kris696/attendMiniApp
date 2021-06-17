// components/statisticsResult/statisticsResult.js
import request from '../../utils/request';

Component({
  
  /**
   * 组件的属性列表
   */
  properties: {
    title:{//标题
      type:String,
      value:'点到结果'
    },
    time:String,//显示时间
    totalNum:String,//点到次数
    isPrint:Boolean,//是否显示打印按钮
    pageUrl:String,//跳转链接
    tableData:String,//表格类型数据
  },

  /**
   * 组件的初始数据
   */
  data: {
    //表头信息
    tableColumns: [{
      title: "姓名",
      key: "teacherName",
    }, {
        title: "未到次数",
        key: "noArriveTimes",
    }, {
        title: "请假次数",
        key: "leaveTimes",
    }],
    // 列表信息
    dataList: [],
    totalNum:'',//点到次数
    noArriveNum:'',//未到人次
    leaveNum:'',//请假人次
    time:'',//显示时间
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //返回首页
    toIndexPage:function(event){  
      let url = event.currentTarget.dataset.url;
      wx.reLaunch({
        url: url
      })
    },
    // 获取当时统计数据
    getNowDate:async function(){
      let {dataList,noArriveNum,leaveNum}=await request('/statistics/now');
      this.setData({
        dataList,
        noArriveNum:'0'+noArriveNum,
        leaveNum:'0'+leaveNum
      });
    },
    // 获取今日统计数据
    getTodayDate:async function(){
      let {dataList,noArriveNum,leaveNum,totalNum}=await request('/statistics/today');
      this.setData({
        dataList,
        noArriveNum:'0'+noArriveNum,
        leaveNum:'0'+leaveNum,
        totalNum:'0'+totalNum
      });
    },
    //获取本周统计数据
    getWeekDate:async function(){
      let {dataList,noArriveNum,leaveNum,totalNum}=await request('/statistics/week');
      this.setData({
        dataList,
        noArriveNum:'0'+noArriveNum,
        leaveNum:'0'+leaveNum,
        totalNum:'0'+totalNum
      });
    },
  },
  // 组件生命周期
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      // 获取列表数据
      switch (this.data.tableData) {
        case 'now'://本次
          this.getNowDate();
          break;
        case 'today'://今天
          this.getTodayDate();
          break;
        case 'week'://本周
          this.getWeekDate();
          break;
        case 'month'://本月
          this.getMonthDate();
          break;
        case 'person'://个人
          this.getPersonDate();
          break;
        default:
          break;
      };

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
