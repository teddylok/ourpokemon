var mysql = require('mysql');

var mysql_connection = mysql.createClient({
    user: DB_USERNAME,
    password: DB_PASSWORD
});

mysql_connection.query('CREATE DATABASE ' + DB_DATABASE, function(err) {
    if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
        throw err;
    }
});

mysql_connection.end();