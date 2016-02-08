'use strict';

angular.module('terminatorApp').service('TaskSvc', function ($http, $q) {

  this.addTask = function (newTask, templateid) {
    var defer = $q.defer();
    $http({
      method: "POST",
      url: "/api/" + templateid + "/tasks",
      data: newTask
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9zZXJ2aWNlcy9UYXNrU3ZjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsUUFBUSxNQUFSLENBQWUsZUFBZixFQUFnQyxPQUFoQyxDQUF3QyxTQUF4QyxFQUFtRCxVQUFTLEtBQVQsRUFBZ0IsRUFBaEIsRUFBb0I7O0FBRXZFLE9BQUssT0FBTCxHQUFlLFVBQVMsT0FBVCxFQUFpQixVQUFqQixFQUE0QjtBQUN6QyxRQUFJLFFBQVEsR0FBRyxLQUFILEVBQVIsQ0FEcUM7QUFFekMsVUFBTTtBQUNKLGNBQVEsTUFBUjtBQUNBLFdBQUssVUFBUyxVQUFULEdBQXFCLFFBQXJCO0FBQ0wsWUFBTSxPQUFOO0tBSEYsRUFJRyxJQUpILENBSVEsVUFBUyxRQUFULEVBQW1CO0FBQ3pCLFlBQU0sT0FBTixDQUFjLFFBQWQsRUFEeUI7S0FBbkIsRUFFTCxVQUFVLEtBQVYsRUFBaUI7QUFDbEIsY0FBUSxHQUFSLENBQVksU0FBWixFQUF1QixLQUF2QixFQURrQjtLQUFqQixDQU5ILENBRnlDOztBQVl6QyxXQUFPLE1BQU0sT0FBTixDQVprQztHQUE1QixDQUZ3RDtDQUFwQixDQUFuRCIsImZpbGUiOiJwdWJsaWMvc2VydmljZXMvVGFza1N2Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0ZXJtaW5hdG9yQXBwJykuc2VydmljZSgnVGFza1N2YycsIGZ1bmN0aW9uKCRodHRwLCAkcSkge1xyXG5cclxudGhpcy5hZGRUYXNrID0gZnVuY3Rpb24obmV3VGFzayx0ZW1wbGF0ZWlkKXtcclxuICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG4gICRodHRwKHtcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICB1cmw6IFwiL2FwaS9cIisgdGVtcGxhdGVpZCArXCIvdGFza3NcIixcclxuICAgIGRhdGE6IG5ld1Rhc2tcclxuICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG59O1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
