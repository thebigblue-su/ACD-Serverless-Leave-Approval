import React from "react";
import { useLocation } from "react-router";
import PendingRequest from "./PendingRequest";
import AllRequest from "./AllRequests";

const RequestConditional = ({ data, getData }) => {
  const loc = useLocation();

  if (loc.pathname === "/pending-request") return <PendingRequest />;

  return <AllRequest data={data} getData={getData} />;
};

export default RequestConditional;
