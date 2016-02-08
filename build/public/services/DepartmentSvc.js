'use strict';

angular.module('terminatorApp').service('DepartmentSvc', function ($http, $q) {

  ////////////////////////
  // Department Calls
  ////////////////////////

  this.getDepartments = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/department"
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getOneDepartment = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/department/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getDepartmentTask = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/department/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postDepartment = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/department",
      data: {}
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.editDepartment = function () {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "/api/department/" + id,
      data: {}
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deleteDepartment = function (id) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "/api/department/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9zZXJ2aWNlcy9EZXBhcnRtZW50U3ZjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsUUFBUSxNQUFSLENBQWUsZUFBZixFQUFnQyxPQUFoQyxDQUF3QyxlQUF4QyxFQUF5RCxVQUFTLEtBQVQsRUFBZ0IsRUFBaEIsRUFBb0I7Ozs7OztBQU0zRSxPQUFLLGNBQUwsR0FBc0IsWUFBWTs7QUFFaEMsUUFBSSxRQUFRLEdBQUcsS0FBSCxFQUFSLENBRjRCOztBQUloQyxVQUFNO0FBQ0osY0FBUSxLQUFSO0FBQ0EsV0FBSyxpQkFBTDtLQUZGLEVBR0csSUFISCxDQUdRLFVBQVMsUUFBVCxFQUFtQjtBQUN6QixZQUFNLE9BQU4sQ0FBYyxRQUFkLEVBRHlCO0tBQW5CLEVBRUwsVUFBVSxLQUFWLEVBQWlCO0FBQ2xCLGNBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBdkIsRUFEa0I7S0FBakIsQ0FMSCxDQUpnQzs7QUFhaEMsV0FBTyxNQUFNLE9BQU4sQ0FieUI7R0FBWixDQU5xRDs7QUFzQjNFLE9BQUssZ0JBQUwsR0FBd0IsVUFBVSxFQUFWLEVBQWM7O0FBRXBDLFFBQUksUUFBUSxHQUFHLEtBQUgsRUFBUixDQUZnQzs7QUFJcEMsVUFBTTtBQUNKLGNBQVEsS0FBUjtBQUNBLFdBQUsscUJBQXFCLEVBQXJCO0tBRlAsRUFHRyxJQUhILENBR1EsVUFBUyxRQUFULEVBQW1CO0FBQ3pCLFlBQU0sT0FBTixDQUFjLFFBQWQsRUFEeUI7S0FBbkIsRUFFTCxVQUFVLEtBQVYsRUFBaUI7QUFDbEIsY0FBUSxHQUFSLENBQVksU0FBWixFQUF1QixLQUF2QixFQURrQjtLQUFqQixDQUxILENBSm9DOztBQWFwQyxXQUFPLE1BQU0sT0FBTixDQWI2QjtHQUFkLENBdEJtRDs7QUFzQzNFLE9BQUssaUJBQUwsR0FBeUIsVUFBVSxFQUFWLEVBQWM7O0FBRXJDLFFBQUksUUFBUSxHQUFHLEtBQUgsRUFBUixDQUZpQzs7QUFJckMsVUFBTTtBQUNKLGNBQVEsS0FBUjtBQUNBLFdBQUssMkJBQTJCLEVBQTNCO0tBRlAsRUFHRyxJQUhILENBR1EsVUFBUyxRQUFULEVBQW1CO0FBQ3pCLFlBQU0sT0FBTixDQUFjLFFBQWQsRUFEeUI7S0FBbkIsRUFFTCxVQUFVLEtBQVYsRUFBaUI7QUFDbEIsY0FBUSxHQUFSLENBQVksU0FBWixFQUF1QixLQUF2QixFQURrQjtLQUFqQixDQUxILENBSnFDOztBQWFyQyxXQUFPLE1BQU0sT0FBTixDQWI4QjtHQUFkLENBdENrRDs7QUFzRDNFLE9BQUssY0FBTCxHQUFzQixZQUFZO0FBQ2hDLFFBQUksUUFBUSxHQUFHLEtBQUgsRUFBUixDQUQ0Qjs7QUFHaEMsVUFBTTtBQUNKLGNBQVEsTUFBUjtBQUNBLFdBQUssaUJBQUw7QUFDQSxZQUFNLEVBQU47S0FIRixFQUlHLElBSkgsQ0FJUSxVQUFTLFFBQVQsRUFBbUI7QUFDekIsWUFBTSxPQUFOLENBQWMsUUFBZCxFQUR5QjtLQUFuQixFQUVMLFVBQVUsS0FBVixFQUFpQjtBQUNsQixjQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEtBQXZCLEVBRGtCO0tBQWpCLENBTkgsQ0FIZ0M7O0FBYWhDLFdBQU8sTUFBTSxPQUFOLENBYnlCO0dBQVosQ0F0RHFEOztBQXNFM0UsT0FBSyxjQUFMLEdBQXNCLFlBQVk7QUFDaEMsUUFBSSxRQUFRLEdBQUcsS0FBSCxFQUFSLENBRDRCOztBQUdoQyxVQUFNO0FBQ0osY0FBUSxLQUFSO0FBQ0EsV0FBSyxxQkFBcUIsRUFBckI7QUFDTCxZQUFNLEVBQU47S0FIRixFQUlHLElBSkgsQ0FJUSxVQUFTLFFBQVQsRUFBbUI7QUFDekIsWUFBTSxPQUFOLENBQWMsUUFBZCxFQUR5QjtLQUFuQixFQUVMLFVBQVUsS0FBVixFQUFpQjtBQUNsQixjQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEtBQXZCLEVBRGtCO0tBQWpCLENBTkgsQ0FIZ0M7O0FBYWhDLFdBQU8sTUFBTSxPQUFOLENBYnlCO0dBQVosQ0F0RXFEOztBQXNGM0UsT0FBSyxnQkFBTCxHQUF3QixVQUFVLEVBQVYsRUFBYztBQUNwQyxRQUFJLFFBQVEsR0FBRyxLQUFILEVBQVIsQ0FEZ0M7O0FBR3BDLFVBQU07QUFDSixjQUFRLFFBQVI7QUFDQSxXQUFLLHFCQUFxQixFQUFyQjtLQUZQLEVBR0csSUFISCxDQUdRLFVBQVMsUUFBVCxFQUFtQjtBQUN6QixZQUFNLE9BQU4sQ0FBYyxRQUFkLEVBRHlCO0tBQW5CLEVBRUwsVUFBVSxLQUFWLEVBQWlCO0FBQ2xCLGNBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBdkIsRUFEa0I7S0FBakIsQ0FMSCxDQUhvQzs7QUFZcEMsV0FBTyxNQUFNLE9BQU4sQ0FaNkI7R0FBZCxDQXRGbUQ7Q0FBcEIsQ0FBekQiLCJmaWxlIjoicHVibGljL3NlcnZpY2VzL0RlcGFydG1lbnRTdmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndGVybWluYXRvckFwcCcpLnNlcnZpY2UoJ0RlcGFydG1lbnRTdmMnLCBmdW5jdGlvbigkaHR0cCwgJHEpIHtcclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLy8gRGVwYXJ0bWVudCBDYWxsc1xyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICB0aGlzLmdldERlcGFydG1lbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL2RlcGFydG1lbnRcIlxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5nZXRPbmVEZXBhcnRtZW50ID0gZnVuY3Rpb24gKGlkKSB7XHJcblxyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgdXJsOiBcIi9hcGkvZGVwYXJ0bWVudC9cIiArIGlkXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLmdldERlcGFydG1lbnRUYXNrID0gZnVuY3Rpb24gKGlkKSB7XHJcblxyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgdXJsOiBcIi9hcGkvdGFza3MvZGVwYXJ0bWVudC9cIiArIGlkXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLnBvc3REZXBhcnRtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL2RlcGFydG1lbnRcIixcclxuICAgICAgZGF0YToge31cclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuZWRpdERlcGFydG1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICB1cmw6IFwiL2FwaS9kZXBhcnRtZW50L1wiICsgaWQsXHJcbiAgICAgIGRhdGE6IHt9XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLmRlbGV0ZURlcGFydG1lbnQgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL2RlcGFydG1lbnQvXCIgKyBpZFxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgfTtcclxuXHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
