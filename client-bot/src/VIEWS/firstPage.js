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
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../Components/Modal";
import { Facebook, GitHub } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../store/action/index";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ADEPs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function FirstPage() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const message = useSelector((state) => state.error)
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.isLogin);

  useEffect(() => {
    if (isLogin || localStorage.token) history.push("/main");
  }, [isLogin]);

  const resetError = () => {
    setTimeout(() => {
      setError('')
    }, 3000)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {
      username,
      password,
    };
    if(username && password){
      dispatch(SignIn(payload))
    } else {
      if(!username) {
        setError("Username is empty")
      } else {
        setError("Password is empty")
      }
      resetError()
    };
    if (isLogin) history.push("/main");
  }

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        backgroundColor: "black",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Card width="50%">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountCircleOutlinedIcon />
            </Avatar>
            {error ? (
              <Typography component="h1" variant="h5">
                {error}
              </Typography>
            ) : (
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
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
                onChange={(event) => setUsername(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
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
                  <Modal classes={classes}></Modal>
                </Grid>
                <Grid item>
                  <IconButton color="primary">
                    <Facebook />
                  </IconButton>
                  <IconButton color="inherit">
                    <GitHub />
                  </IconButton>
                  <Button>Google</Button>
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
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
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
