'use strict';

var mongoose = require('mongoose');

var allowedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var allowedFrequencies = ["Triggered", "Scheduled"];
var allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Montly', 'Quarterly', 'Annually'];
var allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before end"];
var allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
var allowedSemiMonthlyIntervals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th"];
var allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any"];
var targets = ['Today', 'Specific Date'];

// This is the model for the Project creation
var projectSchema = new mongoose.Schema({
  //_id: {type:mongoose.Schema.Types.ObjectId, default: function () { return new mongoose.Schema.Types.ObjectId();} },
  //The name will be the same for all projects generated from the template
  name: { type: String },
  //Description is the  unique visual identifies of a project on the front end
  description: { type: String },
  friendlyId: { type: String },
  status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete' },
  tasks: [{ type: String, ref: 'ProjectTask' }],
  tasksCompleted: { type: Number, default: 0 },
  overdue: { type: Boolean, default: false },
  setup: {
    created: { type: Date, default: new Date() },
    type: { type: String, enum: ['Single', 'Triggered', 'Scheduled'] },
    //Pick one of these
    // frequency:  {
    //     byDate: {type: Boolean},
    //     byInterval: {type: Boolean}
    // },
    frequency: { type: String, enum: ['By Date', 'By Interval'] },
    //Due date will require function based on user selection. Will be stand in for next instance or selected day.
    dueDate: {
      actual: { type: Date, default: new Date() },
      anticipated: { type: Date, default: new Date() },
      target: { type: String, enum: targets }
    },
    interval: {
      type: { type: String, enum: allowedIntervalTypes },
      weeklyInterval: { type: String, enum: allowedWeeklyIntervals },
      monthlyInterval: {
        selection: { type: String, enum: ["# of Days From Start", "# of Days Before End", "First Day of Month", "Last Day of Month"] },
        fromBeginning: { type: Number },
        fromEnd: { type: Number }
      },
      annualInterval: {
        selectMonth: { type: String, enum: allowedMonthlyIntervals },
        selectQuarter: { type: Number },
        selection: { type: String, enum: allowedAnnuallyIntervals },
        fromBeginning: { type: Number },
        fromEnd: { type: Number }
      },
      quarterlyInterval: {
        selection: { type: String, enum: allowedQuarterlyIntervals },
        fromBeginning: { type: Number },
        fromEnd: { type: Number }
      },
      semiMonthlyInterval: {
        selection: { type: String, enum: allowedSemiMonthlyIntervals },
        fromBeginning: { type: Number },
        fromEnd: { type: Number }
      }
    },
    associatedTemplate: { type: String, ref: "Template" },
    critical: { type: Boolean, default: false },
    projectUrl: { type: String }
  }
});

