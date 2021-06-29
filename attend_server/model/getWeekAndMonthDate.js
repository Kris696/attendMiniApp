//获取本周日期 周日为起始
let { weekDate, monthDate } = require('../util/weekAndMonthDate');

module.exports = async(req, res) => {
    res.send({
        weekDate: weekDate
    });
};