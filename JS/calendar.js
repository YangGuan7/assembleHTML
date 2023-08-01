
var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_name = [
  "January",
  "Febrary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Auguest",
  "September",
  "October",
  "November",
  "December",
];
var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar-title");
var cyear = document.getElementById("calendar-year");

var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();
//獲取某年某月第一天是星期幾
function dayStart(month, year) {
  var tmpDate = new Date(year, month, 1);
  return tmpDate.getDay();
}
//計算某年是不是閏年，通過求年份除以4的榆樹即可
function daysMonth(month, year) {
  var tmp = year % 4;
  if (tmp == 0) {
    return month_olympic[month];
  } else {
    return month_normal[month];
  }
}
function refreshDate(){
	var str = “”;
	var totalDay = daysMonth(my_month, my_year); //獲取該月總天數
	var firstDay = dayStart(my_month, my_year); //獲取該月第一天是星期幾
	var myclass;
	for(var i=1; i<firstDay; i++){ 
		str += “<li></li>”; //為起始日之前的日期創建空白節點
	}
	for(var i=1; i<=totalDay; i++){
		if((i<my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()) || my_year<my_date.getFullYear() || ( my_year==my_date.getFullYear() && my_month<my_date.getMonth())){ 
			myclass = “ class=‘lightgrey’”; //當該日期在今天之前時，以淺灰色字體顯示
		}else if (i==my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()){
			myclass = “ class=‘green greenbox’”; //當天日期以綠色背景突出顯示
		}else{
			myclass = “ class=‘darkgrey’”; //當該日期在今天之後時，以深灰字體顯示
		}
		str += “<li”+myclass+”>”+i+”</li>”; //創建日期節點
	}
	holder.innerHTML = str; //設置日期顯示
	ctitle.innerHTML = month_name[my_month]; //設置英文月份顯示
	cyear.innerHTML = my_year; //設置年份顯示
}
refreshDate(); //執行該函數

prev.onclick = function(e){
	e.preventDefault();
	my_month--;
	if(my_month<0){
		my_year--;
		my_month = 11;
	}
	refreshDate();
}
next.onclick = function(e){
	e.preventDefault();
	my_month++;
	if(my_month>11){
		my_year++;
		my_month = 0;
	}
	refreshDate();
}