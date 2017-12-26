"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var port = 8000;
var app = express();
app.listen(port, function () {
    console.log("Server listen port: " + port);
});
