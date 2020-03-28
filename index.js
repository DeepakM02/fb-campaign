const express = require("express");
const app = express();
const route = require('./route');
var bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

app.get("/", (req, res) =>
    res.send("Server is Working")
);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);


app.listen(port, () => {
    console.log('Server running on port ' + port)
});

module.exports = app;