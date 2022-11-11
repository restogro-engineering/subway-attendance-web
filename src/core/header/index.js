import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, ListItemIcon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { NotificationsNone } from "@material-ui/icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import "./index.scss";
import logo from "../../resources/images/logo.png";
import { clearOfflineData, getOfflineData } from "../../utils/offline-services";
import SideMenu from "../side-menu";
import Badge from "@mui/material/Badge";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
const Header = ({ reloadPendingApprovals, setReloadPendingApprovals }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [unapprovedFormsCount, setunapprovedFormsCount] = useState(0);
  const loadData = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.UNAPPROVED_FORMS}`,
      null,
      { page: 1, limit: 1, sortBy: "-createdAt" }
    )
      .then((response) => {
        const count = response?.totalResults || 0;
        setunapprovedFormsCount(count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (reloadPendingApprovals) {
      setReloadPendingApprovals(false);
      loadData();
    }
  }, [reloadPendingApprovals]);

  useEffect(() => {
    let user = getOfflineData("user");
    setUserDetails(user);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    clearOfflineData("user");
    navigate("/login");
  };
  return (
    <div className="header-container">
      <div className="logo-con">
        <SideMenu />
        <img className="logo" src={logo} />
      </div>
      <div className="endLoginContainer">
        <Badge
          className="notification-icon"
          badgeContent={`${unapprovedFormsCount}`}
          color="primary"
        >
          <NotificationsNone onClick={() => navigate("/approval")} className="main-notification-icon" />
        </Badge>

        <div className="menu">
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
          <Button
            type="small"
            variant="text"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {userDetails.name}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
