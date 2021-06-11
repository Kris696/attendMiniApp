var express = require('express');
var router = express.Router();
var dbConfig = require('../util/dbconfig');
var cheerio = require("cheerio");
var curl = require("../util/curl");

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });

    // 测试数据库连接


    // let sql = "select * from checkInfo";
    // let sqlArr = [];
    // let callBack = (err, data) => {
    //     if (err) {
    //         console.log('连接出错了');
    //     } else {
    //         console.log('数据库连接成功');
    //         // res.send({
    //         //     'list': data
    //         // });
    //     }
    // };

    // dbConfig.sqlConnect(sql, sqlArr, callBack);

    // 测试网页解析
    var url = "http://59.52.8.42:811/JSAP.asp";

    curl.download(url, function(html) {
        if (html) {
            var $ = cheerio.load(html, { decodeEntities: false });

            // let teacherName = $("a[href='#NO83']").text();

            res.send(teacherName);

            console.log("done");
        } else {
            console.log("error");
        }
    });
});

module.exports = router;