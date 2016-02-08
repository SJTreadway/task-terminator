'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

var templateTaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  associatedTemplate: { type: String, ref: 'Template' },
  date: {
    created: { type: Date, default: moment() },
    deadline: { type: Date }
  },
  assignment: {
    departments: { type: String, ref: 'Department' },
    positions: { type: String, ref: 'Position' },
    employees: { type: String, ref: 'Employee' }
  },
  status: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' }
});

module.exports = mongoose.model('TemplateTask', templateTaskSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvbW9kZWxzL1RlbXBsYXRlVGFzay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sV0FBVyxRQUFRLFVBQVIsQ0FBWDtBQUNOLElBQU0sU0FBUyxRQUFRLFFBQVIsQ0FBVDs7QUFFTixJQUFNLHFCQUFxQixJQUFJLFNBQVMsTUFBVCxDQUFnQjtBQUM3QyxRQUFNLEVBQUMsTUFBTSxNQUFOLEVBQWMsVUFBVSxJQUFWLEVBQXJCO0FBQ0EsZUFBYSxFQUFDLE1BQU0sTUFBTixFQUFkO0FBQ0Esc0JBQW9CLEVBQUMsTUFBSyxNQUFMLEVBQWEsS0FBSSxVQUFKLEVBQWxDO0FBQ0EsUUFBTTtBQUNKLGFBQVMsRUFBQyxNQUFNLElBQU4sRUFBWSxTQUFTLFFBQVQsRUFBdEI7QUFDQSxjQUFVLEVBQUMsTUFBTSxJQUFOLEVBQVg7R0FGRjtBQUlBLGNBQVk7QUFDUixpQkFBYSxFQUFDLE1BQUssTUFBTCxFQUFhLEtBQUssWUFBTCxFQUEzQjtBQUNBLGVBQVcsRUFBQyxNQUFLLE1BQUwsRUFBYSxLQUFLLFVBQUwsRUFBekI7QUFDQSxlQUFXLEVBQUMsTUFBSyxNQUFMLEVBQWEsS0FBSyxVQUFMLEVBQXpCO0dBSEo7QUFLQSxVQUFTLEVBQUMsTUFBTSxNQUFOLEVBQWMsTUFBTSxDQUFDLFlBQUQsRUFBZSxVQUFmLENBQU4sRUFBa0MsU0FBUyxZQUFULEVBQTFEO0NBYnlCLENBQXJCOztBQWdCTixPQUFPLE9BQVAsR0FBaUIsU0FBUyxLQUFULENBQWUsY0FBZixFQUErQixrQkFBL0IsQ0FBakIiLCJmaWxlIjoic2VydmVyX2Fzc2V0cy9tb2RlbHMvVGVtcGxhdGVUYXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG5jb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcclxuXHJcbmNvbnN0IHRlbXBsYXRlVGFza1NjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIG5hbWU6IHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcclxuICBkZXNjcmlwdGlvbjoge3R5cGU6IFN0cmluZ30sXHJcbiAgYXNzb2NpYXRlZFRlbXBsYXRlOiB7dHlwZTpTdHJpbmcsIHJlZjonVGVtcGxhdGUnfSxcclxuICBkYXRlOiB7XHJcbiAgICBjcmVhdGVkOiB7dHlwZTogRGF0ZSwgZGVmYXVsdDogbW9tZW50KCl9LFxyXG4gICAgZGVhZGxpbmU6IHt0eXBlOiBEYXRlfVxyXG4gIH0sXHJcbiAgYXNzaWdubWVudDoge1xyXG4gICAgICBkZXBhcnRtZW50czoge3R5cGU6U3RyaW5nLCByZWY6ICdEZXBhcnRtZW50J30sXHJcbiAgICAgIHBvc2l0aW9uczoge3R5cGU6U3RyaW5nLCByZWY6ICdQb3NpdGlvbid9LFxyXG4gICAgICBlbXBsb3llZXM6IHt0eXBlOlN0cmluZywgcmVmOiAnRW1wbG95ZWUnfVxyXG4gIH0sXHJcbiAgc3RhdHVzIDoge3R5cGU6IFN0cmluZywgZW51bTogWydJbmNvbXBsZXRlJywgJ0NvbXBsZXRlJ10sIGRlZmF1bHQ6ICdJbmNvbXBsZXRlJ31cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vbmdvb3NlLm1vZGVsKCdUZW1wbGF0ZVRhc2snLCB0ZW1wbGF0ZVRhc2tTY2hlbWEpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
