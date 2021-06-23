// 获取检查时间及日期
const { checkTime, checkDate } = require('../util/getdate');
//获取本周日期 周日为起始
let { weekDate, monthDate } = require('../util/weekAndMonthDate');
// 获取每天统计数据
const { getDayDate } = require('../controllers/getDayDate');

module.exports = async(req, res) => {
    let monthDataList = [];
    let getMonthDate = monthDate.map((ele) => {
        return getDayDate(ele);
    });
    let result = await Promise.all(getMonthDate);
    result.forEach((item) => {
        monthDataList.push(item);
    });
    res.send({
        monthDataList: monthDataList
    });
};