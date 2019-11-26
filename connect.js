"use strict";

const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

async function select() {
  let connection;

  try {
    // Get a non-pooled connection
    connection = await oracledb.getConnection(dbConfig);

    console.log("Connection was successful!");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        connection.execute(
          `SELECT *
           FROM contacts`,
          [],
          function(err, result) {
            if (err) {
              console.error(err.message);
              return;
            }
            console.log(result.rows);
          }
        );

        // await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
  //module.exports.connect = connection;
}
async function insert(data) {
  let connection;

  try {
    // Get a non-pooled connection
    connection = await oracledb.getConnection(dbConfig);

    console.log("Connection was successful!");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      var sql = `INSERT INTO contacts values (:1, :2)`;
      bind = [1, data];
      var result = 0;
      try {
        result = connection.execute(sql, bind, {});

        // await connection.close();
      } catch (err) {
        console.error(err);
      }
      console.log(`Result is {result}`);
    }
  }
  //module.exports.connect = connection;
}
