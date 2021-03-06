'use strict';

angular.module('terminatorApp').service('PositionSvc', function ($http, $q) {

  ////////////////////////
  // Position Calls
  ////////////////////////

  this.getPositions = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/position"
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getOnePosition = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/position/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getPositionTask = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/position/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postPosition = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/position",
      data: {}
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.editPosition = function () {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "/api/position/" + id,
      data: {}
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deletePosition = function (id) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "/api/position/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9zZXJ2aWNlcy9Qb3NpdGlvblN2Yy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFFBQVEsTUFBUixDQUFlLGVBQWYsRUFBZ0MsT0FBaEMsQ0FBd0MsYUFBeEMsRUFBdUQsVUFBUyxLQUFULEVBQWdCLEVBQWhCLEVBQW9COzs7Ozs7QUFNekUsT0FBSyxZQUFMLEdBQW9CLFlBQVk7O0FBRTlCLFFBQUksUUFBUSxHQUFHLEtBQUgsRUFBUixDQUYwQjs7QUFJOUIsVUFBTTtBQUNKLGNBQVEsS0FBUjtBQUNBLFdBQUssZUFBTDtLQUZGLEVBR0csSUFISCxDQUdRLFVBQVMsUUFBVCxFQUFtQjtBQUN6QixZQUFNLE9BQU4sQ0FBYyxRQUFkLEVBRHlCO0tBQW5CLEVBRUwsVUFBVSxLQUFWLEVBQWlCO0FBQ2xCLGNBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBdkIsRUFEa0I7S0FBakIsQ0FMSCxDQUo4Qjs7QUFhOUIsV0FBTyxNQUFNLE9BQU4sQ0FidUI7R0FBWixDQU5xRDs7QUFzQnpFLE9BQUssY0FBTCxHQUFzQixVQUFVLEVBQVYsRUFBYzs7QUFFbEMsUUFBSSxRQUFRLEdBQUcsS0FBSCxFQUFSLENBRjhCOztBQUlsQyxVQUFNO0FBQ0osY0FBUSxLQUFSO0FBQ0EsV0FBSyxtQkFBbUIsRUFBbkI7S0FGUCxFQUdHLElBSEgsQ0FHUSxVQUFTLFFBQVQsRUFBbUI7QUFDekIsWUFBTSxPQUFOLENBQWMsUUFBZCxFQUR5QjtLQUFuQixFQUVMLFVBQVUsS0FBVixFQUFpQjtBQUNsQixjQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEtBQXZCLEVBRGtCO0tBQWpCLENBTEgsQ0FKa0M7O0FBYWxDLFdBQU8sTUFBTSxPQUFOLENBYjJCO0dBQWQsQ0F0Qm1EOztBQXNDekUsT0FBSyxlQUFMLEdBQXVCLFVBQVUsRUFBVixFQUFjOztBQUVuQyxRQUFJLFFBQVEsR0FBRyxLQUFILEVBQVIsQ0FGK0I7O0FBSW5DLFVBQU07QUFDSixjQUFRLEtBQVI7QUFDQSxXQUFLLHlCQUF5QixFQUF6QjtLQUZQLEVBR0csSUFISCxDQUdRLFVBQVMsUUFBVCxFQUFtQjtBQUN6QixZQUFNLE9BQU4sQ0FBYyxRQUFkLEVBRHlCO0tBQW5CLEVBRUwsVUFBVSxLQUFWLEVBQWlCO0FBQ2xCLGNBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBdkIsRUFEa0I7S0FBakIsQ0FMSCxDQUptQzs7QUFhbkMsV0FBTyxNQUFNLE9BQU4sQ0FiNEI7R0FBZCxDQXRDa0Q7O0FBc0R6RSxPQUFLLFlBQUwsR0FBb0IsWUFBWTtBQUM5QixRQUFJLFFBQVEsR0FBRyxLQUFILEVBQVIsQ0FEMEI7O0FBRzlCLFVBQU07QUFDSixjQUFRLE1BQVI7QUFDQSxXQUFLLGVBQUw7QUFDQSxZQUFNLEVBQU47S0FIRixFQUlHLElBSkgsQ0FJUSxVQUFTLFFBQVQsRUFBbUI7QUFDekIsWUFBTSxPQUFOLENBQWMsUUFBZCxFQUR5QjtLQUFuQixFQUVMLFVBQVUsS0FBVixFQUFpQjtBQUNsQixjQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEtBQXZCLEVBRGtCO0tBQWpCLENBTkgsQ0FIOEI7O0FBYTlCLFdBQU8sTUFBTSxPQUFOLENBYnVCO0dBQVosQ0F0RHFEOztBQXNFekUsT0FBSyxZQUFMLEdBQW9CLFlBQVk7QUFDOUIsUUFBSSxRQUFRLEdBQUcsS0FBSCxFQUFSLENBRDBCOztBQUc5QixVQUFNO0FBQ0osY0FBUSxLQUFSO0FBQ0EsV0FBSyxtQkFBbUIsRUFBbkI7QUFDTCxZQUFNLEVBQU47S0FIRixFQUlHLElBSkgsQ0FJUSxVQUFTLFFBQVQsRUFBbUI7QUFDekIsWUFBTSxPQUFOLENBQWMsUUFBZCxFQUR5QjtLQUFuQixFQUVMLFVBQVUsS0FBVixFQUFpQjtBQUNsQixjQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEtBQXZCLEVBRGtCO0tBQWpCLENBTkgsQ0FIOEI7O0FBYTlCLFdBQU8sTUFBTSxPQUFOLENBYnVCO0dBQVosQ0F0RXFEOztBQXNGekUsT0FBSyxjQUFMLEdBQXNCLFVBQVUsRUFBVixFQUFjO0FBQ2xDLFFBQUksUUFBUSxHQUFHLEtBQUgsRUFBUixDQUQ4Qjs7QUFHbEMsVUFBTTtBQUNKLGNBQVEsUUFBUjtBQUNBLFdBQUssbUJBQW1CLEVBQW5CO0tBRlAsRUFHRyxJQUhILENBR1EsVUFBUyxRQUFULEVBQW1CO0FBQ3pCLFlBQU0sT0FBTixDQUFjLFFBQWQsRUFEeUI7S0FBbkIsRUFFTCxVQUFVLEtBQVYsRUFBaUI7QUFDbEIsY0FBUSxHQUFSLENBQVksU0FBWixFQUF1QixLQUF2QixFQURrQjtLQUFqQixDQUxILENBSGtDOztBQVlsQyxXQUFPLE1BQU0sT0FBTixDQVoyQjtHQUFkLENBdEZtRDtDQUFwQixDQUF2RCIsImZpbGUiOiJwdWJsaWMvc2VydmljZXMvUG9zaXRpb25TdmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndGVybWluYXRvckFwcCcpLnNlcnZpY2UoJ1Bvc2l0aW9uU3ZjJywgZnVuY3Rpb24oJGh0dHAsICRxKSB7XHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIC8vIFBvc2l0aW9uIENhbGxzXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gIHRoaXMuZ2V0UG9zaXRpb25zID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL3Bvc2l0aW9uXCJcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuZ2V0T25lUG9zaXRpb24gPSBmdW5jdGlvbiAoaWQpIHtcclxuXHJcbiAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICB1cmw6IFwiL2FwaS9wb3NpdGlvbi9cIiArIGlkXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLmdldFBvc2l0aW9uVGFzayA9IGZ1bmN0aW9uIChpZCkge1xyXG5cclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL3Rhc2tzL3Bvc2l0aW9uL1wiICsgaWRcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMucG9zdFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL3Bvc2l0aW9uXCIsXHJcbiAgICAgIGRhdGE6IHt9XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLmVkaXRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL3Bvc2l0aW9uL1wiICsgaWQsXHJcbiAgICAgIGRhdGE6IHt9XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLmRlbGV0ZVBvc2l0aW9uID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICB1cmw6IFwiL2FwaS9wb3NpdGlvbi9cIiArIGlkXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
