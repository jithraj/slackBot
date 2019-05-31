const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');
const axios=require('axios');
var striptags = require('striptags');

var get_vizerto_list=(query)=>{
    //get Friends list from twitter
    
	var friends =[];
   
	return new Promise((success,reject)=>{

		var postData ={
			"domain": "sales",
			"origQuestionUuid": null,
			"question": query
		}

		let axiosConfig = {
	  		headers: {
	      		'Content-Type': 'application/json',
	      		"vizerto-auth-token": "NjQwB8inurMp23GDdWWMXYpWuvb98VB3cc5gcBEyGLUb3QopN7Yn9H0iPd31ZQHKuLeweZA1CThYbYXF/OjBeWJnduqFkUDKjU25CiEFN8GgoSMKSJ0ZYPAz5Sj/03FVpfwuouYFDTjl/sI95n2XHxQ+49ipuQUUy6qJZGoAmoBbrT4RA3qkctJZkT/IeIcED5v4eLtX7R0=",
	  		}
		};

		axios.post('https://stage.vizerto.com/question/search', postData, axiosConfig)
		.then((res) => {

			 console.log(`Payload`);
			 console.log(res.data.data[0].questions.length)
			 //console.log(res.data.data[0].questions[0].answers.length)
          		 //console.log(JSON.stringify(res.data.data[0].questions[0].answers[0].answerText,undefined,2));
	 		 for(var i=0;i<res.data.data[0].questions.length;i++){
			   console.log(JSON.stringify(res.data.data[0].questions[i].domain,undefined,2));
	                   if(res.data.data[0].questions[i].answers.length>0)
                              friends.push(striptags(res.data.data[0].questions[i].answers[0].answerText));
	            	}
			if(res.data.data[0].questions.length==0)
			{
				friends.push('The question was not answered in vizerto yet....')
			}
                  //console.log(JSON.stringify(response.data.users[0].name,undefined,2));
            	success(friends);
		})
		.catch((err) => {
		  reject(err);
		});
	});
}

module.exports={ 
    get_vizerto_list:get_vizerto_list
};
