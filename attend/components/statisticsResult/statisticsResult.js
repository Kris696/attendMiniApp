// components/statisticsResult/statisticsResult.js
var util=require('../../utils/util');

Component({
  
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'点到结果'
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    time:'',//显示时间
    tableColumns: [{
      title: "姓名",
      key: "uname",
    }, {
        title: "未到次数",
        key: "noArriveTimes",
    }, {
        title: "请假次数",
        key: "leaveTimes",
    }],
    dataList: [{
      uname:'小明',
      noArriveTimes:1,
      leaveTimes:1
    },{
      uname:'小明',
      noArriveTimes:1,
      leaveTimes:1
    },{
      uname:'小明',
      noArriveTimes:1,
      leaveTimes:1
    },{
      uname:'小明',
      noArriveTimes:1,
      leaveTimes:1
    },{
      uname:'小明',
      noArriveTimes:1,
      leaveTimes:1
    },{
      uname:'小明',
      noArriveTimes:1,
      leaveTimes:1
    },{
      uname:'小明',
      noArriveTimes:1,
      leaveTimes:1
    },{
      uname:'小明',
      noArriveTimes:1,
      leaveTimes:1
    },{
      uname:'小明',
      noArriveTimes:1,
      leaveTimes:1
    },{
      uname:'小明',
      noArriveTimes:1,
      leaveTimes:1
    },],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  // 组件生命周期
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      // 设置时间
      var date=util.formatTime(new Date());
      this.setData({
        time:date[2]
      });

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
