const mongoose = require("mongoose");

const allowedDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const allowedFrequencies = ["Triggered", "Scheduled"];
const allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Monthly', 'Quarterly', 'Annually'];
const allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before End"];
const allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
const allowedSemiMonthlyIntervals = ["1st","2nd", "3rd", "4th", "5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th"];
const allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any" ];

//This is the model for project template creation.
const templateSchema = new mongoose.Schema({
  //The name will be the same for all projects generated from the template
  name:{type:String},
  //Description is the  unique visual identifies of a project on the front end
  description: {type:String},
  tasks: [
        {type: String , ref: 'TemplateTask'}
          ],
    tasksCompleted: {type: Number, default: 0},
    overdue: {type: Boolean, default: false},
  setup: {
      created: {type: Date, default: new Date()},
      type:  {type: String, enum: ['Single','Triggered', 'Scheduled']},
      //Pick one of these two frequency options
      // frequency:  {
      //     byDate: {type: Boolean},
      //     byInterval: {type: Boolean}
      // },
      frequency:  {type: String, enum: ['By Date','By Interval']},
      //Due date will require function based on user selection. Will be stand in for next instance or selected day.
      dueDate: {
        actual: {type:Date, default: new Date()},
        anticipated: {type:Date, default: new Date()},
      },
      interval : {
          type: {type: String, enum: allowedIntervalTypes},
          weeklyInterval: {type: String, enum: allowedWeeklyIntervals},
          biWeeklyInterval: {type: String, enum: allowedWeeklyIntervals},
          monthlyInterval: {
            selection: {type: String, enum: ["# of Days From Start", "# of Days Before End", "First Day of Month", "Last Day of Month"]},
            fromBeginning: {},
            fromEnd: {}
          },
          annualInterval: {
            selection:  {type: String, enum: allowedAnnuallyIntervals},
            fromBeginning: {},
            fromEnd: {},
            selectMonth: {type: String, enum: allowedMonthlyIntervals},
            selectQuarter: {type: Number}
          },
          quarterlyInterval: {
              selection:{type:String, enum: allowedQuarterlyIntervals},
              fromBeginning: {},
              fromEnd: {}
          },
          semiMonthlyInterval: {
            selection: {type: String, enum: allowedSemiMonthlyIntervals},
            fromBeginning: {},
            fromEnd: {}
          }
      },
      critical: {type: Boolean, default: false}
  }

});

module.exports = mongoose.model('Template', templateSchema);
