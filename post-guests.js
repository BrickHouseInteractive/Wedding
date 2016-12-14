var fs = require('fs');
var http = require('http');
var obj;

var postGuest = function(guest){
	
	jsonObject = JSON.stringify(guest);

	var postheaders = {
		'Content-Type' : 'application/x-www-form-urlencoded',
		'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
	};

	var options = {
		host: 'sarahanderik.ch',
		port: 80,
		path: '/_guests.php',
		method: 'POST',
		headers : postheaders
	};
	
	var post_req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('RESPONSE: ' + chunk);
		});
	})

	// post the data
	console.log("Writing guest: "+guest.fullname);
	post_req.write(jsonObject);
	post_req.end();

}

fs.readFile('guests.json', 'utf8', function (err, data) {
	if (err) throw err;
	obj = JSON.parse(data);
	for (var i = 0, len = obj.length; i < len; i++) {
		postGuest(obj[i]);
	}
});