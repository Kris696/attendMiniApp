//补0
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

let nowTime = new Date();
let year = nowTime.getFullYear();
let month = nowTime.getMonth() + 1;
let day = nowTime.getDate();
let hour = nowTime.getHours();
let week = nowTime.getDay();

let checkTime = hour < 12 ? 0 : 1; //检查时间 0：上午  1：下午
let checkDate = [year, month, day].map(formatNumber).join('-');

module.exports = {
    checkTime,
    checkDate,
    week
}