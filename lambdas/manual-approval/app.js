const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });
const stepfunctions = new AWS.StepFunctions();
const ddb = new AWS.DynamoDB.DocumentClient();

// DynamoDB Tables
const leavesTable = "LeaveTable";
const userinfoTable = "UserInfoTable";

const approveLeave = async (leaveData) => {
  let token = leaveData.token;
  let id = leaveData.id;
  leaveData.approvalStatus = "Manual";
  delete leaveData.id, delete leaveData.token;

  // send task success to step function
  await stepfunctions
    .sendTaskSuccess({
      output: JSON.stringify(leaveData),
      taskToken: token,
    })
    .promise();

  // delete entry from pending leave requests
  await ddb
    .delete({
      TableName: leavesTable,
      Key: { id: id },
    })
    .promise();
};

exports.lambdaHandler = async (event) => {
  console.log(event);

  await approveLeave(event);

  return { statusCode: 200 };
};
