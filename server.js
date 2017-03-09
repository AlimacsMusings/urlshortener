
const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const validURL = require('valid-url');
const shortid = require('shortid');

const databaseName = "urlmicro";
const collectionName = "items";
const mongoURL = "mongodb://localhost:27017/" + databaseName;

var counter = 0;


function getShortID(url, item, isURL, res) {

    var ID = null;
    console.log("In getShortID " + url + " " + JSON.stringify(item));

    mongoClient.connect(mongoURL, function(err, db) {
       if (err) callback(err);

       //console.log("Connected to database " + databaseName);
       var coll = db.collection(collectionName);

       coll.find(item).toArray(function(err, documents) {
         if (err) callback(err);
         if(documents !== null && documents.length >=1) {
             console.log("DB retrieved : " + documents);
             if(isURL) {
               ID = documents[0].short;
               //console.log("Short ID from database = " + ID);
               res.send('<h1> The result is ' + ID + '</h1>');
             } else {
               ID = documents[0].url;
               //console.log("Redirecting to URL from database = " + ID);
               res.redirect(ID);
             }
         } else {
           console.log("Nothing brought back from database ");
           ID = insertNewDocument(coll, url, function(){
             db.close();
           });
          //res.send('<h1> The result is ' + ID + '</h1>');
         }
       });
       return ID;
    });

    var insertNewDocument = function(coll, url){
      var shortId = shortid.generate(url);
      var item = { "url" : url, "short" : shortId };
      console.log("NEW ID to save to database: " + JSON.stringify(item));

      coll.insertOne(item, function(err, data) {
         if(err) throw err;
         console.log("Saved to database " + JSON.stringify(data));
         //callback();
      });

      return shortId;
    };
}

app.get('/new/http://:path', function(req, res){
    var url = req.params.path;

    counter++;
    console.log("Received " + url + " count:" + counter);
    if(url.startsWith('www')) {
        url = "http://" + url;
    }

    if(validURL.isUri(url)) {
      item = {"url" : url};
      console.log("Getting shortid for URL " + url);
      getShortID(url, item, true, res);
    } else if (shortid.isValid(url)) {
      item = {"short" : url};
      console.log("Getting URL for shortid " + url);
      getShortID(url, item, false, res);

    } else {
      res.send("Invalid URL: " + url);
    }
});

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.listen(process.env.PORT || 8085, function(){
	console.log('URLShortener app listening on port 8085');
});
