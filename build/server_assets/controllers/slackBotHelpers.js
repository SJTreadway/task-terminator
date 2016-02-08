'use strict';

var mongoose = require('mongoose');
var Position = require('../models/Position.js');
var Company = require('../models/Company.js');
var Department = require('../models/Department.js');
var Employee = require('../models/Employee.js');
var Project = require('../models/Project.js');
var ProjectTask = require('../models/ProjectTask.js');
var Q = require('q');
var moment = require('moment');
var helpers = require('../controllers/projectHelpers');
var projectCtrl = require('../controllers/projectCtrl');

module.exports = {

    /************** ARRAYS **************/

    arrayMaker: function arrayMaker(array) {
        var deferred = Q.defer();
        console.log("I'm trying to make an array!");
        var madeArray = [];
        for (var i = 0; i < array.length; i++) {
            console.log("Here's the name I'm looking at....", array[i].name);
            madeArray.push(array[i].name);
        }
        console.log("Here's the full array I made and am trying to return", madeArray);
        deferred.resolve(madeArray);
        console.log("This is the deferred promise", deferred.promise);
        return deferred.promise;
    },

    arrayMakerEmployeeName: function arrayMakerEmployeeName(array) {
        var deferred = Q.defer();
        console.log("I'm trying to make an array!", array);
        var madeArray = [];
        for (var i = 0; i < array.length; i++) {
            console.log("Here's the name I'm looking at....", array[i].identification.name.fullName);
            madeArray.push(array[i].identification.name.fullName);
        }
        console.log("Here's the full array I made and am trying to return", madeArray);
        deferred.resolve(madeArray);
        console.log("This is the deferred promise", deferred.promise);
        return deferred.promise;
    },

    /************** ATTACHMENTS **************/

    attachmentMaker: function attachmentMaker(array, attachmentTitle) {
        console.log("Here's the array to be turned into an attachement", array, attachmentTitle);
        var deferred = Q.defer();
        console.log("I'm trying to make a nice attachment for you....");
        var attachment = {
            title: attachmentTitle,
            color: '#7FEFBD',
            fields: []
        };

        for (var j = 0; j < array.length; j++) {
            attachment.fields.push({
                label: 'Field',
                value: array[j],
                short: true
            });
        }
        console.log(attachment);
        deferred.resolve(attachment);
        return deferred.promise;
    },

    helpAttachment: function helpAttachment(array, attachmentTitle) {
        console.log("Here's the array to be turned into an attachement", array, attachmentTitle);
        var deferred = Q.defer();
        console.log("I'm trying to make a nice attachment for you....");
        var attachment = {
            title: attachmentTitle,
            color: '#7FEFBD',
            fields: [{
                label: 'Field',
                title: ' ',
                value: "Hi.\n I didn't understand what you want. \nBut don't worry... I'm here to help. \nBefore you panic check out this list of commands to get the info you need. Because I'm artifically intelligent, if you type anything close to the commands below I'll probably give you what your looking for. If not, just type the closest command exactly. Over time I'll get better and better at understanding your intent, so get to work!\n",
                short: false
            }, {
                label: 'Field',
                value: ' ',
                short: true
            }, {
                label: 'Field',
                value: ' ',
                short: true
            }, {
                label: 'Field',
                value: '*Command*',
                short: true
            }, {
                label: 'Field',
                value: '*Description*',
                short: true
            }],
            mrkdwn_in: ['fields']
        };

        for (var j = 0; j < array.length; j++) {
            attachment.fields.push({
                label: 'Field',
                value: array[j],
                short: true
            });
        }
        console.log(attachment);
        deferred.resolve(attachment);
        return deferred.promise;
    },

    projectsAttachment: function projectsAttachment(array, attachmentTitle) {
        console.log("Here's the array to be turned into an attachment", array, attachmentTitle);
        var deferred = Q.defer();
        console.log("I'm trying to make a nice attachment for you....");
        var attachment = {
            title: attachmentTitle,
            color: '#7FEFBD',
            fields: [],
            mrkdwn_in: ['fields']
        };

        for (var j = 0; j < array.length; j++) {
            console.log(array[j]);
            attachment.fields.push({
                label: 'Field',
                value: "_#" + array[j].friendlyId + "_: *" + array[j].name + "* - " + array[j].description + " - *# of Tasks (" + array[j].tasks.length + ") - *Due : *" + moment(array[j].setup.dueDate.actual).format('dddd, MMMM Do') + " - *Status: *" + array[j].status,
                short: false
            });
        }
        deferred.resolve(attachment);
        return deferred.promise;
    },

    taskAttachment: function taskAttachment(array, attachmentTitle) {
        console.log("Here's the array to be turned into an attachment", array, attachmentTitle);
        var deferred = Q.defer();
        console.log("I'm trying to make a nice attachment for you....");
        var attachment = {
            title: attachmentTitle,
            color: '#7FEFBD',
            fields: [],
            mrkdwn_in: ['fields']
        };

        for (var j = 0; j < array.length; j++) {
            attachment.fields.push({
                label: 'Field',
                value: "_#" + array[j].friendlyId + "_: *" + array[j].name + " - *Status: *" + array[j].status,
                short: false
            });
        }
        deferred.resolve(attachment);
        return deferred.promise;
    },

    /************** FORMATTING **************/

    hashStripper: function hashStripper(id) {
        console.log("Here's the id I'm trying to fix", id);
        var deferred = Q.defer();
        if (id.charAt(0) !== "#") {
            deferred.resolve(id);
            return deferred.promise;
        } else {
            var cleanId = id.split('#');
            deferred.resolve(cleanId[1]);
            return deferred.promise;
        }
    },

    /************** QUERIES - DEPARTMENTS  **************/
    allDepartments: function allDepartments(req, res) {
        var deferred = Q.defer();
        Department.find().exec().then(function (departments) {
            deferred.resolve(departments);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },

    /************** QUERIES - EMPLOYEES  **************/
    allEmployees: function allEmployees(req, res) {
        var deferred = Q.defer();
        Employee.find().exec().then(function (employees) {
            deferred.resolve(employees);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },

    /************** QUERIES - POSITIONS  **************/
    allPositions: function allPositions(req, res) {
        var deferred = Q.defer();
        Position.find().exec().then(function (positions) {
            deferred.resolve(positions);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },

    /************** QUERIES - PROJECTS  **************/
    allProjects: function allProjects(req, res) {
        var deferred = Q.defer();
        Project.find().exec().then(function (projects) {
            console.log("Here's the projects I found...", projects);
            deferred.resolve(projects);
        }).catch(function (err) {
            return res.status(500).end();
        });
        console.log(deferred.promise);
        return deferred.promise;
    },

    allIncompleteProjects: function allIncompleteProjects(req, res) {
        var deferred = Q.defer();
        Project.find().exec().then(function (projects) {
            console.log("Here's the incomplete projects I found...", projects);
            var incompleteProjects = [];
            projects.map(function (item) {
                console.log("ITEM", item);
                if (item.status === 'Incomplete') {
                    console.log('INCOMPLETE PROJECTS', item);
                    incompleteProjects.push(item);
                }
            });
            deferred.resolve(incompleteProjects);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },

    allCompleteProjects: function allCompleteProjects(req, res) {
        var deferred = Q.defer();
        Project.find().exec().then(function (projects) {
            console.log("Here's the Complete projects I found...", projects);
            var completeProjects = [];
            projects.map(function (item) {
                console.log("ITEM", item);
                if (item.status === 'Complete') {
                    console.log('COMPLETE PROJECTS', item);
                    completeProjects.push(item);
                }
            });
            deferred.resolve(completeProjects);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },

    /************** QUERIES - PROJECT TASKS  **************/
    allProjectTasks: function allProjectTasks(req, res) {
        console.log("Made it to all project tasks!");
        var deferred = Q.defer();
        ProjectTask.find().exec().then(function (results) {
            console.log("This is what I found for all the tasks", results);
            deferred.resolve(results);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },

    allIncompleteTasks: function allIncompleteTasks(req, res) {
        console.log("Made it to all incomplete tasks!");
        var deferred = Q.defer();
        ProjectTask.find().exec().then(function (results) {
            var incompleteTasks = [];
            results.map(function (item) {
                console.log("TASK", item);
                if (item.status === 'Incomplete') {
                    incompleteTasks.push(item);
                }
            });
            deferred.resolve(incompleteTasks);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },

    tasksInProject: function tasksInProject(id) {
        console.log("Here's the id I'm looking for", id);
        var deferred = Q.defer();
        Project.find({ "friendlyId": id }).populate('tasks').exec().then(function (result) {
            console.log("did i find a project?", result);
            deferred.resolve(result);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },

    taskComplete: function taskComplete(id) {
        console.log("Here's the id I'm looking for", id);
        var deferred = Q.defer();
        ProjectTask.findOneAndUpdate({ "friendlyId": id }, { status: 'Complete' }, { new: true }).exec().then(function (newTask) {
            console.log("RESULT", newTask);
            deferred.resolve(newTask);
        });
        return deferred.promise;
    },
    statusCheck: function statusCheck(id) {
        console.log("ID", id);
        var deferred = Q.defer();
        ProjectTask.find({ "friendlyId": id }).exec().then(function (task) {
            console.log('TASK', task);
            if (task[0].status === 'Complete') {
                deferred.resolve(false);
            } else {
                deferred.resolve(task);
            }
        }).catch(function (err) {
            console.log(err);
        });
        return deferred.promise;
    },
    taskCompleteCount: function taskCompleteCount(projectId) {
        var deferred = Q.defer();
        var oldProject;
        Project.find({ '_id': projectId }).exec().then(function (project) {
            project[0].tasksCompleted++;
            console.log("# TASKS COMPLETED", project[0].tasksCompleted);
            if (project[0].tasksCompleted === project[0].tasks.length) {
                project[0].status = 'Complete';
                console.log("IS PROJECT COMPLETE?", project[0].status);
            }
            console.log('IS THIS A PROMISE?', project[0].save());
            return project[0].save();
        }).then(function (project) {
            if (project.status === 'Complete') {
                return projectCtrl.newProject(project.setup.associatedTemplate);
            } else {
                return;
            }
        }).then(function (newProject) {
            console.log('DID IT WORK?', newProject);
        });
    },

    /************** QUERIES - DUE DATES  **************/

    overdueProjects: function overdueProjects(req, res) {
        console.log("Made it to overdue projects!");
        var deferred = Q.defer();
        Project.find().exec().then(function (projects) {
            console.log('PROJECTS', projects);
            var overdue = [];
            projects.map(function (item) {
                console.log('ITEM1', item.setup.dueDate.actual);
                console.log('ITEM2', moment());
                console.log('TRUE OR FALSE', moment().isAfter(moment(item.setup.dueDate.actual)));
                if (moment().isAfter(moment(item.setup.dueDate.actual))) {
                    if (item.status === 'Incomplete') {
                        console.log('ITEM3', item);
                        overdue.push(item);
                    }
                }
            });
            deferred.resolve(overdue);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },
    overdueTasks: function overdueTasks(req, res) {
        console.log("Made it to overdue tasks!");
        var deferred = Q.defer();
        ProjectTask.find().exec().then(function (tasks) {
            console.log('TASKS', tasks);
            var overdue = [];
            tasks.map(function (item) {
                console.log('ITEM1', moment(item.date.deadline));
                console.log('ITEM2', moment());
                console.log('TRUE OR FALSE', moment().isAfter(moment(item.date.deadline)));
                if (moment().isAfter(moment(item.date.deadline))) {
                    console.log('ITEM3', item);
                    overdue.push(item);
                }
            });
            deferred.resolve(overdue);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },
    projectsDueThisWeek: function projectsDueThisWeek(req, res) {
        console.log("Made it to projectsDueThisWeek");
        var deferred = Q.defer();
        Project.find().exec().then(function (projects) {
            console.log('PROJECTS', projects);
            var week = [];
            projects.map(function (item) {
                console.log("WEEK", moment(item.setup.dueDate.actual).week());
                console.log("CURRENT WEEK", moment().week());
                if (moment().week() === moment(item.setup.dueDate.actual).week()) {
                    console.log('ITEM', item);
                    week.push(item);
                }
            });
            deferred.resolve(week);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },
    projectsDueThisMonth: function projectsDueThisMonth(req, res) {
        console.log("Made it to projectsDueThisMonth");
        var deferred = Q.defer();
        Project.find().exec().then(function (projects) {
            console.log('PROJECTS', projects);
            var month = [];
            projects.map(function (item) {
                console.log("MONTH", moment(item.setup.dueDate.actual).month());
                console.log("CURRENT MONTH", moment().month());
                if (moment().month() === moment(item.setup.dueDate.actual).month()) {
                    console.log('ITEM', item);
                    month.push(item);
                }
            });
            deferred.resolve(month);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    },
    projectsDueToday: function projectsDueToday(req, res) {
        console.log("Made it to projectsDueToday");
        var deferred = Q.defer();
        Project.find().exec().then(function (projects) {
            console.log('PROJECTS', projects);
            var today = [];
            projects.map(function (item) {
                console.log("DUE DATE", moment(item.setup.dueDate.actual).dayOfYear());
                console.log("TODAY", moment().dayOfYear());
                if (moment(item.setup.dueDate.actual).dayOfYear() === moment().dayOfYear()) {
                    console.log('ITEM', item);
                    today.push(item);
                }
            });
            console.log("ARRAY", today);
            deferred.resolve(today);
        }).catch(function (err) {
            return res.status(500).end();
        });
        return deferred.promise;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvc2xhY2tCb3RIZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxXQUFXLFFBQVEsVUFBUixDQUFYO0FBQ04sSUFBTSxXQUFXLFFBQVEsdUJBQVIsQ0FBWDtBQUNOLElBQU0sVUFBVSxRQUFRLHNCQUFSLENBQVY7QUFDTixJQUFNLGFBQWEsUUFBUSx5QkFBUixDQUFiO0FBQ04sSUFBTSxXQUFXLFFBQVEsdUJBQVIsQ0FBWDtBQUNOLElBQU0sVUFBVSxRQUFRLHNCQUFSLENBQVY7QUFDTixJQUFNLGNBQWMsUUFBUSwwQkFBUixDQUFkO0FBQ04sSUFBTSxJQUFJLFFBQVEsR0FBUixDQUFKO0FBQ04sSUFBTSxTQUFTLFFBQVEsUUFBUixDQUFUO0FBQ04sSUFBTSxVQUFVLFFBQVEsK0JBQVIsQ0FBVjtBQUNOLElBQU0sY0FBYyxRQUFRLDRCQUFSLENBQWQ7O0FBRU4sT0FBTyxPQUFQLEdBQWlCOzs7O0FBSWIsZ0JBQVksb0JBQVMsS0FBVCxFQUFlO0FBQ3pCLFlBQUksV0FBVyxFQUFFLEtBQUYsRUFBWCxDQURxQjtBQUV6QixnQkFBUSxHQUFSLENBQVksOEJBQVosRUFGeUI7QUFHekIsWUFBSSxZQUFZLEVBQVosQ0FIcUI7QUFJekIsYUFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksTUFBTSxNQUFOLEVBQWMsR0FBbEMsRUFBdUM7QUFDckMsb0JBQVEsR0FBUixDQUFZLG9DQUFaLEVBQWtELE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBbEQsQ0FEcUM7QUFFckMsc0JBQVUsSUFBVixDQUFlLE1BQU0sQ0FBTixFQUFTLElBQVQsQ0FBZixDQUZxQztTQUF2QztBQUlBLGdCQUFRLEdBQVIsQ0FBWSxzREFBWixFQUFvRSxTQUFwRSxFQVJ5QjtBQVN6QixpQkFBUyxPQUFULENBQWlCLFNBQWpCLEVBVHlCO0FBVXpCLGdCQUFRLEdBQVIsQ0FBWSw4QkFBWixFQUE0QyxTQUFTLE9BQVQsQ0FB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Q0FEWTtTQUFULENBZlAsQ0FIdUI7QUFxQnZCLGVBQU8sU0FBUyxPQUFULENBckJnQjtLQXpjZDtDQUFqQiIsImZpbGUiOiJzZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3NsYWNrQm90SGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuY29uc3QgUG9zaXRpb24gPSByZXF1aXJlKCcuLi9tb2RlbHMvUG9zaXRpb24uanMnKTtcclxuY29uc3QgQ29tcGFueSA9IHJlcXVpcmUoJy4uL21vZGVscy9Db21wYW55LmpzJyk7XHJcbmNvbnN0IERlcGFydG1lbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvRGVwYXJ0bWVudC5qcycpO1xyXG5jb25zdCBFbXBsb3llZSA9IHJlcXVpcmUoJy4uL21vZGVscy9FbXBsb3llZS5qcycpO1xyXG5jb25zdCBQcm9qZWN0ID0gcmVxdWlyZSgnLi4vbW9kZWxzL1Byb2plY3QuanMnKTtcclxuY29uc3QgUHJvamVjdFRhc2sgPSByZXF1aXJlKCcuLi9tb2RlbHMvUHJvamVjdFRhc2suanMnKTtcclxuY29uc3QgUSA9IHJlcXVpcmUoJ3EnKTtcclxuY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XHJcbmNvbnN0IGhlbHBlcnMgPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9wcm9qZWN0SGVscGVycycpO1xyXG5jb25zdCBwcm9qZWN0Q3RybCA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3Byb2plY3RDdHJsJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgLyoqKioqKioqKioqKioqIEFSUkFZUyAqKioqKioqKioqKioqKi9cclxuXHJcbiAgICBhcnJheU1ha2VyOiBmdW5jdGlvbihhcnJheSl7XHJcbiAgICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcclxuICAgICAgY29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIG1ha2UgYW4gYXJyYXkhXCIpO1xyXG4gICAgICB2YXIgbWFkZUFycmF5ID0gW107XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgbmFtZSBJJ20gbG9va2luZyBhdC4uLi5cIiwgYXJyYXlbaV0ubmFtZSk7XHJcbiAgICAgICAgbWFkZUFycmF5LnB1c2goYXJyYXlbaV0ubmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIGZ1bGwgYXJyYXkgSSBtYWRlIGFuZCBhbSB0cnlpbmcgdG8gcmV0dXJuXCIsIG1hZGVBcnJheSk7XHJcbiAgICAgIGRlZmVycmVkLnJlc29sdmUobWFkZUFycmF5KTtcclxuICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzIHRoZSBkZWZlcnJlZCBwcm9taXNlXCIsIGRlZmVycmVkLnByb21pc2UpO1xyXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgIH0sXHJcblxyXG4gICAgYXJyYXlNYWtlckVtcGxveWVlTmFtZTogZnVuY3Rpb24oYXJyYXkpe1xyXG4gICAgICB2YXIgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBtYWtlIGFuIGFycmF5IVwiLGFycmF5KTtcclxuICAgICAgdmFyIG1hZGVBcnJheSA9IFtdO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIG5hbWUgSSdtIGxvb2tpbmcgYXQuLi4uXCIsIGFycmF5W2ldLmlkZW50aWZpY2F0aW9uLm5hbWUuZnVsbE5hbWUpO1xyXG4gICAgICAgIG1hZGVBcnJheS5wdXNoKGFycmF5W2ldLmlkZW50aWZpY2F0aW9uLm5hbWUuZnVsbE5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSdzIHRoZSBmdWxsIGFycmF5IEkgbWFkZSBhbmQgYW0gdHJ5aW5nIHRvIHJldHVyblwiLCBtYWRlQXJyYXkpO1xyXG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKG1hZGVBcnJheSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpcyB0aGUgZGVmZXJyZWQgcHJvbWlzZVwiLCBkZWZlcnJlZC5wcm9taXNlKTtcclxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9LFxyXG5cclxuLyoqKioqKioqKioqKioqIEFUVEFDSE1FTlRTICoqKioqKioqKioqKioqL1xyXG5cclxuICAgIGF0dGFjaG1lbnRNYWtlcjogZnVuY3Rpb24oYXJyYXksYXR0YWNobWVudFRpdGxlKXtcclxuICAgICAgY29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIGFycmF5IHRvIGJlIHR1cm5lZCBpbnRvIGFuIGF0dGFjaGVtZW50XCIsIGFycmF5LCBhdHRhY2htZW50VGl0bGUpO1xyXG4gICAgICB2YXIgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBtYWtlIGEgbmljZSBhdHRhY2htZW50IGZvciB5b3UuLi4uXCIpO1xyXG4gICAgICB2YXIgYXR0YWNobWVudCA9IHtcclxuICAgICAgICB0aXRsZTogYXR0YWNobWVudFRpdGxlLFxyXG4gICAgICAgIGNvbG9yOiAnIzdGRUZCRCcsXHJcbiAgICAgICAgZmllbGRzOiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgIGF0dGFjaG1lbnQuZmllbGRzLnB1c2goe1xyXG4gICAgICAgICAgbGFiZWw6ICdGaWVsZCcsXHJcbiAgICAgICAgICB2YWx1ZTogYXJyYXlbal0sXHJcbiAgICAgICAgICBzaG9ydDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKGF0dGFjaG1lbnQpO1xyXG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKGF0dGFjaG1lbnQpO1xyXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgIH0sXHJcblxyXG4gICAgaGVscEF0dGFjaG1lbnQ6IGZ1bmN0aW9uKGFycmF5LGF0dGFjaG1lbnRUaXRsZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSdzIHRoZSBhcnJheSB0byBiZSB0dXJuZWQgaW50byBhbiBhdHRhY2hlbWVudFwiLCBhcnJheSwgYXR0YWNobWVudFRpdGxlKTtcclxuICAgICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gbWFrZSBhIG5pY2UgYXR0YWNobWVudCBmb3IgeW91Li4uLlwiKTtcclxuICAgICAgdmFyIGF0dGFjaG1lbnQgPSB7XHJcbiAgICAgICAgdGl0bGU6IGF0dGFjaG1lbnRUaXRsZSxcclxuICAgICAgICBjb2xvcjogJyM3RkVGQkQnLFxyXG4gICAgICAgIGZpZWxkczogW3tcclxuICAgICAgICAgIGxhYmVsOiAnRmllbGQnLFxyXG4gICAgICAgICAgdGl0bGU6ICcgJyxcclxuICAgICAgICAgIHZhbHVlOiBcIkhpLlxcbiBJIGRpZG4ndCB1bmRlcnN0YW5kIHdoYXQgeW91IHdhbnQuIFxcbkJ1dCBkb24ndCB3b3JyeS4uLiBJJ20gaGVyZSB0byBoZWxwLiBcXG5CZWZvcmUgeW91IHBhbmljIGNoZWNrIG91dCB0aGlzIGxpc3Qgb2YgY29tbWFuZHMgdG8gZ2V0IHRoZSBpbmZvIHlvdSBuZWVkLiBCZWNhdXNlIEknbSBhcnRpZmljYWxseSBpbnRlbGxpZ2VudCwgaWYgeW91IHR5cGUgYW55dGhpbmcgY2xvc2UgdG8gdGhlIGNvbW1hbmRzIGJlbG93IEknbGwgcHJvYmFibHkgZ2l2ZSB5b3Ugd2hhdCB5b3VyIGxvb2tpbmcgZm9yLiBJZiBub3QsIGp1c3QgdHlwZSB0aGUgY2xvc2VzdCBjb21tYW5kIGV4YWN0bHkuIE92ZXIgdGltZSBJJ2xsIGdldCBiZXR0ZXIgYW5kIGJldHRlciBhdCB1bmRlcnN0YW5kaW5nIHlvdXIgaW50ZW50LCBzbyBnZXQgdG8gd29yayFcXG5cIixcclxuICAgICAgICAgIHNob3J0OiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxhYmVsOiAnRmllbGQnLFxyXG4gICAgICAgICAgdmFsdWU6ICcgJyxcclxuICAgICAgICAgIHNob3J0OiB0cnVlLFxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgbGFiZWw6ICdGaWVsZCcsXHJcbiAgICAgICAgICB2YWx1ZTogJyAnLFxyXG4gICAgICAgICAgc2hvcnQ6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsYWJlbDogJ0ZpZWxkJyxcclxuICAgICAgICAgIHZhbHVlOiAnKkNvbW1hbmQqJyxcclxuICAgICAgICAgIHNob3J0OiB0cnVlLFxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgbGFiZWw6ICdGaWVsZCcsXHJcbiAgICAgICAgICB2YWx1ZTogJypEZXNjcmlwdGlvbionLFxyXG4gICAgICAgICAgc2hvcnQ6IHRydWUsXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgbXJrZHduX2luOiBbJ2ZpZWxkcyddXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmb3IodmFyIGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICBhdHRhY2htZW50LmZpZWxkcy5wdXNoKHtcclxuICAgICAgICAgIGxhYmVsOiAnRmllbGQnLFxyXG4gICAgICAgICAgdmFsdWU6IGFycmF5W2pdLFxyXG4gICAgICAgICAgc2hvcnQ6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhhdHRhY2htZW50KTtcclxuICAgICAgZGVmZXJyZWQucmVzb2x2ZShhdHRhY2htZW50KTtcclxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb2plY3RzQXR0YWNobWVudDogZnVuY3Rpb24oYXJyYXksYXR0YWNobWVudFRpdGxlKXtcclxuICAgICAgY29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIGFycmF5IHRvIGJlIHR1cm5lZCBpbnRvIGFuIGF0dGFjaG1lbnRcIiwgYXJyYXksIGF0dGFjaG1lbnRUaXRsZSk7XHJcbiAgICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcclxuICAgICAgY29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIG1ha2UgYSBuaWNlIGF0dGFjaG1lbnQgZm9yIHlvdS4uLi5cIik7XHJcbiAgICAgIHZhciBhdHRhY2htZW50ID0ge1xyXG4gICAgICAgIHRpdGxlOiBhdHRhY2htZW50VGl0bGUsXHJcbiAgICAgICAgY29sb3I6ICcjN0ZFRkJEJyxcclxuICAgICAgICBmaWVsZHM6IFtdLFxyXG4gICAgICAgIG1ya2R3bl9pbjogWydmaWVsZHMnXVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGFycmF5Lmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhhcnJheVtqXSlcclxuICAgICAgICBhdHRhY2htZW50LmZpZWxkcy5wdXNoKHtcclxuICAgICAgICAgIGxhYmVsOiAnRmllbGQnLFxyXG4gICAgICAgICAgdmFsdWU6IFwiXyNcIiArIGFycmF5W2pdLmZyaWVuZGx5SWQgKyBcIl86ICpcIiArIGFycmF5W2pdLm5hbWUgKyBcIiogLSBcIiArIGFycmF5W2pdLmRlc2NyaXB0aW9uICsgXCIgLSAqIyBvZiBUYXNrcyAoXCIgKyBhcnJheVtqXS50YXNrcy5sZW5ndGggKyBcIikgLSAqRHVlIDogKlwiICsgbW9tZW50KGFycmF5W2pdLnNldHVwLmR1ZURhdGUuYWN0dWFsKS5mb3JtYXQoJ2RkZGQsIE1NTU0gRG8nKSArIFwiIC0gKlN0YXR1czogKlwiICsgYXJyYXlbal0uc3RhdHVzLFxyXG4gICAgICAgICAgc2hvcnQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZGVmZXJyZWQucmVzb2x2ZShhdHRhY2htZW50KTtcclxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHRhc2tBdHRhY2htZW50OiBmdW5jdGlvbihhcnJheSxhdHRhY2htZW50VGl0bGUpe1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgYXJyYXkgdG8gYmUgdHVybmVkIGludG8gYW4gYXR0YWNobWVudFwiLCBhcnJheSwgYXR0YWNobWVudFRpdGxlKTtcclxuICAgICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gbWFrZSBhIG5pY2UgYXR0YWNobWVudCBmb3IgeW91Li4uLlwiKTtcclxuICAgICAgdmFyIGF0dGFjaG1lbnQgPSB7XHJcbiAgICAgICAgdGl0bGU6IGF0dGFjaG1lbnRUaXRsZSxcclxuICAgICAgICBjb2xvcjogJyM3RkVGQkQnLFxyXG4gICAgICAgIGZpZWxkczogW10sXHJcbiAgICAgICAgbXJrZHduX2luOiBbJ2ZpZWxkcyddXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmb3IodmFyIGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICBhdHRhY2htZW50LmZpZWxkcy5wdXNoKHtcclxuICAgICAgICAgIGxhYmVsOiAnRmllbGQnLFxyXG4gICAgICAgICAgdmFsdWU6IFwiXyNcIiArIGFycmF5W2pdLmZyaWVuZGx5SWQgKyBcIl86ICpcIiArIGFycmF5W2pdLm5hbWUgKyAgXCIgLSAqU3RhdHVzOiAqXCIgKyBhcnJheVtqXS5zdGF0dXMsXHJcbiAgICAgICAgICBzaG9ydDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKGF0dGFjaG1lbnQpO1xyXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqIEZPUk1BVFRJTkcgKioqKioqKioqKioqKiovXHJcblxyXG4gICAgaGFzaFN0cmlwcGVyOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSdzIHRoZSBpZCBJJ20gdHJ5aW5nIHRvIGZpeFwiLCBpZCk7XHJcbiAgICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcclxuICAgICAgaWYoaWQuY2hhckF0KDApICE9PSBcIiNcIikge1xyXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoaWQpO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjbGVhbklkID0gaWQuc3BsaXQoJyMnKTtcclxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNsZWFuSWRbMV0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKiogUVVFUklFUyAtIERFUEFSVE1FTlRTICAqKioqKioqKioqKioqKi9cclxuICAgIGFsbERlcGFydG1lbnRzOiBmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICB2YXIgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XHJcbiAgICAgIERlcGFydG1lbnQuZmluZCgpLmV4ZWMoKVxyXG4gICAgICAgIC50aGVuKChkZXBhcnRtZW50cykgPT4ge1xyXG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkZXBhcnRtZW50cyk7XHJcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmVuZCgpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKioqKioqKioqKioqKiBRVUVSSUVTIC0gRU1QTE9ZRUVTICAqKioqKioqKioqKioqKi9cclxuICAgIGFsbEVtcGxveWVlczogZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xyXG4gICAgICBFbXBsb3llZS5maW5kKCkuZXhlYygpXHJcbiAgICAgICAgLnRoZW4oKGVtcGxveWVlcykgPT4ge1xyXG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShlbXBsb3llZXMpO1xyXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5lbmQoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKioqKioqKioqKioqKiogUVVFUklFUyAtIFBPU0lUSU9OUyAgKioqKioqKioqKioqKiovXHJcbiAgICBhbGxQb3NpdGlvbnM6IGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcclxuICAgICAgUG9zaXRpb24uZmluZCgpLmV4ZWMoKVxyXG4gICAgICAgIC50aGVuKChwb3NpdGlvbnMpID0+IHtcclxuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocG9zaXRpb25zKTtcclxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuZW5kKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKiogUVVFUklFUyAtIFBST0pFQ1RTICAqKioqKioqKioqKioqKi9cclxuICAgIGFsbFByb2plY3RzOiBmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICB2YXIgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XHJcbiAgICAgIFByb2plY3QuZmluZCgpLmV4ZWMoKVxyXG4gICAgICAgIC50aGVuKChwcm9qZWN0cykgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIHByb2plY3RzIEkgZm91bmQuLi5cIixwcm9qZWN0cyk7XHJcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHByb2plY3RzKTtcclxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuZW5kKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhkZWZlcnJlZC5wcm9taXNlKTtcclxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGFsbEluY29tcGxldGVQcm9qZWN0czogZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xyXG4gICAgICBQcm9qZWN0LmZpbmQoKS5leGVjKClcclxuICAgICAgICAudGhlbigocHJvamVjdHMpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSdzIHRoZSBpbmNvbXBsZXRlIHByb2plY3RzIEkgZm91bmQuLi5cIiwgcHJvamVjdHMpO1xyXG4gICAgICAgICAgY29uc3QgaW5jb21wbGV0ZVByb2plY3RzID0gW107XHJcbiAgICAgICAgICBwcm9qZWN0cy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklURU1cIiwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdHVzID09PSAnSW5jb21wbGV0ZScpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0lOQ09NUExFVEUgUFJPSkVDVFMnLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgaW5jb21wbGV0ZVByb2plY3RzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGluY29tcGxldGVQcm9qZWN0cyk7XHJcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmVuZCgpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGFsbENvbXBsZXRlUHJvamVjdHM6IGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcclxuICAgICAgUHJvamVjdC5maW5kKCkuZXhlYygpXHJcbiAgICAgICAgLnRoZW4oKHByb2plY3RzKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgQ29tcGxldGUgcHJvamVjdHMgSSBmb3VuZC4uLlwiLCBwcm9qZWN0cyk7XHJcbiAgICAgICAgICBjb25zdCBjb21wbGV0ZVByb2plY3RzID0gW107XHJcbiAgICAgICAgICBwcm9qZWN0cy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklURU1cIiwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdHVzID09PSAnQ29tcGxldGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDT01QTEVURSBQUk9KRUNUUycsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICBjb21wbGV0ZVByb2plY3RzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNvbXBsZXRlUHJvamVjdHMpO1xyXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5lbmQoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKioqKioqKioqKioqKiogUVVFUklFUyAtIFBST0pFQ1QgVEFTS1MgICoqKioqKioqKioqKioqL1xyXG4gICAgYWxsUHJvamVjdFRhc2tzOiBmdW5jdGlvbihyZXEscmVzKXtcclxuICAgICAgY29uc29sZS5sb2coXCJNYWRlIGl0IHRvIGFsbCBwcm9qZWN0IHRhc2tzIVwiKTtcclxuICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcclxuICAgIFByb2plY3RUYXNrLmZpbmQoKS5leGVjKCkudGhlbigocmVzdWx0cykgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXMgd2hhdCBJIGZvdW5kIGZvciBhbGwgdGhlIHRhc2tzXCIsIHJlc3VsdHMpO1xyXG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdHMpO1xyXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5lbmQoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBhbGxJbmNvbXBsZXRlVGFza3M6IGZ1bmN0aW9uKHJlcSxyZXMpe1xyXG4gICAgICBjb25zb2xlLmxvZyhcIk1hZGUgaXQgdG8gYWxsIGluY29tcGxldGUgdGFza3MhXCIpO1xyXG4gICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xyXG4gICAgUHJvamVjdFRhc2suZmluZCgpLmV4ZWMoKS50aGVuKChyZXN1bHRzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5jb21wbGV0ZVRhc2tzID0gW107XHJcbiAgICAgICAgcmVzdWx0cy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUQVNLXCIsIGl0ZW0pO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5zdGF0dXMgPT09ICdJbmNvbXBsZXRlJykge1xyXG4gICAgICAgICAgICAgICAgaW5jb21wbGV0ZVRhc2tzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgZGVmZXJyZWQucmVzb2x2ZShpbmNvbXBsZXRlVGFza3MpO1xyXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5lbmQoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfSxcclxuXHJcbiAgICB0YXNrc0luUHJvamVjdDogZnVuY3Rpb24oaWQpe1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgaWQgSSdtIGxvb2tpbmcgZm9yXCIsIGlkKTtcclxuICAgICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xyXG4gICAgICBQcm9qZWN0LmZpbmQoe1wiZnJpZW5kbHlJZFwiOmlkfSlcclxuICAgICAgLnBvcHVsYXRlKCd0YXNrcycpXHJcbiAgICAgIC5leGVjKClcclxuICAgICAgLnRoZW4oKHJlc3VsdCk9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRpZCBpIGZpbmQgYSBwcm9qZWN0P1wiLCByZXN1bHQpO1xyXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgfSkuY2F0Y2goKGVycik9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5lbmQoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgdGFza0NvbXBsZXRlKGlkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSdzIHRoZSBpZCBJJ20gbG9va2luZyBmb3JcIiwgaWQpO1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcclxuICAgICAgICBQcm9qZWN0VGFzay5maW5kT25lQW5kVXBkYXRlKHtcImZyaWVuZGx5SWRcIjogaWR9LCB7c3RhdHVzOiAnQ29tcGxldGUnfSwge25ldzogdHJ1ZX0pXHJcbiAgICAgICAgLmV4ZWMoKVxyXG4gICAgICAgIC50aGVuKChuZXdUYXNrKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTVUxUXCIsIG5ld1Rhc2spO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKG5ld1Rhc2spO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBzdGF0dXNDaGVjayhpZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSURcIiwgaWQpO1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcclxuICAgICAgICBQcm9qZWN0VGFzay5maW5kKHtcImZyaWVuZGx5SWRcIjogaWR9KVxyXG4gICAgICAgIC5leGVjKClcclxuICAgICAgICAudGhlbigodGFzaykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVEFTSycsIHRhc2spO1xyXG4gICAgICAgICAgICAgIGlmICh0YXNrWzBdLnN0YXR1cyA9PT0gJ0NvbXBsZXRlJyl7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGFzayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHRhc2tDb21wbGV0ZUNvdW50KHByb2plY3RJZCkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcclxuICAgICAgICB2YXIgb2xkUHJvamVjdDtcclxuICAgICAgICBQcm9qZWN0LmZpbmQoeydfaWQnOiBwcm9qZWN0SWR9KVxyXG4gICAgICAgIC5leGVjKClcclxuICAgICAgICAudGhlbigocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0WzBdLnRhc2tzQ29tcGxldGVkKys7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyBUQVNLUyBDT01QTEVURURcIiwgcHJvamVjdFswXS50YXNrc0NvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgIGlmIChwcm9qZWN0WzBdLnRhc2tzQ29tcGxldGVkID09PSBwcm9qZWN0WzBdLnRhc2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdFswXS5zdGF0dXMgPSAnQ29tcGxldGUnO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJUyBQUk9KRUNUIENPTVBMRVRFP1wiLCBwcm9qZWN0WzBdLnN0YXR1cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lTIFRISVMgQSBQUk9NSVNFPycsIHByb2plY3RbMF0uc2F2ZSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3RbMF0uc2F2ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHByb2plY3Quc3RhdHVzID09PSAnQ29tcGxldGUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdEN0cmwubmV3UHJvamVjdChwcm9qZWN0LnNldHVwLmFzc29jaWF0ZWRUZW1wbGF0ZSk7ICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChuZXdQcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdESUQgSVQgV09SSz8nLCBuZXdQcm9qZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqIFFVRVJJRVMgLSBEVUUgREFURVMgICoqKioqKioqKioqKioqL1xyXG5cclxuICAgIG92ZXJkdWVQcm9qZWN0cyhyZXEsIHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFkZSBpdCB0byBvdmVyZHVlIHByb2plY3RzIVwiKTtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XHJcbiAgICAgICAgUHJvamVjdC5maW5kKCkuZXhlYygpXHJcbiAgICAgICAgLnRoZW4oKHByb2plY3RzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQUk9KRUNUUycsIHByb2plY3RzKTtcclxuICAgICAgICAgICAgdmFyIG92ZXJkdWUgPSBbXTtcclxuICAgICAgICAgICAgcHJvamVjdHMubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSVRFTTEnLCBpdGVtLnNldHVwLmR1ZURhdGUuYWN0dWFsKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJVEVNMicsIG1vbWVudCgpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUUlVFIE9SIEZBTFNFJywgbW9tZW50KCkuaXNBZnRlcihtb21lbnQoaXRlbS5zZXR1cC5kdWVEYXRlLmFjdHVhbCkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChtb21lbnQoKS5pc0FmdGVyKG1vbWVudChpdGVtLnNldHVwLmR1ZURhdGUuYWN0dWFsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5zdGF0dXMgPT09ICdJbmNvbXBsZXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSVRFTTMnLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmR1ZS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUob3ZlcmR1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmVuZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvdmVyZHVlVGFza3MocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hZGUgaXQgdG8gb3ZlcmR1ZSB0YXNrcyFcIik7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xyXG4gICAgICAgIFByb2plY3RUYXNrLmZpbmQoKS5leGVjKClcclxuICAgICAgICAudGhlbigodGFza3MpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RBU0tTJywgdGFza3MpO1xyXG4gICAgICAgICAgICB2YXIgb3ZlcmR1ZSA9IFtdO1xyXG4gICAgICAgICAgICB0YXNrcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJVEVNMScsIG1vbWVudChpdGVtLmRhdGUuZGVhZGxpbmUpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJVEVNMicsIG1vbWVudCgpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUUlVFIE9SIEZBTFNFJywgbW9tZW50KCkuaXNBZnRlcihtb21lbnQoaXRlbS5kYXRlLmRlYWRsaW5lKSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCgpLmlzQWZ0ZXIobW9tZW50KGl0ZW0uZGF0ZS5kZWFkbGluZSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0lURU0zJywgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmR1ZS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShvdmVyZHVlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuZW5kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb2plY3RzRHVlVGhpc1dlZWsocmVxLCByZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hZGUgaXQgdG8gcHJvamVjdHNEdWVUaGlzV2Vla1wiKTtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XHJcbiAgICAgICAgUHJvamVjdC5maW5kKCkuZXhlYygpXHJcbiAgICAgICAgLnRoZW4oKHByb2plY3RzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQUk9KRUNUUycsIHByb2plY3RzKTtcclxuICAgICAgICAgICAgdmFyIHdlZWsgPSBbXTtcclxuICAgICAgICAgICAgcHJvamVjdHMubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldFRUtcIiwgbW9tZW50KGl0ZW0uc2V0dXAuZHVlRGF0ZS5hY3R1YWwpLndlZWsoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNVUlJFTlQgV0VFS1wiLCBtb21lbnQoKS53ZWVrKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCgpLndlZWsoKSA9PT0gbW9tZW50KGl0ZW0uc2V0dXAuZHVlRGF0ZS5hY3R1YWwpLndlZWsoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJVEVNJywgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh3ZWVrKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuZW5kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb2plY3RzRHVlVGhpc01vbnRoKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWRlIGl0IHRvIHByb2plY3RzRHVlVGhpc01vbnRoXCIpO1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcclxuICAgICAgICBQcm9qZWN0LmZpbmQoKS5leGVjKClcclxuICAgICAgICAudGhlbigocHJvamVjdHMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BST0pFQ1RTJywgcHJvamVjdHMpXHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IFtdO1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTU9OVEhcIiwgbW9tZW50KGl0ZW0uc2V0dXAuZHVlRGF0ZS5hY3R1YWwpLm1vbnRoKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDVVJSRU5UIE1PTlRIXCIsIG1vbWVudCgpLm1vbnRoKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCgpLm1vbnRoKCkgPT09IG1vbWVudChpdGVtLnNldHVwLmR1ZURhdGUuYWN0dWFsKS5tb250aCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0lURU0nLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBtb250aC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShtb250aCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmVuZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9qZWN0c0R1ZVRvZGF5KHJlcSwgcmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWRlIGl0IHRvIHByb2plY3RzRHVlVG9kYXlcIik7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xyXG4gICAgICAgIFByb2plY3QuZmluZCgpLmV4ZWMoKVxyXG4gICAgICAgIC50aGVuKChwcm9qZWN0cykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUFJPSkVDVFMnLCBwcm9qZWN0cylcclxuICAgICAgICAgICAgdmFyIHRvZGF5ID0gW107XHJcbiAgICAgICAgICAgIHByb2plY3RzLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEVUUgREFURVwiLCBtb21lbnQoaXRlbS5zZXR1cC5kdWVEYXRlLmFjdHVhbCkuZGF5T2ZZZWFyKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUT0RBWVwiLCBtb21lbnQoKS5kYXlPZlllYXIoKSlcclxuICAgICAgICAgICAgICAgIGlmIChtb21lbnQoaXRlbS5zZXR1cC5kdWVEYXRlLmFjdHVhbCkuZGF5T2ZZZWFyKCkgPT09IG1vbWVudCgpLmRheU9mWWVhcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0lURU0nLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2RheS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBUlJBWVwiLCB0b2RheSlcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0b2RheSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmVuZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
