import React from "react"
import TextField from "@material-ui/core/TextField"
// import CKEditor from "ckeditor4-react";
// import hljs from "highlight.js/lib/core";
// hljs.registerLanguage("javascript", javascript);
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-monokai"
import { Tooltip, Typography, Grid, Button } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import SaveIcon from "@material-ui/icons/Save"
import { useDispatch } from "react-redux"
import { AddSnippet } from "../store/action/index"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  MuiInputBaseInput: {
    // background: "antiquewhite",
    background: "white",
  },
  textField: {
    // color: "antiquewhite",
    color: "white",
    fontSize: "16px",
  },
  btn: {
    textTransform: "lowercase",
    cursor: "pointer",
    color: "#fff",
    backgroundSize: "200%",
    transition: "0.4s",
    "&:hover": {
      backgroundPosition: "right",
    },
  },
  btn1: {
    backgroundImage: "linear-gradient(75deg, #36393e , #424549, #7289da)",
  },
}))
export default function AddCode() {
  const [snippet, setSnippet] = React.useState("")
  // const [Test, setTest] = React.useState("")
  const [keyword, setKeyword] = React.useState("")
  const [command, setCommand] = React.useState("")
  const [response, setResponse] = React.useState("")
  const [guide, setGuide] = React.useState("")
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleSubmit = (event) => {
    event.preventDefault()
    let payload
    let trainingPhrasesParts
    let messageTexts
    if (command.indexOf(",") !== -1) {
      trainingPhrasesParts = command.split(",")

      trainingPhrasesParts = trainingPhrasesParts.map((elm) => {
        if (elm[0] === " ") {
          elm = elm.slice(1, elm.length)
        }
        if (elm[elm.length - 1] === " ") {
          elm = elm.slice(0, elm.length - 1)
        }
        return elm
      })
    }
    if (response.indexOf(",") !== -1) {
      messageTexts = response.split(",")
      messageTexts = messageTexts.map((elm) => {
        if (elm[0] === " ") {
          elm = elm.slice(1, elm.length)
        }
        if (elm[elm.length - 1] === " ") {
          elm = elm.slice(0, elm.length - 1)
        }
        return elm
      })
    }
    if (response.indexOf(",") === -1 && command.indexOf(",") === -1) {
      messageTexts = [response]
      trainingPhrasesParts = [command]
    }
    if (response.indexOf(",") !== -1 || command.indexOf(",") !== -1) {
      if (response.indexOf(",") !== -1 && command.indexOf(",") === -1) {
        trainingPhrasesParts = [command]
      }
      if (command.indexOf(",") !== -1 && response.indexOf(",") === -1) {
        messageTexts = [response]
      }
    }
    payload = {
      displayName: keyword,
      messageTexts,
      trainingPhrasesParts,
      snippet,
      guide,
    }
    dispatch(AddSnippet(payload))
  }

  const handleSnippet = (value) => {
    setSnippet(value)
  }

  const handleGuide = (event) => {
    setGuide(event.target.value)
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target

    switch (name) {
      case "keyword":
        return setKeyword(value)
      case "command":
        return setCommand(value)
      case "response":
        return setResponse(value)
      default:
        break
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "90vh",
          paddingTop: "50px",
          marginTop: "30px",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <Typography className={classes.textField}>Code Editor</Typography>
          <br />
          <AceEditor
            placeholder="Placeholder Text"
            mode="javascript"
            theme="monokai"
            onChange={(value) => handleSnippet(value)}
            value={snippet}
            name="snippet"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
              useWorker: false,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: "20px",
            marginTop: "0px",
            height: "555px",
          }}
        >
          <div>
            <h4 className={classes.textField}>Text Editor</h4>
            <textarea onChange={handleGuide} rows="10" cols="50" />
          </div>
          <div
            style={{
              height: "300px",
              alignItems: "center",
              justifyContent: "space-evenly",
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <div style={{ width: "420px" }}>
              <Typography className={classes.textField}>Intent Name</Typography>
              <TextField
                id="filled-keyword"
                label="e.g: Setup  apollo client"
                variant="filled"
                value={keyword}
                name="keyword"
                fullWidth={true}
                onChange={(event) => handleChange(event)}
                className={classes.MuiInputBaseInput}
              />
            </div>
            <div style={{ width: "420px" }}>
              <Typography className={classes.textField}>
                User Expression
              </Typography>
              <Tooltip title="if you have more than one command please seperate them by ( , )">
                <TextField
                  id="filled-command"
                  label="e.g: How to configure apollo client"
                  variant="filled"
                  value={command}
                  name="command"
                  fullWidth={true}
                  onChange={(event) => handleChange(event)}
                  className={classes.MuiInputBaseInput}
                />
              </Tooltip>
            </div>
            <div style={{ width: "420px" }}>
              <Typography className={classes.textField}>
                Hinata Response
              </Typography>
              <Tooltip title="if you have more than one response please seperate them by ( , )">
                <TextField
                  id="filled-Response"
                  label="e.g: Sure, this is apollo client configuration"
                  variant="filled"
                  value={response}
                  name="response"
                  fullWidth={true}
                  onChange={(event) => handleChange(event)}
                  className={classes.MuiInputBaseInput}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          alignSelf: "center",
          justifyContent: "center",
          position: "relative",
          bottom: "70px",
        }}
      >
        <IconButton
          onClick={(event) => handleSubmit(event)}
          color="primary"
          type="button"
          className={`${classes.btn} ${classes.btn1}`}
        >
          Save
          <SaveIcon />
        </IconButton>
      </div>
    </>
  )
}
