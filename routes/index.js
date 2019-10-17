var student= require('../persister/student');
var subject = require('../persister/subject');
var teacher = require('../persister/teacher');

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
const path = require('path');
const notifier = require('node-notifier');

mongoose.connect('mongodb://localhost/database_name',{useNewUrlParser: true, useCreateIndex: true});
var db = mongoose.connection;

module.exports = function(app, passport){

	app.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
		notifier.notify({
		  title: 'Information',
		  message: 'This is a success',
		  icon: path.join(__dirname, '../public/images/checked.png'),
		  appID : 'App Name'
		});	  
	});
	
}
