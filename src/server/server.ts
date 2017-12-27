import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import * as express from "express";
import {NotesServer} from "./NotesServer";

const config = dotenv.config();

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL;

const app = express();

app.use("/odata", NotesServer.create());

app.listen(PORT,
    () => {
        console.log("Server host on port: " + PORT);
    });

/*
MongoClient.connect(DB_URL)
    .then(db => {
        console.log(db.listCollections());
        //NotesServer.create("/odata", PORT);
    })
    .catch(error => {
        console.log(error);
    });*/



