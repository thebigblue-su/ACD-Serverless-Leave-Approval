import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Axios from "axios";
import { GlobalContext } from "./Context";
import configData from "./config.json";

const CreateRequest = () => {
  const { token, get_user_info } = useContext(GlobalContext);
  const [value, setValue] = useState("");
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });
  const [noDays, setNoDays] = useState(0);
  const { startDate, endDate } = dates;

  useEffect(() => {
    if (startDate && endDate) {
      var from = moment(startDate);
      var to = moment(endDate);
      const noDays = to.diff(from, "days");
      noDays > 0 ? setNoDays(noDays) : setNoDays(0);
    }
  }, [startDate, endDate]);

  var item = JSON.parse(localStorage.getItem("users"));
  var decoded_mail = item && item.email;
  const submit_data = () => {
    if (noDays > 0 && value && token) {
      const data = {
        type: "requestLeave",
        email: decoded_mail,
        from: startDate,
        to: endDate,
        numberOfDays: noDays,
        leavesTaken: 11,
        reason: value,
      };
      const url = `https://${configData.APIDomain}.execute-api.ap-south-1.amazonaws.com/Prod/requestLeave`;
      Axios({
        method: "POST",
        url,
        data,
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((el) => {
          setDates({ startDate: "", endDate: "" });
          setValue("");
          setNoDays(0);
          setTimeout(() => {
            get_user_info(decoded_mail, token);
          }, 1000);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  return (
    <div className="col-md-9 create--leave">
      <span>
        {" "}
        <label>Start Date:</label>{" "}
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
        />
      </span>
      <span>
        {" "}
        <label>Last Date:</label>
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
        />
      </span>
      <span>
        {" "}
        <label>Comment:</label>{" "}
        <input
          style={{ width: 300 }}
          type="text"
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </span>
      <span className="text-center">
        {" "}
        <label>No of Days:</label> <br />{" "}
        <b style={{ fontSize: 28 }}>{noDays}</b>{" "}
      </span>
      &nbsp;
      <button className="btn btn-info" onClick={() => submit_data()}>
        <i className="fas fa-plus"></i>
      </button>
      <button
        className="btn btn-warning"
        onClick={() => {
          setDates({ endDate: "", startDate: "" });
          setValue("");
          setNoDays(0);
        }}
      >
        <i className="fas fa-redo-alt"></i>
      </button>
    </div>
  );
};

export default CreateRequest;
