//ABRS - Automated Backup and Restoration System (ABRS)
module.exports = {
  loadBackupArray: function () {
    //Declare backup array
    global.backup_array = fs.readdirSync("./backups/");
    global.backup_loaded = false;

    //Sort backup array in chronological order
    backup_array.sort(function(a, b) {
    	return fs.statSync("./backups/" + a).mtime.getTime() - fs.statSync("./backups/" + b).mtime.getTime();
    });

    //Reverse backup array to sort by most recent first
    backup_array = backup_array.reverse();

    //Print to console
    log.info(`Backup Array: ${backup_array.join(", ")}`);
  },

  loadMostRecentSave: function () {
  	//Declare local instance variables
    var rawdata = fs.readFileSync('database.js');

  	if (rawdata.toString().length != 0) {
  		global.main = JSON.parse(rawdata);
  	} else {
  		for (var i = 0; i < backup_array.length; i++) {
  			if (!backup_loaded) {
  				var current_backup = fs.readFileSync("./backups/" + backup_array[i]);

  				if (current_backup.toString().length != 0) {
  					var is_valid_json;

  					try {
  						JSON.parse(current_backup);
  						is_valid_json = true;
  					} catch (error) {
  						is_valid_json = false;
  					}

            //Load backup if a backup is detected as valid JSON
  					if (is_valid_json) {
              var file_string = backup_array[i];
              global.backup_loaded = true;

              //Overwrite database.js with new backup file
  						log.info("Going through backup file '" + backup_array[i] + "' ...");
  						fs.copyFile("./backups/" + backup_array[i], "database.js", (err) => {
                if (err) throw err;
              });

  						setTimeout(function(){
  							rawdata = fs.readFileSync('database.js');
  							global.main = JSON.parse(rawdata);

                //Initialise global if main is not defined
                if (!main)
                  initGlobal();
  						}, 1000);
  					}
  				}
  			}
  		}
  	}
  },

  returnABRSDateString: function () {
    //Declare local instance Variables
    var d = new Date();
    var hour_prefix = (d.getHours() < 10) ? "0" : "",
      minute_prefix = (d.getMinutes() < 10) ? "0" : "",
      second_prefix = (d.getSeconds() < 10) ? "0" : "";

    //Return statement - template string
    return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} ${hour_prefix}${d.getHours()}.${minute_prefix}${d.getMinutes()}.${second_prefix}${d.getSeconds()}`;
  },

  writeSave: function (arg0_options) {
    //Convert from parameters
    var options = arg0_options;
    var file_limit = (options.file_limit) ? options.file_limit : 0;

    //Declare local instance variables
		var file_path = `./backups/${returnABRSDateString()}.txt`;

    //Write to file if JSON is not undefined
		if (JSON.stringify(main).length != 0) {
			var create_backup = fs.createWriteStream(`./backups/${returnABRSDateString()}.txt`);
			create_backup.end();

			fs.writeFile(file_path, JSON.stringify(main), function (err, data) {
				if (err) return log.error(err);
			});
		} else {
			loadMostRecentSave();
		}

    //Make sure amount of files in ./backups/ complies with current file limit
    if (file_limit != 0) {
      loadBackupArray();
      var total_backups = backup_array;

      //Delete oldest file from backup_array if limit is exceeded
      if (total_backups.length > file_limit) try {
        log.info(`Deleted ${total_backups[total_backups.length-1]} as it exceeded the set limit of ${file_limit} simultaneous backups.`);
        fs.unlinkSync(`./backups/${total_backups[total_backups.length-1]}`);
      } catch {}
    }

    //Reload backup array
    loadBackupArray();
	}
};
