'use strict';

angular.module('terminatorApp').controller('YourTeamCtrl', function ($scope, $uibModal, YourTeamSvc, $state, CompanySvc, companyInfo) {

  var getEmployees = function getEmployees(companyId, scope) {
    console.log('companyId', companyId);
    YourTeamSvc.getEmployees(companyId).then(function (res) {
      console.log('res from getEmployees', res);
      scope.employees = res.data;
    });
  };

  var getCompany = function getCompany(scope) {
    CompanySvc.getOneCompany(companyInfo.id).then(function (res) {
      var company = res.data;
      scope.company = company;
      getEmployees(company._id, scope);
    });
  };
  var parentScope = $scope;
  getCompany($scope);

  $scope.cssClass = 'page-yourTeam';

  $scope.successAlert = {
    type: 'success',
    msg: 'Well done! You successfully read this important alert message.'
  };

  ///////////////////////////////////////////////////////////////
  // Employee Modals                                           //
  ///////////////////////////////////////////////////////////////

  $scope.openAddEmployeeModal = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: "./templates/addNewEmployee.html",
      size: 'lg',
      controller: function controller($scope, $uibModalInstance, CompanySvc) {
        $scope.newEmployee = {
          departments: [],
          positions: []
        };
        getCompany($scope);
        $scope.addEmployee = function (newEmployee) {
          newEmployee.departments.push($scope.department);
          newEmployee.positions.push($scope.position);
          YourTeamSvc.postEmployee(newEmployee, $scope.company._id).then(function (results) {
            console.log('results from employee add', results);
            getCompany(parentScope);
            $scope.newEmployee = {};
            $scope.cancel();
          });
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    });
  };

  $scope.openEditEmployeeModal = function (employee) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: "./templates/editEmployee.html",
      size: 'lg',
      controller: function controller($scope, $uibModalInstance, CompanySvc) {
        $scope.employee = employee;
        console.log("EMPLOYEE: ", $scope.employee);
        getCompany($scope);
        $scope.editEmployee = function (employee) {
          YourTeamSvc.editEmployee(employee).then(function (res) {
            console.log("Employee Edited");
            $scope.cancel();
          });
        };

        $scope.deleteEmployee = function (employee) {
          YourTeamSvc.deleteEmployee(employee).then(function (res) {
            console.log("Employee Deleted");
            $scope.cancel();
          });
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    });
  };

  ///////////////////////////////////////////////////////////////
  // Department Modals
  ///////////////////////////////////////////////////////////////

  $scope.openAddDepartmentModal = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: "./templates/addNewDepartment.html",
      size: 'lg',
      controller: function controller($scope, YourTeamSvc, $uibModalInstance) {
        $scope.addDepartment = function (newDepartment) {
          YourTeamSvc.postDepartment(newDepartment).then(function (results) {
            console.log("Department added");
          });
          $scope.cancel();
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    });
  };

  $scope.openEditDepartmentModal = function (department) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: "./templates/editDepartment.html",
      size: 'lg',
      controller: function controller($scope, YourTeamSvc, $uibModalInstance) {
        $scope.department = department;
        console.log($scope.department);

        $scope.editDepartment = function (department) {
          YourTeamSvc.putDepartment(department).then(function (response) {
            console.log("Department Edited");
            $scope.cancel();
          });
        };

        $scope.deleteDepartment = function (department) {
          YourTeamSvc.deleteDepartment(department).then(function (response) {
            console.log("Department Deleted");
            $scope.cancel();
          });
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    });
  };

  ///////////////////////////////////////////////////////////////
  // Position Modals
  ///////////////////////////////////////////////////////////////

  $scope.openAddPositionModal = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: "./templates/addNewPosition.html",
      size: 'lg',
      controller: function controller($scope, YourTeamSvc, $uibModalInstance) {
        getCompany($scope);
        $scope.addPosition = function (newPosition) {
          YourTeamSvc.postPosition(newPosition).then(function (results) {
            $scope.cancel();
          });
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    });
  };

  $scope.openEditPositionModal = function (position) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: "./templates/editPosition.html",
      size: 'lg',
      controller: function controller($scope, $uibModalInstance, CompanySvc) {
        $scope.position = position;
        console.log("Position: ", $scope.position);
        getCompany($scope);

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

        $scope.editPosition = function (position) {
          YourTeamSvc.editPosition(position).then(function (res) {
            console.log("Position Edited");
            $scope.cancel();
          });
        };

        $scope.deletePosition = function (position) {
          YourTeamSvc.deletePosition(position).then(function (res) {
            console.log("Position Deleted");
            $scope.cancel();
          });
        };
      }
    });
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9jb250cm9sbGVycy9Zb3VyVGVhbUN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxRQUFRLE1BQVIsQ0FBZSxlQUFmLEVBQWdDLFVBQWhDLENBQTJDLGNBQTNDLEVBQTJELFVBQVMsTUFBVCxFQUFpQixTQUFqQixFQUE0QixXQUE1QixFQUF5QyxNQUF6QyxFQUFpRCxVQUFqRCxFQUE2RCxXQUE3RCxFQUEwRTs7QUFFbkksTUFBSSxlQUFlLFNBQWYsWUFBZSxDQUFTLFNBQVQsRUFBb0IsS0FBcEIsRUFBMkI7QUFDNUMsWUFBUSxHQUFSLENBQVksV0FBWixFQUF5QixTQUF6QixFQUQ0QztBQUU1QyxnQkFBWSxZQUFaLENBQXlCLFNBQXpCLEVBQW9DLElBQXBDLENBQXlDLFVBQVMsR0FBVCxFQUFjO0FBQ3JELGNBQVEsR0FBUixDQUFZLHVCQUFaLEVBQXFDLEdBQXJDLEVBRHFEO0FBRXJELFlBQU0sU0FBTixHQUFrQixJQUFJLElBQUosQ0FGbUM7S0FBZCxDQUF6QyxDQUY0QztHQUEzQixDQUZnSDs7QUFVbkksTUFBSSxhQUFhLFNBQWIsVUFBYSxDQUFTLEtBQVQsRUFBZ0I7QUFDL0IsZUFBVyxhQUFYLENBQXlCLFlBQVksRUFBWixDQUF6QixDQUF5QyxJQUF6QyxDQUE4QyxVQUFTLEdBQVQsRUFBYztBQUMxRCxVQUFJLFVBQVUsSUFBSSxJQUFKLENBRDRDO0FBRTFELFlBQU0sT0FBTixHQUFnQixPQUFoQixDQUYwRDtBQUcxRCxtQkFBYSxRQUFRLEdBQVIsRUFBYSxLQUExQixFQUgwRDtLQUFkLENBQTlDLENBRCtCO0dBQWhCLENBVmtIO0FBaUJuSSxNQUFJLGNBQWMsTUFBZCxDQWpCK0g7QUFrQm5JLGFBQVcsTUFBWCxFQWxCbUk7O0FBc0JuSSxTQUFPLFFBQVAsR0FBa0IsZUFBbEIsQ0F0Qm1JOztBQXdCbkksU0FBTyxZQUFQLEdBQXNCO0FBQ3BCLFVBQU0sU0FBTjtBQUNBLFNBQUssZ0VBQUw7R0FGRjs7Ozs7O0FBeEJt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R0FBc0IsVUFBUyxRQUFULEVBQW1CO0FBQ3ZDLHNCQUFZLFlBQVosQ0FBeUIsUUFBekIsRUFBbUMsSUFBbkMsQ0FBd0MsVUFBUyxHQUFULEVBQWM7QUFDcEQsb0JBQVEsR0FBUixDQUFZLGlCQUFaLEVBRG9EO0FBRXBELG1CQUFPLE1BQVAsR0FGb0Q7V0FBZCxDQUF4QyxDQUR1QztTQUFuQixDQVRxQzs7QUFnQjNELGVBQU8sY0FBUCxHQUF3QixVQUFTLFFBQVQsRUFBbUI7QUFDekMsc0JBQVksY0FBWixDQUEyQixRQUEzQixFQUFxQyxJQUFyQyxDQUEwQyxVQUFTLEdBQVQsRUFBYztBQUN0RCxvQkFBUSxHQUFSLENBQVksa0JBQVosRUFEc0Q7QUFFdEQsbUJBQU8sTUFBUCxHQUZzRDtXQUFkLENBQTFDLENBRHlDO1NBQW5CLENBaEJtQztPQUFqRDtLQUpLLENBQWhCLENBRDZDO0dBQW5CLENBOUtvRztDQUExRSxDQUEzRCIsImZpbGUiOiJwdWJsaWMvY29udHJvbGxlcnMvWW91clRlYW1DdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3Rlcm1pbmF0b3JBcHAnKS5jb250cm9sbGVyKCdZb3VyVGVhbUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR1aWJNb2RhbCwgWW91clRlYW1TdmMsICRzdGF0ZSwgQ29tcGFueVN2YywgY29tcGFueUluZm8pIHtcclxuXHJcbiAgdmFyIGdldEVtcGxveWVlcyA9IGZ1bmN0aW9uKGNvbXBhbnlJZCwgc2NvcGUpIHtcclxuICAgIGNvbnNvbGUubG9nKCdjb21wYW55SWQnLCBjb21wYW55SWQpXHJcbiAgICBZb3VyVGVhbVN2Yy5nZXRFbXBsb3llZXMoY29tcGFueUlkKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICBjb25zb2xlLmxvZygncmVzIGZyb20gZ2V0RW1wbG95ZWVzJywgcmVzKVxyXG4gICAgICBzY29wZS5lbXBsb3llZXMgPSByZXMuZGF0YTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdmFyIGdldENvbXBhbnkgPSBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgQ29tcGFueVN2Yy5nZXRPbmVDb21wYW55KGNvbXBhbnlJbmZvLmlkKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICB2YXIgY29tcGFueSA9IHJlcy5kYXRhXHJcbiAgICAgIHNjb3BlLmNvbXBhbnkgPSBjb21wYW55XHJcbiAgICAgIGdldEVtcGxveWVlcyhjb21wYW55Ll9pZCwgc2NvcGUpXHJcbiAgICB9KTtcclxuICB9XHJcbiAgdmFyIHBhcmVudFNjb3BlID0gJHNjb3BlXHJcbiAgZ2V0Q29tcGFueSgkc2NvcGUpXHJcblxyXG4gIFxyXG5cclxuICAkc2NvcGUuY3NzQ2xhc3MgPSAncGFnZS15b3VyVGVhbSc7XHJcblxyXG4gICRzY29wZS5zdWNjZXNzQWxlcnQgPSB7XHJcbiAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICBtc2c6ICdXZWxsIGRvbmUhIFlvdSBzdWNjZXNzZnVsbHkgcmVhZCB0aGlzIGltcG9ydGFudCBhbGVydCBtZXNzYWdlLidcclxuICB9XHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIC8vIEVtcGxveWVlIE1vZGFscyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAkc2NvcGUub3BlbkFkZEVtcGxveWVlTW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICBcdHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gIFx0XHRhbmltYXRpb246IHRydWUsXHJcbiAgXHRcdHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2FkZE5ld0VtcGxveWVlLmh0bWxcIixcclxuICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIENvbXBhbnlTdmMpIHtcclxuICAgICAgICAkc2NvcGUubmV3RW1wbG95ZWUgPSB7XHJcbiAgICAgICAgICBkZXBhcnRtZW50czogW10sXHJcbiAgICAgICAgICBwb3NpdGlvbnM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBnZXRDb21wYW55KCRzY29wZSlcclxuICAgICAgICAkc2NvcGUuYWRkRW1wbG95ZWUgPSBmdW5jdGlvbihuZXdFbXBsb3llZSkge1xyXG4gICAgICAgICAgbmV3RW1wbG95ZWUuZGVwYXJ0bWVudHMucHVzaCgkc2NvcGUuZGVwYXJ0bWVudClcclxuICAgICAgICAgIG5ld0VtcGxveWVlLnBvc2l0aW9ucy5wdXNoKCRzY29wZS5wb3NpdGlvbilcclxuICAgICAgICAgIFlvdXJUZWFtU3ZjLnBvc3RFbXBsb3llZShuZXdFbXBsb3llZSwgJHNjb3BlLmNvbXBhbnkuX2lkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdHMgZnJvbSBlbXBsb3llZSBhZGQnLCByZXN1bHRzKVxyXG4gICAgICAgICAgICBnZXRDb21wYW55KHBhcmVudFNjb3BlKVxyXG4gICAgICAgICAgICAkc2NvcGUubmV3RW1wbG95ZWUgPSB7fTtcclxuICAgICAgICAgICAgJHNjb3BlLmNhbmNlbCgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gIFx0fSlcclxuICB9XHJcblxyXG4gICRzY29wZS5vcGVuRWRpdEVtcGxveWVlTW9kYWwgPSBmdW5jdGlvbihlbXBsb3llZSkge1xyXG4gIFx0dmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgXHRcdGFuaW1hdGlvbjogdHJ1ZSxcclxuICBcdFx0dGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvZWRpdEVtcGxveWVlLmh0bWxcIixcclxuICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIENvbXBhbnlTdmMpIHtcclxuICAgICAgICAkc2NvcGUuZW1wbG95ZWUgPSBlbXBsb3llZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVNUExPWUVFOiBcIiwgJHNjb3BlLmVtcGxveWVlKTtcclxuICAgICAgICBnZXRDb21wYW55KCRzY29wZSlcclxuICAgICAgICAkc2NvcGUuZWRpdEVtcGxveWVlID0gZnVuY3Rpb24oZW1wbG95ZWUpIHtcclxuICAgICAgICAgIFlvdXJUZWFtU3ZjLmVkaXRFbXBsb3llZShlbXBsb3llZSkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbXBsb3llZSBFZGl0ZWRcIik7XHJcbiAgICAgICAgICAgICRzY29wZS5jYW5jZWwoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZUVtcGxveWVlID0gZnVuY3Rpb24oZW1wbG95ZWUpIHtcclxuICAgICAgICAgIFlvdXJUZWFtU3ZjLmRlbGV0ZUVtcGxveWVlKGVtcGxveWVlKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVtcGxveWVlIERlbGV0ZWRcIik7XHJcbiAgICAgICAgICAgICRzY29wZS5jYW5jZWwoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH1cclxuICBcdH0pXHJcbiAgfTtcclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLy8gRGVwYXJ0bWVudCBNb2RhbHNcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgJHNjb3BlLm9wZW5BZGREZXBhcnRtZW50TW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICBcdHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gIFx0XHRhbmltYXRpb246IHRydWUsXHJcbiAgXHRcdHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2FkZE5ld0RlcGFydG1lbnQuaHRtbFwiLFxyXG4gICAgICBzaXplOiAnbGcnLFxyXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCBZb3VyVGVhbVN2YywgJHVpYk1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICAkc2NvcGUuYWRkRGVwYXJ0bWVudCA9IGZ1bmN0aW9uKG5ld0RlcGFydG1lbnQpIHtcclxuICAgICAgICAgIFlvdXJUZWFtU3ZjLnBvc3REZXBhcnRtZW50KG5ld0RlcGFydG1lbnQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlcGFydG1lbnQgYWRkZWRcIik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICRzY29wZS5jYW5jZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICBcdCB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgJHNjb3BlLm9wZW5FZGl0RGVwYXJ0bWVudE1vZGFsID0gZnVuY3Rpb24oZGVwYXJ0bWVudCkge1xyXG4gIFx0dmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgXHRcdGFuaW1hdGlvbjogdHJ1ZSxcclxuICBcdFx0dGVtcGxhdGVVcmw6IFwiLi90ZW1wbGF0ZXMvZWRpdERlcGFydG1lbnQuaHRtbFwiLFxyXG4gICAgICBzaXplOiAnbGcnLFxyXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCBZb3VyVGVhbVN2YywgJHVpYk1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICAkc2NvcGUuZGVwYXJ0bWVudCA9IGRlcGFydG1lbnQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmRlcGFydG1lbnQpO1xyXG5cclxuICAgICAgICAkc2NvcGUuZWRpdERlcGFydG1lbnQgPSBmdW5jdGlvbihkZXBhcnRtZW50KSB7XHJcbiAgICAgICAgICBZb3VyVGVhbVN2Yy5wdXREZXBhcnRtZW50KGRlcGFydG1lbnQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZXBhcnRtZW50IEVkaXRlZFwiKTtcclxuICAgICAgICAgICAgJHNjb3BlLmNhbmNlbCgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGVsZXRlRGVwYXJ0bWVudCA9IGZ1bmN0aW9uKGRlcGFydG1lbnQpIHtcclxuICAgICAgICAgIFlvdXJUZWFtU3ZjLmRlbGV0ZURlcGFydG1lbnQoZGVwYXJ0bWVudCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlcGFydG1lbnQgRGVsZXRlZFwiKTtcclxuICAgICAgICAgICAgJHNjb3BlLmNhbmNlbCgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH1cclxuICBcdH0pXHJcbiAgfVxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAvLyBQb3NpdGlvbiBNb2RhbHNcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgJHNjb3BlLm9wZW5BZGRQb3NpdGlvbk1vZGFsID0gZnVuY3Rpb24oKSB7XHJcbiAgXHR2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICBcdFx0YW5pbWF0aW9uOiB0cnVlLFxyXG4gIFx0XHR0ZW1wbGF0ZVVybDogXCIuL3RlbXBsYXRlcy9hZGROZXdQb3NpdGlvbi5odG1sXCIsXHJcbiAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgWW91clRlYW1TdmMsICR1aWJNb2RhbEluc3RhbmNlKSB7XHJcbiAgICAgICAgZ2V0Q29tcGFueSgkc2NvcGUpXHJcbiAgICAgICAgJHNjb3BlLmFkZFBvc2l0aW9uID0gZnVuY3Rpb24obmV3UG9zaXRpb24pIHtcclxuICAgICAgICAgIFlvdXJUZWFtU3ZjLnBvc3RQb3NpdGlvbihuZXdQb3NpdGlvbikudGhlbihmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jYW5jZWwoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIH1cclxuICBcdH0pXHJcbiAgfVxyXG5cclxuICAkc2NvcGUub3BlbkVkaXRQb3NpdGlvbk1vZGFsID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcclxuICBcdHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gIFx0XHRhbmltYXRpb246IHRydWUsXHJcbiAgXHRcdHRlbXBsYXRlVXJsOiBcIi4vdGVtcGxhdGVzL2VkaXRQb3NpdGlvbi5odG1sXCIsXHJcbiAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCBDb21wYW55U3ZjKSB7XHJcbiAgICAgICAgJHNjb3BlLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQb3NpdGlvbjogXCIsICRzY29wZS5wb3NpdGlvbik7XHJcbiAgICAgICAgZ2V0Q29tcGFueSgkc2NvcGUpXHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZWRpdFBvc2l0aW9uID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcclxuICAgICAgICAgIFlvdXJUZWFtU3ZjLmVkaXRQb3NpdGlvbihwb3NpdGlvbikudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQb3NpdGlvbiBFZGl0ZWRcIik7XHJcbiAgICAgICAgICAgICRzY29wZS5jYW5jZWwoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZVBvc2l0aW9uID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcclxuICAgICAgICAgIFlvdXJUZWFtU3ZjLmRlbGV0ZVBvc2l0aW9uKHBvc2l0aW9uKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvc2l0aW9uIERlbGV0ZWRcIik7XHJcbiAgICAgICAgICAgICRzY29wZS5jYW5jZWwoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHR9KVxyXG4gIH1cclxuXHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
