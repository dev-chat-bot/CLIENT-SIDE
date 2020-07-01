import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setToken } from "../store/action/index";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import ChatIcon from "@material-ui/icons/Chat";
import ChatRoom from "../Components/ChatRoom";
import AddCode from "../Components/AddCode";
import Background from "../image/background.png";
import avatar from "../image/avatare smile.png";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: `url(${Background})`,

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#282b30",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#282b30",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: "#282b30",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#282b30",
    color: "#fff",
    display: "flex",
    justifyContent: "space-around",
  },
  // necessary for content to be below app bar
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    backgroundColor: "transparent",
    color: "#1e2124",
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
  const theme = useTheme();

  const user =
    useSelector((state) => state.user) || sessionStorage.getItem("username");
  const [main, setMain] = useState(false);
  const isLogin = useSelector((state) => state.isLogin);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <Typography variant="h6" noWrap>
              {main ? "Train Hinata" : "Chating Room"}
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
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <div style={{ height: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* <div>
            <img src={avatar} style={{ height: "150px", width: "250px" }} />
            <div
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>{` Hi, ${user}`}</Typography>
            </div>
          </div> */}
          <Paper
            style={{ height: "120px", width: "68%" }}
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
              {/* <Avatar
                className={classes.large}
                src="https://picsum.photos/200/300?random=2"
              ></Avatar> */}
              <img src={avatar} style={{ height: "150px", width: "250px" }} />
              <div>
                {open && <Typography>{user}</Typography>}
              </div>
            </div>
          </Paper>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            height: "50%",
            justifyContent: "center",
          }}
        >
          <List style={{ width: "100%"}}>
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
              <ListItemText style={{ marginLeft: "10px" }} primary="Train Hinata" />
            </ListItem>
            <ListItem
              button
              onClick={(event) => movePageChat(event)}
              className={`${classes.btn} ${classes.btn1}`}
            >
              <IconButton>
                <ChatIcon style={{ color: "#7289da" }} />
              </IconButton>
              <ListItemText style={{ marginLeft: "10px" }} primary="Chat Room"/>
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
