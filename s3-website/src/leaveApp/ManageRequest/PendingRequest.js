import Axios from "axios";
import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import configData from "../config.json";

const PendingRequests = () => {
  const { data, loading, get_user_info, token } = useContext(GlobalContext);
  // const [loading, setLoading] = useState(false);

  var item = JSON.parse(localStorage.getItem("users"));
  var get_mail = item && item.email;
  const approve_func = (val, token_data) => {
    // console.log(val);
    // var url = `https://${configData.APIDomain}.execute-api.${configData.Region}.amazonaws.com/prod/manualApproval`;
    // Axios({
    //   method: "POST",
    //   url,
    //   data: val,
    //   headers: {
    //     Authorization: `${token_data}`,
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // })
    //   .then((el) => {
    //     setTimeout(() => {
    //       get_user_info(get_mail, token_data);
    //     }, 1000);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    fetch(
      `https://${configData.APIDomain}.execute-api.${configData.Region}.amazonaws.com/production/manualApproval`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(val),
      }
    )
      .then((response) => response.json())
      .then((el) => {
        console.log("Success:", data);
        setTimeout(() => {
          get_user_info(get_mail, token_data);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <section className="mt-5 text-center">Loading...</section>;
  }
  return (
    <section className="table-responsive mt-4">
      <table className="table text-center table-borderless  table-hover">
        <thead className="table--head">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Reason</th>
            <th scope="col">Email</th>
            <th scope="col">Form</th>
            <th scope="col">To</th>
            <th scope="col">No of Days</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table--body text-capitalize">
          {data.pendingRequests &&
            data.pendingRequests.length > 0 &&
            data.pendingRequests.map((item, i) => {
              const { from, to, numberOfDays, email, reason, type } = item;

              return (
                <tr key={i} style={{ fontSize: 16 }}>
                  <td>{i + 1}</td>
                  <td className="text-info font-weight-bold">
                    <b>{reason}</b>
                  </td>
                  <td>{email}</td>
                  <td>{from}</td>
                  <td>{to}</td>
                  <td>{numberOfDays}</td>
                  <td>{type}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => approve_func(item, token)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default PendingRequests;
