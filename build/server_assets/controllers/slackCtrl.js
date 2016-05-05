'use strict';

var mongoose = require('mongoose');
var Botkit = require('botkit');
var Q = require('q');
var positions = require('../controllers/positionCtrl.js');
var botHelper = require('../controllers/slackBotHelpers.js');
var Witbot = require('witbot');

var controller = Botkit.slackbot({
	debug: false
});

// connect the bot to a stream of messages
//  controller.spawn({
//  	//DevMtn Token
//    // token: 'xoxb-18104911812-lrix7VmoDeWSS4PTA8SxNFnN',
//  	//Our Slack Token
// 	// 	token: 'xoxb-19173759013-8uzX74R1NerEeFscDMEHIu39',
//  }).startRTM(function(err) {
//   if (err) {
//     throw new Error(err);
//   }
// });

//LINK THE BOT TO WIT.AI
var witbot = Witbot("CZPINC6EVOQ7DCPZSUUBQ3B5GWQVOQ66");

/****************** BOT SPECIFIC COMMANDS ******************/
//wire up DM's and direct mentions to wit.ai
controller.hears('.*', 'direct_message,direct_mention', function (bot, message) {
	witbot.process(message.text, bot, message);
});

witbot.hears('help', 0.5, function (bot, message, outcome) {
	var title = " ";
	var botSkillz = ["show roles", "Forgot a job title? Here's all of em for your company!", 'show departments', "All the departments. All of em. ", 'show employees', "Don't forget that guy in accounting's name. Find him here!", 'show projects', "Just a list of every open project in your company. Now get working. ", "help", "Tells you all about my magic powers."];
	botHelper.helpAttachment(botSkillz, title).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.otherwise(function (bot, message) {
	var title = " ";
	var botSkillz = ["show roles", "Forgot a job title? Here's all of em for your company!", 'show departments', "All the departments. All of em. ", 'show employees', "Don't forget that guy in accounting's name. Find him here!", 'show projects', "Just a list of every open project in your company. Now get working. ", "help", "Tells you all about my magic powers."];
	botHelper.helpAttachment(botSkillz, title).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

controller.hears(['dm me'], ['direct_message', 'direct_mention'], function (bot, message) {
	bot.startConversation(message, function (err, convo) {
		convo.say('Heard ya');
	});

	bot.startPrivateConversation(message, function (err, dm) {
		dm.say('Private reply!');
	});
});

/****************** GREETINGS ******************/
witbot.hears('greeting', 0.5, function (bot, message, outcome) {
	console.log("WIT.AI Outcome", outcome);
	console.log("WIT.AI Outcome", outcome.entities.greeting);
	bot.reply(message, 'Greetings earthling.');
});

/****************** DEPARTMENTS ******************/
witbot.hears('all_departments', 0.8, function (bot, message, outcome) {
	console.log("WIT.AI Outcome", outcome);
	botHelper.allDepartments().then(function (departments) {
		return botHelper.arrayMaker(departments);
	}).then(function (departmentNames) {
		var title = "Here's all the departments I could find...";
		return botHelper.attachmentMaker(departmentNames, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

/****************** EMPLOYEES ******************/
witbot.hears('all_employees', 0.8, function (bot, message, outcome) {
	console.log(outcome);
	botHelper.allEmployees().then(function (employees) {
		return botHelper.arrayMakerEmployeeName(employees);
	}).then(function (employeeNames) {
		console.log("Here's the returned promise...", employeeNames);
		var title = "Here's all the employees I could find...";
		return botHelper.attachmentMaker(employeeNames, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

/****************** POSITIONS ******************/
witbot.hears('all_positions', 0.8, function (bot, message, outcome) {
	botHelper.allPositions().then(function (positions) {
		return botHelper.arrayMaker(positions);
	}).then(function (positionNames) {
		var title = "Here's all the positions I could find...";
		return botHelper.attachmentMaker(positionNames, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

/****************** PROJECTS ******************/
witbot.hears('all_projects', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get projects!");
	botHelper.allProjects().then(function (projectDetails) {
		var title = "Here's all the projects I could find...";
		console.log("Here's all the projects I returned....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('tasks_in_project', 0.3, function (bot, message, outcome) {
	console.log("this is what WIT.AI returned", outcome.entities.project_id);
	console.log("this is what WIT.AI returned", outcome.entities.project_id[0].value);
	var title = "Here are the tasks for project - " + outcome.entities.project_id[0].value;
	var projectId = outcome.entities.project_id[0].value;
	return botHelper.hashStripper(projectId).then(function (cleanId) {
		console.log("Here's the clean ID I made", cleanId);
		return botHelper.tasksInProject(cleanId);
	}).then(function (project) {
		console.log("WHat we gotz back", project[0].tasks);
		var array = project[0].tasks;
		console.log("Here's the tasks associated with that project", array);
		return botHelper.taskAttachment(array, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});

	// bot.reply(message, "Let me get those tasks for you!");
});

witbot.hears('overdue_projects', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get all overdue projects!");
	botHelper.overdueProjects().then(function (projectDetails) {
		var title = "Here's all the overdue projects I could find...";
		console.log("Here's all the overdue projects I returned....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('insult', 0.7, function (bot, message, outcome) {
	console.log("YOU INSULTED ME!");
	bot.reply(message, "https://www.youtube.com/watch?v=KWza5PQA5Zc");
});

witbot.hears('joke', 0.5, function (bot, message, outcome) {
	console.log("Here's your joke");
	bot.reply(message, "https://www.youtube.com/watch?v=It3DU2HMbaY");
});

witbot.hears('canada', 0.5, function (bot, message, outcome) {
	bot.reply(message, "https://www.youtube.com/watch?v=pFCd4ZOTVg4");
});

witbot.hears('jimmy', 0.3, function (bot, message, outcome) {
	bot.reply(message, "https://www.youtube.com/watch?v=cTl762MuXyc");
});

witbot.hears('brownbag', 0.4, function (bot, message, outcome) {
	bot.reply(message, "https://www.youtube.com/watch?v=ePkPYA4AQ3o");
});

witbot.hears('cahlan', 0.3, function (bot, message, outcome) {
	bot.reply(message, "https://www.youtube.com/watch?v=HmqCDgr3yQg");
});

witbot.hears('wilson', 0.3, function (bot, message, outcome) {
	bot.reply(message, "https://www.youtube.com/watch?v=3gNrkgwS6aM");
});

witbot.hears('projects_due_this_month', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get all projects due this month!");
	botHelper.projectsDueThisMonth().then(function (projectDetails) {
		var title = "Here's all the projects due this month...";
		console.log("Here's all the projects due this month....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		console.log('HELLO', attachment);
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('projects_due_this_week', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get all projects due this week!");
	botHelper.projectsDueThisWeek().then(function (projectDetails) {
		var title = "Here's all the projects due this week...";
		console.log("Here's all the projects due this week....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('projects_due_today', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get all projects due today!");
	botHelper.projectsDueToday().then(function (projectDetails) {
		var title = "Here's all the projects due today...";
		console.log("Here's all the projects due today....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

/****************** PROJECT TASKS ******************/
witbot.hears('all_tasks', 0.8, function (bot, message, coutcome) {
	botHelper.allProjectTasks().then(function (tasks) {
		// console.log("Here are the tasks I got back!",tasks);
		var title = "Here's all the tasks I could find...";
		return botHelper.taskAttachment(tasks, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('all_incomplete_tasks', 0.2, function (bot, message, outcome) {
	console.log("I'm trying to get all incomplete tasks!");
	botHelper.allIncompleteTasks().then(function (incompleteTasks) {
		var title = "Here's all the incomplete tasks I could find...";
		console.log("Here's all the incomplete tasks I returned....", incompleteTasks);
		return botHelper.taskAttachment(incompleteTasks, title);
	}).then(function (attachment) {
		console.log('ATTACHMENT', attachment);
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('overdue_tasks', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get all overdue tasks!");
	botHelper.overdueTasks().then(function (projectDetails) {
		var title = "Here's all the overdue tasks I could find...";
		console.log("Here's all the overdue tasks I returned....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (taskNames) {
		// console.log("Here's the returned promise...", taskNames);
		var title = "Here's all the overdue tasks I could find...";
		return botHelper.attachmentMaker(taskNames, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('task_complete', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to change the task status to complete...");
	var taskid = outcome.entities.task_id[0].value;
	var newCleanId;
	var projectIdRef;
	console.log("TASK ID", taskid);
	return botHelper.hashStripper(taskid).then(function (cleanId) {
		console.log("Here's the clean ID I made", cleanId);
		newCleanId = cleanId;
		return botHelper.statusCheck(cleanId);
	}).then(function (task) {
		if (!task) {
			bot.reply(message, "Task has already been completed.");
		} else {
			projectIdRef = task[0].associatedProject;
			return botHelper.taskComplete(newCleanId);
		}
	}).then(function (task) {
		console.log("Here's the returned promise...", task);
		var title = "Here's the task...";
		return botHelper.taskAttachment([task], title);
	}).then(function (attachment) {
		var deferred = Q.defer();
		var attachments = [];
		attachments.push(attachment);
		deferred.resolve(bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		}));
		return deferred.promise;
	}).then(function () {
		return botHelper.taskCompleteCount(projectIdRef);
	});
});

/****************** INCOMPLETE PROJECTS ******************/

witbot.hears('incomplete_projects', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get incomplete projects!");
	botHelper.allIncompleteProjects().then(function (projectDetails) {
		var title = "Here's all the incomplete projects I could find...";
		console.log("Here's all the incomplete projects I returned....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

/****************** COMPLETE PROJECTS ******************/

witbot.hears('complete_projects', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get complete projects!");
	botHelper.allCompleteProjects().then(function (projectDetails) {
		var title = "Here's all the complete projects I could find...";
		console.log("Here's all the complete projects I returned....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

module.exports = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvc2xhY2tDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBTSxXQUFXLFFBQVEsVUFBUixDQUFYO0FBQ04sSUFBTSxTQUFTLFFBQVEsUUFBUixDQUFUO0FBQ04sSUFBTSxJQUFJLFFBQVEsR0FBUixDQUFKO0FBQ04sSUFBTSxZQUFZLFFBQVEsZ0NBQVIsQ0FBWjtBQUNOLElBQU0sWUFBWSxRQUFRLG1DQUFSLENBQVo7QUFDTixJQUFNLFNBQVMsUUFBUSxRQUFSLENBQVQ7O0FBRU4sSUFBTSxhQUFhLE9BQU8sUUFBUCxDQUFnQjtBQUNoQyxRQUFPLEtBQVA7Q0FEZ0IsQ0FBYjs7Ozs7Ozs7Ozs7Ozs7O0FBaUJMLElBQU0sU0FBUyxPQUFPLGtDQUFQLENBQVQ7Ozs7QUFNTixXQUFXLEtBQVgsQ0FBaUIsSUFBakIsRUFBdUIsK0JBQXZCLEVBQXdELFVBQVUsR0FBVixFQUFlLE9BQWYsRUFBd0I7QUFDL0UsUUFBTyxPQUFQLENBQWUsUUFBUSxJQUFSLEVBQWMsR0FBN0IsRUFBa0MsT0FBbEMsRUFEK0U7Q0FBeEIsQ0FBeEQ7O0FBSUEsT0FBTyxLQUFQLENBQWEsTUFBYixFQUFxQixHQUFyQixFQUEwQixVQUFVLEdBQVYsRUFBZSxPQUFmLEVBQXdCLE9BQXhCLEVBQWlDO0FBQzFELEtBQUksUUFBUSxHQUFSLENBRHNEO0FBRTFELEtBQUksWUFBWSxDQUNmLFlBRGUsRUFFZix3REFGZSxFQUdmLGtCQUhlLEVBSWYsa0NBSmUsRUFLZixnQkFMZSxFQU1mLDREQU5lLEVBT2YsZUFQZSxFQVFmLHNFQVJlLEVBU2YsTUFUZSxFQVVmLHNDQVZlLENBQVosQ0FGc0Q7QUFjMUQsV0FBVSxjQUFWLENBQXlCLFNBQXpCLEVBQW1DLEtBQW5DLEVBQ0MsSUFERCxDQUNNLFVBQUMsVUFBRCxFQUFnQjtBQUNyQixNQUFJLGNBQWMsRUFBZCxDQURpQjtBQUVyQixjQUFZLElBQVosQ0FBaUIsVUFBakIsRUFGcUI7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QUFtQjtBQUNwQixXQUFRLEdBQVIsQ0FBWSxHQUFaLEVBQWdCLElBQWhCLEVBRG9CO0dBQW5CLENBSEYsQ0FIcUI7RUFBaEIsQ0FOTixDQUZ5RTtDQUFqQyxDQUF6Qzs7OztBQXNCQSxPQUFPLEtBQVAsQ0FBYSxtQkFBYixFQUFrQyxHQUFsQyxFQUF1QyxVQUFVLEdBQVYsRUFBZSxPQUFmLEVBQXdCLE9BQXhCLEVBQWlDO0FBQ3ZFLFNBQVEsR0FBUixDQUFZLHNDQUFaLEVBRHVFO0FBRXZFLFdBQVUsbUJBQVYsR0FDQyxJQURELENBQ00sVUFBQyxjQUFELEVBQW9CO0FBQ3pCLE1BQUksUUFBUSxrREFBUixDQURxQjtBQUV6QixVQUFRLEdBQVIsQ0FBWSxpREFBWixFQUErRCxjQUEvRCxFQUZ5QjtBQUd6QixTQUFPLFVBQVUsa0JBQVYsQ0FBNkIsY0FBN0IsRUFBNkMsS0FBN0MsQ0FBUCxDQUh5QjtFQUFwQixDQUROLENBTUMsSUFORCxDQU1NLFVBQUMsVUFBRCxFQUFnQjtBQUNyQixNQUFJLGNBQWMsRUFBZCxDQURpQjtBQUVyQixjQUFZLElBQVosQ0FBaUIsVUFBakIsRUFGcUI7QUFHckIsTUFBSSxLQUFKLENBQVUsT0FBVixFQUFrQjs7QUFFakIsZ0JBQWEsV0FBYjtHQUZELEVBR0UsVUFBUyxHQUFULEVBQWEsSUFBYixFQUFtQjtBQUNwQixXQUFRLEdBQVIsQ0FBWSxHQUFaLEVBQWdCLElBQWhCLEVBRG9CO0dBQW5CLENBSEYsQ0FIcUI7RUFBaEIsQ0FOTixDQUZ1RTtDQUFqQyxDQUF2Qzs7QUFxQkEsT0FBTyxPQUFQLEdBQWlCLEVBQWpCIiwiZmlsZSI6InNlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvc2xhY2tDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuY29uc3QgQm90a2l0ID0gcmVxdWlyZSgnYm90a2l0Jyk7XHJcbmNvbnN0IFEgPSByZXF1aXJlKCdxJyk7XHJcbmNvbnN0IHBvc2l0aW9ucyA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3Bvc2l0aW9uQ3RybC5qcycpO1xyXG5jb25zdCBib3RIZWxwZXIgPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zbGFja0JvdEhlbHBlcnMuanMnKTtcclxuY29uc3QgV2l0Ym90ID0gcmVxdWlyZSgnd2l0Ym90Jyk7XHJcblxyXG5jb25zdCBjb250cm9sbGVyID0gQm90a2l0LnNsYWNrYm90KHtcclxuXHQgIGRlYnVnOiBmYWxzZVxyXG5cdH0pO1xyXG5cclxuXHQvLyBjb25uZWN0IHRoZSBib3QgdG8gYSBzdHJlYW0gb2YgbWVzc2FnZXNcclxuXHQvLyAgY29udHJvbGxlci5zcGF3bih7XHJcblx0Ly8gIFx0Ly9EZXZNdG4gVG9rZW5cclxuXHQvLyAgICAvLyB0b2tlbjogJ3hveGItMTgxMDQ5MTE4MTItbHJpeDdWbW9EZVdTUzRQVEE4U3hORm5OJyxcclxuXHQvLyAgXHQvL091ciBTbGFjayBUb2tlblxyXG5cdC8vIFx0Ly8gXHR0b2tlbjogJ3hveGItMTkxNzM3NTkwMTMtOHV6WDc0UjFOZXJFZUZzY0RNRUhJdTM5JyxcclxuXHQvLyAgfSkuc3RhcnRSVE0oZnVuY3Rpb24oZXJyKSB7XHJcbiAgLy8gICBpZiAoZXJyKSB7XHJcbiAgLy8gICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH0pO1xyXG5cclxuXHQvL0xJTksgVEhFIEJPVCBUTyBXSVQuQUlcclxuXHRjb25zdCB3aXRib3QgPSBXaXRib3QoXCJDWlBJTkM2RVZPUTdEQ1BaU1VVQlEzQjVHV1FWT1E2NlwiXHJcblx0KTtcclxuXHJcblxyXG5cdC8qKioqKioqKioqKioqKioqKiogQk9UIFNQRUNJRklDIENPTU1BTkRTICoqKioqKioqKioqKioqKioqKi9cclxuXHQvL3dpcmUgdXAgRE0ncyBhbmQgZGlyZWN0IG1lbnRpb25zIHRvIHdpdC5haVxyXG5cdGNvbnRyb2xsZXIuaGVhcnMoJy4qJywgJ2RpcmVjdF9tZXNzYWdlLGRpcmVjdF9tZW50aW9uJywgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSkge1xyXG5cdFx0d2l0Ym90LnByb2Nlc3MobWVzc2FnZS50ZXh0LCBib3QsIG1lc3NhZ2UpO1xyXG5cdH0pO1xyXG5cclxuXHR3aXRib3QuaGVhcnMoJ2hlbHAnLCAwLjUsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcclxuXHRcdHZhciB0aXRsZSA9IFwiIFwiO1xyXG5cdFx0dmFyIGJvdFNraWxseiA9IFtcclxuXHRcdFx0XCJzaG93IHJvbGVzXCIsXHJcblx0XHRcdFwiRm9yZ290IGEgam9iIHRpdGxlPyBIZXJlJ3MgYWxsIG9mIGVtIGZvciB5b3VyIGNvbXBhbnkhXCIsXHJcblx0XHRcdCdzaG93IGRlcGFydG1lbnRzJyxcclxuXHRcdFx0XCJBbGwgdGhlIGRlcGFydG1lbnRzLiBBbGwgb2YgZW0uIFwiLFxyXG5cdFx0XHQnc2hvdyBlbXBsb3llZXMnLFxyXG5cdFx0XHRcIkRvbid0IGZvcmdldCB0aGF0IGd1eSBpbiBhY2NvdW50aW5nJ3MgbmFtZS4gRmluZCBoaW0gaGVyZSFcIixcclxuXHRcdFx0J3Nob3cgcHJvamVjdHMnLFxyXG5cdFx0XHRcIkp1c3QgYSBsaXN0IG9mIGV2ZXJ5IG9wZW4gcHJvamVjdCBpbiB5b3VyIGNvbXBhbnkuIE5vdyBnZXQgd29ya2luZy4gXCIsXHJcblx0XHRcdFwiaGVscFwiLFxyXG5cdFx0XHRcIlRlbGxzIHlvdSBhbGwgYWJvdXQgbXkgbWFnaWMgcG93ZXJzLlwiLFxyXG5cdFx0XTtcclxuXHRcdGJvdEhlbHBlci5oZWxwQXR0YWNobWVudChib3RTa2lsbHosdGl0bGUpXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xyXG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcclxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXHJcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHdpdGJvdC5vdGhlcndpc2UoZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSkge1xyXG5cdFx0dmFyIHRpdGxlID0gXCIgXCI7XHJcblx0XHR2YXIgYm90U2tpbGx6ID0gW1xyXG5cdFx0XHRcInNob3cgcm9sZXNcIixcclxuXHRcdFx0XCJGb3Jnb3QgYSBqb2IgdGl0bGU/IEhlcmUncyBhbGwgb2YgZW0gZm9yIHlvdXIgY29tcGFueSFcIixcclxuXHRcdFx0J3Nob3cgZGVwYXJ0bWVudHMnLFxyXG5cdFx0XHRcIkFsbCB0aGUgZGVwYXJ0bWVudHMuIEFsbCBvZiBlbS4gXCIsXHJcblx0XHRcdCdzaG93IGVtcGxveWVlcycsXHJcblx0XHRcdFwiRG9uJ3QgZm9yZ2V0IHRoYXQgZ3V5IGluIGFjY291bnRpbmcncyBuYW1lLiBGaW5kIGhpbSBoZXJlIVwiLFxyXG5cdFx0XHQnc2hvdyBwcm9qZWN0cycsXHJcblx0XHRcdFwiSnVzdCBhIGxpc3Qgb2YgZXZlcnkgb3BlbiBwcm9qZWN0IGluIHlvdXIgY29tcGFueS4gTm93IGdldCB3b3JraW5nLiBcIixcclxuXHRcdFx0XCJoZWxwXCIsXHJcblx0XHRcdFwiVGVsbHMgeW91IGFsbCBhYm91dCBteSBtYWdpYyBwb3dlcnMuXCIsXHJcblx0XHRdO1xyXG5cdFx0Ym90SGVscGVyLmhlbHBBdHRhY2htZW50KGJvdFNraWxseix0aXRsZSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Y29udHJvbGxlci5oZWFycyhbJ2RtIG1lJ10sWydkaXJlY3RfbWVzc2FnZScsJ2RpcmVjdF9tZW50aW9uJ10sZnVuY3Rpb24oYm90LG1lc3NhZ2UpIHtcclxuXHRcdGJvdC5zdGFydENvbnZlcnNhdGlvbihtZXNzYWdlLGZ1bmN0aW9uKGVycixjb252bykge1xyXG5cdFx0XHRjb252by5zYXkoJ0hlYXJkIHlhJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRib3Quc3RhcnRQcml2YXRlQ29udmVyc2F0aW9uKG1lc3NhZ2UsZnVuY3Rpb24oZXJyLGRtKSB7XHJcblx0XHRcdGRtLnNheSgnUHJpdmF0ZSByZXBseSEnKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqIEdSRUVUSU5HUyAqKioqKioqKioqKioqKioqKiovXHJcblx0d2l0Ym90LmhlYXJzKCdncmVldGluZycsIDAuNSwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJXSVQuQUkgT3V0Y29tZVwiLCBvdXRjb21lKTtcclxuXHRcdGNvbnNvbGUubG9nKFwiV0lULkFJIE91dGNvbWVcIiwgb3V0Y29tZS5lbnRpdGllcy5ncmVldGluZyk7XHJcblx0XHRib3QucmVwbHkobWVzc2FnZSwgJ0dyZWV0aW5ncyBlYXJ0aGxpbmcuJyk7XHJcblx0fSk7XHJcblxyXG5cdC8qKioqKioqKioqKioqKioqKiogREVQQVJUTUVOVFMgKioqKioqKioqKioqKioqKioqL1xyXG5cdHdpdGJvdC5oZWFycygnYWxsX2RlcGFydG1lbnRzJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIldJVC5BSSBPdXRjb21lXCIsIG91dGNvbWUpO1xyXG5cdFx0Ym90SGVscGVyLmFsbERlcGFydG1lbnRzKClcclxuXHRcdC50aGVuKChkZXBhcnRtZW50cykgPT57XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIuYXJyYXlNYWtlcihkZXBhcnRtZW50cyk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGRlcGFydG1lbnROYW1lcykgPT4ge1xyXG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIGRlcGFydG1lbnRzIEkgY291bGQgZmluZC4uLlwiO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLmF0dGFjaG1lbnRNYWtlcihkZXBhcnRtZW50TmFtZXMsIHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xyXG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcclxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXHJcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qKioqKioqKioqKioqKioqKiogRU1QTE9ZRUVTICoqKioqKioqKioqKioqKioqKi9cclxuXHR3aXRib3QuaGVhcnMoJ2FsbF9lbXBsb3llZXMnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcclxuXHRcdGNvbnNvbGUubG9nKG91dGNvbWUpO1xyXG5cdFx0Ym90SGVscGVyLmFsbEVtcGxveWVlcygpXHJcblx0XHQudGhlbigoZW1wbG95ZWVzKSA9PntcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5hcnJheU1ha2VyRW1wbG95ZWVOYW1lKGVtcGxveWVlcyk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGVtcGxveWVlTmFtZXMpID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIHJldHVybmVkIHByb21pc2UuLi5cIiwgZW1wbG95ZWVOYW1lcyk7XHJcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgZW1wbG95ZWVzIEkgY291bGQgZmluZC4uLlwiO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLmF0dGFjaG1lbnRNYWtlcihlbXBsb3llZU5hbWVzLCB0aXRsZSk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyoqKioqKioqKioqKioqKioqKiBQT1NJVElPTlMgKioqKioqKioqKioqKioqKioqL1xyXG5cdHdpdGJvdC5oZWFycygnYWxsX3Bvc2l0aW9ucycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Ym90SGVscGVyLmFsbFBvc2l0aW9ucygpXHJcblx0XHQudGhlbigocG9zaXRpb25zKSA9PntcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5hcnJheU1ha2VyKHBvc2l0aW9ucyk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKHBvc2l0aW9uTmFtZXMpID0+IHtcclxuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBwb3NpdGlvbnMgSSBjb3VsZCBmaW5kLi4uXCI7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIuYXR0YWNobWVudE1ha2VyKHBvc2l0aW9uTmFtZXMsIHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xyXG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcclxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXHJcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qKioqKioqKioqKioqKioqKiogUFJPSkVDVFMgKioqKioqKioqKioqKioqKioqL1xyXG5cdHdpdGJvdC5oZWFycygnYWxsX3Byb2plY3RzJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IHByb2plY3RzIVwiKTtcclxuXHRcdGJvdEhlbHBlci5hbGxQcm9qZWN0cygpXHJcblx0XHQudGhlbigocHJvamVjdERldGFpbHMpID0+IHtcclxuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBJIGNvdWxkIGZpbmQuLi5cIjtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBJIHJldHVybmVkLi4uLlwiLCBwcm9qZWN0RGV0YWlscyk7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHR3aXRib3QuaGVhcnMoJ3Rhc2tzX2luX3Byb2plY3QnLCAwLjMsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLCBvdXRjb21lKXtcclxuXHRcdGNvbnNvbGUubG9nKFwidGhpcyBpcyB3aGF0IFdJVC5BSSByZXR1cm5lZFwiLCBvdXRjb21lLmVudGl0aWVzLnByb2plY3RfaWQpO1xyXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIHdoYXQgV0lULkFJIHJldHVybmVkXCIsIG91dGNvbWUuZW50aXRpZXMucHJvamVjdF9pZFswXS52YWx1ZSk7XHJcblx0XHR2YXIgdGl0bGUgPSBcIkhlcmUgYXJlIHRoZSB0YXNrcyBmb3IgcHJvamVjdCAtIFwiICsgb3V0Y29tZS5lbnRpdGllcy5wcm9qZWN0X2lkWzBdLnZhbHVlO1xyXG5cdFx0dmFyIHByb2plY3RJZCA9IG91dGNvbWUuZW50aXRpZXMucHJvamVjdF9pZFswXS52YWx1ZTtcclxuXHRcdHJldHVybiBib3RIZWxwZXIuaGFzaFN0cmlwcGVyKHByb2plY3RJZClcclxuXHRcdC50aGVuKChjbGVhbklkKSA9PiB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIHRoZSBjbGVhbiBJRCBJIG1hZGVcIiwgY2xlYW5JZCk7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIudGFza3NJblByb2plY3QoY2xlYW5JZCk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKHByb2plY3QpID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJXSGF0IHdlIGdvdHogYmFja1wiLCBwcm9qZWN0WzBdLnRhc2tzKTtcclxuXHRcdFx0dmFyIGFycmF5ID0gcHJvamVjdFswXS50YXNrcztcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIHRhc2tzIGFzc29jaWF0ZWQgd2l0aCB0aGF0IHByb2plY3RcIiwgYXJyYXkpO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnRhc2tBdHRhY2htZW50KGFycmF5LHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCk9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBib3QucmVwbHkobWVzc2FnZSwgXCJMZXQgbWUgZ2V0IHRob3NlIHRhc2tzIGZvciB5b3UhXCIpO1xyXG5cdH0pO1xyXG5cclxuXHR3aXRib3QuaGVhcnMoJ292ZXJkdWVfcHJvamVjdHMnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgYWxsIG92ZXJkdWUgcHJvamVjdHMhXCIpO1xyXG5cdFx0Ym90SGVscGVyLm92ZXJkdWVQcm9qZWN0cygpXHJcblx0XHQudGhlbigocHJvamVjdERldGFpbHMpID0+IHtcclxuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBvdmVyZHVlIHByb2plY3RzIEkgY291bGQgZmluZC4uLlwiO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIG92ZXJkdWUgcHJvamVjdHMgSSByZXR1cm5lZC4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnByb2plY3RzQXR0YWNobWVudChwcm9qZWN0RGV0YWlscywgdGl0bGUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0d2l0Ym90LmhlYXJzKCdpbnN1bHQnLCAwLjcsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLG91dGNvbWUpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJZT1UgSU5TVUxURUQgTUUhXCIpO1xyXG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1LV3phNVBRQTVaY1wiKTtcclxuXHR9KTtcclxuXHJcblx0d2l0Ym90LmhlYXJzKCdqb2tlJywgMC41LCBmdW5jdGlvbihib3QsIG1lc3NhZ2UsIG91dGNvbWUpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgeW91ciBqb2tlXCIpO1xyXG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1JdDNEVTJITWJhWVwiKTtcclxuXHR9KTtcclxuXHJcblx0d2l0Ym90LmhlYXJzKCdjYW5hZGEnLCAwLjUsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLG91dGNvbWUpe1xyXG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1wRkNkNFpPVFZnNFwiKTtcclxuXHR9KTtcclxuXHJcblx0d2l0Ym90LmhlYXJzKCdqaW1teScsIDAuMywgZnVuY3Rpb24oYm90LCBtZXNzYWdlLCBvdXRjb21lKXtcclxuXHRcdGJvdC5yZXBseShtZXNzYWdlLCBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9Y1RsNzYyTXVYeWNcIik7XHJcblx0fSk7XHJcblxyXG5cdHdpdGJvdC5oZWFycygnYnJvd25iYWcnLCAwLjQsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLG91dGNvbWUpe1xyXG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWVQa1BZQTRBUTNvXCIpO1xyXG5cdH0pO1xyXG5cclxuXHR3aXRib3QuaGVhcnMoJ2NhaGxhbicsIDAuMywgZnVuY3Rpb24oYm90LG1lc3NhZ2Usb3V0Y29tZSl7XHJcblx0XHRib3QucmVwbHkobWVzc2FnZSwgXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PUhtcUNEZ3IzeVFnXCIpO1xyXG5cdH0pO1xyXG5cclxuICAgIHdpdGJvdC5oZWFycygnd2lsc29uJywgMC4zLCBmdW5jdGlvbihib3QsbWVzc2FnZSxvdXRjb21lKXtcclxuXHRcdGJvdC5yZXBseShtZXNzYWdlLCBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9M2dOcmtnd1M2YU1cIik7XHJcblx0fSk7XHJcblxyXG4gICAgd2l0Ym90LmhlYXJzKCdwcm9qZWN0c19kdWVfdGhpc19tb250aCcsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgcHJvamVjdHMgZHVlIHRoaXMgbW9udGghXCIpO1xyXG5cdFx0Ym90SGVscGVyLnByb2plY3RzRHVlVGhpc01vbnRoKClcclxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xyXG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIGR1ZSB0aGlzIG1vbnRoLi4uXCI7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIGFsbCB0aGUgcHJvamVjdHMgZHVlIHRoaXMgbW9udGguLi4uXCIsIHByb2plY3REZXRhaWxzKTtcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSEVMTE8nLCBhdHRhY2htZW50KTtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuICAgIHdpdGJvdC5oZWFycygncHJvamVjdHNfZHVlX3RoaXNfd2VlaycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgcHJvamVjdHMgZHVlIHRoaXMgd2VlayFcIik7XHJcblx0XHRib3RIZWxwZXIucHJvamVjdHNEdWVUaGlzV2VlaygpXHJcblx0XHQudGhlbigocHJvamVjdERldGFpbHMpID0+IHtcclxuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBkdWUgdGhpcyB3ZWVrLi4uXCI7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIGFsbCB0aGUgcHJvamVjdHMgZHVlIHRoaXMgd2Vlay4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnByb2plY3RzQXR0YWNobWVudChwcm9qZWN0RGV0YWlscywgdGl0bGUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbiAgICB3aXRib3QuaGVhcnMoJ3Byb2plY3RzX2R1ZV90b2RheScsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgcHJvamVjdHMgZHVlIHRvZGF5IVwiKTtcclxuXHRcdGJvdEhlbHBlci5wcm9qZWN0c0R1ZVRvZGF5KClcclxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xyXG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIGR1ZSB0b2RheS4uLlwiO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIGR1ZSB0b2RheS4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnByb2plY3RzQXR0YWNobWVudChwcm9qZWN0RGV0YWlscywgdGl0bGUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyoqKioqKioqKioqKioqKioqKiBQUk9KRUNUIFRBU0tTICoqKioqKioqKioqKioqKioqKi9cclxuXHR3aXRib3QuaGVhcnMoJ2FsbF90YXNrcycsMC44LCBmdW5jdGlvbihib3QsbWVzc2FnZSxjb3V0Y29tZSl7XHJcblx0XHRib3RIZWxwZXIuYWxsUHJvamVjdFRhc2tzKClcclxuXHRcdC50aGVuKCh0YXNrcykgPT57XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiSGVyZSBhcmUgdGhlIHRhc2tzIEkgZ290IGJhY2shXCIsdGFza3MpO1xyXG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIHRhc2tzIEkgY291bGQgZmluZC4uLlwiO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnRhc2tBdHRhY2htZW50KHRhc2tzLCB0aXRsZSk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuICAgIHdpdGJvdC5oZWFycygnYWxsX2luY29tcGxldGVfdGFza3MnLCAwLjIsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgYWxsIGluY29tcGxldGUgdGFza3MhXCIpO1xyXG5cdFx0Ym90SGVscGVyLmFsbEluY29tcGxldGVUYXNrcygpXHJcblx0XHQudGhlbigoaW5jb21wbGV0ZVRhc2tzKSA9PiB7XHJcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgaW5jb21wbGV0ZSB0YXNrcyBJIGNvdWxkIGZpbmQuLi5cIjtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBpbmNvbXBsZXRlIHRhc2tzIEkgcmV0dXJuZWQuLi4uXCIsIGluY29tcGxldGVUYXNrcyk7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIudGFza0F0dGFjaG1lbnQoaW5jb21wbGV0ZVRhc2tzLCB0aXRsZSk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FUVEFDSE1FTlQnLCBhdHRhY2htZW50KTtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuICAgIHdpdGJvdC5oZWFycygnb3ZlcmR1ZV90YXNrcycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgb3ZlcmR1ZSB0YXNrcyFcIik7XHJcblx0XHRib3RIZWxwZXIub3ZlcmR1ZVRhc2tzKClcclxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xyXG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIG92ZXJkdWUgdGFza3MgSSBjb3VsZCBmaW5kLi4uXCI7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIGFsbCB0aGUgb3ZlcmR1ZSB0YXNrcyBJIHJldHVybmVkLi4uLlwiLCBwcm9qZWN0RGV0YWlscyk7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XHJcblx0XHR9KVxyXG4gICAgICAgIC50aGVuKCh0YXNrTmFtZXMpID0+IHtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIHJldHVybmVkIHByb21pc2UuLi5cIiwgdGFza05hbWVzKTtcclxuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBvdmVyZHVlIHRhc2tzIEkgY291bGQgZmluZC4uLlwiO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLmF0dGFjaG1lbnRNYWtlcih0YXNrTmFtZXMsIHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xyXG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcclxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXHJcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuIFx0d2l0Ym90LmhlYXJzKCd0YXNrX2NvbXBsZXRlJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGNoYW5nZSB0aGUgdGFzayBzdGF0dXMgdG8gY29tcGxldGUuLi5cIik7XHJcbiAgICAgICAgdmFyIHRhc2tpZCA9IG91dGNvbWUuZW50aXRpZXMudGFza19pZFswXS52YWx1ZTtcclxuICAgICAgICB2YXIgbmV3Q2xlYW5JZDtcclxuICAgICAgICB2YXIgcHJvamVjdElkUmVmO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVEFTSyBJRFwiLCB0YXNraWQpXHJcblx0XHRyZXR1cm4gYm90SGVscGVyLmhhc2hTdHJpcHBlcih0YXNraWQpXHJcbiAgICAgICAgLnRoZW4oKGNsZWFuSWQpID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIGNsZWFuIElEIEkgbWFkZVwiLCBjbGVhbklkKTtcclxuICAgICAgICAgICAgbmV3Q2xlYW5JZCA9IGNsZWFuSWQ7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIuc3RhdHVzQ2hlY2soY2xlYW5JZCk7XHJcbiAgICAgICAgfSlcclxuXHRcdC50aGVuKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGFzaykge1xyXG4gICAgICAgICAgICAgICAgYm90LnJlcGx5KG1lc3NhZ2UsIFwiVGFzayBoYXMgYWxyZWFkeSBiZWVuIGNvbXBsZXRlZC5cIilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb2plY3RJZFJlZiA9IHRhc2tbMF0uYXNzb2NpYXRlZFByb2plY3Q7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYm90SGVscGVyLnRhc2tDb21wbGV0ZShuZXdDbGVhbklkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHRhc2spID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIHJldHVybmVkIHByb21pc2UuLi5cIiwgdGFzayk7XHJcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIHRoZSB0YXNrLi4uXCI7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIudGFza0F0dGFjaG1lbnQoW3Rhc2tdLCB0aXRsZSk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuXHRcdH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYm90SGVscGVyLnRhc2tDb21wbGV0ZUNvdW50KHByb2plY3RJZFJlZik7XHJcbiAgICAgICAgfSk7XHJcbiBcdH0pO1xyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKiogSU5DT01QTEVURSBQUk9KRUNUUyAqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cdHdpdGJvdC5oZWFycygnaW5jb21wbGV0ZV9wcm9qZWN0cycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBpbmNvbXBsZXRlIHByb2plY3RzIVwiKTtcclxuXHRcdGJvdEhlbHBlci5hbGxJbmNvbXBsZXRlUHJvamVjdHMoKVxyXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XHJcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgaW5jb21wbGV0ZSBwcm9qZWN0cyBJIGNvdWxkIGZpbmQuLi5cIjtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBpbmNvbXBsZXRlIHByb2plY3RzIEkgcmV0dXJuZWQuLi4uXCIsIHByb2plY3REZXRhaWxzKTtcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xyXG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcclxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXHJcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKiBDT01QTEVURSBQUk9KRUNUUyAqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cdHdpdGJvdC5oZWFycygnY29tcGxldGVfcHJvamVjdHMnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgY29tcGxldGUgcHJvamVjdHMhXCIpO1xyXG5cdFx0Ym90SGVscGVyLmFsbENvbXBsZXRlUHJvamVjdHMoKVxyXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XHJcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgY29tcGxldGUgcHJvamVjdHMgSSBjb3VsZCBmaW5kLi4uXCI7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIGFsbCB0aGUgY29tcGxldGUgcHJvamVjdHMgSSByZXR1cm5lZC4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnByb2plY3RzQXR0YWNobWVudChwcm9qZWN0RGV0YWlscywgdGl0bGUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG4gbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gfTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
