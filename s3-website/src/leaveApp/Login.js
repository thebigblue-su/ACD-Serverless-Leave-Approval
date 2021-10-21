/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import jwt from "jsonwebtoken";
import configData from "./config.json";
import configData2 from "./config2.json";

console.log(configData);
console.log(configData.cognitoClient);

console.log("THIS IS CONFIG DATA 2");
console.log(configData2);

const cognitoUrl =
  `https://${configData.cognitoDomain}.auth.ap-south-1.amazoncognito.com/login?client_id=${configData.cognitoClient}&response_type=token&redirect_uri=${configData.cognitoRedirectUrl}`.toString();

const Login = () => {
  const history = useHistory();
  var getParams = window.location.hash;
  var getUrl = window.location.href;

  const checkLogin = (token) => {
    var check_access_1 = token && token.split("&")[0];
    var get_access_token =
      check_access_1 && check_access_1.replace("#id_token=", "");
    var decode2 = jwt.decode(get_access_token);

    localStorage.setItem("tokens", JSON.stringify(token));
    localStorage.setItem("users", JSON.stringify(decode2));
    history.replace("/", getUrl);
  };

  useEffect(() => {
    if (getParams) {
      checkLogin(getParams);
    }
    setTimeout(() => {}, 200);
  }, []);

  return (
    <div className="text-center">
      <button
        className="btn"
        style={{ fontSize: 30, marginTop: "15%", textTransform: "capitalize" }}
      >
        <a className="text-dark" href={cognitoUrl}>
          Login here
        </a>
      </button>
    </div>
  );
};

export default Login;
