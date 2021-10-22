const AWS = require("aws-sdk");
const stepfunctions = new AWS.StepFunctions();
const ddb = new AWS.DynamoDB.DocumentClient();

// DynamoDB Tables
const leavesTable = process.env.leavesTable;
const userinfoTable = process.env.userinfoTable;

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
  event = JSON.parse(event.body);
  await approveLeave(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ Success: "true" }),
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
  };
};
