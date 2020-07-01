import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import { TextField, Typography } from "@material-ui/core";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import { useDispatch, useSelector } from "react-redux";
import { UserRequest, setChatList } from "../store/action/index";
import { setIsLogin, setToken } from "../store/action/index";

const propTypes = {
  // Props injected by SpeechRecognition
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  recognition: PropTypes.object,
  interimTranscript: PropTypes.string,
  finalTranscript: PropTypes.string,
  abortListening: PropTypes.func,
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
  const isLogin = useSelector((state) => state.isLogin);
  const user =
    useSelector((state) => state.user) || sessionStorage.getItem("username");

  recognition.lang = "en-US";

  const obj = {};

  const handleListening = async () => {
    const command = finalTranscript.split(" ");
    await command.map(async (el, i) => {
      if (el === "stop" || el === "Stop" || el === "STOP") {
        if (command[i + 1] === "listen" || command[i + 1] === "listening") {
          obj[user] = { message: finalTranscript };
          dispatch(setChatList(obj));
          setTimeout(() => {
            dispatch(
              setChatList({ Hinata: { message: "As your command sir!!" } })
            );
          }, 800);
          resetTranscript();
          await abortListening();
          finalTranscript = "";
          setStatus(false);
        }
      }
      if (el === "reset" || el === "Reset" || el === "RESET") {
        finalTranscript = "";
        resetTranscript();
      }
      return null;
    });
    if (finalTranscript !== "") {
      await setTimeout(() => {
        obj[user] = { message: finalTranscript };
        dispatch(setChatList(obj));
        dispatch(UserRequest(finalTranscript));
        resetTranscript();
      }, 2000);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      dispatch(setIsLogin(true));
      dispatch(setToken(localStorage.token));
    }
    startListening();
    if (!localStorage.token) {
      abortListening();
    }
  }, [isLogin]);

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
    finalTranscript = "";
    resetTranscript();
    setText("");
  };

  const KeyPress = (e) => {
    if ( e.keyCode === "13" ) {
      handleSubmit(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      obj[user] = { message: text };
      dispatch(setChatList(obj));
      dispatch(UserRequest(text));
      setText("");
    } else {
      obj[user] = { message: text };
      dispatch(setChatList(obj));
      dispatch(UserRequest(finalTranscript));
      setText("");
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  useEffect(() => {
    handleListening();
  }, [finalTranscript]);

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
            <Typography>Reset</Typography>
          </IconButton>
        </div>
        {/* <button onClick={(event) => reset(event)}>Reset</button> */}
        <TextField
          id="filled-basic"
          placeholder="Message ..."
          value={finalTranscript ? finalTranscript : text}
          style={{ width: "50vw" }}
          editable="true"
          multiline={true}
          onChange={(event) => handleChange(event)}
          onKeyDown={(e) => KeyPress(e)}
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
