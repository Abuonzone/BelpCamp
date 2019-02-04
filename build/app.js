"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require("./routes/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect("mongodb://localhost/belpcamp", { useNewUrlParser: true }, function () {
    console.log("Database Connected Successfully");
});

var app = (0, _express2.default)(),
    port = 3000,
    hostname = "localhost";

app.use(_express2.default.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_index2.default);

app.listen(port, hostname, function () {
    console.log("Server listening at https://" + hostname + ":" + port);
});