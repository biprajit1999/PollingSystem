var express=require("express");
var bodyParser=require("body-parser");
const app = express.Router();

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/placement3');
mongoose.connect('mongodb+srv://biprajit:biprajit@cluster0.has27be.mongodb.net/placement_sortlist?retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})



app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));


app.post('/survey_form', function(req,res){
	var name = req.body.name;
	var gender = req.body.gender;
	var univid = req.body.univid;
	var email =req.body.email;
	var phone =req.body.phone;
	var cpi = req.body.cpi;
	var attendence = req.body.attendence;
	var backlogs = req.body.backlogs;
	var tech = req.body.tech;
	var jobRole = req.body.myList;

	var data = {
		"name": name,
		"gender":gender,
		"univid":univid,
		"email":email,
		"phone":phone,
		"cpi":cpi,
		"attendence":attendence,
		"backlogs":backlogs,
		"tech":tech,
		"jobRole":jobRole
	}


db.collection('detail').findOne({ univid: univid }, function(err, result) {
	if (err) throw err;
	
	if (result) {
		return res.redirect('duplicate_error.html');
	}
	else {
		db.collection('detail').insertOne(data, function(err, collection) {
			if (err) throw err;
			console.log("Record inserted Successfully");	
		});
	
		return res.redirect('survey_success.html');
	}
});

});


app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect('form.html');

    })

module.exports = app;
