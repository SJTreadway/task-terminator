const mongoose = require('mongoose');

//Model of tasks tied to active projects. References department, position, and individual
const projectTaskSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type:String},
  status: {
      complete: {type: Boolean, default:false}
  },
  associatedProject : {type:String, ref:'Project'},
  date: {
    created: {type: Date, default: new Date()},
    deadline: {},
  },
  assigment: {
      departments: {type:String, ref: 'Department'},
      positions: {type:String, ref: 'Position'},
      employees: {type:String, ref: 'Employee'}
  }
});

module.exports = mongoose.model('ProjectTask', projectTaskSchema);
