// DynamoDB Connection
const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

// DynamoDB Tables
const leavesTable = "LeaveTable";
const userinfoTable = "UserInfoTable";

// getUserInfo
const getUserInfo = async (userInfo) => {
  var params = {
    TableName: userinfoTable,
    Key: { email: userInfo },
  };
  const res = await ddb.get(params).promise();
  return res.Item;
};

// getPendingRequests
const getPendingRequests = async () => {
  var params = {
    TableName: leavesTable,
  };
  const res = await ddb.scan(params).promise();
  return res.Items;
};

exports.lambdaHandler = async (event, context) => {
  console.log(event);
  try {
    let response;

    response = await getUserInfo(event.email);
    response.pendingRequests = await getPendingRequests();

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
