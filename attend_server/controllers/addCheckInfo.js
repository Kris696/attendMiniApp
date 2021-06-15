// 添加点到人员信息
const { sequelize, Classinfo, Checkinfo } = require('../model/db');

//补0
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

let nowTime = new Date();
let year = nowTime.getFullYear();
let month = nowTime.getMonth() + 1;
let day = nowTime.getDate();
let hour = nowTime.getHours();

let checkTime = hour < 12 ? 0 : 1; //检查时间 0：上午  1：下午
let checkDate = [year, month, day].map(formatNumber).join('-');

let nowDateArr = [];

module.exports = async(req, res) => {
    // 同步模型
    // await Checkinfo.sync({ force: true });
    // 检查数据库中是否有当日当时数据
    nowDateArr = await Checkinfo.findAll({
        where: {
            checkDate: checkDate,
            checkTime: checkTime
        }
    });

    // 没有当前当时的数据，才添加
    if (nowDateArr.length == 0) {
        // 获取当日课程信息
        let classinfo = await Classinfo.findAll();
        // 添加信息
        classinfo.forEach(async(item, index) => {
            // 有课人员
            if (item.haveClass === 1) {
                // 添加点到人员信息
                await Checkinfo.create({
                    checkDate: checkDate,
                    checkTime: checkTime,
                    status: 1, //0：未到     1：已到     2：请假
                    check_id: item.id,
                    teacherName: item.teacherName,
                    icon: 'icon-check-circle-fill',
                    arrive: 'arrive',
                    notArrive: '',
                    leave: ''
                });
            }
        });
    }
    // console.log(checkinfo);
    // console.log('check');
    res.send('ok');
}