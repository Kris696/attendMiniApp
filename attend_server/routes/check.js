var express = require('express');
// 整合点到功能路由
var check = express.Router();
// 测试修改仓库

check.get('/', require('../controllers/getCheckInfo'));

// 解析课程数据，存入数据库
check.get('/addClassinfo', require('../controllers/addClassinfo'));
// 更新点到人员信息
check.get('/addCheckInfo', require('../controllers/addCheckInfo'));
// 获取对应页面点到人员数据
check.get('/getCheckInfo', require('../controllers/getCheckInfo'));
// 保存数据
check.post('/saveCheckInfo', require('../controllers/saveCheckInfo'));


module.exports = check;