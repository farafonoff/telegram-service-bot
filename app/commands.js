var cp = require('child_process')
var help_string = "/temp /uptime /help /free /df /uname"
function exec_helper(command, resolve, reject) {
	cp.exec(command, function (err, stdout, stderr) { 
		if (err==null) {
			resolve(stdout+'\n\n'+help_string)
		} else {
			console.log(error)
			reject(stderr+'\n\n'+help_string)
		}
	})
}
var commands = {
	help: new Promise(function(resolve, reject) {
		resolve("/temp /uptime /help /free /df /uname")
	}),

	temp: new Promise(function(resolve, reject) {
		exec_helper('sensors', resolve, reject);
	}), 

	uptime: new Promise(function(resolve, reject) {
		exec_helper('uptime', resolve, reject);
	}), 
	free: new Promise(function(resolve, reject) {
		exec_helper('free', resolve, reject);
	}), 
	df: new Promise(function(resolve, reject) {
		exec_helper('df -h', resolve, reject);
	}), 
	uname: new Promise(function(resolve, reject) {
		exec_helper('uname -a', resolve, reject);
	}), 
}

commands.start = commands.help

module.exports = commands

