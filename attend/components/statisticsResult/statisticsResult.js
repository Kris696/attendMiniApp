// components/statisticsResult/statisticsResult.js
Component({
  
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
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

  }
})
