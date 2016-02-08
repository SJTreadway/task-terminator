'use strict';

var mongoose = require("mongoose");

// Position/role employees have at the company.
var positionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employees: [{ type: String, ref: 'Employee' }],
  department: { type: String, ref: 'Department' },
  company: { type: String, ref: 'Company' }
});

module.exports = mongoose.model('Position', positionSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvbW9kZWxzL1Bvc2l0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxXQUFXLFFBQVEsVUFBUixDQUFYOzs7QUFHTixJQUFNLGlCQUFpQixJQUFJLFNBQVMsTUFBVCxDQUFnQjtBQUN6QyxRQUFNLEVBQUMsTUFBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQXBCO0FBQ0EsYUFBVyxDQUNMLEVBQUMsTUFBSyxNQUFMLEVBQWEsS0FBSSxVQUFKLEVBRFQsQ0FBWDtBQUdBLGNBQVksRUFBQyxNQUFLLE1BQUwsRUFBYSxLQUFLLFlBQUwsRUFBMUI7QUFDQSxXQUFTLEVBQUMsTUFBSyxNQUFMLEVBQWEsS0FBSyxTQUFMLEVBQXZCO0NBTnFCLENBQWpCOztBQVNOLE9BQU8sT0FBUCxHQUFpQixTQUFTLEtBQVQsQ0FBZSxVQUFmLEVBQTJCLGNBQTNCLENBQWpCIiwiZmlsZSI6InNlcnZlcl9hc3NldHMvbW9kZWxzL1Bvc2l0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XHJcblxyXG4vLyBQb3NpdGlvbi9yb2xlIGVtcGxveWVlcyBoYXZlIGF0IHRoZSBjb21wYW55LlxyXG5jb25zdCBwb3NpdGlvblNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIG5hbWU6IHt0eXBlOlN0cmluZywgcmVxdWlyZWQ6dHJ1ZX0sXHJcbiAgZW1wbG95ZWVzOiBbXHJcbiAgICAgICAge3R5cGU6U3RyaW5nLCByZWY6J0VtcGxveWVlJ31cclxuICAgICAgXSxcclxuICBkZXBhcnRtZW50OiB7dHlwZTpTdHJpbmcsIHJlZjogJ0RlcGFydG1lbnQnfSxcclxuICBjb21wYW55OiB7dHlwZTpTdHJpbmcsIHJlZjogJ0NvbXBhbnknfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbW9uZ29vc2UubW9kZWwoJ1Bvc2l0aW9uJywgcG9zaXRpb25TY2hlbWEpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
