// 获取检查时间及日期
const { checkTime, checkDate } = require('../util/getdate');
//获取本周日期 周日为起始
let { weekDate, monthDate } = require('../util/weekAndMonthDate');
// 获取每天统计数据
const { getDayDate } = require('../controllers/getDayDate');

async function getWeekDate() {
    let checkMount = 0; //一周点到次数
    let noArriveNumMount = 0; //一周未到人次
    let leaveNumMount = 0; //一周请假人次
    let weekDataList = []; //每天点到次数
    let getWeekDate = weekDate.map((ele) => {
        return getDayDate(ele);
    });
    let result = await Promise.all(getWeekDate);
    result.forEach((item) => {
        weekDataList.push(item);
    });

    weekDataList.forEach((ele, index) => {
        checkMount += ele.totalNum;
        noArriveNumMount += ele.noArriveNum;
        leaveNumMount += ele.leaveNum;
    });

    return {
        weekDataList: weekDataList,
        checkMount: checkMount,
        noArriveNumMount: noArriveNumMount,
        leaveNumMount: leaveNumMount,
    };
};

module.exports = { getWeekDate };