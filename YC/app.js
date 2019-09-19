var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCEMA SETUP
var postSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Post = mongoose.model("Post", postSchema);
//Post.create(
//	{name : "denis kerec",
//	 image: "https://images.unsplash.com/photo-1534759846116-5799c33ce22a?ixlib=rb-	1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=688&q=80",
//	 description: "This is a picture of a big cat :)"
//	},
//	function(err, post){
//	if(err){
//		console.log(err);
//	}else{
//		console.log("new post");
//		console.log(post);
//	}
//});



app.get("/", (req, res) =>{
	res.render("landing");
});
// INDEX shows the Post page with all the posts
app.get("/posts", (req, res) => {
	Post.find({}, function(err, allPosts){
		if(err){
			console.log(err);
		}else {
			res.render("index", {posts:allPosts});
		}
	});
});
//CREATE - the new pics and showin the on the "post" page
app.post("/posts", (req,res) => {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newPosts = {name: name, image: image, description: desc};
	Post.create(newPosts, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
				res.redirect("/posts");
		}
	});
});
// New-  gives us the form to add new shit
app.get("/posts/new", (req, res) =>{
	res.render("new.ejs");
});
//SHOW - gives us more information about the posts
app.get("/posts/:id", (req, res)=>{
	Post.findById(req.params.id, function(err, foundPost){
		if(err){
			console.log(err);
		}else {
			res.render("show", {post: foundPost});
		}
		
	});	
});
app.listen(9000, () => {
	console.log('server is running of port 9000');
});