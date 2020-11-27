const express = require("express");
const app = express();
const options = require("./query");
const url = "https://api.github.com/graphql";
const fetch = require("node-fetch");

const PORT = process.env.PORT || 500;

app.use(express.static("frontend"));

app.get("/", (req, res) => {
	res.sendFile("index.js");
});

app.get("/profiledata", (request, response) => {
  fetch(url, options)
    .then(res => response.json(res))
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
