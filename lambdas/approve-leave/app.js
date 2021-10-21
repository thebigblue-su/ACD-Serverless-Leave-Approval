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
const totalLeaves = 30;

// updateUserInfo after approving leave
const updateUserInfo = async (params) => {
  let email = params.email;
  let numberOfDays = params.numberOfDays;
  delete params.email, delete params.type, delete params.leavesTaken;
  let ddbUpdateParams = {
    TableName: userinfoTable,
    Key: { email: email },
    UpdateExpression:
      "set #logs = list_append(:logs, #logs) add leavesTaken :leavesTaken",
    ExpressionAttributeNames: { "#logs": "log" },
    ExpressionAttributeValues: {
      ":logs": [params],
      ":leavesTaken": numberOfDays,
    },
  };

  await ddb.update(ddbUpdateParams).promise();
};

// Main Function
exports.lambdaHandler = async (event) => {
  console.log(event);

  event.dateTime = currentTime;

  // Auto Approve if < 2 days and
  if (
    event.numberOfDays <= 2 &&
    event.leavesTaken + event.numberOfDays <= totalLeaves
  ) {
    event.approvalStatus = "Auto";
    await updateUserInfo(event);
  } else if (event.approvalStatus == "Manual") {
    await updateUserInfo(event);
  }

  return {
    statusCode: 200,
  };
};
