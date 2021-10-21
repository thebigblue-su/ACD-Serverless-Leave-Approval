const args = process.argv;
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
      let output = {
        Region: parameters.Region,
      };

      data.Stacks[0].Parameters.forEach((param) => {
        output[param.ParameterKey] = param.ParameterValue;
      });
      data.Stacks[0].Outputs.forEach((param) => {
        output[param.OutputKey] = param.OutputValue;
      });
      fs.writeFile(
        args[2] + "/s3-website/src/leaveApp/config.json",
        JSON.stringify(output, null, 4),
        (err) => {
          if (err) console.log(err);
        }
      );
      fs.readFile(
        args[2] + "/s3-website/src/leaveApp/config2.json",
        "utf8",
        function (err, data) {
          // Display the file content
          console.log(data);
        }
      );
    }
  }
);
