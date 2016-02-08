'use strict';

angular.module('terminatorApp').controller('ActivityCtrl', function ($scope) {

    ///////////////////////////////////////////////////////////
    //  Highcharts Stuff
    ///////////////////////////////////////////////////////////

    $scope.projectsPerWeek = {
        options: {
            colors: ['#50B432'],
            chart: {
                type: 'bar',
                enableMouseTracking: true,
                plotShadow: true
            },
            legend: {
                backgroundColor: '#FCFFC5'
            }
        },

        xAxis: {
            title: {
                text: "Weeks"
            },
            categories: ['1/4', '1/11', "1/18", "1/25", "2/1", "2/8", "2/15", "2/22", "2/29", "3/7", "3/14", "3/21"]
        },
        yAxis: {
            title: {
                text: 'Completed Projects'
            }
        },
        series: [{
            name: 'Actual',
            data: [5, 7, 3.5, 6, 2, 9, 4, 5, 3, 5, 1, 6]
        }],
        title: {
            text: 'Projects Completed This Week'
        },
        loading: false
    };

    $scope.projectsPerMonth = {
        options: {
            colors: ['#50B432'],
            chart: {
                type: 'line',
                enableMouseTracking: true
            }
        },
        xAxis: {
            title: {
                text: "Months"
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
            data: [20, 25, 30, 28, 21, 31, 25, 27, 30, 29, 27, 24]
        }],
        title: {
            text: 'Projects Completed Per Month'
        },
        loading: false
    };

    $scope.tasksPerWeek = {
        options: {
            colors: ['#50B432'],
            chart: {
                type: 'bar',
                enableMouseTracking: true,
                plotShadow: true
            },
            legend: {
                backgroundColor: '#FCFFC5'
            }
        },

        xAxis: {
            title: {
                text: "Weeks"
            },
            categories: ['1/4', '1/11', "1/18", "1/25", "2/1", "2/8", "2/15", "2/22", "2/29", "3/7", "3/14", "3/21"]
        },
        yAxis: {
            title: {
                text: 'Completed Projects'
            }
        },
        series: [{
            name: 'Actual',
            data: [5, 7, 3.5, 6, 2, 9, 4, 5, 3, 5, 1, 6]
        }],
        title: {
            text: 'Tasks Completed Per Week'
        },
        loading: false
    };

    $scope.tasksPerMonth = {
        options: {
            chart: {
                type: 'line',
                enableMouseTracking: true
            }
        },
        xAxis: {
            title: {
                text: "Months"
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
            data: [23, 22, 30, 35, 28, 32, 37, 24, 35, 25, 26, 22]
        }],
        title: {
            text: 'Tasks Completed Per Month'
        },
        loading: false
    };

    $scope.overdueTasksPerWeek = {
        options: {
            colors: ['#50B432'],
            chart: {
                type: 'bar',
                enableMouseTracking: true,
                plotShadow: true
            },
            legend: {
                backgroundColor: '#FCFFC5'
            }
        },

        xAxis: {
            title: {
                text: "Weeks"
            },
            categories: ['1/4', '1/11', "1/18", "1/25", "2/1", "2/8", "2/15", "2/22", "2/29", "3/7", "3/14", "3/21"]
        },
        yAxis: {
            title: {
                text: 'Completed Projects'
            }
        },
        series: [{
            name: 'Actual',
            data: [5, 7, 3.5, 6, 2, 9, 4, 5, 3, 5, 1, 6]
        }],
        title: {
            text: 'Overdue Tasks This Week'
        },
        loading: false
    };

    $scope.overdueTasksPerMonth = {
        options: {
            chart: {
                type: 'line',
                enableMouseTracking: true
            }
        },
        xAxis: {
            title: {
                text: "Months"
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
            data: [28, 25, 26, 32, 25, 29, 37, 32, 31, 33, 26, 30]
        }],
        title: {
            text: 'Overdue Tasks Per Month'
        },
        loading: false
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9jb250cm9sbGVycy9BY3Rpdml0eUN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxRQUFRLE1BQVIsQ0FBZSxlQUFmLEVBQWdDLFVBQWhDLENBQTJDLGNBQTNDLEVBQTJELFVBQVMsTUFBVCxFQUFpQjs7Ozs7O0FBTTFFLFdBQU8sZUFBUCxHQUF5QjtBQUN2QixpQkFBUztBQUNQLG9CQUFRLENBQUMsU0FBRCxDQUFSO0FBQ0UsbUJBQU87QUFDSCxzQkFBTSxLQUFOO0FBQ0EscUNBQXFCLElBQXJCO0FBQ0EsNEJBQVksSUFBWjthQUhKO0FBS0Esb0JBQVE7QUFDSixpQ0FBaUIsU0FBakI7YUFESjtTQVBKOztBQVlBLGVBQU87QUFDSCxtQkFBTztBQUNMLHNCQUFNLE9BQU47YUFERjtBQUdBLHdCQUFZLENBQUMsS0FBRCxFQUFPLE1BQVAsRUFBYyxNQUFkLEVBQXFCLE1BQXJCLEVBQTRCLEtBQTVCLEVBQWtDLEtBQWxDLEVBQXdDLE1BQXhDLEVBQStDLE1BQS9DLEVBQXNELE1BQXRELEVBQTZELEtBQTdELEVBQW1FLE1BQW5FLEVBQTBFLE1BQTFFLENBQVo7U0FKSjtBQU1BLGVBQU87QUFDSCxtQkFBTztBQUNILHNCQUFNLG9CQUFOO2FBREo7U0FESjtBQUtBLGdCQUFRLENBQUM7QUFDTCxrQkFBTSxRQUFOO0FBQ0Esa0JBQU0sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLEdBQVAsRUFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQixDQUEzQixFQUE4QixDQUE5QixFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQyxDQUFOO1NBRkksQ0FBUjtBQUlBLGVBQU87QUFDSCxrQkFBTSw4QkFBTjtTQURKO0FBR0EsaUJBQVMsS0FBVDtLQS9CRixDQU4wRTs7QUF3QzFFLFdBQU8sZ0JBQVAsR0FBMEI7QUFDdEIsaUJBQVM7QUFDUCxvQkFBUSxDQUFDLFNBQUQsQ0FBUjtBQUNFLG1C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cUMsS0FBckMsRUFBMkMsS0FBM0MsRUFBaUQsTUFBakQsRUFBd0QsS0FBeEQsRUFBOEQsS0FBOUQsRUFBb0UsS0FBcEUsQ0FBWjtTQUpKO0FBTUEsZUFBTztBQUNILG1CQUFPO0FBQ0gsc0JBQU0sU0FBTjthQURKO1NBREo7QUFLQSxnQkFBUSxDQUFDO0FBQ0wsa0JBQU0sUUFBTjtBQUNBLGtCQUFNLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxFQUFqQyxFQUFxQyxFQUFyQyxFQUF5QyxFQUF6QyxFQUE2QyxFQUE3QyxDQUFOO1NBRkksQ0FBUjtBQUlBLGVBQU87QUFDSCxrQkFBTSx5QkFBTjtTQURKO0FBR0EsaUJBQVMsS0FBVDtLQXpCSixDQXJLMEU7Q0FBakIsQ0FBM0QiLCJmaWxlIjoicHVibGljL2NvbnRyb2xsZXJzL0FjdGl2aXR5Q3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0ZXJtaW5hdG9yQXBwJykuY29udHJvbGxlcignQWN0aXZpdHlDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLy8gIEhpZ2hjaGFydHMgU3R1ZmZcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAkc2NvcGUucHJvamVjdHNQZXJXZWVrID0ge1xyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICBjb2xvcnM6IFsnIzUwQjQzMiddLFxyXG4gICAgICAgIGNoYXJ0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdiYXInLFxyXG4gICAgICAgICAgICBlbmFibGVNb3VzZVRyYWNraW5nOiB0cnVlLFxyXG4gICAgICAgICAgICBwbG90U2hhZG93OiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0ZDRkZDNSdcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICB4QXhpczoge1xyXG4gICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICB0ZXh0OiBcIldlZWtzXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYXRlZ29yaWVzOiBbJzEvNCcsJzEvMTEnLFwiMS8xOFwiLFwiMS8yNVwiLFwiMi8xXCIsXCIyLzhcIixcIjIvMTVcIixcIjIvMjJcIixcIjIvMjlcIixcIjMvN1wiLFwiMy8xNFwiLFwiMy8yMVwiXVxyXG4gICAgfSxcclxuICAgIHlBeGlzOiB7XHJcbiAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgdGV4dDogJ0NvbXBsZXRlZCBQcm9qZWN0cydcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VyaWVzOiBbe1xyXG4gICAgICAgIG5hbWU6ICdBY3R1YWwnLFxyXG4gICAgICAgIGRhdGE6IFs1LCA3LCAzLjUsIDYsIDIsIDksIDQsIDUsIDMsIDUsIDEsIDZdXHJcbiAgICB9XSxcclxuICAgIHRpdGxlOiB7XHJcbiAgICAgICAgdGV4dDogJ1Byb2plY3RzIENvbXBsZXRlZCBUaGlzIFdlZWsnXHJcbiAgICB9LFxyXG4gICAgbG9hZGluZzogZmFsc2VcclxuICB9O1xyXG5cclxuICAkc2NvcGUucHJvamVjdHNQZXJNb250aCA9IHtcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIGNvbG9yczogWycjNTBCNDMyJ10sXHJcbiAgICAgICAgICBjaGFydDoge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcclxuICAgICAgICAgICAgICBlbmFibGVNb3VzZVRyYWNraW5nOiB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIk1vbnRoc1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNhdGVnb3JpZXM6IFsnSmFuJywnRmViJyxcIk1hclwiLFwiQXByXCIsXCJNYXlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcHRcIixcIk9jdFwiLFwiTm92XCIsXCJEZWNcIl1cclxuICAgICAgfSxcclxuICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ0RvbGxhcnMnXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHNlcmllczogW3tcclxuICAgICAgICAgIG5hbWU6ICdBY3R1YWwnLFxyXG4gICAgICAgICAgZGF0YTogWzIwLCAyNSwgMzAsIDI4LCAyMSwgMzEsIDI1LCAyNywgMzAsIDI5LCAyNywgMjRdXHJcbiAgICAgIH1dLFxyXG4gICAgICB0aXRsZToge1xyXG4gICAgICAgICAgdGV4dDogJ1Byb2plY3RzIENvbXBsZXRlZCBQZXIgTW9udGgnXHJcbiAgICAgIH0sXHJcbiAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLnRhc2tzUGVyV2VlayA9IHtcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICBjb2xvcnM6IFsnIzUwQjQzMiddLFxyXG4gICAgICAgICAgICBjaGFydDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2JhcicsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVNb3VzZVRyYWNraW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcGxvdFNoYWRvdzogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGQ0ZGQzUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgICB0ZXh0OiBcIldlZWtzXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhdGVnb3JpZXM6IFsnMS80JywnMS8xMScsXCIxLzE4XCIsXCIxLzI1XCIsXCIyLzFcIixcIjIvOFwiLFwiMi8xNVwiLFwiMi8yMlwiLFwiMi8yOVwiLFwiMy83XCIsXCIzLzE0XCIsXCIzLzIxXCJdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ0NvbXBsZXRlZCBQcm9qZWN0cydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VyaWVzOiBbe1xyXG4gICAgICAgICAgICBuYW1lOiAnQWN0dWFsJyxcclxuICAgICAgICAgICAgZGF0YTogWzUsIDcsIDMuNSwgNiwgMiwgOSwgNCwgNSwgMywgNSwgMSwgNl1cclxuICAgICAgICB9XSxcclxuICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICB0ZXh0OiAnVGFza3MgQ29tcGxldGVkIFBlciBXZWVrJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICB9O1xyXG5cclxuICAkc2NvcGUudGFza3NQZXJNb250aCA9IHtcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgY2hhcnQ6IHtcclxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXHJcbiAgICAgICAgICAgICAgZW5hYmxlTW91c2VUcmFja2luZzogdHJ1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB4QXhpczoge1xyXG4gICAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgdGV4dDogXCJNb250aHNcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjYXRlZ29yaWVzOiBbJ0phbicsJ0ZlYicsXCJNYXJcIixcIkFwclwiLFwiTWF5XCIsXCJKdW5cIixcIkp1bFwiLFwiQXVnXCIsXCJTZXB0XCIsXCJPY3RcIixcIk5vdlwiLFwiRGVjXCJdXHJcbiAgICAgIH0sXHJcbiAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdEb2xsYXJzJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBzZXJpZXM6IFt7XHJcbiAgICAgICAgICBuYW1lOiAnQWN0dWFsJyxcclxuICAgICAgICAgIGRhdGE6IFsyMywgMjIsIDMwLCAzNSwgMjgsIDMyLCAzNywgMjQsIDM1LCAyNSwgMjYsIDIyXVxyXG4gICAgICB9XSxcclxuICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgIHRleHQ6ICdUYXNrcyBDb21wbGV0ZWQgUGVyIE1vbnRoJ1xyXG4gICAgICB9LFxyXG4gICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gICRzY29wZS5vdmVyZHVlVGFza3NQZXJXZWVrID0ge1xyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgIGNvbG9yczogWycjNTBCNDMyJ10sXHJcbiAgICAgICAgICAgIGNoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmFyJyxcclxuICAgICAgICAgICAgICAgIGVuYWJsZU1vdXNlVHJhY2tpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBwbG90U2hhZG93OiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxlZ2VuZDoge1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0ZDRkZDNSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICAgIHRleHQ6IFwiV2Vla3NcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2F0ZWdvcmllczogWycxLzQnLCcxLzExJyxcIjEvMThcIixcIjEvMjVcIixcIjIvMVwiLFwiMi84XCIsXCIyLzE1XCIsXCIyLzIyXCIsXCIyLzI5XCIsXCIzLzdcIixcIjMvMTRcIixcIjMvMjFcIl1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ29tcGxldGVkIFByb2plY3RzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXJpZXM6IFt7XHJcbiAgICAgICAgICAgIG5hbWU6ICdBY3R1YWwnLFxyXG4gICAgICAgICAgICBkYXRhOiBbNSwgNywgMy41LCA2LCAyLCA5LCA0LCA1LCAzLCA1LCAxLCA2XVxyXG4gICAgICAgIH1dLFxyXG4gICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdPdmVyZHVlIFRhc2tzIFRoaXMgV2VlaydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLm92ZXJkdWVUYXNrc1Blck1vbnRoID0ge1xyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICBjaGFydDoge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcclxuICAgICAgICAgICAgICBlbmFibGVNb3VzZVRyYWNraW5nOiB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIk1vbnRoc1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNhdGVnb3JpZXM6IFsnSmFuJywnRmViJyxcIk1hclwiLFwiQXByXCIsXCJNYXlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcHRcIixcIk9jdFwiLFwiTm92XCIsXCJEZWNcIl1cclxuICAgICAgfSxcclxuICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ0RvbGxhcnMnXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHNlcmllczogW3tcclxuICAgICAgICAgIG5hbWU6ICdBY3R1YWwnLFxyXG4gICAgICAgICAgZGF0YTogWzI4LCAyNSwgMjYsIDMyLCAyNSwgMjksIDM3LCAzMiwgMzEsIDMzLCAyNiwgMzBdXHJcbiAgICAgIH1dLFxyXG4gICAgICB0aXRsZToge1xyXG4gICAgICAgICAgdGV4dDogJ092ZXJkdWUgVGFza3MgUGVyIE1vbnRoJ1xyXG4gICAgICB9LFxyXG4gICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gIH07XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
