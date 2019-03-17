const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');
const { createMessageAdapter } = require('@slack/interactive-messages');
const {parse, stringify} = require('flatted/cjs');
const axios=require('axios');


const fs=require("fs");


const slackInteractions = createMessageAdapter('37acc231a9c290ff477c9e8d70213f67');
var token='xoxb-438796475940-484443322628-rrIIuI7do45WFN5Un3ckeLSA';
var port=process.env.PORT || 3000;

var express=require('express');
const app = express();

// app.get('/', (req, res) => res.send('Hello World!'));


const rtm = new RTMClient(token);
const web=new WebClient(token);
rtm.start();

 var flag=0;

app.use('/', slackInteractions.expressMiddleware());

rtm.on('message', (message) => {
  // For structure of `message`, see https://api.slack.com/events/message

  // Skip messages that are from a bot or my own user ID
  if ( (message.subtype && message.subtype === 'bot_message') ||
       (!message.subtype && message.user === rtm.activeUserId) ) {
    return;
  }


  if (message.text !== null && flag==1)
  {
            message.text = message.text.replace(/<@UE8D19GJG>/i, "");
            //console.log(message.text); 
            debugger;

            axios.get('https://evening-brook-60598.herokuapp.com/?q=${message.text}').then(function (response) {
               console.log(JSON.stringify(message,undefined,2);     
               console.log(response);
            })
            .catch(function (error) {
                 console.log(error);
            })
        
           
  }
  // Log the message
  console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
 });


    slackInteractions.action('aspire', (payload, respond) => {
      // `payload` is an object that describes the interaction
      console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed a button`);
      console.log(JSON.stringify(payload,undefined,2));
      //console.log(JSON.stringify(respond,undefined,2));
      console.log(payload.actions[0].selected_options[0]);

      if(payload.actions[0].type=="select")
      {
        if(payload.actions[0].selected_options[0].value=="weather")
        {
          console.log("Think about response");
          flag=1;
          rtm.sendMessage("Please Enter the Place name that you want the information of", payload.channel.id).then((res)=>{
            console.log(JSON.stringify(res,undefined,2));
         }).catch((error)=>{
            console.log(error);
         });
        }
      }
     
      
     
      // Before the work completes, return a message object that is the same as the original but with
      // the interactive elements removed.
      
    });


/*
app.post('/',(req,res)=>{
    //console.log(JSON.parse(req.body));
    console.log('killers@work');
    //console.log(JSON.parse(req.body['payload'])['response_url']);
    //console.log(stringify(req,undefined,2));
    // res.sendStatus(200);
    // fs.writeFileSync("result.text",stringify(req.body,undefined,2));
    //res.send(`Request Body ${JSON.parse(req.body['payload'])['response_url']}`);
        

});
*/



app.listen(port,()=>{
  console.log(`server is started at Port ${port}`)
})
