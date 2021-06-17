const { sequelize, Classinfo, Checkinfo } = require('../model/db');
// 获取检查时间及日期
const { checkTime, checkDate } = require('../util/getdate');

module.exports = async(req, res) => {
    // 未到请假数据
    let dataList = [];
    // 点到次数
    let totalNum = 0;

    // 未到人员 0
    let noArrivePerson = await Checkinfo.findAll({
        where: {
            checkDate: checkDate,
            status: 0
        }
    });

    // 未到人数
    let noArriveNum = noArrivePerson.length;

    // 请假人员 2
    let leavePerson = await Checkinfo.findAll({
        where: {
            checkDate: checkDate,
            status: 2
        }
    });

    // 请假人数
    let leaveNum = leavePerson.length;

    // 添加未到数据至数组
    noArrivePerson.forEach((ele, index) => {
        let data = {
            teacherName: ele.teacherName,
            noArriveTimes: 1,
            leaveTimes: 0
        }
        dataList.push(data);
    });

    // 添加请假数据至数组
    leavePerson.forEach((ele, index) => {
        let data = {
            teacherName: ele.teacherName,
            noArriveTimes: 0,
            leaveTimes: 1
        }
        dataList.push(data);
    });

    // 点到次数
    // 今天早上
    let morning = await Checkinfo.findOne({
        where: {
            checkDate: checkDate,
            checkTime: 0
        }
    });
    // 今天下午
    let afternoon = await Checkinfo.findOne({
        where: {
            checkDate: checkDate,
            checkTime: 1
        }
    });

    totalNum = morning != null && afternoon != null ? 2 : morning == null && afternoon == null ? 0 : 1;

    // console.log(totalNum);

    res.send({
        dataList: dataList,
        noArriveNum: noArriveNum,
        leaveNum: leaveNum,
        totalNum: totalNum
    });
};