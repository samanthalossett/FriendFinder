//require the packages//
var express = require("express");
var path = require("path");
var bodyparser= require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

//use the parser thing to extract data from the body//
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.text());
app.use(bodyparser.json({ type: "application/vnd.api+json"}));

app.use(express.static("app/public"));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);



//keep at the end i think//
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
