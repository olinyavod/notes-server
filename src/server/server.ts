import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import NotesServer from "./NotesServer";

const config = dotenv.config();

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL;

MongoClient.connect(DB_URL)
    .then(db => {
        console.log(db.listCollections());
        //NotesServer.create("/odata", PORT);
    })
    .catch(error => {
        console.log(error);
    });



