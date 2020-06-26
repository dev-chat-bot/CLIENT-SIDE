import React from "react";
import {CssBaseline} from '@material-ui/core'
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

function Copyright() {
  return (
    <Typography variant="body2" color="black" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ADEPs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
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

export default function SignIn() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div
    style={{
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      backgroundColor: "black",
      height: "100vh",
    }}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Card alignItems="center" justifyContent="center" width="50%">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountCircleOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
                  <Modal
                    setOpen={setOpen}
                    classes={classes}
                    Open={open}
                  ></Modal>
                </Grid>
                <Grid item>
                  <IconButton>
                    <Facebook />
                  </IconButton>
                  <IconButton>
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
