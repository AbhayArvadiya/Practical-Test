const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    api = require("./api/api"),
    db = require("./db");

require("dotenv").config()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/public", express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server started on port:", port));
api.setupAPIs(app);
