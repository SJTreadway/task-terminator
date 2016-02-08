'use strict';

var app = angular.module('terminatorApp', ['ui.router', 'ngMaterial', 'ui.bootstrap', 'ngAnimate', 'highcharts-ng']);

app.constant('companyInfo', {
  id: '569533191bfb3ca903f17803'
});

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  // var checkLoggedin = function($q, $http, $location){
  //   // Initialize a new promise
  //   var deferred = $q.defer();
  //   // Make an AJAX call to check if the user is logged in
  //
  //   $http.get('/checklogged').success(function(user){
  //     // Authenticated
  //     if (user !== '0') deferred.resolve();
  //     // Not Authenticated
  //     else {
  //       deferred.reject();
  //       $location.url('/#/login');
  //     }
  //   });
  //
  //   return deferred.promise;
  // };
  //
  // $httpProvider.interceptors.push(function($q, $location) {
  //   return {
  //     response: function(response) {
  //       // do something on success
  //       return response;
  //     },
  //
  //     responseError: function(response) {
  //       if (response.status === 401){
  //         $location.url('/#/login');
  //       }
  //       return $q.reject(response);
  //     }
  //   };
  // });

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/main.html',
    controller: 'DashboardCtrl'
  }).state('dashboard.home', {
    url: '/home',
    controller: 'DashboardCtrl',
    templateUrl: 'templates/home.html'
  }).state('dashboard.view-projects', {
    url: '/projects/view',
    controller: 'ProjectsCtrl',
    templateUrl: 'templates/projects.html'
  }).state('dashboard.activity', {
    url: '/activity',
    controller: 'ActivityCtrl',
    templateUrl: 'templates/activity.html'
  }).state('dashboard.view-employees', {
    url: '/employees/view',
    controller: 'YourTeamCtrl',
    templateUrl: 'templates/yourTeam.html'
  }).state('dashboard.company-details', {
    url: '/company',
    controller: 'YourTeamCtrl',
    templateUrl: 'templates/companyDetails.html'
  })

  // .state('singleProject', {
  //     url: '/singleProject',
  //     templateUrl: 'templates/singleProject.html',
  //     controller: 'DashboardCtrl',
  // })
  // .state('templates', {
  //     url: '/template',
  //     templateUrl: 'templates/projectTemplate.html',
  //     controller: 'TemplatesCtrl',
  // })
  // .state('templateTasks', {
  //   url:'/templateTasks/:id',
  //   // url:'/template/Tasks/:id',
  //   templateUrl: 'templates/templateTasks.html',
  //   controller: 'TemplatesCtrl'
  //   // templateUrl: 'Templates/templateTasks.html',
  //   // controller: 'TemplatesCtrl'
  // })
  // .state('yourteam', {
  //     url: '/yourteam',
  //     templateUrl: 'templates/yourTeam.html',
  //     controller: 'YourTeamCtrl',
  // })

  .state('dashboard.newSingleProject', {
    url: '/project/new/single',
    templateUrl: 'templates/newSingleProject.html',
    controller: 'NewSingleProjectCtrl'
  }).state('dashboard.newRecurringProject', {
    url: '/project/new/recurring',
    templateUrl: 'templates/newRecurringProject.html',
    controller: 'NewRecurringProjectCtrl'
  }).state('dashboard.newTriggeredProject', {
    url: '/project/new/triggered',
    templateUrl: 'templates/newTriggeredProject.html',
    controller: 'NewTriggeredProjectCtrl'
  }).state('dashboard.projectView', {
    url: '/project/:id',
    templateUrl: 'templates/oneProject.html',
    controller: 'OneProjectCtrl',
    resolve: {
      resolveProject: function resolveProject($stateParams, ProjectsSvc) {
        return ProjectsSvc.getOneProject($stateParams.id);
      },
      resolveCompany: function resolveCompany(CompanySvc) {
        return CompanySvc.getOneCompany("569533191bfb3ca903f17803");
      }
    }
  }).state('dashboard.templateView', {
    url: '/template/:id',
    templateUrl: 'templates/oneTemplate.html',
    controller: 'OneTemplateCtrl',
    resolve: {
      resolveTemplate: function resolveTemplate($stateParams, TemplatesSvc) {
        console.log('State Params', $stateParams);
        return TemplatesSvc.getOneTemplate($stateParams.id);
      },
      resolveCompany: function resolveCompany(CompanySvc) {
        return CompanySvc.getOneCompany("569533191bfb3ca903f17803");
      }
    }
  });

  // .state('authed.customer', {
  //   url: '/customers/:id',
  //   templateUrl: 'components/customer/customer.html',
  //   controller: 'customerCtrl',
  //   resolve: {
  //     resolveCustomer: function($stateParams,customerService){
  //       return customerService.getCustomer($stateParams.id);
  //     }
  //   }
  // })

  $urlRouterProvider.otherwise('/dashboard/home');
});
//# sourceMappingURL=data:application/json;base64,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QVgiLCJmaWxlIjoicHVibGljL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgndGVybWluYXRvckFwcCcsIFsndWkucm91dGVyJywgJ25nTWF0ZXJpYWwnLCAndWkuYm9vdHN0cmFwJywgJ25nQW5pbWF0ZScsICdoaWdoY2hhcnRzLW5nJ10pO1xyXG5cclxuYXBwLmNvbnN0YW50KCdjb21wYW55SW5mbycsIHtcclxuICBpZDogJzU2OTUzMzE5MWJmYjNjYTkwM2YxNzgwMydcclxufSlcclxuXHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSB7XHJcblxyXG4gIC8vIHZhciBjaGVja0xvZ2dlZGluID0gZnVuY3Rpb24oJHEsICRodHRwLCAkbG9jYXRpb24pe1xyXG4gIC8vICAgLy8gSW5pdGlhbGl6ZSBhIG5ldyBwcm9taXNlXHJcbiAgLy8gICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gIC8vICAgLy8gTWFrZSBhbiBBSkFYIGNhbGwgdG8gY2hlY2sgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXHJcbiAgLy9cclxuICAvLyAgICRodHRwLmdldCgnL2NoZWNrbG9nZ2VkJykuc3VjY2VzcyhmdW5jdGlvbih1c2VyKXtcclxuICAvLyAgICAgLy8gQXV0aGVudGljYXRlZFxyXG4gIC8vICAgICBpZiAodXNlciAhPT0gJzAnKSBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgLy8gICAgIC8vIE5vdCBBdXRoZW50aWNhdGVkXHJcbiAgLy8gICAgIGVsc2Uge1xyXG4gIC8vICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gIC8vICAgICAgICRsb2NhdGlvbi51cmwoJy8jL2xvZ2luJyk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0pO1xyXG4gIC8vXHJcbiAgLy8gICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAvLyB9O1xyXG4gIC8vXHJcbiAgLy8gJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChmdW5jdGlvbigkcSwgJGxvY2F0aW9uKSB7XHJcbiAgLy8gICByZXR1cm4ge1xyXG4gIC8vICAgICByZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAvLyAgICAgICAvLyBkbyBzb21ldGhpbmcgb24gc3VjY2Vzc1xyXG4gIC8vICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAvLyAgICAgfSxcclxuICAvL1xyXG4gIC8vICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gIC8vICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMSl7XHJcbiAgLy8gICAgICAgICAkbG9jYXRpb24udXJsKCcvIy9sb2dpbicpO1xyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfTtcclxuICAvLyB9KTtcclxuXHJcbiAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgLnN0YXRlKCdkYXNoYm9hcmQnLCB7XHJcbiAgICAgICAgICB1cmw6ICcvZGFzaGJvYXJkJyxcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL21haW4uaHRtbCcsXHJcbiAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkLmhvbWUnLHtcclxuICAgICAgICAgIHVybDonL2hvbWUnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZEN0cmwnLFxyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6J3RlbXBsYXRlcy9ob21lLmh0bWwnLFxyXG4gICAgICB9KVxyXG4gICAgICAuc3RhdGUoJ2Rhc2hib2FyZC52aWV3LXByb2plY3RzJyx7XHJcbiAgICAgICAgICB1cmw6Jy9wcm9qZWN0cy92aWV3JyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9qZWN0c0N0cmwnLFxyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6J3RlbXBsYXRlcy9wcm9qZWN0cy5odG1sJyxcclxuICAgICAgfSlcclxuICAgICAgLnN0YXRlKCdkYXNoYm9hcmQuYWN0aXZpdHknLHtcclxuICAgICAgICAgIHVybDonL2FjdGl2aXR5JyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdBY3Rpdml0eUN0cmwnLFxyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6J3RlbXBsYXRlcy9hY3Rpdml0eS5odG1sJyxcclxuICAgICAgfSlcclxuICAgICAgLnN0YXRlKCdkYXNoYm9hcmQudmlldy1lbXBsb3llZXMnLHtcclxuICAgICAgICAgIHVybDonL2VtcGxveWVlcy92aWV3JyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdZb3VyVGVhbUN0cmwnLFxyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6J3RlbXBsYXRlcy95b3VyVGVhbS5odG1sJyxcclxuICAgICAgfSlcclxuICAgICAgLnN0YXRlKCdkYXNoYm9hcmQuY29tcGFueS1kZXRhaWxzJyx7XHJcbiAgICAgICAgICB1cmw6Jy9jb21wYW55JyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdZb3VyVGVhbUN0cmwnLFxyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6J3RlbXBsYXRlcy9jb21wYW55RGV0YWlscy5odG1sJyxcclxuICAgICAgfSlcclxuXHJcbiAgICAgIC8vIC5zdGF0ZSgnc2luZ2xlUHJvamVjdCcsIHtcclxuICAgICAgLy8gICAgIHVybDogJy9zaW5nbGVQcm9qZWN0JyxcclxuICAgICAgLy8gICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3NpbmdsZVByb2plY3QuaHRtbCcsXHJcbiAgICAgIC8vICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ3RybCcsXHJcbiAgICAgIC8vIH0pXHJcbiAgICAgIC8vIC5zdGF0ZSgndGVtcGxhdGVzJywge1xyXG4gICAgICAvLyAgICAgdXJsOiAnL3RlbXBsYXRlJyxcclxuICAgICAgLy8gICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3Byb2plY3RUZW1wbGF0ZS5odG1sJyxcclxuICAgICAgLy8gICAgIGNvbnRyb2xsZXI6ICdUZW1wbGF0ZXNDdHJsJyxcclxuICAgICAgLy8gfSlcclxuICAgICAgLy8gLnN0YXRlKCd0ZW1wbGF0ZVRhc2tzJywge1xyXG4gICAgICAvLyAgIHVybDonL3RlbXBsYXRlVGFza3MvOmlkJyxcclxuICAgICAgLy8gICAvLyB1cmw6Jy90ZW1wbGF0ZS9UYXNrcy86aWQnLFxyXG4gICAgICAvLyAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RlbXBsYXRlVGFza3MuaHRtbCcsXHJcbiAgICAgIC8vICAgY29udHJvbGxlcjogJ1RlbXBsYXRlc0N0cmwnXHJcbiAgICAgIC8vICAgLy8gdGVtcGxhdGVVcmw6ICdUZW1wbGF0ZXMvdGVtcGxhdGVUYXNrcy5odG1sJyxcclxuICAgICAgLy8gICAvLyBjb250cm9sbGVyOiAnVGVtcGxhdGVzQ3RybCdcclxuICAgICAgLy8gfSlcclxuICAgICAgLy8gLnN0YXRlKCd5b3VydGVhbScsIHtcclxuICAgICAgLy8gICAgIHVybDogJy95b3VydGVhbScsXHJcbiAgICAgIC8vICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy95b3VyVGVhbS5odG1sJyxcclxuICAgICAgLy8gICAgIGNvbnRyb2xsZXI6ICdZb3VyVGVhbUN0cmwnLFxyXG4gICAgICAvLyB9KVxyXG5cclxuICAgICAgLnN0YXRlKCdkYXNoYm9hcmQubmV3U2luZ2xlUHJvamVjdCcgLCB7XHJcbiAgICAgICAgdXJsOiAnL3Byb2plY3QvbmV3L3NpbmdsZScsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbmV3U2luZ2xlUHJvamVjdC5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiAnTmV3U2luZ2xlUHJvamVjdEN0cmwnXHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkLm5ld1JlY3VycmluZ1Byb2plY3QnLCB7XHJcbiAgICAgICAgdXJsOiAnL3Byb2plY3QvbmV3L3JlY3VycmluZycsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbmV3UmVjdXJyaW5nUHJvamVjdC5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiAnTmV3UmVjdXJyaW5nUHJvamVjdEN0cmwnXHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkLm5ld1RyaWdnZXJlZFByb2plY3QnLCB7XHJcbiAgICAgICAgdXJsOicvcHJvamVjdC9uZXcvdHJpZ2dlcmVkJyxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9uZXdUcmlnZ2VyZWRQcm9qZWN0Lmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdUcmlnZ2VyZWRQcm9qZWN0Q3RybCdcclxuICAgICAgfSlcclxuICAgICAgLnN0YXRlKCdkYXNoYm9hcmQucHJvamVjdFZpZXcnLCB7XHJcbiAgICAgICAgdXJsOicvcHJvamVjdC86aWQnLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL29uZVByb2plY3QuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlciA6ICdPbmVQcm9qZWN0Q3RybCcsXHJcbiAgICAgICAgcmVzb2x2ZSA6IHtcclxuICAgICAgICAgIHJlc29sdmVQcm9qZWN0OiBmdW5jdGlvbigkc3RhdGVQYXJhbXMsUHJvamVjdHNTdmMpe1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvamVjdHNTdmMuZ2V0T25lUHJvamVjdCgkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlc29sdmVDb21wYW55OiBmdW5jdGlvbihDb21wYW55U3ZjKXtcclxuICAgICAgICAgICAgcmV0dXJuIENvbXBhbnlTdmMuZ2V0T25lQ29tcGFueShcIjU2OTUzMzE5MWJmYjNjYTkwM2YxNzgwM1wiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkLnRlbXBsYXRlVmlldycsIHtcclxuICAgICAgICB1cmw6Jy90ZW1wbGF0ZS86aWQnLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL29uZVRlbXBsYXRlLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdPbmVUZW1wbGF0ZUN0cmwnLFxyXG4gICAgICAgIHJlc29sdmUgOiB7XHJcbiAgICAgICAgICByZXNvbHZlVGVtcGxhdGU6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcyxUZW1wbGF0ZXNTdmMpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdGF0ZSBQYXJhbXMnLCAkc3RhdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gVGVtcGxhdGVzU3ZjLmdldE9uZVRlbXBsYXRlKCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVzb2x2ZUNvbXBhbnk6IGZ1bmN0aW9uKENvbXBhbnlTdmMpe1xyXG4gICAgICAgICAgICByZXR1cm4gQ29tcGFueVN2Yy5nZXRPbmVDb21wYW55KFwiNTY5NTMzMTkxYmZiM2NhOTAzZjE3ODAzXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgLy8gLnN0YXRlKCdhdXRoZWQuY3VzdG9tZXInLCB7XHJcbiAgICAgIC8vICAgdXJsOiAnL2N1c3RvbWVycy86aWQnLFxyXG4gICAgICAvLyAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9jdXN0b21lci9jdXN0b21lci5odG1sJyxcclxuICAgICAgLy8gICBjb250cm9sbGVyOiAnY3VzdG9tZXJDdHJsJyxcclxuICAgICAgLy8gICByZXNvbHZlOiB7XHJcbiAgICAgIC8vICAgICByZXNvbHZlQ3VzdG9tZXI6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcyxjdXN0b21lclNlcnZpY2Upe1xyXG4gICAgICAvLyAgICAgICByZXR1cm4gY3VzdG9tZXJTZXJ2aWNlLmdldEN1c3RvbWVyKCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgIC8vICAgICB9XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KVxyXG5cclxuICAkdXJsUm91dGVyUHJvdmlkZXJcclxuICAgICAgLm90aGVyd2lzZSgnL2Rhc2hib2FyZC9ob21lJyk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
