var express = require('express');
// 整合数据统计功能路由
var statistics = express.Router();

// 测试路由
statistics.get('/', function(req, res, next) {
    res.send('ok111');
});

// 获取实时点到结果
statistics.get('/now', require('../controllers/getNowData'));
// 获取今日点到结果
statistics.get('/today', require('../controllers/getTodayData'));
// 获取本周点到结果
statistics.get('/week', require('../controllers/getWeekData'));



module.exports = statistics;