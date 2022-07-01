//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();
const nodemailer = require("nodemailer");
var crypto = require('crypto');
var http = require('http');
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + '/public/js'));

mongoose.connect('mongodb://localhost:27017/mySiteDB');

const projectSchema = {
  title:String,
  des:String,
  tags:Array,
  link:String,
  image:String,
  view:String,
};

const Project = mongoose.model("project",projectSchema);


// ---------------------------------------GET-PAGES-----------------------------------------------------------------------------------
app.get("/",function(req,res){
  res.sendFile('C:/Users/Administrator/Documents/Web Development/mySite Clean/public/home.html');
});

app.get("/projects",function(req,res){
  Project.find({}, function(err, posts){
    res.render("projects",{posts:posts});
    });
});

app.get("/projects/filter",function(req,res){
  let filter = String(Object.keys(req.query)[0]);
  if(filter=='All'){
    Project.find({}, function(err, posts){
      res.render("projects",{posts:posts});
      });
  }else{
    Project.find({tags:filter}, function(err, posts){
      res.render("projects",{posts:posts});
      });

  }
});

app.get("/projects/8744787",function(req,res){
  res.render("auth-projects");
});
app.get("/contact-success",function(req,res){
  res.render("email-success");
});
app.get("/contact-failure",function(req,res){
  res.render("email-failure");
});
// POST-PAGES--------------------------------------------------------------------------------------------------
app.post("/",async function(req,res){
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: Process.env.EMAIL,  //EMAIL
      pass: process.env.GMAIL_KEY, //KEY
    },
  })
  let mailOptions = {
    from: req.body.email, // sender address
    to: 'jmparvashah@gmail.com', // list of receivers
    subject: "New-contact: "+ req.body.email , // Subject line
    text: req.body.contenido, // plain text body
  }
  let info = await transporter.sendMail(mailOptions);
  if(info["response"].startsWith("250 2.0.0 OK")== true){
    res.redirect("/contact-success");
  }else{
    res.redirect("/contact-faliure");
    console.log(info);
  };
  
});

app.post("/projects/8744787",function(req,res){
  // SIMPLE AUTHENTICATION
let email = req.body.email;
let hash = crypto.createHash('md5').update(req.body.password).digest('hex');
if (process.env.SECRET_KEY === hash && process.env.EMAIL.toUpperCase() === email.toUpperCase()) {
  res.render("projects-compose");
} else {
  res.redirect("/projects/8744787");
}
});

app.post("/projects/compose",function(req,res){
  let projectTags = req.body.projectTags;
  let tags = projectTags.split(' ');
  let imgId = req.body.imageLink.slice(32,req.body.imageLink.indexOf("/",32));
  let imgLink = "https://drive.google.com/uc?export=view&id="+imgId;
  const post = new Project({
    title:req.body.projectTitle,
    des:req.body.projectBody,
    image: imgLink, 
    tags:tags,
    link:req.body.projectLink,
    view:req.body.viewLink,
  });
  post.save(function(err){
    if (!err){
        res.redirect("/projects");
    }
  });
});

// For testing purposes
// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
http.createServer(function(request,response){
  response.writeHead(200,{"Content-Type":"text/plain"})
  response.end("Hello World\n")
}).listen(process.env.PORT);