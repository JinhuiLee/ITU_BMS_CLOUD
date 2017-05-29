//mongodb connector
const mongojs = require('mongojs');

//mySQL connector
const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '1234',
    database: 'db_bms'

});

//logger
const winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'bms.log' })
  ]
});


//get unsynchronized data from mySQL database sorted by timestp
var sql = 'SELECT * FROM db_bms.t_batterydata order by timestp desc';
connection.query(sql, (err, data, fields) => {
    if (err) {
        console.log(err);
    } else {
        console.log('data' : data);
    }
});
