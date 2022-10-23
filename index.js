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
app.get("/api/", function (req, res) {
  console.log("is empty string");
  const unix = new Date().getTime();
  const utc = new Date().toUTCString();
  console.log({ unix, utc });
  res.json({ unix, utc });
});

app.get("/api/:date", function (req, res) {
  const numberRegex = new RegExp(/^(\d+){1,}$/);
  const dateStr = req.params.date;
  console.log("dateStr: ", dateStr);
  if (!isNaN(Date.parse(dateStr))) {
    console.log("parsed");
    const unix = new Date(dateStr).getTime();
    const utc = new Date(dateStr).toUTCString();
    res.json({ unix, utc });
  } else if (dateStr.match(numberRegex)) {
    console.log("reg match");
    const parsedDate = parseInt(dateStr);
    const unix = new Date(parsedDate).getTime();
    const utc = new Date(parsedDate).toUTCString();
    res.json({ unix, utc });
  } else {
    console.log("error");
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
