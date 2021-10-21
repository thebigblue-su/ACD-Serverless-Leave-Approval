import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "./Context";

const Navbar = () => {
  const { removeTokens } = useContext(GlobalContext);
  const loc = useLocation();

  var item = JSON.parse(localStorage.getItem("users"));
  var decoded_username = item && item["cognito:username"];

  return (
    <nav className="navbar navbar-expand-lg shadow-lg">
      <div className="container-fluid">
        <p className="navbar-brand">
          <Link to="/pending-request" className="text-dark">
            Leave Apporval Application
          </Link>
        </p>
        {loc.pathname !== "/" ? (
          <article className="navbar--right-items">
            <Dropdown className="dropdown-section">
              <Dropdown.Toggle
                className="drop_down"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                role="button"
              >
                {decoded_username && decoded_username.substring(0, 1)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item style={{ cursor: "pointer" }}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ cursor: "pointer" }}
                  onClick={() => removeTokens()}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </article>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
