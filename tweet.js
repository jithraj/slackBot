const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');
const axios=require('axios');
var sentiment=require('sentiment');

sentiment=new sentiment(); 

// Initialize
const oauth = OAuth({
  consumer: {
    key: 'xd79OCt4HW5knvqlSsVQnUaSu',
    secret: 'Su8VHQj54VEsYxnpv4vbLAJ5fwi49L1Hn7rpi4d8b7qnZlGRbS'
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});
 


// Note: The token is optional for some requests
const token = {
  key: '4301843594-rWRhH85j2aSDBdSA5A6ZNZllk1dZaRbBerDUtj5',
  secret: 'Nu0KrZGnp4ipNhHaPP5hYIVjB43SeTKj0w8n1MiDDANc3'
};
 
//  console.log(JSON.stringify({
//   url: request_data.url,
//   method: request_data.method,
//   headers: oauth.toHeader(oauth.authorize(request_data, token))
// },undefined,2));

var get_friends_list=(user_id)=>{
    //get Friends list from twitter
 
    console.log(user_id);
    const request_data = {
       url: 'https://api.twitter.com/1.1/friends/list.json?cursor=-1&user_id=4301843594',
      // url: `https://api.twitter.com/1.1/friends/list.json?cursor=-1&user_id=${user_id}`,
      method: 'GET'
    };
    

    var friends =[];

    return new Promise((success,reject)=>{
      axios({
        url: request_data.url,
        method: request_data.method,
        headers: oauth.toHeader(oauth.authorize(request_data, token))
     }).then((response)=>{
            for(var i=0;i<JSON.stringify(response.data.users,undefined,2).length;i++)
            {
                 if(response.data.users[i])
                     friends.push(response.data.users[i].name);
            }
                  //console.log(JSON.stringify(response.data.users[0].name,undefined,2));
            success(friends);
     }).catch((error)=>{
             reject(error);
     });
 
    });
    
}

var get_searched_tweets=(query)=>{

  const request_data_search = {
    url: `https://api.twitter.com/1.1/users/search.json?q=${query}&result_type=popular`,
    method: 'GET'
  };

  return new Promise((success,reject)=>{

    axios({
      url: request_data_search.url,
      method: request_data_search.method,
      headers:oauth.toHeader(oauth.authorize(request_data_search,token))
    }).then((response)=>{
        var tweets=[];
        var ntweets=[];
        var ptweets=[];
        for(var i=0;i<JSON.stringify(response.data,undefined,2).length;i++)
        {
          
          if(response.data[i])
          {
            var res = response.data[i].status.text.replace(/(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)/g, "");
            if(sentiment.analyze(res).score<0)
            {
              ntweets.push(response.data[i].status.text);
            }
            else if(sentiment.analyze(res).score>=0){
              ptweets.push(response.data[i].status.text);
            }
          }
            
        }
        
        success({
            ptweets:ptweets,
            ntweets:ntweets
        });

    }).catch((error)=>{
       reject(error);
    });
  });
  
  
};

const request_data_tweet = {
  url: `https://api.twitter.com/1.1/statuses/update.json?status=${encodeURIComponent("Amazing ")}`,
  method: 'POST'
};

axios({
  url: request_data_tweet.url,
  method: request_data_tweet.method,
  headers:oauth.toHeader(oauth.authorize(request_data_tweet,token))
}).then((response)=>{
   console.log(response);
}).catch((error)=>{
  console.log(error);
})

// console.log(request_data_tweet);

// get_searched_tweets('Narendra Modi').then(function(result){
//      console.log(JSON.stringify(result,undefined,2));
// }).catch(function(error){
//      console.log(error);
// });

// get_friends_list(923575232216125440).then((response)=>{
//   console.log(response);
// }).catch((error)=>{
//   console.log(error);
// });

// console.log(sentiment.analyze('You are intelligent and dumb.'));

// { score: -3,
//   comparative: -0.75,
//   tokens: [ 'you', 'are', 'so', 'bad' ],
//   words: [ 'bad' ],
//   positive: [],
//   negative: [ 'bad' ] }