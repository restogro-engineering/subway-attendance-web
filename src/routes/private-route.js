import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainContainer from "../container";
import { getOfflineData } from "../utils/offline-services";

const PrivateRoute = ({
  reloadPendingApprovals,
  setReloadPendingApprovals,
}) => {
  return getOfflineData("user") ? (
    <MainContainer
      reloadPendingApprovals={reloadPendingApprovals}
      setReloadPendingApprovals={setReloadPendingApprovals}
    >
      <Outlet />
    </MainContainer>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
