// 数据库模型
const { sequelize, Classinfo, Checkinfo } = require('../db/db');

async function getDayDate(date) {
    // 未到请假数据
    let dataList = [];
    // 点到次数
    let totalNum = 0;
    //都没有：0        早上点到：1       下午点到：2     都点到：3
    let checkTimes = 0;
    // 早上数据
    let morningDate = [];
    // 下午数据
    let afternoonDate = [];

    // 点到次数
    // 今天早上
    let morning = await Checkinfo.findOne({
        where: {
            checkDate: date,
            checkTime: 0
        }
    });

    // 今天下午
    let afternoon = await Checkinfo.findOne({
        where: {
            checkDate: date,
            checkTime: 1
        }
    });

    checkTimes = morning != null && afternoon != null ? 3 : morning == null && afternoon == null ? 0 : morning != null ? 1 : 2;
    totalNum = morning != null && afternoon != null ? 2 : morning == null && afternoon == null ? 0 : 1;

    // 未到人员 0
    let noArrivePerson = await Checkinfo.findAll({
        where: {
            checkDate: date,
            status: 0
        }
    });

    // 未到人数
    let noArriveNum = noArrivePerson.length;

    // 请假人员 2
    let leavePerson = await Checkinfo.findAll({
        where: {
            checkDate: date,
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

    // 如果上下午都有点到，再分别返回上下午数据
    if (checkTimes == 3) {
        // 早上未到人员 0
        let MorningNoArrivePerson = await Checkinfo.findAll({
            where: {
                checkDate: date,
                checkTime: 0,
                status: 0
            }
        });
        // 早上请假人员 2
        let MorningLeavePerson = await Checkinfo.findAll({
            where: {
                checkDate: date,
                checkTime: 0,
                status: 2
            }
        });

        // 添加早上未到数据至数组
        MorningNoArrivePerson.forEach((ele, index) => {
            let data = {
                teacherName: ele.teacherName,
                noArriveTimes: 1,
                leaveTimes: 0
            }
            morningDate.push(data);
        });

        // 添加早上请假数据至数组
        MorningLeavePerson.forEach((ele, index) => {
            let data = {
                teacherName: ele.teacherName,
                noArriveTimes: 0,
                leaveTimes: 1
            }
            morningDate.push(data);
        });

        // 下午未到人员 0
        let afternoonNoArrivePerson = await Checkinfo.findAll({
            where: {
                checkDate: date,
                checkTime: 1,
                status: 0
            }
        });
        // 下午请假人员 2
        let afternoonLeavePerson = await Checkinfo.findAll({
            where: {
                checkDate: date,
                checkTime: 1,
                status: 2
            }
        });

        // 添加下午未到数据至数组
        afternoonNoArrivePerson.forEach((ele, index) => {
            let data = {
                teacherName: ele.teacherName,
                noArriveTimes: 1,
                leaveTimes: 0
            }
            afternoonDate.push(data);
        });

        // 添加下午请假数据至数组
        afternoonLeavePerson.forEach((ele, index) => {
            let data = {
                teacherName: ele.teacherName,
                noArriveTimes: 0,
                leaveTimes: 1
            }
            afternoonDate.push(data);
        });

        dataList = [];
        // 整合早上下午的数据
        morningDate.forEach((ele, index) => {
            afternoonDate.forEach((item, i) => {
                // 相同元素
                if (ele.teacherName == item.teacherName) {
                    let date = {
                        teacherName: ele.teacherName,
                        noArriveTimes: ele.noArriveTimes + item.noArriveTimes,
                        leaveTimes: ele.leaveTimes + ele.leaveTimes
                    }
                    dataList.push(date);
                    return;
                }
            });
        });
        // 不同元素
        morningDate.forEach((ele, index) => {
            let len = 0;
            dataList.forEach((item, i) => {
                if (ele.teacherName != item.teacherName) {
                    len++;
                }
            });
            if (dataList.length == len) {
                dataList.push(ele);
            }
        });
        afternoonDate.forEach((ele, index) => {
            let len = 0;
            dataList.forEach((item, i) => {
                if (ele.teacherName != item.teacherName) {
                    len++;
                }
            });
            if (dataList.length == len) {
                dataList.push(ele);
            }
        });
    }

    return {
        dataList,
        noArriveNum,
        leaveNum,
        totalNum,
        checkTimes,
        morningDate,
        afternoonDate
    }
}

module.exports = {
    getDayDate
}