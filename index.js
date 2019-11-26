const express = require("express");
const app = express();
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

var bodyParser = require("body-parser");

app.use(bodyParser.text());

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.post("/dumpIntoDB", function(req, res, next) {
  data = req.body;
  console.log(data);
  let connection;
  async function insert() {
    try {
      // Get a non-pooled connection
      connection = await oracledb.getConnection(dbConfig);

      console.log("Connection was successful!");
      var sql = `INSERT INTO contacts values (:1, :2)`;
      bind = [1, data];
      var result = 0;

      connection.execute(sql, bind, { autoCommit: true }, function(
        err,
        result
      ) {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log("Data insert success");
      });
    } catch (err) {
      console.error(err);
    }
  }

  insert();

  next();
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("App is running now");
});
