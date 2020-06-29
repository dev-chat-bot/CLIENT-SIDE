import React from "react"
import "./MessageBoard.css"
import { CopyBlock } from "react-code-blocks"
import github from "react-code-blocks/build/cjs/themes/github"
import { Typography } from "@material-ui/core"

const MessageBoard = (props) => {
  const propsData = props.data
  if (propsData) {
    if (Object.keys(propsData)[0] === "adeps") {
      return (
        <div className="code-block">
          <CopyBlock
            text={propsData.adeps.message}
            language="javascript"
            theme={github}
            wrapLines
          />
        </div>
      )
    } else {
      return (
        <div className="user-container">
          <div className="message-container">
            <Typography>{Object.keys(propsData)[0]}</Typography>
            <p>{props.data.user.message}</p>
          </div>
        </div>
      )
    }
  }
}

export default MessageBoard