module.exports = mongoose.model('Project', projectSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvbW9kZWxzL1Byb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFdBQVcsUUFBUSxVQUFSLENBQVg7O0FBRU4sSUFBTSxjQUFjLENBQUMsUUFBRCxFQUFVLFFBQVYsRUFBbUIsU0FBbkIsRUFBNkIsV0FBN0IsRUFBeUMsVUFBekMsRUFBb0QsUUFBcEQsRUFBNkQsVUFBN0QsQ0FBZDtBQUNOLElBQU0scUJBQXFCLENBQUMsV0FBRCxFQUFjLFdBQWQsQ0FBckI7QUFDTixJQUFNLHVCQUF1QixDQUFDLE9BQUQsRUFBVSxxQkFBVixFQUFpQyxRQUFqQyxFQUEyQyxXQUEzQyxFQUF3RCxTQUF4RCxFQUFtRSxhQUFuRSxFQUFrRixXQUFsRixFQUErRixVQUEvRixDQUF2QjtBQUNOLElBQU0sMEJBQTBCLENBQUMsU0FBRCxFQUFZLFVBQVosRUFBd0IsT0FBeEIsRUFBaUMsT0FBakMsRUFBMEMsS0FBMUMsRUFBaUQsTUFBakQsRUFBeUQsTUFBekQsRUFBaUUsUUFBakUsRUFBMkUsV0FBM0UsRUFBd0YsU0FBeEYsRUFBbUcsVUFBbkcsRUFBK0csVUFBL0csQ0FBMUI7QUFDTixJQUFNLDJCQUEyQixDQUFDLHVCQUFELEVBQTBCLHNCQUExQixFQUFrRCxxQkFBbEQsRUFBeUUsdUJBQXpFLEVBQWtHLHlCQUFsRyxFQUE2SCxzQkFBN0gsRUFBcUosc0JBQXJKLENBQTNCO0FBQ04sSUFBTSx5QkFBeUIsQ0FBQyxRQUFELEVBQVcsU0FBWCxFQUFzQixXQUF0QixFQUFtQyxVQUFuQyxFQUErQyxRQUEvQyxFQUF5RCxVQUF6RCxFQUFxRSxRQUFyRSxFQUErRSxLQUEvRSxDQUF6QjtBQUNOLElBQU0sOEJBQThCLENBQUMsS0FBRCxFQUFPLEtBQVAsRUFBYyxLQUFkLEVBQXFCLEtBQXJCLEVBQTRCLEtBQTVCLEVBQWtDLEtBQWxDLEVBQXdDLEtBQXhDLEVBQThDLEtBQTlDLEVBQW9ELEtBQXBELEVBQTBELE1BQTFELEVBQWlF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LEVBQUMsTUFBSyxNQUFMLEVBQWI7R0EzQ0o7Q0Fib0IsQ0FBaEI7O0FBNEROLE9BQU8sT0FBUCxHQUFpQixTQUFTLEtBQVQsQ0FBZSxTQUFmLEVBQTBCLGFBQTFCLENBQWpCIiwiZmlsZSI6InNlcnZlcl9hc3NldHMvbW9kZWxzL1Byb2plY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XHJcblxyXG5jb25zdCBhbGxvd2VkRGF5cyA9IFsnU3VuZGF5JywnTW9uZGF5JywnVHVlc2RheScsJ1dlZG5lc2RheScsJ1RodXJzZGF5JywnRnJpZGF5JywnU2F0dXJkYXknXTtcclxuY29uc3QgYWxsb3dlZEZyZXF1ZW5jaWVzID0gW1wiVHJpZ2dlcmVkXCIsIFwiU2NoZWR1bGVkXCJdO1xyXG5jb25zdCBhbGxvd2VkSW50ZXJ2YWxUeXBlcyA9IFsnRGFpbHknLCAnRGFpbHkgQnVzaW5lc3MgRGF5cycsICdXZWVrbHknLCAnQmktV2Vla2x5JywgJ01vbnRobHknLCAnU2VtaS1Nb250bHknLCAnUXVhcnRlcmx5JywgJ0FubnVhbGx5J107XHJcbmNvbnN0IGFsbG93ZWRNb250aGx5SW50ZXJ2YWxzID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ107XHJcbmNvbnN0IGFsbG93ZWRBbm51YWxseUludGVydmFscyA9IFtcIkZpcnN0IERheSBvZiB0aGUgWWVhclwiLCBcIkxhc3QgRGF5IG9mIHRoZSBZZWFyXCIsIFwiQW55IERheSBvZiB0aGUgeWVhclwiLCBcIkluIGEgUGFydGljdWxhciBNb250aFwiLCBcIkluIGEgUGFydGljdWxhciBRdWFydGVyXCIsIFwiIyBvZiBEYXlzIEZyb20gU3RhcnRcIiwgXCIjIG9mIERheXMgQmVmb3JlIGVuZFwiXTtcclxuY29uc3QgYWxsb3dlZFdlZWtseUludGVydmFscyA9IFsnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScsICdTdW5kYXknLCAnQW55J107XHJcbmNvbnN0IGFsbG93ZWRTZW1pTW9udGhseUludGVydmFscyA9IFtcIjFzdFwiLFwiMm5kXCIsIFwiM3JkXCIsIFwiNHRoXCIsIFwiNXRoXCIsXCI2dGhcIixcIjd0aFwiLFwiOHRoXCIsXCI5dGhcIixcIjEwdGhcIixcIjExdGhcIixcIjEydGhcIixcIjEzdGhcIixcIjE0dGhcIixcIjE1dGhcIl07XHJcbmNvbnN0IGFsbG93ZWRRdWFydGVybHlJbnRlcnZhbHMgPSBbXCJGaXJzdCBEYXkgb2YgdGhlIFF1YXJ0ZXJcIiwgXCJMYXN0IERheSBvZiB0aGUgUXVhcnRlclwiLCBcIiMgRGF5cyBmcm9tIFN0YXJ0XCIsIFwiIyBEYXlzIGZyb20gRW5kXCIsIFwiQW55XCIgXTtcclxuY29uc3QgdGFyZ2V0cyA9IFsnVG9kYXknLCAnU3BlY2lmaWMgRGF0ZScgXTtcclxuXHJcblxyXG4vLyBUaGlzIGlzIHRoZSBtb2RlbCBmb3IgdGhlIFByb2plY3QgY3JlYXRpb25cclxuY29uc3QgcHJvamVjdFNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIC8vX2lkOiB7dHlwZTptb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQoKTt9IH0sXHJcbiAgLy9UaGUgbmFtZSB3aWxsIGJlIHRoZSBzYW1lIGZvciBhbGwgcHJvamVjdHMgZ2VuZXJhdGVkIGZyb20gdGhlIHRlbXBsYXRlXHJcbiAgbmFtZTp7dHlwZTpTdHJpbmd9LFxyXG4gIC8vRGVzY3JpcHRpb24gaXMgdGhlICB1bmlxdWUgdmlzdWFsIGlkZW50aWZpZXMgb2YgYSBwcm9qZWN0IG9uIHRoZSBmcm9udCBlbmRcclxuICBkZXNjcmlwdGlvbjoge3R5cGU6U3RyaW5nfSxcclxuICBmcmllbmRseUlkOiB7dHlwZTogU3RyaW5nfSxcclxuICBzdGF0dXM6IHt0eXBlOiBTdHJpbmcsIGVudW06IFsnQ29tcGxldGUnLCAnSW5jb21wbGV0ZSddLCBkZWZhdWx0OiAnSW5jb21wbGV0ZSd9LFxyXG4gIHRhc2tzOiBbXHJcbiAgICAgICAge3R5cGU6IFN0cmluZyAsIHJlZjogJ1Byb2plY3RUYXNrJ31cclxuICAgICAgICAgIF0sXHJcbiAgICB0YXNrc0NvbXBsZXRlZDoge3R5cGU6IE51bWJlciwgZGVmYXVsdDogMH0sXHJcbiAgICBvdmVyZHVlOiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2V9LFxyXG4gIHNldHVwOiB7XHJcbiAgICAgIGNyZWF0ZWQ6IHt0eXBlOiBEYXRlLCBkZWZhdWx0OiBuZXcgRGF0ZSgpfSxcclxuICAgICAgdHlwZTogIHt0eXBlOiBTdHJpbmcsIGVudW06IFsnU2luZ2xlJywnVHJpZ2dlcmVkJywgJ1NjaGVkdWxlZCddfSxcclxuICAgICAgLy9QaWNrIG9uZSBvZiB0aGVzZVxyXG4gICAgICAvLyBmcmVxdWVuY3k6ICB7XHJcbiAgICAgIC8vICAgICBieURhdGU6IHt0eXBlOiBCb29sZWFufSxcclxuICAgICAgLy8gICAgIGJ5SW50ZXJ2YWw6IHt0eXBlOiBCb29sZWFufVxyXG4gICAgICAvLyB9LFxyXG4gICAgICBmcmVxdWVuY3k6ICB7dHlwZTogU3RyaW5nLCBlbnVtOiBbJ0J5IERhdGUnLCdCeSBJbnRlcnZhbCddfSxcclxuICAgICAgLy9EdWUgZGF0ZSB3aWxsIHJlcXVpcmUgZnVuY3Rpb24gYmFzZWQgb24gdXNlciBzZWxlY3Rpb24uIFdpbGwgYmUgc3RhbmQgaW4gZm9yIG5leHQgaW5zdGFuY2Ugb3Igc2VsZWN0ZWQgZGF5LlxyXG4gICAgICBkdWVEYXRlOiB7XHJcbiAgICAgICAgICBhY3R1YWw6IHt0eXBlOkRhdGUsIGRlZmF1bHQ6IG5ldyBEYXRlKCl9LFxyXG4gICAgICAgICAgYW50aWNpcGF0ZWQ6IHt0eXBlOkRhdGUsIGRlZmF1bHQ6IG5ldyBEYXRlKCl9LFxyXG4gICAgICAgICAgdGFyZ2V0OiB7dHlwZTogU3RyaW5nLCBlbnVtOiB0YXJnZXRzfVxyXG4gICAgICB9LFxyXG4gICAgICBpbnRlcnZhbCA6IHtcclxuICAgICAgICAgIHR5cGU6IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRJbnRlcnZhbFR5cGVzfSxcclxuICAgICAgICAgIHdlZWtseUludGVydmFsOiB7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkV2Vla2x5SW50ZXJ2YWxzfSxcclxuICAgICAgICAgIG1vbnRobHlJbnRlcnZhbDoge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb246IHt0eXBlOiBTdHJpbmcsIGVudW06IFtcIiMgb2YgRGF5cyBGcm9tIFN0YXJ0XCIsIFwiIyBvZiBEYXlzIEJlZm9yZSBFbmRcIiwgXCJGaXJzdCBEYXkgb2YgTW9udGhcIiwgXCJMYXN0IERheSBvZiBNb250aFwiXX0sXHJcbiAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt0eXBlOiBOdW1iZXJ9LFxyXG4gICAgICAgICAgICBmcm9tRW5kOiB7dHlwZTpOdW1iZXJ9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYW5udWFsSW50ZXJ2YWw6IHtcclxuICAgICAgICAgICAgc2VsZWN0TW9udGg6IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRNb250aGx5SW50ZXJ2YWxzfSxcclxuICAgICAgICAgICAgc2VsZWN0UXVhcnRlcjoge3R5cGU6IE51bWJlcn0sXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjogIHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRBbm51YWxseUludGVydmFsc30sXHJcbiAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt0eXBlOk51bWJlcn0sXHJcbiAgICAgICAgICAgIGZyb21FbmQ6IHt0eXBlOk51bWJlcn1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBxdWFydGVybHlJbnRlcnZhbDoge1xyXG4gICAgICAgICAgICAgIHNlbGVjdGlvbjp7dHlwZTpTdHJpbmcsIGVudW06IGFsbG93ZWRRdWFydGVybHlJbnRlcnZhbHN9LFxyXG4gICAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt0eXBlOk51bWJlcn0sXHJcbiAgICAgICAgICAgICAgZnJvbUVuZDoge3R5cGU6TnVtYmVyfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNlbWlNb250aGx5SW50ZXJ2YWw6IHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uOiB7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkU2VtaU1vbnRobHlJbnRlcnZhbHN9LFxyXG4gICAgICAgICAgICBmcm9tQmVnaW5uaW5nOiB7dHlwZTpOdW1iZXJ9LFxyXG4gICAgICAgICAgICBmcm9tRW5kOiB7dHlwZTpOdW1iZXJ9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzc29jaWF0ZWRUZW1wbGF0ZToge3R5cGU6IFN0cmluZywgcmVmOiBcIlRlbXBsYXRlXCJ9LFxyXG4gICAgICBjcml0aWNhbDoge3R5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlfSxcclxuICAgICAgcHJvamVjdFVybDoge3R5cGU6U3RyaW5nfVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vbmdvb3NlLm1vZGVsKCdQcm9qZWN0JywgcHJvamVjdFNjaGVtYSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
