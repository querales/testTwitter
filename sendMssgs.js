// env var
var env = require('./env.js')

// appdynamics agent
require("appdynamics").profile({
    controllerHostName: process.env.APPDYN_HOST,
    controllerPort:443, // If SSL, be sure to enable the next line     c 
    controllerSslEnabled:true,
    accountName: process.env.APPDYN_ACCT_NAME,
    accountAccessKey:process.env.APPDYN_ACCESS_KEY,
    applicationName: 'My_twitter_app_2',
    tierName: 'handles',
    nodeName: 'loop', // The controller will automatically append the node name with a unique number
  //  proxyCtrlDir: './node_modules/appdynamics/node_modules/appdynamics-proxy/tmp/proxy.communication',
  //  proxyAutolaunchDisabled: true, // i need to start a proxy manually for each nodeJS app
   debug:true // The controller will automatically append the node name with a unique number
});



//open source modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


// my variables
var handles = require('./handles_long.json');
var callTwitter = require ('./myTwitter');


// loops throught a file and gets the tweet for each handle
function getAllTweets (){
	var i=0;
	handles.forEach(function(handle){
	//console.log ("the handle is: "+handle.handle_id);
	callTwitter.getTweet(handle.handle_id);	
	i= i+1;
    console.log ("interaction number: -------------> "+i);
 	});
 	console.log ("done!");
};


// Start an HTTP server with this Express app
app.get('/', function(request, response) {
    response.send("Hello!!!! my twitter app!!");
    getAllTweets();
});


 // Make our Express server listen on port 5000.
app.listen(process.env.PORT || 5000);




