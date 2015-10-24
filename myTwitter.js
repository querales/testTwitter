// env var
var env = require('./env.js')

// appdynamics agent
require("appdynamics").profile({
    controllerHostName: process.env.APPDYN_HOST,
  //  controllerPort: process.env.APPDYN_PORT , // If SSL, be sure to enable the next line  
    controllerPort:443, // If SSL, be sure to enable the next line  
    controllerSslEnabled:true,
    accountName: process.env.APPDYN_ACCT_NAME,
    accountAccessKey: process.env.APPDYN_ACCESS_KEY,
    applicationName: 'My_twitter_app_2',
    tierName: 'twitter',
    nodeName: 'get_tweet', // The controller will automatically append the node name with a unique number
  //  proxyCtrlDir: './node_modules/appdynamics/node_modules/appdynamics-proxy/tmp/proxy.communication',
  //  proxyAutolaunchDisabled: true, // i need to start a proxy manually for each nodeJS app
    debug:true // The controller will automatically append the node name with a unique number
});


//Twitter library stuff 
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


// this function gets the last tweet for the handleprocess.env.APPDYN_ACCT_NAME 
var getTweet = function(handle){
//console.log ("the handle is: ---------"+handle);
client.get('users/lookup.json', {screen_name:handle}, function(error,tweet,response){
	  if(error) throw error;	 	
		  // console.log("type "+typeof (tweet));  
		 // console.log(tweet[0].status.text);
	   var lastTweet =tweet[0].status.text;
	    console.log ("Last tweet from:" + handle +" is: " + lastTweet);
	   
	})
};

module.exports.getTweet = getTweet;