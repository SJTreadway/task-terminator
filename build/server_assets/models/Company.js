'use strict';

var mongoose = require("mongoose");
var allowedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  //Availability indicates days and hours of operations for the company. This will affect the timeline of deadlines, etc.
  availability: {
    days: [{ type: String, enum: allowedDays, required: true }],
    hourOpen: { type: Number },
    hourClosed: { type: Number }
  },
  location: {
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  //The below three reference to the specific departments, positions, and employees within the company.
  departments: [{ type: String, ref: 'Department' }],
  positions: [{ type: String, ref: 'Position' }],
  employees: [{ type: String, ref: 'Employee' }]

});

//We may not need to record slack information. Let's wait to see once we can toy around with the bot.
//Company-related slack information for tying the slack bot commands to the company's slack domain.
// slack: {
//   team_id: {type:String},
//   team_domain: {type:String},
//   channels: [
//     {
//       channel_id: {type:String},
//       channel_name: {type :String}
//     }
//   ]
// }
module.exports = mongoose.model('Company', companySchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvbW9kZWxzL0NvbXBhbnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFdBQVcsUUFBUSxVQUFSLENBQVg7QUFDTixJQUFNLGNBQWMsQ0FBQyxRQUFELEVBQVUsUUFBVixFQUFtQixTQUFuQixFQUE2QixXQUE3QixFQUF5QyxVQUF6QyxFQUFvRCxRQUFwRCxFQUE2RCxVQUE3RCxDQUFkOztBQUdOLElBQU0sZ0JBQWdCLElBQUksU0FBUyxNQUFULENBQWdCO0FBQ3hDLFFBQU0sRUFBQyxNQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBcEI7O0FBRUEsZ0JBQWM7QUFDWixVQUFNLENBQUMsRUFBQyxNQUFNLE1BQU4sRUFBYyxNQUFNLFdBQU4sRUFBbUIsVUFBVSxJQUFWLEVBQW5DLENBQU47QUFDQSxjQUFVLEVBQUMsTUFBTSxNQUFOLEVBQVg7QUFDQSxnQkFBWSxFQUFDLE1BQU0sTUFBTixFQUFiO0dBSEY7QUFLQSxZQUFVO0FBQ1IsbUJBQWUsRUFBQyxNQUFLLE1BQUwsRUFBaEI7QUFDQSxVQUFNLEVBQUMsTUFBTSxNQUFOLEVBQVA7QUFDQSxXQUFPLEVBQUMsTUFBTSxNQUFOLEVBQVI7QUFDQSxTQUFLLEVBQUMsTUFBTSxNQUFOLEVBQU47R0FKRjs7QUFPQSxlQUFhLENBQUMsRUFBQyxNQUFNLE1BQU4sRUFBYyxLQUFLLFlBQUwsRUFBaEIsQ0FBYjtBQUNBLGFBQVcsQ0FBQyxFQUFDLE1BQU0sTUFBTixFQUFjLEtBQUssVUFBTCxFQUFoQixDQUFYO0FBQ0EsYUFBWSxDQUFDLEVBQUMsTUFBTSxNQUFOLEVBQWMsS0FBSyxVQUFMLEVBQWhCLENBQVo7O0NBakJvQixDQUFoQjs7Ozs7Ozs7Ozs7Ozs7QUFpQ04sT0FBTyxPQUFQLEdBQWlCLFNBQVMsS0FBVCxDQUFlLFNBQWYsRUFBMEIsYUFBMUIsQ0FBakIiLCJmaWxlIjoic2VydmVyX2Fzc2V0cy9tb2RlbHMvQ29tcGFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xyXG5jb25zdCBhbGxvd2VkRGF5cyA9IFsnU3VuZGF5JywnTW9uZGF5JywnVHVlc2RheScsJ1dlZG5lc2RheScsJ1RodXJzZGF5JywnRnJpZGF5JywnU2F0dXJkYXknXTtcclxuXHJcblxyXG5jb25zdCBjb21wYW55U2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgbmFtZToge3R5cGU6U3RyaW5nLCByZXF1aXJlZDp0cnVlfSxcclxuICAvL0F2YWlsYWJpbGl0eSBpbmRpY2F0ZXMgZGF5cyBhbmQgaG91cnMgb2Ygb3BlcmF0aW9ucyBmb3IgdGhlIGNvbXBhbnkuIFRoaXMgd2lsbCBhZmZlY3QgdGhlIHRpbWVsaW5lIG9mIGRlYWRsaW5lcywgZXRjLlxyXG4gIGF2YWlsYWJpbGl0eToge1xyXG4gICAgZGF5czogW3t0eXBlOiBTdHJpbmcsIGVudW06IGFsbG93ZWREYXlzLCByZXF1aXJlZDogdHJ1ZX1dLFxyXG4gICAgaG91ck9wZW46IHt0eXBlOiBOdW1iZXJ9LFxyXG4gICAgaG91ckNsb3NlZDoge3R5cGU6IE51bWJlcn1cclxuICB9LFxyXG4gIGxvY2F0aW9uOiB7XHJcbiAgICBzdHJlZXRBZGRyZXNzOiB7dHlwZTpTdHJpbmd9LFxyXG4gICAgY2l0eToge3R5cGU6IFN0cmluZ30sXHJcbiAgICBzdGF0ZToge3R5cGU6IFN0cmluZ30sXHJcbiAgICB6aXA6IHt0eXBlOiBTdHJpbmd9XHJcbiAgfSxcclxuICAvL1RoZSBiZWxvdyB0aHJlZSByZWZlcmVuY2UgdG8gdGhlIHNwZWNpZmljIGRlcGFydG1lbnRzLCBwb3NpdGlvbnMsIGFuZCBlbXBsb3llZXMgd2l0aGluIHRoZSBjb21wYW55LlxyXG4gIGRlcGFydG1lbnRzOiBbe3R5cGU6IFN0cmluZywgcmVmOiAnRGVwYXJ0bWVudCd9XSxcclxuICBwb3NpdGlvbnM6IFt7dHlwZTogU3RyaW5nLCByZWY6ICdQb3NpdGlvbid9XSxcclxuICBlbXBsb3llZXMgOiBbe3R5cGU6IFN0cmluZywgcmVmOiAnRW1wbG95ZWUnfV0sXHJcblxyXG4gIC8vV2UgbWF5IG5vdCBuZWVkIHRvIHJlY29yZCBzbGFjayBpbmZvcm1hdGlvbi4gTGV0J3Mgd2FpdCB0byBzZWUgb25jZSB3ZSBjYW4gdG95IGFyb3VuZCB3aXRoIHRoZSBib3QuXHJcbiAgLy9Db21wYW55LXJlbGF0ZWQgc2xhY2sgaW5mb3JtYXRpb24gZm9yIHR5aW5nIHRoZSBzbGFjayBib3QgY29tbWFuZHMgdG8gdGhlIGNvbXBhbnkncyBzbGFjayBkb21haW4uXHJcbiAgLy8gc2xhY2s6IHtcclxuICAvLyAgIHRlYW1faWQ6IHt0eXBlOlN0cmluZ30sXHJcbiAgLy8gICB0ZWFtX2RvbWFpbjoge3R5cGU6U3RyaW5nfSxcclxuICAvLyAgIGNoYW5uZWxzOiBbXHJcbiAgLy8gICAgIHtcclxuICAvLyAgICAgICBjaGFubmVsX2lkOiB7dHlwZTpTdHJpbmd9LFxyXG4gIC8vICAgICAgIGNoYW5uZWxfbmFtZToge3R5cGUgOlN0cmluZ31cclxuICAvLyAgICAgfVxyXG4gIC8vICAgXVxyXG4gIC8vIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vbmdvb3NlLm1vZGVsKCdDb21wYW55JywgY29tcGFueVNjaGVtYSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
