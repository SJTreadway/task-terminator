'use strict';

angular.module('terminatorApp').controller('OneProjectCtrl', function ($scope, resolveProject, resolveCompany) {

  $scope.isSingle = "";
  $scope.showForm = false;

  $scope.project = resolveProject.data;
  console.log(resolveProject);
  console.log($scope.project);

  $scope.company = resolveCompany.data;

  $scope.departments = $scope.company.departments;
  $scope.positions = $scope.company.positions;
  $scope.employees = $scope.company.employees;
  $scope.choices = ["Specific Department", "Specific Position", "Specific Person"];

  $scope.friendlyInterval = "";
  $scope.friendlyFreq = "";

  var project = $scope.project;

  $scope.departmentsArr = [];
  $scope.positionsArr = [];
  $scope.employeesArr = [];

  (function departmentsArr() {
    for (var i = 0; i < $scope.departments.length; i++) {
      $scope.departmentsArr.push($scope.departments[i].name);
    }
    return $scope.departmentsArr;
  })();

  (function positionsArr() {
    for (var i = 0; i < $scope.positions.length; i++) {
      $scope.positionsArr.push($scope.positions[i].name);
    }
    return $scope.positionsArr;
  })();

  (function employeesArr() {
    for (var i = 0; i < $scope.employees.length; i++) {
      $scope.employeesArr.push($scope.employees[i].identification.name.fullName);
    }
    return $scope.employeesArr;
  })();

  $scope.getIntervalName = function (project) {
    var link = project.setup.interval.type;
    var pink = project.setup.interval;
    if (link === "Daily") {
      $scope.friendlyInterval = "Daily";
    } else if (link === "Daily Business Days") {
      $scope.friendlyInterval = "Every Business Day";
    } else if (link === "Weekly") {
      $scope.friendlyInterval = "Every Week";
      $scope.friendlyFreq = pink.weeklyInterval;
    } else if (link === "Bi-Weekly") {
      $scope.friendlyInterval = "Every Other Week";
      $scope.friendlyFreq = pink.weeklyInterval;
    } else if (link === "Monthly") {
      $scope.friendlyInterval = "Every Month";
      console.log("SELECTION", pink.monthlyInterval.selection);
      if (pink.monthlyInterval.selection == "# of Days From Start") {
        $scope.friendlyFreq = pink.monthlyInterval.fromBeginning + " days after the beginning of the month";
        console.log("Stephens fault", pink.monthlyInterval.fromBeginning);
      } else if (pink.monthlyInterval.selection == "# of Days Before End") {
        $scope.friendlyFreq = pink.monthlyInterval.fromEnd + " days before the end of the month";
      } else if (pink.monthlyInterval.selection == "First Day of Month") {
        $scope.friendlyFreq = "First Day of the Month";
      } else if (pink.monthlyInterval.selection == "Last Day of Month") {
        $scope.friendlyFreq = "Last Day of the Month";
      }
    } else if (link === "Annually") {
      $scope.friendlyInterval = "Every Year";
      if (pink.annualInterval.selection === "# of Days From Start") {
        $scope.friendlyFreq = pink.annualInterval.fromBeginning + " days after the beginning of the year. ";
      } else if (pink.annualInterval.selection === "# of Days Before end") {
        $scope.friendlyFreq = pink.annualInterval.fromEnd + " days before the end of the year";
      } else if (pink.annualInterval.selection === "First Day of the Year") {
        $scope.friendlyFreq = "First Day of the Year";
      } else if (pink.annualInterval.selection === "Last Day of the Year") {
        $scope.friendlyFreq = "Last Day of the Year";
      } else if (pink.annualInterval.selection === "Any Day of the Year") {
        $scope.friendlyFreq = "Any Day of the Year";
      } else if (pink.annualInterval.selection === "In a Particular Month") {
        $scope.friendlyFreq = "Every " + pink.annualInterval.selectMonth;
      } else if (pink.annualInterval.selection === "In a Particular Quarter") {
        var ending;
        if (pink.annualInverval.selectQuarter === 1) {
          ending = "st";
        } else if (pink.annualInverval.selectQuarter === 2) {
          ending = "nd";
        } else if (pink.annualInverval.selectQuarter === 3) {
          ending = "rd";
        } else if (pink.annualInverval.selectQuarter === 4) {
          ending = "th";
        }
        $scope.friendlyFreq = "Every " + pink.annualInterval.selectQuarter + ending;
      }
    } else if (link === "Quarterly") {
      $scope.friendlyInterval = "Every Quarter";
      if (pink.quarterlyInterval.selection === "First Day of the Quarter") {
        $scope.friendlyFreq = "The First Day of the Quarter";
      } else if (pink.quarterlyInterval.selection === "Last Day of the Quarter") {
        $scope.friendlyFreq = "The Last Day of the Quarter";
      } else if (pink.quarterlyInterval.selection === "# Days from Start") {
        $scope.friendlyFreq = pink.quarterlyInterval.fromBeginning + " days after the beginning of the quarter";
      } else if (pink.quarterlyInterval.selection === "# Days from End") {
        $scope.friendlyFreq = pink.quarterlyInterval.fromEnd + " days after the beginning of the quarter";
      } else if (pink.quarterlyInterval.selection === "Any") {
        $scope.friendlyFreq = "Any day of the quarter";
      }
    }
  };

  if (project.setup.type !== "Single") {
    $scope.getIntervalName(project);
    $scope.isSingle = false;
  } else {
    $scope.isSingle = true;
    $scope.friendlyInterval = "Specific Date";
    $scope.friendlyFreq = project.setup.dueDate.actual;
  }

  console.log("friendlyInterval", $scope.friendlyInterval);
  console.log("friendlyFreq", $scope.friendlyFreq);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9jb250cm9sbGVycy9PbmVQcm9qZWN0Q3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFFBQVEsTUFBUixDQUFlLGVBQWYsRUFBZ0MsVUFBaEMsQ0FBMkMsZ0JBQTNDLEVBQTZELFVBQVMsTUFBVCxFQUFpQixjQUFqQixFQUFpQyxjQUFqQyxFQUFpRDs7QUFFNUcsU0FBTyxRQUFQLEdBQWtCLEVBQWxCLENBRjRHO0FBRzVHLFNBQU8sUUFBUCxHQUFrQixLQUFsQixDQUg0Rzs7QUFLNUcsU0FBTyxPQUFQLEdBQWlCLGVBQWUsSUFBZixDQUwyRjtBQU01RyxVQUFRLEdBQVIsQ0FBWSxjQUFaLEVBTjRHO0FBTzVHLFVBQVEsR0FBUixDQUFZLE9BQU8sT0FBUCxDQUFaLENBUDRHOztBQVM1RyxTQUFPLE9BQVAsR0FBaUIsZUFBZSxJQUFmLENBVDJGOztBQVc1RyxTQUFPLFdBQVAsR0FBcUIsT0FBTyxPQUFQLENBQWUsV0FBZixDQVh1RjtBQVk1RyxTQUFPLFNBQVAsR0FBbUIsT0FBTyxPQUFQLENBQWUsU0FBZixDQVp5RjtBQWE1RyxTQUFPLFNBQVAsR0FBbUIsT0FBTyxPQUFQLENBQWUsU0FBZixDQWJ5RjtBQWM1RyxTQUFPLE9BQVAsR0FBaUIsQ0FBQyxxQkFBRCxFQUF3QixtQkFBeEIsRUFBNkMsaUJBQTdDLENBQWpCLENBZDRHOztBQWdCNUcsU0FBTyxnQkFBUCxHQUEwQixFQUExQixDQWhCNEc7QUFpQjVHLFNBQU8sWUFBUCxHQUFzQixFQUF0QixDQWpCNEc7O0FBbUI1RyxNQUFJLFVBQVUsT0FBTyxPQUFQLENBbkI4Rjs7QUFxQjVHLFNBQU8sY0FBUCxHQUF3QixFQUF4QixDQXJCNEc7QUFzQjVHLFNBQU8sWUFBUCxHQUFzQixFQUF0QixDQXRCNEc7QUF1QjVHLFNBQU8sWUFBUCxHQUFzQixFQUF0QixDQXZCNEc7O0FBeUI1RyxHQUFDLFNBQVMsY0FBVCxHQUEwQjtBQUN6QixTQUFJLElBQUksSUFBSSxDQUFKLEVBQU8s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QUFQLENBQXVCLE9BQXZCLEVBRGlDO0FBRWpDLFdBQU8sUUFBUCxHQUFrQixLQUFsQixDQUZpQztHQUFuQyxNQUdRO0FBQ04sV0FBTyxRQUFQLEdBQWtCLElBQWxCLENBRE07QUFFTixXQUFPLGdCQUFQLEdBQTBCLGVBQTFCLENBRk07QUFHTixXQUFPLFlBQVAsR0FBc0IsUUFBUSxLQUFSLENBQWMsT0FBZCxDQUFzQixNQUF0QixDQUhoQjtHQUhSOztBQVNELFVBQVEsR0FBUixDQUFZLGtCQUFaLEVBQWdDLE9BQU8sZ0JBQVAsQ0FBaEMsQ0FsSTZHO0FBbUk3RyxVQUFRLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLE9BQU8sWUFBUCxDQUE1QixDQW5JNkc7Q0FBakQsQ0FBN0QiLCJmaWxlIjoicHVibGljL2NvbnRyb2xsZXJzL09uZVByb2plY3RDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3Rlcm1pbmF0b3JBcHAnKS5jb250cm9sbGVyKCdPbmVQcm9qZWN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgcmVzb2x2ZVByb2plY3QsIHJlc29sdmVDb21wYW55KSB7XHJcblxyXG4gICRzY29wZS5pc1NpbmdsZSA9IFwiXCI7XHJcbiAgJHNjb3BlLnNob3dGb3JtID0gZmFsc2U7XHJcblxyXG4gICRzY29wZS5wcm9qZWN0ID0gcmVzb2x2ZVByb2plY3QuZGF0YTtcclxuICBjb25zb2xlLmxvZyhyZXNvbHZlUHJvamVjdCk7XHJcbiAgY29uc29sZS5sb2coJHNjb3BlLnByb2plY3QpO1xyXG5cclxuICAkc2NvcGUuY29tcGFueSA9IHJlc29sdmVDb21wYW55LmRhdGE7XHJcblxyXG4gICRzY29wZS5kZXBhcnRtZW50cyA9ICRzY29wZS5jb21wYW55LmRlcGFydG1lbnRzO1xyXG4gICRzY29wZS5wb3NpdGlvbnMgPSAkc2NvcGUuY29tcGFueS5wb3NpdGlvbnM7XHJcbiAgJHNjb3BlLmVtcGxveWVlcyA9ICRzY29wZS5jb21wYW55LmVtcGxveWVlcztcclxuICAkc2NvcGUuY2hvaWNlcyA9IFtcIlNwZWNpZmljIERlcGFydG1lbnRcIiwgXCJTcGVjaWZpYyBQb3NpdGlvblwiLCBcIlNwZWNpZmljIFBlcnNvblwiXTtcclxuXHJcbiAgJHNjb3BlLmZyaWVuZGx5SW50ZXJ2YWwgPSBcIlwiO1xyXG4gICRzY29wZS5mcmllbmRseUZyZXEgPSBcIlwiO1xyXG5cclxuICB2YXIgcHJvamVjdCA9ICRzY29wZS5wcm9qZWN0O1xyXG5cclxuICAkc2NvcGUuZGVwYXJ0bWVudHNBcnIgPSBbXTtcclxuICAkc2NvcGUucG9zaXRpb25zQXJyID0gW107XHJcbiAgJHNjb3BlLmVtcGxveWVlc0FyciA9IFtdO1xyXG5cclxuICAoZnVuY3Rpb24gZGVwYXJ0bWVudHNBcnIoKSB7XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpPCRzY29wZS5kZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAkc2NvcGUuZGVwYXJ0bWVudHNBcnIucHVzaCgkc2NvcGUuZGVwYXJ0bWVudHNbaV0ubmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJHNjb3BlLmRlcGFydG1lbnRzQXJyO1xyXG4gIH0pKCk7XHJcblxyXG4gIChmdW5jdGlvbiBwb3NpdGlvbnNBcnIoKSB7XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpPCRzY29wZS5wb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgJHNjb3BlLnBvc2l0aW9uc0Fyci5wdXNoKCRzY29wZS5wb3NpdGlvbnNbaV0ubmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJHNjb3BlLnBvc2l0aW9uc0FycjtcclxuICB9KSgpO1xyXG5cclxuICAoZnVuY3Rpb24gZW1wbG95ZWVzQXJyKCkge1xyXG4gICAgZm9yKHZhciBpID0gMDsgaTwkc2NvcGUuZW1wbG95ZWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICRzY29wZS5lbXBsb3llZXNBcnIucHVzaCgkc2NvcGUuZW1wbG95ZWVzW2ldLmlkZW50aWZpY2F0aW9uLm5hbWUuZnVsbE5hbWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICRzY29wZS5lbXBsb3llZXNBcnI7XHJcbiAgfSkoKTtcclxuXHJcblxyXG4gICRzY29wZS5nZXRJbnRlcnZhbE5hbWUgPSBmdW5jdGlvbihwcm9qZWN0KXtcclxuICAgIHZhciBsaW5rID0gcHJvamVjdC5zZXR1cC5pbnRlcnZhbC50eXBlO1xyXG4gICAgdmFyIHBpbmsgPSBwcm9qZWN0LnNldHVwLmludGVydmFsO1xyXG4gICAgaWYobGluayA9PT0gXCJEYWlseVwiKXtcclxuICAgICAgJHNjb3BlLmZyaWVuZGx5SW50ZXJ2YWwgPSBcIkRhaWx5XCI7XHJcbiAgICB9IGVsc2UgaWYgKGxpbmsgPT09IFwiRGFpbHkgQnVzaW5lc3MgRGF5c1wiKXtcclxuICAgICAgJHNjb3BlLmZyaWVuZGx5SW50ZXJ2YWwgPSBcIkV2ZXJ5IEJ1c2luZXNzIERheVwiO1xyXG4gICAgfSBlbHNlIGlmKCBsaW5rID09PSBcIldlZWtseVwiKXtcclxuICAgICAgJHNjb3BlLmZyaWVuZGx5SW50ZXJ2YWwgPSBcIkV2ZXJ5IFdlZWtcIjtcclxuICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IHBpbmsud2Vla2x5SW50ZXJ2YWw7XHJcbiAgICB9IGVsc2UgaWYobGluayA9PT0gXCJCaS1XZWVrbHlcIikge1xyXG4gICAgICAkc2NvcGUuZnJpZW5kbHlJbnRlcnZhbCA9IFwiRXZlcnkgT3RoZXIgV2Vla1wiO1xyXG4gICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gcGluay53ZWVrbHlJbnRlcnZhbDtcclxuICAgIH0gZWxzZSBpZihsaW5rID09PSBcIk1vbnRobHlcIikge1xyXG4gICAgICAkc2NvcGUuZnJpZW5kbHlJbnRlcnZhbCA9IFwiRXZlcnkgTW9udGhcIjtcclxuICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1RJT05cIiwgcGluay5tb250aGx5SW50ZXJ2YWwuc2VsZWN0aW9uKTtcclxuICAgICAgICAgIGlmKHBpbmsubW9udGhseUludGVydmFsLnNlbGVjdGlvbiA9PSBcIiMgb2YgRGF5cyBGcm9tIFN0YXJ0XCIpe1xyXG4gICAgICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gcGluay5tb250aGx5SW50ZXJ2YWwuZnJvbUJlZ2lubmluZyArIFwiIGRheXMgYWZ0ZXIgdGhlIGJlZ2lubmluZyBvZiB0aGUgbW9udGhcIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGVwaGVucyBmYXVsdFwiLCBwaW5rLm1vbnRobHlJbnRlcnZhbC5mcm9tQmVnaW5uaW5nKTtcclxuICAgICAgICAgIH0gZWxzZSBpZihwaW5rLm1vbnRobHlJbnRlcnZhbC5zZWxlY3Rpb24gPT0gXCIjIG9mIERheXMgQmVmb3JlIEVuZFwiKXtcclxuICAgICAgICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IHBpbmsubW9udGhseUludGVydmFsLmZyb21FbmQgKyBcIiBkYXlzIGJlZm9yZSB0aGUgZW5kIG9mIHRoZSBtb250aFwiO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChwaW5rLm1vbnRobHlJbnRlcnZhbC5zZWxlY3Rpb24gPT0gXCJGaXJzdCBEYXkgb2YgTW9udGhcIil7XHJcbiAgICAgICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBcIkZpcnN0IERheSBvZiB0aGUgTW9udGhcIjtcclxuICAgICAgICAgIH0gZWxzZSBpZihwaW5rLm1vbnRobHlJbnRlcnZhbC5zZWxlY3Rpb24gPT0gXCJMYXN0IERheSBvZiBNb250aFwiKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBcIkxhc3QgRGF5IG9mIHRoZSBNb250aFwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmKGxpbmsgPT09IFwiQW5udWFsbHlcIikge1xyXG4gICAgICAkc2NvcGUuZnJpZW5kbHlJbnRlcnZhbCA9IFwiRXZlcnkgWWVhclwiO1xyXG4gICAgICAgICAgaWYocGluay5hbm51YWxJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiIyBvZiBEYXlzIEZyb20gU3RhcnRcIil7XHJcbiAgICAgICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBwaW5rLmFubnVhbEludGVydmFsLmZyb21CZWdpbm5pbmcgKyBcIiBkYXlzIGFmdGVyIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHllYXIuIFwiO1xyXG4gICAgICAgICAgfSBlbHNlIGlmKHBpbmsuYW5udWFsSW50ZXJ2YWwuc2VsZWN0aW9uID09PSBcIiMgb2YgRGF5cyBCZWZvcmUgZW5kXCIpe1xyXG4gICAgICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gcGluay5hbm51YWxJbnRlcnZhbC5mcm9tRW5kICsgXCIgZGF5cyBiZWZvcmUgdGhlIGVuZCBvZiB0aGUgeWVhclwiO1xyXG4gICAgICAgICAgfSBlbHNlIGlmKHBpbmsuYW5udWFsSW50ZXJ2YWwuc2VsZWN0aW9uID09PSBcIkZpcnN0IERheSBvZiB0aGUgWWVhclwiKXtcclxuICAgICAgICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IFwiRmlyc3QgRGF5IG9mIHRoZSBZZWFyXCI7XHJcbiAgICAgICAgICB9IGVsc2UgaWYocGluay5hbm51YWxJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiTGFzdCBEYXkgb2YgdGhlIFllYXJcIil7XHJcbiAgICAgICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBcIkxhc3QgRGF5IG9mIHRoZSBZZWFyXCI7XHJcbiAgICAgICAgICB9IGVsc2UgaWYocGluay5hbm51YWxJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiQW55IERheSBvZiB0aGUgWWVhclwiKXtcclxuICAgICAgICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IFwiQW55IERheSBvZiB0aGUgWWVhclwiO1xyXG4gICAgICAgICAgfSBlbHNlIGlmKHBpbmsuYW5udWFsSW50ZXJ2YWwuc2VsZWN0aW9uID09PSBcIkluIGEgUGFydGljdWxhciBNb250aFwiKXtcclxuICAgICAgICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IFwiRXZlcnkgXCIgKyBwaW5rLmFubnVhbEludGVydmFsLnNlbGVjdE1vbnRoO1xyXG4gICAgICAgICAgfSBlbHNlIGlmKHBpbmsuYW5udWFsSW50ZXJ2YWwuc2VsZWN0aW9uID09PSBcIkluIGEgUGFydGljdWxhciBRdWFydGVyXCIpe1xyXG4gICAgICAgICAgICAgIHZhciBlbmRpbmc7XHJcbiAgICAgICAgICAgIGlmKHBpbmsuYW5udWFsSW52ZXJ2YWwuc2VsZWN0UXVhcnRlciA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgZW5kaW5nID0gXCJzdFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYocGluay5hbm51YWxJbnZlcnZhbC5zZWxlY3RRdWFydGVyID09PSAyKXtcclxuICAgICAgICAgICAgICBlbmRpbmcgPSBcIm5kXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihwaW5rLmFubnVhbEludmVydmFsLnNlbGVjdFF1YXJ0ZXIgPT09IDMpe1xyXG4gICAgICAgICAgICAgIGVuZGluZyA9IFwicmRcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHBpbmsuYW5udWFsSW52ZXJ2YWwuc2VsZWN0UXVhcnRlciA9PT0gNCl7XHJcbiAgICAgICAgICAgICAgZW5kaW5nID0gXCJ0aFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBcIkV2ZXJ5IFwiICsgcGluay5hbm51YWxJbnRlcnZhbC5zZWxlY3RRdWFydGVyICsgZW5kaW5nO1xyXG4gICAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChsaW5rID09PSBcIlF1YXJ0ZXJseVwiKXtcclxuXHQgICAgICAkc2NvcGUuZnJpZW5kbHlJbnRlcnZhbCA9IFwiRXZlcnkgUXVhcnRlclwiO1xyXG5cdCAgICAgICAgaWYocGluay5xdWFydGVybHlJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiRmlyc3QgRGF5IG9mIHRoZSBRdWFydGVyXCIpe1xyXG5cdCAgICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gXCJUaGUgRmlyc3QgRGF5IG9mIHRoZSBRdWFydGVyXCI7XHJcblx0ICAgICAgICB9IGVsc2UgaWYocGluay5xdWFydGVybHlJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiTGFzdCBEYXkgb2YgdGhlIFF1YXJ0ZXJcIil7XHJcblx0ICAgICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBcIlRoZSBMYXN0IERheSBvZiB0aGUgUXVhcnRlclwiO1xyXG5cdCAgICAgICAgfSBlbHNlIGlmKHBpbmsucXVhcnRlcmx5SW50ZXJ2YWwuc2VsZWN0aW9uID09PSBcIiMgRGF5cyBmcm9tIFN0YXJ0XCIpe1xyXG5cdCAgICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gcGluay5xdWFydGVybHlJbnRlcnZhbC5mcm9tQmVnaW5uaW5nICsgXCIgZGF5cyBhZnRlciB0aGUgYmVnaW5uaW5nIG9mIHRoZSBxdWFydGVyXCI7XHJcblx0ICAgICAgICB9IGVsc2UgaWYocGluay5xdWFydGVybHlJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiIyBEYXlzIGZyb20gRW5kXCIpe1xyXG5cdCAgICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gcGluay5xdWFydGVybHlJbnRlcnZhbC5mcm9tRW5kICsgXCIgZGF5cyBhZnRlciB0aGUgYmVnaW5uaW5nIG9mIHRoZSBxdWFydGVyXCI7XHJcblx0ICAgICAgICB9IGVsc2UgaWYocGluay5xdWFydGVybHlJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiQW55XCIpe1xyXG5cdCAgICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gXCJBbnkgZGF5IG9mIHRoZSBxdWFydGVyXCI7XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH1cclxuICBcdH07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgaWYocHJvamVjdC5zZXR1cC50eXBlICE9PSBcIlNpbmdsZVwiKXtcclxuICAgICRzY29wZS5nZXRJbnRlcnZhbE5hbWUocHJvamVjdCk7XHJcbiAgICAkc2NvcGUuaXNTaW5nbGUgPSBmYWxzZTtcclxuICB9ICBlbHNlIHtcclxuICAgICRzY29wZS5pc1NpbmdsZSA9IHRydWU7XHJcbiAgICAkc2NvcGUuZnJpZW5kbHlJbnRlcnZhbCA9IFwiU3BlY2lmaWMgRGF0ZVwiO1xyXG4gICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IHByb2plY3Quc2V0dXAuZHVlRGF0ZS5hY3R1YWw7XHJcbiAgfVxyXG5cclxuXHRjb25zb2xlLmxvZyhcImZyaWVuZGx5SW50ZXJ2YWxcIiwgJHNjb3BlLmZyaWVuZGx5SW50ZXJ2YWwpO1xyXG5cdGNvbnNvbGUubG9nKFwiZnJpZW5kbHlGcmVxXCIsICRzY29wZS5mcmllbmRseUZyZXEpO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
