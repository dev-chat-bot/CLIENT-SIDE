import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Paper } from "@material-ui/core";

const drawerWidth = 240;

const DummyData = [
    {
        ID: "Hafidz Tampan",
        message: "gimana guys aman ?"
    },
    {
        ID: "Yodi mamen",
        message: "santuuy fidz, valorant skuyy"
    },
    {
        ID: "kalys Dermawan",
        message: "SKUUUY"
    },
    {
        ID: "Faris ganteng",
        message: "duh lagi ga niat main nih. segala berulah lagi.. aduhlah"
    }
]

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Chating Room
          </Typography>
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
        <div className={classes.toolbar} />
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
        {/* <div className={classes.toolbar} /> */}
        {DummyData.map((e,i) => {
            return <Paper mb={10}>
                {e.ID}
            </Paper>
        })}
      </main>
      {/* <div className={classes.toolbar}>
        <form className={classes.toolbar} noValidate>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
      </div> */}
    </div>
  );
}

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
    //   backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      alignItems: "center",
      justifyContent: "center",
    },
  }));