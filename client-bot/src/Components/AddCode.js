import React from "react";
import TextField from "@material-ui/core/TextField";
// import CKEditor from "ckeditor4-react";
// import hljs from "highlight.js/lib/core";
// hljs.registerLanguage("javascript", javascript);
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import { Tooltip, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch } from "react-redux";
import { AddSnippet } from "../store/action/index";

export default function AddCode() {
  const [snippet, setSnippet] = React.useState("");
  const [Test, setTest] = React.useState("");
  const [keyword, setKeyword] = React.useState("");
  const [command, setCommand] = React.useState("");
  const [response, setResponse] = React.useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload;
    let trainingPhrasesParts;
    let messageTexts;
    if (command.indexOf(",") !== -1) {
      trainingPhrasesParts = command.split(",");

      trainingPhrasesParts = trainingPhrasesParts.map((elm) => {
        if (elm[0] === " ") {
          elm = elm.slice(1, elm.length);
        }
        if (elm[elm.length - 1] === " ") {
          elm = elm.slice(0, elm.length - 1);
        }
        return elm;
      });
    }
    if (response.indexOf(",") !== -1) {
      messageTexts = response.split(",");
      messageTexts = messageTexts.map((elm) => {
        if (elm[0] === " ") {
          elm = elm.slice(1, elm.length);
        }
        if (elm[elm.length - 1] === " ") {
          elm = elm.slice(0, elm.length - 1);
        }
        return elm;
      });
    }
    if (response.indexOf(",") === -1 && command.indexOf(",") === -1) {
      messageTexts = [response];
      trainingPhrasesParts = [command];
    }
    if (response.indexOf(",") !== -1 || command.indexOf(",") !== -1) {
      if (response.indexOf(",") !== -1 && command.indexOf(',') === -1) {
        trainingPhrasesParts = [command];
      }
      if (command.indexOf(",") !== -1 && response.indexOf(",") === -1 ) {
        messageTexts = [response];
      }
    }
    payload = {
      displayName: keyword,
      messageTexts,
      trainingPhrasesParts,
      snippet
    };

    dispatch(AddSnippet(payload));
  };

  const handleSnippet = (value) => {
    setSnippet(value);
    console.log(snippet)
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // console.log(name, value);

    switch (name) {
      case "keyword":
        return setKeyword(value);
      case "command":
        return setCommand(value);
      case "response":
        return setResponse(value);
      default:
        break;
    }
  };

  return (
    <div
      style={{
        marginTop: "7vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
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
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography>keyword</Typography>
          <TextField
            id="filled-keyword"
            label="Keywords"
            variant="filled"
            value={keyword}
            name="keyword"
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div>
          <Typography>set command</Typography>
          <Tooltip title="if you have more than one command please seperate them by ( , )">
            <TextField
              id="filled-command"
              label="Set Command"
              variant="filled"
              value={command}
              name="command"
              onChange={(event) => handleChange(event)}
            />
          </Tooltip>
        </div>
        <div>
          <Typography>Set Response Hades</Typography>
          <Tooltip title="if you have more than one response please seperate them by ( , )">
            <TextField
              id="filled-Response"
              label="Response hades"
              variant="filled"
              value={response}
              name="response"
              onChange={(event) => handleChange(event)}
            />
          </Tooltip>
        </div>
        <div style={{ justifyContent: "end" }}>
          <IconButton
            onClick={(event) => handleSubmit(event)}
            color="secondary"
            type="submit"
          >
            <SaveIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
