const { sequelize, Classinfo, Checkinfo } = require('../db/db');

module.exports = (req, res) => {
    //获取页面返回信息
    let data = JSON.parse(req.body.checkInfoData);
    // 将修改后数据更新至数据库
    data.forEach((ele, index) => {
        (async() => {
            await Checkinfo.update({
                status: ele.status,
                icon: ele.icon,
                arrive: ele.arrive,
                notArrive: ele.notArrive,
                leave: ele.leave
            }, {
                where: {
                    id: ele.id
                }
            });
        })();
    });

    res.send('ok');
};