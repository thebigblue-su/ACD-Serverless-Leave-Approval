import Axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import configData from "./config.json";
const GlobalContext = createContext();

const Context = ({ children }) => {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch_token = () => {
    var item_tokens = JSON.parse(localStorage.getItem("tokens"));
    var get_token = item_tokens && item_tokens.split("&")[0];
    var get_id_token = get_token && get_token.replace("#id_token=", "");
    setToken(get_id_token);
  };

  var item = JSON.parse(localStorage.getItem("users"));
  var get_mail = item && item.email;

  const get_user_info = async (mail, token_data) => {
    setLoading(true);
    const url = `https://${configData.APIDomain}.execute-api.${configData.Region}.amazonaws.com/prod/getUserInfo`;
    Axios({
      method: "POST",
      url,
      data: { email: mail },
      headers: {
        Authorization: `${token_data}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((el) => {
      setLoading(false);
      if (el.data) setData(el.data);
      else setData([]);
    });
  };

  useEffect(() => {
    fetch_token();
    if (get_mail && token) {
      get_user_info(get_mail, token);
    }
  }, [get_mail, token]);

  const removeTokens = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("users");
    window.location.reload();
  };

  return (
    <GlobalContext.Provider
      value={{
        removeTokens,
        token,
        data,
        loading,
        get_user_info,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, Context };
