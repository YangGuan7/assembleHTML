function Calendar() {}

Calendar.prototype.getMonthDays = function (year, month) {
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var days = monthDays[month - 1];
  if (month == 2 && this.isLeapYear(year, month)) {
    days = 29;
  }
  return days;
};

Calendar.prototype.isLeapYear = function (year, month) {
  var isLeapYear = false;

  if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
    isLeapYear = true;
  }

  return isLeapYear;
};

//1=一、2=二....、7=日
Calendar.prototype.getWeek = function (year, month, day) {
  var date = new Date();
  date.setFullYear(year, month - 1, day);
  var day = date.getDay();
  if (day == 0) {
    day = 7;
  }
  return day;
};

Calendar.prototype.getDayTextArray = function (year, month) {
  var endDays = this.getMonthDays(year, month);
  var startEmpty = this.getWeek(year, month, 1) - 1;
  var endEmpty = 7 - this.getWeek(year, month, endDays);
  var days = [];
  var i = 1;
  for (i = 1; i <= startEmpty; i++) {
    days.push("&nbsp;");
  }
  for (i = 1; i <= endDays; i++) {
    days.push(i);
  }
  for (i = 1; i <= endEmpty; i++) {
    days.push("&nbsp;");
  }
  return days;
};

$(document).ready(function () {
  var objCalendar = new Calendar();
  var daysTextArr = objCalendar.getDayTextArray(2017, 8);
  var html = "";
  $("#calendar .days").empty();
  $.each(daysTextArr, function (key, value) {
    var objLi = $('<li class="day">' + value + "</li>");
    objLi.addClass("day-" + value);
    $("#calendar .days").append(objLi).append("\r\n");
  });
});
