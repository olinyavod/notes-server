import * as express from "express";

const port = 8000;
const app = express();

app.listen(port,
    () => {
        console.log("Server listen port: " + port);
    });