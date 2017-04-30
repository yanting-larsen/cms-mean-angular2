var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));

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

//admins

/* "/api/admins"
 * GET: finds all admins
 * POST: creates a new admin
 */

 app.get("/api/admins", function(req, res) {
   db.collection(ADMINS_COLLECTION).find({}).toArray(function(err, docs) {
     if (err) {
       handleError(res, err.message, "Failed to get admins");
     } else {
       res.status(200).json(docs);
     }
    });
 });

 app.post("/api/admins", function(req, res) {
   var newAdmin = req.body;

   if (!req.body.userName) {
     handleError(res, "Invalid user input", "Must provide an user name.", 400);
   }

   db.collection(ADMINS_COLLECTION).insertOne(newAdmin, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to create a new admin.");
     } else {
       res.status(201).json(doc.ops[0]);
     }
   });
 });

 /*  "/api/admins/:id"
  *    GET: find admin by id
  *    PUT: update admin by id
  *    DELETE: deletes admin by id
  */

 app.get("/api/admins/:id", function(req, res) {
   db.collection(ADMINS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to get admin");
     } else {
       res.status(200).json(doc);
     }
   });
 });

 app.put("/api/admins/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(ADMINS_COLLECTION).updateOne({_id: new ObjectID(req.params.id) }, updateDoc, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update admin");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    });
  });

  app.delete("/api/admins/:id", function(req, res){
    db.collection(ADMINS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete admin");
      } else {
        res.status(200).json(req.params.id);
      }
    });
  });


// pages

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
  db.collection(PAGES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get page");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/pages/:id", function(req, res) {
   var updateDoc = req.body;
   delete updateDoc._id;

   db.collection(PAGES_COLLECTION).updateOne({_id: new ObjectID(req.params.id) }, updateDoc, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to update page");
     } else {
       updateDoc._id = req.params.id;
       res.status(200).json(updateDoc);
     }
   });
 });

 app.delete("/api/pages/:id", function(req, res){
   db.collection(PAGES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
     if (err) {
       handleError(res, err.message, "Failed to delete page");
     } else {
       res.status(200).json(req.params.id);
     }
   });
 });

//settings

/*  "/api/settings"
 *    GET: get settings
 *    PUT: update settings
 */

app.get("/api/settings", function(req, res) {
  db.collection(SETTINGS_COLLECTION).findOne({}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get settings");
    } else {
      if (doc === null) {
        doc = {};
      }

      res.status(200).json(doc);
    }
  });
});

app.put("/api/settings", function(req, res) {
   var updateDoc = req.body;

   db.collection(SETTINGS_COLLECTION)
     .updateOne({}, updateDoc, { upsert: true }, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to update settings");
     } else {
       res.status(200).json(updateDoc);
     }
   });
 });

//slides

/* "/api/slides"
 * GET: finds all slides
 * POST: creates a new slide
 */

app.get("/api/slides", function(req, res) {
  db.collection(SLIDES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get slides.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/slides", function(req, res) {
  var newPage = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(SLIDES_COLLECTION).insertOne(newPage, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create a new slide.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/slides/:id"
 *    GET: find slide by id
 *    PUT: update slide by id
 *    DELETE: deletes slide by id
 */

app.get("/api/slides/:id", function(req, res) {
  db.collection(SLIDES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get slide");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/slides/:id", function(req, res) {
   var updateDoc = req.body;
   delete updateDoc._id;

   db.collection(SLIDES_COLLECTION).updateOne({_id: new ObjectID(req.params.id) }, updateDoc, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to update slide");
     } else {
       updateDoc._id = req.params.id;
       res.status(200).json(updateDoc);
     }
   });
 });

 app.delete("/api/slides/:id", function(req, res){
   db.collection(SLIDES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
     if (err) {
       handleError(res, err.message, "Failed to delete slide");
     } else {
       res.status(200).json(req.params.id);
     }
   });
 });
