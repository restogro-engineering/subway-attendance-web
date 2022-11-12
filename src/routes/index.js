import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./private-route";
import { Login } from "../components/login";
import Attendance from "../components/attendance";
const AppRoutes = () => {
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
            <Route exact path="/" element={<Attendance />}></Route>

          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
