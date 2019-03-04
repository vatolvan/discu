import * as React from "react";

const { useState } = React;

const App = (): JSX.Element => {
  const [count, setCount] = useState(0);

  function increment(): void {
    setCount(count + 1);
  }

  function decrement(): void {
    setCount(count - 1);
  }

  return (
    <React.Fragment>
      <button onClick={decrement}>-</button>
      <div>{count}</div>
      <button onClick={increment}>-</button>
    </React.Fragment>
  );
};

export default App;
