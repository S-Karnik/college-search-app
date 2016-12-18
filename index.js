var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index.jade");
    console.log("IP address: " + req.connection.remoteAddress);
});

router.get('/search', function(req, res, next) {
    res.render("search.jade");
    console.log("IP address: " + req.connection.remoteAddress);
});

router.post('/search', function(req, res, next) {
	var results = []
    console.log("IP address: " + req.connection.remoteAddress);
    db = req.app.get("db")
    college = req.body.college;
    console.log(college)
    db.colleges.find({
        $text: {
            $search: college  
        }
    }, {
        score: {
            $meta: "textScore"
        }
    }).sort({
        score: {
            $meta: "textScore"
        }
    }, function(err, schools) {
        console.log(schools);
        // schools.forEach(function(school) {

        // 	console.log(school);
        // 	results.push(school)
        // });
        schools.forEach(function(school) {

            // console.log(school.INSTNM);
            results.push(school.INSTNM)

            // console.log(school.CITY);
            results.push(school.CITY)

            // console.log(school.STABBR);
            results.push(school.STABBR)

            // console.log(school.ZIP);
            results.push(school.ZIP)

            // console.log(school.ADM_RATE);
            results.push(school.ADM_RATE)

            // console.log(school.SAT_AVG);
            results.push(school.SAT_AVG)

            // console.log(school.ACTCMMID);
            results.push(school.ACTCMMID)

            // console.log(school.TUTIONFEE_IN);
            results.push(school.TUITIONFEE_IN)
        })
    	res.render("results.jade", {pageData[0][0]: [results]});
    	// console.log(results[0][0])
    });
});

module.exports = router;