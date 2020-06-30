import React from "react";
import "./MessageBoard.css";
import { CopyBlock } from "react-code-blocks";
import github from "react-code-blocks/build/cjs/themes/github";
import { Typography } from "@material-ui/core";
// import { Autorenew } from "@material-ui/icons";

const MessageBoard = (props) => {
  const propsData = props.data;
  console.log(propsData);
  if (propsData) {
    if (Object.keys(propsData)[0] === "adeps") {
      if (typeof propsData.adeps.message === "string") {
        return (
          <div className="bot-container">
            <div className="code-block">
              <div className="bot-name">
                <Typography>{Object.keys(propsData)[0]}</Typography>
              </div>
              <div className="message-bot">
                <CopyBlock
                  text={propsData.adeps.message}
                  language="javascript"
                  theme={github}
                  wrapLines
                />
              </div>
            </div>
          </div>
        );
      } else {
        if (propsData.adeps.message.type === "code") {
          return (
            <div className="bot-container">
              <div className="code-block">
                {/* <div className="message-bot"> */}
                <CopyBlock
                  text={propsData.adeps.message.content}
                  language="javascript"
                  theme={github}
                  wrapLines
                  codeBlock
                />
                {/* </div> */}
              </div>
            </div>
          );
        } else {
          return (
            <div className="bot-container">
              <div className="code-block">
                <div className="bot-name">
                  <Typography>{Object.keys(propsData)[0]}</Typography>
                </div>
                <div className="message-bot-1">
                  <Typography paragraph>{props.data.adeps.message.content}</Typography>
                </div>
              </div>
            </div>
          );
        }
      }
    } else {
      return (
        <>
          <div className="user-container">
            <div className="code-block">
              <div className="user-name">
                <Typography>{Object.keys(propsData)[0]}</Typography>
                {/* <Typography>Test Nama User Panjang</Typography> */}
              </div>
              <div className="message-user">
                <p>{props.data.user.message}</p>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
};

export default MessageBoard;
