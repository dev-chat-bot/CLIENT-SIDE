import React, { useState } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import { TextField, Typography } from "@material-ui/core";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  recognition: PropTypes.object,
  interimTranscript: PropTypes.string,
  finalTranscript: PropTypes.string
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
  recognition.lang = "en-US"

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const listening = (event) => {
    event.preventDefault();
    setStatus(!status);
    if (!status) {
      startListening();
    } else {
      stopListening();
    }
  };
  const reset = (event) => {
    event.preventDefault();
    resetTranscript();
  };


  return (
    <div>
      {/* <span>{transcript}</span> */}
      <form>
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
        <IconButton
          color="primary"
          onClick={(event) => listening(event)}
          aria-label="microphone"
        >
          <MicIcon />
        </IconButton>
        {/* </Tooltip> */}
        <IconButton onClick={(event) => reset(event)} color="secondary">
          <StopRoundedIcon />
        </IconButton>
        {/* <button onClick={(event) => reset(event)}>Reset</button> */}
        <TextField
          id="filled-basic"
          placeholder="ketik pesan ..."
          value={ finalTranscript ? finalTranscript : text}
          style={{ width: "70vw" }}
          editable="true"
          multiline={true}
          onChange={(event) => setText(event.target.value)}
        />
        <IconButton color="primary">
          <SendSharpIcon />
        </IconButton>
      </form>
      <Typography variant="subtitle1">
        {interimTranscript}
      </Typography>
    </div>
  );
};

Dictaphone.propTypes = propTypes;
const options = {
  autoStart: false
};

export default SpeechRecognition(options)(Dictaphone);
