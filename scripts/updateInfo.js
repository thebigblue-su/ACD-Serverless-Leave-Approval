const AWS = require("aws-sdk");
const cloudformation = new AWS.CloudFormation();
const parameters = require("../parameters.json");
const fs = require("fs");

cloudformation.describeStacks(
  {
    StackName: parameters.StackName,
  },
  function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      console.log(data);
      let output = {};

      response.Stacks[0].Parameters.forEach((param) => {
        output[param.ParameterKey] = param.ParameterValue;
      });
      response.Stacks[0].Outputs.forEach((param) => {
        output[param.OutputKey] = param.OutputValue;
      });
      fs.writeFile(
        "../s3-website/src/leaveApp/config2.json",
        JSON.stringify(output, null, 4),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
  }
);
