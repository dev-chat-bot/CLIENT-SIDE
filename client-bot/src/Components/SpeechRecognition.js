import React, { useState, useEffect } from "react";
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
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  recognition: PropTypes.object,
  interimTranscript: PropTypes.string,
  finalTranscript: PropTypes.string,
  abortListening: PropTypes.func
};

const Dictaphone = ({
  abortListening,
  resetTranscript,
  startListening,
  stopListening,
  recognition,
  interimTranscript,
  finalTranscript,
  browserSupportsSpeechRecognition,
}) => {
  const [status, setStatus] = useState(true);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  recognition.lang = "en-US";


  const handleListening = async () => {
    const command = finalTranscript.split(' ')
    await command.map(async (el, i) => {
      if(el === 'stop' || el === 'Stop' || el === 'STOP') {
        if (command[i+1] === 'listen' || command[i+1] === 'listening') {
          dispatch(setChatList({ user: { message: finalTranscript } }));
          setTimeout(() => {
            dispatch(setChatList({ adeps: { message: 'As your command sir!!' } }));
          },800)
          resetTranscript()
          await abortListening()
          finalTranscript = ''
        }
      }
      if(el === 'reset' || el === 'Reset' || el === 'RESET'){
        finalTranscript=''
        resetTranscript()
      }
      return null
    })
    if(finalTranscript !== '') {
      await setTimeout(()=> {
        dispatch(setChatList({ user: { message: finalTranscript } }));
        dispatch(UserRequest(finalTranscript));
        resetTranscript();
      }, 2000)
    }
  }

  const togleListening = () => {
    setStatus(!status);
    if (!status) {
      startListening();
    } else {
      stopListening();
    }
  };
  const reset = (event) => {
    event.preventDefault();
    finalTranscript = ''
    resetTranscript();
    setText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text, "ini text");
    if (text) {
      dispatch(setChatList({ user: { message: text } }));
      dispatch(UserRequest(text));
    } else {
      dispatch(setChatList({ user: { message: finalTranscript } }));
      dispatch(UserRequest(finalTranscript));
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  useEffect(() => {
    handleListening()
  }, [finalTranscript])

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

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
  autoStart: true,
};

export default SpeechRecognition(options)(Dictaphone);
