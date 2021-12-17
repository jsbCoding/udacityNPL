var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
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

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/userData', async(req, res) => {
    console.log ('!');
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&url=${req.body.input}`);
    console.log(response);
    try {
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log("error", error);
    }
})
