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
controller.spawn({
	//DevMtn Token
	// token: 'xoxb-18104911812-lrix7VmoDeWSS4PTA8SxNFnN',
	//Our Slack Token
	token: 'xoxb-19173759013-8uzX74R1NerEeFscDMEHIu39'
}).startRTM(function (err) {
	if (err) {
		throw new Error(err);
	}
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvc2xhY2tDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBTSxXQUFXLFFBQVEsVUFBUixDQUFYO0FBQ04sSUFBTSxTQUFTLFFBQVEsUUFBUixDQUFUO0FBQ04sSUFBTSxJQUFJLFFBQVEsR0FBUixDQUFKO0FBQ04sSUFBTSxZQUFZLFFBQVEsZ0NBQVIsQ0FBWjtBQUNOLElBQU0sWUFBWSxRQUFRLG1DQUFSLENBQVo7QUFDTixJQUFNLFNBQVMsUUFBUSxRQUFSLENBQVQ7O0FBRU4sSUFBTSxhQUFhLE9BQU8sUUFBUCxDQUFnQjtBQUNoQyxRQUFPLEtBQVA7Q0FEZ0IsQ0FBYjs7O0FBS0osV0FBVyxLQUFYLENBQWlCOzs7O0FBSWhCLFFBQU8sMkNBQVA7Q0FKRCxFQUtHLFFBTEgsQ0FLWSxVQUFTLEdBQVQsRUFBYztBQUN4QixLQUFJLEdBQUosRUFBUztBQUNQLFFBQU0sSUFBSSxLQUFKLENBQVUsR0FBVixDQUFOLENBRE87RUFBVDtDQURVLENBTFo7OztBQVlELElBQU0sU0FBUyxPQUFPLGtDQUFQLENBQVQ7Ozs7QUFNTixXQUFXLEtBQVgsQ0FBaUIsSUFBakIsRUFBdUIsK0JBQXZCLEVBQXdELFVBQVUsR0FBVixFQUFlLE9BQWYsRUFBd0I7QUFDL0UsUUFBTyxPQUFQLENBQWUsUUFBUSxJQUFSLEVBQWMsR0FBN0IsRUFBa0MsT0FBbEMsRUFEK0U7Q0FBeEIsQ0FBeEQ7O0FBSUEsT0FBTyxLQUFQLENBQWEsTUFBYixFQUFxQixHQUFyQixFQUEwQixVQUFVLEdBQVYsRUFBZSxPQUFmLEVBQXdCLE9BQXhCLEVBQWlDO0FBQzFELEtBQUksUUFBUSxHQUFSLENBRHNEO0FBRTFELEtBQUksWUFBWSxDQUNmLFlBRGUsRUFFZix3REFGZSxFQUdmLGtCQUhlLEVBSWYsa0NBSmUsRUFLZixnQkFMZSxFQU1mLDREQU5lLEVBT2YsZUFQZSxFQVFmLHNFQVJlLEVBU2YsTUFUZSxFQVVmLHNDQVZlLENB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bnRlbnQiOlsiXHJcbmNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuY29uc3QgQm90a2l0ID0gcmVxdWlyZSgnYm90a2l0Jyk7XHJcbmNvbnN0IFEgPSByZXF1aXJlKCdxJyk7XHJcbmNvbnN0IHBvc2l0aW9ucyA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3Bvc2l0aW9uQ3RybC5qcycpO1xyXG5jb25zdCBib3RIZWxwZXIgPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zbGFja0JvdEhlbHBlcnMuanMnKTtcclxuY29uc3QgV2l0Ym90ID0gcmVxdWlyZSgnd2l0Ym90Jyk7XHJcblxyXG5jb25zdCBjb250cm9sbGVyID0gQm90a2l0LnNsYWNrYm90KHtcclxuXHQgIGRlYnVnOiBmYWxzZVxyXG5cdH0pO1xyXG5cclxuXHQvLyBjb25uZWN0IHRoZSBib3QgdG8gYSBzdHJlYW0gb2YgbWVzc2FnZXNcclxuXHQgY29udHJvbGxlci5zcGF3bih7XHJcblx0IFx0Ly9EZXZNdG4gVG9rZW5cclxuXHQgICAvLyB0b2tlbjogJ3hveGItMTgxMDQ5MTE4MTItbHJpeDdWbW9EZVdTUzRQVEE4U3hORm5OJyxcclxuXHQgXHQvL091ciBTbGFjayBUb2tlblxyXG5cdCBcdHRva2VuOiAneG94Yi0xOTE3Mzc1OTAxMy04dXpYNzRSMU5lckVlRnNjRE1FSEl1MzknLFxyXG5cdCB9KS5zdGFydFJUTShmdW5jdGlvbihlcnIpIHtcclxuICAgIGlmIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG5cdC8vTElOSyBUSEUgQk9UIFRPIFdJVC5BSVxyXG5cdGNvbnN0IHdpdGJvdCA9IFdpdGJvdChcIkNaUElOQzZFVk9RN0RDUFpTVVVCUTNCNUdXUVZPUTY2XCJcclxuXHQpO1xyXG5cclxuXHJcblx0LyoqKioqKioqKioqKioqKioqKiBCT1QgU1BFQ0lGSUMgQ09NTUFORFMgKioqKioqKioqKioqKioqKioqL1xyXG5cdC8vd2lyZSB1cCBETSdzIGFuZCBkaXJlY3QgbWVudGlvbnMgdG8gd2l0LmFpXHJcblx0Y29udHJvbGxlci5oZWFycygnLionLCAnZGlyZWN0X21lc3NhZ2UsZGlyZWN0X21lbnRpb24nLCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlKSB7XHJcblx0XHR3aXRib3QucHJvY2VzcyhtZXNzYWdlLnRleHQsIGJvdCwgbWVzc2FnZSk7XHJcblx0fSk7XHJcblxyXG5cdHdpdGJvdC5oZWFycygnaGVscCcsIDAuNSwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0dmFyIHRpdGxlID0gXCIgXCI7XHJcblx0XHR2YXIgYm90U2tpbGx6ID0gW1xyXG5cdFx0XHRcInNob3cgcm9sZXNcIixcclxuXHRcdFx0XCJGb3Jnb3QgYSBqb2IgdGl0bGU/IEhlcmUncyBhbGwgb2YgZW0gZm9yIHlvdXIgY29tcGFueSFcIixcclxuXHRcdFx0J3Nob3cgZGVwYXJ0bWVudHMnLFxyXG5cdFx0XHRcIkFsbCB0aGUgZGVwYXJ0bWVudHMuIEFsbCBvZiBlbS4gXCIsXHJcblx0XHRcdCdzaG93IGVtcGxveWVlcycsXHJcblx0XHRcdFwiRG9uJ3QgZm9yZ2V0IHRoYXQgZ3V5IGluIGFjY291bnRpbmcncyBuYW1lLiBGaW5kIGhpbSBoZXJlIVwiLFxyXG5cdFx0XHQnc2hvdyBwcm9qZWN0cycsXHJcblx0XHRcdFwiSnVzdCBhIGxpc3Qgb2YgZXZlcnkgb3BlbiBwcm9qZWN0IGluIHlvdXIgY29tcGFueS4gTm93IGdldCB3b3JraW5nLiBcIixcclxuXHRcdFx0XCJoZWxwXCIsXHJcblx0XHRcdFwiVGVsbHMgeW91IGFsbCBhYm91dCBteSBtYWdpYyBwb3dlcnMuXCIsXHJcblx0XHRdO1xyXG5cdFx0Ym90SGVscGVyLmhlbHBBdHRhY2htZW50KGJvdFNraWxseix0aXRsZSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0d2l0Ym90Lm90aGVyd2lzZShmdW5jdGlvbiAoYm90LCBtZXNzYWdlKSB7XHJcblx0XHR2YXIgdGl0bGUgPSBcIiBcIjtcclxuXHRcdHZhciBib3RTa2lsbHogPSBbXHJcblx0XHRcdFwic2hvdyByb2xlc1wiLFxyXG5cdFx0XHRcIkZvcmdvdCBhIGpvYiB0aXRsZT8gSGVyZSdzIGFsbCBvZiBlbSBmb3IgeW91ciBjb21wYW55IVwiLFxyXG5cdFx0XHQnc2hvdyBkZXBhcnRtZW50cycsXHJcblx0XHRcdFwiQWxsIHRoZSBkZXBhcnRtZW50cy4gQWxsIG9mIGVtLiBcIixcclxuXHRcdFx0J3Nob3cgZW1wbG95ZWVzJyxcclxuXHRcdFx0XCJEb24ndCBmb3JnZXQgdGhhdCBndXkgaW4gYWNjb3VudGluZydzIG5hbWUuIEZpbmQgaGltIGhlcmUhXCIsXHJcblx0XHRcdCdzaG93IHByb2plY3RzJyxcclxuXHRcdFx0XCJKdXN0IGEgbGlzdCBvZiBldmVyeSBvcGVuIHByb2plY3QgaW4geW91ciBjb21wYW55LiBOb3cgZ2V0IHdvcmtpbmcuIFwiLFxyXG5cdFx0XHRcImhlbHBcIixcclxuXHRcdFx0XCJUZWxscyB5b3UgYWxsIGFib3V0IG15IG1hZ2ljIHBvd2Vycy5cIixcclxuXHRcdF07XHJcblx0XHRib3RIZWxwZXIuaGVscEF0dGFjaG1lbnQoYm90U2tpbGx6LHRpdGxlKVxyXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRjb250cm9sbGVyLmhlYXJzKFsnZG0gbWUnXSxbJ2RpcmVjdF9tZXNzYWdlJywnZGlyZWN0X21lbnRpb24nXSxmdW5jdGlvbihib3QsbWVzc2FnZSkge1xyXG5cdFx0Ym90LnN0YXJ0Q29udmVyc2F0aW9uKG1lc3NhZ2UsZnVuY3Rpb24oZXJyLGNvbnZvKSB7XHJcblx0XHRcdGNvbnZvLnNheSgnSGVhcmQgeWEnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGJvdC5zdGFydFByaXZhdGVDb252ZXJzYXRpb24obWVzc2FnZSxmdW5jdGlvbihlcnIsZG0pIHtcclxuXHRcdFx0ZG0uc2F5KCdQcml2YXRlIHJlcGx5IScpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qKioqKioqKioqKioqKioqKiogR1JFRVRJTkdTICoqKioqKioqKioqKioqKioqKi9cclxuXHR3aXRib3QuaGVhcnMoJ2dyZWV0aW5nJywgMC41LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIldJVC5BSSBPdXRjb21lXCIsIG91dGNvbWUpO1xyXG5cdFx0Y29uc29sZS5sb2coXCJXSVQuQUkgT3V0Y29tZVwiLCBvdXRjb21lLmVudGl0aWVzLmdyZWV0aW5nKTtcclxuXHRcdGJvdC5yZXBseShtZXNzYWdlLCAnR3JlZXRpbmdzIGVhcnRobGluZy4nKTtcclxuXHR9KTtcclxuXHJcblx0LyoqKioqKioqKioqKioqKioqKiBERVBBUlRNRU5UUyAqKioqKioqKioqKioqKioqKiovXHJcblx0d2l0Ym90LmhlYXJzKCdhbGxfZGVwYXJ0bWVudHMnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiV0lULkFJIE91dGNvbWVcIiwgb3V0Y29tZSk7XHJcblx0XHRib3RIZWxwZXIuYWxsRGVwYXJ0bWVudHMoKVxyXG5cdFx0LnRoZW4oKGRlcGFydG1lbnRzKSA9PntcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5hcnJheU1ha2VyKGRlcGFydG1lbnRzKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoZGVwYXJ0bWVudE5hbWVzKSA9PiB7XHJcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgZGVwYXJ0bWVudHMgSSBjb3VsZCBmaW5kLi4uXCI7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIuYXR0YWNobWVudE1ha2VyKGRlcGFydG1lbnROYW1lcywgdGl0bGUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyoqKioqKioqKioqKioqKioqKiBFTVBMT1lFRVMgKioqKioqKioqKioqKioqKioqL1xyXG5cdHdpdGJvdC5oZWFycygnYWxsX2VtcGxveWVlcycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Y29uc29sZS5sb2cob3V0Y29tZSk7XHJcblx0XHRib3RIZWxwZXIuYWxsRW1wbG95ZWVzKClcclxuXHRcdC50aGVuKChlbXBsb3llZXMpID0+e1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLmFycmF5TWFrZXJFbXBsb3llZU5hbWUoZW1wbG95ZWVzKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoZW1wbG95ZWVOYW1lcykgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgcmV0dXJuZWQgcHJvbWlzZS4uLlwiLCBlbXBsb3llZU5hbWVzKTtcclxuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBlbXBsb3llZXMgSSBjb3VsZCBmaW5kLi4uXCI7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIuYXR0YWNobWVudE1ha2VyKGVtcGxveWVlTmFtZXMsIHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xyXG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcclxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXHJcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqIFBPU0lUSU9OUyAqKioqKioqKioqKioqKioqKiovXHJcblx0d2l0Ym90LmhlYXJzKCdhbGxfcG9zaXRpb25zJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XHJcblx0XHRib3RIZWxwZXIuYWxsUG9zaXRpb25zKClcclxuXHRcdC50aGVuKChwb3NpdGlvbnMpID0+e1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLmFycmF5TWFrZXIocG9zaXRpb25zKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigocG9zaXRpb25OYW1lcykgPT4ge1xyXG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIHBvc2l0aW9ucyBJIGNvdWxkIGZpbmQuLi5cIjtcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5hdHRhY2htZW50TWFrZXIocG9zaXRpb25OYW1lcywgdGl0bGUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyoqKioqKioqKioqKioqKioqKiBQUk9KRUNUUyAqKioqKioqKioqKioqKioqKiovXHJcblx0d2l0Ym90LmhlYXJzKCdhbGxfcHJvamVjdHMnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgcHJvamVjdHMhXCIpO1xyXG5cdFx0Ym90SGVscGVyLmFsbFByb2plY3RzKClcclxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xyXG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIEkgY291bGQgZmluZC4uLlwiO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIEkgcmV0dXJuZWQuLi4uXCIsIHByb2plY3REZXRhaWxzKTtcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xyXG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcclxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXHJcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHdpdGJvdC5oZWFycygndGFza3NfaW5fcHJvamVjdCcsIDAuMywgZnVuY3Rpb24oYm90LG1lc3NhZ2UsIG91dGNvbWUpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIHdoYXQgV0lULkFJIHJldHVybmVkXCIsIG91dGNvbWUuZW50aXRpZXMucHJvamVjdF9pZCk7XHJcblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgd2hhdCBXSVQuQUkgcmV0dXJuZWRcIiwgb3V0Y29tZS5lbnRpdGllcy5wcm9qZWN0X2lkWzBdLnZhbHVlKTtcclxuXHRcdHZhciB0aXRsZSA9IFwiSGVyZSBhcmUgdGhlIHRhc2tzIGZvciBwcm9qZWN0IC0gXCIgKyBvdXRjb21lLmVudGl0aWVzLnByb2plY3RfaWRbMF0udmFsdWU7XHJcblx0XHR2YXIgcHJvamVjdElkID0gb3V0Y29tZS5lbnRpdGllcy5wcm9qZWN0X2lkWzBdLnZhbHVlO1xyXG5cdFx0cmV0dXJuIGJvdEhlbHBlci5oYXNoU3RyaXBwZXIocHJvamVjdElkKVxyXG5cdFx0LnRoZW4oKGNsZWFuSWQpID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIGNsZWFuIElEIEkgbWFkZVwiLCBjbGVhbklkKTtcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci50YXNrc0luUHJvamVjdChjbGVhbklkKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigocHJvamVjdCkgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIldIYXQgd2UgZ290eiBiYWNrXCIsIHByb2plY3RbMF0udGFza3MpO1xyXG5cdFx0XHR2YXIgYXJyYXkgPSBwcm9qZWN0WzBdLnRhc2tzO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgdGFza3MgYXNzb2NpYXRlZCB3aXRoIHRoYXQgcHJvamVjdFwiLCBhcnJheSk7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIudGFza0F0dGFjaG1lbnQoYXJyYXksdGl0bGUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KT0+IHtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIGJvdC5yZXBseShtZXNzYWdlLCBcIkxldCBtZSBnZXQgdGhvc2UgdGFza3MgZm9yIHlvdSFcIik7XHJcblx0fSk7XHJcblxyXG5cdHdpdGJvdC5oZWFycygnb3ZlcmR1ZV9wcm9qZWN0cycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgb3ZlcmR1ZSBwcm9qZWN0cyFcIik7XHJcblx0XHRib3RIZWxwZXIub3ZlcmR1ZVByb2plY3RzKClcclxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xyXG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIG92ZXJkdWUgcHJvamVjdHMgSSBjb3VsZCBmaW5kLi4uXCI7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIGFsbCB0aGUgb3ZlcmR1ZSBwcm9qZWN0cyBJIHJldHVybmVkLi4uLlwiLCBwcm9qZWN0RGV0YWlscyk7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHR3aXRib3QuaGVhcnMoJ2luc3VsdCcsIDAuNywgZnVuY3Rpb24oYm90LG1lc3NhZ2Usb3V0Y29tZSl7XHJcblx0XHRjb25zb2xlLmxvZyhcIllPVSBJTlNVTFRFRCBNRSFcIik7XHJcblx0XHRib3QucmVwbHkobWVzc2FnZSwgXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PUtXemE1UFFBNVpjXCIpO1xyXG5cdH0pO1xyXG5cclxuXHR3aXRib3QuaGVhcnMoJ2pva2UnLCAwLjUsIGZ1bmN0aW9uKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSl7XHJcblx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyB5b3VyIGpva2VcIik7XHJcblx0XHRib3QucmVwbHkobWVzc2FnZSwgXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PUl0M0RVMkhNYmFZXCIpO1xyXG5cdH0pO1xyXG5cclxuXHR3aXRib3QuaGVhcnMoJ2NhbmFkYScsIDAuNSwgZnVuY3Rpb24oYm90LG1lc3NhZ2Usb3V0Y29tZSl7XHJcblx0XHRib3QucmVwbHkobWVzc2FnZSwgXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PXBGQ2Q0Wk9UVmc0XCIpO1xyXG5cdH0pO1xyXG5cclxuXHR3aXRib3QuaGVhcnMoJ2ppbW15JywgMC4zLCBmdW5jdGlvbihib3QsIG1lc3NhZ2UsIG91dGNvbWUpe1xyXG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1jVGw3NjJNdVh5Y1wiKTtcclxuXHR9KTtcclxuXHJcblx0d2l0Ym90LmhlYXJzKCdicm93bmJhZycsIDAuNCwgZnVuY3Rpb24oYm90LG1lc3NhZ2Usb3V0Y29tZSl7XHJcblx0XHRib3QucmVwbHkobWVzc2FnZSxcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9ZVBrUFlBNEFRM29cIik7XHJcblx0fSk7XHJcblxyXG5cdHdpdGJvdC5oZWFycygnY2FobGFuJywgMC4zLCBmdW5jdGlvbihib3QsbWVzc2FnZSxvdXRjb21lKXtcclxuXHRcdGJvdC5yZXBseShtZXNzYWdlLCBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9SG1xQ0RncjN5UWdcIik7XHJcblx0fSk7XHJcblxyXG4gICAgd2l0Ym90LmhlYXJzKCd3aWxzb24nLCAwLjMsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLG91dGNvbWUpe1xyXG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0zZ05ya2d3UzZhTVwiKTtcclxuXHR9KTtcclxuXHJcbiAgICB3aXRib3QuaGVhcnMoJ3Byb2plY3RzX2R1ZV90aGlzX21vbnRoJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IGFsbCBwcm9qZWN0cyBkdWUgdGhpcyBtb250aCFcIik7XHJcblx0XHRib3RIZWxwZXIucHJvamVjdHNEdWVUaGlzTW9udGgoKVxyXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XHJcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgcHJvamVjdHMgZHVlIHRoaXMgbW9udGguLi5cIjtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBkdWUgdGhpcyBtb250aC4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnByb2plY3RzQXR0YWNobWVudChwcm9qZWN0RGV0YWlscywgdGl0bGUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIRUxMTycsIGF0dGFjaG1lbnQpO1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xyXG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcclxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXHJcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG4gICAgd2l0Ym90LmhlYXJzKCdwcm9qZWN0c19kdWVfdGhpc193ZWVrJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IGFsbCBwcm9qZWN0cyBkdWUgdGhpcyB3ZWVrIVwiKTtcclxuXHRcdGJvdEhlbHBlci5wcm9qZWN0c0R1ZVRoaXNXZWVrKClcclxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xyXG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIGR1ZSB0aGlzIHdlZWsuLi5cIjtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBkdWUgdGhpcyB3ZWVrLi4uLlwiLCBwcm9qZWN0RGV0YWlscyk7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuICAgIHdpdGJvdC5oZWFycygncHJvamVjdHNfZHVlX3RvZGF5JywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IGFsbCBwcm9qZWN0cyBkdWUgdG9kYXkhXCIpO1xyXG5cdFx0Ym90SGVscGVyLnByb2plY3RzRHVlVG9kYXkoKVxyXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XHJcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgcHJvamVjdHMgZHVlIHRvZGF5Li4uXCI7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIGFsbCB0aGUgcHJvamVjdHMgZHVlIHRvZGF5Li4uLlwiLCBwcm9qZWN0RGV0YWlscyk7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqIFBST0pFQ1QgVEFTS1MgKioqKioqKioqKioqKioqKioqL1xyXG5cdHdpdGJvdC5oZWFycygnYWxsX3Rhc2tzJywwLjgsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLGNvdXRjb21lKXtcclxuXHRcdGJvdEhlbHBlci5hbGxQcm9qZWN0VGFza3MoKVxyXG5cdFx0LnRoZW4oKHRhc2tzKSA9PntcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJIZXJlIGFyZSB0aGUgdGFza3MgSSBnb3QgYmFjayFcIix0YXNrcyk7XHJcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgdGFza3MgSSBjb3VsZCBmaW5kLi4uXCI7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIudGFza0F0dGFjaG1lbnQodGFza3MsIHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xyXG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcclxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXHJcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG4gICAgd2l0Ym90LmhlYXJzKCdhbGxfaW5jb21wbGV0ZV90YXNrcycsIDAuMiwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgaW5jb21wbGV0ZSB0YXNrcyFcIik7XHJcblx0XHRib3RIZWxwZXIuYWxsSW5jb21wbGV0ZVRhc2tzKClcclxuXHRcdC50aGVuKChpbmNvbXBsZXRlVGFza3MpID0+IHtcclxuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBpbmNvbXBsZXRlIHRhc2tzIEkgY291bGQgZmluZC4uLlwiO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIGluY29tcGxldGUgdGFza3MgSSByZXR1cm5lZC4uLi5cIiwgaW5jb21wbGV0ZVRhc2tzKTtcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci50YXNrQXR0YWNobWVudChpbmNvbXBsZXRlVGFza3MsIHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQVRUQUNITUVOVCcsIGF0dGFjaG1lbnQpO1xyXG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcclxuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcclxuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xyXG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcclxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXHJcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG4gICAgd2l0Ym90LmhlYXJzKCdvdmVyZHVlX3Rhc2tzJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IGFsbCBvdmVyZHVlIHRhc2tzIVwiKTtcclxuXHRcdGJvdEhlbHBlci5vdmVyZHVlVGFza3MoKVxyXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XHJcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgb3ZlcmR1ZSB0YXNrcyBJIGNvdWxkIGZpbmQuLi5cIjtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBvdmVyZHVlIHRhc2tzIEkgcmV0dXJuZWQuLi4uXCIsIHByb2plY3REZXRhaWxzKTtcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcclxuXHRcdH0pXHJcbiAgICAgICAgLnRoZW4oKHRhc2tOYW1lcykgPT4ge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgcmV0dXJuZWQgcHJvbWlzZS4uLlwiLCB0YXNrTmFtZXMpO1xyXG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIG92ZXJkdWUgdGFza3MgSSBjb3VsZCBmaW5kLi4uXCI7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIuYXR0YWNobWVudE1ha2VyKHRhc2tOYW1lcywgdGl0bGUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG4gXHR3aXRib3QuaGVhcnMoJ3Rhc2tfY29tcGxldGUnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gY2hhbmdlIHRoZSB0YXNrIHN0YXR1cyB0byBjb21wbGV0ZS4uLlwiKTtcclxuICAgICAgICB2YXIgdGFza2lkID0gb3V0Y29tZS5lbnRpdGllcy50YXNrX2lkWzBdLnZhbHVlO1xyXG4gICAgICAgIHZhciBuZXdDbGVhbklkO1xyXG4gICAgICAgIHZhciBwcm9qZWN0SWRSZWY7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUQVNLIElEXCIsIHRhc2tpZClcclxuXHRcdHJldHVybiBib3RIZWxwZXIuaGFzaFN0cmlwcGVyKHRhc2tpZClcclxuICAgICAgICAudGhlbigoY2xlYW5JZCkgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgY2xlYW4gSUQgSSBtYWRlXCIsIGNsZWFuSWQpO1xyXG4gICAgICAgICAgICBuZXdDbGVhbklkID0gY2xlYW5JZDtcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5zdGF0dXNDaGVjayhjbGVhbklkKTtcclxuICAgICAgICB9KVxyXG5cdFx0LnRoZW4oKHRhc2spID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBib3QucmVwbHkobWVzc2FnZSwgXCJUYXNrIGhhcyBhbHJlYWR5IGJlZW4gY29tcGxldGVkLlwiKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdElkUmVmID0gdGFza1swXS5hc3NvY2lhdGVkUHJvamVjdDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBib3RIZWxwZXIudGFza0NvbXBsZXRlKG5ld0NsZWFuSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigodGFzaykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgcmV0dXJuZWQgcHJvbWlzZS4uLlwiLCB0YXNrKTtcclxuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgdGhlIHRhc2suLi5cIjtcclxuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci50YXNrQXR0YWNobWVudChbdGFza10sIHRpdGxlKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRkZWZlcnJlZC5yZXNvbHZlKGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0fSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBib3RIZWxwZXIudGFza0NvbXBsZXRlQ291bnQocHJvamVjdElkUmVmKTtcclxuICAgICAgICB9KTtcclxuIFx0fSk7XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKiBJTkNPTVBMRVRFIFBST0pFQ1RTICoqKioqKioqKioqKioqKioqKi9cclxuXHJcblx0d2l0Ym90LmhlYXJzKCdpbmNvbXBsZXRlX3Byb2plY3RzJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IGluY29tcGxldGUgcHJvamVjdHMhXCIpO1xyXG5cdFx0Ym90SGVscGVyLmFsbEluY29tcGxldGVQcm9qZWN0cygpXHJcblx0XHQudGhlbigocHJvamVjdERldGFpbHMpID0+IHtcclxuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBpbmNvbXBsZXRlIHByb2plY3RzIEkgY291bGQgZmluZC4uLlwiO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIGluY29tcGxldGUgcHJvamVjdHMgSSByZXR1cm5lZC4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xyXG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnByb2plY3RzQXR0YWNobWVudChwcm9qZWN0RGV0YWlscywgdGl0bGUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XHJcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xyXG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xyXG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XHJcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxyXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcclxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqIENPTVBMRVRFIFBST0pFQ1RTICoqKioqKioqKioqKioqKioqKi9cclxuXHJcblx0d2l0Ym90LmhlYXJzKCdjb21wbGV0ZV9wcm9qZWN0cycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBjb21wbGV0ZSBwcm9qZWN0cyFcIik7XHJcblx0XHRib3RIZWxwZXIuYWxsQ29tcGxldGVQcm9qZWN0cygpXHJcblx0XHQudGhlbigocHJvamVjdERldGFpbHMpID0+IHtcclxuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBjb21wbGV0ZSBwcm9qZWN0cyBJIGNvdWxkIGZpbmQuLi5cIjtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBjb21wbGV0ZSBwcm9qZWN0cyBJIHJldHVybmVkLi4uLlwiLCBwcm9qZWN0RGV0YWlscyk7XHJcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcclxuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XHJcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XHJcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcclxuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXHJcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxyXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcbiBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiB9O1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
