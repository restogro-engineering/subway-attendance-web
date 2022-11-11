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
  const editHandler = () => {
    setEdit(true);
  };
  const deleteHandler = () => {
    setDel(true);
  };
  const editNameHandler = (event) => {
    setEditName(event.target.value);
  };
  const editEmailHandler = (event) => {
    setEditEmail(event.target.value);
  };
  const editResIdHandler = (event) => {
    setRestaurantId(event.target.value);
  };

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
  const userPayload = {
    name: editName,
    email: editEmail,
  };

  //Edit User
  const editUserHandler = () => {
    invokeApi(HTTP_METHODS.PATCH, `${HOSTNAME}${REST_URLS.EDIT_USER}${id}`, {
      ...userPayload,
    }).then((response) => {
      if (response.message) {
        toast.error(response.message);
      } else {
        loadData(filters);
        setEdit(false);
      }
    });
    setEdit(false);
  };
  //Delete User
  const deleteUserHandler = () => {
    invokeApi(
      HTTP_METHODS.DELETE,
      `${HOSTNAME}${REST_URLS.EDIT_USER}${id}`
    ).then((response) => {
      if (response.message) {
        toast.error(response.message);
      } else {
        loadData(filters);
        setDel(false);
      }
    });
  };
  //edit ResId
  const editRestaurantIdHandler = () => {
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.EDIT_RESTAURANT_ID}/${id}`,
      {
        restaurantId: restaurantId,
      }
    ).then((response) => {
      if (response.message) {
        toast.error(response.message, { autoClose: 2000 });
      } else {
        toast.success("Restaurant Id Updated Successfully", {
          autoClose: 2000,
        });
        loadData(filters);
        setEdit(false);
      }
    });
    setEdit(false);
  };
  let closeEditModal = () => {
    setEdit(false);
  };
  let closeDeleteModal = () => {
    setDel(false);
  };
  const confirmDelete = () => {
    if (modalType === "USER") {
      deleteUserHandler();
    }

    setDel(false);
  };
  return (
    <div>
      <Stack direction="row">
        <IconButton sx={{ pt: 0.5, pb: 0.5 }} onClick={editHandler}>
          <EditIcon id="edit" color="primary" />
        </IconButton>

        {/* <IconButton onClick={deleteHandler} id="delete" sx={{ p: 0 }}>
          <DeleteIcon className="deleteIcon" />
        </IconButton> */}
      </Stack>

      {edit && modalType === "USER" && (
        <CustomModal
          title="Edit User"
          contentClassName={{ headerBackgroundColor: "#008952" }}
          onClose={closeEditModal}
        >
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              id="name"
              sx={{ my: 1 }}
              label="Name"
              multiline
              onChange={editNameHandler}
              value={editName}
              size="small"
            />
            <TextField
              fullWidth
              id="email"
              sx={{ my: 1 }}
              label="Email"
              onChange={editEmailHandler}
              value={editEmail}
              type="email"
              size="small"
            />

            <Stack direction="row" spacing={2} sx={{ my: 2 }}>
              <Button
                variant="contained"
                size="medium"
                className="button-color"
                fullWidth
                onClick={editUserHandler}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="medium"
                className="outlined-btn"
                fullWidth
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </CustomModal>
      )}

      {del && (
        <CustomModal
          title="Confirm Delete"
          contentClassName={{ headerBackgroundColor: "#008952" }}
          onClose={closeDeleteModal}
        >
          <p>Are you sure ?</p>
          <Stack direction="row" spacing={2}>
            <Button
              className="outlined-btn"
              variant="outlined"
              size="medium"
              onClick={() => setDel(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={confirmDelete}
              size="medium"
            >
              Delete
            </Button>
          </Stack>
        </CustomModal>
      )}
      {edit && modalType === "DOCUMENT" && (
        <CustomModal
          title="Edit Restaurant Id"
          contentClassName={{ headerBackgroundColor: "#008952" }}
          onClose={closeEditModal}
        >
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              id="resId"
              sx={{ my: 1 }}
              label="Restaurant Id"
              onChange={editResIdHandler}
              value={restaurantId}
              size="small"
            />

            <Stack direction="row" spacing={2} sx={{ my: 2 }}>
              <Button
                variant="contained"
                className="button-color"
                fullWidth
                size="medium"
                onClick={editRestaurantIdHandler}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                className="outlined-btn"
                size="medium"
                fullWidth
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </CustomModal>
      )}
    </div>
  );
};
export default ActionIcons;
