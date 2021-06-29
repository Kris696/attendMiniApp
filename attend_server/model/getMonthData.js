// 获取检查时间及日期
const { checkTime, checkDate } = require('../util/getdate');
//获取本周日期 周日为起始
let { weekDate, monthDate } = require('../util/weekAndMonthDate');
// 获取每天统计数据
const { getDayDate } = require('../controllers/getDayDate');

module.exports = async(req, res) => {
    let checkMount = 0; //一月点到次数
    let noArriveNumMount = 0; //一月未到人次
    let leaveNumMount = 0; //一月请假人次
    let monthDataList = []; //一月的数据
    let getMonthDate = monthDate.map((ele) => {
        return getDayDate(ele);
    });
    let result = await Promise.all(getMonthDate);
    result.forEach((item) => {
        monthDataList.push(item);
    });

    monthDataList.forEach((ele, index) => {
        checkMount += ele.totalNum;
        noArriveNumMount += ele.noArriveNum;
        leaveNumMount += ele.leaveNum;
    });

    res.send({
        monthDataList: monthDataList,
        checkMount: checkMount,
        noArriveNumMount: noArriveNumMount,
        leaveNumMount: leaveNumMount,
    });
};