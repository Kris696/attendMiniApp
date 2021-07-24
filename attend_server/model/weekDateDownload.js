// 写入本地excel表格

// excel依赖
const xlsx = require('node-xlsx');
// 文件依赖
const fs = require('fs');
// 数据库
const { sequelize, Classinfo, Checkinfo } = require('../db/db');
//获取本周日期 周日为起始
let { weekDate, monthDate } = require('../util/weekAndMonthDate');
// 获取本周点到数据
let { getWeekDate } = require('./getWeekData');

// ？未设置居中
// 初始化数据
let data = [];
// ==============================表头=========================================================
// 表头
let title1 = ['姓名', '星期日', '', '星期一', '', '星期二', '', '星期三', '', '星期四', '', '星期五', '', '星期六'];
let title2 = ['', '上午', '下午', '上午', '下午', '上午', '下午', '上午', '下午', '上午', '下午', '上午', '下午', '上午', '下午'];
// 合并表头单元格
let range0 = { s: { c: 0, r: 0 }, e: { c: 0, r: 1 } };
let range1 = { s: { c: 1, r: 0 }, e: { c: 2, r: 0 } };
let range2 = { s: { c: 3, r: 0 }, e: { c: 4, r: 0 } };
let range3 = { s: { c: 5, r: 0 }, e: { c: 6, r: 0 } };
let range4 = { s: { c: 7, r: 0 }, e: { c: 8, r: 0 } };
let range5 = { s: { c: 9, r: 0 }, e: { c: 10, r: 0 } };
let range6 = { s: { c: 11, r: 0 }, e: { c: 12, r: 0 } };
let range7 = { s: { c: 13, r: 0 }, e: { c: 14, r: 0 } };
// 配置 合并表头单元格
const options = {
    '!merges': [range0, range1, range2, range3, range4, range5, range6, range7],
};
// ==============================内容=========================================================
async function addContent() {
    // 添加表头
    data.push(title1);
    data.push(title2);
    // 添加姓名
    let { weekDataList, checkMount, noArriveNumMount, leaveNumMount } = await getWeekDate();
    let classinfo = await Classinfo.findAll();
    classinfo.forEach((ele, index) => {
        let info = ele.teacherName;
        data.push([info]);
    });
    // 添加点到数据  上午：2n+1  下午： (n+1)*2
    weekDataList.forEach((ele, index) => { //周几 
        if (ele.checkTimes == 1) { // 只上午
            // console.log('上午');
            if (ele.dataList.length != 0) { //有未到或请假
                for (let i = 2; i < data.length; i++) { //所有老师
                    for (let j = 0; j < ele.dataList.length; j++) { //迟到或未到的老师
                        if (data[i][0] == ele.dataList[j].teacherName) { //查找相同                    
                            if (ele.dataList[j].noArriveTimes == 1) { //未到
                                data[i][2 * index + 1] = '未到';
                                data[i][(index + 1) * 2] = '';
                                break;
                            } else if (ele.dataList[j].leaveTimes == 1) { //请假
                                data[i][2 * index + 1] = '请假';
                                data[i][(index + 1) * 2] = '';
                                break
                            }
                        } else { //没有相同
                            data[i][2 * index + 1] = '已到';
                            // 下午未检查 为空
                            data[i][(index + 1) * 2] = '';
                        }
                    }
                }
            } else {
                for (let i = 2; i < data.length; i++) {
                    data[i][2 * index + 1] = '已到';
                    data[i][(index + 1) * 2] = '已到';
                }
            }
        } else if (ele.checkTimes == 2) { // 只下午
            // console.log('下午');
            if (ele.dataList.length != 0) { //有未到或请假
                for (let i = 2; i < data.length; i++) { //所有老师
                    for (let j = 0; j < ele.dataList.length; j++) { //迟到或未到的老师
                        if (data[i][0] == ele.dataList[j].teacherName) { //查找相同                    
                            if (ele.dataList[j].noArriveTimes == 1) { //未到
                                data[i][2 * index + 1] = '';
                                data[i][(index + 1) * 2] = '未到';
                                break;
                            } else if (ele.dataList[j].leaveTimes == 1) { //请假
                                data[i][2 * index + 1] = '';
                                data[i][(index + 1) * 2] = '请假';
                                break
                            }
                        } else { //没有相同
                            // 上午未检查 为空
                            data[i][2 * index + 1] = '';
                            data[i][(index + 1) * 2] = '已到';
                        }
                    }
                }
            } else {
                for (let i = 2; i < data.length; i++) {
                    data[i][2 * index + 1] = '已到';
                    data[i][(index + 1) * 2] = '已到';
                }
            }
        } else if (ele.checkTimes == 3) { //都有
            // console.log('都有');
            // 上午
            if (ele.dataList.length != 0) { //有未到或请假
                for (let i = 2; i < data.length; i++) { //所有老师
                    for (let j = 0; j < ele.morningDate.length; j++) { //迟到或未到的老师
                        if (data[i][0] == ele.morningDate[j].teacherName) { //查找相同                    
                            if (ele.morningDate[j].noArriveTimes == 1) { //未到
                                data[i][2 * index + 1] = '未到';
                                break;
                            } else if (ele.dataList[j].leaveTimes == 1) { //请假
                                data[i][2 * index + 1] = '请假';
                                break
                            }
                        } else { //没有相同
                            data[i][2 * index + 1] = '已到';
                        }
                    }
                }
            } else { //全勤
                for (let i = 2; i < data.length; i++) {
                    data[i][2 * index + 1] = '已到';
                }
            }
            // 下午
            if (ele.dataList.length != 0) { //有未到或请假
                for (let i = 2; i < data.length; i++) { //所有老师
                    for (let j = 0; j < ele.afternoonDate.length; j++) { //迟到或未到的老师
                        if (data[i][0] == ele.afternoonDate[j].teacherName) { //查找相同                    
                            if (ele.afternoonDate[j].noArriveTimes == 1) { //未到
                                data[i][(index + 1) * 2] = '未到';
                                break;
                            } else if (ele.afternoonDate[j].leaveTimes == 1) { //请假
                                data[i][(index + 1) * 2] = '请假';
                                break
                            }
                        } else { //没有相同
                            // 上午未检查 为空
                            data[i][(index + 1) * 2] = '已到';
                        }
                    }
                }
            } else { //全勤
                for (let i = 2; i < data.length; i++) {
                    data[i][(index + 1) * 2] = '已到';
                }
            }
        } else if (ele.checkTimes == 0) { //没有点到
            // console.log('没有点到');
            for (let i = 2; i < data.length; i++) {
                data[i].push('');
                data[i].push('');
            }
        }
    });
    return data;
}

module.exports = (req, res) => {
    addContent().then((result) => {
        //删除原文件
        const path = './data.xlsx';
        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }
            //file removed
        });

        // 生成二进制数据流
        let buffer = xlsx.build([{ name: "本周点到数据", data: result }], options);
        // 写入文件
        fs.writeFile('./data.xlsx', buffer, (err) => {
            if (err) {
                console.log(err, 'excel文件保存出错');
            } else {
                console.log('写入excel成功');
            }
        });

        res.send(data);
        data = [];
    });

};