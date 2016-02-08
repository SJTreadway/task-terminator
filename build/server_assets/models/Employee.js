'use strict';

var mongoose = require('mongoose');

//Users are all employees of the company. NOTE: Not all users will actually have login access to the UI.
var employeeSchema = new mongoose.Schema({
  //Employee name information
  identification: {
    name: {
      firstName: { type: String },
      lastName: { type: String },
      fullName: { type: String }
    },
    //Employee's username for Authentication, reports, etc in the UI. Only for employee's who would be starting projects.
    userName: { type: String },
    // slackHandle: {type: String},
    email: { type: String }
  },
  //We need to store some auth info here... will wait to find out exactly what
  // googleId: {}
  //This determines whether an employee has access. True = access to UI.
  permissions: {
    admin: { type: Boolean, default: false }
  },
  company: { type: String, ref: 'Company' },
  positions: [{ type: String, ref: 'Position' }],
  departments: [{ type: String, ref: 'Department' }]
});

//This is for local Auth if we want to use said authentication type.

// employeeSchema.methods.verifyPassword = function(givenPassword) {
// 	var deferred = q.defer();
// 	bcrypt.compare(givenPassword, this.password, function(err, result) {
// 		if (result) {
// 			deferred.resolve(true);
// 		}
// 		else {
// 			deferred.reject(false);
// 		}
// 	});
// 	return deferred.promise;
// };

// employeeSchema.pre('save', function(next) {
// 	var user = this;
// 	bcrypt.genSalt(12, function(err, result) {
// 		bcrypt.hash(user.password, result, function(err, hash) {
// 			user.password = hash;
// 			next();
// 		})
// 	});
// });

