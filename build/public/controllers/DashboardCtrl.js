'use strict';

angular.module('terminatorApp').controller('DashboardCtrl', function ($scope, CompanySvc, ProjectsSvc, TemplatesSvc) {

  $scope.cssClass = 'page-dashboard';

  $scope.getCompanies = function () {
    CompanySvc.getCompanies().then(function (res) {
      $scope.companies = res.data;
    });
  }();

  $scope.getProjects = function () {
    ProjectsSvc.getProjects().then(function (res) {
      $scope.projects = res.data;
    });
  }();

  $scope.getTemplates = function () {
    TemplatesSvc.getTemplates().then(function (res) {
      $scope.templates = res.data;
    });
  }();

  //////////////////////
  // Datepicker Stuff
  //////////////////////

  $scope.today = function () {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function (date, mode) {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  };

  $scope.toggleMin = function () {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function () {
    $scope.popup2.opened = true;
  };

  $scope.open3 = function () {
    $scope.popup3.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['MM-dd-yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];

  $scope.popup1 = {
    opened: false
  };

  ///////////////////////////////////////////////////////////
  //  Highcharts Stuff
  ///////////////////////////////////////////////////////////

  $scope.projectsPerWeek = {
    options: {
      colors: ['#50B432'],
      chart: {
        type: 'area',
        enableMouseTracking: true,
        plotShadow: true
      },
      legend: {
        backgroundColor: '#FCFFC5'
      }
    },

    xAxis: {
      title: {
        text: "Months"
      },
      categories: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      title: {
        text: 'Completed Projects'
      }
    },
    series: [{
      name: 'Actual',
      data: [5, 7, 3.5, 6, 2, 9, 4]
    }],
    title: {
      text: 'Projects Completed This Week'
    },
    loading: false
  };

  $scope.projectsPerMonth = {
    options: {
      chart: {
        type: 'areaspline',
        enableMouseTracking: true
      }
    },
    xAxis: {
      title: {
        text: "Years"
      },
      categories: ['Jan', 'Feb', "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: 'Dollars'
      }
    },
    series: [{
      name: 'Actual',
      data: [5, 7, 3.5, 6, 2, 9, 4, 5, 3, 5, 1, 6]
    }],
    title: {
      text: 'Projects Completed Per Month'
    },
    loading: false
  };

  ///////////////////////////////////////////////////////////
  //  Tooltip Stuff
  ///////////////////////////////////////////////////////////

  $scope.overdueTaskTip = "This is the overdue tasks card. It will tell you how many overdue tasks you have currently, as well as let you click the icon on the bottom-right corner to show you which tasks those are.";
  $scope.currentProjectTip = "Here is how many current tasks you have. If you want to see what those current projects are, click on the icon above.";
  $scope.activityTip = "It's very important to know how your business is running from the productivity and effiency side. Click on the icon above to get a more in-depth analysis.";
  $scope.companyDetailsTip = "Here, you will be able to view your departments, positions, and employees, as well add, edit and remove all of the above. Click the icon on the bottom right corner to go to that page.";
  $scope.activitySnapshotTop = "Here is a small snapshot of tasks completed this week and projects completed per month. If you want more information, click on the bottom of the Activity Card.";
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9jb250cm9sbGVycy9EYXNoYm9hcmRDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsUUFBUSxNQUFSLENBQWUsZUFBZixFQUFnQyxVQUFoQyxDQUEyQyxlQUEzQyxFQUE0RCxVQUFTLE1BQVQsRUFBaUIsVUFBakIsRUFBNkIsV0FBN0IsRUFBMEMsWUFBMUMsRUFBd0Q7O0FBRWxILFNBQU8sUUFBUCxHQUFrQixnQkFBbEIsQ0FGa0g7O0FBSWxILFNBQU8sWUFBUCxHQUFzQixZQUFXO0FBQy9CLGVBQVcsWUFBWCxHQUEwQixJQUExQixDQUErQixVQUFTLEdBQVQsRUFBYztBQUMzQyxhQUFPLFNBQVAsR0FBbUIsSUFBSSxJQUFKLENBRHdCO0tBQWQsQ0FBL0IsQ0FEK0I7R0FBWCxFQUF0QixDQUprSDs7QUFVbEgsU0FBTyxXQUFQLEdBQXFCLFlBQVc7QUFDOUIsZ0JBQVksV0FBWixHQUEwQixJQUExQixDQUErQixVQUFTLEdBQVQsRUFBYztBQUMzQyxhQUFPLFFBQVAsR0FBa0IsSUFBSSxJQUFKLENBRHlCO0tBQWQsQ0FBL0IsQ0FEOEI7R0FBWCxFQUFyQixDQVZrSDs7QUFnQmxILFNBQU8sWUFBUCxHQUFzQixZQUFZO0FBQ2hDLGlCQUFhLFlBQWIsR0FBNEIsSUFBNUIsQ0FBaUMsVUFBUyxHQUFULEVBQWE7QUFDNUMsYUFBTyxTQUFQLEdBQW1CLElBQUksSUFBSixDQUR5QjtLQUFiLENBQWpDLENBRGdDO0dBQVosRUFBdEI7Ozs7OztBQWhCa0gsUUE0QmxILENBQU8sS0FBUCxHQUFlLFlBQVc7QUFDeEIsV0FBTyxFQUFQLEdBQVksSUFBSSxJQUFKLEVBQVosQ0FEd0I7R0FBWCxDQTVCbUc7QUErQmxILFNBQU8sS0FBUCxHQS9Ca0g7O0FBaUNsSCxTQUFPLEtBQVAsR0FBZSxZQUFXO0FBQ3hCLFdBQU8sRUFBUCxHQUFZLElBQVosQ0FEd0I7R0FBWDs7O0FBakNtRyxRQXNDbEgsQ0FBTyxRQUFQLEdBQWtCLFVBQVMsSUFBVCxF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Q0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsQ0FBTjtLQUZJLENBQVI7QUFJQSxXQUFPO0FBQ0gsWUFBTSw4QkFBTjtLQURKO0FBR0EsYUFBUyxLQUFUO0dBekJKOzs7Ozs7QUEvR2dILFFBaUpsSCxDQUFPLGNBQVAsR0FBd0IsNkxBQXhCLENBakprSDtBQWtKbEgsU0FBTyxpQkFBUCxHQUEyQix1SEFBM0IsQ0FsSmtIO0FBbUpsSCxTQUFPLFdBQVAsR0FBcUIsNEpBQXJCLENBbkprSDtBQW9KbEgsU0FBTyxpQkFBUCxHQUEyQix5TEFBM0IsQ0FwSmtIO0FBcUpsSCxTQUFPLG1CQUFQLEdBQTZCLGlLQUE3QixDQXJKa0g7Q0FBeEQsQ0FBNUQiLCJmaWxlIjoicHVibGljL2NvbnRyb2xsZXJzL0Rhc2hib2FyZEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndGVybWluYXRvckFwcCcpLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIENvbXBhbnlTdmMsIFByb2plY3RzU3ZjLCBUZW1wbGF0ZXNTdmMpIHtcclxuXHJcbiAgJHNjb3BlLmNzc0NsYXNzID0gJ3BhZ2UtZGFzaGJvYXJkJztcclxuXHJcbiAgJHNjb3BlLmdldENvbXBhbmllcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgQ29tcGFueVN2Yy5nZXRDb21wYW5pZXMoKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAkc2NvcGUuY29tcGFuaWVzID0gcmVzLmRhdGE7XHJcbiAgICB9KTtcclxuICB9KCk7XHJcblxyXG4gICRzY29wZS5nZXRQcm9qZWN0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgUHJvamVjdHNTdmMuZ2V0UHJvamVjdHMoKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAkc2NvcGUucHJvamVjdHMgPSByZXMuZGF0YTtcclxuICAgIH0pO1xyXG4gIH0oKTtcclxuXHJcbiAgJHNjb3BlLmdldFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFRlbXBsYXRlc1N2Yy5nZXRUZW1wbGF0ZXMoKS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICRzY29wZS50ZW1wbGF0ZXMgPSByZXMuZGF0YTtcclxuICAgIH0pXHJcbiAgfSgpO1xyXG5cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAvLyBEYXRlcGlja2VyIFN0dWZmXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAkc2NvcGUudG9kYXkgPSBmdW5jdGlvbigpIHtcclxuICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKCk7XHJcbiAgfTtcclxuICAkc2NvcGUudG9kYXkoKTtcclxuXHJcbiAgJHNjb3BlLmNsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUuZHQgPSBudWxsO1xyXG4gIH07XHJcblxyXG4gIC8vIERpc2FibGUgd2Vla2VuZCBzZWxlY3Rpb25cclxuICAkc2NvcGUuZGlzYWJsZWQgPSBmdW5jdGlvbihkYXRlLCBtb2RlKSB7XHJcbiAgICByZXR1cm4gbW9kZSA9PT0gJ2RheScgJiYgKGRhdGUuZ2V0RGF5KCkgPT09IDAgfHwgZGF0ZS5nZXREYXkoKSA9PT0gNik7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLnRvZ2dsZU1pbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJHNjb3BlLm1pbkRhdGUgPSAkc2NvcGUubWluRGF0ZSA/IG51bGwgOiBuZXcgRGF0ZSgpO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS50b2dnbGVNaW4oKTtcclxuICAkc2NvcGUubWF4RGF0ZSA9IG5ldyBEYXRlKDIwMjAsIDUsIDIyKTtcclxuXHJcbiAgJHNjb3BlLm9wZW4xID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUucG9wdXAxLm9wZW5lZCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLm9wZW4yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUucG9wdXAyLm9wZW5lZCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLm9wZW4zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkc2NvcGUucG9wdXAzLm9wZW5lZCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xyXG4gICAgZm9ybWF0WWVhcjogJ3l5JyxcclxuICAgIHN0YXJ0aW5nRGF5OiAxXHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLmZvcm1hdHMgPSBbJ01NLWRkLXl5eXknLCAnc2hvcnREYXRlJ107XHJcbiAgJHNjb3BlLmZvcm1hdCA9ICRzY29wZS5mb3JtYXRzWzFdO1xyXG5cclxuICAkc2NvcGUucG9wdXAxID0ge1xyXG4gICAgb3BlbmVkOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLy8gIEhpZ2hjaGFydHMgU3R1ZmZcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAkc2NvcGUucHJvamVjdHNQZXJXZWVrID0ge1xyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgIGNvbG9yczogWycjNTBCNDMyJ10sXHJcbiAgICAgICAgICAgIGNoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXJlYScsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVNb3VzZVRyYWNraW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcGxvdFNoYWRvdzogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGQ0ZGQzUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgICB0ZXh0OiBcIk1vbnRoc1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYXRlZ29yaWVzOiBbXCJNb25cIiwgXCJUdWVzXCIsIFwiV2VkXCIsIFwiVGh1cnNcIiwgXCJGcmlcIiwgXCJTYXRcIiwgXCJTdW5cIl1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ29tcGxldGVkIFByb2plY3RzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXJpZXM6IFt7XHJcbiAgICAgICAgICAgIG5hbWU6ICdBY3R1YWwnLFxyXG4gICAgICAgICAgICBkYXRhOiBbNSwgNywgMy41LCA2LCAyLCA5LCA0XVxyXG4gICAgICAgIH1dLFxyXG4gICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdQcm9qZWN0cyBDb21wbGV0ZWQgVGhpcyBXZWVrJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnByb2plY3RzUGVyTW9udGggPSB7XHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICBjaGFydDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2FyZWFzcGxpbmUnLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlTW91c2VUcmFja2luZzogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICAgIHRleHQ6IFwiWWVhcnNcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYXRlZ29yaWVzOiBbJ0phbicsJ0ZlYicsXCJNYXJcIixcIkFwclwiLFwiTWF5XCIsXCJKdW5cIixcIkp1bFwiLFwiQXVnXCIsXCJTZXB0XCIsXCJPY3RcIixcIk5vdlwiLFwiRGVjXCJdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ0RvbGxhcnMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlcmllczogW3tcclxuICAgICAgICAgICAgbmFtZTogJ0FjdHVhbCcsXHJcbiAgICAgICAgICAgIGRhdGE6IFs1LCA3LCAzLjUsIDYsIDIsIDksIDQsIDUsIDMsIDUsIDEsIDZdXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgdGV4dDogJ1Byb2plY3RzIENvbXBsZXRlZCBQZXIgTW9udGgnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gIFRvb2x0aXAgU3R1ZmZcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgJHNjb3BlLm92ZXJkdWVUYXNrVGlwID0gXCJUaGlzIGlzIHRoZSBvdmVyZHVlIHRhc2tzIGNhcmQuIEl0IHdpbGwgdGVsbCB5b3UgaG93IG1hbnkgb3ZlcmR1ZSB0YXNrcyB5b3UgaGF2ZSBjdXJyZW50bHksIGFzIHdlbGwgYXMgbGV0IHlvdSBjbGljayB0aGUgaWNvbiBvbiB0aGUgYm90dG9tLXJpZ2h0IGNvcm5lciB0byBzaG93IHlvdSB3aGljaCB0YXNrcyB0aG9zZSBhcmUuXCJcclxuICAkc2NvcGUuY3VycmVudFByb2plY3RUaXAgPSBcIkhlcmUgaXMgaG93IG1hbnkgY3VycmVudCB0YXNrcyB5b3UgaGF2ZS4gSWYgeW91IHdhbnQgdG8gc2VlIHdoYXQgdGhvc2UgY3VycmVudCBwcm9qZWN0cyBhcmUsIGNsaWNrIG9uIHRoZSBpY29uIGFib3ZlLlwiXHJcbiAgJHNjb3BlLmFjdGl2aXR5VGlwID0gXCJJdCdzIHZlcnkgaW1wb3J0YW50IHRvIGtub3cgaG93IHlvdXIgYnVzaW5lc3MgaXMgcnVubmluZyBmcm9tIHRoZSBwcm9kdWN0aXZpdHkgYW5kIGVmZmllbmN5IHNpZGUuIENsaWNrIG9uIHRoZSBpY29uIGFib3ZlIHRvIGdldCBhIG1vcmUgaW4tZGVwdGggYW5hbHlzaXMuXCJcclxuICAkc2NvcGUuY29tcGFueURldGFpbHNUaXAgPSBcIkhlcmUsIHlvdSB3aWxsIGJlIGFibGUgdG8gdmlldyB5b3VyIGRlcGFydG1lbnRzLCBwb3NpdGlvbnMsIGFuZCBlbXBsb3llZXMsIGFzIHdlbGwgYWRkLCBlZGl0IGFuZCByZW1vdmUgYWxsIG9mIHRoZSBhYm92ZS4gQ2xpY2sgdGhlIGljb24gb24gdGhlIGJvdHRvbSByaWdodCBjb3JuZXIgdG8gZ28gdG8gdGhhdCBwYWdlLlwiXHJcbiAgJHNjb3BlLmFjdGl2aXR5U25hcHNob3RUb3AgPSBcIkhlcmUgaXMgYSBzbWFsbCBzbmFwc2hvdCBvZiB0YXNrcyBjb21wbGV0ZWQgdGhpcyB3ZWVrIGFuZCBwcm9qZWN0cyBjb21wbGV0ZWQgcGVyIG1vbnRoLiBJZiB5b3Ugd2FudCBtb3JlIGluZm9ybWF0aW9uLCBjbGljayBvbiB0aGUgYm90dG9tIG9mIHRoZSBBY3Rpdml0eSBDYXJkLlwiXHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
