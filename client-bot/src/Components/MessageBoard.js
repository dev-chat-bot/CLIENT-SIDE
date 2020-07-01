import React from "react"
import "./MessageBoard.css"
import { CopyBlock, CodeBlock } from "react-code-blocks"
import github from "react-code-blocks/build/cjs/themes/github"
import { Typography } from "@material-ui/core"
// import { Autorenew } from "@material-ui/icons";
import YouTube from "react-youtube-embed"
import { useSelector } from "react-redux"

const MessageBoard = (props) => {
  const user =
    useSelector((state) => state.user) || sessionStorage.getItem("username")
  const propsData = props.data
  if (propsData) {
    if (Object.keys(propsData)[0] === "Hinata") {
      if (propsData.Hinata.videoId) {
        return (
          <>
            <div className="bot-name">
              <Typography>{Object.keys(propsData)[0]}</Typography>
            </div>
            <div className="message-video">
              <YouTube id={propsData.Hinata.videoId}></YouTube>
            </div>
          </>
        )
      }
      if (typeof propsData.Hinata.message === "string") {
        return (
          <div className="bot-container">
            <div className="code-block">
              <div className="bot-name">
                <Typography>{Object.keys(propsData)[0]}</Typography>
              </div>
              <div className="message-bot-2">
                <CodeBlock
                  text={propsData.Hinata.message}
                  language="javascript"
                  theme={github}
                  showLineNumbers={false}
                  wrapLines
                />
              </div>
            </div>
          </div>
        )
      } else {
        if (propsData.Hinata.message.type === "code") {
          return (
            <div className="bot-container">
              <div className="code-block">
                <div className="message-bot-1">
                  <CopyBlock
                    text={propsData.Hinata.message.content}
                    language="javascript"
                    theme={github}
                    wrapLines
                    codeBlock
                  />
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div className="bot-container">
              <div className="code-block">
                <div className="bot-name">
                  <Typography>{Object.keys(propsData)[0]}</Typography>
                </div>
                <div className="message-bot-1">
                  {/* <Typography paragraph>
                    {props.data.Hinata.message.content}
                  </Typography> */}
                  <CodeBlock
                    text={propsData.Hinata.message.content}
                    language="javascript"
                    theme={github}
                    showLineNumbers={false}
                    wrapLines
                  />
                </div>
              </div>
            </div>
          )
        }
      }
    } else {
      return (
        <>
          <div className="user-container">
            <div className="code-block">
              <div className="user-name">
                <Typography color="initial">
                  {Object.keys(propsData)[0]}
                </Typography>
              </div>
              <div className="message-bot-2">
                {/* <p>{props.data[user].message}</p> */}
                <CodeBlock
                  text={props.data[user].message}
                  language="javascript"
                  theme={github}
                  showLineNumbers={false}
                  wrapLines
                />
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}

export default MessageBoard
