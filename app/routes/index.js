var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	title = req.app.get('api_key');
	res.render("index.jade");
  console.log("IP address: " + req.connection.remoteAddress);
});

module.exports = router;
