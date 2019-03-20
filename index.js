const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');

var token='xoxb-430629803749-502830627862-kFrQxFm0F4AIZh2ddBStx9H4';
var mysql=require("mysql");
var axios=require("axios");
var attach=require("./attach.js");

const rtm = new RTMClient(token);
const web=new WebClient(token);
rtm.start();


let channel;
let bot;


var connection=mysql.createConnection({
   user:'root',
   password:'redhat'
});

connection.query('use slack;',function (error, results, fields) {
  if (error) throw error;
  // connected!
});


console.log();
 
rtm.on('authenticated', (rtmStartData) => {
  
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
   
  bot = '<@' + rtmStartData.self.id + '>';
});


// rtm.on('message', (message) => {
//   // For structure of `message`, see https://api.slack.com/events/message

//   // Skip messages that are from a bot or my own user ID
//   if ( (message.subtype && message.subtype === 'bot_message') ||
//        (!message.subtype && message.user === rtm.activeUserId) ) {
//     return;
//   }


//   if (message.text !== null)
//   {
//             message.text = message.text.replace(/<@UE8D19GJG>/i, "");
//             var pieces = message.text.split(' ');
//             var flag=[];
//             //console.log(message.text); 
//             debugger;

        
//             for(i=0;i<pieces.length;i++)
//             {
//                flag[i]=0;
//             }
//             if (pieces.length >= 1)
//             {
                
//                     var response = '<@' + message.user + '>';
                    
             
                     
//                     switch (pieces[0].toLowerCase())
//                     {
//                         case "jump":
//                             response += '"Kris Kross will make you jump jump"';
//                             break;
//                         case "help":
//                             response += ', currently I support the following commands: jump';
//                             break;
//                         default:
//                             response += ', sorry I do not understand the command "' + pieces[1] + '". For a list of supported commands, type: ' + bot + ' help';
//                             var i=0;
//                             var reply='';
                      
                               
//                                connection.query('select * from stopwords;',function (error, results, fields) {
//                                              if (error) throw error;
                                               
//                                              var j;

//                                              for(j=0;j<results.length;j++)
//                                              {
                                               
//                                                 for(i=0;i<pieces.length;i++)
//                                                 {
                                                  
//                                                   pieces[i]=pieces[i].toLowerCase();
//                                                   //console.log(`mysql ${results[j].words} pieces ${pieces[i]}`);
//                                                   if(pieces[i]===results[j].words){
//                                                      //reply=reply+pieces[i]+"  ";
//                                                      console.log(pieces[i]);
//                                                      flag[i]=1;
//                                                    }   
//                                                    else
//                                                    {
                                                    
//                                                     }
//                                                 }                       
//                                              }
                                             
                                              
//                                              });
                            
                           
//                             setTimeout(function(){
//                                       for(i=0;i<pieces.length;i++)
//                                       {
//                                        if(flag[i]===0)
//                                        {
//                                          reply=reply+pieces[i]+"  ";
//                                        }
//                                       }
//                                       axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBLddZawK0xCVofyq0ha8sbLIShVyFs_9s&cx=007120909143705012278:7qmyzith6hk&q=${reply}`)
//                                       .then((response)=>{
                          
//                                         rtm.sendMessage(response.data.items[0].snippet,message.channel);
//                                       })
//                                       .catch((error)=>{
//                                          console.log("Pls check your connectivity");
//                                          console.log(error);
//                                       });
//                                       console.log(`Reply:  ${reply}`)
//                                       console.log(pieces); 
//                                       console.log(flag);}, 10000);
                            
//                             break;
//                     }
                     
//                     rtm.sendMessage(response, message.channel).then((res)=>{
//                        console.log(JSON.stringify(res,undefined,2));
//                     }).catch((error)=>{
//                        console.log(error);
//                     });
                
//             }
           
//   }
//   // Log the message
//   console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
// // });


//killer

rtm.on('message',(message)=>{
   console.log(JSON.stringify(message,undefined,2));
  
   if ( (message.subtype && message.subtype === 'bot_message') ||
       (!message.subtype && message.user === rtm.activeUserId) ) {
       return;
   }
  
   attach.msg1.channel=message.channel;
  web.chat.postMessage(attach.msg1)
  .then((res)=>{
     console.log(res);
     throw {error:"just kidding"};
  })
  .catch((e)=>{
      console.log(e);
  });
   
});
