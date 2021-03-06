var cp = require('child_process');
const auth = require('./auth')
//var skype = require('./skype');
var config = require('./config');
var help_string = "/temp /uptime /help /free /df /uname /login /youtube_on /youtube_off /youtube_status"
var _ = require('lodash');

var good_user = 'artem';

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

function admin_helper(chat_id, command) {
	if (auth.getUser(chat_id) === good_user) {
		return exec_helper(command);
	} else {
		return Promise.reject('please login');
	}
}


var commands = {
	_skypeChats: [],
	help: function (resolve, reject) {
		return Promise.resolve(help_string);
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
	login: function (args, responder, message) {
		var login = args[1];
		var password = args[2];
		return auth.login(message.chat.id, login, password)
			.then(m => console.log(m))
			.then(success => {
				return 'Logged in as ' + login;
			});
	},
	youtube_on: function (args, responder, message) {
		return admin_helper(message.chat.id, '/etc/hosts-blocklists/youtube enable');
	},
	youtube_off: function (args, responder, message) {
		return admin_helper(message.chat.id, '/etc/hosts-blocklists/youtube disable');
	},
	youtube_status: function (args, responder, message) {
		return exec_helper('/etc/hosts-blocklists/youtube status');
	}
	/*youtube_helper: (vid) => {
		if (vid.indexOf('"') != -1) {
			Promise.reject("Not pawned");
		}
		return exec_helper(`DISPLAY=:0 sudo -u artem vlc --started-from-file "${vid}"`, resolve, reject);
	},*/
	/*skype: function(args, responder, message) {
		skype.start(args[1], args[2], responder);
		var chatObj = {login: args[1], password: args[2], id: message.chat.id}
		var oldChat = this._skypeChats.find(chat => chat.id === message.chat.id&&chat.login === chatObj.login);
		if (oldChat) {
			oldChat.assign(chatObj);
		} else {
			this._skypeChats.push(chatObj);
		}
		config.saveConfig({
			chats: this._skypeChats
		});
	},
	_loadChats: function(sendToChat, chats) {
		if (chats) {
			this._skypeChats = _.uniqBy(chats, 'id');
		}
		this._skypeChats.forEach(chat => {
			skype.start(chat.login, chat.password, (msg) => {sendToChat(chat.id, msg);})
		})
	}*/
}

commands.start = commands.help

module.exports = commands

