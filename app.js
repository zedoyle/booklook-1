var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var pshell = require('python-shell');
var filesystem = require('fs');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/views'));

app.use(bodyparser.urlencoded({ extended: false }));

app.use('/public', express.static(__dirname + '/public/'));

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));

app.get('/', function(req, res) {
	res.render('index.html');
});

app.post('/sendquery', function(req, res) {
	var fname='placeholder.json';
	var data="";
	var the_query = req.body.query;
	var jsonfile = null;
	//pshell.run('placeholder.py ', function (err) {
	//	if (err) throw err;
	//});
	filesystem.stat(fname, function(error, stats){
		filesystem.open(fname,"r",function (error, fd){
			var buffer = new Buffer(stats.size);
			filesystem.read(fd, buffer, 0, buffer.length, null,
				function(error, bytesRead, buffer){
				//data = buffer.toJSON();
				//console.log("DATA:"+JSON.stringify(data));
				var filestringed = buffer.toString();
				console.log("BUFFER:"+filestringed);
				jsonfile = JSON.parse(filestringed);
				console.log(jsonfile);
				//console.log(buffer)
			});
			//console.log(error)
		});
		//console.log(error)
	});
	app.render('results',{jsonobj: jsonfile},function(err, html){
		res.send(html);
	});
});

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
