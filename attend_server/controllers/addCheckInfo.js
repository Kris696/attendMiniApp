// 添加点到人员信息
const { sequelize, Classinfo, Checkinfo } = require('../db/db');
// 获取检查时间及日期
const { checkTime, checkDate } = require('../util/getdate');

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

    // 获取当日课程信息
    let classinfo = await Classinfo.findAll();

    // 没有当前当时的数据 或 数据不相等，才添加
    if (nowDateArr.length == 0) {

        // 添加信息
        classinfo.forEach(async(item, index) => {
            // 有课人员
            if (item.haveClass === 1) {
                console.log(item);
                // 添加点到人员信息
                await Checkinfo.create({
                    checkDate: checkDate,
                    checkTime: checkTime,
                    status: 1, //0：未到     1：已到     2：请假    4：不需参与点到
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