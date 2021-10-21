// DynamoDB Connection
const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

// DynamoDB Tables
const leavesTable = "LeaveTable";
const userinfoTable = "UserInfoTable";

// Constants
const currentTime = new Date(new Date().getTime() + 5.5 * 3600 * 1000)
  .toUTCString()
  .replace(" GMT", "");

// Leave Approval Request
const createLeaveApprovalRequest = async (params) => {
  params.leaveData.token = params.token;
  params.leaveData.id = Date.now().toString();
  return await ddb
    .put({
      TableName: leavesTable,
      Item: params.leaveData,
    })
    .promise();
};

exports.lambdaHandler = async (event) => {
  console.log(event);
  await createLeaveApprovalRequest(event);
};
