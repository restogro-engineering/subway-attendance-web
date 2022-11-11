import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./private-route";
import { Login } from "../components/login";

const AppRoutes = () => {
  const [reloadPendingApprovals, setReloadPendingApprovals] = useState(false);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute

              />
            }
          >

          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
