'use strict';

var mongoose = require('mongoose');
var Template = require('../models/Template.js');
var TemplateTask = require('../models/TemplateTask.js');
var Department = require('../models/Department.js');
var Position = require('../models/Position.js');
var Employee = require('../models/Employee.js');

module.exports = {
  newTemplate: function newTemplate(req, res) {
    var template = new Template(req.body);
    template.save().then(function (result) {
      return res.json(result);
    }).catch(function (err) {
      return res.status(500).end();
    });
  },
  oneTemplate: function oneTemplate(req, res) {

    var templateOptions = {
      path: 'tasks',
      model: 'TemplateTask',
      populate: {
        path: "assignment.employees",
        model: "Employee",
        select: "identification.name.fullName"
      }
    };

    console.log("id?", req.params.id);

    Template.findById(req.params.id).populate(templateOptions).exec().then(function (result) {
      console.log("RESULT ON back", result);
      return res.json(result);
    }).catch(function (err) {
      console.log(err.stack);
      return res.status(500).end();
    });
  },
  editTemplate: function editTemplate(req, res) {
    Template.update({ _id: req.params.id }, req.body).then(function () {
      return res.status(200).end();
    }).catch(function (err) {
      console.log(err.stack);
      return res.status(500).end();
    });
  },
  deleteTemplate: function deleteTemplate(req, res) {
    Template.remove({ _id: req.params.id }, req.body).then(function () {
      return res.status(200).end();
    }).catch(function (err) {
      console.log(err.stack);
      return res.status(500).end();
    });
  },
  allTemplates: function allTemplates(req, res) {
    Template.find().populate('tasks').exec().then(function (result) {
      return res.json(result);
    }).catch(function (err) {
      console.log(err.stack);
      return res.status(500).end();
    });
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvdGVtcGxhdGVDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxXQUFXLFFBQVEsVUFBUixDQUFYO0FBQ04sSUFBTSxXQUFXLFFBQVEsdUJBQVIsQ0FBWDtBQUNOLElBQU0sZUFBZSxRQUFRLDJCQUFSLENBQWY7QUFDTixJQUFNLGFBQWEsUUFBUSx5QkFBUixDQUFiO0FBQ04sSUFBTSxXQUFXLFFBQVEsdUJBQVIsQ0FBWDtBQUNOLElBQU0sV0FBVyxRQUFRLHVCQUFSLENBQVg7O0FBRU4sT0FBTyxPQUFQLEdBQWlCO0FBRWpCLG9DQUFZLEtBQUssS0FBSztBQUNwQixRQUFNLFdBQVcsSUFBSSxRQUFKLENBQWEsSUFBSSxJQUFKLENBQXhCLENBRGM7QUFFcEIsYUFBUyxJQUFULEdBQWdCLElBQWhCLENBQXFCLFVBQUMsTUFBRCxFQUFZO0FBQy9CLGFBQU8sSUFBSSxJQUFKLENBQVMsTUFBVCxDQUFQLENBRCtCO0tBQVosQ0FBckIsQ0FFRyxLQUZILENBRVMsVUFBQyxHQUFELEVBQVM7QUFDaEIsYUFBTyxJQUFJLE1BQUosQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQVAsQ0FEZ0I7S0FBVCxDQUZULENBRm9CO0dBRkw7QUFXakIsb0NBQVksS0FBSyxLQUFLOztBQUVwQixRQUFJLGtCQUFrQjtBQUNwQixZQUFNLE9BQU47QUFDQSxhQUFPLGNBQVA7QUFDQSxnQkFBVTtBQUNSLGNBQUssc0JBQUw7QUFDQSxlQUFPLFVBQVA7QUFDQSxnQkFBUSw4QkFBUjtPQUhGO0tBSEUsQ0FGZ0I7O0FBWXBCLFlBQVEsR0FBUixDQUFZLEtBQVosRUFBbUIsSUFBSSxNQUFKLENBQVcsRUFBWCxDQUFuQixDQVpvQjs7QUFjcEIsYUFBUyxRQUFULENBQWtCLElBQUksTUFBSixDQUFXLEVBQVgsQ0FBbEIsQ0FDQyxRQURELENBQ1UsZUFEVixFQUMyQixJQUQzQixHQUVDLElBRkQsQ0FFTSxVQUFDLE1BQUQsRUFBWTtBQUNoQixjQUFRLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixNQUE5QixFQURnQjtBQUVoQixhQUFPLElBQUksSUFBSixDQUFTLE1BQVQsQ0FBUCxDQUZnQjtLQUFaLENBRk4sQ0FLRyxLQUxILENBS1MsVUFBQyxHQUFELEVBQVM7QUFDaEIsY0FBUSxHQUFSLENBQVksSUFBSSxLQUFKLENBQVosQ0FEZ0I7QUFFaEIsYUFBTyxJQUFJLE1BQUosQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQVAsQ0FGZ0I7S0FBVCxDQUxULENBZG9CO0dBWEw7QUFvQ2pCLHNDQUFhLEtBQUssS0FBSztBQUNyQixhQUFTLE1BQVQsQ0FBZ0IsRUFBQyxLQUFLLElBQUksTUFBSixDQUFXLEVBQVgsRUFBdEIsRUFBc0MsSUFBSSxJQUFKLENBQXRDLENBQWdELElBQWhELENBQXFELFlBQU07QUFDekQsYUFBTyxJQUFJLE1BQUosQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQVAsQ0FEeUQ7S0FBTixDQUFyRCxDQUVHLEtBRkgsQ0FFUyxVQUFDLEdBQUQsRUFBUztBQUNoQixjQUFRLEdBQVIsQ0FBWSxJQUFJLEtBQUosQ0FBWixDQURnQjtBQUVoQixhQUFPLElBQUksTUFBSixDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBUCxDQUZnQjtLQUFULENBRlQsQ0FEcUI7R0FwQ047QUE2Q2pCLDBDQUFlLEtBQUssS0FBSztBQUN2QixhQUFTLE1BQVQsQ0FBZ0IsRUFBQyxLQUFLLElBQUksTUFBSixDQUFXLEVBQVgsRUFBdEIsRUFBc0MsSUFBSSxJQUFKLENBQXRDLENBQWdELElBQWhELENBQXFELFlBQU07QUFDekQsYUFBTyxJQUFJLE1BQUosQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQVAsQ0FEeUQ7S0FBTixDQUFyRCxDQUVHLEtBRkgsQ0FFUyxVQUFDLEdBQUQsRUFBUztBQUNoQixjQUFRLEdBQVIsQ0FBWSxJQUFJLEtBQUosQ0FBWixDQURnQjtBQUVoQixhQUFPLElBQUksTUFBSixDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBUCxDQUZnQjtLQUFULENBRlQsQ0FEdUI7R0E3Q1I7QUFzRGpCLHNDQUFhLEtBQUssS0FBSztBQUNyQixhQUFTLElBQVQsR0FBZ0IsUUFBaEIsQ0FBeUIsT0FBekIsRUFBa0MsSUFBbEMsR0FBeUMsSUFBekMsQ0FBOEMsVUFBQyxNQUFELEVBQVk7QUFDeEQsYUFBTyxJQUFJLElBQUosQ0FBUyxNQUFULENBQVAsQ0FEd0Q7S0FBWixDQUE5QyxDQUVHLEtBRkgsQ0FFUyxVQUFDLEdBQUQsRUFBUztBQUNoQixjQUFRLEdBQVIsQ0FBWSxJQUFJLEtBQUosQ0FBWixDQURnQjtBQUVoQixhQUFPLElBQUksTUFBSixDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBUCxDQUZnQjtLQUFULENBRlQsQ0FEcUI7R0F0RE47Q0FBakIiLCJmaWxlIjoic2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy90ZW1wbGF0ZUN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XHJcbmNvbnN0IFRlbXBsYXRlID0gcmVxdWlyZSgnLi4vbW9kZWxzL1RlbXBsYXRlLmpzJyk7XHJcbmNvbnN0IFRlbXBsYXRlVGFzayA9IHJlcXVpcmUoJy4uL21vZGVscy9UZW1wbGF0ZVRhc2suanMnKTtcclxuY29uc3QgRGVwYXJ0bWVudCA9IHJlcXVpcmUoJy4uL21vZGVscy9EZXBhcnRtZW50LmpzJyk7XHJcbmNvbnN0IFBvc2l0aW9uID0gcmVxdWlyZSgnLi4vbW9kZWxzL1Bvc2l0aW9uLmpzJyk7XHJcbmNvbnN0IEVtcGxveWVlID0gcmVxdWlyZSgnLi4vbW9kZWxzL0VtcGxveWVlLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbm5ld1RlbXBsYXRlKHJlcSwgcmVzKSB7XHJcbiAgY29uc3QgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUocmVxLmJvZHkpO1xyXG4gIHRlbXBsYXRlLnNhdmUoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgIHJldHVybiByZXMuanNvbihyZXN1bHQpO1xyXG4gIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuZW5kKCk7XHJcbiAgfSk7XHJcbn0sXHJcblxyXG5vbmVUZW1wbGF0ZShyZXEsIHJlcykge1xyXG5cclxuICB2YXIgdGVtcGxhdGVPcHRpb25zID0ge1xyXG4gICAgcGF0aDogJ3Rhc2tzJyxcclxuICAgIG1vZGVsOiAnVGVtcGxhdGVUYXNrJyxcclxuICAgIHBvcHVsYXRlOiB7XHJcbiAgICAgIHBhdGg6XCJhc3NpZ25tZW50LmVtcGxveWVlc1wiLFxyXG4gICAgICBtb2RlbDogXCJFbXBsb3llZVwiLFxyXG4gICAgICBzZWxlY3Q6IFwiaWRlbnRpZmljYXRpb24ubmFtZS5mdWxsTmFtZVwiXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhcImlkP1wiLCByZXEucGFyYW1zLmlkKTtcclxuXHJcbiAgVGVtcGxhdGUuZmluZEJ5SWQocmVxLnBhcmFtcy5pZClcclxuICAucG9wdWxhdGUodGVtcGxhdGVPcHRpb25zKS5leGVjKClcclxuICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlJFU1VMVCBPTiBiYWNrXCIsIHJlc3VsdCk7XHJcbiAgICByZXR1cm4gcmVzLmpzb24ocmVzdWx0KTtcclxuICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIuc3RhY2spO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5lbmQoKTtcclxuICB9KTtcclxufSxcclxuXHJcbmVkaXRUZW1wbGF0ZShyZXEsIHJlcykge1xyXG4gIFRlbXBsYXRlLnVwZGF0ZSh7X2lkOiByZXEucGFyYW1zLmlkfSwgcmVxLmJvZHkpLnRoZW4oKCkgPT4ge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5lbmQoKTtcclxuICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIuc3RhY2spO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5lbmQoKTtcclxuICB9KTtcclxufSxcclxuXHJcbmRlbGV0ZVRlbXBsYXRlKHJlcSwgcmVzKSB7XHJcbiAgVGVtcGxhdGUucmVtb3ZlKHtfaWQ6IHJlcS5wYXJhbXMuaWR9LCByZXEuYm9keSkudGhlbigoKSA9PiB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmVuZCgpO1xyXG4gIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmVuZCgpO1xyXG4gIH0pO1xyXG59LFxyXG5cclxuYWxsVGVtcGxhdGVzKHJlcSwgcmVzKSB7XHJcbiAgVGVtcGxhdGUuZmluZCgpLnBvcHVsYXRlKCd0YXNrcycpLmV4ZWMoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgIHJldHVybiByZXMuanNvbihyZXN1bHQpO1xyXG4gIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmVuZCgpO1xyXG4gIH0pO1xyXG59XHJcblxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
