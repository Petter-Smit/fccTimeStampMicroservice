// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  let input = req.params.date;
  
  if (req.params.date === undefined) { // if no date parameter
    let unix = new Date().getTime();
    let dateobj = new Date().toUTCString();
    res.json({"unix": unix, "utc": dateobj});

  } else if (Date.parse(input)) { // if date format
    let dateobj = new Date(input);
    let unix = dateobj.getTime();
    res.json({"unix": unix, "utc": dateobj.toUTCString()});

  } else if (parseInt(input)) {   // if unix format
    let unix = new Date(parseInt(input)).getTime();
    let dateobj = new Date(parseInt(input));
    res.json({"unix": unix, "utc": dateobj.toUTCString()});
  }
  else {
    res.json({ error : "Invalid Date" });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
