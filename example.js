const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');

var token='xoxb-430629803749-502031246023-Q4ZCCpM463ocVvX0ghqIOEDk';
var port=process.env.PORT || 3000;

var express=require('express');
const app = express();

// app.get('/', (req, res) => res.send('Hello World!'));


const rtm = new RTMClient(token);
const web=new WebClient(token);
// rtm.start();


app.post('/',(req,res)=>{
    console.log(typeof(req));
    res.sendStatus(200);
});

app.listen(port,()=>{
  console.log(`server is started at Port ${port}`)
})
