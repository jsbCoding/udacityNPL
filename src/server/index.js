projectData = {};

var path = require('path')
const express = require('express')

const dotenv = require('dotenv');
const fetch = require("node-fetch");
var bodyParser = require('body-parser');
var cors = require('cors');

const app = express()

dotenv.config();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(express.static(__dirname + 'userData'));
console.log(__dirname);

app.get(__dirname + 'userData', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

const textApi = process.env.API_KEY

//Create a post route (user's input)
app.get('/all', getData)
function getData (req, res){
    res.send(projectData);
    console.log(projectData)
}

// Setup post request
app.post("/postData", addData)
function addData(req, res){
    projectData = {
        agreement: req.body.agreement,
        confidence: req.body.confidence,
        score: req.body.score_tag
    }
    res.send(projectData);
    console.log(projectData);
  };