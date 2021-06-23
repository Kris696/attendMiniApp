// 当前时间点到人员名单
// 页面解析模块
let curl = require("../util/curl");
let cheerio = require('cheerio');
// 数据库模块
let { sequelize, Classinfo, Checkinfo } = require('../db/db');

// 获取检查时间及日期
const { checkTime, checkDate, week } = require('../util/getdate');

module.exports = async(req, res) => {
    // 更新课程表模型，
    await Classinfo.sync({ alter: true });
    // 原表
    nowArr = await Classinfo.findAll();

    //  解析页面
    var url = "http://59.52.8.42:811/JSAP.asp";
    curl.download(url, async function(html) {
        if (html) {
            var $ = cheerio.load(html, { decodeEntities: false });
            // 课表
            let tabel = $("table[width='1003'][cellpadding='1']");
            // 上午或下午
            let trNum = checkTime == 0 ? 1 : 3;

            // 待完成：与原数组比较，id与教师姓名是否与数据库内容一致,如果不一致，更新教师名字
            // 如果人数有变动
            let flag = false;
            if (nowArr.length != $("a[href^='#NO']").length) {
                flag = true;
            }

            if (flag) { //如果人数有变(多或少)
                // let i = 
                // 添加课程数据至数据库
                // await Classinfo.create({
                //     id: id,
                //     teacherName: teacherName,
                //     haveClass: haveClass
                // });
            }

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

                (async() => {
                    // 添加课程数据至数据库
                    // await Classinfo.create({
                    //     id: id,
                    //     teacherName: teacherName,
                    //     haveClass: haveClass
                    // });
                    // 更新数据库数据
                    await Classinfo.update({
                        teacherName: teacherName,
                        haveClass: haveClass
                    }, {
                        where: {
                            id: id
                        }
                    });
                })();
            });
            // console.log("done");
        } else {
            console.log("解析失败");
        }
    });

    res.send('ok');

}