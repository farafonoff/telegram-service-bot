(function () {
    const bb = require('bluebird');
    const fs = bb.promisifyAll(require('fs'));
    const configPath = '../config.json';
    var configObj = false;

    function getConfig() {
        if (!configObj) {
            return loadConfig(configPath);
        }
        return Promise.resolve(configObj);
    }

    function loadConfig(path) {
        return fs.readFile(path)
        .then((content) => configObj = JSON.parse(content))
        .catch(() => configObj = {
            skypeChats: []
        })
    }

    function saveConfig(cfg) {
        if (cfg) {
            Object.assign(configObj, cfg);
        }
        fs.writeFile(configPath, JSON.stringify(configObj)).catch((err) => {
            console.error(err);
        });
    }
    module.exports.getConfig = getConfig;
    module.exports.saveConfig = saveConfig;
})();
