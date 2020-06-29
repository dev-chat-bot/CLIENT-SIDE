import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CKEditor from "ckeditor4-react";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      height: "100vh",
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center"
    },
  },
}));
export default function AddCode() {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate>
      <pre>
        <code className="html">
          <CKEditor type="classic" data="<p>Some initial data</p>" />
        </code>
      </pre>
      {/* <div> */}
      <TextField
        id="filled-multiline-flexible"
        label="Multiline"
        multiline
        rowsMax={4}
        value={value}
        onChange={handleChange}
        variant="filled"
      />
      {/* </div> */}
      {/* <div> */}
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        defaultValue="Default Value"
        variant="filled"
      />
      {/* </div> */}
    </form>
  );
}
