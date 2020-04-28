const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

//时间戳转换成日期时间


function date_time(val) {


  var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));


  //月份为0-11，所以+1，月份小于10时补个0
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;


  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();


  var theTime = date.getFullYear() + "-" + month + "-" + currentDate;

  return theTime;


}
module.exports = {


  date_time: date_time


}
