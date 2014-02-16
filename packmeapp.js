var url = require('url');
// Express initialization
var express = require('express');
var app = express(express.logger());
app.use(express.bodyParser());
app.set('title', 'nodeapp');

// Mongo initialization
mongodb://<user>:<password>@alex.mongohq.com:10047/app14993966
var databaseUrl = process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL || "mongodb://localhost/scorebase/"
||"mongodb://brookelfnichols@gmail.com:hork-bajir#4@alex.mongohq.com:10047/app14993966"; 
var collections = ["highscores"]
var db = require("mongojs").connect(databaseUrl, collections);


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
}
//App config
app.configure(function() {
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret' }));
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});



app.get('/', function(req, res){

	res.set();
	res.sendfile();


});




