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
const getTextInfo = async(req, res) => {
    const searchUrl = req.body.formText
    console.log ('!');
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${textApi}&url=${searchUrl}&lang=en`);
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log("error", error);
    }
}
//Create a post route (user's input)
app.post('http://localhost:8080/userData',getTextInfo);