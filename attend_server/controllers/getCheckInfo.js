// 数据库信息
const { sequelize, Classinfo, Checkinfo } = require('../db/db');
// 获取检查时间及日期
const { checkTime, checkDate } = require('../util/getdate');

module.exports = async(req, res) => {
    // 标识，表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'getCheckInfo';
    // 接受客户端传递过来的当前页参数
    let page = req.query.page || 1;
    // 每一页显示几条数据
    let pageSize = 8;
    // 用户数据总数
    let countItem = await Checkinfo.findAll({
        where: {
            checkDate: checkDate,
            checkTime: checkTime
        }
    });
    let count = countItem.length;
    // 总页数
    let total = Math.ceil(count / pageSize);
    // 页码开始位置
    let start = (page - 1) * pageSize;

    // 返回今天 现时 需要点到的人员
    let checkinfo = await Checkinfo.findAll({
        where: {
            checkDate: checkDate,
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
        page: page,
        total: total
    });
}