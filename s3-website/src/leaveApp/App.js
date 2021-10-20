import React from "react";
import Navbar from "./Navbar";
import "./index.css";
import Home from "./Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Error from "./Error";
import CreateRequest from "./CreateRequest";
import Login from "./Login";
import { ProtectedRoute, SignInRoute } from "./RoutesProtected";
import { Context } from "./Context";

const App = () => {
  return (
    <BrowserRouter>
      <Context>
        <Navbar />
        <Switch>
          <SignInRoute exact path="/" component={Login} />
          <ProtectedRoute exact path="/all-request" component={Home} />
          <ProtectedRoute path="/pending-request" component={Home} />
          <Route path="/create-request" component={CreateRequest} />
          <Route path="*" component={Error} />
        </Switch>
      </Context>
    </BrowserRouter>
  );
};

export default App;
