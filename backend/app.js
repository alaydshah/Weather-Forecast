const express = require('express');
const bodyParser = require('body-parser');
const api_helper = require('./API_helper');
const app = express();
// var async  = require('express-async-await');
// var fetch = require('node-fetch');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});


app.get("/", function (req, res) {
    res.send("Server up and running!");
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
        endPoint = `https://maps.googleapis.com/maps/api/geocode/json?address=[${street},${city},${state}]&key=AIzaSyD4EIhwoiS105sjCDyxTZnmQgwkpLeyLdg`;
        const response = await api_helper.make_API_call(endPoint);
        console.log(response.status);
        if(response.status === 'ZERO_RESULTS'){
            res.send('Invalid Address');
        }
        console.log(response.results[0]);
        // let location = JSON.parse(response).GeocodeResponse.result.geometry.location;
        let location = response.results[0].geometry.location

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

app.get('/modal', async (req, res) => {

    let endPoint = '';
    console.log(req.query.latitude);
    console.log(req.query.longitude);
    console.log(req.query.timestamp);
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const tstamp = req.query.timestamp;
    endPoint = `https://api.darksky.net/forecast/67e818525b909c766c749bc9ef5bc9f0/${lat},${lon},${tstamp}`;
    const responseData = await api_helper.make_API_call(endPoint);
    console.log(responseData);
    res.send(responseData);
});

//Export
module.exports = app;


//Zero Response: ijhiuhp
