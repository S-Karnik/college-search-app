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
    search_college = req.body.college;
    console.log(search_college)
    // CRITERIA:

    // Major 1
    // Major 2
    // Location
    // SAT
    // ACT
    // Gender
    // Cost
    // Average income 
    // Average graduating debt

    db.colleges.find({
        $and: [{
            "CITY": "Cambridge",
            "SAT_AVG": { $gte: 1400 } 
        }, {
            $text: {
                $search: search_college
            }
        }]
    }, {
        score: {
            $meta: "textScore"
        }
    }).sort({
        score: {
            $meta: "textScore"
        }
    }, function(err, schools) {
        //console.log(schools);
        schools.forEach(function(school) {
            console.log(school);
            school_data = []
            school_data.push(school.INSTNM);
            school_data.push(school.CITY);
            school_data.push(school.SAT_AVG);
            school_data.push(school.ZIP);
            school_data.push(school.ADM_RATE);
            school_data.push(school.TUITIONFEE_IN);
            results.push(school_data);
        });
        res.render("results.jade", {
            pageData: [results]
        });
        console.log(results)
    });
});

module.exports = router;