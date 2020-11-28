const express = require("express");
const app = express();
const query = require("./query");
const url = "https://api.github.com/graphql";
const fetch = require("node-fetch");
require("dotenv").config();

console.log(process.env);

const PORT = process.env.PORT || 500;

const ACCESS_TOKEN = process.env.GITHUB_TOKEN;

const body = JSON.stringify(query);

const options = {
	method: "post",
	headers: {
		"Content-Type": "application/json",
		Authorization: `bearer ${ACCESS_TOKEN}` ,
	},
	body: body,
};

app.use(express.static("frontend"));

app.get("/", (req, res) => {
	res.sendFile("index.js");
});

app.get("/profiledata", (request, response) => {
	fetch(url, options)
		.then((res) => res.json())
		.then((json) => response.json(json));
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
