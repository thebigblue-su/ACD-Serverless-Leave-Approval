// DynamoDB Connection
const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });
const ddb = new AWS.DynamoDB.DocumentClient();

// DynamoDB Tables
const leavesTable = "LeaveTable";
const userinfoTable = "UserInfoTable";

// createUserInfo for first time users
const createUserInfo = async (userInfo) => {
  var params = {
    TableName: userinfoTable,
    Item: userInfo,
  };
  let res = await ddb.put(params).promise();
};

exports.lambdaHandler = async (event, context) => {
  console.log(event);
  try {
    await createUserInfo({
      email: event.request.userAttributes.email,
      log: [],
      leavesTaken: 0,
    });
  } catch (err) {
    console.log(err);
    return err;
  }

  return event;
};
