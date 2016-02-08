'use strict';

/*********************
Assumptions
-all tasks will reqire a unix date/deadline of 5pm on their assigned day or next scheduled interval
-fromBeginning and fromEnd fields will require calculation based on user selection
-there can only be one instances of a scheduled project at a time. The creation of the next instances of that
 scheduled project occurs either at completion of the previous instances or at the deadline of the previous instance
-default task list sent to user includes all overdue tasks and tasks do for that day
-triggered tasks have no due date and will show until project is completed

-Template created :
    - new Template document is created in the Template Collection

Task(s) Added:
    - new TemplateTask document is created in TemplateTask collection
    - a reference to the TemplateTask is added to the Template document

Template Saved :
    -Template document is saved to the Template collection;
    -TemplateTask documents saved to the TemplateTask collection

Project Activated:
    - Function creates new Project document in the Project collections based on selected Template Schema
    - Tasks in new Project document are saved as new Task documents in the Tasks collection


Project Complete:
    - Status of Project is updated to complete
    - If project is a triggered project then nothing else happens
    - If project is a scheduled project then the app calculates the next instances of that project and...
        - Creates a new Project document in the Projects collection based on previously selected Template Schema
        - Tasks in new Project document are saved as new Task documents in the Tasks collection


At Project Deadline If....

// We need to decide how best to handle this
Project Incomplete:
    - Current Idea (temporary):
        - When deadline date hits for project, process runs to confirm if all tasks are completed.
        - If there are incomplete tasks, a copy of the project is embedded in a separate incomplete project collection.
            - This allows the system to continue tracking the incomplete project (and run stats!) while also allowing the next instances
            of a project and subseqent tasks to be instantiated.
        - Once the the incomplete project has been completed, another copy can be embedded in to the project collection.
        - DECISION PENDING: Do we keep a record of the previously incomplete project in the incomplete collection for reporting/tracking purposes,
        or do we delete the instance from the incomplete collection and add another key value to the template model that can track whether projects
        were completed on time?


Slack Actions....

Task Complete:
    - User tells bot task is finshed
    - Server parses user's message for "Completed" syntax and task ID and executes function to update task status to complete
    - Server runs function to see if all tasks in project are complete. If so, project status is updated to complete and all
      associated functions run


User Requests Task
    - User asks bot for their work
    - Server complies response object that includeds....
        - All assigned triggered tasks
        - All scheduled tasks due that day
        - All overdue scheduled tasks

        -----------------------------------------------------------------------------------------
        - USERNAME'S TASKS                                                                      -
        -                                                                                       -
        -  OVER DUE                                                                             -
        -   TASK ID - OVERDUE TASK 1 - TASK 1 ASSIGNMENT - TASK 1 STATUS                        -
        -   TASK ID - OVERDUE TASK 2 - TASK 2 ASSIGNMENT - TASK 2 STATUS                        -
        -   TASK ID - OVERDUE TASK 3 - TASK 3 ASSIGNMENT - TASK 3 STATUS                        -
        -   TASK ID - OVERDUE TASK 4 - TASK 4 ASSIGNMENT - TASK 4 STATUS                        -
        -                                                                                       -
        -  DUE TODAY                                                                            -
        -   TASK ID - DUE TODAY TASK 1 - TASK 1 ASSIGNMENT - TASK 1 STATUS                      -
        -   TASK ID - DUE TODAY TASK 2 - TASK 2 ASSIGNMENT - TASK 2 STATUS                      -
        -   TASK ID - DUE TODAY TASK 3 - TASK 3 ASSIGNMENT - TASK 3 STATUS                      -
        -   TASK ID - DUE TODAY TASK 4 - TASK 4 ASSIGNMENT - TASK 4 STATUS                      -
        -                                                                                       -
        -----------------------------------------------------------------------------------------



User Requests Project Details
    - Users asks bot for project details
        - includes some sort of project id in message body to help the server query the correct project
    - Server parses users message for pertinate details
    - Server queries db for project id &....
    - Server returns a json message to slack that includes
        -----------------------------------------------------------------------------------------
        - PROJECT TITLE                                                                         -
        - PROJECT DESCRIPTION                                           XX OF XX TASKS COMPLETE -
        -                                                                                       -
        -TASK 1 - TASK 1 ASSIGNMENT - TASK 1 STATUS                                             -
        -TASK 2 - TASK 2 ASSIGNMENT - TASK 2 STATUS                                             -
        -TASK 3 - TASK 3 ASSIGNMENT - TASK 3 STATUS                                             -
        -TASK 4 - TASK 4 ASSIGNMENT - TASK 4 STATUS                                             -
        -                                                                                       -
        -----------------------------------------------------------------------------------------

User Marks Task Complete
    - User tells bot they are done with task
        - includes some kind of task id to help the server query the correct task
    - Server updates the task to complete
    - Server checks to see if all project tasks are complete





// Tasks Assigned - Attribute on Task document dictates who the task is assigned to. An employee confirms their list with a slack call.

// Task completed - Through slack, employee updates the complete attribute from false to true once the task is completed.

**********************/

var allowedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var allowedFrequencies = ["Triggered", "Scheduled"];
var allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Montly', 'Quarterly', 'Annually'];
var allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before end"];
var allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
var allowedSemiMonthlyIntervals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th"];
var allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any"];

//This is the model for project template creation.
var Template = mongoose.model('Template', new mongoose.Schema({
  //The name will be the same for all projects generated from the template
  name: { type: String },
  //Description is the  unique visual identifies of a project on the front end
  description: { type: String },
  tasks: [{ type: String, ref: 'TemplateTask' }],
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
    dueDate: { type: Date },
    interval: {
      type: { type: String, enum: allowedIntervalTypes },
      weeklyInterval: { type: String, enum: allowedWeeklyIntervals },
      monthlyInterval: {
        selection: { type: String, enum: allowedMonthlyIntervals },
        //fromBeginning and fromEnd will require calculation based on user input but should be available in the template
        fromBeginning: {},
        fromEnd: {}
      },
      annualInterval: {
        selection: { type: String, enum: allowedAnnuallyIntervals },
        fromBeginning: {},
        fromEnd: {}
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
    intervalType: { type: String, enum: allowedIntervalTypes }
  }

}));

// This is the model for the Project creation
var Project = mongoose.model('Project', new mongoose.Schema({
  //The name will be the same for all projects generated from the template
  name: { type: String },
  //Description is the  unique visual identifies of a project on the front end
  description: { type: String },
  status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete' },
  tasks: [{ type: String, ref: 'TemplateTask' }],
  timetable: {
    frequency: { type: String, enum: ['Single', 'Triggered', 'Scheduled'] }
  },
  setup: {
    created: { type: Date, default: new Date() },
    type: { type: String, enum: ['Single', 'Triggered', 'Scheduled'] },
    //Pick one of these
    frequency: {
      byDate: { type: Boolean },
      byInterval: { type: Boolean }
    },
    frequency: { type: String, enum: ['By Date', 'By Interval'] },
    //Due date will require function based on user selection. Will be stand in for next instance or selected day.
    dueDate: { type: Date },
    interval: {
      type: { type: String, enum: allowedIntervalTypes },
      weeklyInterval: { type: String, enum: allowedWeeklyIntervals },
      monthlyInterval: {
        selection: { type: String, enum: allowedMonthlyIntervals },
        //fromBeginning and fromEnd will require calculation based on user input but should be available in the template
        fromBeginning: {},
        fromEnd: {}
      },
      annualInterval: {
        selection: { type: String, enum: allowedAnnuallyIntervals },
        fromBeginning: {},
        fromEnd: {}
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
    intervalType: { type: String, enum: allowedIntervalTypes }
  }
}));

var TemplateTask = mongoose.model('TemplateTask', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  associatedProject: { type: String, ref: 'Project' },
  date: {
    created: { type: Date, default: new Date() },
    deadline: { type: Date }
  },
  assigment: {
    departments: { type: String, ref: 'Department' },
    positions: { type: String, ref: 'Position' },
    employees: { type: String, ref: 'Employee' }
  }
}));

//Model of tasks tied to active projects. References department, position, and individual
var ProjectTask = mongoose.model('Task', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete' },
  associatedProject: { type: String, ref: 'Project' },
  date: {
    created: { type: Date, default: new Date() },
    deadline: {}
  },
  assigment: {
    departments: { type: String, ref: 'Department' },
    positions: { type: String, ref: 'Position' },
    employees: { type: String, ref: 'Employee' }
  }
}));

