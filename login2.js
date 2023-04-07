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


app.post('/login', function(req,res){
	var univid = req.body.univid;
    var password = req.body.password;


	var data = {
		"univid":univid,
        "password": password
	}

db.collection('login').findOne({ univid: univid }, function(err, user) {


    if (err) {
        res.status(500).send('Internal server error');
      }
      if (!user) {
        return res.redirect('not_user.html');
        }
      if (user.password !== password) {
        return res.redirect('invalid_pass.html');
      }
      return res.redirect('form.html');
    });
});


app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect("index.html");
    
    })


module.exports = app;
