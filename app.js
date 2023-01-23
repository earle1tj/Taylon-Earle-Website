//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require('nodemailer');
require('dotenv').config()
const http = require('https')
const hostname = '127.0.0.1';


const path = require('path')

const PORT = 3000;

const app = express();


let transporter = nodemailer.createTransport({
    host: 'taylonearle.com',
    port: 465,
    secure: true,
    auth: {       
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,

    }
});





app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('home/taylsqya/app/', (req, res) => {
    res.render("home", {

    });

});

app.get('/', (req, res) => {
    res.render("home", {

    });

});


app.get('/developmentbeta', (req, res) => {
    res.render("home", {

    });

});



app.get('home/taylsqya/app/contact', (req, res) => {
    res.render("contact", {

    });

});


app.get('/contact', (req, res) => {
    res.render("contact", {

    });

});


app.post('home/taylsqya/app/contact', (req, res) => {

    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: 'info@taylonearle.com',
        subject: req.body.subject,
        text: "From: " + req.body.email + "\nName: " + req.body.name + "\nMessage: " + req.body.message + "\n" + req.body.authorization,
}



    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    })

    res.redirect("/");
    
})

app.post('/contact', (req, res) => {

    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: 'info@taylonearle.com',
        subject: req.body.subject,
        text: "From: " + req.body.email + "\nName: " + req.body.name + "\nMessage: " + req.body.message + "\n" + req.body.authorization,
}



    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    })

    res.redirect("/");
    
})
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
