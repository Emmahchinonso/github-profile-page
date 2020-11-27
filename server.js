const express = require("express");
const app = express();
const options = require("./query");
const url = "https://api.github.com/graphql";
const fetch = require("node-fetch");
require('dotenv').config()

const PORT = process.env.PORT || 500;

app.use(express.static("frontend"));

app.get("/", (req, res) => {
	res.sendFile("index.js");
});

app.get("/profiledata", (request, response) => {
  fetch(url, options)
    .then(res => res.json())
    .then(json => response.json(json))
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
