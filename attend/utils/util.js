const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  let todayDate=[year].map(formatNumber)+'年'+[month].map(formatNumber)+'月'+[day]+'日';
  let today=[year, month, day].map(formatNumber).join('.');
  let todayTime=[hour, minute, second].map(formatNumber).join(':');

  return [todayDate,todayTime,today];

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//补0
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
