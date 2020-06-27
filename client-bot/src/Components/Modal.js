import React, {useState} from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link, TextField, Button, Typography } from "@material-ui/core";
import {SignUp} from '../store/action/index'
import { useDispatch, useSelector } from 'react-redux'

export default function ModalFirstPage(props) {
  // console.log(props, "ini pros");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const message = useSelector((state) => state.error)
  const dispatch = useDispatch()


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
    // console.log(event.target)
    // console.log(name, value)
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmitModal = (event) => {
    event.preventDefault();
    if (
      !email ||
      !password ||
      !username ||
      !confirmPassword
    ) {
      setError("please fill all form :D");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      const payload = {
        email: email,
        password: password,
        username: username,
        confirmPassword: confirmPassword,
      };
      dispatch(SignUp(payload))
    }
  };

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
      "Don't have an account? Sign Up"
      </button> */}
      <p>
        Don't have an account? <Link onClick={(event) => handleOpen(event)}>Sign Up</Link>
      </p>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={props.classes.modal}
        open={open}
        onClose={(event) => handleClose(event)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={props.classes.paperModal}>
            <form
              className={props.classes.form}
              noValidate
              onSubmit={(event) => handleSubmitModal(event)}
            >
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              { error && <Typography component="h1" variant="h5">
                {error}
              </Typography>}
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
    </div>
  );
}
