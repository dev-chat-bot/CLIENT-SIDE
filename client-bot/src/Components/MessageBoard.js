import React from "react";
import "./MessageBoard.css";
import { CopyBlock } from "react-code-blocks";
import github from "react-code-blocks/build/cjs/themes/github";
import { Typography } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";

const MessageBoard = (props) => {
  const propsData = props.data;
  console.log(propsData);
  if (propsData) {
    if (Object.keys(propsData)[0] === "adeps") {
      if (typeof propsData.adeps.message === "string") {
        return (
          <div className="bot-container">
            <div className="code-block">
              <CopyBlock
                text={propsData.adeps.message}
                language="javascript"
                theme={github}
                wrapLines
              />
            </div>
          </div>
        );
      } else {
        if (propsData.adeps.message.type === "code") {
          return (
            <div className="bot-container">
              <div className="code-block">
                <CopyBlock
                  text={propsData.adeps.message.content}
                  language="javascript"
                  theme={github}
                  wrapLines
                />
              </div>
            </div>
          );
        } else {
          return (
            <div className="message-container">
              <h4>{Object.keys(propsData)[0]}</h4>
              <p>{props.data.adeps.message.content}</p>
            </div>
          );
        }
      }
    } else {
      return (
        <>
          <div className="user-container">
            <div className="message-container">
              <div className="user-name">
                {/* <Typography>{Object.keys(propsData)[0]}</Typography> */}
                <Typography>Valorant kuy</Typography>
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
