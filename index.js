const express = require("express"); const app = express();

const port = 9999;

const scan = require('./scan')

app.get("/", (req, res) => {
    scan.scanBlockRange(15400666);
}); app.get("/seprate-thread", (req, res) => {
    res.send("Process function on seprate thread.");
}); app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});