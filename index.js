'use strict';

const express   = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.set('port' , (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let token = "EAADT0Fs73bIBACB4ZAMSTaGJY1k6chxIEvU9stQYP480ujejW0LYCEvITnU3jY7ZA9f2AcNY8tzYY8PH1WI4SoZBR7ujeiXQQg6pdnjxVGpZAcckNGRbkxSBY2SSdcP2K8heQelwuqEJZBOh6dKVmQIPkSuctnWSgz09yEFBflgZDZD";

app.get('/' , (req ,res)=>{
	res.send("Hi Im a ChatBot!");
});

app.get('/webhooks/' , (req ,res)=>{
	if(req.query['hub.verify_token'] === 'MyDABD'){
		res.send(req.query['hub.challange']);
	}
	else{
		res.send("Wrong Token!");
	}
});

app.post('/webhooks/' ,(req,res)=>{
	let messaging_events = req.body.entrty[0].messaging;
	for(let i = 0;i<messaging_events.length;i++){
		let event = messaging_events[i];
		let sender = event.sender.id;
		if(event.message && event.message.text){
			let text = event.message.text;
			sendText(sender , 'Text Echo: '+ text.substring(0,100));

		}
	}
	message.sendStatus(200);
});


function sendText(sender , text){
	let messageData = {text: text};
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs: {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message: messageData

		},function(err , responce , body){
			if(err){
				console.log(err);
			}
			else if(responce.body.error){
				console.log(responce.body.error);
			}
		}
	});
}			

app.listen(app.get('port') , ()=>{
	console.log("Listening to Port " + app.get('port'));
});
