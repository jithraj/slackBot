const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');
const { createMessageAdapter } = require('@slack/interactive-messages');
const {parse, stringify} = require('flatted/cjs');
const axios=require('axios');
const express=require('express');
var striptags = require('striptags');

var sentiment=require('sentiment');
var app=new express();

sentiment=new sentiment(); 


app.get('/', function (req, res) {
var p_count=0,n_count=0,neutral=0;

	axios.get(`https:\/\/slack.com\/api\/channels.history?token=xoxp-430629803749-432006491399-501660062467-519067e9643f57eaf9ba5d22640cb06e&channel=CCN7KJ9S8&count=1000`)
                .then((response)=>{
			for(var i=0;i<response.data.messages.length;i++)
			{
				

				if(response.data.messages[i].client_msg_id)
				{
					//response.data.messages[i].text = response.data.messages[i].text.replace(/<@UE8D19GJG>/i, "");
					//response.data.messages[i].text = response.data.messages[i].text.replace(/<@UE8D19GJG>/i, "");
					response.data.messages[i].text = striptags(response.data.messages[i].text);
					console.log(`${response.data.messages[i].text} ${sentiment.analyze(response.data.messages[i].text).score}`);
					if(sentiment.analyze(response.data.messages[i].text).score==0)
						neutral=neutral+1;
					if(sentiment.analyze(response.data.messages[i].text).score>0)
						p_count=p_count+1;
					if(sentiment.analyze(response.data.messages[i].text).score<0)
						n_count=n_count+1;
				}


			}
                })
                .catch((error)=>{
                	console.log("Pls check your connectivity");
			//rtm.sendMessage("Please type the message nicely there is some error.....",message.channel);
                        console.log(error);
                });

		res.send(`${p_count}  ${n_count}  ${neutral}`);
  
});



app.listen(3000,()=>{
  console.log(`server is started at Port 3000`)
})
