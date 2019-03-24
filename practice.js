const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');
const { createMessageAdapter } = require('@slack/interactive-messages');
const {parse, stringify} = require('flatted/cjs');
const axios=require('axios');

axios.get(`https:\/\/slack.com\/api\/channels.history?token=xoxp-430629803749-432006491399-501660062467-519067e9643f57eaf9ba5d22640cb06e&channel=CCN7KJ9S8&count=100`)
                .then((response)=>{
			for(var i=0;i<response.data.messages.length;i++)
			{
				

				if(response.data.messages[i].client_msg_id)
				{
					response.data.messages[i].text = response.data.messages[i].text.replace(/<@UE8D19GJG>/i, "");
					console.log(`${response.data.messages[i].text}`);
		
				}


			}
                })
                .catch((error)=>{
                	console.log("Pls check your connectivity");
			rtm.sendMessage("Please type the message nicely there is some error.....",message.channel);
                        console.log(error);
                });
