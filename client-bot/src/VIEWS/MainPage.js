import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SpeechRecognition from "../Components/SpeechRecognition";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../store/action/index";

const DummyData = [
  {
    name: "YODI",
    message: "Ku menangisss membayangakan",
  },
  {
    name: "Fariss",
    message:
      "Betapa kejamnya dirimu atas diriku kau duakan cinta ini, kau pergi bersamanya ",
  },
  {
    name: "Hafidz",
    message: "Ku menangis melepaskan Kepergian dirimu dari sisi hidupku",
  },
  {
    name: "Kalys",
    message: "Harus selalu kau tahu Akulah hati yang telah kau sakiti",
  },
];
const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    height: "100vh",
    display: "flex",
    // alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  },
}));


export default function MainPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user)
  const messageChatList = useSelector((state) => state.messageChatList)

  const handleExitApp = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(setIsLogin(false));
    history.push("/");
  };

  useEffect(() => {
    
  }, [messageChatList])

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
        <div
          className={classes.toolbar}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Paper>USER</Paper>
          </div>
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div
          style={{
            height: "90vh",
            // alignItems: "flex-end",
            display: "flex",
            marginBottom: "5px",
            flexDirection: "column-reverse",
            border: "1px solid",
            flexGrow: 1
          }}
        >
          {/* <div className={classes.toolbar} /> */}
          {/* <div style={{ alignSelf: "start" }}>
            {DummyData.map((el, i) => {
              return (
                <div key={i}>
                  {el.name}
                  <Paper>{el.message}</Paper>
                </div>
              );
            })}
          </div> */}
          <div style={{ alignSelf: "flex-end" }}>
            {messageChatList.map((el, i) => {
              return (
                <div key={i}>
                  {Object.keys(el)}
                  <Paper>{el[Object.keys(el)]["message"]}</Paper>
                </div>
              );
            })}
          </div>
        </div>
        {/* <Divider style={{ border: "2px solid" }} /> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper style={{ width: "100%", borderRadius: "30px" }}>
            <SpeechRecognition />
          </Paper>
        </div>
      </main>
    </div>
  );
}
