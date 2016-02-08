'use strict';

var mongoose = require("mongoose");

var allowedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var allowedFrequencies = ["Triggered", "Scheduled"];
var allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Monthly', 'Quarterly', 'Annually'];
var allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before End"];
var allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
var allowedSemiMonthlyIntervals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th"];
var allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any"];

//This is the model for project template creation.
var templateSchema = new mongoose.Schema({
  //The name will be the same for all projects generated from the template
  name: { type: String },
  //Description is the  unique visual identifies of a project on the front end
  description: { type: String },
  tasks: [{ type: String, ref: 'TemplateTask' }],
  tasksCompleted: { type: Number, default: 0 },
  overdue: { type: Boolean, default: false },
  setup: {
    created: { type: Date, default: new Date() },
    type: { type: String, enum: ['Single', 'Triggered', 'Scheduled'] },
    //Pick one of these two frequency options
    // frequency:  {
    //     byDate: {type: Boolean},
    //     byInterval: {type: Boolean}
    // },
    frequency: { type: String, enum: ['By Date', 'By Interval'] },
    //Due date will require function based on user selection. Will be stand in for next instance or selected day.
    dueDate: {
      actual: { type: Date, default: new Date() },
      anticipated: { type: Date, default: new Date() }
    },
    interval: {
      type: { type: String, enum: allowedIntervalTypes },
      weeklyInterval: { type: String, enum: allowedWeeklyIntervals },
      biWeeklyInterval: { type: String, enum: allowedWeeklyIntervals },
      monthlyInterval: {
        selection: { type: String, enum: ["# of Days From Start", "# of Days Before End", "First Day of Month", "Last Day of Month"] },
        fromBeginning: {},
        fromEnd: {}
      },
      annualInterval: {
        selection: { type: String, enum: allowedAnnuallyIntervals },
        fromBeginning: {},
        fromEnd: {},
        selectMonth: { type: String, enum: allowedMonthlyIntervals },
        selectQuarter: { type: Number }
      },
      quarterlyInterval: {
        selection: { type: String, enum: allowedQuarterlyIntervals },
        fromBeginning: {},
        fromEnd: {}
      },
      semiMonthlyInterval: {
        selection: { type: String, enum: allowedSemiMonthlyIntervals },
        fromBeginning: {},
        fromEnd: {}
      }
    },
    critical: { type: Boolean, default: false }
  }

});

