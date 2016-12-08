var dateformat = require('dateformat');
var express = require('express');
var app = express();
var date;


app.get('/', function(req, res) {
     var html = "<h1>Timestamp Microservice<h1>" + 
        "<h2>Example Usage</h2>" +
        "<p>https://clever-git-alimacsmusings.c9users.io/8 December 2016</p>" +
        "<p>https://clever-git-alimacsmusings.c9users.io/1481155200</p><br>" +
        "<h2>Example output:</h2>" + 
        "<p>{ \"unix\": 1481155200, \"natural\": \"December 8, 2016\" }</p>";
 
     res.send(html);   
});


app.get('/:datestring', function(req, res){
    var dateStr = req.params.datestring;
    
    //Check if it is just numbers
    var reg = /^\d+$/;
    if(reg.test(dateStr)) {
        var unixtime = parseInt(dateStr, 10) * 1000;
        date = new Date(unixtime);
    } else if(isNaN(Date.parse(dateStr))){
        date = null;
    } else {
        date = new Date(dateStr);
    }
    
    var result;
	if(date===null || date===undefined ){
		result = makeNullDate();
	} else {
		result = makedate();
    } 
 
  	res.send(result);
});

function makedate(){
    return JSON.stringify({ unix: date.getTime()/1000, 
    	normal: dateformat(date, 'mmmm d, yyyy')});
}

function makeNullDate(){
    return JSON.stringify({ unix : null, normal : null });
}

app.listen(8080, function(){
	console.log('Timestamp app listening on port 8080')
});
