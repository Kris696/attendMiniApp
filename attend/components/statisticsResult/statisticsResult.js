// components/statisticsResult/statisticsResult.js
import request from '../../utils/request';

Component({
  options: {
    addGlobalClass: true
  },
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
    checkTimes:Number,//日结跳转设置
    weekPage:Number,
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
    checkTimes:0,
    tableTitle:'',
    isTitle:true,
    tableTitleList:['周日数据','周一数据','周二数据','周三数据','周四数据','周五数据','周六数据'],
    toopltipText:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //返回首页
    toIndexPage:function(event){
      wx.removeStorageSync('change');
      let url = event.currentTarget.dataset.url;
      wx.reLaunch({
        url: url
      });
    },
    // 获取当时统计数据
    getNowDate:async function(){
      let {dataList,noArriveNum,leaveNum}=await request('/statistics/now');
      this.setData({
        tableData:this.data.tableData,
        dataList,
        noArriveNum:'0'+noArriveNum,
        leaveNum:'0'+leaveNum
      });
    },
    // 获取今日统计数据
    getTodayDate:async function(){
        if(this.data.checkTimes==1 || this.data.checkTimes==2){//只上午或只下午
        let {result}=await request('/statistics/today');
        this.setData({
          dataList:result.dataList,
          noArriveNum:'0'+result.noArriveNum,
          leaveNum:'0'+result.leaveNum,
          totalNum:'0'+result.totalNum
        });
      }else{//两次点到
        if (wx.getStorageSync('change')=='') {
          let {result}=await request('/statistics/today');
          this.setData({
            dataList:result.morningDate,
            noArriveNum:'0'+result.noArriveNum,
            leaveNum:'0'+result.leaveNum,
            totalNum:'0'+result.totalNum,
            checkTimes:result.checkTimes,
            tableTitle:'上午数据',
          });
          wx.removeStorageSync('change');
        }else if(wx.getStorageSync('change')=='xw'){
          let {result}=await request('/statistics/today');
          this.setData({
            dataList:result.afternoonDate,
            noArriveNum:'0'+result.noArriveNum,
            leaveNum:'0'+result.leaveNum,
            totalNum:'0'+result.totalNum,
            checkTimes:result.checkTimes,
            tableTitle:'下午数据',
          });
        }else if(wx.getStorageSync('change')=='zong'){//总统计
          let {result}=await request('/statistics/today');
          this.setData({
            dataList:result.dataList,
            noArriveNum:'0'+result.noArriveNum,
            leaveNum:'0'+result.leaveNum,
            totalNum:'0'+result.totalNum,
            checkTimes:result.checkTimes,
            tableTitle:'总计',
          });
        }
      }
    },
    // 查看下午数据
    toAfternoon:function(){
      wx.setStorageSync('change', 'xw');
      wx.navigateTo({
        url: '/pages/daySta/daySta',
      });
    },
    // 查看今日总计数据
    toRes:function(){
      wx.setStorageSync('change', 'zong');
      wx.navigateTo({
        url: '/pages/daySta/daySta',
      });
    },
    //获取本周统计数据
    getWeekDate:async function(){
      let {weekDataList,checkMount,noArriveNumMount,leaveNumMount}=await request('/statistics/week');
      // 补0
      let totalNum=checkMount < 9 ? '0' + checkMount : checkMount;
      let noArriveNum=noArriveNumMount < 9 ? '0' + noArriveNumMount : noArriveNumMount;
      let leaveNum= leaveNumMount < 9 ? '0' + leaveNumMount : leaveNumMount;
      // 设置表头
      let tableColumns= [{
        title: "姓名",
        key: "teacherName",
      }, {
          title: "上午",
          key: "morning",
      }, {
          title: "下午",
          key: "afternoon",
      }];
      // 下一周功能函数
      if (this.properties.weekPage==0) {
        wx.setStorageSync('weekPage', this.properties.weekPage)
      }
      // 这天点到次数
      let checkTimes = weekDataList[this.data.weekPage].checkTimes;
      console.log(checkTimes);
      this.setData({
        checkTimes
      });
      let dataList=[];
      let noarrive='未到';
      let callSick='请假';
      let arr = weekDataList[this.data.weekPage].dataList;
      // 添加数据
      if (checkTimes!=0 ) {
        // 添加教师名字
        for (let i = 0; i < arr.length; i++) {
          let data =arr[i].teacherName;
          dataList.push({teacherName:data});
        }
        // 只有早上检查
        if (checkTimes==1) {
          console.log('xixixi');
          this.setData({
            toopltipText:'上午'
          });
          // 添加早上数据
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < dataList.length; j++) {
              if (arr[i].teacherName == dataList[j].teacherName) {
                if (arr[i].noArriveTimes==1) {
                  dataList[j].morning='未到';
                }else if (arr[i].leaveTimes==1) {
                  dataList[j].morning='请假'
                }
              }  
            }            
          }
        }else if (checkTimes==2) {
          console.log('hahahah');
          this.setData({
            toopltipText:'下午'
          });
          // 添加下午数据
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < dataList.length; j++) {
              if (arr[i].teacherName == dataList[j].teacherName) {
                if (arr[i].noArriveTimes==1) {
                  dataList[j].afternoon='未到'
                }else if (arr[i].leaveTimes==1) {
                  dataList[j].afternoon='请假'
                }
              }  
            }            
          }
        }else if (checkTimes==3) {
          console.log('lalalalal');
          //添加早上数据
          arr = weekDataList[this.data.weekPage].morningDate;
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < dataList.length; j++) {
              if (arr[i].teacherName == dataList[j].teacherName) {
                if (arr[i].noArriveTimes==1) {
                  dataList[j].morning='未到'
                }else if (arr[i].leaveTimes==1) {
                  dataList[j].morning='请假'
                }
              }  
            }            
          }
          // 添加下午数据
          arr = weekDataList[this.data.weekPage].afternoonDate;
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < dataList.length; j++) {
              if (arr[i].teacherName == dataList[j].teacherName) {
                if (arr[i].noArriveTimes==1) {
                  dataList[j].afternoon='未到'
                }else if (arr[i].leaveTimes==1) {
                  dataList[j].afternoon='请假'
                }
              }  
            }            
          }
        }
      }
      
      this.setData({
        dataList:dataList,
        noArriveNum,
        leaveNum,
        totalNum,
        checkTimes:checkTimes,
        tableTitle:this.data.tableTitleList[this.data.weekPage],
        tableColumns,
      });
    },
    // 查看下一周数据
    toNextWeekDate:function(){
      let weekPage = wx.getStorageSync('weekPage');
      if (weekPage<6) {
        weekPage+=2;
        wx.setStorageSync('weekPage', weekPage);
        wx.navigateTo({
          url: '/pages/weekSta/weekSta',
        });
      }
    },
    //查看日历数据
    getCalendarDate:async function() {
      // 隐藏标题
      this.setData({
        isTitle:false,
        tableData:this.data.tableData,
      });
      // 获取月结果
      let {monthDataList,checkMount,noArriveNumMount,leaveNumMount}=await request('/statistics/week');
      // 补0
      let totalNum=checkMount < 9 ? '0' + checkMount : checkMount;
      let noArriveNum=noArriveNumMount < 9 ? '0' + noArriveNumMount : noArriveNumMount;
      let leaveNum= leaveNumMount < 9 ? '0' + leaveNumMount : leaveNumMount;
      this.setData({
        // dataList:dataList,
        noArriveNum,
        leaveNum,
        totalNum,
        // checkTimes:checkTimes,
        tableTitle:'该日数据',
        // tableColumns,
      });
    },
    // 打印周结果
    printRes:async function () {
      // 生成excel表格
      request('/statistics/weekDateDownload').then((result)=>{
        wx.showLoading({
          title: '资源加载中...',
        });
        wx.downloadFile({
          // url: 'http://w4v0779438.wicp.vip/statistics/download',
          // url: 'http://localhost:3000/statistics/download',
          success:  (res)=> {
            const tempFilePath = res.tempFilePath;
            // 保存文件
            wx.saveFile({
              tempFilePath,
              success:  (res) =>{
                const savedFilePath = res.savedFilePath;
                wx.showToast({
                  title: '文件加载成功',
                  icon: '',     //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                  duration: 2000,      //停留时间
                });
                wx.redirectTo({
                  url: '/pages/index/index',
                });
                // 打开文件
                wx.openDocument({
                  filePath: savedFilePath,
                  success:  (res)=> {
                    console.log('openDocument');
                    console.log('打开文档成功');
                  },
                  err:(err)=>{
                    console.log('打开文档失败',err);
                  }
                });
              },
              fail:  (err)=> {
                console.log('保存失败：', err)
              }
            });
          },
          fail:  (err)=> {
            console.log('下载失败：', err);
          },
        });
      });
    },

  },
  // 组件生命周期
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      // console.log(this.data.tableData);
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
        case 'calendar'://日历
          this.getCalendarDate();
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
