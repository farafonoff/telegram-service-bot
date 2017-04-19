var cp = require('child_process');
var skype = require('./skype');
var help_string = "/temp /uptime /help /free /df /uname"
function exec_helper(command) {
	return new Promise((resolve, reject) => {
		cp.exec(command, function (err, stdout, stderr) {
			if (err == null) {
				resolve(stdout + '\n\n' + help_string)
			} else {
				console.log(err)
				reject(stderr + '\n\n' + help_string)
			}
		})
	});
}


var commands = {
	help: function (resolve, reject) {
		return Promise.resolve("/temp /uptime /help /free /df /uname");
	},

	temp: function () {
		return exec_helper('sensors');
	},

	uptime: function () {
		return exec_helper('uptime');
	},
	free: function () {
		return exec_helper('free');
	},
	df: function () {
		return exec_helper('df -h');
	},
	uname: function () {
		return exec_helper('uname -a');
	},
	youtube_helper: (vid) => {
		if (vid.indexOf('"') != -1) {
			Promise.reject("Not pawned");
		}
		return exec_helper(`DISPLAY=:0 sudo -u artem vlc --started-from-file "${vid}"`, resolve, reject);
	},
	skype: (args, responder) => {
		skype.start(args[1], args[2], responder);
	}
}

commands.start = commands.help

module.exports = commands

