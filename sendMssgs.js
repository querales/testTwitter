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
    tierName: 'twitter',
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
var handles = require('./handles.json');
//miliseconds
var timeInterval=10000;
var loopArround=1000000000000000000000000000000;
var i=0;
//var callTwitter = require ('./myTwitter');



//Twitter library stuff 
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});



// this function gets the last tweet for the handleprocess.env.APPDYN_ACCT_NAME 
function getTweet (handle){
//console.log ("the handle is: ---------"+handle);
client.get('users/lookup.json', {screen_name:handle}, function(error,tweet,response){
      if(error) throw error;        
          // console.log("type "+typeof (tweet));  
         // console.log(tweet[0].status.text);
       var lastTweet =tweet[0].status.text;
        console.log ("Last tweet from:" + handle +" is: " + lastTweet);
       
    })
};

// loops throught a file and gets the tweet for each handle

(function getTweets (k) {
 var j=0;
 while (j++ <= 1) {   
        console.log ("interaction number: -------------> "+i);
        console.log ("the handle is: ------"+handles[i].handle_id);
        getTweet(handles[i].handle_id); 
        i++;
        if (i==7)
         i=0;   
    }  
  setTimeout(function () {
    if (--k) {             // If i > 0, keep going
      getTweets(k);       // Call the loop again, and pass it the current value of i
    }
  }, timeInterval);
   console.log ("--------------------------------------------------------------");
   console.log ("big loop sleeps for " +timeInterval +"seconds wrap around number: -------------> " +k);

})(loopArround);
    //800000);

// Start an HTTP server with this Express app
app.get('/', function(request, response) {
    response.send("Hello!!!! my twitter app!!!!");
    getTweets();
});


 // Make our Express server listen on port 5000.
app.listen(process.env.PORT || 5000);




