// 获取本周的日期
function makeDate() {
    var date = new Date();
    var month = date.getMonth();
    var week = date.getDay();
    var month = month + 1;
    var day = date.getDate();
    // week：周几，day：几号
    var weekArr = [{ week: '', day: '' }, { week: '', day: '' }, { week: '', day: '' }, { week: '', day: '' }, { week: '', day: '' }, { week: '', day: '' }, { week: '', day: '' }];
    // 本周内今天的前几天的数量
    var leftNum = week - 1;
    // 本周内今天的后几天的数量
    var rightNum = 7 - week;
    // 本周内今天的前几天
    for (var i = 0; i < leftNum; i++) {
        weekArr[i].week = week - (week - i) + 1;
        if (i == 0) {
            weekArr[i].day = day - week;
        } else {
            weekArr[i].day = day - (week - i) + 1;
        }
    }
    // 本周内今天的后几天
    for (var i = 0; i < rightNum; i++) {
        weekArr[i + week].week = week + i + 1;
        weekArr[i + week].day = day + i + 1;
    }
    // 今天
    weekArr[week - 1].week = week;
    weekArr[week - 1].day = day;

    return weekArr;
}

let data = makeDate();

// console.log(data);

module.exports = {
    data
}