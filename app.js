// ----------required packages---------//
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

// new instance of express
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// API Key: 374832566f5d2f04e5eab7044e3ee001-us21
// List ID: 077c2912dd
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const email = req.body.newsemail;
  const data = {
    'members': [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  }
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/077c2912dd"
  const options = {
    method: "POST",
    auth: "akshita068:374832566f5d2f04e5eab7044e3ee001-us21"
  }
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})

app.post("/failure", function (req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000")
});