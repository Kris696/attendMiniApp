// 数据库模型
const { sequelize, Classinfo, Checkinfo } = require('../db/db');

async function getDayDate(date) {
    // 未到请假数据
    let dataList = [];
    // 点到次数
    let totalNum = 0;
    //点到情况 都没有：0        早上点到：1       下午点到：2     都点到：3
    let checkTimes = 0;
    // 早上数据
    let morningDate = [];
    // 下午数据
    let afternoonDate = [];
    // 未到人数
    let noArriveNum = 0;
    // 请假人数
    let leaveNum = 0;
    // 未点到人员
    let noCheckPerson = [];

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

    // 点到情况
    checkTimes = morning != null && afternoon != null ? 3 : morning == null && afternoon == null ? 0 : morning != null ? 1 : 2;
    // 点到次数
    totalNum = morning != null && afternoon != null ? 2 : morning == null && afternoon == null ? 0 : 1;

    // 如果只有上午或下午点到
    if (checkTimes == 1 || checkTimes == 2) {
        // 未参与点到人员
        let todayPerson = await Checkinfo.findAll({
            where: {
                checkDate: date,
            }
        });

        let allPerson = await Classinfo.findAll();

        /* allPerson.forEach(item => {
            // console.log('111', item);
            if (!todayPerson.includes(item)) {
                noCheckPerson.push(item);
            }
        }); */

        // 过滤标识
        // let teaName = 

        // ==================================================

        // 未到人员 0
        let noArrivePerson = await Checkinfo.findAll({
            where: {
                checkDate: date,
                status: 0
            }
        });

        // 未到人数
        noArriveNum = noArrivePerson.length;

        // 请假人员 2
        let leavePerson = await Checkinfo.findAll({
            where: {
                checkDate: date,
                status: 2
            }
        });

        // 请假人数
        leaveNum = leavePerson.length;

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
    }

    // 如果上下午都有点到，再分别返回上下午数据
    if (checkTimes == 3) {
        // 未点到人员
        let allPerson = await Classinfo.findAll(); //所有老师

        //早上未点到人员数据
        let noMorCheckPerson = [];

        let todayMorPerson = await Checkinfo.findAll({ //早上点到人员数据
            where: {
                checkDate: date,
                checkTime: 0,
            }
        });

        // 添加早上未点到人员数据
        allPerson.forEach(item => {
            // console.log(item);
            if (!todayMorPerson.includes(item)) {
                noMorCheckPerson.push(item);
            }
        });

        //下午未点到人员数据
        let noAfternoonCheckPerson = [];

        let todayAfternoonPerson = await Checkinfo.findAll({ //下午点到人员数据
            where: {
                checkDate: date,
                checkTime: 1,
            }
        });

        // 添加下午未点到人员数据
        allPerson.forEach(item => {
            // console.log(item);
            if (!todayAfternoonPerson.includes(item)) {
                noAfternoonCheckPerson.push(item);
            }
        });

        noCheckPerson.push(noMorCheckPerson);
        noCheckPerson.push(noAfternoonCheckPerson);

        // ================================================================
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
        noCheckPerson,
        morningDate,
        afternoonDate
    }
}

module.exports = {
    getDayDate
}