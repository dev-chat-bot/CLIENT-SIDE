import React, { useState, forwardRef, useImperativeHandle } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { TextField, Button, Typography } from "@material-ui/core";
import { SignUp } from "../store/action/index";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import {
  setEmail,
  setUsername,
  setPassword,
  setConfirmPassword,
} from "../store/action/index";


const ModalFirstPage = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const username = useSelector((state) => state.username);
  const confirmPassword = useSelector((state) => state.confirmPassword);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      openModal: () => handleOpen(),
      close: () => handleClose(),
    };
  });

  // function Modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // ==================

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        dispatch(setEmail(value));
        break;
      case "username":
        dispatch(setUsername(value));
        break;
      case "password":
        dispatch(setPassword(value));
        break;
      case "confirmPassword":
        dispatch(setConfirmPassword(value));
        break;
      default:
        break;
    }
  };

  const handleSubmitModal = (event) => {
    event.preventDefault();
    if (!email || !password || !username || !confirmPassword) {
      setError("please fill all field");
      // if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
      // }
    } else {
      const payload = {
        email: email,
        password: password,
        username: username,
        confirmPassword: confirmPassword,
      };
      dispatch(SignUp(payload));
    }
  };

  if (open) {
    return ReactDOM.createPortal(
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={props.classes.modal}
          open={open}
          onClose={(event) => handleClose(event)}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={open}>
            <div className={props.classes.paperModal}>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {error ? (
                  <Typography component="h1" variant="h5">
                    {error}
                  </Typography>
                ) : (
                  <Typography>
                    {" "}
                    Welcome to Hinata's Home. please to register to come in{" "}
                  </Typography>
                )}
              </div>
              <form
                className={props.classes.form}
                noValidate
                onSubmit={(event) => handleSubmitModal(event)}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(event) => handleChange(event)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={username}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={(event) => handleChange(event)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => handleChange(event)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={confirmPassword}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onChange={(event) => handleChange(event)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={props.classes.submit}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>,
      document.getElementById("modal-root")
    );
  }

  return null;
});

export default ModalFirstPage;
