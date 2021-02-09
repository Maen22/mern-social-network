import { useState } from "react";
import { remove } from "./api-user";
import { isAuthenticated, clearJWT } from "../auth/auth-hepler";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteUser = ({ userId }) => {
  const [open, setOpen] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const jwt = isAuthenticated();

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const clickButton = () => {
    setOpen(true);
  };

  const deleteAccount = () => {
    remove({ userId }, jwt).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        clearJWT(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

DeleteUser.prototype = {
  userId: PropTypes.string.isRequired,
};

export default DeleteUser;
