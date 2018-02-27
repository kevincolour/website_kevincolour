const express = require('express');
const app = express();
const https = require('https');
const request = require('request');

const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const router = express.Router();

router.use(function(req, res, next) {
    // // res.header("Access-Control-Allow-Methods", "PUT")
     res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-type', 'application/json');
    // // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     // res.json({message: 'write worked'});
    next(); // make sure we go to the next routes and don't stop here
});

// router.get('/token', function(req, res) {
//     let clientSecret = '9a5c097853634f63bafd6613af5db317';
//     let clientId = 'a73c194f38364ed2acd27f5b1ccfcdbe';
//     let encodedData = Buffer.from(clientId + ':' + clientSecret).toString('base64');

    
//     url = 'https://accounts.spotify.com/api/token';
//     headers ={
//         'content-type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + encodedData,
//     };   
//     const reque = request.post({url: url, body: 'grant_type=client_credentials',
// headers: headers}, function(err, res2, body) {
//         // console.log(res);        
//         // console.log(res);        
//         if (!err && res2.statusCode === 200) {
        
//            res.status(200).json(JSON.parse(body).access_token);
           
//         }
//     });
    
//     // var xmlHttp = new XMLHttpRequest();
//     // xhr.setRequestHeader('Authorization','Basic' + encodedData);
 
//     //     xmlHttp.open( 'POST', theUrl, true );
//     //     XMLHttpRequest.send('grant_type=client_credentials');

//     //     console.log(xmlHttp.responseText);
//     //     console.log('here');
//     });



app.use('/', router);
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})
app.listen(port);
console.log('Magic happens on port ' + port);


// middleware to use for all requests

    
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


// more routes for our API will happen here


