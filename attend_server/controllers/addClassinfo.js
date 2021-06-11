// 当前时间点到人员名单
// 页面解析模块
let curl = require("../util/curl");
let cheerio = require('cheerio');
// 数据库模块
let { sequelize, Classinfo, Checkinfo } = require('../model/db');

// 获取当前时间,上午,
let nowTime = new Date();
let hour = nowTime.getHours();
let week = nowTime.getDay();
let checkTime = hour < 12 ? 0 : 1; //检查时间 0：上午  1：下午

// 获取今日人员名单
// 添加至classinfo数据库
// 将有课人员名单添加至checkinfo表
// 返回checkinfo表数据

// await User.sync({ force: true });
// console.log("用户模型表刚刚(重新)创建！");

module.exports = (req, res) => {
    //  解析页面
    var url = "http://59.52.8.42:811/JSAP.asp";
    curl.download(url, async function(html) {

        if (html) {
            var $ = cheerio.load(html, { decodeEntities: false });
            // 课表
            let tabel = $("table[width='1003'][cellpadding='1']");
            // 上午或下午
            let trNum = checkTime == 0 ? 1 : 3;

            // ==当时课程数据========================================
            $("a[href^='#NO']").each((index, element) => {
                // 获取id
                let id = $(element).attr("href");
                // 取后两位
                id = id.substr(id.length - 2);
                // let id = 15;
                // 教师姓名id
                let teacherName = $(element).text();

                // console.log(id);
                // console.log(teacherName);
                // 该时间单元格内容长度
                let tdContent = 0;
                if (checkTime == 0) { //上午
                    tdContent = tabel.eq(id - 1).find("tr").eq(trNum).find("td").eq(week + 1).find("div").eq(0).find('p').length;
                } else { //下午
                    tdContent = tabel.eq(id - 1).find("tr").eq(trNum).find("td").eq(week).find("div").eq(0).find('p').length;
                }
                // console.log(tdContent);
                let haveClass = tdContent >= 3 ? 1 : 0; // 该时间该老师是否有课，  0：没课   1：有课

                // 添加课程数据至数据库
                (async() => {
                    await Classinfo.create({
                        id: id,
                        teacherName: teacherName,
                        haveClass: haveClass
                    });
                })();
            });

            console.log("done");
        } else {
            console.log("error");
        }
    });

    res.send('ok');

}