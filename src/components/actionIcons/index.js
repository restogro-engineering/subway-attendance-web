/** @format */
import React, { useState, useEffect, useCallback } from "react";
import "./index.scss";
import CustomModal from "../../core/modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { invokeApi, HTTP_METHODS } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";

const ActionIcons = ({
  id,
  loadData,
  name,
  email,
  filters,
  modalType,
  resId,
}) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [restaurantId, setRestaurantId] = useState(resId);


  useEffect(() => {
    if (name) {
      setEditName(name);
    }
    if (email) {
      setEditEmail(email);
    }
    if (resId) {
      setRestaurantId(resId);
    }
  }, [name, email, resId]);

  return (
    <div>
      <Stack direction="row">
        <IconButton sx={{ pt: 0.5, pb: 0.5 }} >
          <EditIcon id="edit" color="primary" />
        </IconButton>

        {/* <IconButton onClick={deleteHandler} id="delete" sx={{ p: 0 }}>
          <DeleteIcon className="deleteIcon" />
        </IconButton> */}
      </Stack>
    </div>
  );
};
export default ActionIcons;
