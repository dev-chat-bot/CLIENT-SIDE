import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../store/action/index";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import ChatIcon from "@material-ui/icons/Chat";
// import { Link } from "react-router-dom";
import ChatRoom from "../Components/ChatRoom";
import AddCode from "../Components/AddCode";

// const DummyData = [
//   {
//     name: "YODI",
//     message: "Ku menangisss membayangakan",
//   },
//   {
//     name: "Fariss",
//     message:
//       "Betapa kejamnya dirimu atas diriku kau duakan cinta ini, kau pergi bersamanya ",
//   },
//   {
//     name: "Hafidz",
//     message: "Ku menangis melepaskan Kepergian dirimu dari sisi hidupku",
//   },
//   {
//     name: "Kalys",
//     message: "Harus selalu kau tahu Akulah hati yang telah kau sakiti",
//   },
// ];
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#424549",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#424549",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    backgroundColor: "#7289da",
    color: "#1e2124"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user)
  const [main, setMain] = useState(false);

  const handleExitApp = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(setIsLogin(false));
    history.push("/");
  };

  // const code = `
  //   function addNumber (a,b) {
  //     return a + b
  //   }
  // `;
  // const language = "javascript";

  const movePageAdd = (event) => {
    event.preventDefault();
    setMain(true);
  };
  const movePageChat = (event) => {
    event.preventDefault();
    setMain(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography variant="h6" noWrap>
              Chating Room
            </Typography>
          </div>
          <div>
            <IconButton
              color="inherit"
              edge="end"
              onClick={(event) => handleExitApp(event)}
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Divider />
        <Paper
          style={{ height: "120px", width: "68%", marginLeft: "40px" }}
          elevation={3}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Avatar className={classes.large} src="public/logo192.png"></Avatar>
            <Typography>NAMAKU</Typography>
          </div>
        </Paper>
        <Divider />
        <List>
          {/* <Link to="/add-Code"> */}
          <ListItem button name="Add" onClick={(event) => movePageAdd(event)}>
            <ListItemIcon>
              <AddCircleTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Add Code" />
          </ListItem>
          <ListItem button onClick={(event) => movePageChat(event)}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Chat Room" />
          </ListItem>
          {/* </Link> */}
        </List>
      </Drawer>
      <main className={classes.content}>
        {main ? <AddCode /> : <ChatRoom />}
      </main>
    </div>
  );
}
