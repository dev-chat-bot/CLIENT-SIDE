import React, { useState } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import { TextField, Typography } from "@material-ui/core";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import { useDispatch } from "react-redux";
import { UserRequest, setChatList } from "../store/action/index";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  recognition: PropTypes.object,
  interimTranscript: PropTypes.string,
  finalTranscript: PropTypes.string,
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  startListening,
  stopListening,
  recognition,
  interimTranscript,
  finalTranscript,
  browserSupportsSpeechRecognition,
}) => {
  const [status, setStatus] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  recognition.lang = "en-US";

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const togleListening = (event) => {
    event.preventDefault();
    setStatus(!status);
    // console.log(status, "ini status togel");
    if (!status) {
      startListening();
    } else {
      stopListening();
    }
  };
  const reset = (event) => {
    event.preventDefault();
    resetTranscript();
    setText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text, "ini text");
    if (text) {
      dispatch(setChatList({ user: { message: text } }));
      dispatch(UserRequest(text));
      setText("");
    } else {
      dispatch(setChatList({ user: { message: finalTranscript } }));
      dispatch(UserRequest(finalTranscript));
      setText("");
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  return (
    <div style={{ width: "100%" }}>
      {/* <span>{transcript}</span> */}
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
        onSubmit={(event) => handleSubmit(event)}
      >
        {/* <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
          onClick={(event) => listening(event)}
        >
          <MicIcon />
        </ToggleButton>{" "} */}
        {/* <Tooltip title="Microphone"> */}
        <div>
          <IconButton
            color="primary"
            onClick={(event) => togleListening(event)}
            width="100%"
            aria-label="microphone"
          >
            <MicIcon />
          </IconButton>
          {/* </Tooltip> */}
          <IconButton onClick={(event) => reset(event)} color="secondary">
            <StopRoundedIcon />
          </IconButton>
        </div>
        {/* <button onClick={(event) => reset(event)}>Reset</button> */}
        <TextField
          id="filled-basic"
          placeholder="ketik pesan ..."
          value={finalTranscript ? finalTranscript : text}
          style={{ width: "50vw" }}
          editable="true"
          multiline={true}
          onChange={(event) => handleChange(event)}
          itemScope
        />
        <IconButton color="primary" type="submit">
          <SendSharpIcon />
        </IconButton>
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle1">{interimTranscript}</Typography>
      </div>
    </div>
  );
};

Dictaphone.propTypes = propTypes;
const options = {
  autoStart: false,
};

export default SpeechRecognition(options)(Dictaphone);
