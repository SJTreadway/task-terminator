'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const secret = require("./secret");
// const bcrypt = require('bcrypt-nodejs');

var app = express();
var port = process.env.PORT || 8000;

require('./server_assets/cron/test').start();

//********** CONTROLLERS **********
var companyCtrl = require('./server_assets/controllers/companyCtrl.js');
var departmentCtrl = require('./server_assets/controllers/departmentCtrl.js');
var employeeCtrl = require('./server_assets/controllers/employeeCtrl.js');
var positionCtrl = require('./server_assets/controllers/positionCtrl.js');
var projectCtrl = require('./server_assets/controllers/projectCtrl.js');
var projectTaskCtrl = require('./server_assets/controllers/projectTaskCtrl.js');
var templateCtrl = require('./server_assets/controllers/templateCtrl.js');
var templateTaskCtrl = require('./server_assets/controllers/templateTaskCtrl.js');
var slackCtrl = require('./server_assets/controllers/slackCtrl.js');
var testTimeCtrl = require('./server_assets/controllers/testTimeCtrl.js');

mongoose.Promise = require('q').Promise;

//----------Middleware------------//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.listen(port, function () {
  console.log("Listening on port: " + port);
});

//********** COMPANY ENDPOINTS **********
app.post('/api/company', companyCtrl.newCompany);
app.get('/api/company', companyCtrl.allCompanies);
app.get('/api/company/:id', companyCtrl.getOneCompany);

//********** DEPARTMENT ENDPOINTS **********
app.get('/api/department/:id', departmentCtrl.oneDepartment);
app.put('/api/department/:id', departmentCtrl.editDepartment);
app.delete('/api/department/:id', departmentCtrl.deleteDepartment);
app.post('/api/department/:companyid', departmentCtrl.newDepartment);

app.get('/api/department', departmentCtrl.allDepartments);

//********** EMPLOYEE ENDPOINTS **********
app.get('/api/employee/:id', employeeCtrl.oneEmployee);
app.put('/api/employee/:id', employeeCtrl.editEmployee);
app.delete('/api/employee/:id', employeeCtrl.deleteEmployee);
app.post('/api/:companyid/:departmentid/:positionid/employee', employeeCtrl.newEmployee);
app.get('/api/:companyid/employee', employeeCtrl.allEmployees);

//********** POSITION ENDPOINTS **********
app.get('/api/position/:id', positionCtrl.onePosition);
app.put('/api/position/:id', positionCtrl.editPosition);
app.delete('/api/position/:id', positionCtrl.deletePosition);
app.post('/api/position/:companyid/:departmentid', positionCtrl.newPosition);
app.get('/api/position', positionCtrl.allPositions);

//********** PROJECT ENDPOINTS **********
app.get('/api/project/:id', projectCtrl.oneProject);
app.put('/api/project/:id', projectCtrl.editProject);
app.delete('/api/project/:id', projectCtrl.deleteProject);
app.post('/api/project/:templateid', projectCtrl.endpointProject);
app.get('/api/project', projectCtrl.allProjects);

//********** PROJECT TASK ENDPOINTS **********
app.get('/api/tasks/project/:id', projectTaskCtrl.getTasks);
app.post('/api/tasks/project/:projectid', projectTaskCtrl.addTask);
app.put('/api/tasks/project/:projectid', projectTaskCtrl.editTask);
// * app.get('/api/tasks/department/:id', projectTaskCtrl.getDepartmentTask);

//********** TEMPLATE ENDPOINTS **********
app.get('/api/template/:id', templateCtrl.oneTemplate);
app.put('/api/template/:id', templateCtrl.editTemplate);
app.delete('/api/template/:id', templateCtrl.deleteTemplate);
app.post('/api/template', templateCtrl.newTemplate);
app.get('/api/template', templateCtrl.allTemplates);

//********** TEMPLATE TASK ENDPOINTS **********
app.get('/api/tasks/template', templateTaskCtrl.getAllTasks);
app.post('/api/:templateid/tasks', templateTaskCtrl.addTask);
app.get('/api/tasks/template/:id', templateTaskCtrl.getTasks);

//********** TIME ENDPOINTS **********
app.get('/api/time', testTimeCtrl.testTime);

//********** SINGLE PROJECT ENDPOINTS **********
app.post('/api/singleproject', projectCtrl.newSingleProject);

