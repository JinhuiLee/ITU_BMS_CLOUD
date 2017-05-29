var AWS = require("aws-sdk");
var sleep = require('system-sleep');


AWS.config.update({
  region: "us-west-2",
});

//use your own credentials here
// var credentials = new AWS.SharedIniFileCredentials({profile: 'itu_work'});
// AWS.config.credentials = credentials;

var docClient = new AWS.DynamoDB.DocumentClient();

var params;

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var location = ["wareHouse", "123 Main St.", "101 Sunset Ave.", "2711 1st St.", "110 White Ave.", "1234 Study Rd.", "4321 Learning Ave.", "2134 School Ln.", "1342 University Ct."];

for(var i = 0; i < 50; i++ ){
    sleep(3000);
    params = {
      TableName:"fooddeliversystem",
      Item:{
          "userId": getRandomArbitrary(1, 20),
          "timestp": new Date().getTime(),
          "packageId": getRandomArbitrary(1, 100),
          "temperature": getRandomArbitrary(2200, 3000)/100,
          "humidity": getRandomArbitrary(30, 40),
          "currLocation": location[i%9]
      }
    }

    console.log("Adding a new item...");
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        });
}

