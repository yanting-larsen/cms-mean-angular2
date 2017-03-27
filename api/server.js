var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var app = express();
app.use(bodyParser.json());

var db;
var PAGES_COLLECTION = "pages";
var LANGUAGES_COLLECTION = "languages";
var SLIDES_COLLECTION = "slides";
var SETTINGS_COLLECTION = "settings";
var ADMINS_COLLECTION = "admins";

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection is ready");

  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App is running on port", port);
  });
});

//Generic error hander used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR:" + reason);
  res.status(code || 500).json({"error": message});
}

/* "/api/pages"
 * GET: finds all pages
 * POST: creates a new page
 */

app.get("/api/pages", function(req, res) {
  db.collection(PAGES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get pages.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/pages", function(req, res) {
  var newPage = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(PAGES_COLLECTION).insertOne(newPage, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create a new page.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/pages/:id"
 *    GET: find page by id
 *    PUT: update page by id
 *    DELETE: deletes contact by id
 */

 app.get("/api/pages/:id", function(req, res) {


 });

 app.put("/api/pages/:id", function(req, res) {

 });

 app.delete("/api/pages/:id", function(req, res){

 });
