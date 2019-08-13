var differentDays = function(inputDate1, inputDate2){
  var dateParts1 = inputDate1.split("/");
  var dateParts2 = inputDate2.split("/");

  var dateObject1 = new Date(+dateParts1[2], dateParts1[1] - 1, +dateParts1[0]);
  var dateObject2 = new Date(+dateParts2[2], dateParts2[1] - 1, +dateParts2[0]);

  var timeDiff = Math.abs(dateObject2.getTime() - dateObject1.getTime());
  return diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
}

differentDays("03/01/1989","03/08/1983");
