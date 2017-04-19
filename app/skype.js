const skypeHttp = require('./skype-http/skype-http');

connections = [];

function _onMessage(api, responder) {
    return function (resource) {
        if (resource.from.username === api.context.username) {
            return;
        }
        console.log(JSON.stringify(resource, null, 2));

        console.log("Received text:");
        console.log(resource.conversation);
        console.log(resource.content);
        responder(`/skrespond:${resource.conversation} ${resource.content}`);
    }
}

function start(login, password, onMessage) {
    return skypeHttp.connect({
        credentials: {
            username: login,
            password: password
        }
    }).then((api) => {
        api.on("Text", _onMessage(api, onMessage));
        api.on("RichText", _onMessage(api, onMessage));
        // Log every event
        /*api.on("event", (ev) => {
            console.log(JSON.stringify(ev, null, 2));
        });*/

        // Log every error
        api.on("error", (err) => {
            //console.error("An error was detected:");
            onMessage(`skype error ${err}`)
            //console.error(err);
        });
        api.listen().then(() => {
            connections[login] = api;
            return api.setStatus("Online")
        }).then(() => {
            onMessage('Skype Ready');
        });
    }).catch(err => responder(err));

}

module.exports.start = start;
start('artem_farafonov', 'optanex14', (text) => { console.log(text) });
