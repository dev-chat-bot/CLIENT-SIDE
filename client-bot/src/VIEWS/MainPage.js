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
import { setIsLogin, setToken } from "../store/action/index";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import ChatIcon from "@material-ui/icons/Chat";
// import { Link } from "react-router-dom";
import ChatRoom from "../Components/ChatRoom";
import AddCode from "../Components/AddCode";
import Background from '../image/background.png'


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
    backgroundColor: "#282b30",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#282b30",
    color: "#fff",
    display: "flex",
    justifyContent: "space-around",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    backgroundColor: "#282b30",
    color: "#1e2124",
    backgroundImage: `url(${Background})`
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  btn: {
    textTransform: "uppercase",
    cursor: "pointer",
    color: "#fff",
    backgroundSize: "200%",
    transition: "0.7s",
    "&:hover": {
      backgroundPosition: "right",
    },
  },
  btn1: {
    backgroundImage: "linear-gradient(100deg, #282b30 , #36393e, #7289da)",
  },
  btn2: {
    backgroundImage: "linear-gradient(60deg, #282b30 , #36393e, #b91400)",
  },
  cardColor: {
    backgroundImage: "linear-gradient(45deg, #36393e , #7289da, #ffd95a)",
  },

}));

export default function MainPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user =
    useSelector((state) => state.user) || sessionStorage.getItem("username");
  const [main, setMain] = useState(false);
  const isLogin = useSelector((state) => state.isLogin);

  const handleExitApp = (e) => {
    localStorage.clear();
    dispatch(setIsLogin(false));
  };

  useEffect(() => {
    if (localStorage.token) {
      dispatch(setIsLogin(true));
      dispatch(setToken(localStorage.token));
    }
    if (!localStorage.token) history.push("/");
  }, [isLogin]);

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
              {main ? "Adding Snippet" : "Chating Room"}
            </Typography>
          </div>
          <div>
            <IconButton
              color="inherit"
              edge="end"
              onClick={(event) => handleExitApp(event)}
              className={`${classes.btn} ${classes.btn2}`}
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
        <div style={{ height: "50%", display: "flex", alignItems: "center" }}>
          <Paper
            style={{ height: "120px", width: "68%", marginLeft: "40px" }}
            elevation={3}
            className={`${classes.btn} ${classes.cardColor}`}
          >
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Avatar className={classes.large} src="https://picsum.photos/200/300?random=2"></Avatar>
              <div>
                <Typography>{user}</Typography>
              </div>
            </div>
          </Paper>
        </div>
        <Divider />
        <div
          style={{ display: "flex", alignItems: "flex-start", height: "50%" }}
        >
          <List style={{ width: "100%" }}>
            {/* <Link to="/add-Code"> */}
            <ListItem
              button
              name="Add"
              onClick={(event) => movePageAdd(event)}
              className={`${classes.btn} ${classes.btn1}`}
            >
              <IconButton>
                <AddCircleTwoToneIcon style={{ color: "#7289da" }} />
              </IconButton>
              <ListItemText primary="Add Code" />
            </ListItem>
            <ListItem
              button
              onClick={(event) => movePageChat(event)}
              className={`${classes.btn} ${classes.btn1}`}
            >
              <IconButton>
                <ChatIcon style={{ color: "#7289da" }} />
              </IconButton>
              <ListItemText primary="Chat Room" />
            </ListItem>
            {/* </Link> */}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        {main ? <AddCode /> : <ChatRoom />}
      </main>
    </div>
  );
}
