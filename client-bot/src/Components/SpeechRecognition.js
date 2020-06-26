import React, { useState } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  startListening,
  stopListening,
  browserSupportsSpeechRecognition
}) => {
  const [status, setStatus] = useState(false)

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const listening = (event) => {
    event.preventDefault();
    setStatus(!status)
    if(!status) {
      startListening()
    } else {
      stopListening()
    }
  }
  const reset = event => {
    event.preventDefault();
    resetTranscript()
  }

  return (
    <div>
      <IconButton color="primary" onClick={event => listening(event)}>
        <MicIcon />
      </IconButton>
      <button onClick={event => reset(event)}>Reset</button>
      <span>{transcript}</span>
    </div>
  );
};

Dictaphone.propTypes = propTypes;
const options = {
  autoStart: false
}

export default SpeechRecognition(options)(Dictaphone);