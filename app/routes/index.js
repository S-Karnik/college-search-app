var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	title = req.app.get('api_key');
	res.render("index.jade");
  	console.log("IP address: " + req.connection.remoteAddress);
});

router.get('/search', function(req, res, next) {
	title = req.app.get('api_key');
	res.render("search.jade");
  	console.log("IP address: " + req.connection.remoteAddress);
});

router.post('/search', function(req, res, next) {
	title = req.body.college;
	res.render("results.jade");
  	console.log("IP address: " + req.connection.remoteAddress);
});

module.exports = router;
