/**
 * Connect to MySQL
 * 
 * SQL:

USE mysql;
CREATE DATABASE test;
CREATE USER 'test'@'localhost' IDENTIFIED BY 'test@123';
GRANT ALL PRIVILEGES ON test.* TO 'test'@'localhost' IDENTIFIED BY 'test@123';
USE test;
DROP TABLE IF EXISTS PRODUCTS;
CREATE TABLE PRODUCTS (
    ID MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    CODE VARCHAR(200) NOT NULL,
    NAME VARCHAR(200),
    PRIMARY KEY (ID)
)
SELECT * FROM PRODUCTS;
INSERT INTO PRODUCTS (CODE,NAME) VALUES ('code1', 'name1'), ('code2', 'name2'), ('code3', 'name3');

 *
 */
var mysql = require('mysql');

var connect = function getConnection() {
    var connect = mysql.createConnection({
        connectionLimit: 100,
        host: "localhost",
        database: "test",
        user: "test",
        password: "test@123",
        debug: false
    });
    return connect;
};

module.exports = connect;

/*
//
// test using command: node [path]\ConToMySQL.js
// BEGIN test
//
var con = mysql.createConnection({
    connectionLimit: 100,
    host: "localhost",
    database: "test",
    user: "test",
    password: "test@123",
    debug: false
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query("SELECT * FROM PRODUCTS", function(err, results) {
    if (err) throw err;
    console.log("Result: " + results.length);
    results.forEach(result => {
        console.log(result);
        // view detail
        //console.log(result.ID + "|" + result.CODE + "|" + result.NAME);
        // or
        //console.log(result['ID'] + "|" + result['CODE'] + "|" + result['NAME']);
    });
});

con.end();
// END test
*/