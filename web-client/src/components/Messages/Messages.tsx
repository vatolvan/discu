import * as React from "react";
import { Message } from "src/types/Message";

interface Props {
  messages: Array<Message>;
}

const Messages: React.SFC = () => {
  const [messages, setMessages] = React.useState([]);

  return (
    <ul>
      {messages.map(message => (
        <li>{`${message.writer}: ${message.text}`}</li>
      ))}
    </ul>
  );
};

export default Messages;
