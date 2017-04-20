var cp = require('child_process');
var skype = require('./skype');
var config = require('./config');
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
	_skypeChats: [],
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
	skype: (args, responder, message) => {
		skype.start(args[1], args[2], responder);
		_skypeChats.push({login: arg[1], password: arg[2], id: message.chat.id});
		config.saveConfig({
			chats: _skypeChats
		});
	},
	_loadChats: function(sendToChat, chats) {
		if (chats) {
			this._skypeChats = chats;
		}
		this._skypeChats.forEach(chat => {
			skype.start(chat.login, chat.password, (msg) => {sendToChat(chat.id, msg);})
		})
	}
}

commands.start = commands.help

module.exports = commands

