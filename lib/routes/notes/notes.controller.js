/**
 * Created by debasiskar on 07/09/19.
 */
// ./lib/routes/notes/notes.controller.js
const express = require('express');
var app = express();

app.use(function(req, res, next) {
    //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
    next();
});

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
app.set('superSecret', 'awslambdasecret'); // secret variable


const mongoose = require('mongoose');
const mongouriuri = "mongodb+srv://devel:DQvi4qOUXE32AUU4@cluster0-kdod7.mongodb.net/test?retryWrites=true&w=majority";
var MongoClient = require('mongodb').MongoClient;
let mongoDbConnectionPool = null;
let scalegridMongoURI = null;
let scalegridMongoDbName = null;
exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event));
    console.log('remaining time =', context.getRemainingTimeInMillis());
    console.log('functionName =', context.functionName);
    console.log('AWSrequestID =', context.awsRequestId);
    console.log('logGroupName =', context.logGroupName);
    console.log('logStreamName =', context.logStreamName);
    console.log('clientContext =', context.clientContext);
    // This freezes node event loop when callback is invoked
    context.callbackWaitsForEmptyEventLoop = false;
    var mongoURIFromEnv = mongouriuri;
    var mongoDbNameFromEnv = 'crm';
    if(!scalegridMongoURI) {
        if(mongoURIFromEnv){
            scalegridMongoURI = mongoURIFromEnv;
        } else {
            var errMsg = 'Scalegrid MongoDB cluster URI is not specified.';
            console.log(errMsg);
            var errResponse = prepareResponse(null, errMsg);
            return callback(errResponse);
        }
    }
    if(!scalegridMongoDbName) {
        if(mongoDbNameFromEnv) {
            scalegridMongoDbName = mongoDbNameFromEnv;
        } else {
            var errMsg = 'Scalegrid MongoDB name not specified.';
            console.log(errMsg);
            var errResponse = prepareResponse(null, errMsg);
            return callback(errResponse);
        }
    }
    handleEvent(event, context, callback);
};

function getMongoDbConnection(uri) {
    if (mongoDbConnectionPool && mongoDbConnectionPool.isConnected(scalegridMongoDbName)) {
        console.log('Reusing the connection from pool');
        return Promise.resolve(mongoDbConnectionPool.db(scalegridMongoDbName));
    }

    console.log('Init the new connection pool');

    return MongoClient.connect(uri, { poolSize: 10 }).then(dbConnPool => {
        mongoDbConnectionPool = dbConnPool;
        return mongoDbConnectionPool.db(scalegridMongoDbName);
    });
}

function getAlertForUser(dbConn, userId, context) {
    return dbConn.collection('useralerts').find({'userId': userId}).sort({$natural:1}).limit(1).toArray()
            .then(docs => { return prepareResponse(docs, null);})
            .catch(err => { return prepareResponse(null, err); });
}

function prepareResponse(result, err) {
    if(err) {
        return { statusCode:500, body: err };
    } else {
        return { statusCode:200, body: result };
    }
}


const uri = process.env['DB_' + process.env.NODE_ENV];


var MongoClient = require('mongodb').MongoClient;
var db;

app.get('/test-data',function (req,resp) {
    MongoClient.connect(uri, function(err, database) {
        if (err) throw err;

        db = database.db('crm');

        var collection = db.collection("test");
        collection.insert({
            "devi" : "durga",
    },function(err,item){
            database.close();
            resp.send(JSON.stringify({"status" : "success","data" : item}));
        });

    });

});

app.get('/get-request',function(req,res){
    res.send(JSON.stringify({"status" : "Hello World"}));
});


app.post('/sign-up', function(req, resp){
    // resp.send(JSON.stringify({"status":req.body}));
   

    MongoClient.connect(uri, function(err, database) {
        if (err) throw err;

        db = database.db('crm');

        var collection = db.collection("test");
        collection.insert([{
            "first_name" : req.body.first_name
        }],function(err,item){
            database.close();
            if (err) {
                resp.send(JSON.stringify({"status":"Error", "msg": err}))
            } else {
                resp.send(JSON.stringify({"status" : "success","data" : item}));   
            }
        });

    });
});

app.post('/find', function(req, resp){
    MongoClient.connect(uri, function(err, database) {
        if (err) throw err;

        db = database.db('crm');
        var collection = db.collection("test");
        collection.find({_id: new mongodb.ObjectID(req.body.id)}).toArray(function(err, item){
            database.close();
            if (err) {
                resp.send(JSON.stringify({'status':'Error'}));
            } else {
                resp.send(JSON.stringify({'ststus':'success', 'item':item}))
            }
        })

    })
})




module.exports = app;

