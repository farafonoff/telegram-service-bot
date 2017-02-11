var cp = require('child_process')
var help_string = "/temp /uptime /help /free /df /uname"
function exec_helper(command, resolve, reject) {
	cp.exec(command, function (err, stdout, stderr) { 
		if (err==null) {
			resolve(stdout+'\n\n'+help_string)
		} else {
			console.log(err)
			reject(stderr+'\n\n'+help_string)
		}
	})
}


var commands = {
	help: 	function(resolve, reject) {
		resolve("/temp /uptime /help /free /df /uname")
	},

	temp: 	function(resolve, reject) {
		exec_helper('sensors', resolve, reject);
	}, 

	uptime: function(resolve, reject) {
		exec_helper('uptime', resolve, reject);
	}, 
	free:   function(resolve, reject) {
		exec_helper('free', resolve, reject);
	}, 
	df: 	function(resolve, reject) {
		exec_helper('df -h', resolve, reject);
	}, 
	uname: 	function(resolve, reject) {
		exec_helper('uname -a', resolve, reject);
	},
	youtube_helper: (vid)=>function(resolve, reject) {
		if (vid.indexOf('"')!=-1) {
			reject("Not pawned");
			return;
		}
	  exec_helper(`DISPLAY=:0 sudo -u artem vlc --started-from-file "${vid}"`, resolve, reject);
	}
}

commands.start = commands.help

module.exports = commands

