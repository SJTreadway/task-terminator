'use strict';

angular.module('terminatorApp').service('ProjectsSvc', function ($http, $q) {

  this.getProjects = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/project"
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getOneProject = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/project/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getProjectTask = function (id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/project/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postProject = function () {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/project",
      data: {}
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postSingleProject = function (newSingleProject) {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/project",
      data: newSingleProject
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postIntervalProject = function (newSingleProject) {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/project",
      data: newSingleProject
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.activateTemplates = function (id, description) {
    var defer = $q.defer();
    $http({
      method: "POST",
      url: "/api/project/" + id,
      data: {
        description: description
      }
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deleteProject = function (id) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "/api/project/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  ///////////////
  //Templates
  ///////////////

  this.postTemplate = function (newTemplate) {
    console.log('newTemplate', newTemplate);
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/template",
      data: newTemplate
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

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

  this.postTasks = function (newTasksArr, id) {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/template/tasks",
      data: newTasksArr
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getTemplateTasks = function (id) {
    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/tasks/template/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });
  };

  ///////////
  //Scheduled
  //////////

  this.postRecurringProject = function (newRecurringForm) {
    console.log('FORM', newRecurringForm);
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/template",
      data: newRecurringForm
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postSingleProject = function (singleProject) {
    console.log(singleProject);
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/singleproject",
      data: singleProject
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postTriggeredTemplate = function (newTriggeredForm) {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "/api/template",
      data: newTriggeredForm
    }).then(function (response) {
      console.log(response);
      defer.resolve(response.data);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.startProject = function (templateid) {
    var deferred = $q.defer();
    $http({
      method: "POST",
      url: "/api/project/" + templateid
    }).then(function (res) {
      console.log(res);
      deferred.resolve(res.data);
    }).catch(function (err) {
      console.log("ERROR STARTING PROJECT!");
    });
    return deferred.promise;
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9zZXJ2aWNlcy9Qcm9qZWN0c1N2Yy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFFBQVEsTUFBUixDQUFlLGVBQWYsRUFBZ0MsT0FBaEMsQ0FBd0MsYUFBeEMsRUFBdUQsVUFBUyxLQUFULEVBQWdCLEVBQWhCLEVBQW9COztBQUV6RSxPQUFLLFdBQUwsR0FBbUIsWUFBWTs7QUFFN0IsUUFBSSxRQUFRLEdBQUcsS0FBSCxFQUFSLENBRnlCOztBQUk3QixVQUFNO0FBQ0osY0FBUSxLQUFSO0FBQ0EsV0FBSyxjQUFMO0tBRkYsRUFHRyxJQUhILENBR1EsVUFBUyxRQUFULEVBQW1CO0FBQ3pCLFlBQU0sT0FBTixDQUFjLFFBQWQsRUFEeUI7S0FBbkIsRUFFTCxVQUFVLEtBQVYsRUFBaUI7QUFDbEIsY0FBUSxHQUFSLENBQVksU0FBWixFQUF1QixLQUF2QixFQURrQjtLQUFqQixDQUxILENBSjZCOztBQWE3QixXQUFPLE1BQU0sT0FBTixDQWJzQjtHQUFaLENBRnNEOztBQWtCekUsT0FBSyxhQUFMLEdBQXFCLFVBQVUsRUFBVixFQUFjOztBQUVqQyxRQUFJLFFBQVEsR0FBRyxLQUFILEVBQVIsQ0FGNkI7O0FBSWpDLFVBQU07QUFDSixjQUFRLEtBQVI7QUFDQSxXQUFLLGtCQUFrQixFQUFsQjtLQUZQLEVBR0csSUFISCxDQUdRLFVBQVMsUUFBVCxFQUFtQjtBQUN6QixZQUFNLE9BQU4sQ0FBYyxRQUFkLEVBRHlCO0tBQW5CLEVBRUwsVUFBVSxLQUFWLEVBQWlCO0FBQ2xCLGNBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBdkIsRUFEa0I7S0FBakIsQ0FMSCxDQUppQzs7QUFhakMsV0FBTyxNQUFNLE9BQU4sQ0FiMEI7R0FBZCxDQWxCb0Q7O0FBa0N6RSxPQUFLLGNBQUwsR0FBc0IsVUFBVSxFQUFWLEVBQWM7O0FBRWxDLFFBQUksUUFBUSxHQUFHLEtBQUgsRUFBUixDQUY4Qjs7QUFJbEMsVUFBTTtBQUNKLGNBQVEsS0FBUjtBQUNB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YixjQUFRLEdBQVIsQ0FBWSxHQUFaLEVBRGE7QUFFYixlQUFTLE9BQVQsQ0FBaUIsSUFBSSxJQUFKLENBQWpCLENBRmE7S0FBUCxDQUhSLENBTUcsS0FOSCxDQU1TLFVBQUMsR0FBRCxFQUFPO0FBQ2QsY0FBUSxHQUFSLENBQVkseUJBQVosRUFEYztLQUFQLENBTlQsQ0FGc0M7QUFXdEMsV0FBTyxTQUFTLE9BQVQsQ0FYK0I7R0FBcEIsQ0E1UHFEO0NBQXBCLENBQXZEIiwiZmlsZSI6InB1YmxpYy9zZXJ2aWNlcy9Qcm9qZWN0c1N2Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0ZXJtaW5hdG9yQXBwJykuc2VydmljZSgnUHJvamVjdHNTdmMnLCBmdW5jdGlvbigkaHR0cCwgJHEpIHtcclxuXHJcbiAgdGhpcy5nZXRQcm9qZWN0cyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICB1cmw6IFwiL2FwaS9wcm9qZWN0XCJcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuZ2V0T25lUHJvamVjdCA9IGZ1bmN0aW9uIChpZCkge1xyXG5cclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL3Byb2plY3QvXCIgKyBpZFxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5nZXRQcm9qZWN0VGFzayA9IGZ1bmN0aW9uIChpZCkge1xyXG5cclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL3Rhc2tzL3Byb2plY3QvXCIgKyBpZFxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5wb3N0UHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICB1cmw6IFwiL2FwaS9wcm9qZWN0XCIsXHJcbiAgICAgIGRhdGE6IHt9XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLnBvc3RTaW5nbGVQcm9qZWN0ID0gZnVuY3Rpb24gKG5ld1NpbmdsZVByb2plY3QpIHtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICB1cmw6IFwiL2FwaS9wcm9qZWN0XCIsXHJcbiAgICAgIGRhdGE6IG5ld1NpbmdsZVByb2plY3RcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMucG9zdEludGVydmFsUHJvamVjdCA9IGZ1bmN0aW9uIChuZXdTaW5nbGVQcm9qZWN0KSB7XHJcbiAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgdXJsOiBcIi9hcGkvcHJvamVjdFwiLFxyXG4gICAgICBkYXRhOiBuZXdTaW5nbGVQcm9qZWN0XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLmFjdGl2YXRlVGVtcGxhdGVzID0gZnVuY3Rpb24gKGlkLCBkZXNjcmlwdGlvbikge1xyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuICAgICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgdXJsOiBcIi9hcGkvcHJvamVjdC9cIiArIGlkLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLmRlbGV0ZVByb2plY3QgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL3Byb2plY3QvXCIgKyBpZFxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgfTtcclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vXHJcbiAgLy9UZW1wbGF0ZXNcclxuICAvLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgdGhpcy5wb3N0VGVtcGxhdGUgPSBmdW5jdGlvbiAobmV3VGVtcGxhdGUpIHtcclxuICAgIGNvbnNvbGUubG9nKCduZXdUZW1wbGF0ZScsIG5ld1RlbXBsYXRlKTtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICB1cmw6IFwiL2FwaS90ZW1wbGF0ZVwiLFxyXG4gICAgICBkYXRhOiBuZXdUZW1wbGF0ZVxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5nZXRUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgdXJsOiBcIi9hcGkvdGVtcGxhdGVcIlxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5wb3N0VGFza3MgPSBmdW5jdGlvbiAobmV3VGFza3NBcnIsIGlkKSB7XHJcbiAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICRodHRwKHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgdXJsOiBcIi9hcGkvdGVtcGxhdGUvdGFza3NcIixcclxuICAgICAgZGF0YTogbmV3VGFza3NBcnJcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuZ2V0VGVtcGxhdGVUYXNrcyA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgdXJsOiBcIi9hcGkvdGFza3MvdGVtcGxhdGUvXCIgKyBpZCxcclxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICB9O1xyXG5cclxuICAvLy8vLy8vLy8vL1xyXG4gIC8vU2NoZWR1bGVkXHJcbiAgLy8vLy8vLy8vL1xyXG5cclxuXHJcbnRoaXMucG9zdFJlY3VycmluZ1Byb2plY3QgPSBmdW5jdGlvbiAobmV3UmVjdXJyaW5nRm9ybSkge1xyXG4gICAgY29uc29sZS5sb2coJ0ZPUk0nLCBuZXdSZWN1cnJpbmdGb3JtKTtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICB1cmw6IFwiL2FwaS90ZW1wbGF0ZVwiLFxyXG4gICAgICBkYXRhOiBuZXdSZWN1cnJpbmdGb3JtXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9O1xyXG5cclxuICB0aGlzLnBvc3RTaW5nbGVQcm9qZWN0ID0gZnVuY3Rpb24gKHNpbmdsZVByb2plY3QpIHtcclxuICAgIGNvbnNvbGUubG9nKHNpbmdsZVByb2plY3QpO1xyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL3NpbmdsZXByb2plY3RcIixcclxuICAgICAgZGF0YTogc2luZ2xlUHJvamVjdFxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5wb3N0VHJpZ2dlcmVkVGVtcGxhdGUgPSBmdW5jdGlvbiAobmV3VHJpZ2dlcmVkRm9ybSkge1xyXG4gICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIHVybDogXCIvYXBpL3RlbXBsYXRlXCIsXHJcbiAgICAgIGRhdGE6IG5ld1RyaWdnZXJlZEZvcm1cclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuc3RhcnRQcm9qZWN0ID0gZnVuY3Rpb24odGVtcGxhdGVpZCl7XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICB1cmw6IFwiL2FwaS9wcm9qZWN0L1wiICsgdGVtcGxhdGVpZFxyXG4gICAgfSkudGhlbigocmVzKT0+e1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlcy5kYXRhKTtcclxuICAgIH0pLmNhdGNoKChlcnIpPT57XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgU1RBUlRJTkcgUFJPSkVDVCFcIik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gIH07XHJcblxyXG5cclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
