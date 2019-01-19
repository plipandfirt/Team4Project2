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
    "use_env_variable": "JAWSDB_URL",
    "username": process.env.JAWSDB_USER,
    "password": process.env.JAWSDB_PW,
    "database": process.env.JAWSDB_DB,
    "host": process.env.JAWSDB_HOST,
    "dialect": "mysql"
  } 
};