module.exports = mongoose.model('Template', templateSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvbW9kZWxzL1RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxXQUFXLFFBQVEsVUFBUixDQUFYOztBQUVOLElBQU0sY0FBYyxDQUFDLFFBQUQsRUFBVSxRQUFWLEVBQW1CLFNBQW5CLEVBQTZCLFdBQTdCLEVBQXlDLFVBQXpDLEVBQW9ELFFBQXBELEVBQTZELFVBQTdELENBQWQ7QUFDTixJQUFNLHFCQUFxQixDQUFDLFdBQUQsRUFBYyxXQUFkLENBQXJCO0FBQ04sSUFBTSx1QkFBdUIsQ0FBQyxPQUFELEVBQVUscUJBQVYsRUFBaUMsUUFBakMsRUFBMkMsV0FBM0MsRUFBd0QsU0FBeEQsRUFBbUUsY0FBbkUsRUFBbUYsV0FBbkYsRUFBZ0csVUFBaEcsQ0FBdkI7QUFDTixJQUFNLDBCQUEwQixDQUFDLFNBQUQsRUFBWSxVQUFaLEVBQXdCLE9BQXhCLEVBQWlDLE9BQWpDLEVBQTBDLEtBQTFDLEVBQWlELE1BQWpELEVBQXlELE1BQXpELEVBQWlFLFFBQWpFLEVBQTJFLFdBQTNFLEVBQXdGLFNBQXhGLEVBQW1HLFVBQW5HLEVBQStHLFVBQS9HLENBQTFCO0FBQ04sSUFBTSwyQkFBMkIsQ0FBQyx1QkFBRCxFQUEwQixzQkFBMUIsRUFBa0QscUJBQWxELEVBQXlFLHVCQUF6RSxFQUFrRyx5QkFBbEcsRUFBNkgsc0JBQTdILEVBQXFKLHNCQUFySixDQUEzQjtBQUNOLElBQU0seUJBQXlCLENBQUMsUUFBRCxFQUFXLFNBQVgsRUFBc0IsV0FBdEIsRUFBbUMsVUFBbkMsRUFBK0MsUUFBL0MsRUFBeUQsVUFBekQsRUFBcUUsUUFBckUsRUFBK0UsS0FBL0UsQ0FBekI7QUFDTixJQUFNLDhCQUE4QixDQUFDLEtBQUQsRUFBTyxLQUFQLEVBQWMsS0FBZCxFQUFxQixLQUFyQixFQUE0QixLQUE1QixFQUFrQyxLQUFsQyxFQUF3QyxLQUF4QyxFQUE4QyxLQUE5QyxFQUFvRCxLQUFwRCxFQUEwRCxNQUExRCxFQUFpRSxNQUFqRSxFQUF3RSxNQUF4RSxFQUErRSxNQUEvRSxFQUFzRixNQUF0RixFQUE2RixNQUE3RixDQUE5QjtBQUNOLElBQU0sNEJBQTRCLENBQUMsMEJBQUQsRUFBNkIseUJBQTdCLEVBQXdELG1CQUF4RCxFQUE2RSxpQkFBN0UsRUFBZ0csS0FBaEcsQ0FBNUI7OztBQUdOLElBQU0saUJBQWlCLElBQUksU0FBUyxNQUFULENBQWdCOztBQUV6QyxRQUFLLEVBQUMsTUFBSyxNQUFMLEVBQU47O0FBRUEsZUFBYSxFQUFDLE1BQUssTUFBTCxFQUFkO0FBQ0EsU0FBTyxDQUNELEVBQUMsTUFBTSxNQUFOLEVBQWUsS0FBSyxjQUFMLEVBRGYsQ0FBUDtBQUdFLGtCQUFnQixFQUFDLE1BQU0sTUFBTixFQUFjLFNBQVMsQ0FBVCxFQUEvQjtBQUNBLFdBQVMsRUFBQyxNQUFNLE9BQU4sRUFBZSxTQUFTLEtBQVQsRUFBekI7QUFDRixTQUFPO0FBQ0gsYUFBUyxFQUFDLE1BQU0sSUFBTixFQUFZLFNBQVMsSUFBSSxJQUFKLEVBQVQsRUFBdEI7QUFDQSxVQUFPLEVBQUMsTUFBTSxNQUFOLEVBQWMsTUFBTSxDQUFDLFFBQUQsRUFBVSxXQUFWLEVBQXVCLFdBQXZCLENBQU4sRUFBdEI7Ozs7OztBQU1BLGVBQVksRUFBQyxNQUFNLE1BQU4sRUFBYyxNQUFNLENBQUMsU0FBRCxFQUFXLGFBQVgsQ0FBTixFQUEzQjs7QUFFQSxhQUFTO0FBQ1AsY0FBUSxFQUFDLE1BQUssSUFBTCxFQUFXLFNBQVMsSUFBSSxJQUFKLEVBQVQsRUFBcEI7QUFDQSxtQkFBYSxFQUFDLE1BQUssSUFBTCxFQUFXLFNBQVMsSUFBSSxJQUFKLEVBQVQsRUFBekI7S0FGRjtBQUlBLGNBQVc7QUFDUCxZQUFNLEVBQUMsTUFBTSxNQUFOLEVBQWMsTUFBTSxvQkFBTixFQUFyQjtBQUNBLHNCQUFnQixFQUFDLE1BQU0sTUFBTixFQUFjLE1BQU0sc0JBQU4sRUFBL0I7QUFDQSx3QkFBa0IsRUFBQyxNQUFNLE1BQU4sRUFBYyxNQUFNLHNCQUFOLEVBQWpDO0FBQ0EsdUJBQWlCO0FBQ2YsbUJBQVcsRUFBQyxNQUFNLE1BQU4sRUFBYyxNQUFNLENBQUMsc0JBQUQsRUFBeUIsc0JBQXpCLEVBQWlELG9CQUFqRCxFQUF1RSxtQkFBdkUsQ0FBTixFQUExQjtBQUNBLHVCQUFlLEVBQWY7QUFDQSxpQkFBUyxFQUFUO09BSEY7QUFLQSxzQkFBZ0I7QUFDZCxtQkFBWSxFQUFDLE1BQU0sTUFBTixFQUFjLE1BQU0sd0JBQU4sRUFBM0I7QUFDQSx1QkFBZSxFQUFmO0FBQ0EsaUJBQVMsRUFBVDtBQUNBLHFCQUFhLEVBQUMsTUFBTSxNQUFOLEVBQWMsTUFBTSx1QkFBTixFQUE1QjtBQUNBLHVCQUFlLEVBQUMsTUFBTSxNQUFOLEVBQWhCO09BTEY7QUFPQSx5QkFBbUI7QUFDZixtQkFBVSxFQUFDLE1BQUssTUFBTCxFQUFhLE1BQU0seUJBQU4sRUFBeEI7QUFDQSx1QkFBZSxFQUFmO0FBQ0EsaUJBQVMsRUFBVDtPQUhKO0FBS0EsMkJBQXFCO0FBQ25CLG1CQUFXLEVBQUMsTUFBTSxNQUFOLEVBQWMsTUFBTSwyQkFBTixFQUExQjtBQUNBLHVCQUFlLEVBQWY7QUFDQSxpQkFBUyxFQUFUO09BSEY7S0FyQko7QUEyQkEsY0FBVSxFQUFDLE1BQU0sT0FBTixFQUFlLFNBQVMsS0FBVCxFQUExQjtHQXpDSjs7Q0FWcUIsQ0FBakI7O0FBd0ROLE9BQU8sT0FBUCxHQUFpQixTQUFTLEtBQVQsQ0FBZSxVQUFmLEVBQTJCLGNBQTNCLENBQWpCIiwiZmlsZSI6InNlcnZlcl9hc3NldHMvbW9kZWxzL1RlbXBsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XHJcblxyXG5jb25zdCBhbGxvd2VkRGF5cyA9IFsnU3VuZGF5JywnTW9uZGF5JywnVHVlc2RheScsJ1dlZG5lc2RheScsJ1RodXJzZGF5JywnRnJpZGF5JywnU2F0dXJkYXknXTtcclxuY29uc3QgYWxsb3dlZEZyZXF1ZW5jaWVzID0gW1wiVHJpZ2dlcmVkXCIsIFwiU2NoZWR1bGVkXCJdO1xyXG5jb25zdCBhbGxvd2VkSW50ZXJ2YWxUeXBlcyA9IFsnRGFpbHknLCAnRGFpbHkgQnVzaW5lc3MgRGF5cycsICdXZWVrbHknLCAnQmktV2Vla2x5JywgJ01vbnRobHknLCAnU2VtaS1Nb250aGx5JywgJ1F1YXJ0ZXJseScsICdBbm51YWxseSddO1xyXG5jb25zdCBhbGxvd2VkTW9udGhseUludGVydmFscyA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xyXG5jb25zdCBhbGxvd2VkQW5udWFsbHlJbnRlcnZhbHMgPSBbXCJGaXJzdCBEYXkgb2YgdGhlIFllYXJcIiwgXCJMYXN0IERheSBvZiB0aGUgWWVhclwiLCBcIkFueSBEYXkgb2YgdGhlIHllYXJcIiwgXCJJbiBhIFBhcnRpY3VsYXIgTW9udGhcIiwgXCJJbiBhIFBhcnRpY3VsYXIgUXVhcnRlclwiLCBcIiMgb2YgRGF5cyBGcm9tIFN0YXJ0XCIsIFwiIyBvZiBEYXlzIEJlZm9yZSBFbmRcIl07XHJcbmNvbnN0IGFsbG93ZWRXZWVrbHlJbnRlcnZhbHMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5JywgJ0FueSddO1xyXG5jb25zdCBhbGxvd2VkU2VtaU1vbnRobHlJbnRlcnZhbHMgPSBbXCIxc3RcIixcIjJuZFwiLCBcIjNyZFwiLCBcIjR0aFwiLCBcIjV0aFwiLFwiNnRoXCIsXCI3dGhcIixcIjh0aFwiLFwiOXRoXCIsXCIxMHRoXCIsXCIxMXRoXCIsXCIxMnRoXCIsXCIxM3RoXCIsXCIxNHRoXCIsXCIxNXRoXCJdO1xyXG5jb25zdCBhbGxvd2VkUXVhcnRlcmx5SW50ZXJ2YWxzID0gW1wiRmlyc3QgRGF5IG9mIHRoZSBRdWFydGVyXCIsIFwiTGFzdCBEYXkgb2YgdGhlIFF1YXJ0ZXJcIiwgXCIjIERheXMgZnJvbSBTdGFydFwiLCBcIiMgRGF5cyBmcm9tIEVuZFwiLCBcIkFueVwiIF07XHJcblxyXG4vL1RoaXMgaXMgdGhlIG1vZGVsIGZvciBwcm9qZWN0IHRlbXBsYXRlIGNyZWF0aW9uLlxyXG5jb25zdCB0ZW1wbGF0ZVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIC8vVGhlIG5hbWUgd2lsbCBiZSB0aGUgc2FtZSBmb3IgYWxsIHByb2plY3RzIGdlbmVyYXRlZCBmcm9tIHRoZSB0ZW1wbGF0ZVxyXG4gIG5hbWU6e3R5cGU6U3RyaW5nfSxcclxuICAvL0Rlc2NyaXB0aW9uIGlzIHRoZSAgdW5pcXVlIHZpc3VhbCBpZGVudGlmaWVzIG9mIGEgcHJvamVjdCBvbiB0aGUgZnJvbnQgZW5kXHJcbiAgZGVzY3JpcHRpb246IHt0eXBlOlN0cmluZ30sXHJcbiAgdGFza3M6IFtcclxuICAgICAgICB7dHlwZTogU3RyaW5nICwgcmVmOiAnVGVtcGxhdGVUYXNrJ31cclxuICAgICAgICAgIF0sXHJcbiAgICB0YXNrc0NvbXBsZXRlZDoge3R5cGU6IE51bWJlciwgZGVmYXVsdDogMH0sXHJcbiAgICBvdmVyZHVlOiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2V9LFxyXG4gIHNldHVwOiB7XHJcbiAgICAgIGNyZWF0ZWQ6IHt0eXBlOiBEYXRlLCBkZWZhdWx0OiBuZXcgRGF0ZSgpfSxcclxuICAgICAgdHlwZTogIHt0eXBlOiBTdHJpbmcsIGVudW06IFsnU2luZ2xlJywnVHJpZ2dlcmVkJywgJ1NjaGVkdWxlZCddfSxcclxuICAgICAgLy9QaWNrIG9uZSBvZiB0aGVzZSB0d28gZnJlcXVlbmN5IG9wdGlvbnNcclxuICAgICAgLy8gZnJlcXVlbmN5OiAge1xyXG4gICAgICAvLyAgICAgYnlEYXRlOiB7dHlwZTogQm9vbGVhbn0sXHJcbiAgICAgIC8vICAgICBieUludGVydmFsOiB7dHlwZTogQm9vbGVhbn1cclxuICAgICAgLy8gfSxcclxuICAgICAgZnJlcXVlbmN5OiAge3R5cGU6IFN0cmluZywgZW51bTogWydCeSBEYXRlJywnQnkgSW50ZXJ2YWwnXX0sXHJcbiAgICAgIC8vRHVlIGRhdGUgd2lsbCByZXF1aXJlIGZ1bmN0aW9uIGJhc2VkIG9uIHVzZXIgc2VsZWN0aW9uLiBXaWxsIGJlIHN0YW5kIGluIGZvciBuZXh0IGluc3RhbmNlIG9yIHNlbGVjdGVkIGRheS5cclxuICAgICAgZHVlRGF0ZToge1xyXG4gICAgICAgIGFjdHVhbDoge3R5cGU6RGF0ZSwgZGVmYXVsdDogbmV3IERhdGUoKX0sXHJcbiAgICAgICAgYW50aWNpcGF0ZWQ6IHt0eXBlOkRhdGUsIGRlZmF1bHQ6IG5ldyBEYXRlKCl9LFxyXG4gICAgICB9LFxyXG4gICAgICBpbnRlcnZhbCA6IHtcclxuICAgICAgICAgIHR5cGU6IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRJbnRlcnZhbFR5cGVzfSxcclxuICAgICAgICAgIHdlZWtseUludGVydmFsOiB7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkV2Vla2x5SW50ZXJ2YWxzfSxcclxuICAgICAgICAgIGJpV2Vla2x5SW50ZXJ2YWw6IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRXZWVrbHlJbnRlcnZhbHN9LFxyXG4gICAgICAgICAgbW9udGhseUludGVydmFsOiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjoge3R5cGU6IFN0cmluZywgZW51bTogW1wiIyBvZiBEYXlzIEZyb20gU3RhcnRcIiwgXCIjIG9mIERheXMgQmVmb3JlIEVuZFwiLCBcIkZpcnN0IERheSBvZiBNb250aFwiLCBcIkxhc3QgRGF5IG9mIE1vbnRoXCJdfSxcclxuICAgICAgICAgICAgZnJvbUJlZ2lubmluZzoge30sXHJcbiAgICAgICAgICAgIGZyb21FbmQ6IHt9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYW5udWFsSW50ZXJ2YWw6IHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uOiAge3R5cGU6IFN0cmluZywgZW51bTogYWxsb3dlZEFubnVhbGx5SW50ZXJ2YWxzfSxcclxuICAgICAgICAgICAgZnJvbUJlZ2lubmluZzoge30sXHJcbiAgICAgICAgICAgIGZyb21FbmQ6IHt9LFxyXG4gICAgICAgICAgICBzZWxlY3RNb250aDoge3R5cGU6IFN0cmluZywgZW51bTogYWxsb3dlZE1vbnRobHlJbnRlcnZhbHN9LFxyXG4gICAgICAgICAgICBzZWxlY3RRdWFydGVyOiB7dHlwZTogTnVtYmVyfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHF1YXJ0ZXJseUludGVydmFsOiB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0aW9uOnt0eXBlOlN0cmluZywgZW51bTogYWxsb3dlZFF1YXJ0ZXJseUludGVydmFsc30sXHJcbiAgICAgICAgICAgICAgZnJvbUJlZ2lubmluZzoge30sXHJcbiAgICAgICAgICAgICAgZnJvbUVuZDoge31cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzZW1pTW9udGhseUludGVydmFsOiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjoge3R5cGU6IFN0cmluZywgZW51bTogYWxsb3dlZFNlbWlNb250aGx5SW50ZXJ2YWxzfSxcclxuICAgICAgICAgICAgZnJvbUJlZ2lubmluZzoge30sXHJcbiAgICAgICAgICAgIGZyb21FbmQ6IHt9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNyaXRpY2FsOiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2V9XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vbmdvb3NlLm1vZGVsKCdUZW1wbGF0ZScsIHRlbXBsYXRlU2NoZW1hKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
