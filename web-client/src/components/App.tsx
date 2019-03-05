import * as React from "react";
import Messages from "./Messages/Messages";
import SendMessage from "./SendMessage/SendMessage";

const App: React.SFC = (): JSX.Element => {
  return (
    <div>
      <h1>DISCU</h1>
      <Messages />
      <SendMessage />
    </div>
  );
};

export default App;
