import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import moment from "moment";

const AllRequests = () => {
  const { data, loading } = useContext(GlobalContext);

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
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">No of Days</th>
            <th scope="col">Requested On</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody className="table--body text-capitalize">
          {data &&
            data.log &&
            data.log.map((items, i) => {
              const {
                reason,
                from,
                to,
                numberOfDays,
                dateTime,
                approvalStatus,
              } = items;
              return (
                <tr key={i}>
                  <td>
                    <b>{i + 1}</b>
                  </td>
                  <td>{reason}</td>
                  <td>{from}</td>
                  <td>{to}</td>
                  <td>{numberOfDays}</td>
                  <td>{moment(dateTime).format("DD-MM-YYYY")}</td>
                  <td
                    className={`${
                      approvalStatus === "Auto" ? "text-info" : "text-success"
                    }`}
                  >
                    <b>{approvalStatus}</b>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default AllRequests;
