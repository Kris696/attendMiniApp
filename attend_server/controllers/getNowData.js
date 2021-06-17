const { sequelize, Classinfo, Checkinfo } = require('../model/db');
// 获取检查时间及日期
const { checkTime, checkDate } = require('../util/getdate');

module.exports = async(req, res) => {
    let dataList = [];

    // 未到人员 0
    let noArrivePerson = await Checkinfo.findAll({
        where: {
            checkDate: checkDate,
            checkTime: checkTime,
            status: 0
        }
    });

    // 未到人数
    let noArriveNum = noArrivePerson.length;

    // 请假人员 2
    let leavePerson = await Checkinfo.findAll({
        where: {
            checkDate: checkDate,
            checkTime: checkTime,
            status: 2
        }
    });

    // 请假人数
    let leaveNum = leavePerson.length;

    noArrivePerson.forEach((ele, index) => {
        let data = {
            teacherName: ele.teacherName,
            noArriveTimes: 1,
            leaveTimes: 0
        }
        dataList.push(data);
    });

    leavePerson.forEach((ele, index) => {
        let data = {
            teacherName: ele.teacherName,
            noArriveTimes: 0,
            leaveTimes: 1
        }
        dataList.push(data);
    });

    res.send({
        dataList: dataList,
        noArriveNum: noArriveNum,
        leaveNum: leaveNum
    });
};