var AWS = require("aws-sdk");
var mysql = require("mysql");
var sleep = require('system-sleep');


AWS.config.update({
  region: "us-west-2",
});
var credentials = new AWS.SharedIniFileCredentials({profile: 'itu_work'});
AWS.config.credentials = credentials;

var docClient = new AWS.DynamoDB.DocumentClient();


// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "bms"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query('SELECT * FROM t_batterydata', function(err,rows){
    if(err) throw err;

    //console.log(rows);
    for(var i=0; i<rows.length; i++){
        if(i%20 == 0){
            sleep(5000);
        }
        console.log(rows[i]);
        var params = {
            TableName:"bmsdata",
            Item:{
                "batteryId": rows[i].battery_id,
                "date": rows[i].timestp.toString(),
                "id": rows[i].id,
                "ch_cur": rows[i].ch_cur,
                "dis_cur": rows[i].dis_cur,
                "temperature": rows[i].temperature,
                "battery_status": rows[i].battery_status,
                "charger_status": rows[i].charger_status,
                "SoC": rows[i].stateofcharge
            }
        }
        console.log(params);
        console.log("Adding a new item...");
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        });
    }

});

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});


