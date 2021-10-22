// DynamoDB Connection
const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

// DynamoDB Tables
const userinfoTable = "console1";

// getUserInfo
const getUserInfo = async (userInfo) => {
  var params = {
    TableName: userinfoTable,
    Key: { email: userInfo },
  };
  const res = await ddb.get(params).promise();
  return res.Item;
};

exports.handler = async (event, context) => {
  console.log(event);
  // Local Testing
  let email = event.email;

  // Lambda Proxy Testing
  // let email = event.queryStringParameters.email;

  // API return statement
  return {
    statusCode: 200,
    body: JSON.stringify(await getUserInfo(email)),
  };

  // Step Function return statement
  //   return {
  //     foo: 2,
  //   };
};
