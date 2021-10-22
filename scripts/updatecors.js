const args = process.argv;
const AWS = require("aws-sdk");
const cloudformation = new AWS.CloudFormation();
var apigatewayv2 = new AWS.ApiGatewayV2();
const parameters = require("../parameters.json");

apigatewayv2.updateApi(
  {
    ApiId: output.APIDomain,
    CorsConfiguration: {
      AllowCredentials: true,
      AllowHeaders: ["'*'"],
      AllowMethods: ["'*'"],
      AllowOrigins: ["'https://" + output.CloudfrontUrl + "'"],
    },
  },
  function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  }
);
