const fs = require("fs");

module.exports = {  
  "development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PW,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "testdb",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  
  "production": {
    "dialect": "mysql",
    "JAWSDB_HOST": process.env.JAWSDB_HOST,
    "JAWSDB_USER": process.env.JAWSDB_USER,
    "JAWSDB_PW": process.env.JAWSDB_PW,
    "JAWSDB_DB": process.env.JAWSDB_DB
  } 
};