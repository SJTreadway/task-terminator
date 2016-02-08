'use strict';

angular.module('terminatorApp').service('CompanySvc', function ($http, $q) {

  ////////////////////////
  // Company Calls
  ////////////////////////

  this.getCompanies = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/company"
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getOneCompany = function (id) {
    var defer = $q.defer();
    $http({
      method: "GET",
      url: "/api/company/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });
    return defer.promise;
  };

  this.getCompanyTask = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/company/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postCompany = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/company",
      data: {}
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.editCompany = function () {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "/api/company/" + id,
      data: {}
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deleteCompany = function (id) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "/api/company/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;;
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9zZXJ2aWNlcy9Db21wYW55U3ZjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsUUFBUSxNQUFSLENBQWUsZUFBZixFQUFnQyxPQUFoQyxDQUF3QyxZQUF4QyxFQUFzRCxVQUFTLEtBQVQsRUFBZ0IsRUFBaEIsRUFBb0I7Ozs7OztBQU14RSxPQUFLLFlBQUwsR0FBb0IsWUFBWTs7QUFFOUIsUUFBSSxRQUFRLEdBQUcsS0FBSCxFQUFSLENBRjBCOztBQUk5QixVQUFNO0FBQ0osY0FBUSxLQUFSO0FBQ0EsV0FBSyxjQUFMO0tBRkYsRUFHRyxJQUhILENBR1EsVUFBUyxRQUFULEVBQW1CO0FBQ3pCLFlBQU0sT0FBTixDQUFjLFFBQWQsRUFEeUI7S0FBbkIsRUFFTCxVQUFVLEtBQVYsRUFBaUI7QUFDbEIsY0FBUSxHQUFSLENBQVksU0FBWixFQUF1QixLQUF2QixFQURrQjtLQUFqQixDQUxILENBSjhCOztBQWE5QixXQUFPLE1BQU0sT0FBTixDQWJ1QjtHQUFaLENBTm9EOztBQXNCeEUsT0FBSyxhQUFMLEdBQXFCLFVBQVUsRUFBVixFQUFjO0FBQ2pDLFFBQUksUUFBUSxHQUFHLEtBQUgsRUFBUixDQUQ2QjtBQUVqQyxVQUFNO0FBQ0osY0FBUSxLQUFSO0FBQ0EsV0FBSyxrQkFBa0IsRUFBbEI7S0FGUCxFQUdHLElBSEgsQ0FHUSxVQUFTLFFBQVQsRUFBbUI7QUFDekIsWUFBTSxPQUFOLENBQWMsUUFBZCxFQUR5QjtLQUFuQixFQUVMLFVBQVUsS0FBVixFQUFpQjtBQUNsQixjQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEtBQXZCLEVBRGtCO0tBQWpCLENBTEgsQ0FGaUM7QUFVakMsV0FBTyxNQUFNLE9BQU4sQ0FWMEI7R0FBZCxDQXRCbUQ7O0FBbUN4RSxPQUFLLGNBQUwsR0FBc0IsVUFBVSxFQUFWLEVBQWM7O0FBRWxDLFFBQUksUUFBUSxHQUFHLEtBQUgsRUFBUixDQUY4Qjs7QUFJbEMsVUFBTTtBQUNKLGNBQVEsS0FBUjtBQUNBLFdBQUssd0JBQXdCLEVBQXhCO0tBRlAsRUFHRyxJQUhILENBR1EsVUFBUyxRQUFULEVBQW1CO0FBQ3pCLFlBQU0sT0FBTixDQUFjLFFBQWQsRUFEeUI7S0FBbkIsRUFFTCxVQUFVLEtBQVYsRUFBaUI7QUFDbEIsY0FBUSxHQUFSLENBQVksU0FBWixFQUF1QixLQUF2QixFQURrQjtLQUFqQixDQUxILENBSmtDOztBQWFsQyxXQUFPLE1BQU0sT0FBTixDQWIyQjtHQUFkLENBbkNrRDs7QUFtRHhFLE9BQUssV0FBTCxHQUFtQixZQUFZO0FBQzdCLFFBQUksUUFBUSxHQUFHLEtBQUgsRUFBUixDQUR5Qjs7QUFHN0IsVUFBTTtBQUNKLGNBQVEsTUFBUjtBQUNBLFdBQUssY0FBTDtBQUNBLFlBQU0sRUFBTjtLQUhGLEVBSUcsSUFKSCxDQUlRLFVBQVMsUUFBVCxFQUFtQjtBQUN6QixZQUFNLE9BQU4sQ0FBYyxRQUFkLEVBRHlCO0tBQW5CLEVBRUwsVUFBVSxLQUFWLEVBQWlCO0FBQ2xCLGNBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBdkIsRUFEa0I7S0FBakIsQ0FOSCxDQUg2Qjs7QUFhN0IsV0FBTyxNQUFNLE9BQU4sQ0Fic0I7R0FBWixDQW5EcUQ7O0FBbUV4RSxPQUFLLFdBQUwsR0FBbUIsWUFBWTtBQUM3QixRQUFJLFFBQVEsR0FBRyxLQUFILEVBQVIsQ0FEeUI7O0FBRzdCLFVBQU07QUFDSixjQUFRLEtBQVI7QUFDQSxXQUFLLGtCQUFrQixFQUFsQjtBQUNMLFlBQU0sRUFBTjtLQUhGLEVBSUcsSUFKSCxDQUlRLFVBQVMsUUFBVCxFQUFtQjtBQUN6QixZQUFNLE9BQU4sQ0FBYyxRQUFkLEVBRHlCO0tBQW5CLEVBRUwsVUFBVSxLQUFWLEVBQWlCO0FBQ2xCLGNBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBdkIsRUFEa0I7S0FBakIsQ0FOSCxDQUg2Qjs7QUFhN0IsV0FBTyxNQUFNLE9BQU4sQ0Fic0I7R0FBWixDQW5FcUQ7O0FBbUZ4RSxPQUFLLGFBQUwsR0FBcUIsVUFBVSxFQUFWLEVBQWM7QUFDakMsUUFBSSxRQUFRLEdBQUcsS0FBSCxFQUFSLENBRDZCOztBQUdqQyxVQUFNO0FBQ0osY0FBUSxRQUFSO0FBQ0EsV0FBSyxrQkFBa0IsRUFBbEI7S0FGUCxFQUdHLElBSEgsQ0FHUSxVQUFTLFFBQVQsRUFBbUI7QUFDekIsWUFBTSxPQUFOLENBQWMsUUFBZCxFQUR5QjtLQUFuQixFQUVMLFVBQVUsS0FBVixFQUFpQjtBQUNsQixjQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEtBQXZCLEVBRGtCO0tBQWpCLENBTEgsQ0FIaUM7O0FBWWpDLFdBQU8sTUFBTSxPQUFOLENBWjBCO0dBQWQsQ0FuRm1EO0NBQXBCLENBQXREIiwiZmlsZSI6InB1YmxpYy9zZXJ2aWNlcy9Db21wYW55U3ZjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3Rlcm1pbmF0b3JBcHAnKS5zZXJ2aWNlKCdDb21wYW55U3ZjJywgZnVuY3Rpb24oJGh0dHAsICRxKSB7XHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIC8vIENvbXBhbnkgQ2FsbHNcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgdGhpcy5nZXRDb21wYW5pZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgdXJsOiBcIi9hcGkvY29tcGFueVwiXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLmdldE9uZUNvbXBhbnkgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgdXJsOiBcIi9hcGkvY29tcGFueS9cIiArIGlkXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuZ2V0Q29tcGFueVRhc2sgPSBmdW5jdGlvbiAoaWQpIHtcclxuXHJcbiAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICB1cmw6IFwiL2FwaS90YXNrcy9jb21wYW55L1wiICsgaWRcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMucG9zdENvbXBhbnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgdXJsOiBcIi9hcGkvY29tcGFueVwiLFxyXG4gICAgICBkYXRhOiB7fVxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5lZGl0Q29tcGFueSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL2NvbXBhbnkvXCIgKyBpZCxcclxuICAgICAgZGF0YToge31cclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuZGVsZXRlQ29tcGFueSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgdXJsOiBcIi9hcGkvY29tcGFueS9cIiArIGlkXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTs7XHJcbiAgfTtcclxuXHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
