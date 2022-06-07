const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
var bodyParser = require('body-parser')
const {options} = require('nodemon/lib/config');
const port=80;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('Dance Website',options));
app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'hello'));

app.get('/',(req,res) => {
    res.status(200).render('home.pug');
})

app.get('/aboutUs',(req,res) => {
    res.status(200).render('aboutUs.pug');
})

app.get('/courses',(req,res) => {
    res.status(200).render('courses.pug');
})

app.get('/contact',(req,res) => {
    res.status(200).render('contact.pug');
})

app.post('/contact',urlencodedParser,function(req,res){
    let name=req.body.name;
    let email=req.body.email;
    let message=req.body.message;

    let outputToWrite = `The name of the client is ${name}\nTheir email Id is: ${email}\nTheir Message is: ${message}\n\n\n`;
    fs.appendFileSync('./Messages.txt',outputToWrite)
    console.log("message recorded");
    res.status(200).render('contact.pug');
})

app.get('/join',(req,res) => {
    res.status(200).render('join.pug');
})

app.post('/join',urlencodedParser,function(req,res){
    let fname=req.body.Fname;
    let lname=req.body.Lname;
    let email=req.body.email;
    let add=req.body.add;
    let gen=req.body.gender;
    let age=req.body.age;
    let style=req.body.style;

   let outputToWrite = `Applicant Information:\nName: ${fname} ${lname}\nE-MAil: ${email}\nAddress: ${add}\nGender: ${gen}\nAge: ${age}\nStyle: ${style}\n\n`;
    fs.appendFileSync('./application.txt',outputToWrite);
    console.log("Application recorded");
    res.status(200).render('join.pug');
})

app.listen(port,()=>{
    console.log(`The server is running at port ${port}`);
})