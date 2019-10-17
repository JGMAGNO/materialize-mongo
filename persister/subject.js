var mongoose = require('mongoose');
var subjectModel = function () {

  var subjectSchema = mongoose.Schema({

  // to do code here
  }, {versionKey: false});
 

  return mongoose.model('Subject', subjectSchema);
};

module.exports = new subjectModel();