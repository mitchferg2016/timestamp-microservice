// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// API endpoint to handle date and timestamp requests
app.get('/api/:date?', function (req, res) {
  let dateString = req.params.date;  // Get the date parameter
  let date;

  // If dateString is empty, use the current date
  if (!dateString) {
    date = new Date();
  } else if (isNaN(dateString)) {
    // Try to parse the dateString as a regular date
    date = new Date(dateString);
  } else {
    // If the dateString is numeric, treat it as a Unix timestamp
    date = new Date(parseInt(dateString));
  }

  // If the date is invalid, return an error message
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return both Unix timestamp and UTC string in the response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

