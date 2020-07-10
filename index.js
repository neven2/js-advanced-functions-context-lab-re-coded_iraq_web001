function createEmployeeRecord(emp){
  return {
    firstName: emp[0],
    familyName: emp[1],
    title: emp[2],
    payPerHour: emp[3],
    timeInEvents:[],
    timeOutEvents:[]
  }
}

function createTimeInEvent(dateStamp){
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type:"TimeIn",
    hour: parseInt(hour, 10),
    date
  });
  return this;
}
function createEmployeeRecords(empRows){
  return empRows.map(emp => createEmployeeRecord(emp))
}

function createTimeOutEvent(dateStamp){
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type:"TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return this;
}

function wagesEarnedOnDate(date){
  let pay = hoursWorkedOnDate.call(this, date) * this.payPerHour;
  return parseFloat(pay.toString())
}
function hoursWorkedOnDate(date){
  const timeIn = this.timeInEvents.find(event => event.date === date);
  const timeOut = this.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour)/100 ;
}


function findEmployeeByFirstName(arr, firstName){
  return arr.find(emp => emp.firstName === firstName);
}

function calculatePayroll(arr){
  return arr.reduce((memo, rec) => memo + allWagesFor.call(rec), 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}