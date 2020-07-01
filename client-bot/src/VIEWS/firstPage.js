import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Card,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { makeStyles } from "@material-ui/core/styles";
import ModalFirstPage from "../Components/ModalFirstPage";
import { GitHub } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { SignIn, loginGoogle } from "../store/action/index";
import { useHistory } from "react-router-dom";
import { setUsername, setPassword, LoginFacebook } from "../store/action/index";
// import FacebookLoginButton from "../Components/FacebookLoginButton";
import GoogleLogin from "react-google-login";
import { setIsLogin, setToken } from "../store/action/index";
import avatar from "../image/image_flattener_share_7b9100ca-removebg-preview.png";
import Background from "../image/background.png";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link color="inherit">
        Hinata
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function FirstPage() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const message = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.isLogin);
  const username = useSelector((state) => state.username);
  const password = useSelector((state) => state.password);
  const modalRef = React.useRef();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(setIsLogin(true));
      dispatch(setToken(localStorage.token));
    }
    if (localStorage.token) history.push("/main");
  }, [isLogin]);

  const resetError = () => {
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleOpen = () => {
    modalRef.current.openModal();
  };

  const responseGoogle = (response) => {
    const token = response.tokenId;
    dispatch(loginGoogle(token));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {
      username,
      password,
    };
    if (username && password) {
      dispatch(SignIn(payload));
    } else {
      if (!username) {
        setError("Username is empty");
      } else {
        setError("Password is empty");
      }
      resetError();
    }
    if (isLogin) history.push("/main");
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        backgroundImage: `url(${Background})`,
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Card width="50%" style={{ borderRadius: "50px" }}>
          <div className={classes.paper}>
            <div>
              <img src={avatar} style={{ width: "350px", height: "170px" }} />
            </div>
            {error ? (
              <Typography component="h1" variant="h5">
                {error}
              </Typography>
            ) : (
              <>
                <div>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                </div>
                <div>
                  {message && (
                    <Snackbar
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      open={message ? true : false}
                      message={message}
                      key="topcenter"
                    />
                  )}
                </div>
              </>
            )}

            <form
              className={classes.form}
              noValidate
              onSubmit={(event) => handleSubmit(event)}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={username}
                id="email"
                label="Email / Username"
                name="username"
                autoComplete="email"
                autoFocus
                onChange={(event) => dispatch(setUsername(event.target.value))}
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
                onChange={(event) => dispatch(setPassword(event.target.value))}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                  <p>
                    Don't have an account?{" "}
                    <Link onClick={(event) => handleOpen(event)}>Sign Up</Link>
                  </p>
                  <ModalFirstPage
                    classes={classes}
                    ref={modalRef}
                  ></ModalFirstPage>
                </Grid>
                <Grid item>
                  {/* <FacebookLoginButton /> */}
                  <IconButton
                    color="inherit"
                    //onClick={event => responseGithub(event)}
                  >
                    <GitHub />
                  </IconButton>
                  <GoogleLogin
                    clientId="1020375561760-vdcnh87q4jugnmpdddgeqiij13ijcdqo.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={4} mb={2}>
            <Copyright />
          </Box>
        </Card>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "50px",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50px",
    width: "398px",
    height: "647px",
    flexDirection: "column"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: "80%",
    marginTop: theme.spacing(1),
    height: "50%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
