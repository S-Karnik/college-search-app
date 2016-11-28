// Connect to the db
var databaseUrl = "mongodb://reader:macandcheese314@ds147797.mlab.com:47797/cheese"
var collections = ["colleges"]
var mongojs = require("mongojs")
var db = mongojs(databaseUrl, collections);

db.on('connect', function() {
    console.log("I'm in.")
})


db.colleges.find({
    $text: {
        $search: "MIT"
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

    console.log(err);
    schools.forEach(function(school) {
        console.log(school);
    });
});