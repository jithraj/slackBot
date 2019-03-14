const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');
const { createMessageAdapter } = require('@slack/interactive-messages');
const {parse, stringify} = require('flatted/cjs');
const fs=require("fs");


const slackInteractions = createMessageAdapter('xoxb-430629803749-502031246023-Q4ZCCpM463ocVvX0ghqIOEDk');
var token='xoxb-430629803749-502031246023-Q4ZCCpM463ocVvX0ghqIOEDk';
var port=process.env.PORT || 3000;

var express=require('express');
const app = express();

// app.get('/', (req, res) => res.send('Hello World!'));


const rtm = new RTMClient(token);
const web=new WebClient(token);
// rtm.start();

app.use('/', slackInteractions.expressMiddleware());

app.post('/',(req,res)=>{
    //console.log(JSON.parse(req.body));
    //console.log('killers');
    //console.log(JSON.parse(req.body['payload'])['response_url']);
    console.log(stringify(req.body,undefined,2));
    // res.sendStatus(200);
    // fs.writeFileSync("result.text",stringify(req.body,undefined,2));
    res.send(`Request Body ${req.payload}`);

    slackInteractions.action('aspire', (payload, respond) => {
      // `payload` is an object that describes the interaction
      console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed a button`);
     
      // Your app does some work using information in the payload
      users.findBySlackId(payload.user.id)
        .then(user => user.acceptPolicyAndSave())
        .then(() => {
          // After the asynchronous work is done, call `respond()` with a message object to update the
          // message.
          const message = {
            text: 'Thank you for agreeing to the team\'s policy.',
          };
          respond(message);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          respond({
            text: 'An error occurred while recording your agreement. Please contact an admin.'
          });
        });
     
      // Before the work completes, return a message object that is the same as the original but with
      // the interactive elements removed.
      const reply = payload.original_message;
      delete reply.attachments[0].actions;
      return reply;
    });
});

app.listen(port,()=>{
  console.log(`server is started at Port ${port}`)
})
