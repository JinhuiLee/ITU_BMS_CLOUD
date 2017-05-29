var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
});
var credentials = new AWS.SharedIniFileCredentials({profile: 'itu_work'});
AWS.config.credentials = credentials;

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "bmsdata",
    KeySchema: [       
        { AttributeName: "batteryId", KeyType: "HASH"},  //Partition key
        { AttributeName: "date", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "batteryId", AttributeType: "N" },
        { AttributeName: "date", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});