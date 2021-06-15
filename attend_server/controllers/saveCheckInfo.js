const { sequelize, Classinfo, Checkinfo } = require('../model/db');

module.exports = (req, res) => {
    //获取页面返回信息
    let data = JSON.parse(req.body.checkInfoData);
    // console.log(data);
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
                    // check_id: ele.id,
                    id: ele.id
                }
            });
        })();
    });

    res.send('saveOK');
};