const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');
const axios=require('axios');

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

			 console.log(JSON.stringify(res.data,undefined,2));
	 		 for(var i=0;i<JSON.stringify(res.data.data[0].questions,undefined,2).length;i++){
	
	                   if(res.data.data[0].questions[i].answers)
                              friends.push(res.data[0].questions[i].answers[0].answerText);
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
