'use strict';

angular.module('terminatorApp').service('TemplatesSvc', function ($http, $q) {

  ////////////////////////
  //  Template Calls
  ////////////////////////
  this.getTemplates = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/template"
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getOneTemplate = function (id) {
    var defer = $q.defer();
    $http({
      method: "GET",
      url: "/api/template/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error:(HERE) ", error);
    });
    return defer.promise;
  };

  // this.postTemplate = function (newTemplate) {
  //   var defer = $q.defer();

  //   $http({
  //     method: "POST",
  //     url: "/api/template",
  //     data: newTemplate
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // };

  // this.editTemplate = function () {
  //   var defer = $q.defer();

  //   $http({
  //     method: "PUT",
  //     url: "/api/template/" + id,
  //     data: {}
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // };

  // this.deleteTemplate = function (id) {
  //   var defer = $q.defer();

  //   $http({
  //     method: "DELETE",
  //     url: "/api/template/" + id
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // };

  // ////////////////////////
  // // Task Template Calls
  // ////////////////////////

  // this.postTasks = function (newTasksArr, id) {
  //   console.log("TemplatesSvc");
  //   var defer = $q.defer();

  //   $http({
  //     method: "POST",
  //     url: "/api/template/tasks",
  //     data: newTasksArr
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // }

  // ////////////////////////
  // // Project Template Calls
  // ////////////////////////

  // this.getProjectTemplates = function () {

  //   var defer = $q.defer();

  //   $http({
  //     method: "GET",
  //     url: "/api/template"
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // }

  // this.getOneProjectTemplate = function (id) {

  //   var defer = $q.defer();

  //   $http({
  //     method: "GET",
  //     url: "/api/template/" + id
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // }

  // this.postProjectTemplate = function () {
  //   var defer = $q.defer();

  //   $http({
  //     method: "POST",
  //     url: "/api/template",
  //     data: {}
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // };

  // this.editProjectTemplate = function () {
  //   var defer = $q.defer();

  //   $http({
  //     method: "PUT",
  //     url: "/api/template/" + id,
  //     data: {}
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // };

  // this.deleteProjectTemplate = function (id) {
  //   var defer = $q.defer();

  //   $http({
  //     method: "DELETE",
  //     url: "/api/template/" + id
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;;
  // };

  // this.getCompanies = function () {

  //   var defer = $q.defer();

  //   $http({
  //     method: "GET",
  //     url: "/api/company"
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9zZXJ2aWNlcy9UZW1wbGF0ZXNTdmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxRQUFRLE1BQVIsQ0FBZSxlQUFmLEVBQWdDLE9BQWhDLENBQXdDLGNBQXhDLEVBQXdELFVBQVMsS0FBVCxFQUFnQixFQUFoQixFQUFvQjs7Ozs7QUFLMUUsT0FBSyxZQUFMLEdBQW9CLFlBQVk7O0FBRTlCLFFBQUksUUFBUSxHQUFHLEtBQUgsRUFBUixDQUYwQjs7QUFJOUIsVUFBTTtBQUNKLGNBQVEsS0FBUjtBQUNBLFdBQUssZUFBTDtLQUZGLEVBR0csSUFISCxDQUdRLFVBQVMsUUFBVCxFQUFtQjtBQUN6QixZQUFNLE9BQU4sQ0FBYyxRQUFkLEVBRHlCO0tBQW5CLEVBRUwsVUFBVSxLQUFWLEVBQWlCO0FBQ2xCLGNBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBdkIsRUFEa0I7S0FBakIsQ0FMSCxDQUo4Qjs7QUFhOUIsV0FBTyxNQUFNLE9BQU4sQ0FidUI7R0FBWixDQUxzRDs7QUFxQjFFLE9BQUssY0FBTCxHQUFzQixVQUFVLEVBQVYsRUFBYztBQUNsQyxRQUFJLFFBQVEsR0FBRyxLQUFILEVBQVIsQ0FEOEI7QUFFbEMsVUFBTTtBQUNKLGNBQVEsS0FBUjtBQUNBLFdBQUssbUJBQW1CLEVBQW5CO0tBRlAsRUFHRyxJQUhILENBR1EsVUFBUyxRQUFULEVBQW1CO0FBQ3pCLFlBQU0sT0FBTixDQUFjLFFBQWQsRUFEeUI7S0FBbkIsRUFFTCxVQUFVLEtBQVYsRUFBaUI7QUFDbEIsY0FBUSxHQUFSLENBQVksZUFBWixFQUE2QixLQUE3QixFQURrQjtLQUFqQixDQUxILENBRmtDO0FBVWxDLFdBQU8sTUFBTSxPQUFOLENBVjJCO0dBQWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXJCZ0MsQ0FBeEQ7QUFBNEUiLCJmaWxlIjoicHVibGljL3NlcnZpY2VzL1RlbXBsYXRlc1N2Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0ZXJtaW5hdG9yQXBwJykuc2VydmljZSgnVGVtcGxhdGVzU3ZjJywgZnVuY3Rpb24oJGh0dHAsICRxKSB7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gIFRlbXBsYXRlIENhbGxzXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHRoaXMuZ2V0VGVtcGxhdGVzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL3RlbXBsYXRlXCJcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuZ2V0T25lVGVtcGxhdGUgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgdXJsOiBcIi9hcGkvdGVtcGxhdGUvXCIgKyBpZFxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yOihIRVJFKSBcIiwgZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICAvLyB0aGlzLnBvc3RUZW1wbGF0ZSA9IGZ1bmN0aW9uIChuZXdUZW1wbGF0ZSkge1xyXG4gIC8vICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgLy8gICAkaHR0cCh7XHJcbiAgLy8gICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgLy8gICAgIHVybDogXCIvYXBpL3RlbXBsYXRlXCIsXHJcbiAgLy8gICAgIGRhdGE6IG5ld1RlbXBsYXRlXHJcbiAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgLy8gICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gIC8vICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgLy8gICB9KTtcclxuXHJcbiAgLy8gICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICAvLyB9O1xyXG5cclxuICAvLyB0aGlzLmVkaXRUZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAvLyAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gIC8vICAgJGh0dHAoe1xyXG4gIC8vICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgLy8gICAgIHVybDogXCIvYXBpL3RlbXBsYXRlL1wiICsgaWQsXHJcbiAgLy8gICAgIGRhdGE6IHt9XHJcbiAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgLy8gICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gIC8vICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgLy8gICB9KTtcclxuXHJcbiAgLy8gICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICAvLyB9O1xyXG5cclxuICAvLyB0aGlzLmRlbGV0ZVRlbXBsYXRlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgLy8gICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAvLyAgICRodHRwKHtcclxuICAvLyAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gIC8vICAgICB1cmw6IFwiL2FwaS90ZW1wbGF0ZS9cIiArIGlkXHJcbiAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgLy8gICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gIC8vICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgLy8gICB9KTtcclxuXHJcbiAgLy8gICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICAvLyB9O1xyXG5cclxuICAvLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAvLyAvLyBUYXNrIFRlbXBsYXRlIENhbGxzXHJcbiAgLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gIC8vIHRoaXMucG9zdFRhc2tzID0gZnVuY3Rpb24gKG5ld1Rhc2tzQXJyLCBpZCkge1xyXG4gIC8vICAgY29uc29sZS5sb2coXCJUZW1wbGF0ZXNTdmNcIik7XHJcbiAgLy8gICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAvLyAgICRodHRwKHtcclxuICAvLyAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAvLyAgICAgdXJsOiBcIi9hcGkvdGVtcGxhdGUvdGFza3NcIixcclxuICAvLyAgICAgZGF0YTogbmV3VGFza3NBcnJcclxuICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAvLyAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgLy8gICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAvLyAgIH0pO1xyXG5cclxuICAvLyAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLy8gLy8gUHJvamVjdCBUZW1wbGF0ZSBDYWxsc1xyXG4gIC8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAvLyB0aGlzLmdldFByb2plY3RUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIC8vICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgLy8gICAkaHR0cCh7XHJcbiAgLy8gICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAvLyAgICAgdXJsOiBcIi9hcGkvdGVtcGxhdGVcIlxyXG4gIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gIC8vICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAvLyAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gIC8vICAgfSk7XHJcblxyXG4gIC8vICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgLy8gfVxyXG5cclxuICAvLyB0aGlzLmdldE9uZVByb2plY3RUZW1wbGF0ZSA9IGZ1bmN0aW9uIChpZCkge1xyXG5cclxuICAvLyAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gIC8vICAgJGh0dHAoe1xyXG4gIC8vICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgLy8gICAgIHVybDogXCIvYXBpL3RlbXBsYXRlL1wiICsgaWRcclxuICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAvLyAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgLy8gICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAvLyAgIH0pO1xyXG5cclxuICAvLyAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gdGhpcy5wb3N0UHJvamVjdFRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gIC8vICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgLy8gICAkaHR0cCh7XHJcbiAgLy8gICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgLy8gICAgIHVybDogXCIvYXBpL3RlbXBsYXRlXCIsXHJcbiAgLy8gICAgIGRhdGE6IHt9XHJcbiAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgLy8gICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gIC8vICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgLy8gICB9KTtcclxuXHJcbiAgLy8gICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICAvLyB9O1xyXG5cclxuICAvLyB0aGlzLmVkaXRQcm9qZWN0VGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgLy8gICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAvLyAgICRodHRwKHtcclxuICAvLyAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gIC8vICAgICB1cmw6IFwiL2FwaS90ZW1wbGF0ZS9cIiArIGlkLFxyXG4gIC8vICAgICBkYXRhOiB7fVxyXG4gIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gIC8vICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAvLyAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gIC8vICAgfSk7XHJcblxyXG4gIC8vICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgLy8gfTtcclxuXHJcbiAgLy8gdGhpcy5kZWxldGVQcm9qZWN0VGVtcGxhdGUgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAvLyAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gIC8vICAgJGh0dHAoe1xyXG4gIC8vICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgLy8gICAgIHVybDogXCIvYXBpL3RlbXBsYXRlL1wiICsgaWRcclxuICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAvLyAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgLy8gICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAvLyAgIH0pO1xyXG5cclxuICAvLyAgIHJldHVybiBkZWZlci5wcm9taXNlOztcclxuICAvLyB9O1xyXG5cclxuICAvLyB0aGlzLmdldENvbXBhbmllcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy8gICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAvLyAgICRodHRwKHtcclxuICAvLyAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gIC8vICAgICB1cmw6IFwiL2FwaS9jb21wYW55XCJcclxuICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAvLyAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgLy8gICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAvLyAgIH0pO1xyXG5cclxuICAvLyAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIC8vIH1cclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
