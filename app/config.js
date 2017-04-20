(function () {
    const bb = require('bluebird');
    const fs = bb.promisifyAll(require('fs'));
    const configPath = 'config.json';
		const path = require('path');
    var configObj = false;

    function getConfig() {
        if (!configObj) {
            return loadConfig();
        }
        return Promise.resolve(configObj);
    }

    function loadConfig() {
				const absPath = path.resolve(configPath);
				console.log('Using config at ' + absPath);
        return fs.readFileAsync(absPath)
        .then((content) => configObj = JSON.parse(content))
        .catch(() => configObj = {
            skypeChats: []
        })
    }

    function saveConfig(cfg) {
        if (cfg) {
            Object.assign(configObj, cfg);
        }
        fs.writeFileAsync(configPath, JSON.stringify(configObj)).catch((err) => {
            console.error(err);
        });
    }
    module.exports.getConfig = getConfig;
    module.exports.saveConfig = saveConfig;
})();
