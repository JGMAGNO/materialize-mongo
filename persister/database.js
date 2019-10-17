var mongoose = require('mongoose');
var backup = require('mongodb-backup');

// @ TODO remove for production level.
//mongoose.set('debug', true);
// Supports mlab account
// Supports backup

var db = function() {

  var initFlag = false;

  var mongodbHost = 'ds1120995.mlab.com';
  var mongodbPort = '43099';
  var authenticate = 'admin:password@';
  var mongodbDatabase = 'sample';

  var localhost = 'localhost:27017';
  var dbase_name = 'database_name';

  return {

    config: function(addr, dbname, opts, callback) {
      if( !initFlag ){  

        var connectUrl = 'mongodb://' + (addr ? addr : localhost) + '/' + (dbname ? dbname : dbase_name);
        var cloudUrl =  'mongodb://' + authenticate + mongodbHost + ':' + mongodbPort + '/' + mongodbDatabase;

        // SUPPORT FOR LOCAL BACKUP OF DATABASE

        // __dirname = 'C:/Users/Desktop/b'

        // backup({ uri: cloudUrl, root: __dirname,
        //   callback: function(err) { 
        //     if (err) {
        //      console.error(err);
        //     } else {
        //         console.log('Daily Backup...... Done'); 
        //       }
        //   } 
        // });

        mongoose.connect(connectUrl, (opts ? opts : {useNewUrlParser: true}));
        // CHANGE 'connectUrl' to 'cloudUrl' to make database online.
        //mongoose.createConnection(connectUrl, (opts ? opts : {}));

        var db = mongoose.connection;

        db.on('error', function(err) {

          if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
              console.log(new Date(), String(err));

              // Wait for a bit, then try to connect again
              setTimeout(function () {
                  console.log("Retrying first connect...");
                  db.openUri(connectUrl).catch(() => {});
                  // Why the empty catch?
                  // Well, errors thrown by db.open() will also be passed to .on('error'),
                  // so we can handle them there, no need to log anything in the catch here.
                  // But we still need this empty catch to avoid unhandled rejections.
              }, 20 * 1000);
          } else {
              // Some other error occurred.  Log it.
              console.error(new Date(), String(err));
          }


          // Connection Error
          console.log('Mongodb error encountered [' + err + ']');

          if (callback) {
            callback('ERR-MONGODB', 'mongodb - '+err.message);
          }
        });

        db.once('open', function() {
          initFlag = true;
          if (callback) callback(null);
        });
      } else {
        if (callback) callback(null);
      }
    }
  };
};

module.exports = db();