//********** TRIGGERED PROJECT ENDPOINTS **********
app.post('/api/triggeredproject/:templateid', projectCtrl.newTriggeredProject);

//-----------Connection to database-----------//
mongoose.connect('mongodb://taskterminator:devmountain@ds039175.mongolab.com:39175/taskterminator');
//const connection =  mongoose.connect('mongodb://localhost/terminator');
mongoose.connection.once('connected', function () {
  console.log('connected to db');
});

//-----------Passport Facebook Authentication-----------//
app.use(session({
  secret: "s0m3th1n",
  resave: false,
  saveUninitialized: false
}));
// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.use(new FacebookStrategy({
//     clientID: secret.fb.clientID,
//     clientSecret: secret.fb.clientSecret,
//     callbackURL: "http://localhost:"+port+"/api/auth/callback",
//     profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
//     },  function(accessToken, refreshToken, profile, done) {
//   	    	process.nextTick(function(){
//   	    		User.findOne({'facebook.id': profile.id}, function(err, user){
//   	    			if(err)
//   	    				return done(err);
//   	    			if(user)
//   	    				return done(null, user);
//   	    			else {
//   	    				var newUser = new User();
//   	    				newUser.facebook.id = profile.id;
//   	    				newUser.facebook.token = accessToken;
//   	    				newUser.facebook.name = profile._json.first_name + " " + profile._json.last_name;
//                 newUser.facebook.email = profile._json.email;
//
//   	    				newUser.save(function(err){
//   	    					if(err)
//   	    						throw err;
//   	    					return done(null, newUser);
//   	    				})
//   	    				console.log(user);
//   	    			}
//   	    		});
//   	    	});
//   	    }
//
// ));

//-----------Passport Local Authentication-----------//

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//
//       return done(null, user);
//     });
//   }
// ));

//---------------------------------------------------//

// var requireAuth = function(req, res, next) {
//   if (!req.isAuthenticated()) {
//     res.redirect('/#/login');
//   }
//   else { next(); }
// };