//Model of the company's information. References departments, positions, employees.
var Company = mongoose.model('Company', new mongoose.Schema({
  name: { type: String, required: true },
  //Availability indicates days and hours of operations for the company. This will affect the timeline of deadlines, etc.
  availability: {
    days: [{ type: String, enum: allowedDays, required: true }],
    hourOpen: { type: Number },
    hourClosed: { type: Number }
  },
  //The below three reference to the specific departments, positions, and employees within the company.
  departments: [{ type: String, ref: 'Department' }],
  positions: [{ type: String, ref: 'Position' }],
  employees: [{ type: String, ref: 'Employee' }],
  //Company-related slack information for tying the slack bot commands to the company's slack domain.
  slack: {
    team_id: { type: String },
    team_domain: { type: String },
    channels: [{
      channel_id: { type: String },
      channel_name: { type: String }
    }]
  }
}));

// Position/role employees have at the company.
var Position = mongoose.model('Position', new mongoose.Schema({
  name: { type: String, required: true },
  employees: [{ type: String, ref: 'Employee' }]
}));

//Departments within the company.
var Department = mongoose.model('Department', new mongoose.Schema({
  name: { type: String, required: true },
  employees: [{ type: String, ref: 'Employee' }]
}));

//Users are all employees of the company. NOTE: Not all users will actually have login access to the UI.
var Employee = mongoose.model('Employee', new mongoose.Schema({
  //Employee name information
  identification: {
    name: {
      firstName: { type: String },
      lastName: { type: String },
      fullName: { type: String }
    },
    //Employee's username for Authentication, reports, etc in the UI. Only for employee's who would be starting projects.
    userName: { type: String },
    //Slack handle to tie to the slack bot commands.
    slackHandle: { type: String },
    email: { type: String },
    googleId: {}
  },
  //This determines whether an employee has access. True = access to UI.
  permissions: {
    admin: { type: Boolean, default: false }
  },
  positions: [{ type: String, ref: 'Position' }],
  departments: [{ type: String, ref: 'Department' }]
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvbW9kZWxzL21vZGVsQnJhaW5zdHJvbXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9IQSxJQUFJLGNBQWMsQ0FBQyxRQUFELEVBQVUsUUFBVixFQUFtQixTQUFuQixFQUE2QixXQUE3QixFQUF5QyxVQUF6QyxFQUFvRCxRQUFwRCxFQUE2RCxVQUE3RCxDQUFkO0FBQ0osSUFBSSxxQkFBcUIsQ0FBQyxXQUFELEVBQWMsV0FBZCxDQUFyQjtBQUNKLElBQUksdUJBQXVCLENBQUMsT0FBRCxFQUFVLHFCQUFWLEVBQWlDLFFBQWpDLEVBQTJDLFdBQTNDLEVBQXdELFNBQXhELEVBQW1FLGFBQW5FLEVBQWtGLFdBQWxGLEVBQStGLFVBQS9GLENBQXZCO0FBQ0osSUFBSSwwQkFBMEIsQ0FBQyxTQUFELEVBQVksVUFBWixFQUF3QixPQUF4QixFQUFpQyxPQUFqQyxFQUEwQyxLQUExQyxFQUFpRCxNQUFqRCxFQUF5RCxNQUF6RCxFQUFpRSxRQUFqRSxFQUEyRSxXQUEzRSxFQUF3RixTQUF4RixFQUFtRyxVQUFuRyxFQUErRyxVQUEvRyxDQUExQjtBQUNKLElBQUksMkJBQTJCLENBQUMsdUJBQUQsRUFBMEIsc0JBQTFCLEVBQWtELHFCQUFsRCxFQUF5RSx1QkFBekUsRUFBa0cseUJBQWxHLEVBQTZILHNCQUE3SCxFQUFxSixzQkFBckosQ0FBM0I7QUFDSixJQUFJLHlCQUF5QixDQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLFdBQXRCLEVBQW1DLFVBQW5DLEVBQStDLFFBQS9DLEVBQXlELFVBQXpELEVBQXFFLFFBQXJFLEVBQStFLEtBQS9FLENBQXpCO0FBQ0osSUFBSSw4QkFBOEIsQ0FBQyxLQUFELEVBQU8sS0FBUCxFQUFj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RUFBMkIsSUFBSSxTQUFTLE1BQVQsQ0FBZ0I7O0FBRTVELGtCQUFnQjtBQUNkLFVBQU07QUFDSixpQkFBVyxFQUFDLE1BQU0sTUFBTixFQUFaO0FBQ0EsZ0JBQVUsRUFBQyxNQUFNLE1BQU4sRUFBWDtBQUNBLGdCQUFVLEVBQUMsTUFBTSxNQUFOLEVBQVg7S0FIRjs7QUFNQSxjQUFVLEVBQUMsTUFBTSxNQUFOLEVBQVg7O0FBRUEsaUJBQWEsRUFBQyxNQUFNLE1BQU4sRUFBZDtBQUNBLFdBQU8sRUFBQyxNQUFNLE1BQU4sRUFBUjtBQUNBLGNBQVUsRUFBVjtHQVhGOztBQWNBLGVBQWE7QUFDWCxXQUFPLEVBQUMsTUFBTSxPQUFOLEVBQWUsU0FBUyxLQUFULEVBQXZCO0dBREY7QUFHQSxhQUFVLENBQUMsRUFBQyxNQUFLLE1BQUwsRUFBYSxLQUFLLFVBQUwsRUFBZixDQUFWO0FBQ0EsZUFBYSxDQUFDLEVBQUMsTUFBSyxNQUFMLEVBQWEsS0FBSyxZQUFMLEVBQWYsQ0FBYjtDQXBCd0MsQ0FBM0IsQ0FBWCIsImZpbGUiOiJzZXJ2ZXJfYXNzZXRzL21vZGVscy9tb2RlbEJyYWluc3Ryb21zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKlxyXG5Bc3N1bXB0aW9uc1xyXG4tYWxsIHRhc2tzIHdpbGwgcmVxaXJlIGEgdW5peCBkYXRlL2RlYWRsaW5lIG9mIDVwbSBvbiB0aGVpciBhc3NpZ25lZCBkYXkgb3IgbmV4dCBzY2hlZHVsZWQgaW50ZXJ2YWxcclxuLWZyb21CZWdpbm5pbmcgYW5kIGZyb21FbmQgZmllbGRzIHdpbGwgcmVxdWlyZSBjYWxjdWxhdGlvbiBiYXNlZCBvbiB1c2VyIHNlbGVjdGlvblxyXG4tdGhlcmUgY2FuIG9ubHkgYmUgb25lIGluc3RhbmNlcyBvZiBhIHNjaGVkdWxlZCBwcm9qZWN0IGF0IGEgdGltZS4gVGhlIGNyZWF0aW9uIG9mIHRoZSBuZXh0IGluc3RhbmNlcyBvZiB0aGF0XHJcbiBzY2hlZHVsZWQgcHJvamVjdCBvY2N1cnMgZWl0aGVyIGF0IGNvbXBsZXRpb24gb2YgdGhlIHByZXZpb3VzIGluc3RhbmNlcyBvciBhdCB0aGUgZGVhZGxpbmUgb2YgdGhlIHByZXZpb3VzIGluc3RhbmNlXHJcbi1kZWZhdWx0IHRhc2sgbGlzdCBzZW50IHRvIHVzZXIgaW5jbHVkZXMgYWxsIG92ZXJkdWUgdGFza3MgYW5kIHRhc2tzIGRvIGZvciB0aGF0IGRheVxyXG4tdHJpZ2dlcmVkIHRhc2tzIGhhdmUgbm8gZHVlIGRhdGUgYW5kIHdpbGwgc2hvdyB1bnRpbCBwcm9qZWN0IGlzIGNvbXBsZXRlZFxyXG5cclxuLVRlbXBsYXRlIGNyZWF0ZWQgOlxyXG4gICAgLSBuZXcgVGVtcGxhdGUgZG9jdW1lbnQgaXMgY3JlYXRlZCBpbiB0aGUgVGVtcGxhdGUgQ29sbGVjdGlvblxyXG5cclxuVGFzayhzKSBBZGRlZDpcclxuICAgIC0gbmV3IFRlbXBsYXRlVGFzayBkb2N1bWVudCBpcyBjcmVhdGVkIGluIFRlbXBsYXRlVGFzayBjb2xsZWN0aW9uXHJcbiAgICAtIGEgcmVmZXJlbmNlIHRvIHRoZSBUZW1wbGF0ZVRhc2sgaXMgYWRkZWQgdG8gdGhlIFRlbXBsYXRlIGRvY3VtZW50XHJcblxyXG5UZW1wbGF0ZSBTYXZlZCA6XHJcbiAgICAtVGVtcGxhdGUgZG9jdW1lbnQgaXMgc2F2ZWQgdG8gdGhlIFRlbXBsYXRlIGNvbGxlY3Rpb247XHJcbiAgICAtVGVtcGxhdGVUYXNrIGRvY3VtZW50cyBzYXZlZCB0byB0aGUgVGVtcGxhdGVUYXNrIGNvbGxlY3Rpb25cclxuXHJcblByb2plY3QgQWN0aXZhdGVkOlxyXG4gICAgLSBGdW5jdGlvbiBjcmVhdGVzIG5ldyBQcm9qZWN0IGRvY3VtZW50IGluIHRoZSBQcm9qZWN0IGNvbGxlY3Rpb25zIGJhc2VkIG9uIHNlbGVjdGVkIFRlbXBsYXRlIFNjaGVtYVxyXG4gICAgLSBUYXNrcyBpbiBuZXcgUHJvamVjdCBkb2N1bWVudCBhcmUgc2F2ZWQgYXMgbmV3IFRhc2sgZG9jdW1lbnRzIGluIHRoZSBUYXNrcyBjb2xsZWN0aW9uXHJcblxyXG5cclxuUHJvamVjdCBDb21wbGV0ZTpcclxuICAgIC0gU3RhdHVzIG9mIFByb2plY3QgaXMgdXBkYXRlZCB0byBjb21wbGV0ZVxyXG4gICAgLSBJZiBwcm9qZWN0IGlzIGEgdHJpZ2dlcmVkIHByb2plY3QgdGhlbiBub3RoaW5nIGVsc2UgaGFwcGVuc1xyXG4gICAgLSBJZiBwcm9qZWN0IGlzIGEgc2NoZWR1bGVkIHByb2plY3QgdGhlbiB0aGUgYXBwIGNhbGN1bGF0ZXMgdGhlIG5leHQgaW5zdGFuY2VzIG9mIHRoYXQgcHJvamVjdCBhbmQuLi5cclxuICAgICAgICAtIENyZWF0ZXMgYSBuZXcgUHJvamVjdCBkb2N1bWVudCBpbiB0aGUgUHJvamVjdHMgY29sbGVjdGlvbiBiYXNlZCBvbiBwcmV2aW91c2x5IHNlbGVjdGVkIFRlbXBsYXRlIFNjaGVtYVxyXG4gICAgICAgIC0gVGFza3MgaW4gbmV3IFByb2plY3QgZG9jdW1lbnQgYXJlIHNhdmVkIGFzIG5ldyBUYXNrIGRvY3VtZW50cyBpbiB0aGUgVGFza3MgY29sbGVjdGlvblxyXG5cclxuXHJcbkF0IFByb2plY3QgRGVhZGxpbmUgSWYuLi4uXHJcblxyXG4vLyBXZSBuZWVkIHRvIGRlY2lkZSBob3cgYmVzdCB0byBoYW5kbGUgdGhpc1xyXG5Qcm9qZWN0IEluY29tcGxldGU6XHJcbiAgICAtIEN1cnJlbnQgSWRlYSAodGVtcG9yYXJ5KTpcclxuICAgICAgICAtIFdoZW4gZGVhZGxpbmUgZGF0ZSBoaXRzIGZvciBwcm9qZWN0LCBwcm9jZXNzIHJ1bnMgdG8gY29uZmlybSBpZiBhbGwgdGFza3MgYXJlIGNvbXBsZXRlZC5cclxuICAgICAgICAtIElmIHRoZXJlIGFyZSBpbmNvbXBsZXRlIHRhc2tzLCBhIGNvcHkgb2YgdGhlIHByb2plY3QgaXMgZW1iZWRkZWQgaW4gYSBzZXBhcmF0ZSBpbmNvbXBsZXRlIHByb2plY3QgY29sbGVjdGlvbi5cclxuICAgICAgICAgICAgLSBUaGlzIGFsbG93cyB0aGUgc3lzdGVtIHRvIGNvbnRpbnVlIHRyYWNraW5nIHRoZSBpbmNvbXBsZXRlIHByb2plY3QgKGFuZCBydW4gc3RhdHMhKSB3aGlsZSBhbHNvIGFsbG93aW5nIHRoZSBuZXh0IGluc3RhbmNlc1xyXG4gICAgICAgICAgICBvZiBhIHByb2plY3QgYW5kIHN1YnNlcWVudCB0YXNrcyB0byBiZSBpbnN0YW50aWF0ZWQuXHJcbiAgICAgICAgLSBPbmNlIHRoZSB0aGUgaW5jb21wbGV0ZSBwcm9qZWN0IGhhcyBiZWVuIGNvbXBsZXRlZCwgYW5vdGhlciBjb3B5IGNhbiBiZSBlbWJlZGRlZCBpbiB0byB0aGUgcHJvamVjdCBjb2xsZWN0aW9uLlxyXG4gICAgICAgIC0gREVDSVNJT04gUEVORElORzogRG8gd2Uga2VlcCBhIHJlY29yZCBvZiB0aGUgcHJldmlvdXNseSBpbmNvbXBsZXRlIHByb2plY3QgaW4gdGhlIGluY29tcGxldGUgY29sbGVjdGlvbiBmb3IgcmVwb3J0aW5nL3RyYWNraW5nIHB1cnBvc2VzLFxyXG4gICAgICAgIG9yIGRvIHdlIGRlbGV0ZSB0aGUgaW5zdGFuY2UgZnJvbSB0aGUgaW5jb21wbGV0ZSBjb2xsZWN0aW9uIGFuZCBhZGQgYW5vdGhlciBrZXkgdmFsdWUgdG8gdGhlIHRlbXBsYXRlIG1vZGVsIHRoYXQgY2FuIHRyYWNrIHdoZXRoZXIgcHJvamVjdHNcclxuICAgICAgICB3ZXJlIGNvbXBsZXRlZCBvbiB0aW1lP1xyXG5cclxuXHJcblNsYWNrIEFjdGlvbnMuLi4uXHJcblxyXG5UYXNrIENvbXBsZXRlOlxyXG4gICAgLSBVc2VyIHRlbGxzIGJvdCB0YXNrIGlzIGZpbnNoZWRcclxuICAgIC0gU2VydmVyIHBhcnNlcyB1c2VyJ3MgbWVzc2FnZSBmb3IgXCJDb21wbGV0ZWRcIiBzeW50YXggYW5kIHRhc2sgSUQgYW5kIGV4ZWN1dGVzIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0YXNrIHN0YXR1cyB0byBjb21wbGV0ZVxyXG4gICAgLSBTZXJ2ZXIgcnVucyBmdW5jdGlvbiB0byBzZWUgaWYgYWxsIHRhc2tzIGluIHByb2plY3QgYXJlIGNvbXBsZXRlLiBJZiBzbywgcHJvamVjdCBzdGF0dXMgaXMgdXBkYXRlZCB0byBjb21wbGV0ZSBhbmQgYWxsXHJcbiAgICAgIGFzc29jaWF0ZWQgZnVuY3Rpb25zIHJ1blxyXG5cclxuXHJcblVzZXIgUmVxdWVzdHMgVGFza1xyXG4gICAgLSBVc2VyIGFza3MgYm90IGZvciB0aGVpciB3b3JrXHJcbiAgICAtIFNlcnZlciBjb21wbGllcyByZXNwb25zZSBvYmplY3QgdGhhdCBpbmNsdWRlZHMuLi4uXHJcbiAgICAgICAgLSBBbGwgYXNzaWduZWQgdHJpZ2dlcmVkIHRhc2tzXHJcbiAgICAgICAgLSBBbGwgc2NoZWR1bGVkIHRhc2tzIGR1ZSB0aGF0IGRheVxyXG4gICAgICAgIC0gQWxsIG92ZXJkdWUgc2NoZWR1bGVkIHRhc2tzXHJcblxyXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLSBVU0VSTkFNRSdTIFRBU0tTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cclxuICAgICAgICAtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLVxyXG4gICAgICAgIC0gIE9WRVIgRFVFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgLSAgIFRBU0sgSUQgLSBPVkVSRFVFIFRBU0sgMSAtIFRBU0sgMSBBU1NJR05NRU5UIC0gVEFTSyAxIFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAgIC1cclxuICAgICAgICAtICAgVEFTSyBJRCAtIE9WRVJEVUUgVEFTSyAyIC0gVEFTSyAyIEFTU0lHTk1FTlQgLSBUQVNLIDIgU1RBVFVTICAgICAgICAgICAgICAgICAgICAgICAgLVxyXG4gICAgICAgIC0gICBUQVNLIElEIC0gT1ZFUkRVRSBUQVNLIDMgLSBUQVNLIDMgQVNTSUdOTUVOVCAtIFRBU0sgMyBTVEFUVVMgICAgICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgLSAgIFRBU0sgSUQgLSBPVkVSRFVFIFRBU0sgNCAtIFRBU0sgNCBBU1NJR05NRU5UIC0gVEFTSyA0IFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAgIC1cclxuICAgICAgICAtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLVxyXG4gICAgICAgIC0gIERVRSBUT0RBWSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgLSAgIFRBU0sgSUQgLSBEVUUgVE9EQVkgVEFTSyAxIC0gVEFTSyAxIEFTU0lHTk1FTlQgLSBUQVNLIDEgU1RBVFVTICAgICAgICAgICAgICAgICAgICAgIC1cclxuICAgICAgICAtICAgVEFTSyBJRCAtIERVRSBUT0RBWSBUQVNLIDIgLSBUQVNLIDIgQVNTSUdOTUVOVCAtIFRBU0sgMiBTVEFUVVMgICAgICAgICAgICAgICAgICAgICAgLVxyXG4gICAgICAgIC0gICBUQVNLIElEIC0gRFVFIFRPREFZIFRBU0sgMyAtIFRBU0sgMyBBU1NJR05NRU5UIC0gVEFTSyAzIFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgLSAgIFRBU0sgSUQgLSBEVUUgVE9EQVkgVEFTSyA0IC0gVEFTSyA0IEFTU0lHTk1FTlQgLSBUQVNLIDQgU1RBVFVTICAgICAgICAgICAgICAgICAgICAgIC1cclxuICAgICAgICAtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLVxyXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuXHJcblVzZXIgUmVxdWVzdHMgUHJvamVjdCBEZXRhaWxzXHJcbiAgICAtIFVzZXJzIGFza3MgYm90IGZvciBwcm9qZWN0IGRldGFpbHNcclxuICAgICAgICAtIGluY2x1ZGVzIHNvbWUgc29ydCBvZiBwcm9qZWN0IGlkIGluIG1lc3NhZ2UgYm9keSB0byBoZWxwIHRoZSBzZXJ2ZXIgcXVlcnkgdGhlIGNvcnJlY3QgcHJvamVjdFxyXG4gICAgLSBTZXJ2ZXIgcGFyc2VzIHVzZXJzIG1lc3NhZ2UgZm9yIHBlcnRpbmF0ZSBkZXRhaWxzXHJcbiAgICAtIFNlcnZlciBxdWVyaWVzIGRiIGZvciBwcm9qZWN0IGlkICYuLi4uXHJcbiAgICAtIFNlcnZlciByZXR1cm5zIGEganNvbiBtZXNzYWdlIHRvIHNsYWNrIHRoYXQgaW5jbHVkZXNcclxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC0gUFJPSkVDVCBUSVRMRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgLSBQUk9KRUNUIERFU0NSSVBUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFhYIE9GIFhYIFRBU0tTIENPTVBMRVRFIC1cclxuICAgICAgICAtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLVxyXG4gICAgICAgIC1UQVNLIDEgLSBUQVNLIDEgQVNTSUdOTUVOVCAtIFRBU0sgMSBTVEFUVVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgLVRBU0sgMiAtIFRBU0sgMiBBU1NJR05NRU5UIC0gVEFTSyAyIFNUQVRVUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cclxuICAgICAgICAtVEFTSyAzIC0gVEFTSyAzIEFTU0lHTk1FTlQgLSBUQVNLIDMgU1RBVFVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLVxyXG4gICAgICAgIC1UQVNLIDQgLSBUQVNLIDQgQVNTSUdOTUVOVCAtIFRBU0sgNCBTVEFUVVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtXHJcbiAgICAgICAgLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1cclxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuVXNlciBNYXJrcyBUYXNrIENvbXBsZXRlXHJcbiAgICAtIFVzZXIgdGVsbHMgYm90IHRoZXkgYXJlIGRvbmUgd2l0aCB0YXNrXHJcbiAgICAgICAgLSBpbmNsdWRlcyBzb21lIGtpbmQgb2YgdGFzayBpZCB0byBoZWxwIHRoZSBzZXJ2ZXIgcXVlcnkgdGhlIGNvcnJlY3QgdGFza1xyXG4gICAgLSBTZXJ2ZXIgdXBkYXRlcyB0aGUgdGFzayB0byBjb21wbGV0ZVxyXG4gICAgLSBTZXJ2ZXIgY2hlY2tzIHRvIHNlZSBpZiBhbGwgcHJvamVjdCB0YXNrcyBhcmUgY29tcGxldGVcclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyBUYXNrcyBBc3NpZ25lZCAtIEF0dHJpYnV0ZSBvbiBUYXNrIGRvY3VtZW50IGRpY3RhdGVzIHdobyB0aGUgdGFzayBpcyBhc3NpZ25lZCB0by4gQW4gZW1wbG95ZWUgY29uZmlybXMgdGhlaXIgbGlzdCB3aXRoIGEgc2xhY2sgY2FsbC5cclxuXHJcbi8vIFRhc2sgY29tcGxldGVkIC0gVGhyb3VnaCBzbGFjaywgZW1wbG95ZWUgdXBkYXRlcyB0aGUgY29tcGxldGUgYXR0cmlidXRlIGZyb20gZmFsc2UgdG8gdHJ1ZSBvbmNlIHRoZSB0YXNrIGlzIGNvbXBsZXRlZC5cclxuXHJcbioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgYWxsb3dlZERheXMgPSBbJ1N1bmRheScsJ01vbmRheScsJ1R1ZXNkYXknLCdXZWRuZXNkYXknLCdUaHVyc2RheScsJ0ZyaWRheScsJ1NhdHVyZGF5J107XHJcbnZhciBhbGxvd2VkRnJlcXVlbmNpZXMgPSBbXCJUcmlnZ2VyZWRcIiwgXCJTY2hlZHVsZWRcIl07XHJcbnZhciBhbGxvd2VkSW50ZXJ2YWxUeXBlcyA9IFsnRGFpbHknLCAnRGFpbHkgQnVzaW5lc3MgRGF5cycsICdXZWVrbHknLCAnQmktV2Vla2x5JywgJ01vbnRobHknLCAnU2VtaS1Nb250bHknLCAnUXVhcnRlcmx5JywgJ0FubnVhbGx5J107XHJcbnZhciBhbGxvd2VkTW9udGhseUludGVydmFscyA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xyXG52YXIgYWxsb3dlZEFubnVhbGx5SW50ZXJ2YWxzID0gW1wiRmlyc3QgRGF5IG9mIHRoZSBZZWFyXCIsIFwiTGFzdCBEYXkgb2YgdGhlIFllYXJcIiwgXCJBbnkgRGF5IG9mIHRoZSB5ZWFyXCIsIFwiSW4gYSBQYXJ0aWN1bGFyIE1vbnRoXCIsIFwiSW4gYSBQYXJ0aWN1bGFyIFF1YXJ0ZXJcIiwgXCIjIG9mIERheXMgRnJvbSBTdGFydFwiLCBcIiMgb2YgRGF5cyBCZWZvcmUgZW5kXCJdO1xyXG52YXIgYWxsb3dlZFdlZWtseUludGVydmFscyA9IFsnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScsICdTdW5kYXknLCAnQW55J107XHJcbnZhciBhbGxvd2VkU2VtaU1vbnRobHlJbnRlcnZhbHMgPSBbXCIxc3RcIixcIjJuZFwiLCBcIjNyZFwiLCBcIjR0aFwiLCBcIjV0aFwiLFwiNnRoXCIsXCI3dGhcIixcIjh0aFwiLFwiOXRoXCIsXCIxMHRoXCIsXCIxMXRoXCIsXCIxMnRoXCIsXCIxM3RoXCIsXCIxNHRoXCIsXCIxNXRoXCJdO1xyXG52YXIgYWxsb3dlZFF1YXJ0ZXJseUludGVydmFscyA9IFtcIkZpcnN0IERheSBvZiB0aGUgUXVhcnRlclwiLCBcIkxhc3QgRGF5IG9mIHRoZSBRdWFydGVyXCIsIFwiIyBEYXlzIGZyb20gU3RhcnRcIiwgXCIjIERheXMgZnJvbSBFbmRcIiwgXCJBbnlcIiBdO1xyXG5cclxuLy9UaGlzIGlzIHRoZSBtb2RlbCBmb3IgcHJvamVjdCB0ZW1wbGF0ZSBjcmVhdGlvbi5cclxudmFyIFRlbXBsYXRlID0gbW9uZ29vc2UubW9kZWwoJ1RlbXBsYXRlJywgbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgLy9UaGUgbmFtZSB3aWxsIGJlIHRoZSBzYW1lIGZvciBhbGwgcHJvamVjdHMgZ2VuZXJhdGVkIGZyb20gdGhlIHRlbXBsYXRlXHJcbiAgbmFtZTp7dHlwZTpTdHJpbmd9LFxyXG4gIC8vRGVzY3JpcHRpb24gaXMgdGhlICB1bmlxdWUgdmlzdWFsIGlkZW50aWZpZXMgb2YgYSBwcm9qZWN0IG9uIHRoZSBmcm9udCBlbmRcclxuICBkZXNjcmlwdGlvbjoge3R5cGU6U3RyaW5nfSxcclxuICB0YXNrczogW1xyXG4gICAgICAgIHt0eXBlOiBTdHJpbmcgLCByZWY6ICdUZW1wbGF0ZVRhc2snfVxyXG4gICAgICAgICAgXSxcclxuICBzZXR1cDoge1xyXG4gICAgICBjcmVhdGVkOiB7dHlwZTogRGF0ZSwgZGVmYXVsdDogbmV3IERhdGUoKX0sXHJcbiAgICAgIHR5cGU6ICB7dHlwZTogU3RyaW5nLCBlbnVtOiBbJ1NpbmdsZScsJ1RyaWdnZXJlZCcsICdTY2hlZHVsZWQnXX0sXHJcbiAgICAgIC8vUGljayBvbmUgb2YgdGhlc2UgdHdvIGZyZXF1ZW5jeSBvcHRpb25zXHJcbiAgICAgIC8vIGZyZXF1ZW5jeTogIHtcclxuICAgICAgLy8gICAgIGJ5RGF0ZToge3R5cGU6IEJvb2xlYW59LFxyXG4gICAgICAvLyAgICAgYnlJbnRlcnZhbDoge3R5cGU6IEJvb2xlYW59XHJcbiAgICAgIC8vIH0sXHJcbiAgICAgIGZyZXF1ZW5jeTogIHt0eXBlOiBTdHJpbmcsIGVudW06IFsnQnkgRGF0ZScsJ0J5IEludGVydmFsJ119LFxyXG4gICAgICAvL0R1ZSBkYXRlIHdpbGwgcmVxdWlyZSBmdW5jdGlvbiBiYXNlZCBvbiB1c2VyIHNlbGVjdGlvbi4gV2lsbCBiZSBzdGFuZCBpbiBmb3IgbmV4dCBpbnN0YW5jZSBvciBzZWxlY3RlZCBkYXkuXHJcbiAgICAgIGR1ZURhdGU6IHt0eXBlOkRhdGV9LFxyXG4gICAgICBpbnRlcnZhbCA6IHtcclxuICAgICAgICAgIHR5cGU6IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRJbnRlcnZhbFR5cGVzfSxcclxuICAgICAgICAgIHdlZWtseUludGVydmFsOiB7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkV2Vla2x5SW50ZXJ2YWxzfSxcclxuICAgICAgICAgIG1vbnRobHlJbnRlcnZhbDoge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb246IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRNb250aGx5SW50ZXJ2YWxzfSxcclxuICAgICAgICAgICAgLy9mcm9tQmVnaW5uaW5nIGFuZCBmcm9tRW5kIHdpbGwgcmVxdWlyZSBjYWxjdWxhdGlvbiBiYXNlZCBvbiB1c2VyIGlucHV0IGJ1dCBzaG91bGQgYmUgYXZhaWxhYmxlIGluIHRoZSB0ZW1wbGF0ZVxyXG4gICAgICAgICAgICBmcm9tQmVnaW5uaW5nOiB7fSxcclxuICAgICAgICAgICAgZnJvbUVuZDoge31cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBhbm51YWxJbnRlcnZhbDoge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb246ICB7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkQW5udWFsbHlJbnRlcnZhbHN9LFxyXG4gICAgICAgICAgICBmcm9tQmVnaW5uaW5nOiB7fSxcclxuICAgICAgICAgICAgZnJvbUVuZDoge31cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBxdWFydGVybHlJbnRlcnZhbDoge1xyXG4gICAgICAgICAgICAgIHNlbGVjdGlvbjp7dHlwZTpTdHJpbmcsIGVudW06IGFsbG93ZWRRdWFydGVybHlJbnRlcnZhbHN9LFxyXG4gICAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt9LFxyXG4gICAgICAgICAgICAgIGZyb21FbmQ6IHt9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2VtaU1vbnRobHlJbnRlcnZhbDoge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb246IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRTZW1pTW9udGhseUludGVydmFsc30sXHJcbiAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt9LFxyXG4gICAgICAgICAgICBmcm9tRW5kOiB7fVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBpbnRlcnZhbFR5cGU6IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRJbnRlcnZhbFR5cGVzfVxyXG4gIH1cclxuXHJcbn0pKTtcclxuXHJcbi8vIFRoaXMgaXMgdGhlIG1vZGVsIGZvciB0aGUgUHJvamVjdCBjcmVhdGlvblxyXG52YXIgUHJvamVjdCA9IG1vbmdvb3NlLm1vZGVsKCdQcm9qZWN0JywgbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgLy9UaGUgbmFtZSB3aWxsIGJlIHRoZSBzYW1lIGZvciBhbGwgcHJvamVjdHMgZ2VuZXJhdGVkIGZyb20gdGhlIHRlbXBsYXRlXHJcbiAgbmFtZTp7dHlwZTpTdHJpbmd9LFxyXG4gIC8vRGVzY3JpcHRpb24gaXMgdGhlICB1bmlxdWUgdmlzdWFsIGlkZW50aWZpZXMgb2YgYSBwcm9qZWN0IG9uIHRoZSBmcm9udCBlbmRcclxuICBkZXNjcmlwdGlvbjoge3R5cGU6U3RyaW5nfSxcclxuICBzdGF0dXM6IHt0eXBlOiBTdHJpbmcsIGVudW06IFsnQ29tcGxldGUnLCAnSW5jb21wbGV0ZSddLCBkZWZhdWx0OiAnSW5jb21wbGV0ZSd9LFxyXG4gIHRhc2tzOiBbXHJcbiAgICAgICAge3R5cGU6IFN0cmluZyAsIHJlZjogJ1RlbXBsYXRlVGFzayd9XHJcbiAgICAgICAgICBdLFxyXG4gIHRpbWV0YWJsZToge1xyXG4gICAgZnJlcXVlbmN5OiB7dHlwZTogU3RyaW5nLCBlbnVtOiBbJ1NpbmdsZScsJ1RyaWdnZXJlZCcsICdTY2hlZHVsZWQnXX0sXHJcbiAgfSxcclxuICBzZXR1cDoge1xyXG4gICAgICBjcmVhdGVkOiB7dHlwZTogRGF0ZSwgZGVmYXVsdDogbmV3IERhdGUoKX0sXHJcbiAgICAgIHR5cGU6ICB7dHlwZTogU3RyaW5nLCBlbnVtOiBbJ1NpbmdsZScsJ1RyaWdnZXJlZCcsICdTY2hlZHVsZWQnXX0sXHJcbiAgICAgIC8vUGljayBvbmUgb2YgdGhlc2VcclxuICAgICAgZnJlcXVlbmN5OiAge1xyXG4gICAgICAgICAgYnlEYXRlOiB7dHlwZTogQm9vbGVhbn0sXHJcbiAgICAgICAgICBieUludGVydmFsOiB7dHlwZTogQm9vbGVhbn1cclxuICAgICAgfSxcclxuICAgICAgZnJlcXVlbmN5OiAge3R5cGU6IFN0cmluZywgZW51bTogWydCeSBEYXRlJywnQnkgSW50ZXJ2YWwnXX0sXHJcbiAgICAgIC8vRHVlIGRhdGUgd2lsbCByZXF1aXJlIGZ1bmN0aW9uIGJhc2VkIG9uIHVzZXIgc2VsZWN0aW9uLiBXaWxsIGJlIHN0YW5kIGluIGZvciBuZXh0IGluc3RhbmNlIG9yIHNlbGVjdGVkIGRheS5cclxuICAgICAgZHVlRGF0ZToge3R5cGU6RGF0ZX0sXHJcbiAgICAgIGludGVydmFsIDoge1xyXG4gICAgICAgICAgdHlwZToge3R5cGU6IFN0cmluZywgZW51bTogYWxsb3dlZEludGVydmFsVHlwZXN9LFxyXG4gICAgICAgICAgd2Vla2x5SW50ZXJ2YWw6IHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRXZWVrbHlJbnRlcnZhbHN9LFxyXG4gICAgICAgICAgbW9udGhseUludGVydmFsOiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjoge3R5cGU6IFN0cmluZywgZW51bTogYWxsb3dlZE1vbnRobHlJbnRlcnZhbHN9LFxyXG4gICAgICAgICAgICAvL2Zyb21CZWdpbm5pbmcgYW5kIGZyb21FbmQgd2lsbCByZXF1aXJlIGNhbGN1bGF0aW9uIGJhc2VkIG9uIHVzZXIgaW5wdXQgYnV0IHNob3VsZCBiZSBhdmFpbGFibGUgaW4gdGhlIHRlbXBsYXRlXHJcbiAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt9LFxyXG4gICAgICAgICAgICBmcm9tRW5kOiB7fVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGFubnVhbEludGVydmFsOiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjogIHt0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWRBbm51YWxseUludGVydmFsc30sXHJcbiAgICAgICAgICAgIGZyb21CZWdpbm5pbmc6IHt9LFxyXG4gICAgICAgICAgICBmcm9tRW5kOiB7fVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHF1YXJ0ZXJseUludGVydmFsOiB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0aW9uOnt0eXBlOlN0cmluZywgZW51bTogYWxsb3dlZFF1YXJ0ZXJseUludGVydmFsc30sXHJcbiAgICAgICAgICAgICAgZnJvbUJlZ2lubmluZzoge30sXHJcbiAgICAgICAgICAgICAgZnJvbUVuZDoge31cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzZW1pTW9udGhseUludGVydmFsOiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjoge3R5cGU6IFN0cmluZywgZW51bTogYWxsb3dlZFNlbWlNb250aGx5SW50ZXJ2YWxzfSxcclxuICAgICAgICAgICAgZnJvbUJlZ2lubmluZzoge30sXHJcbiAgICAgICAgICAgIGZyb21FbmQ6IHt9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGludGVydmFsVHlwZToge3R5cGU6IFN0cmluZywgZW51bTogYWxsb3dlZEludGVydmFsVHlwZXN9XHJcbiAgfVxyXG59KSk7XHJcblxyXG52YXIgVGVtcGxhdGVUYXNrID0gbW9uZ29vc2UubW9kZWwoJ1RlbXBsYXRlVGFzaycsIG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIG5hbWU6IHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcclxuICBkZXNjcmlwdGlvbjoge3R5cGU6IFN0cmluZ30sXHJcbiAgYXNzb2NpYXRlZFByb2plY3QgOiB7dHlwZTpTdHJpbmcsIHJlZjonUHJvamVjdCd9LFxyXG4gIGRhdGU6IHtcclxuICAgIGNyZWF0ZWQ6IHt0eXBlOiBEYXRlLCBkZWZhdWx0OiBuZXcgRGF0ZSgpfSxcclxuICAgIGRlYWRsaW5lOiB7dHlwZTogRGF0ZX0sXHJcbiAgfSxcclxuICBhc3NpZ21lbnQ6IHtcclxuICAgICAgZGVwYXJ0bWVudHM6IHt0eXBlOlN0cmluZywgcmVmOiAnRGVwYXJ0bWVudCd9LFxyXG4gICAgICBwb3NpdGlvbnM6IHt0eXBlOlN0cmluZywgcmVmOiAnUG9zaXRpb24nfSxcclxuICAgICAgZW1wbG95ZWVzOiB7dHlwZTpTdHJpbmcsIHJlZjogJ0VtcGxveWVlJ31cclxuICB9XHJcbn0pKTtcclxuXHJcbi8vTW9kZWwgb2YgdGFza3MgdGllZCB0byBhY3RpdmUgcHJvamVjdHMuIFJlZmVyZW5jZXMgZGVwYXJ0bWVudCwgcG9zaXRpb24sIGFuZCBpbmRpdmlkdWFsXHJcbnZhciBQcm9qZWN0VGFzayA9IG1vbmdvb3NlLm1vZGVsKCdUYXNrJywgbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgbmFtZToge3R5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWV9LFxyXG4gIGRlc2NyaXB0aW9uOiB7dHlwZTpTdHJpbmd9LFxyXG4gIHN0YXR1czoge3R5cGU6IFN0cmluZywgZW51bTogWydDb21wbGV0ZScsICdJbmNvbXBsZXRlJ10sIGRlZmF1bHQ6ICdJbmNvbXBsZXRlJ30sXHJcbiAgYXNzb2NpYXRlZFByb2plY3QgOiB7dHlwZTpTdHJpbmcsIHJlZjonUHJvamVjdCd9LFxyXG4gIGRhdGU6IHtcclxuICAgIGNyZWF0ZWQ6IHt0eXBlOiBEYXRlLCBkZWZhdWx0OiBuZXcgRGF0ZSgpfSxcclxuICAgIGRlYWRsaW5lOiB7fSxcclxuICB9LFxyXG4gIGFzc2lnbWVudDoge1xyXG4gICAgICBkZXBhcnRtZW50czoge3R5cGU6U3RyaW5nLCByZWY6ICdEZXBhcnRtZW50J30sXHJcbiAgICAgIHBvc2l0aW9uczoge3R5cGU6U3RyaW5nLCByZWY6ICdQb3NpdGlvbid9LFxyXG4gICAgICBlbXBsb3llZXM6IHt0eXBlOlN0cmluZywgcmVmOiAnRW1wbG95ZWUnfVxyXG4gIH1cclxufSkpO1xyXG5cclxuLy9Nb2RlbCBvZiB0aGUgY29tcGFueSdzIGluZm9ybWF0aW9uLiBSZWZlcmVuY2VzIGRlcGFydG1lbnRzLCBwb3NpdGlvbnMsIGVtcGxveWVlcy5cclxudmFyIENvbXBhbnkgPSBtb25nb29zZS5tb2RlbCgnQ29tcGFueScsIG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIG5hbWU6IHt0eXBlOlN0cmluZywgcmVxdWlyZWQ6dHJ1ZX0sXHJcbiAgLy9BdmFpbGFiaWxpdHkgaW5kaWNhdGVzIGRheXMgYW5kIGhvdXJzIG9mIG9wZXJhdGlvbnMgZm9yIHRoZSBjb21wYW55LiBUaGlzIHdpbGwgYWZmZWN0IHRoZSB0aW1lbGluZSBvZiBkZWFkbGluZXMsIGV0Yy5cclxuICBhdmFpbGFiaWxpdHk6IHtcclxuICAgIGRheXM6IFt7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkRGF5cywgcmVxdWlyZWQ6IHRydWV9XSxcclxuICAgIGhvdXJPcGVuOiB7dHlwZTogTnVtYmVyfSxcclxuICAgIGhvdXJDbG9zZWQ6IHt0eXBlOiBOdW1iZXJ9XHJcbiAgfSxcclxuICAvL1RoZSBiZWxvdyB0aHJlZSByZWZlcmVuY2UgdG8gdGhlIHNwZWNpZmljIGRlcGFydG1lbnRzLCBwb3NpdGlvbnMsIGFuZCBlbXBsb3llZXMgd2l0aGluIHRoZSBjb21wYW55LlxyXG4gIGRlcGFydG1lbnRzOiBbe3R5cGU6IFN0cmluZywgcmVmOiAnRGVwYXJ0bWVudCd9XSxcclxuICBwb3NpdGlvbnM6IFt7dHlwZTogU3RyaW5nLCByZWY6ICdQb3NpdGlvbid9XSxcclxuICBlbXBsb3llZXMgOiBbe3R5cGU6IFN0cmluZywgcmVmOiAnRW1wbG95ZWUnfV0sXHJcbiAgLy9Db21wYW55LXJlbGF0ZWQgc2xhY2sgaW5mb3JtYXRpb24gZm9yIHR5aW5nIHRoZSBzbGFjayBib3QgY29tbWFuZHMgdG8gdGhlIGNvbXBhbnkncyBzbGFjayBkb21haW4uXHJcbiAgc2xhY2s6IHtcclxuICAgIHRlYW1faWQ6IHt0eXBlOlN0cmluZ30sXHJcbiAgICB0ZWFtX2RvbWFpbjoge3R5cGU6U3RyaW5nfSxcclxuICAgIGNoYW5uZWxzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBjaGFubmVsX2lkOiB7dHlwZTpTdHJpbmd9LFxyXG4gICAgICAgIGNoYW5uZWxfbmFtZToge3R5cGUgOlN0cmluZ31cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxufSkpO1xyXG5cclxuXHJcbi8vIFBvc2l0aW9uL3JvbGUgZW1wbG95ZWVzIGhhdmUgYXQgdGhlIGNvbXBhbnkuXHJcbnZhciBQb3NpdGlvbiA9IG1vbmdvb3NlLm1vZGVsKCdQb3NpdGlvbicsIG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIG5hbWU6IHt0eXBlOlN0cmluZywgcmVxdWlyZWQ6dHJ1ZX0sXHJcbiAgZW1wbG95ZWVzOiBbXHJcbiAgICAgICAge3R5cGU6U3RyaW5nLCByZWY6J0VtcGxveWVlJ31cclxuICAgICAgXVxyXG59KSk7XHJcblxyXG4vL0RlcGFydG1lbnRzIHdpdGhpbiB0aGUgY29tcGFueS5cclxudmFyIERlcGFydG1lbnQgPSBtb25nb29zZS5tb2RlbCgnRGVwYXJ0bWVudCcsIG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIG5hbWU6IHt0eXBlOlN0cmluZywgcmVxdWlyZWQ6dHJ1ZX0sXHJcbiAgZW1wbG95ZWVzOiBbXHJcbiAgICAgICAge3R5cGU6U3RyaW5nLCByZWY6ICdFbXBsb3llZSd9XHJcbiAgICBdXHJcbn0pKTtcclxuXHJcbi8vVXNlcnMgYXJlIGFsbCBlbXBsb3llZXMgb2YgdGhlIGNvbXBhbnkuIE5PVEU6IE5vdCBhbGwgdXNlcnMgd2lsbCBhY3R1YWxseSBoYXZlIGxvZ2luIGFjY2VzcyB0byB0aGUgVUkuXHJcbnZhciBFbXBsb3llZSA9IG1vbmdvb3NlLm1vZGVsKCdFbXBsb3llZScsIG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIC8vRW1wbG95ZWUgbmFtZSBpbmZvcm1hdGlvblxyXG4gIGlkZW50aWZpY2F0aW9uOiB7XHJcbiAgICBuYW1lOiB7XHJcbiAgICAgIGZpcnN0TmFtZToge3R5cGU6IFN0cmluZ30sXHJcbiAgICAgIGxhc3ROYW1lOiB7dHlwZTogU3RyaW5nfSxcclxuICAgICAgZnVsbE5hbWU6IHt0eXBlOiBTdHJpbmd9XHJcbiAgICB9LFxyXG4gICAgLy9FbXBsb3llZSdzIHVzZXJuYW1lIGZvciBBdXRoZW50aWNhdGlvbiwgcmVwb3J0cywgZXRjIGluIHRoZSBVSS4gT25seSBmb3IgZW1wbG95ZWUncyB3aG8gd291bGQgYmUgc3RhcnRpbmcgcHJvamVjdHMuXHJcbiAgICB1c2VyTmFtZToge3R5cGU6IFN0cmluZ30sXHJcbiAgICAvL1NsYWNrIGhhbmRsZSB0byB0aWUgdG8gdGhlIHNsYWNrIGJvdCBjb21tYW5kcy5cclxuICAgIHNsYWNrSGFuZGxlOiB7dHlwZTogU3RyaW5nfSxcclxuICAgIGVtYWlsOiB7dHlwZTogU3RyaW5nfSxcclxuICAgIGdvb2dsZUlkOiB7fVxyXG4gIH0sXHJcbiAgLy9UaGlzIGRldGVybWluZXMgd2hldGhlciBhbiBlbXBsb3llZSBoYXMgYWNjZXNzLiBUcnVlID0gYWNjZXNzIHRvIFVJLlxyXG4gIHBlcm1pc3Npb25zOiB7XHJcbiAgICBhZG1pbjoge3R5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlfVxyXG4gIH0sXHJcbiAgcG9zaXRpb25zOlt7dHlwZTpTdHJpbmcsIHJlZjogJ1Bvc2l0aW9uJ31dLFxyXG4gIGRlcGFydG1lbnRzOiBbe3R5cGU6U3RyaW5nLCByZWY6ICdEZXBhcnRtZW50J31dLFxyXG59KSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
