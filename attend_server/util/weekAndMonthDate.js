/**
 * 获取本周、本月的日期
 */

//格式化日期：yyyy-MM-dd 
function formatDate(date) { 
    var myyear = date.getFullYear(); 
    var mymonth = date.getMonth() + 1; 
    var myweekday = date.getDate(); 
    if (mymonth < 10) { 
        mymonth = "0" + mymonth; 
    } 
    if (myweekday < 10) { 
        myweekday = "0" + myweekday; 
    } 
    return (myyear + "-" + mymonth + "-" + myweekday); 
}

var now = new Date(); //当前日期 
var nowDayOfWeek = now.getDay(); //今天本周的第几天 
var nowDay = now.getDate(); //当前日 
var nowMonth = now.getMonth(); //当前月 
var nowYear = now.getYear(); //当前年 
nowYear += (nowYear < 2000) ? 1900 : 0;

//获得本周的开始日期  周日为起始日
function getWeekStartDate() { 
    // var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1); 
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); 
    return formatDate(weekStartDate); 
}

//获得本周的结束日期 
function getWeekEndDate() { 
    // var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek)); 
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)); 
    return formatDate(weekEndDate); 
}

//获得某月的天数 
function getMonthDays(myMonth) { 
    var monthStartDate = new Date(nowYear, myMonth, 1); 
    var monthEndDate = new Date(nowYear, myMonth + 1, 1); 
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24); 
    return days; 
} 

//获得本月的开始日期 
function getMonthStartDate() { 
    var monthStartDate = new Date(nowYear, nowMonth, 1); 
    return formatDate(monthStartDate); 
} 

//获得本月的结束日期 
function getMonthEndDate() { 
    var days = getMonthDays(nowMonth); //获取当月总共有多少天
    var monthEndDate = new Date(nowYear, nowMonth, days);  
    return formatDate(monthEndDate);  //返回当月结束时间
}

// 获取一周的日期
function getWeekDate() {
    // 存放一周日期
    let weekDate = [];
    // 本周开始日期
    let date = new Date(getWeekStartDate());
    // 加入第一天
    weekDate.push(formatDate(date));
    // 转换为时间戳
    let time = date.getTime();
    // 加入后六天
    for (let i = 0; i < 6; i++) {
        time = (time / 1000 + 86400) * 1000;
        let afterDate = new Date(time);
        weekDate.push(formatDate(afterDate));
    }
    return weekDate;
}

// 获取一月的日期
function getMonthDate() {
    // 装本月日期
    let monthDate = [];
    // 本月开始日期
    let date = new Date(getMonthStartDate());
    // 本月天数
    let day = getMonthDays(nowMonth);
    // 加入第一天
    monthDate.push(formatDate(date));
    // 转换为时间戳
    let time = date.getTime();
    // 加入后面天数
    for (let i = 0; i < day - 1; i++) {
        time = (time / 1000 + 86400) * 1000;
        let afterDate = new Date(time);
        monthDate.push(formatDate(afterDate));
    }
    return monthDate;
}

let weekDate = getWeekDate();
let monthDate = getMonthDate();

// console.log(weekDate, monthDate);

module.exports = {
    weekDate,
    monthDate
}