// app.get("/api/auth/", passport.authenticate("facebook"));
// app.get("/api/auth/callback", passport.authenticate("facebook", {
//     successRedirect: "/#/user/dashboard",
//     failureRedirect: "/#/login"
// }));
//
// passport.serializeUser(function(user, done){
//     done(null, user);
// });
// passport.deserializeUser(function(obj, done){
//     done(null, obj);
// });
//
// app.get("/me", requireAuth, function(req, res){
//     res.json(req.user);
// });
//
// app.get("/checklogged", function(req, res){
//     res.send(req.isAuthenticated() ? req.user : '0');
// });
//
// app.get('/logout',function(req, res) {
//   req.logout();
//   res.redirect('/#/login');
// })
//# sourceMappingURL=data:application/json;base64,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QUosQ0FBUyxvQkFBVCxFQUErQixZQUFZLGdCQUFaLENBQS9COzs7QUFHQSxJQUFJLElBQUosQ0FBUyxtQ0FBVCxFQUE4QyxZQUFZLG1CQUFaLENBQTlDOzs7QUFHQSxTQUFTLE9BQVQsQ0FBaUIsaUZBQWpCOztBQUVBLFNBQVMsVUFBVCxDQUFvQixJQUFwQixDQUF5QixXQUF6QixFQUFzQyxZQUFXO0FBQy9DLFVBQVEsR0FBUixDQUFZLGlCQUFaLEVBRCtDO0NBQVgsQ0FBdEM7OztBQUtBLElBQUksR0FBSixDQUFRLFFBQVE7QUFDWixVQUFRLFVBQVI7QUFDQSxVQUFRLEtBQVI7QUFDQSxxQkFBbUIsS0FBbkI7Q0FISSxDQUFSIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xyXG5jb25zdCBjb3JzID0gcmVxdWlyZSgnY29ycycpO1xyXG5jb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XHJcbmNvbnN0IHNlc3Npb24gPSByZXF1aXJlKCdleHByZXNzLXNlc3Npb24nKTtcclxuY29uc3QgcGFzc3BvcnQgPSByZXF1aXJlKCdwYXNzcG9ydCcpO1xyXG4vLyBjb25zdCBGYWNlYm9va1N0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtZmFjZWJvb2snKS5TdHJhdGVneTtcclxuLy8gY29uc3Qgc2VjcmV0ID0gcmVxdWlyZShcIi4vc2VjcmV0XCIpO1xyXG4vLyBjb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQtbm9kZWpzJyk7XHJcblxyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XHJcbmNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDgwMDA7XHJcblxyXG4gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2Nyb24vdGVzdCcpLnN0YXJ0KCk7XHJcblxyXG5cclxuLy8qKioqKioqKioqIENPTlRST0xMRVJTICoqKioqKioqKipcclxuY29uc3QgY29tcGFueUN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvY29tcGFueUN0cmwuanMnKTtcclxuY29uc3QgZGVwYXJ0bWVudEN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvZGVwYXJ0bWVudEN0cmwuanMnKTtcclxuY29uc3QgZW1wbG95ZWVDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL2VtcGxveWVlQ3RybC5qcycpO1xyXG5jb25zdCBwb3NpdGlvbkN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvcG9zaXRpb25DdHJsLmpzJyk7XHJcbmNvbnN0IHByb2plY3RDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3Byb2plY3RDdHJsLmpzJyk7XHJcbmNvbnN0IHByb2plY3RUYXNrQ3RybCA9IHJlcXVpcmUoJy4vc2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy9wcm9qZWN0VGFza0N0cmwuanMnKTtcclxuY29uc3QgdGVtcGxhdGVDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3RlbXBsYXRlQ3RybC5qcycpO1xyXG5jb25zdCB0ZW1wbGF0ZVRhc2tDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3RlbXBsYXRlVGFza0N0cmwuanMnKTtcclxuY29uc3Qgc2xhY2tDdHJsID0gcmVxdWlyZSgnLi9zZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3NsYWNrQ3RybC5qcycpO1xyXG5jb25zdCB0ZXN0VGltZUN0cmwgPSByZXF1aXJlKCcuL3NlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvdGVzdFRpbWVDdHJsLmpzJyk7XHJcblxyXG5tb25nb29zZS5Qcm9taXNlID0gcmVxdWlyZSgncScpLlByb21pc2U7XHJcblxyXG4vLy0tLS0tLS0tLS1NaWRkbGV3YXJlLS0tLS0tLS0tLS0tLy9cclxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoe2V4dGVuZGVkOmZhbHNlfSkpO1xyXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcclxuYXBwLnVzZShjb3JzKCkpO1xyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKF9fZGlybmFtZSsnL3B1YmxpYycpKTtcclxuYXBwLmxpc3Rlbihwb3J0LCBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2coXCJMaXN0ZW5pbmcgb24gcG9ydDogXCIgKyBwb3J0KTtcclxufSk7XHJcblxyXG4vLyoqKioqKioqKiogQ09NUEFOWSBFTkRQT0lOVFMgKioqKioqKioqKlxyXG5hcHAucG9zdCgnL2FwaS9jb21wYW55JywgY29tcGFueUN0cmwubmV3Q29tcGFueSk7XHJcbmFwcC5nZXQoJy9hcGkvY29tcGFueScsIGNvbXBhbnlDdHJsLmFsbENvbXBhbmllcyk7XHJcbmFwcC5nZXQoJy9hcGkvY29tcGFueS86aWQnLCBjb21wYW55Q3RybC5nZXRPbmVDb21wYW55KTtcclxuXHJcbi8vKioqKioqKioqKiBERVBBUlRNRU5UIEVORFBPSU5UUyAqKioqKioqKioqXHJcbmFwcC5nZXQoJy9hcGkvZGVwYXJ0bWVudC86aWQnLCBkZXBhcnRtZW50Q3RybC5vbmVEZXBhcnRtZW50KTtcclxuYXBwLnB1dCgnL2FwaS9kZXBhcnRtZW50LzppZCcsIGRlcGFydG1lbnRDdHJsLmVkaXREZXBhcnRtZW50KTtcclxuYXBwLmRlbGV0ZSgnL2FwaS9kZXBhcnRtZW50LzppZCcsIGRlcGFydG1lbnRDdHJsLmRlbGV0ZURlcGFydG1lbnQpO1xyXG5hcHAucG9zdCgnL2FwaS9kZXBhcnRtZW50Lzpjb21wYW55aWQnLCBkZXBhcnRtZW50Q3RybC5uZXdEZXBhcnRtZW50KTtcclxuXHJcbmFwcC5nZXQoJy9hcGkvZGVwYXJ0bWVudCcsIGRlcGFydG1lbnRDdHJsLmFsbERlcGFydG1lbnRzKTtcclxuXHJcblxyXG4vLyoqKioqKioqKiogRU1QTE9ZRUUgRU5EUE9JTlRTICoqKioqKioqKipcclxuYXBwLmdldCgnL2FwaS9lbXBsb3llZS86aWQnLCBlbXBsb3llZUN0cmwub25lRW1wbG95ZWUpO1xyXG5hcHAucHV0KCcvYXBpL2VtcGxveWVlLzppZCcsIGVtcGxveWVlQ3RybC5lZGl0RW1wbG95ZWUpO1xyXG5hcHAuZGVsZXRlKCcvYXBpL2VtcGxveWVlLzppZCcsIGVtcGxveWVlQ3RybC5kZWxldGVFbXBsb3llZSk7XHJcbmFwcC5wb3N0KCcvYXBpLzpjb21wYW55aWQvOmRlcGFydG1lbnRpZC86cG9zaXRpb25pZC9lbXBsb3llZScsIGVtcGxveWVlQ3RybC5uZXdFbXBsb3llZSk7XHJcbmFwcC5nZXQoJy9hcGkvOmNvbXBhbnlpZC9lbXBsb3llZScsIGVtcGxveWVlQ3RybC5hbGxFbXBsb3llZXMpO1xyXG5cclxuXHJcbi8vKioqKioqKioqKiBQT1NJVElPTiBFTkRQT0lOVFMgKioqKioqKioqKlxyXG5hcHAuZ2V0KCcvYXBpL3Bvc2l0aW9uLzppZCcsIHBvc2l0aW9uQ3RybC5vbmVQb3NpdGlvbik7XHJcbmFwcC5wdXQoJy9hcGkvcG9zaXRpb24vOmlkJywgcG9zaXRpb25DdHJsLmVkaXRQb3NpdGlvbik7XHJcbmFwcC5kZWxldGUoJy9hcGkvcG9zaXRpb24vOmlkJywgcG9zaXRpb25DdHJsLmRlbGV0ZVBvc2l0aW9uKTtcclxuYXBwLnBvc3QoJy9hcGkvcG9zaXRpb24vOmNvbXBhbnlpZC86ZGVwYXJ0bWVudGlkJywgcG9zaXRpb25DdHJsLm5ld1Bvc2l0aW9uKTtcclxuYXBwLmdldCgnL2FwaS9wb3NpdGlvbicsIHBvc2l0aW9uQ3RybC5hbGxQb3NpdGlvbnMpO1xyXG5cclxuLy8qKioqKioqKioqIFBST0pFQ1QgRU5EUE9JTlRTICoqKioqKioqKipcclxuYXBwLmdldCgnL2FwaS9wcm9qZWN0LzppZCcsIHByb2plY3RDdHJsLm9uZVByb2plY3QpO1xyXG5hcHAucHV0KCcvYXBpL3Byb2plY3QvOmlkJywgcHJvamVjdEN0cmwuZWRpdFByb2plY3QpO1xyXG5hcHAuZGVsZXRlKCcvYXBpL3Byb2plY3QvOmlkJywgcHJvamVjdEN0cmwuZGVsZXRlUHJvamVjdCk7XHJcbmFwcC5wb3N0KCcvYXBpL3Byb2plY3QvOnRlbXBsYXRlaWQnLCBwcm9qZWN0Q3RybC5lbmRwb2ludFByb2plY3QpO1xyXG5hcHAuZ2V0KCcvYXBpL3Byb2plY3QnLCBwcm9qZWN0Q3RybC5hbGxQcm9qZWN0cyk7XHJcblxyXG4vLyoqKioqKioqKiogUFJPSkVDVCBUQVNLIEVORFBPSU5UUyAqKioqKioqKioqXHJcbmFwcC5nZXQoJy9hcGkvdGFza3MvcHJvamVjdC86aWQnLCBwcm9qZWN0VGFza0N0cmwuZ2V0VGFza3MpO1xyXG5hcHAucG9zdCgnL2FwaS90YXNrcy9wcm9qZWN0Lzpwcm9qZWN0aWQnLCBwcm9qZWN0VGFza0N0cmwuYWRkVGFzayk7XHJcbmFwcC5wdXQoJy9hcGkvdGFza3MvcHJvamVjdC86cHJvamVjdGlkJywgcHJvamVjdFRhc2tDdHJsLmVkaXRUYXNrKTtcclxuLy8gKiBhcHAuZ2V0KCcvYXBpL3Rhc2tzL2RlcGFydG1lbnQvOmlkJywgcHJvamVjdFRhc2tDdHJsLmdldERlcGFydG1lbnRUYXNrKTtcclxuXHJcbi8vKioqKioqKioqKiBURU1QTEFURSBFTkRQT0lOVFMgKioqKioqKioqKlxyXG5hcHAuZ2V0KCcvYXBpL3RlbXBsYXRlLzppZCcsIHRlbXBsYXRlQ3RybC5vbmVUZW1wbGF0ZSk7XHJcbmFwcC5wdXQoJy9hcGkvdGVtcGxhdGUvOmlkJywgdGVtcGxhdGVDdHJsLmVkaXRUZW1wbGF0ZSk7XHJcbmFwcC5kZWxldGUoJy9hcGkvdGVtcGxhdGUvOmlkJywgdGVtcGxhdGVDdHJsLmRlbGV0ZVRlbXBsYXRlKTtcclxuYXBwLnBvc3QoJy9hcGkvdGVtcGxhdGUnLCB0ZW1wbGF0ZUN0cmwubmV3VGVtcGxhdGUpO1xyXG5hcHAuZ2V0KCcvYXBpL3RlbXBsYXRlJywgdGVtcGxhdGVDdHJsLmFsbFRlbXBsYXRlcyk7XHJcblxyXG4vLyoqKioqKioqKiogVEVNUExBVEUgVEFTSyBFTkRQT0lOVFMgKioqKioqKioqKlxyXG5hcHAuZ2V0KCcvYXBpL3Rhc2tzL3RlbXBsYXRlJywgdGVtcGxhdGVUYXNrQ3RybC5nZXRBbGxUYXNrcyk7XHJcbmFwcC5wb3N0KCcvYXBpLzp0ZW1wbGF0ZWlkL3Rhc2tzJywgdGVtcGxhdGVUYXNrQ3RybC5hZGRUYXNrKTtcclxuYXBwLmdldCgnL2FwaS90YXNrcy90ZW1wbGF0ZS86aWQnLCB0ZW1wbGF0ZVRhc2tDdHJsLmdldFRhc2tzKTtcclxuXHJcbi8vKioqKioqKioqKiBUSU1FIEVORFBPSU5UUyAqKioqKioqKioqXHJcbmFwcC5nZXQoJy9hcGkvdGltZScsIHRlc3RUaW1lQ3RybC50ZXN0VGltZSk7XHJcblxyXG4vLyoqKioqKioqKiogU0lOR0xFIFBST0pFQ1QgRU5EUE9JTlRTICoqKioqKioqKipcclxuYXBwLnBvc3QoJy9hcGkvc2luZ2xlcHJvamVjdCcsIHByb2plY3RDdHJsLm5ld1NpbmdsZVByb2plY3QpO1xyXG5cclxuLy8qKioqKioqKioqIFRSSUdHRVJFRCBQUk9KRUNUIEVORFBPSU5UUyAqKioqKioqKioqXHJcbmFwcC5wb3N0KCcvYXBpL3RyaWdnZXJlZHByb2plY3QvOnRlbXBsYXRlaWQnLCBwcm9qZWN0Q3RybC5uZXdUcmlnZ2VyZWRQcm9qZWN0KTtcclxuXHJcbi8vLS0tLS0tLS0tLS1Db25uZWN0aW9uIHRvIGRhdGFiYXNlLS0tLS0tLS0tLS0vL1xyXG5tb25nb29zZS5jb25uZWN0KCdtb25nb2RiOi8vdGFza3Rlcm1pbmF0b3I6ZGV2bW91bnRhaW5AZHMwMzkxNzUubW9uZ29sYWIuY29tOjM5MTc1L3Rhc2t0ZXJtaW5hdG9yJyk7XHJcbi8vY29uc3QgY29ubmVjdGlvbiA9ICBtb25nb29zZS5jb25uZWN0KCdtb25nb2RiOi8vbG9jYWxob3N0L3Rlcm1pbmF0b3InKTtcclxubW9uZ29vc2UuY29ubmVjdGlvbi5vbmNlKCdjb25uZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGVkIHRvIGRiJyk7XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLVBhc3Nwb3J0IEZhY2Vib29rIEF1dGhlbnRpY2F0aW9uLS0tLS0tLS0tLS0vL1xyXG5hcHAudXNlKHNlc3Npb24oe1xyXG4gICAgc2VjcmV0OiBcInMwbTN0aDFuXCIsXHJcbiAgICByZXNhdmU6IGZhbHNlLFxyXG4gICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG59KSk7XHJcbi8vIGFwcC51c2UocGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcclxuLy8gYXBwLnVzZShwYXNzcG9ydC5zZXNzaW9uKCkpO1xyXG4vL1xyXG4vLyBwYXNzcG9ydC51c2UobmV3IEZhY2Vib29rU3RyYXRlZ3koe1xyXG4vLyAgICAgY2xpZW50SUQ6IHNlY3JldC5mYi5jbGllbnRJRCxcclxuLy8gICAgIGNsaWVudFNlY3JldDogc2VjcmV0LmZiLmNsaWVudFNlY3JldCxcclxuLy8gICAgIGNhbGxiYWNrVVJMOiBcImh0dHA6Ly9sb2NhbGhvc3Q6XCIrcG9ydCtcIi9hcGkvYXV0aC9jYWxsYmFja1wiLFxyXG4vLyAgICAgcHJvZmlsZUZpZWxkczogWydpZCcsICdlbWFpbCcsICdnZW5kZXInLCAnbGluaycsICdsb2NhbGUnLCAnbmFtZScsICd0aW1lem9uZScsICd1cGRhdGVkX3RpbWUnLCAndmVyaWZpZWQnXVxyXG4vLyAgICAgfSwgIGZ1bmN0aW9uKGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4sIHByb2ZpbGUsIGRvbmUpIHtcclxuLy8gICBcdCAgICBcdHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKXtcclxuLy8gICBcdCAgICBcdFx0VXNlci5maW5kT25lKHsnZmFjZWJvb2suaWQnOiBwcm9maWxlLmlkfSwgZnVuY3Rpb24oZXJyLCB1c2VyKXtcclxuLy8gICBcdCAgICBcdFx0XHRpZihlcnIpXHJcbi8vICAgXHQgICAgXHRcdFx0XHRyZXR1cm4gZG9uZShlcnIpO1xyXG4vLyAgIFx0ICAgIFx0XHRcdGlmKHVzZXIpXHJcbi8vICAgXHQgICAgXHRcdFx0XHRyZXR1cm4gZG9uZShudWxsLCB1c2VyKTtcclxuLy8gICBcdCAgICBcdFx0XHRlbHNlIHtcclxuLy8gICBcdCAgICBcdFx0XHRcdHZhciBuZXdVc2VyID0gbmV3IFVzZXIoKTtcclxuLy8gICBcdCAgICBcdFx0XHRcdG5ld1VzZXIuZmFjZWJvb2suaWQgPSBwcm9maWxlLmlkO1xyXG4vLyAgIFx0ICAgIFx0XHRcdFx0bmV3VXNlci5mYWNlYm9vay50b2tlbiA9IGFjY2Vzc1Rva2VuO1xyXG4vLyAgIFx0ICAgIFx0XHRcdFx0bmV3VXNlci5mYWNlYm9vay5uYW1lID0gcHJvZmlsZS5fanNvbi5maXJzdF9uYW1lICsgXCIgXCIgKyBwcm9maWxlLl9qc29uLmxhc3RfbmFtZTtcclxuLy8gICAgICAgICAgICAgICAgIG5ld1VzZXIuZmFjZWJvb2suZW1haWwgPSBwcm9maWxlLl9qc29uLmVtYWlsO1xyXG4vL1xyXG4vLyAgIFx0ICAgIFx0XHRcdFx0bmV3VXNlci5zYXZlKGZ1bmN0aW9uKGVycil7XHJcbi8vICAgXHQgICAgXHRcdFx0XHRcdGlmKGVycilcclxuLy8gICBcdCAgICBcdFx0XHRcdFx0XHR0aHJvdyBlcnI7XHJcbi8vICAgXHQgICAgXHRcdFx0XHRcdHJldHVybiBkb25lKG51bGwsIG5ld1VzZXIpO1xyXG4vLyAgIFx0ICAgIFx0XHRcdFx0fSlcclxuLy8gICBcdCAgICBcdFx0XHRcdGNvbnNvbGUubG9nKHVzZXIpO1xyXG4vLyAgIFx0ICAgIFx0XHRcdH1cclxuLy8gICBcdCAgICBcdFx0fSk7XHJcbi8vICAgXHQgICAgXHR9KTtcclxuLy8gICBcdCAgICB9XHJcbi8vXHJcbi8vICkpO1xyXG5cclxuLy8tLS0tLS0tLS0tLVBhc3Nwb3J0IExvY2FsIEF1dGhlbnRpY2F0aW9uLS0tLS0tLS0tLS0vL1xyXG5cclxuLy8gcGFzc3BvcnQudXNlKG5ldyBMb2NhbFN0cmF0ZWd5KFxyXG4vLyAgIGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkge1xyXG4vLyAgICAgVXNlci5maW5kT25lKHsgdXNlcm5hbWU6IHVzZXJuYW1lIH0sIGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcclxuLy8gICAgICAgaWYgKGVycikge1xyXG4vLyAgICAgICAgIHJldHVybiBkb25lKGVycik7XHJcbi8vICAgICAgIH1cclxuLy8gICAgICAgaWYgKCF1c2VyKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICAgIGlmICghdXNlci52ZXJpZnlQYXNzd29yZChwYXNzd29yZCkpIHtcclxuLy8gICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSk7XHJcbi8vICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlcik7XHJcbi8vICAgICB9KTtcclxuLy8gICB9XHJcbi8vICkpO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG5cclxuLy8gdmFyIHJlcXVpcmVBdXRoID0gZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcclxuLy8gICBpZiAoIXJlcS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG4vLyAgICAgcmVzLnJlZGlyZWN0KCcvIy9sb2dpbicpO1xyXG4vLyAgIH1cclxuLy8gICBlbHNlIHsgbmV4dCgpOyB9XHJcbi8vIH07XHJcblxyXG4vLyBhcHAuZ2V0KFwiL2FwaS9hdXRoL1wiLCBwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJmYWNlYm9va1wiKSk7XHJcbi8vIGFwcC5nZXQoXCIvYXBpL2F1dGgvY2FsbGJhY2tcIiwgcGFzc3BvcnQuYXV0aGVudGljYXRlKFwiZmFjZWJvb2tcIiwge1xyXG4vLyAgICAgc3VjY2Vzc1JlZGlyZWN0OiBcIi8jL3VzZXIvZGFzaGJvYXJkXCIsXHJcbi8vICAgICBmYWlsdXJlUmVkaXJlY3Q6IFwiLyMvbG9naW5cIlxyXG4vLyB9KSk7XHJcbi8vXHJcbi8vIHBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoZnVuY3Rpb24odXNlciwgZG9uZSl7XHJcbi8vICAgICBkb25lKG51bGwsIHVzZXIpO1xyXG4vLyB9KTtcclxuLy8gcGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGZ1bmN0aW9uKG9iaiwgZG9uZSl7XHJcbi8vICAgICBkb25lKG51bGwsIG9iaik7XHJcbi8vIH0pO1xyXG4vL1xyXG4vLyBhcHAuZ2V0KFwiL21lXCIsIHJlcXVpcmVBdXRoLCBmdW5jdGlvbihyZXEsIHJlcyl7XHJcbi8vICAgICByZXMuanNvbihyZXEudXNlcik7XHJcbi8vIH0pO1xyXG4vL1xyXG4vLyBhcHAuZ2V0KFwiL2NoZWNrbG9nZ2VkXCIsIGZ1bmN0aW9uKHJlcSwgcmVzKXtcclxuLy8gICAgIHJlcy5zZW5kKHJlcS5pc0F1dGhlbnRpY2F0ZWQoKSA/IHJlcS51c2VyIDogJzAnKTtcclxuLy8gfSk7XHJcbi8vXHJcbi8vIGFwcC5nZXQoJy9sb2dvdXQnLGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbi8vICAgcmVxLmxvZ291dCgpO1xyXG4vLyAgIHJlcy5yZWRpcmVjdCgnLyMvbG9naW4nKTtcclxuLy8gfSlcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
