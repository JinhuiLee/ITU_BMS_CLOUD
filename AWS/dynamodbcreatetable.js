var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
});
//use your own credentials here
// var credentials = new AWS.SharedIniFileCredentials({profile: 'itu_work'});
// AWS.config.credentials = credentials;

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "fooddeliversystem",
    KeySchema: [       
        { AttributeName: "packageId", KeyType: "HASH"},  //Partition key
        { AttributeName: "timestp", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "packageId", AttributeType: "N" },
        { AttributeName: "timestp", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});