module.exports = mongoose.model('Employee', employeeSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvbW9kZWxzL0VtcGxveWVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxXQUFXLFFBQVEsVUFBUixDQUFYOzs7QUFHTixJQUFNLGlCQUFpQixJQUFJLFNBQVMsTUFBVCxDQUFnQjs7QUFFekMsa0JBQWdCO0FBQ2QsVUFBTTtBQUNKLGlCQUFXLEVBQUMsTUFBTSxNQUFOLEVBQVo7QUFDQSxnQkFBVSxFQUFDLE1BQU0sTUFBTixFQUFYO0FBQ0EsZ0JBQVUsRUFBQyxNQUFNLE1BQU4sRUFBWDtLQUhGOztBQU1BLGNBQVUsRUFBQyxNQUFNLE1BQU4sRUFBWDs7QUFFQSxXQUFPLEVBQUMsTUFBTSxNQUFOLEVBQVI7R0FURjs7OztBQWNBLGVBQWE7QUFDWCxXQUFPLEVBQUMsTUFBTSxPQUFOLEVBQWUsU0FBUyxLQUFULEVBQXZCO0dBREY7QUFHQSxXQUFTLEVBQUMsTUFBSyxNQUFMLEVBQWEsS0FBSyxTQUFMLEVBQXZCO0FBQ0EsYUFBVSxDQUFDLEVBQUMsTUFBSyxNQUFMLEVBQWEsS0FBSyxVQUFMLEVBQWYsQ0FBVjtBQUNBLGVBQWEsQ0FBQyxFQUFDLE1BQUssTUFBTCxFQUFhLEtBQUssWUFBTCxFQUFmLENBQWI7Q0FyQnFCLENBQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpRE4sT0FBTyxPQUFQLEdBQWlCLFNBQVMsS0FBVCxDQUFlLFVBQWYsRUFBMkIsY0FBM0IsQ0FBakIiLCJmaWxlIjoic2VydmVyX2Fzc2V0cy9tb2RlbHMvRW1wbG95ZWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XHJcblxyXG4vL1VzZXJzIGFyZSBhbGwgZW1wbG95ZWVzIG9mIHRoZSBjb21wYW55LiBOT1RFOiBOb3QgYWxsIHVzZXJzIHdpbGwgYWN0dWFsbHkgaGF2ZSBsb2dpbiBhY2Nlc3MgdG8gdGhlIFVJLlxyXG5jb25zdCBlbXBsb3llZVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIC8vRW1wbG95ZWUgbmFtZSBpbmZvcm1hdGlvblxyXG4gIGlkZW50aWZpY2F0aW9uOiB7XHJcbiAgICBuYW1lOiB7XHJcbiAgICAgIGZpcnN0TmFtZToge3R5cGU6IFN0cmluZ30sXHJcbiAgICAgIGxhc3ROYW1lOiB7dHlwZTogU3RyaW5nfSxcclxuICAgICAgZnVsbE5hbWU6IHt0eXBlOiBTdHJpbmd9XHJcbiAgICB9LFxyXG4gICAgLy9FbXBsb3llZSdzIHVzZXJuYW1lIGZvciBBdXRoZW50aWNhdGlvbiwgcmVwb3J0cywgZXRjIGluIHRoZSBVSS4gT25seSBmb3IgZW1wbG95ZWUncyB3aG8gd291bGQgYmUgc3RhcnRpbmcgcHJvamVjdHMuXHJcbiAgICB1c2VyTmFtZToge3R5cGU6IFN0cmluZ30sXHJcbiAgICAvLyBzbGFja0hhbmRsZToge3R5cGU6IFN0cmluZ30sXHJcbiAgICBlbWFpbDoge3R5cGU6IFN0cmluZ30sXHJcbiAgICAvL1dlIG5lZWQgdG8gc3RvcmUgc29tZSBhdXRoIGluZm8gaGVyZS4uLiB3aWxsIHdhaXQgdG8gZmluZCBvdXQgZXhhY3RseSB3aGF0XHJcbiAgICAvLyBnb29nbGVJZDoge31cclxuICB9LFxyXG4gIC8vVGhpcyBkZXRlcm1pbmVzIHdoZXRoZXIgYW4gZW1wbG95ZWUgaGFzIGFjY2Vzcy4gVHJ1ZSA9IGFjY2VzcyB0byBVSS5cclxuICBwZXJtaXNzaW9uczoge1xyXG4gICAgYWRtaW46IHt0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZX1cclxuICB9LFxyXG4gIGNvbXBhbnk6IHt0eXBlOlN0cmluZywgcmVmOiAnQ29tcGFueSd9LFxyXG4gIHBvc2l0aW9uczpbe3R5cGU6U3RyaW5nLCByZWY6ICdQb3NpdGlvbid9XSxcclxuICBkZXBhcnRtZW50czogW3t0eXBlOlN0cmluZywgcmVmOiAnRGVwYXJ0bWVudCd9XSxcclxufSk7XHJcblxyXG4vL1RoaXMgaXMgZm9yIGxvY2FsIEF1dGggaWYgd2Ugd2FudCB0byB1c2Ugc2FpZCBhdXRoZW50aWNhdGlvbiB0eXBlLlxyXG5cclxuLy8gZW1wbG95ZWVTY2hlbWEubWV0aG9kcy52ZXJpZnlQYXNzd29yZCA9IGZ1bmN0aW9uKGdpdmVuUGFzc3dvcmQpIHtcclxuLy8gXHR2YXIgZGVmZXJyZWQgPSBxLmRlZmVyKCk7XHJcbi8vIFx0YmNyeXB0LmNvbXBhcmUoZ2l2ZW5QYXNzd29yZCwgdGhpcy5wYXNzd29yZCwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcclxuLy8gXHRcdGlmIChyZXN1bHQpIHtcclxuLy8gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZSh0cnVlKTtcclxuLy8gXHRcdH1cclxuLy8gXHRcdGVsc2Uge1xyXG4vLyBcdFx0XHRkZWZlcnJlZC5yZWplY3QoZmFsc2UpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH0pO1xyXG4vLyBcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4vLyB9O1xyXG5cclxuLy8gZW1wbG95ZWVTY2hlbWEucHJlKCdzYXZlJywgZnVuY3Rpb24obmV4dCkge1xyXG4vLyBcdHZhciB1c2VyID0gdGhpcztcclxuLy8gXHRiY3J5cHQuZ2VuU2FsdCgxMiwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcclxuLy8gXHRcdGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIHJlc3VsdCwgZnVuY3Rpb24oZXJyLCBoYXNoKSB7XHJcbi8vIFx0XHRcdHVzZXIucGFzc3dvcmQgPSBoYXNoO1xyXG4vLyBcdFx0XHRuZXh0KCk7XHJcbi8vIFx0XHR9KVxyXG4vLyBcdH0pO1xyXG4vLyB9KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbW9uZ29vc2UubW9kZWwoJ0VtcGxveWVlJywgZW1wbG95ZWVTY2hlbWEpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
