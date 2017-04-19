var config = require('../config')

var URL = "https://api.telegram.org/bot"+config.apikey+"/";

var myUrl = config.server_url


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request    = require('request')
var commands   = require('./commands');
var process    = require('process');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

function send_response(message, response) {
	var chat_id = message.chat.id
	request.post(
		URL+'sendMessage',
		{ json: true, body: {chat_id: chat_id, text: response  }  },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
			} else {
				console.log(body)
			}
		}
   	);
}

function processMsg(message) {
	if (message==null) {
		console.warn("no message at processMsg");
		return;
	}
	console.log(message.text)
	var promis;
	if (message.text.lastIndexOf('/')===0) {
		let command = message.text.substring(1)
		let args = cmd.split(':');
		let cmd = args[0];
		promis = commands[cmd](args, (text) => {send_response(message, text);});
	} else if (message.text.indexOf('youtu')>-1) {
		promis = commands.youtube_helper(message.text);
	}
	if (promis) {
		promis.then(
				function(success) {send_response(message, success)},
				function(error) {send_response(message, 'command failed '+error )}
				);
	} else {
		console.log(message);
	}

}

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
//var MjpegProxy = require('mjpeg-proxy').MjpegProxy;


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/test', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
})
.post('/', function(req, res) {
	var message = req.body.message
	processMsg(message)	
	res.json({ok:true})
})
// .get('/turtles.jpg',new MjpegProxy('http://192.168.8.131:8080/video').proxyRequest);

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
request(URL+'setWebhook?url='+myUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)
    app.listen(port);
    console.log('Magic happens on port ' + port);
  }
})


