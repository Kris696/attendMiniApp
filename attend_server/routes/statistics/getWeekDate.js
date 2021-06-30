let { getWeekDate } = require('../../model/getWeekData');

module.exports = async(req, res) => {
    let { weekDataList, checkMount, noArriveNumMount, leaveNumMount } = await getWeekDate();
    res.send({
        weekDataList: weekDataList,
        checkMount: checkMount,
        noArriveNumMount: noArriveNumMount,
        leaveNumMount: leaveNumMount,
    });
};