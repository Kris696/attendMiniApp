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

module.exports = (req, res) => {
    // 标识，表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'getCheckInfo';
    // 接受客户端传递过来的当前页参数
    let page = req.query.page || 1;
    // 每一页显示几条数据
    let pageSize = 8;
    // 页码开始位置
    let start = (page - 1) * pageSize;

    (async() => {
        // 返回今天 现时 需要点到的人员
        let checkinfo = await Checkinfo.findAll({
            where: {
                checkDate: '2021-06-09',
                checkTime: checkTime
            },
            order: [
                ['check_id', 'asc']
            ],
            limit: pageSize,
            offset: start
        });
        // console.log(checkinfo);

        res.send({
            checkinfo: checkinfo,
            // page: page
        });
    })();
}