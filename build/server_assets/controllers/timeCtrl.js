'use strict';

//Any day formulas default deadline to last business day
//Specific day formulas allow for full range of user selection

//We need to pass an "instance" argument to accomodate situations where the user may want this task to trigger in within current time period

var mongoose = require('mongoose');
var moment = require('moment');
var daysToDeadline = 7;
var deadlineHour = 17;
//How can set this globally to here? Just putting in an array for now...... this needs to be translated to and array of numbers [0-7] where 0 === Sunday
var businessDays = [0, 1, 2, 3, 4, 5, 6, 7];

var allowedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var allowedFrequencies = ["Triggered", "Scheduled"];
var allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Monthly', 'Quarterly', 'Annually'];
var allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before end"];
var allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
var allowedSemiMonthlyIntervals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th"];
var allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any"];

module.exports = {

  now: function now() {
    return moment()._d;
  },
  nextDay: function nextDay() {
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).add(1, 'days')._d;
  },

  dayOfWeek: function dayOfWeek() {
    return moment().day();
  },

  thisMonth: function thisMonth() {
    return moment().month();
  },

  thisQuarter: function thisQuarter() {
    return moment().quarter();
  },

  thisYear: function thisYear() {
    return moment().year();
  },

  nextMonth: function nextMonth() {
    return moment().month() + 1;
  },

  deadlineToday: function deadlineToday() {
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
  },

  triggeredProjectDeadline: function triggeredProjectDeadline() {
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).add(daysToDeadline, 'days')._d;
  },

  dateDeadline: function dateDeadline(date) {
    return moment(date).hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
  },

  weeklyAnyDay: function weeklyAnyDay(instance) {
    //This looks to last business day of week in company settings and puts deadline at the deadline hour of that day each week
    var lastDay = businessDays.sort().reverse()[0];
    var naturalInstance = moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(lastDay)._d;
    var nextInstance = moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(lastDay + 7)._d;

    if (moment().isAfter(naturalInstance) === true) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  weeklySpecificDay: function weeklySpecificDay(selectedDay, instance) {
    var naturalInstance = moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(selectedDay)._d;
    var nextInstance = moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(selectedDay + 7)._d;

    if (moment().isAfter(naturalInstance) === true) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  biWeeklyAnyDay: function biWeeklyAnyDay(instance) {
    var lastDay = businessDays.sort().reverse()[0];
    var naturalInstance = moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(lastDay)._d;
    var nextInstance = moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(lastDay + 14)._d;
    if (moment().isAfter(naturalInstance) === true) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  biWeeklySpecificDay: function biWeeklySpecificDay(selectedDay, instance) {
    var naturalInstance = moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(selectedDay)._d;
    var nextInstance = moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(selectedDay + 14)._d;
    if (moment().isAfter(naturalInstance) === true) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  monthlyFirstDay: function monthlyFirstDay() {
    var nextMonth = moment().month() + 1;
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).month(nextMonth).date(1)._d;
  },

  monthlyLastDay: function monthlyLastDay(instance) {
    if (instance === "first") {
      return moment().endOf("month").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    } else {
      var nextMonth = moment().month() + 1;
      return moment().month(nextMonth).endOf("month").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    }
  },

  monthlyAnyDay: function monthlyAnyDay(instance) {
    //defaults deadline to the last day of the month same function as monthlyLastDay.... we could do last business day as a strech
    var nextMonth = moment().month() + 1;
    if (instance === "first") {
      return moment().endOf("month").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    } else {
      return moment().month(nextMonth).endOf("month").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    }
  },

  monthlyDaysFromStart: function monthlyDaysFromStart(numDays, instance) {
    var nextMonth = moment().month() + 1;
    var naturalInstance = moment().startOf('month').hours(deadlineHour).minute(0).second(0).millisecond(0).add(numDays - 1, 'days')._d;
    var nextInstance = moment().month(nextMonth).startOf('month').hours(deadlineHour).minute(0).second(0).millisecond(0).add(numDays - 1, 'days')._d;

    if (moment().isAfter(naturalInstance)) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  monthlyDaysBeforeEnd: function monthlyDaysBeforeEnd(numDaysBefore, instance) {
    var nextMonth = moment().month() + 1;
    var naturalInstance = moment().endOf("month").subtract(numDaysBefore, "days").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    var nextInstance = moment().month(nextMonth).endOf("month").subtract(numDaysBefore, "days").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;

    if (moment().isAfter(naturalInstance)) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  quarterlyFirstDay: function quarterlyFirstDay() {
    var nextQuarter = moment().quarter() + 1;
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).quarter(nextQuarter).date(1)._d;
  },

  quarterlyLastDay: function quarterlyLastDay(instance) {
    var nextQuarter = moment().quarter() + 1;
    var naturalInstance = moment().endOf("quarter").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    var nextInstance = moment().quarter(nextQuarter).endOf("quarter").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;

    if (moment().isAfter(naturalInstance)) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  quarterlyAnyDay: function quarterlyAnyDay(instance) {
    var nextQuarter = moment().quarter() + 1;
    var naturalInstance = moment().endOf("quarter").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    var nextInstance = moment().quarter(nextQuarter).endOf("quarter").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    if (moment().isAfter(naturalInstance)) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  quarterlyDaysFromStart: function quarterlyDaysFromStart(numDays, instance) {
    var nextQuarter = moment().quarter() + 1;
    var naturalInstance = moment().startOf('quarter').hours(0).seconds(0).millisecond(0).add(numDays, 'days')._d;
    var nextInstance = moment().quarter(nextQuarter).date(1).hours(0).seconds(0).millisecond(0).add(numDays, 'days')._d;

    if (moment().isAfter(naturalInstance) === true) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  quarterlyDaysBeforeEnd: function quarterlyDaysBeforeEnd(numDaysBefore, instance) {
    var nextQuarter = moment().quarter() + 1;
    var naturalInstance = moment().endOf("quarter").subtract(numDaysBefore, "days").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    var nextInstance = moment().quarter(nextQuarter).endOf("quarter").subtract(numDaysBefore, "days").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    if (moment().isAfter(naturalInstance) === true) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  annuallyFirstDay: function annuallyFirstDay(instance) {
    var nextYear = moment().year() + 1;
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).year(nextYear).date(1)._d;
  },

  annuallyLastDay: function annuallyLastDay(instance) {
    if (instance === "first") {
      return moment().endOf("year").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    } else {
      var nextYear = moment().year() + 1;
      return moment().year(nextYear).endOf("year").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    }
  },

  annuallyAnyDay: function annuallyAnyDay(instance) {
    var nextYear = moment().year() + 1;
    var naturalInstance = moment().endOf("year").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    var nextInstance = moment().year(nextYear).endOf("year").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;

    if (moment().isAfter(naturalInstance) === true) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  annuallyDaysFromStart: function annuallyDaysFromStart(numDays, instance) {
    var nextYear = moment().year() + 1;
    var naturalInstance = moment().startOf('year').hours(0).seconds(0).millisecond(0).add(numDays, 'days')._d;
    var nextInstance = moment().year(nextYear).startOf('year').hours(0).seconds(0).millisecond(0).add(numDays, 'days')._d;

    if (moment().isAfter(naturalInstance) === true) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  annuallyDaysBeforeEnd: function annuallyDaysBeforeEnd(numDaysBefore, instance) {
    var nextYear = moment().year() + 1;
    var naturalInstance = moment().endOf("year").subtract(numDaysBefore, "days").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    var nextInstance = moment().year(nextYear).endOf("year").subtract(numDaysBefore, "days").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;

    if (moment().isAfter(naturalInstance) === true) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  annuallyParticularMonth: function annuallyParticularMonth(selectedMonth, instance) {
    console.log("#12 - Made it to annuallyParticularMonth");
    console.log("MONTH", selectedMonth);
    var nextYear = moment().year() + 1;
    var naturalInstance = moment().month(selectedMonth).endOf("month").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    var nextInstance = moment().year(nextYear).month(selectedMonth).endOf("month").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;

    if (moment().isAfter(naturalInstance) === true) {
      console.log('!!!!!!');
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      console.log('??????');
      return nextInstance;
    }
  },

  annuallyParticularQuarter: function annuallyParticularQuarter(selectedQuarter, instance) {
    var nextYear = moment().year() + 1;
    var naturalInstance = moment().quarter(selectedQuarter).endOf("quarter").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;
    var nextInstance = moment().year(nextYear).quarter(selectedQuarter).endOf("quarter").hours(deadlineHour).minute(0).second(0).millisecond(0)._d;

    if (moment().isAfter(naturalInstance) === true) {
      return nextInstance;
    } else if (instance === "first") {
      return naturalInstance;
    } else {
      return nextInstance;
    }
  },

  semiMonthlyFirstCycle: function semiMonthlyFirstCycle(selectedDate) {
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).date(selectedDate)._d;
  },

  semiMothlySecondCycle: function semiMothlySecondCycle(firstCycleDate) {
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).date(firstCycleDate + 15)._d;
  },

  nextBusinessDay: function nextBusinessDay() {
    var isIn = function isIn(increaseDays) {
      //Sets a number for day of the week...Sunday = 0, Monday = 1 etc.
      var today = moment().day();
      var nextBD = today + increaseDays;
      var flag = false;
      for (var i = 1; i < 6; i++) {
        if (i === nextBD) {
          flag = true;
        }
      }
      return flag;
    };
    if (isIn(1) === true) {
      return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).add(1, 'days')._d;
    }
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).add(1, "weeks").startOf('isoWeek')._d;
  }

};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvdGltZUN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBLElBQU0sV0FBVyxRQUFRLFVBQVIsQ0FBWDtBQUNOLElBQU0sU0FBUyxRQUFRLFFBQVIsQ0FBVDtBQUNOLElBQU0saUJBQWlCLENBQWpCO0FBQ04sSUFBTSxlQUFlLEVBQWY7O0FBRU4sSUFBTSxlQUFlLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FBZjs7QUFFTixJQUFNLGNBQWMsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixTQUFyQixFQUFnQyxXQUFoQyxFQUE2QyxVQUE3QyxFQUF5RCxRQUF6RCxFQUFtRSxVQUFuRSxDQUFkO0FBQ04sSUFBTSxxQkFBcUIsQ0FBQyxXQUFELEVBQWMsV0FBZCxDQUFyQjtBQUNOLElBQU0sdUJBQXVCLENBQUMsT0FBRCxFQUFVLHFCQUFWLEVBQWlDLFFBQWpDLEVBQTJDLFdBQTNDLEVBQXdELFNBQXhELEVBQW1FLGNBQW5FLEVBQW1GLFdBQW5GLEVBQWdHLFVBQWhHLENBQXZCO0FBQ04sSUFBTSwwQkFBMEIsQ0FBQyxTQUFELEVBQVksVUFBWixFQUF3QixPQUF4QixFQUFpQyxPQUFqQyxFQUEwQyxLQUExQyxFQUFpRCxNQUFqRCxFQUF5RCxNQUF6RCxFQUFpRSxRQUFqRSxFQUEyRSxXQUEzRSxFQUF3RixTQUF4RixFQUFtRyxVQUFuRyxFQUErRyxVQUEvRyxDQUExQjtBQUNOLElBQU0sMkJBQTJCLENBQUMsdUJBQUQsRUFBMEIsc0JBQTFCLEVBQWtELHFCQUFsRCxFQUF5RSx1QkFBekUsRUFBa0cseUJBQWxHLEVBQTZILHNCQUE3SCxFQUFxSixzQkFBckosQ0FBM0I7QUFDTixJQUFNLHlCQUF5QixDQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLFdBQXRCLEVBQW1DLFVBQW5D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QUF2RSxFQUFnRixPQUFoRixDQUF3RixTQUF4RixFQUFtRyxFQUFuRyxDQWhCa0I7R0FBWjs7Q0FyVGpCIiwiZmlsZSI6InNlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvdGltZUN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0FueSBkYXkgZm9ybXVsYXMgZGVmYXVsdCBkZWFkbGluZSB0byBsYXN0IGJ1c2luZXNzIGRheVxyXG4vL1NwZWNpZmljIGRheSBmb3JtdWxhcyBhbGxvdyBmb3IgZnVsbCByYW5nZSBvZiB1c2VyIHNlbGVjdGlvblxyXG5cclxuLy9XZSBuZWVkIHRvIHBhc3MgYW4gXCJpbnN0YW5jZVwiIGFyZ3VtZW50IHRvIGFjY29tb2RhdGUgc2l0dWF0aW9ucyB3aGVyZSB0aGUgdXNlciBtYXkgd2FudCB0aGlzIHRhc2sgdG8gdHJpZ2dlciBpbiB3aXRoaW4gY3VycmVudCB0aW1lIHBlcmlvZFxyXG5cclxuY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG5jb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcclxuY29uc3QgZGF5c1RvRGVhZGxpbmUgPSA3O1xyXG5jb25zdCBkZWFkbGluZUhvdXIgPSAxNztcclxuLy9Ib3cgY2FuIHNldCB0aGlzIGdsb2JhbGx5IHRvIGhlcmU/IEp1c3QgcHV0dGluZyBpbiBhbiBhcnJheSBmb3Igbm93Li4uLi4uIHRoaXMgbmVlZHMgdG8gYmUgdHJhbnNsYXRlZCB0byBhbmQgYXJyYXkgb2YgbnVtYmVycyBbMC03XSB3aGVyZSAwID09PSBTdW5kYXlcclxuY29uc3QgYnVzaW5lc3NEYXlzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddO1xyXG5cclxuY29uc3QgYWxsb3dlZERheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XHJcbmNvbnN0IGFsbG93ZWRGcmVxdWVuY2llcyA9IFtcIlRyaWdnZXJlZFwiLCBcIlNjaGVkdWxlZFwiXTtcclxuY29uc3QgYWxsb3dlZEludGVydmFsVHlwZXMgPSBbJ0RhaWx5JywgJ0RhaWx5IEJ1c2luZXNzIERheXMnLCAnV2Vla2x5JywgJ0JpLVdlZWtseScsICdNb250aGx5JywgJ1NlbWktTW9udGhseScsICdRdWFydGVybHknLCAnQW5udWFsbHknXTtcclxuY29uc3QgYWxsb3dlZE1vbnRobHlJbnRlcnZhbHMgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcclxuY29uc3QgYWxsb3dlZEFubnVhbGx5SW50ZXJ2YWxzID0gW1wiRmlyc3QgRGF5IG9mIHRoZSBZZWFyXCIsIFwiTGFzdCBEYXkgb2YgdGhlIFllYXJcIiwgXCJBbnkgRGF5IG9mIHRoZSB5ZWFyXCIsIFwiSW4gYSBQYXJ0aWN1bGFyIE1vbnRoXCIsIFwiSW4gYSBQYXJ0aWN1bGFyIFF1YXJ0ZXJcIiwgXCIjIG9mIERheXMgRnJvbSBTdGFydFwiLCBcIiMgb2YgRGF5cyBCZWZvcmUgZW5kXCJdO1xyXG5jb25zdCBhbGxvd2VkV2Vla2x5SW50ZXJ2YWxzID0gWydNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5JywgJ1N1bmRheScsICdBbnknXTtcclxuY29uc3QgYWxsb3dlZFNlbWlNb250aGx5SW50ZXJ2YWxzID0gW1wiMXN0XCIsIFwiMm5kXCIsIFwiM3JkXCIsIFwiNHRoXCIsIFwiNXRoXCIsIFwiNnRoXCIsIFwiN3RoXCIsIFwiOHRoXCIsIFwiOXRoXCIsIFwiMTB0aFwiLCBcIjExdGhcIiwgXCIxMnRoXCIsIFwiMTN0aFwiLCBcIjE0dGhcIiwgXCIxNXRoXCJdO1xyXG5jb25zdCBhbGxvd2VkUXVhcnRlcmx5SW50ZXJ2YWxzID0gW1wiRmlyc3QgRGF5IG9mIHRoZSBRdWFydGVyXCIsIFwiTGFzdCBEYXkgb2YgdGhlIFF1YXJ0ZXJcIiwgXCIjIERheXMgZnJvbSBTdGFydFwiLCBcIiMgRGF5cyBmcm9tIEVuZFwiLCBcIkFueVwiXTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgbm93OiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBtb21lbnQoKS5fZDtcclxuICB9LFxyXG4gICAgbmV4dERheTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG1vbWVudCgpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5hZGQoMSwgJ2RheXMnKS5fZDtcclxuICAgIH0sXHJcblxyXG4gIGRheU9mV2VlazogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbW9tZW50KCkuZGF5KCk7XHJcbiAgfSxcclxuXHJcbiAgdGhpc01vbnRoOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBtb21lbnQoKS5tb250aCgpO1xyXG4gIH0sXHJcblxyXG4gIHRoaXNRdWFydGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBtb21lbnQoKS5xdWFydGVyKCk7XHJcbiAgfSxcclxuXHJcbiAgdGhpc1llYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG1vbWVudCgpLnllYXIoKTtcclxuICB9LFxyXG5cclxuICBuZXh0TW9udGg6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG1vbWVudCgpLm1vbnRoKCkgKyAxO1xyXG4gIH0sXHJcblxyXG4gIGRlYWRsaW5lVG9kYXk6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG1vbWVudCgpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5fZDtcclxuICB9LFxyXG5cclxuICB0cmlnZ2VyZWRQcm9qZWN0RGVhZGxpbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG1vbWVudCgpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5hZGQoZGF5c1RvRGVhZGxpbmUsICdkYXlzJykuX2Q7XHJcbiAgfSxcclxuXHJcbiAgZGF0ZURlYWRsaW5lOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICByZXR1cm4gbW9tZW50KGRhdGUpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5fZDtcclxuICB9LFxyXG5cclxuXHJcblxyXG4gIHdlZWtseUFueURheTogZnVuY3Rpb24oaW5zdGFuY2UpIHtcclxuICAgIC8vVGhpcyBsb29rcyB0byBsYXN0IGJ1c2luZXNzIGRheSBvZiB3ZWVrIGluIGNvbXBhbnkgc2V0dGluZ3MgYW5kIHB1dHMgZGVhZGxpbmUgYXQgdGhlIGRlYWRsaW5lIGhvdXIgb2YgdGhhdCBkYXkgZWFjaCB3ZWVrXHJcbiAgICBjb25zdCBsYXN0RGF5ID0gYnVzaW5lc3NEYXlzLnNvcnQoKS5yZXZlcnNlKClbMF07XHJcbiAgICBjb25zdCBuYXR1cmFsSW5zdGFuY2UgPSBtb21lbnQoKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuZGF5KGxhc3REYXkpLl9kO1xyXG4gICAgY29uc3QgbmV4dEluc3RhbmNlID0gbW9tZW50KCkuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLmRheShsYXN0RGF5ICsgNykuX2Q7XHJcblxyXG4gICAgaWYgKG1vbWVudCgpLmlzQWZ0ZXIobmF0dXJhbEluc3RhbmNlKSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gbmV4dEluc3RhbmNlO1xyXG4gICAgfSBlbHNlIGlmIChpbnN0YW5jZSA9PT0gXCJmaXJzdFwiKSB7XHJcbiAgICAgIHJldHVybiBuYXR1cmFsSW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV4dEluc3RhbmNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHdlZWtseVNwZWNpZmljRGF5OiBmdW5jdGlvbihzZWxlY3RlZERheSwgaW5zdGFuY2UpIHtcclxuICAgIGNvbnN0IG5hdHVyYWxJbnN0YW5jZSA9IG1vbWVudCgpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5kYXkoc2VsZWN0ZWREYXkpLl9kO1xyXG4gICAgY29uc3QgbmV4dEluc3RhbmNlID0gbW9tZW50KCkuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLmRheShzZWxlY3RlZERheSArIDcpLl9kO1xyXG5cclxuICAgIGlmIChtb21lbnQoKS5pc0FmdGVyKG5hdHVyYWxJbnN0YW5jZSkgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIG5leHRJbnN0YW5jZTtcclxuICAgIH0gZWxzZSBpZiAoaW5zdGFuY2UgPT09IFwiZmlyc3RcIikge1xyXG4gICAgICByZXR1cm4gbmF0dXJhbEluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5leHRJbnN0YW5jZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBiaVdlZWtseUFueURheTogZnVuY3Rpb24oaW5zdGFuY2UpIHtcclxuICAgIGNvbnN0IGxhc3REYXkgPSBidXNpbmVzc0RheXMuc29ydCgpLnJldmVyc2UoKVswXTtcclxuICAgIGNvbnN0IG5hdHVyYWxJbnN0YW5jZSA9IG1vbWVudCgpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5kYXkobGFzdERheSkuX2Q7XHJcbiAgICBjb25zdCBuZXh0SW5zdGFuY2UgPSBtb21lbnQoKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuZGF5KGxhc3REYXkgKyAxNCkuX2Q7XHJcbiAgICBpZiAobW9tZW50KCkuaXNBZnRlcihuYXR1cmFsSW5zdGFuY2UpID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9IGVsc2UgaWYgKGluc3RhbmNlID09PSBcImZpcnN0XCIpIHtcclxuICAgICAgcmV0dXJuIG5hdHVyYWxJbnN0YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYmlXZWVrbHlTcGVjaWZpY0RheTogZnVuY3Rpb24oc2VsZWN0ZWREYXksIGluc3RhbmNlKSB7XHJcbiAgICBjb25zdCBuYXR1cmFsSW5zdGFuY2UgPSBtb21lbnQoKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuZGF5KHNlbGVjdGVkRGF5KS5fZDtcclxuICAgIGNvbnN0IG5leHRJbnN0YW5jZSA9IG1vbWVudCgpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5kYXkoc2VsZWN0ZWREYXkgKyAxNCkuX2Q7XHJcbiAgICBpZiAobW9tZW50KCkuaXNBZnRlcihuYXR1cmFsSW5zdGFuY2UpID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9IGVsc2UgaWYgKGluc3RhbmNlID09PSBcImZpcnN0XCIpIHtcclxuICAgICAgcmV0dXJuIG5hdHVyYWxJbnN0YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbW9udGhseUZpcnN0RGF5OiBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IG5leHRNb250aCA9IG1vbWVudCgpLm1vbnRoKCkgKyAxO1xyXG4gICAgcmV0dXJuIG1vbWVudCgpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5tb250aChuZXh0TW9udGgpLmRhdGUoMSkuX2Q7XHJcbiAgfSxcclxuXHJcbiAgbW9udGhseUxhc3REYXk6IGZ1bmN0aW9uKGluc3RhbmNlKSB7XHJcbiAgICBpZiAoaW5zdGFuY2UgPT09IFwiZmlyc3RcIikge1xyXG4gICAgICByZXR1cm4gbW9tZW50KCkuZW5kT2YoXCJtb250aFwiKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuX2Q7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBuZXh0TW9udGggPSBtb21lbnQoKS5tb250aCgpICsgMTtcclxuICAgICAgcmV0dXJuIG1vbWVudCgpLm1vbnRoKG5leHRNb250aCkuZW5kT2YoXCJtb250aFwiKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuX2Q7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbW9udGhseUFueURheTogZnVuY3Rpb24oaW5zdGFuY2UpIHtcclxuICAgIC8vZGVmYXVsdHMgZGVhZGxpbmUgdG8gdGhlIGxhc3QgZGF5IG9mIHRoZSBtb250aCBzYW1lIGZ1bmN0aW9uIGFzIG1vbnRobHlMYXN0RGF5Li4uLiB3ZSBjb3VsZCBkbyBsYXN0IGJ1c2luZXNzIGRheSBhcyBhIHN0cmVjaFxyXG4gICAgY29uc3QgbmV4dE1vbnRoID0gbW9tZW50KCkubW9udGgoKSArIDE7XHJcbiAgICBpZiAoaW5zdGFuY2UgPT09IFwiZmlyc3RcIikge1xyXG4gICAgICByZXR1cm4gbW9tZW50KCkuZW5kT2YoXCJtb250aFwiKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuX2Q7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbW9tZW50KCkubW9udGgobmV4dE1vbnRoKS5lbmRPZihcIm1vbnRoXCIpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5fZDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtb250aGx5RGF5c0Zyb21TdGFydDogZnVuY3Rpb24obnVtRGF5cywgaW5zdGFuY2UpIHtcclxuICAgIGNvbnN0IG5leHRNb250aCA9IG1vbWVudCgpLm1vbnRoKCkgKyAxO1xyXG4gICAgY29uc3QgbmF0dXJhbEluc3RhbmNlID0gbW9tZW50KCkuc3RhcnRPZignbW9udGgnKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuYWRkKG51bURheXMgLSAxLCAnZGF5cycpLl9kO1xyXG4gICAgY29uc3QgbmV4dEluc3RhbmNlID0gbW9tZW50KCkubW9udGgobmV4dE1vbnRoKS5zdGFydE9mKCdtb250aCcpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5hZGQobnVtRGF5cyAtIDEsICdkYXlzJykuX2Q7XHJcblxyXG4gICAgaWYgKG1vbWVudCgpLmlzQWZ0ZXIobmF0dXJhbEluc3RhbmNlKSkge1xyXG4gICAgICByZXR1cm4gbmV4dEluc3RhbmNlO1xyXG4gICAgfSBlbHNlIGlmIChpbnN0YW5jZSA9PT0gXCJmaXJzdFwiKSB7XHJcbiAgICAgIHJldHVybiBuYXR1cmFsSW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV4dEluc3RhbmNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG5cclxuICBtb250aGx5RGF5c0JlZm9yZUVuZDogZnVuY3Rpb24obnVtRGF5c0JlZm9yZSwgaW5zdGFuY2UpIHtcclxuICAgIGNvbnN0IG5leHRNb250aCA9IG1vbWVudCgpLm1vbnRoKCkgKyAxO1xyXG4gICAgY29uc3QgbmF0dXJhbEluc3RhbmNlID0gbW9tZW50KCkuZW5kT2YoXCJtb250aFwiKS5zdWJ0cmFjdChudW1EYXlzQmVmb3JlLCBcImRheXNcIikuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLl9kO1xyXG4gICAgY29uc3QgbmV4dEluc3RhbmNlID0gbW9tZW50KCkubW9udGgobmV4dE1vbnRoKS5lbmRPZihcIm1vbnRoXCIpLnN1YnRyYWN0KG51bURheXNCZWZvcmUsIFwiZGF5c1wiKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuX2Q7XHJcblxyXG4gICAgaWYgKG1vbWVudCgpLmlzQWZ0ZXIobmF0dXJhbEluc3RhbmNlKSkge1xyXG4gICAgICByZXR1cm4gbmV4dEluc3RhbmNlO1xyXG4gICAgfSBlbHNlIGlmIChpbnN0YW5jZSA9PT0gXCJmaXJzdFwiKSB7XHJcbiAgICAgIHJldHVybiBuYXR1cmFsSW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV4dEluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuXHJcbiAgcXVhcnRlcmx5Rmlyc3REYXk6IGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgbmV4dFF1YXJ0ZXIgPSBtb21lbnQoKS5xdWFydGVyKCkgKyAxO1xyXG4gICAgcmV0dXJuIG1vbWVudCgpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5xdWFydGVyKG5leHRRdWFydGVyKS5kYXRlKDEpLl9kO1xyXG4gIH0sXHJcblxyXG4gIHF1YXJ0ZXJseUxhc3REYXk6IGZ1bmN0aW9uKGluc3RhbmNlKSB7XHJcbiAgICBjb25zdCBuZXh0UXVhcnRlciA9IG1vbWVudCgpLnF1YXJ0ZXIoKSArIDE7XHJcbiAgICBjb25zdCBuYXR1cmFsSW5zdGFuY2UgPSBtb21lbnQoKS5lbmRPZihcInF1YXJ0ZXJcIikuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLl9kO1xyXG4gICAgY29uc3QgbmV4dEluc3RhbmNlID0gbW9tZW50KCkucXVhcnRlcihuZXh0UXVhcnRlcikuZW5kT2YoXCJxdWFydGVyXCIpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5fZDtcclxuXHJcbiAgICBpZiAobW9tZW50KCkuaXNBZnRlcihuYXR1cmFsSW5zdGFuY2UpKSB7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9IGVsc2UgaWYgKGluc3RhbmNlID09PSBcImZpcnN0XCIpIHtcclxuICAgICAgcmV0dXJuIG5hdHVyYWxJbnN0YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcXVhcnRlcmx5QW55RGF5OiBmdW5jdGlvbihpbnN0YW5jZSkge1xyXG4gICAgY29uc3QgbmV4dFF1YXJ0ZXIgPSBtb21lbnQoKS5xdWFydGVyKCkgKyAxO1xyXG4gICAgY29uc3QgbmF0dXJhbEluc3RhbmNlID0gbW9tZW50KCkuZW5kT2YoXCJxdWFydGVyXCIpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5fZDtcclxuICAgIGNvbnN0IG5leHRJbnN0YW5jZSA9IG1vbWVudCgpLnF1YXJ0ZXIobmV4dFF1YXJ0ZXIpLmVuZE9mKFwicXVhcnRlclwiKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuX2Q7XHJcbiAgICBpZiAobW9tZW50KCkuaXNBZnRlcihuYXR1cmFsSW5zdGFuY2UpKSB7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9IGVsc2UgaWYgKGluc3RhbmNlID09PSBcImZpcnN0XCIpIHtcclxuICAgICAgcmV0dXJuIG5hdHVyYWxJbnN0YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcXVhcnRlcmx5RGF5c0Zyb21TdGFydDogZnVuY3Rpb24obnVtRGF5cywgaW5zdGFuY2UpIHtcclxuICAgIGNvbnN0IG5leHRRdWFydGVyID0gbW9tZW50KCkucXVhcnRlcigpICsgMTtcclxuICAgIGNvbnN0IG5hdHVyYWxJbnN0YW5jZSA9IG1vbWVudCgpLnN0YXJ0T2YoJ3F1YXJ0ZXInKS5ob3VycygwKS5zZWNvbmRzKDApLm1pbGxpc2Vjb25kKDApLmFkZChudW1EYXlzLCAnZGF5cycpLl9kO1xyXG4gICAgY29uc3QgbmV4dEluc3RhbmNlID0gbW9tZW50KCkucXVhcnRlcihuZXh0UXVhcnRlcikuZGF0ZSgxKS5ob3VycygwKS5zZWNvbmRzKDApLm1pbGxpc2Vjb25kKDApLmFkZChudW1EYXlzLCAnZGF5cycpLl9kO1xyXG5cclxuICAgIGlmIChtb21lbnQoKS5pc0FmdGVyKG5hdHVyYWxJbnN0YW5jZSkgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIG5leHRJbnN0YW5jZTtcclxuICAgIH0gZWxzZSBpZiAoaW5zdGFuY2UgPT09IFwiZmlyc3RcIikge1xyXG4gICAgICByZXR1cm4gbmF0dXJhbEluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5leHRJbnN0YW5jZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBxdWFydGVybHlEYXlzQmVmb3JlRW5kOiBmdW5jdGlvbihudW1EYXlzQmVmb3JlLGluc3RhbmNlKSB7XHJcbiAgICBjb25zdCBuZXh0UXVhcnRlciA9IG1vbWVudCgpLnF1YXJ0ZXIoKSArIDE7XHJcbiAgICBjb25zdCBuYXR1cmFsSW5zdGFuY2UgPSAgbW9tZW50KCkuZW5kT2YoXCJxdWFydGVyXCIpLnN1YnRyYWN0KG51bURheXNCZWZvcmUsIFwiZGF5c1wiKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuX2Q7XHJcbiAgICBjb25zdCBuZXh0SW5zdGFuY2UgPSBtb21lbnQoKS5xdWFydGVyKG5leHRRdWFydGVyKS5lbmRPZihcInF1YXJ0ZXJcIikuc3VidHJhY3QobnVtRGF5c0JlZm9yZSwgXCJkYXlzXCIpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5fZDtcclxuICAgIGlmIChtb21lbnQoKS5pc0FmdGVyKG5hdHVyYWxJbnN0YW5jZSkgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIG5leHRJbnN0YW5jZTtcclxuICAgIH0gZWxzZSBpZiAoaW5zdGFuY2UgPT09IFwiZmlyc3RcIikge1xyXG4gICAgICByZXR1cm4gbmF0dXJhbEluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5leHRJbnN0YW5jZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhbm51YWxseUZpcnN0RGF5OiBmdW5jdGlvbihpbnN0YW5jZSkge1xyXG4gICAgY29uc3QgbmV4dFllYXIgPSBtb21lbnQoKS55ZWFyKCkgKyAxO1xyXG4gICAgcmV0dXJuIG1vbWVudCgpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS55ZWFyKG5leHRZZWFyKS5kYXRlKDEpLl9kO1xyXG4gIH0sXHJcblxyXG4gIGFubnVhbGx5TGFzdERheTogZnVuY3Rpb24oaW5zdGFuY2UpIHtcclxuICAgIGlmIChpbnN0YW5jZSA9PT0gXCJmaXJzdFwiKSB7XHJcbiAgICAgIHJldHVybiBtb21lbnQoKS5lbmRPZihcInllYXJcIikuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLl9kO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbmV4dFllYXIgPSBtb21lbnQoKS55ZWFyKCkgKyAxO1xyXG4gICAgICByZXR1cm4gbW9tZW50KCkueWVhcihuZXh0WWVhcikuZW5kT2YoXCJ5ZWFyXCIpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5fZDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhbm51YWxseUFueURheTogZnVuY3Rpb24oaW5zdGFuY2UpIHtcclxuICAgIGNvbnN0IG5leHRZZWFyID0gbW9tZW50KCkueWVhcigpICsgMTtcclxuICAgIGNvbnN0IG5hdHVyYWxJbnN0YW5jZSA9IG1vbWVudCgpLmVuZE9mKFwieWVhclwiKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuX2Q7XHJcbiAgICBjb25zdCBuZXh0SW5zdGFuY2UgPSBtb21lbnQoKS55ZWFyKG5leHRZZWFyKS5lbmRPZihcInllYXJcIikuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLl9kO1xyXG5cclxuICAgIGlmIChtb21lbnQoKS5pc0FmdGVyKG5hdHVyYWxJbnN0YW5jZSkgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIG5leHRJbnN0YW5jZTtcclxuICAgIH0gZWxzZSBpZiAoaW5zdGFuY2UgPT09IFwiZmlyc3RcIikge1xyXG4gICAgICByZXR1cm4gbmF0dXJhbEluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5leHRJbnN0YW5jZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhbm51YWxseURheXNGcm9tU3RhcnQ6IGZ1bmN0aW9uKG51bURheXMsIGluc3RhbmNlKSB7XHJcbiAgICBjb25zdCBuZXh0WWVhciA9IG1vbWVudCgpLnllYXIoKSArIDE7XHJcbiAgICBjb25zdCBuYXR1cmFsSW5zdGFuY2UgPSBtb21lbnQoKS5zdGFydE9mKCd5ZWFyJykuaG91cnMoMCkuc2Vjb25kcygwKS5taWxsaXNlY29uZCgwKS5hZGQobnVtRGF5cywgJ2RheXMnKS5fZDtcclxuICAgIGNvbnN0IG5leHRJbnN0YW5jZSA9IG1vbWVudCgpLnllYXIobmV4dFllYXIpLnN0YXJ0T2YoJ3llYXInKS5ob3VycygwKS5zZWNvbmRzKDApLm1pbGxpc2Vjb25kKDApLmFkZChudW1EYXlzLCAnZGF5cycpLl9kO1xyXG5cclxuICAgIGlmIChtb21lbnQoKS5pc0FmdGVyKG5hdHVyYWxJbnN0YW5jZSkgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIG5leHRJbnN0YW5jZTtcclxuICAgIH0gZWxzZSBpZiAoaW5zdGFuY2UgPT09IFwiZmlyc3RcIikge1xyXG4gICAgICByZXR1cm4gbmF0dXJhbEluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5leHRJbnN0YW5jZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuXHJcbiAgYW5udWFsbHlEYXlzQmVmb3JlRW5kOiBmdW5jdGlvbihudW1EYXlzQmVmb3JlLCBpbnN0YW5jZSkge1xyXG4gICAgY29uc3QgbmV4dFllYXIgPSBtb21lbnQoKS55ZWFyKCkgKyAxO1xyXG4gICAgY29uc3QgbmF0dXJhbEluc3RhbmNlID0gbW9tZW50KCkuZW5kT2YoXCJ5ZWFyXCIpLnN1YnRyYWN0KG51bURheXNCZWZvcmUsIFwiZGF5c1wiKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuX2Q7XHJcbiAgICBjb25zdCBuZXh0SW5zdGFuY2UgPSBtb21lbnQoKS55ZWFyKG5leHRZZWFyKS5lbmRPZihcInllYXJcIikuc3VidHJhY3QobnVtRGF5c0JlZm9yZSwgXCJkYXlzXCIpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5fZDtcclxuXHJcbiAgICBpZiAobW9tZW50KCkuaXNBZnRlcihuYXR1cmFsSW5zdGFuY2UpID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9IGVsc2UgaWYgKGluc3RhbmNlID09PSBcImZpcnN0XCIpIHtcclxuICAgICAgcmV0dXJuIG5hdHVyYWxJbnN0YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcblxyXG4gIGFubnVhbGx5UGFydGljdWxhck1vbnRoOiBmdW5jdGlvbihzZWxlY3RlZE1vbnRoLCBpbnN0YW5jZSkge1xyXG4gICAgY29uc29sZS5sb2coXCIjMTIgLSBNYWRlIGl0IHRvIGFubnVhbGx5UGFydGljdWxhck1vbnRoXCIpO1xyXG4gICAgY29uc29sZS5sb2coXCJNT05USFwiLCBzZWxlY3RlZE1vbnRoKTtcclxuICAgIGNvbnN0IG5leHRZZWFyID0gbW9tZW50KCkueWVhcigpICsgMTtcclxuICAgIGNvbnN0IG5hdHVyYWxJbnN0YW5jZSA9IG1vbWVudCgpLm1vbnRoKHNlbGVjdGVkTW9udGgpLmVuZE9mKFwibW9udGhcIikuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLl9kO1xyXG4gICAgY29uc3QgbmV4dEluc3RhbmNlID0gbW9tZW50KCkueWVhcihuZXh0WWVhcikubW9udGgoc2VsZWN0ZWRNb250aCkuZW5kT2YoXCJtb250aFwiKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuX2Q7XHJcbiAgICAgIFxyXG5cclxuICAgIGlmIChtb21lbnQoKS5pc0FmdGVyKG5hdHVyYWxJbnN0YW5jZSkgPT09IHRydWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnISEhISEhJyk7XHJcbiAgICAgIHJldHVybiBuZXh0SW5zdGFuY2U7XHJcbiAgICB9IGVsc2UgaWYgKGluc3RhbmNlID09PSBcImZpcnN0XCIpIHtcclxuICAgICAgcmV0dXJuIG5hdHVyYWxJbnN0YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJz8/Pz8/PycpO1xyXG4gICAgICByZXR1cm4gbmV4dEluc3RhbmNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFubnVhbGx5UGFydGljdWxhclF1YXJ0ZXI6IGZ1bmN0aW9uKHNlbGVjdGVkUXVhcnRlciwgaW5zdGFuY2UpIHtcclxuICAgIGNvbnN0IG5leHRZZWFyID0gbW9tZW50KCkueWVhcigpICsgMTtcclxuICAgIGNvbnN0IG5hdHVyYWxJbnN0YW5jZSA9IG1vbWVudCgpLnF1YXJ0ZXIoc2VsZWN0ZWRRdWFydGVyKS5lbmRPZihcInF1YXJ0ZXJcIikuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLl9kO1xyXG4gICAgY29uc3QgbmV4dEluc3RhbmNlID0gbW9tZW50KCkueWVhcihuZXh0WWVhcikucXVhcnRlcihzZWxlY3RlZFF1YXJ0ZXIpLmVuZE9mKFwicXVhcnRlclwiKS5ob3VycyhkZWFkbGluZUhvdXIpLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCkuX2Q7XHJcblxyXG4gICAgaWYgKG1vbWVudCgpLmlzQWZ0ZXIobmF0dXJhbEluc3RhbmNlKSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gbmV4dEluc3RhbmNlO1xyXG4gICAgfSBlbHNlIGlmIChpbnN0YW5jZSA9PT0gXCJmaXJzdFwiKSB7XHJcbiAgICAgIHJldHVybiBuYXR1cmFsSW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV4dEluc3RhbmNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNlbWlNb250aGx5Rmlyc3RDeWNsZTogZnVuY3Rpb24oc2VsZWN0ZWREYXRlKSB7XHJcbiAgICByZXR1cm4gbW9tZW50KCkuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLmRhdGUoc2VsZWN0ZWREYXRlKS5fZDtcclxuICB9LFxyXG5cclxuICBzZW1pTW90aGx5U2Vjb25kQ3ljbGU6IGZ1bmN0aW9uKGZpcnN0Q3ljbGVEYXRlKSB7XHJcbiAgICByZXR1cm4gbW9tZW50KCkuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLmRhdGUoZmlyc3RDeWNsZURhdGUgKyAxNSkuX2Q7XHJcbiAgfSxcclxuXHJcbm5leHRCdXNpbmVzc0RheTogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgaXNJbiA9IGZ1bmN0aW9uIChpbmNyZWFzZURheXMpIHtcclxuICAgICAgICAvL1NldHMgYSBudW1iZXIgZm9yIGRheSBvZiB0aGUgd2Vlay4uLlN1bmRheSA9IDAsIE1vbmRheSA9IDEgZXRjLlxyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbW9tZW50KCkuZGF5KCk7XHJcbiAgICAgICAgY29uc3QgbmV4dEJEID0gdG9kYXkgKyBpbmNyZWFzZURheXM7XHJcbiAgICAgICAgdmFyIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDYgOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IG5leHRCRCkge1xyXG4gICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICB9O1xyXG4gICAgaWYgKGlzSW4oMSkgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gbW9tZW50KCkuaG91cnMoZGVhZGxpbmVIb3VyKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLmFkZCgxLCAnZGF5cycpLl9kO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vbWVudCgpLmhvdXJzKGRlYWRsaW5lSG91cikubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS5hZGQoMSwgXCJ3ZWVrc1wiKS5zdGFydE9mKCdpc29XZWVrJykuX2Q7XHJcbn0sXHJcblxyXG5cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
