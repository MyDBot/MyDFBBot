'use strict';

const express   = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.set('port' , (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/' , (req ,res)=>{
	res.send("Hi Im a ChatBot!");
});

app.get('/webhooks/' , (req ,res)=>{
	if(req.query['hub.verify_token'] === 'MyDABD'){
		res.send(req.query['hub.challenge']);
	}
	else{
		res.send("Wrong Token!");
	}
});

app.listen(app.get('port') , ()=>{
	console.log("Listening to Port " + app.get('port'));
});
