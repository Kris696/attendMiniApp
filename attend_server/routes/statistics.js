var express = require('express');
// 整合点到功能路由
var statistics = express.Router();


statistics.get('/', function(req, res, next) {
    res.send('ok111');
});

module.exports = statistics;