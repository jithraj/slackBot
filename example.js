const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');

var token='xoxb-430629803749-502031246023-Q4ZCCpM463ocVvX0ghqIOEDk';

var express=require('express');
const app = express();

// app.get('/', (req, res) => res.send('Hello World!'));


const rtm = new RTMClient(token);
const web=new WebClient(token);
// rtm.start();


app.post('/about',(req,res)=>{
    console.log(req);
});
