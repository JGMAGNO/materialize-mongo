var LocalStrategy = require('passport-local').Strategy;
var User = require('../persister/user');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport){
	
	passport.use('login', new LocalStrategy({
	    passReqToCallback : true
	  },
	  function(req, username, password, done) { 
	    
	    // check in mongo if a user with username exists or not
	    User.findOne({ 'evaluator_id_number' :  username }, 
	      function(err, user) {
	        // In case of any error, return using the done method
	        if (err)
	          return done(err);
	        // Username does not exist, log error & redirect back
	        if (!user){
	          console.log('User Not Found with username '+username);
	          return done(null, false, req.flash('message', 'User Not found'));                 
	        }

	        // User exists but wrong password, log the error 
	        if (!isValidPassword(user, password)){
	          console.log('Invalid Password');
	          return done(null, false, 
	              req.flash('message', 'Invalid Password'));
	        }
	        // User and password both match, return user from 
	        // done method which will be treated like success
	        return done(null, user);
	      }
	    );
	}));
	
	passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});
	 
	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});
}	



var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}


// Generates hash using bCrypt
var createHash = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
