// 获取今天时间及日期
const { checkTime, checkDate } = require('../util/getdate');
// 获取每天统计数据
const { getDayDate } = require('../controllers/getDayDate');

module.exports = async(req, res) => {

    console.log(checkDate);

    let result = await getDayDate(checkDate);

    res.send({
        result: result
    });
};