var passwd = require('passwd-linux');
var sessions = {}

function login(key, name, password) {
	return new Promise((resolve, reject) => {
		passwd.checkPassword(name, password, (err, response) => {
			if (err) { reject(err); return; }
			if (response) {
				sessions[key] = { user: name }
				resolve();
			} else {
				reject();
			}
		});
	});
}

function getUser(key) {
	return sessions[key] && sessions[key].user;
}

module.exports.login = login;
module.exports.getUser = getUser;

