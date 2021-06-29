var express = require('express');
// 整合数据统计功能路由
var statistics = express.Router();

// 测试路由
statistics.get('/', function(req, res, next) {
    res.send('ok111');
});

// 获取本周日期
statistics.get('/weekAndMonthDate', require('../model/getWeekAndMonthDate'));
// 获取实时点到结果
statistics.get('/now', require('../controllers/getNowData'));
// 获取今日点到结果
statistics.get('/today', require('../model/getTodayData'));
// 获取本周点到结果
statistics.get('/week', require('../model/getWeekData'));
// 获取本月点到结果
statistics.get('/month', require('../model/getMonthData'));
// 下载一周点到结果
statistics.get('/weekDateDownload', require('../model/weekDateDownload'));


module.exports = statistics;