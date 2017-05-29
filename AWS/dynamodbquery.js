var AWS = require("aws-sdk");



AWS.config.update({
  region: "us-west-2",
});

//use your own credentials here
// var credentials = new AWS.SharedIniFileCredentials({profile: 'itu_work'});
// AWS.config.credentials = credentials;

var docClient = new AWS.DynamoDB.DocumentClient();


var params = {
    TableName: "fooddeliversystem",
    //query key condition
    KeyConditionExpression: "#id = :idValue and #timestamp BETWEEN :tfrom AND :tto",
    //filter condition
    FilterExpression: "#h = :humidityValue and #t BETWEEN :tempfrom AND :tempto",
    
    ExpressionAttributeNames:{
        //query on patition key + sort key(conditioned)
        "#id": "packageId",//patition key
        "#timestamp":"timestp",//sort key
        
        //filter on the scan result
        "#h": "humidity",//filter on an attribute(can not do filter on keys)
        "#t": "temperature"
        },
        
    ExpressionAttributeValues: {
        //use event object to get parameter from http request 
        ":idValue":17,
        ":humidityValue":30,
        
        //search time range
        ":tfrom":1491379294800,//time in miliseconds, should use "new Date('2012.08.10').getTime()" to generate the number, date parameter should came from user request
        ":tto":1491379294820,
        
        //search temperature range
        ":tempfrom":20,
        ":tempto":30
        },
};
    
        
        
docClient.query(params, function(err, data) {
    if(err){//callback('Something went wrong');
        console.log(err);
    }else{
        //use call back to return data to front-end
        console.log(data);
    }
});