var express = require('express');
var app = express();

app.use(express.static(__dirname + '/views'));

app.use('/public', express.static(__dirname + '/public/'));

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));

app.get('/', function(req, res) {
	res.render('index.html');
});

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
