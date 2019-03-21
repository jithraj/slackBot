const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');
const { createMessageAdapter } = require('@slack/interactive-messages');
const {parse, stringify} = require('flatted/cjs');
const axios=require('axios');
var mysql=require("mysql");
var tweet=require("./tweet.js");
var attach=require("./attach.js");

const fs=require("fs");


const slackInteractions = createMessageAdapter('f39a58a498ddbde21ba757ee89d333ad');
var token='xoxb-430629803749-502830627862-kFrQxFm0F4AIZh2ddBStx9H4';
var port=process.env.PORT || 3000;

var express=require('express');
const app = express();

// app.get('/', (req, res) => res.send('Hello World!'));

var connection=mysql.createConnection({
   user:'root',
   password:'redhat'
});


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

  message.text = message.text.replace(/<@UE8D19GJG>/i, "");
  console.log(`Message ${message.text}  ${flag}`); 

  if(message.text!=null && flag==0)
  {
	if(message.text.includes("vizerto"))
	{
		attach.msg1.channel=message.channel;
		web.chat.postMessage(attach.msg1)
  		.then((res)=>{
     			console.log(res);
     			throw {error:"just kidding"};
  		})
  		.catch((e)=>{
	      		console.log(e);
  		});
	}
  }
  if (message.text !== null && flag==1)
  {
	    
            
            debugger;

            axios.get(`https:\/\/evening-brook-60598.herokuapp.com/?q=${message.text}`).then(function (response) {
               //console.log(JSON.stringify(message,undefined,2));     
               console.log(response.data);
               rtm.sendMessage(`${JSON.stringify(response.data,undefined,2)}`, message.channel).then((res)=>{
                  console.log(JSON.stringify(res,undefined,2));
               }).catch((error)=>{
                  console.log(error);
               });
            })
            .catch(function (error) {
                 console.log(error);
            });
	
	    flag=0;
        
           
  }
  if(message.text !== null && flag==2)
  {
 	
        
	var pieces = message.text.split(' ');
        var temp=[];

        var i=0,t;
        var reply='';
                      
        /*                       
        connection.query('select * from stopwords;',function (error, results, fields) {
        	if (error) throw error;
                                               
                var j;
                for(j=0;j<results.length;j++)
                {
                                               
              	  for(i=0;i<pieces.length;i++)
                  {
                                                  
                	  pieces[i]=pieces[i].toLowerCase();
                          //console.log(`mysql ${results[j].words} pieces ${pieces[i]}`);
                          if(pieces[i]===results[j].words){
	                          //reply=reply+pieces[i]+"  ";
                                  console.log(pieces[i]);
                                  temp[i]=1;
                           }   
                           else
                           {
                                                    
                           }
                  }                       
                }
                                             
                                              
        });
        */ 

        for(i=0;i<pieces.length;i++)
        {
		temp[i]=0;        	

        }                   
                           
        setTimeout(function(){
        	for(i=0;i<pieces.length;i++)
                {
                	if(temp[i]===0)
                        {
                        	reply=reply+pieces[i]+"  ";
                        }
                }
                axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBLddZawK0xCVofyq0ha8sbLIShVyFs_9s&cx=007120909143705012278:7qmyzith6hk&q=${reply}`)
                .then((response)=>{
                          
                	rtm.sendMessage(response.data.items[0].snippet,message.channel);
                })
                .catch((error)=>{
                	console.log("Pls check your connectivity");
			rtm.sendMessage("Please type the message nicely there is some error.....",message.channel);
                        console.log(error);
                });
                console.log(`Reply:  ${reply}`)
                console.log(pieces); 
                console.log(temp);}, 10000);

		flag=0;
                            

  }
  if (message.text !== null && flag==3)
  {
	    
            
            debugger;
		
            
            
            tweet.tweet_message(`${message.text}`).then((res)=>{
		rtm.sendMessage(`The message has been tweeted`, message.channel).then((res)=>{
                    //console.log(JSON.stringify(res,undefined,2));
                 }).catch((error)=>{
                    console.log(error);
                 });
	    }).catch((err)=>{
		console.log(err);
	    })
            
           
            /*
	    tweet.get_searched_tweets(`${message.text}`).then(function(result){
	   	 console.log(JSON.stringify(result,undefined,2));
                 rtm.sendMessage(`${JSON.stringify(result,undefined,2)}`, message.channel).then((res)=>{
                    //console.log(JSON.stringify(res,undefined,2));
                 }).catch((error)=>{
                    console.log(error);
                 });
	    }).catch(function(error){
	         console.log(error);
	    });
            */

	    flag=0;
	     
            
             
  }
  if(message.text!=null && flag==4)
  {
     
     tweet.tweet_message(`${message.text}`).then((res)=>{
		console.log(res);
		rtm.sendMessage(`Your message has been tweeted`, message.channel).then((res)=>{
                    //console.log(JSON.stringify(res,undefined,2));
                }).catch((error)=>{
                    console.log(error);
                });
     }).catch((err)=>{
		console.log(err);
     })

     flag=0;
  }
  if(message.text!=null && flag==5)
  {
	
	tweet.get_searched_tweets(`${message.text}`).then(function(result){
	   	 console.log(JSON.stringify(result,undefined,2));
                 rtm.sendMessage(`${JSON.stringify(result,undefined,2)}`, message.channel).then((res)=>{
                    //console.log(JSON.stringify(res,undefined,2));
                 }).catch((error)=>{
                    console.log(error);
                 });
                 /*
                 var final_msg=`negative tweets:${tweet.n_count1}% positive tweet:${tweet.p_count1}%`;
                 rtm.sendMessage(`${final_msg}`, message.channel).then((res)=>{
                    //console.log(JSON.stringify(res,undefined,2));
                 }).catch((error)=>{
                    console.log(error);
                 });
                 */

	 }).catch(function(error){
	         console.log(error);
	 });

	 flag=0;
  }
  if(message.text!=null && flag==6)
  {
	
	tweet.get_friends_list(`${message.text}`).then((response)=>{
	   rtm.sendMessage(`${JSON.stringify(response,undefined,2)}`, message.channel).then((res)=>{
                    //console.log(JSON.stringify(res,undefined,2));
           }).catch((error)=>{
                    console.log(error);
           });
	}).catch((error)=>{
	   console.log(error);
	});

  }
  flag=0;
  // Log the message
  console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
 });




    slackInteractions.action('aspire', (payload, respond) => {
      // `payload` is an object that describes the interaction
      console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed a button`);
      console.log(JSON.stringify(payload,undefined,2));
      //console.log(JSON.stringify(respond,undefined,2));
      console.log(`${payload.actions[0].value=="tweet"} ${flag}`);
        
        if(payload.actions[0].type=="button")
        {  
        	if(payload.actions[0].value=="tweet")
        	{
           		flag=4;
           		console.log("SuCeSS");
           		rtm.sendMessage("Tweet your message here", payload.channel.id).then((res)=>{
            		//console.log(JSON.stringify(res,undefined,2));
           		}).catch((error)=>{
            		console.log(error);
           		});  
        	}
 
        	if(payload.actions[0].value=="Analyse_tweets")
		{
          		flag=5;
          		rtm.sendMessage("Type your message here", payload.channel.id).then((res)=>{
            		//console.log(JSON.stringify(res,undefined,2));
          		}).catch((error)=>{
            		console.log(error);
          		});
		}

		if(payload.actions[0].value=="get_friends")
		{
          		flag=6;
          		rtm.sendMessage("Type your Profile code here", payload.channel.id).then((res)=>{
           		 //console.log(JSON.stringify(res,undefined,2));
          		}).catch((error)=>{
            		console.log(error);
          		});
		}
	}

        if(payload.actions[0].type=="select")
        {

	        if((payload.actions[0].selected_options[0].value=="weather") || (payload.actions[0].value=="weather"))
	        {
		          console.log("Think about response");
		          flag=1;
		          rtm.sendMessage("Please Enter the Place name that you want the information of", payload.channel.id).then((res)=>{
		            //console.log(JSON.stringify(res,undefined,2));
          		  }).catch((error)=>{
           		 	console.log(error);
          		  });
        	}
        
        	if((payload.actions[0].selected_options[0].value=="google") || (payload.actions[0].value=="google"))
        	{
          		flag=2;
          		rtm.sendMessage("Please Enter the term that you want the information of from Google", payload.channel.id).then((res)=>{
            		//console.log(JSON.stringify(res,undefined,2));
        	 	}).catch((error)=>{
            		console.log(error);
         		});
        	}
        
       	 	if((payload.actions[0].selected_options[0].value=="twitter") || (payload.actions[0].value=="weather"))
        	{
          		flag=3;
          		attach.msg2.channel=payload.channel.id;
  	  		web.chat.postMessage(attach.msg2).then((res)=>{
          			console.log(res);
				throw {error:"just kidding"};
	  		})
          		.catch((e)=>{
				console.log(e);
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
