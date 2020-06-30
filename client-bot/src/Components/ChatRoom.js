import React, { useEffect } from "react";
import MessageBoard from "../Components/MessageBoard";
import SpeechRecognition from "../Components/SpeechRecognition";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";

export default function ChatRoom() {
  const messageChatList = useSelector((state) => state.messageChatList);
  console.log(messageChatList, "ini list seluruh message");

  useEffect(() => {}, [messageChatList]);

  return (
    <div>
      <div
        style={{
          height: "90vh",
          display: "flex",
          marginBottom: "5px",
          flexDirection: "column-reverse",
          border: "1px solid transparent",
          flexGrow: 1,
          overflow: "scroll",
        }}
      >
        <div>
          {messageChatList.map((element, index) => {
            return <MessageBoard data={element} key={index} />;
          })}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper style={{ width: "100%", borderRadius: "30px" }}>
          <SpeechRecognition />
        </Paper>
      </div>
    </div>
  );
}
