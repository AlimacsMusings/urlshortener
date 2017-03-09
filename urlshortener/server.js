var express = require('express');
var app = express();


app.get('/', function(req, res) {
    
    res.send("Hello World!");
    
});

//https://URL
app.get('/new/https://:path', function(req, res){
    var url = req.params.path;
    console.log(url);
});

//http://URL
app.get('/new/http://:path', function(req, res){
    var url = req.params.path;
    
    
    
    //Get the URL
  
    console.log(url);
    
    //Check the URL if invalid respond ERROR msg
    
    
    //If URL OK
    
    //Connect to database
    //Does URL exist in database?
    //If Y get id 
    // else determine new id
    //Add to database
    
    //get return JSON
    //send back

    res.send(url);
    
});    

app.listen(process.env.PORT || 8080, function(){
	console.log('URLShortener app listening on port 8080');
});