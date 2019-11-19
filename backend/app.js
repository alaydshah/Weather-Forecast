const express = require('express');
const bodyParser = require('body-parser');
const api_helper = require('./API_helper');
const app = express();
var async  = require('express-async-await');
var fetch = require('node-fetch');
let xmlParser = require('xml2json');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS'
    );

    // // TODO: remove this line
    // res.send('Hello from exprss');

    next();
});

// app.get((req, res, next) => {

//     res.send('Server up and running!');

//     // next();
// });

app.get("/", function (req, res) {
    res.send("Server up and running!");
});

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log('Hi There');
    console.log(post);
    res.status(201).json({
        message: "Post addedd successfully"
    });
});

app.get('/search', async (req, res, next) => {

    let endPoint = '';
    let lat = req.query.lat;
    let lng = req.query.lon;

    if(req.query.currLoc === 'false'){
        console.log(req.query)
        let street = req.query.street;
        let city = req.query.city;
        let state = req.query.state;
        endPoint = `https://maps.googleapis.com/maps/api/geocode/xml?address=[${street},${city},${state}]&key=AIzaSyD4EIhwoiS105sjCDyxTZnmQgwkpLeyLdg`;
        const response = await api_helper.make_API_call(endPoint);
            // .then(
            //     response => {
            //         console.log(json(response))
            //     })
            // .catch(error => {
            //     res.send(error)
            // })
        // console.log(JSON.parse(xmlParser.toJson(response)).GeocodeResponse.result.geometry.location);
        let location = JSON.parse(xmlParser.toJson(response)).GeocodeResponse.result.geometry.location;

        lat = location.lat;
        lng = location.lng;

        console.log(endPoint);
    }
    endPoint = `https://api.darksky.net/forecast/67e818525b909c766c749bc9ef5bc9f0/${lat},${lng}`;
    console.log(endPoint);
    const responseData = await api_helper.make_API_call(endPoint);
    console.log(responseData);
    res.send(responseData);
});

//Export
module.exports = app;
