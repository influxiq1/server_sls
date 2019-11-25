/**
 * Created by debasiskar on 07/09/19.
 */
const express = require('express')
const app = express()
/*const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))*/
//const helmet = require('helmet')
//app.use(helmet());


var bodyParser = require('body-parser');
app.use(
    bodyParser.json({
        parameterLimit: 10000000,
        limit: '90mb'
    })
);
app.use(
    bodyParser.urlencoded({
        parameterLimit: 10000000,
        limit: '90mb',
        extended: false})
);
//var EventEmitter = require('events').EventEmitter;
//const emitter = new EventEmitter();
//emitter.setMaxListeners(0)
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(function(req, res, next) {
    //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,access-token");
    next();
});



/*exports.handler = function(event, context) {

    var responseCode = 200;

    var response = {
        statusCode: responseCode,
        headers: {
            //"x-custom-header" : "my custom header value",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, PUT, OPTIONS, DELETE, GET",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept,access-token"
        },
        body: JSON.stringify(event)
    };

    context.succeed(response);
};*/

const initDatabases=require('./db');
const routes = require('./routes')
app.use('/', routes)

module.exports = app;