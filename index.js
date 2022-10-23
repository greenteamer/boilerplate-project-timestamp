// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  const numberRegex = new RegExp(/^(\d+)*$/);
  const formatRegex = new RegExp(/^(\d+)*-(\d+)*-(\d+)*$/);
  const dateStr = req.params.date;
  if (dateStr.match(numberRegex)) {
    const parsedDate = parseInt(dateStr);
    const unix = new Date(parsedDate).getTime();
    const utc = new Date(parsedDate).toUTCString();
    res.json({ unix, utc });
  }
  if (dateStr.match(formatRegex)) {
    const unix = new Date(dateStr).getTime();
    const utc = new Date(dateStr).toUTCString();
    res.json({ unix, utc });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
