var mongoose = require('mongoose');
var teacherModel = function () {

  var teacherSchema = mongoose.Schema({

  // to do code here
  }, {versionKey: false});
 

  return mongoose.model('Teacher', teacherSchema);
};

module.exports = new teacherModel();