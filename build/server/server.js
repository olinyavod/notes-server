"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const mongodb_1 = require("mongodb");
const config = dotenv.config();
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL;
mongodb_1.MongoClient.connect(DB_URL)
    .then(db => {
    console.log(db.listCollections());
    //NotesServer.create("/odata", PORT);
})
    .catch(error => {
    console.log(error);
});
//# sourceMappingURL=server.js.map